import { corsHeaders } from '../_shared/cors.ts'

const RULE = 'If a value cannot be read clearly, use null. Never write explanatory text as a value.'

const PROMPTS: Record<string, string> = {
  id: `This is an Israeli ID card. Return ONLY this JSON, no explanation. ${RULE}
Important: the card has 3 dates — birth date (תאריך לידה), issue date (תאריך הנפקה), expiry date (תאריך תפוגה). The issue date comes AFTER the birth date on the card.
{"name": "full name or null", "card_number": "9-digit ID number or null", "expiry_date": "ISSUE date (הנפקה) DD/MM/YYYY — NOT the birth date", "id_expiry": "EXPIRY date (תפוגה) DD/MM/YYYY or null"}`,

  license: `This is an Israeli driving license. Return ONLY this JSON, no explanation. ${RULE}
{"name": "full name or null", "card_number": "9-digit ID number or null", "expiry_date": "issue date DD/MM/YYYY or null", "license_expiry": "expiry date DD/MM/YYYY or null"}`,

  loyalty: `This is an Israeli weapon license. Return ONLY this JSON, no explanation. ${RULE}
{"name": "license holder full name or null", "holder_name": "license holder full name or null", "card_number": "license number or null", "expiry_date": "expiry date DD/MM/YYYY or null"}`,

  gift: `This is a gift card. Return ONLY this JSON, no explanation. ${RULE}
{"name": "brand or store name or null", "card_number": "card code or null", "expiry_date": "expiry date DD/MM/YYYY or null"}`,

  student: `This is a student ID card. Return ONLY this JSON, no explanation. ${RULE}
{"name": "student full name or null", "card_number": "ID number or null", "expiry_date": "birth date DD/MM/YYYY or null", "valid_year": "academic year e.g. 2024-2025 or null"}`,

  visit: `This is a business card. Return ONLY this JSON, no explanation. ${RULE}
{"name": "person or business name or null", "phone": "phone number or null"}`,

  other: `This is a card. Return ONLY this JSON, no explanation. ${RULE}
{"name": "card name or issuer or null", "card_number": "any number on card or null", "expiry_date": "expiry date DD/MM/YYYY or null"}`,
}

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

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured')

    const prompt = PROMPTS[category] ?? PROMPTS.other

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: imageBase64 },
            },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    })

    const data = await response.json()

    if (data.error) throw new Error(data.error.message ?? 'Claude API error')

    const text = data?.content?.[0]?.text ?? ''

    let parsed: Record<string, string | null> = {}
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0])
    } catch {
      return new Response(JSON.stringify({ error: 'Could not parse response', raw: text }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Remove any values that are explanatory text instead of real data
    const JUNK = /unable|cannot|not visible|not readable|unreadable|unclear|n\/a|unknown/i
    for (const key of Object.keys(parsed)) {
      if (typeof parsed[key] === 'string' && JUNK.test(parsed[key] as string)) {
        parsed[key] = null
      }
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
