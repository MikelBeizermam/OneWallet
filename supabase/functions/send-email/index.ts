import { corsHeaders } from '../_shared/cors.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const FROM_EMAIL = 'noreply@onewallet.app'

interface EmailPayload {
  to: string
  type: 'welcome' | 'reset'
  name?: string
  actionUrl?: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { to, type, name, actionUrl }: EmailPayload = await req.json()

  const templates: Record<string, { subject: string; html: string }> = {
    welcome: {
      subject: 'ברוך הבא ל-oneWallet! 👋',
      html: `
        <div dir="rtl" style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#FAF8F5;border-radius:16px;">
          <h1 style="color:#8C7355;font-size:24px;margin-bottom:8px;">שלום ${name ?? ''}!</h1>
          <p style="color:#1A1208;font-size:16px;line-height:1.6;">ברוך הבא ל-<strong>oneWallet</strong> — הארנק הדיגיטלי שלך.</p>
          <p style="color:#1A1208;font-size:16px;line-height:1.6;">עכשיו אתה יכול להוסיף כרטיסים, לסרוק מסמכים ולנהל את כל התעודות שלך במקום אחד.</p>
          <a href="${actionUrl}" style="display:inline-block;margin-top:24px;padding:14px 32px;background:#8C7355;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">פתח את oneWallet</a>
        </div>
      `,
    },
    reset: {
      subject: 'איפוס סיסמה — oneWallet',
      html: `
        <div dir="rtl" style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#FAF8F5;border-radius:16px;">
          <h1 style="color:#8C7355;font-size:24px;margin-bottom:8px;">איפוס סיסמה</h1>
          <p style="color:#1A1208;font-size:16px;line-height:1.6;">קיבלנו בקשה לאיפוס הסיסמה שלך.</p>
          <p style="color:#1A1208;font-size:16px;line-height:1.6;">לחץ על הכפתור למטה לבחירת סיסמה חדשה. הקישור תקף ל-24 שעות.</p>
          <a href="${actionUrl}" style="display:inline-block;margin-top:24px;padding:14px 32px;background:#8C7355;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">אפס סיסמה</a>
          <p style="margin-top:24px;font-size:13px;color:#B0A090;">אם לא ביקשת זאת, אפשר להתעלם ממייל זה.</p>
        </div>
      `,
    },
  }

  const tpl = templates[type]
  if (!tpl) {
    return new Response(JSON.stringify({ error: 'Unknown email type' }), { status: 400, headers: corsHeaders })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject: tpl.subject, html: tpl.html }),
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    status: res.ok ? 200 : 400,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
