import { corsHeaders } from '../_shared/cors.ts'

const PROMPTS: Record<string, string> = {
  id: `This is an Israeli ID card. Extract the actual values and return ONLY this JSON (no explanation):
{"name": "actual full name from card", "card_number": "actual 9-digit ID number", "expiry_date": "actual issue date as DD/MM/YYYY or null", "id_expiry": "actual expiry date as DD/MM/YYYY or null"}`,

  license: `This is an Israeli driving license. Extract the actual values and return ONLY this JSON (no explanation):
{"name": "actual full name from card", "card_number": "actual 9-digit ID number", "expiry_date": "actual issue date as DD/MM/YYYY or null", "license_expiry": "actual expiry date as DD/MM/YYYY or null"}`,

  loyalty: `This is an Israeli weapon license. Extract the actual values and return ONLY this JSON (no explanation):
{"name": "actual full name of license holder", "holder_name": "actual full name of license holder", "card_number": "actual license number", "expiry_date": "actual expiry date as DD/MM/YYYY or null"}`,

  gift: `This is a gift card. Extract the actual values and return ONLY this JSON (no explanation):
{"name": "actual brand or store name", "card_number": "actual card code or number", "expiry_date": "actual expiry date as DD/MM/YYYY or null"}`,

  student: `This is a student ID card. Extract the actual values and return ONLY this JSON (no explanation):
{"name": "actual full name of student", "card_number": "actual ID number", "expiry_date": "actual birth date as DD/MM/YYYY or null", "valid_year": "actual academic year e.g. 2024-2025 or null"}`,

  visit: `This is a business card. Extract the actual values and return ONLY this JSON (no explanation):
{"name": "actual person or business name", "phone": "actual phone number or null"}`,

  other: `This is a card. Extract visible information and return ONLY this JSON (no explanation):
{"name": "actual card name or issuer", "card_number": "actual number on card or null", "expiry_date": "actual expiry date as DD/MM/YYYY or null"}`,
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

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
