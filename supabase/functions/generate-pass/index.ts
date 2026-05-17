import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import forge from 'npm:node-forge@1.3.1'
import JSZip from 'npm:jszip@3.10.1'
import jpeg from 'npm:jpeg-js@0.4.4'
import { PNG } from 'npm:pngjs@7.0.0'
import { Buffer } from 'node:buffer'

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

type Field = { key: string; value: string; label: string; textAlignment: string }
const R = 'PKTextAlignmentRight'
const f = (key: string, value: string, label: string): Field => ({ key, value, label, textAlignment: R })

function buildFields(cat: string, card: Record<string, unknown>, meta: Record<string, string>): Field[] {
  const name = String(card.name ?? '')
  const num  = String(card.card_number ?? '')
  const exp  = String(card.expiry_date ?? '')

  switch (cat) {
    case 'id':
      return [
        ...(num ? [f('num', num, 'מספר ת.ז.')] : []),
        f('name', name, 'שם בעל הכרטיס'),
      ]
    case 'loyalty':
      return [
        ...(exp ? [f('exp', exp, 'תוקף')] : []),
        ...(num ? [f('num', num, "מס' רישיון")] : []),
        f('name', meta.holder_name || name, 'שם בעלים'),
      ]
    case 'student':
      return [
        ...(exp ? [f('dob', exp, 'תאריך לידה')] : []),
        ...(num ? [f('id', num, 'מספר ת.ז.')] : []),
      ]
    case 'license':
      return [
        ...(num ? [f('id', num, 'תעודת זהות')] : []),
        f('name', name, 'שם בעל הכרטיס'),
      ]
    case 'gift':
      return [
        ...(meta.balance ? [f('balance', `₪${meta.balance}`, 'יתרה')] : []),
        ...(exp ? [f('exp', exp, 'תאריך תפוגה')] : []),
        ...(num ? [f('code', num, 'קוד הכרטיס')] : []),
        f('name', name, 'שם הכרטיס'),
      ]
    case 'visit':
      return [
        ...(meta.phone ? [f('phone', meta.phone, 'מספר פלאפון')] : []),
        f('name', name, 'שם הכרטיס'),
      ]
    default:
      return [
        ...(exp ? [f('exp', exp, 'תוקף')] : []),
        ...(num ? [f('num', num, 'מספר')] : []),
        f('name', meta.holder_name || name, 'שם'),
      ]
  }
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

    const meta = (card.metadata as Record<string, string>) ?? {}
    const categoryLabels: Record<string, string> = {
      id: 'תעודות', license: 'רישיונות', loyalty: 'רישיון נשק',
      gift: 'גיפט קארד', student: 'סטודנט', visit: 'ביקור', other: 'אחר',
    }

    // pass.json
    const passJson: Record<string, unknown> = {
      formatVersion: 1,
      passTypeIdentifier: passTypeId,
      serialNumber: card.id,
      teamIdentifier: TEAM_ID,
      organizationName: 'OneWallet',
      description: card.name,
      backgroundColor: 'rgb(26, 18, 8)',
      foregroundColor: 'rgb(255, 255, 255)',
      labelColor: 'rgb(210, 195, 175)',
      storeCard: {
        headerFields: [],
        primaryFields: [],
        secondaryFields: [],
        auxiliaryFields: buildFields(card.category, card, meta),
        backFields: [],
      },
    }

    // Content files
    const files: Record<string, Uint8Array> = {}
    files['pass.json'] = new TextEncoder().encode(JSON.stringify(passJson))

    // Strip image — fill mode: scale to fill strip, center-crop, no letterbox
    if (card.image_url) {
      try {
        const imgRes = await fetch(card.image_url)
        if (imgRes.ok) {
          const rawBytes = new Uint8Array(await imgRes.arrayBuffer())
          const contentType = imgRes.headers.get('content-type') ?? ''

          let srcData: Uint8Array | null = null
          let srcW = 0, srcH = 0

          if (contentType.includes('jpeg') || contentType.includes('jpg') ||
              (rawBytes[0] === 0xFF && rawBytes[1] === 0xD8)) {
            const dec = jpeg.decode(rawBytes, { useTArray: true, maxMemoryUsageInMB: 512 })
            srcData = dec.data as Uint8Array
            srcW = dec.width
            srcH = dec.height
          } else if (contentType.includes('png') ||
              (rawBytes[0] === 0x89 && rawBytes[1] === 0x50 && rawBytes[2] === 0x4E && rawBytes[3] === 0x47)) {
            const png = PNG.sync.read(Buffer.from(rawBytes))
            srcData = new Uint8Array(png.data.buffer)
            srcW = png.width
            srcH = png.height
          }

          if (srcData && srcW > 0 && srcH > 0) {
            const STRIP_W = 1125, STRIP_H = 369
            const scale = Math.min(STRIP_W / srcW, STRIP_H / srcH) * 1.1
            const scaledW = Math.round(srcW * scale)
            const scaledH = Math.round(srcH * scale)
            const offX = Math.round((STRIP_W - scaledW) / 2)
            const offY = Math.round((STRIP_H - scaledH) / 2)

            const bgMatch = categoryColor(card.category).match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
            const [bgR, bgG, bgB] = bgMatch ? [+bgMatch[1], +bgMatch[2], +bgMatch[3]] : [0, 0, 0]

            const buf = Buffer.alloc(STRIP_W * STRIP_H * 4)
            for (let i = 0; i < STRIP_W * STRIP_H; i++) {
              buf[i * 4] = bgR; buf[i * 4 + 1] = bgG; buf[i * 4 + 2] = bgB; buf[i * 4 + 3] = 255
            }
            for (let y = 0; y < scaledH; y++) {
              for (let x = 0; x < scaledW; x++) {
                const sx = Math.min(Math.floor(x / scale), srcW - 1)
                const sy = Math.min(Math.floor(y / scale), srcH - 1)
                const si = (sy * srcW + sx) * 4
                const di = ((y + offY) * STRIP_W + (x + offX)) * 4
                buf[di] = srcData[si]; buf[di + 1] = srcData[si + 1]
                buf[di + 2] = srcData[si + 2]; buf[di + 3] = srcData[si + 3]
              }
            }

            const stripPng = new PNG({ width: STRIP_W, height: STRIP_H })
            stripPng.data = buf
            const stripBytes = new Uint8Array(PNG.sync.write(stripPng))

            console.log('Strip OK src:', srcW, 'x', srcH, '→ scale:', scale.toFixed(3), 'off:', offX, offY)
            files['strip.png'] = stripBytes
            files['strip@2x.png'] = stripBytes
            files['strip@3x.png'] = stripBytes
          } else {
            console.log('IMAGE_SKIP: decode returned no data, src:', srcW, srcH)
          }
        }
      } catch (e) {
        console.log('IMAGE_ERROR:', String(e))
      }
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
