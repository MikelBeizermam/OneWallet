import { corsHeaders } from '../_shared/cors.ts'

const PROMPTS: Record<string, string> = {
  id: `This is an Israeli ID card (תעודת זהות). Extract:
- name: full name on the card
- card_number: ID number (9 digits)
- expiry_date: issue date in DD/MM/YYYY
- id_expiry: expiry date in DD/MM/YYYY
Return ONLY JSON: {"name","card_number","expiry_date","id_expiry"}`,

  license: `This is a driving license (רישיון נהיגה). Extract:
- name: full name
- card_number: ID number
- expiry_date: issue date in DD/MM/YYYY
- license_expiry: expiry date in DD/MM/YYYY
Return ONLY JSON: {"name","card_number","expiry_date","license_expiry"}`,

  loyalty: `This is a weapon/loyalty license (רישיון). Extract:
- name: card/license name
- card_number: license number
- expiry_date: expiry date in DD/MM/YYYY
- holder_name: holder's full name
Return ONLY JSON: {"name","card_number","expiry_date","holder_name"}`,

  gift: `This is a gift card (כרטיס מתנה). Extract:
- name: brand or store name
- card_number: gift card code/number
- expiry_date: expiry date in DD/MM/YYYY
Return ONLY JSON: {"name","card_number","expiry_date"}`,

  student: `This is a student card (כרטיס סטודנט). Extract:
- name: student's full name
- card_number: student ID number
- expiry_date: birth date in DD/MM/YYYY
- valid_year: academic year (e.g. 2024-2025)
Return ONLY JSON: {"name","card_number","expiry_date","valid_year"}`,

  visit: `This is a business card (כרטיס ביקור). Extract:
- name: person or business name
- phone: phone number
- expiry_date: any date if visible in DD/MM/YYYY
Return ONLY JSON: {"name","phone","expiry_date"}`,

  other: `This is a card. Extract whatever is visible:
- name: card name or issuer
- card_number: any number on the card
- expiry_date: expiry date in DD/MM/YYYY
Return ONLY JSON: {"name","card_number","expiry_date"}`,
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
