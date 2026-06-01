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

const SKIP_WORDS = new Set([
  'ID', 'STATE', 'ISRAEL', 'DRIVING', 'LICENCE', 'LICENSE', 'PASSPORT', 'VALID',
  'INTERNATIONAL', 'STUDENT', 'UNION', 'MEMBER', 'CARD', 'ATIUN', 'DATE',
  'BIRTH', 'ONO', 'ACADEMIC', 'COLLEGE', 'UNIVERSITY', 'INSTITUTE',
])

// Extract person name — prefers "Firstname Lastname" (Title Case) over ALL CAPS
function parsePersonName(text: string): string | null {
  // 1. Look for "Firstname Lastname" in Title Case (e.g. "Mikel Beizerman")
  const titleCaseMatch = text.match(/\b([A-Z][a-z]{1,14})\s+([A-Z][a-z]{1,14})\b/)
  if (titleCaseMatch) return `${titleCaseMatch[1]} ${titleCaseMatch[2]}`

  // 2. Fallback: ALL CAPS words filtered by skip list
  const capsWords = (text.match(/\b[A-Z]{2,15}\b/g) ?? []).filter(w => !SKIP_WORDS.has(w))
  if (capsWords.length >= 2) return `${capsWords[0]} ${capsWords[1]}`
  if (capsWords.length === 1) return capsWords[0]

  return null
}

// Extract ID number after "ID" keyword (e.g. "4d.ID 206466781")
function parseIdAfterKeyword(text: string): string | null {
  const m = text.match(/\bID\s+(\d{7,10})\b/i)
  return m ? m[1] : null
}

function parseCardData(text: string, category: string): Record<string, string | null> {
  const dates   = parseDates(text)
  const numbers = parseNumbers(text)

  const result: Record<string, string | null> = {
    name: null, card_number: null, expiry_date: null,
    holder_name: null, phone: null,
    id_expiry: null, license_expiry: null, valid_year: null,
  }

  const personName = parsePersonName(text)

  switch (category) {
    case 'id':
      // Israeli ID: number is 9 digits, name is FIRSTNAME LASTNAME in caps
      result.name        = personName
      result.card_number = parseIdAfterKeyword(text) ?? numbers.find(n => n.length === 9) ?? numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
      result.id_expiry   = dates[1] ?? dates[0] ?? null
      break

    case 'license':
      // Driving license: card_number = ID number (after "ID" keyword), name = person name
      result.name           = personName
      result.card_number    = parseIdAfterKeyword(text) ?? numbers.find(n => n.length === 9) ?? numbers[0] ?? null
      result.expiry_date    = dates[0] ?? null
      result.license_expiry = dates[1] ?? dates[0] ?? null
      break

    case 'loyalty': {
      // Israeli weapon license — Hebrew text patterns
      // Name: after "שם:" or "שם :"
      const hebrewName = text.match(/שם\s*[:\-]?\s*([^\n\r]+)/)
      const holderName = hebrewName?.[1]?.trim() ?? personName ?? null

      // License number: after "מס'" or "מספר" or "מס:"
      const licenseNum = text.match(/מס[''׳]?\s*[:\-]?\s*(\d{5,12})/)
        ?? text.match(/\b1[0-9]{9}\b/)  // common Israeli weapon license format
      const cardNum = licenseNum?.[1] ?? numbers[0] ?? null

      // Expiry: after "תוקף" or "בתוקף עד"
      const expiryMatch = text.match(/תוקף[^\d]*(\d{1,2}[./]\d{1,2}[./]\d{2,4})/)
      const expiry = expiryMatch
        ? expiryMatch[1].replace(/\./g, '/')
        : dates[0] ?? null

      result.name        = holderName
      result.holder_name = holderName
      result.card_number = cardNum
      result.expiry_date = expiry
      break
    }

    case 'gift': {
      const giftCode = text.match(/\b[A-Z0-9]{4}[-\s]?[A-Z0-9]{4}[-\s]?[A-Z0-9]{4,}\b/)
      result.card_number = giftCode?.[0] ?? numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
      result.name        = personName ?? 'כרטיס מתנה'
      break
    }

    case 'student': {
      result.name        = personName
      result.card_number = numbers.find(n => n.length === 9) ?? numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
      const yearMatch    = text.match(/\b(20\d{2})[-–](20\d{2})\b/)
      result.valid_year  = yearMatch ? yearMatch[0] : null
      break
    }

    case 'visit':
      result.phone = parsePhone(text)
      result.name  = personName
      break

    default:
      result.card_number = numbers[0] ?? null
      result.expiry_date = dates[0] ?? null
      result.name        = personName
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

    const apiKey = Deno.env.get('OCR_SPACE_API_KEY') || 'helloworld'
    console.log('Using API key prefix:', apiKey.slice(0, 4))

    const form = new FormData()
    form.append('base64Image', `data:${mediaType};base64,${imageBase64}`)
    form.append('language', 'eng')
    form.append('isOverlayRequired', 'false')
    form.append('detectOrientation', 'true')
    form.append('scale', 'true')
    form.append('isTable', 'false')
    form.append('OCREngine', '2')

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: { apikey: apiKey },
      body: form,
    })

    const data = await response.json()
    console.log('OCR full response:', JSON.stringify(data).slice(0, 500))

    if (data.IsErroredOnProcessing) {
      throw new Error(data.ErrorMessage?.[0] ?? 'OCR failed')
    }

    const rawText = data.ParsedResults?.[0]?.ParsedText ?? ''
    console.log('OCR raw text:', rawText.slice(0, 300))
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
