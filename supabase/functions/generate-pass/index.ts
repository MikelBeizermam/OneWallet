import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import forge from 'npm:node-forge@1.3.1'
import JSZip from 'npm:jszip@3.10.1'

const TEAM_ID = '45JRPW5TD5'
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

let wwdrCache: forge.pki.Certificate | null = null

async function getWwdr(): Promise<forge.pki.Certificate> {
  if (wwdrCache) return wwdrCache
  const res = await fetch('https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer')
  const buf = await res.arrayBuffer()
  const asn1 = forge.asn1.fromDer(forge.util.createBuffer(new Uint8Array(buf)))
  wwdrCache = forge.pki.certificateFromAsn1(asn1)
  return wwdrCache
}

async function sha1Hex(data: Uint8Array): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-1', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function categoryColor(cat: string): string {
  const map: Record<string, string> = {
    id: 'rgb(74, 150, 184)',
    license: 'rgb(140, 115, 85)',
    loyalty: 'rgb(26, 18, 8)',
    gift: 'rgb(124, 58, 237)',
    student: 'rgb(30, 58, 138)',
    visit: 'rgb(245, 166, 35)',
  }
  return map[cat] ?? 'rgb(140, 115, 85)'
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const { cardId } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: card, error } = await supabase
      .from('cards').select('*').eq('id', cardId).single()

    if (error || !card) {
      return new Response(JSON.stringify({ error: 'Card not found' }), {
        status: 404, headers: { ...CORS, 'Content-Type': 'application/json' },
      })
    }

    const p12Base64 = Deno.env.get('PASS_CERT_P12')!
    const p12Password = Deno.env.get('PASS_CERT_PASSWORD')!
    const passTypeId = Deno.env.get('PASS_TYPE_ID')!

    // Parse P12
    const p12Der = forge.util.decode64(p12Base64)
    const p12 = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(p12Der), p12Password)
    const signerCert = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag]![0].cert!
    const signerKey = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag]![0].key!
    const wwdrCert = await getWwdr()

    // pass.json
    const passJson: Record<string, unknown> = {
      formatVersion: 1,
      passTypeIdentifier: passTypeId,
      serialNumber: card.id,
      teamIdentifier: TEAM_ID,
      organizationName: 'OneWallet',
      description: card.name,
      backgroundColor: categoryColor(card.category),
      foregroundColor: 'rgb(255, 255, 255)',
      labelColor: 'rgb(210, 195, 175)',
      generic: {
        primaryFields: [
          { key: 'name', value: card.name, label: '', textAlignment: 'PKTextAlignmentRight' },
        ],
        secondaryFields: card.card_number
          ? [{ key: 'num', value: card.card_number, label: 'מספר', textAlignment: 'PKTextAlignmentRight' }]
          : [],
        auxiliaryFields: card.expiry_date
          ? [{ key: 'exp', value: card.expiry_date, label: 'תוקף', textAlignment: 'PKTextAlignmentRight' }]
          : [],
        backFields: [],
      },
    }

    // Content files
    const files: Record<string, Uint8Array> = {}
    files['pass.json'] = new TextEncoder().encode(JSON.stringify(passJson))

    // Background image (card scan)
    if (card.image_url) {
      try {
        const imgRes = await fetch(card.image_url)
        if (imgRes.ok) {
          const img = new Uint8Array(await imgRes.arrayBuffer())
          files['background.png'] = img
          files['background@2x.png'] = img
          files['background@3x.png'] = img
        }
      } catch { /* skip */ }
    }

    // Minimal icon PNG (1×1 px)
    const iconB64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    const icon = Uint8Array.from(atob(iconB64), c => c.charCodeAt(0))
    files['icon.png'] = icon
    files['icon@2x.png'] = icon
    files['icon@3x.png'] = icon

    // Manifest
    const manifest: Record<string, string> = {}
    for (const [name, data] of Object.entries(files)) manifest[name] = await sha1Hex(data)
    const manifestStr = JSON.stringify(manifest)

    // PKCS#7 detached signature
    const p7 = forge.pkcs7.createSignedData()
    p7.content = forge.util.createBuffer(manifestStr)
    p7.addCertificate(signerCert)
    p7.addCertificate(wwdrCert)
    p7.addSigner({
      key: signerKey,
      certificate: signerCert,
      digestAlgorithm: forge.pki.oids.sha1,
      authenticatedAttributes: [
        { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
        { type: forge.pki.oids.messageDigest },
        { type: forge.pki.oids.signingTime, value: new Date() },
      ],
    })
    p7.sign({ detached: true })
    const sigDer = forge.asn1.toDer(p7.toAsn1()).getBytes()
    const sigBytes = new Uint8Array(sigDer.length)
    for (let i = 0; i < sigDer.length; i++) sigBytes[i] = sigDer.charCodeAt(i)

    // ZIP → .pkpass
    const zip = new JSZip()
    for (const [f, d] of Object.entries(files)) zip.file(f, d)
    zip.file('manifest.json', new TextEncoder().encode(manifestStr))
    zip.file('signature', sigBytes)

    const pkpass = await zip.generateAsync({ type: 'arraybuffer' })

    return new Response(pkpass, {
      headers: {
        ...CORS,
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(card.name)}.pkpass"`,
      },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
