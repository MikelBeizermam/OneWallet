import { corsHeaders } from '../_shared/cors.ts'

// ── Parse raw OCR text per category ──────────────────────────────
function parseDates(text: string): string[] {
  const pattern = /\b(\d{1,2})[./](\d{1,2})[./](\d{2,4})\b/g
  const results: string[] = []
  let m
  while ((m = pattern.exec(text)) !== null) {
    const [, d, mo, y] = m
    const year = y.length === 2 ? `20${y}` : y
    results.push(`${d.padStart(2,'0')}/${mo.padStart(2,'0')}/${year}`)
  }
  return results
}

function parseNumbers(text: string): string[] {
  return [...text.matchAll(/\b\d{7,16}\b/g)].map(m => m[0])
}

function parsePhone(text: string): string | null {
  const m = text.match(/\b0\d[\d\s\-]{7,10}\b/)
  return m ? m[0].replace(/\s/g, '-') : null
}

function parseCardData(text: string, category: string): Record<string, string | null> {
  const dates   = parseDates(text)
  const numbers = parseNumbers(text)
  const lines   = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 2)

  const result: Record<string, string | null> = {
    name: null, card_number: null, expiry_date: null,
    holder_name: null, phone: null,
    id_expiry: null, license_expiry: null, valid_year: null,
  }

  // Name: longest non-numeric line
  const nameLine = lines
    .filter(l => /[a-zA-Z֐-׿]/.test(l) && !/^\d+$/.test(l))
    .sort((a, b) => b.length - a.length)[0] ?? null
  result.name = nameLine

  switch (category) {
    case 'id':
      result.card_number = numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
      result.id_expiry   = dates[1] ?? dates[0] ?? null
      break

    case 'license':
      result.card_number    = numbers[0] ?? null
      result.expiry_date    = dates[0] ?? null
      result.license_expiry = dates[1] ?? dates[0] ?? null
      break

    case 'loyalty':
      result.card_number = numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
      result.holder_name = nameLine
      break

    case 'gift':
      // Gift card codes often have dashes
      const giftCode = text.match(/\b[A-Z0-9]{4}[-\s]?[A-Z0-9]{4}[-\s]?[A-Z0-9]{4,}\b/)
      result.card_number = giftCode?.[0] ?? numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
      result.name = nameLine ?? 'כרטיס מתנה'
      break

    case 'student':
      result.card_number = numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
      // Academic year pattern e.g. 2024-2025 or תשפ"ה
      const yearMatch = text.match(/\b(20\d{2})[-–](20\d{2})\b/)
      result.valid_year = yearMatch ? yearMatch[0] : null
      break

    case 'visit':
      result.phone = parsePhone(text)
      result.name  = nameLine
      break

    default:
      result.card_number = numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
  }

  return result
}

// ── Edge function ─────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { imageBase64, mediaType = 'image/jpeg', category = 'other' } = await req.json()

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: 'imageBase64 required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const apiKey = Deno.env.get('OCR_SPACE_API_KEY') ?? 'helloworld'

    const form = new FormData()
    form.append('base64Image', `data:${mediaType};base64,${imageBase64}`)
    form.append('language', 'eng')
    form.append('isOverlayRequired', 'false')
    form.append('detectOrientation', 'true')
    form.append('scale', 'true')
    form.append('OCREngine', '2')

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: { apikey: apiKey },
      body: form,
    })

    const data = await response.json()

    if (data.IsErroredOnProcessing) {
      throw new Error(data.ErrorMessage?.[0] ?? 'OCR failed')
    }

    const rawText = data.ParsedResults?.[0]?.ParsedText ?? ''
    const parsed  = parseCardData(rawText, category)

    return new Response(JSON.stringify({ ...parsed, _raw: rawText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
