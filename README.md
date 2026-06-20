# OneWallet — הארנק הדיגיטלי החכם

> ארנק דיגיטלי בעברית שמרכז את כל הכרטיסים, התעודות והמסמכים שלך במקום אחד — עם סריקה חכמה באמצעות AI.

🔗 **פרויקט חי:** [one-wallet-six.vercel.app](https://one-wallet-six.vercel.app)

🏠 **דף נחיתה:** [one-wallet-six.vercel.app/landing](https://one-wallet-six.vercel.app/landing)

---

## הבעיה שאנחנו פותרים

הישראלי הממוצע משלם על הכל עם הטלפון — אבל עדיין נאלץ לסחוב ארנק פיזי בגלל תעודות ממשלתיות.

**הסיפור שהוביל לפרויקט:**
> *"כמה פעמים הגעתי לקניון ועצרו אותי בכניסה כי שכחתי את רישיון הנשק באוטו. או שביקשו ממני ת"ז ואני מתחיל לחפש בתמונות כמו אידיוט כי הארנק בבית — כי גם ככה אני משלם על הכל עם הפלאפון."*

הפתרונות הקיימים (Apple Wallet, Google Wallet) תומכים בכרטיסי אשראי ותחבורה — אבל **לא בתעודות ממשלתיות ישראליות**. אין מקום מרכזי אחד לנהל תעודת זהות, רישיון נהיגה, רישיון נשק, כרטיס סטודנט וכרטיסי מתנה — בעברית, ב-RTL, עם ממשק ישראלי.

---

## קהל היעד

**ישראלים בגילאי 18–45** שמשלמים עם הטלפון אבל עדיין נאלצים לסחוב ארנק פיזי בגלל תעודות ממשלתיות.

### פרסונות משתמשים

**ריי, 21, לוחם ביחידת יהלום**
רמת טכנולוגית גבוהה. התסכול: שכח ארנק באוטו → לא יכול להיכנס לקניון ללא רישיון נשק → חוזר לרכב. הפתרון היום: חיפוש תמונה בגלריה ומקווה שהמאבטח יקבל.

**ליאור, 27, סטודנטית למדעי המחשב**
רמת טכנולוגית גבוהה. התסכול: מחפשת באיזה תיק נמצא הכרטיס סטודנט, כרטיס קופת חולים, כרטיס מתנה. הפתרון היום: בקשת אישור "שכחתי כרטיס" ומחכה לקוד זמני.

---

## מתחרים ובידול

| מתחרה | סוג | חוזקות | מה חסר |
|--------|-----|---------|---------|
| Apple Wallet | ארנק מובנה iOS | אינטגרציה מלאה, אשראי, טיסות | לא תומך בתעודות ממשלתיות ישראליות, אין RTL |
| Google Wallet | ארנק מובנה Android | תמיכה רחבה, נאמנות | תמיכה מוגבלת בישראל, אין תעודות ממשלתיות |
| Pass2U Wallet | ניהול כרטיסים | סריקת ברקוד, תמיכה iOS/Android | ממשק מסורבל ומיושן, תבניות לא רלוונטיות לישראל |
| Stocard | נאמנות | תצוגת כרטיסים פשוטה | לא תומך בתעודות ממשלתיות ישראליות |
| WhatsApp / גלריה | פתרון ידני | זמין תמיד | כאוטי, לא מאורגן, לא מקצועי |

**הבידול שלנו — מה שאף אחד לא נותן:**
- ✅ עברית מלאה + RTL מושלם
- ✅ תמיכה בתעודות ממשלתיות ישראליות (ת"ז, רישיון נהיגה, רישיון נשק, סטודנט)
- ✅ סריקת OCR חכמה עם Claude AI — מזהה תמונה ומחלץ פרטים אוטומטית
- ✅ ייצוא ל-Apple Wallet (.pkpass)
- ✅ מצב חירום "ארנק אבד" לדיווח מיידי
- ✅ עיצוב Heritage Soft — חמים, מקצועי, מותאם לתרבות הישראלית

---

## פיצ'רים עיקריים

| פיצ'ר | תיאור |
|--------|--------|
| סריקת כרטיסים חכמה | צילום תמונה → Claude Haiku מזהה סוג הכרטיס ומחלץ פרטים אוטומטית |
| 10 קטגוריות | תעודות, רישיונות, כרטיסי מתנה, נאמנות, נכה, רפואי, סטודנט, ביקור ועוד |
| Apple Wallet | ייצוא כרטיס כ-.pkpass לשימוש ב-Wallet הנייטיבי |
| ארנק אבד | מסך חירום עם הוראות דיווח וביטול מיידי לכל כרטיס |
| תוכנית Freemium | Free: 2 כרטיסים · Pro: עד 10 כרטיסים ב-₪10 חד-פעמי |
| Google OAuth | התחברות מהירה עם חשבון Google |
| Admin Dashboard | ניהול משתמשים ושדרוג Pro ידני |

---

## מודל עסקי

**Freemium:**
- **חינמי** — 2 כרטיסים
- **Pro** — עד 10 כרטיסים, תשלום חד-פעמי של ₪10

**גודל שוק (הערכה):**
- **TAM** — שוק ארנקים דיגיטליים עולמי: $117 מיליארד (2024), גדל ב-17% שנתי
- **SAM** — שוק תשלומים דיגיטליים בישראל: $48 מיליארד, 87% מהישראלים מעל 15 משתמשים
- **SOM** — יעד שנה ראשונה: 5,000–10,000 משתמשים פעילים

---

## טכנולוגיות

| שכבה | טכנולוגיה |
|------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| עיצוב | CSS Modules, RTL, Responsive, Heritage Soft Design System |
| Backend | Supabase (PostgreSQL + Auth + Storage + Edge Functions) |
| AI | Anthropic Claude Haiku (OCR סריקת כרטיסים) |
| Deploy | Vercel (CI/CD אוטומטי מ-GitHub) |
| בדיקות | Vitest — 11 טסטים (Read/Create/Update/Delete/RLS) |
| Monitoring | Vercel Analytics + Microsoft Clarity + Sentry |

---

## שירותים חיצוניים ואינטגרציות

| שירות | סוג | תפקיד במוצר |
|--------|-----|-------------|
| **Supabase Auth** | אוטנטיקציה | התחברות עם מייל/סיסמה |
| **Google OAuth** | אוטנטיקציה | התחברות מהירה עם Google |
| **Anthropic Claude Haiku** | API — בינה מלאכותית | OCR: סריקת תמונות כרטיסים וחילוץ פרטים אוטומטי |
| **Supabase PostgreSQL** | בסיס נתונים | אחסון פרופילים וכרטיסים |
| **Supabase Storage** | אחסון קבצים | תמונות כרטיסים |
| **Supabase Edge Functions** | לוגיקת שרת | הפעלת Claude API, Stripe, Apple Wallet ו-Resend מאחורי שרת (הסתרת מפתחות) |
| **Stripe** | תשלומים | עיבוד תשלום לשדרוג Pro (₪10 חד-פעמי) |
| **Resend** | מיילים | שליחת מייל ברוכים הבאים ואיפוס סיסמה |
| **Apple PassKit** | ייצוא | יצירת קבצי .pkpass ל-Apple Wallet |
| **Vercel** | דיפלוימנט | אחסון האפליקציה + CI/CD אוטומטי |
| **Vercel Analytics** | מדידה | ניתוח תנועה ועמודים |
| **Microsoft Clarity** | מדידה | הקלטת sessions ו-heatmaps |
| **Sentry** | ניטור שגיאות | מעקב אחר JavaScript errors בזמן אמת |

---

## מודל הנתונים (ERD)

![ERD](public/erd.png)

**טבלאות עיקריות:**

```
profiles
├── id (uuid, FK → auth.users)
├── full_name (text)
├── avatar_url (text)
├── plan (text: 'free' | 'pro')
├── created_at (timestamptz)
└── updated_at (timestamptz)

cards
├── id (uuid, PK)
├── user_id (uuid, FK → profiles.id)
├── name (text)
├── category (text: id|license|loyalty|gift|student|visit|other|disability|medical)
├── card_number (text)
├── expiry_date (text)
├── image_url (text)
├── template_id (text)
├── metadata (jsonb)
├── sort_order (int)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

**אבטחה — RLS (Row Level Security):** כל משתמש רואה ועורך רק את הנתונים שלו. מפתחות API מוסתרים בתוך Edge Functions בלבד.

**הרשאות לפי תפקיד:**
- **Owner** — יוצר, קורא, עורך ומוחק רק את הכרטיסים שלו
- **Admin** (`miki199838@gmail.com`) — גישה לכל המשתמשים, שדרוג Pro ידני

---

## הרצה מקומית

```bash
# שיבוט הפרויקט
git clone https://github.com/MikelBeizermam/OneWallet.git
cd OneWallet

# התקנת dependencies
npm install

# הגדרת משתני סביבה
cp .env.example .env.local
# מלא VITE_SUPABASE_URL ו-VITE_SUPABASE_ANON_KEY

# הרצה מקומית
npm run dev

# הרצת בדיקות
npm test
```

---

## נתוני דמו לבדיקה

להתחברות מהירה — השתמש ב-Google OAuth, או צור חשבון חדש עם מייל.

לבדיקת פיצ'רי Admin (ניהול משתמשים, שדרוג Pro ידני): `miki199838@gmail.com`

---

## מבנה הפרויקט

```
src/
├── pages/          # עמודים (Home, Cards, Profile, Admin, LostWallet...)
├── components/     # רכיבים משותפים (BottomNav, WalletCard, Sidebar...)
├── contexts/       # AuthContext, CardsContext
├── hooks/          # useCards, useNotifications
├── lib/            # supabase client
├── data/           # נתוני בתי עסק (BuyMe — 85 עסקים, HTZ)
├── types/          # TypeScript types
└── tests/          # 11 בדיקות Vitest (Read/Create/Update/Delete/RLS)

supabase/
├── schema.sql      # סכמת בסיס הנתונים + RLS + Triggers
├── seed.sql        # נתוני דמו
└── functions/      # Edge Functions:
    ├── scan-card/         # OCR עם Claude Haiku
    ├── create-checkout-session/  # Stripe checkout
    ├── stripe-webhook/    # עדכון plan לאחר תשלום
    ├── generate-pass/     # יצירת Apple Wallet .pkpass
    └── send-email/        # מיילים עם Resend
```

---

## עיצוב — Heritage Soft Design System

הפרויקט משתמש בפלטת "Heritage Soft" — גוונים חמים של עור ומוקה:

| צבע | Hex | שימוש |
|-----|-----|--------|
| Primary (Muted Mocha) | `#8C7355` | כפתורים ראשיים |
| Secondary | `#D4B896` | הדגשות משניות |
| Background | `#F0EBE3` | רקע כללי |
| Text | `#1A1208` | טקסט ראשי |

פונט: **Plus Jakarta Sans** · יחידת ריווח: 8px

---

*פותח במסגרת קורס פיתוח מוצר מבוסס AI — 2026*
