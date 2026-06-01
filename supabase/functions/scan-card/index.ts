import { corsHeaders } from '../_shared/cors.ts'

const PROMPTS: Record<string, string> = {
  id: `זהו כרטיס תעודת זהות ישראלי. חלץ את הפרטים הבאים והחזר JSON בלבד:
{"name":"שם מלא","card_number":"מספר תעודת זהות 9 ספרות","expiry_date":"תאריך הנפקה DD/MM/YYYY","id_expiry":"תאריך תפוגה DD/MM/YYYY"}`,

  license: `זהו רישיון נהיגה ישראלי. חלץ את הפרטים הבאים והחזר JSON בלבד:
{"name":"שם מלא","card_number":"מספר תעודת זהות 9 ספרות","expiry_date":"תאריך הנפקה DD/MM/YYYY","license_expiry":"תאריך תפוגה DD/MM/YYYY"}`,

  loyalty: `זהו רישיון נשק ישראלי. חלץ את הפרטים הבאים והחזר JSON בלבד:
{"name":"שם בעל הרישיון","holder_name":"שם בעל הרישיון","card_number":"מספר הרישיון","expiry_date":"תאריך תפוגה DD/MM/YYYY"}`,

  gift: `זהו כרטיס מתנה. חלץ את הפרטים הבאים והחזר JSON בלבד:
{"name":"שם המותג או החנות","card_number":"קוד הכרטיס","expiry_date":"תאריך תפוגה DD/MM/YYYY"}`,

  student: `זהו כרטיס סטודנט. חלץ את הפרטים הבאים והחזר JSON בלבד:
{"name":"שם מלא של הסטודנט","card_number":"מספר תעודת זהות","expiry_date":"תאריך לידה DD/MM/YYYY","valid_year":"שנת לימודים למשל 2024-2025"}`,

  visit: `זהו כרטיס ביקור. חלץ את הפרטים הבאים והחזר JSON בלבד:
{"name":"שם האדם או העסק","phone":"מספר טלפון"}`,

  other: `זהו כרטיס. חלץ את הפרטים הנראים לעין והחזר JSON בלבד:
{"name":"שם הכרטיס או המנפיק","card_number":"מספר כלשהו על הכרטיס","expiry_date":"תאריך תפוגה DD/MM/YYYY"}`,
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
