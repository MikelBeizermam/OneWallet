export interface Business {
  id: string
  name: string
  tagline: string
  category: string
  areas: string[]
  online: boolean
  bgColor: string
  logoBg: string
  logoText: string
  isNew?: boolean
  canBook?: boolean
}

export const CATEGORIES = [
  { id: 'all',       label: 'הכל',               emoji: '✨', bg: '#FFF3E0' },
  { id: 'food',      label: 'מסעדות וקולינריה',   emoji: '🍽️', bg: '#FFF8E1' },
  { id: 'hotels',    label: 'מלונות ונופש',        emoji: '🏖️', bg: '#E8F5E9' },
  { id: 'spa',       label: 'ספא וימי כיף',        emoji: '💆', bg: '#FCE4EC' },
  { id: 'exp',       label: 'חוויות',              emoji: '🎭', bg: '#E3F2FD' },
  { id: 'shop',      label: 'קניות ואופנה',        emoji: '🛍️', bg: '#F3E5F5' },
  { id: 'workshop',  label: 'סדנאות והעשרה',       emoji: '🎨', bg: '#E8EAF6' },
  { id: 'new',       label: 'חדש על המדף',         emoji: '🏷️', bg: '#E0F7FA' },
]

export const AREAS = [
  'כל הארץ',
  'תל אביב והמרכז',
  'ירושלים והסביבה',
  'חיפה והצפון',
  'באר שבע והדרום',
  'אונליין',
]

export const BUSINESSES: Business[] = [
  // מסעדות
  {
    id: '1', name: 'מסעדת MOSHIK', tagline: 'מסעדת השף מושיק רוט',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    bgColor: '#1a1a2e', logoBg: '#fff', logoText: 'M', canBook: true,
  },
  {
    id: '2', name: 'קפה גרג', tagline: 'רשת קפה ומאפייה ישראלית',
    category: 'food', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: false,
    bgColor: '#3e2723', logoBg: '#fff', logoText: 'גרג',
  },
  {
    id: '3', name: 'ARIA', tagline: 'מסעדת שף יוקרתית בתל אביב',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    bgColor: '#212121', logoBg: '#gold', logoText: 'AR', canBook: true,
  },
  {
    id: '4', name: 'לנדוור', tagline: 'קפה אירופאי בסגנון אמסטרדמי',
    category: 'food', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    bgColor: '#5d4037', logoBg: '#fff', logoText: 'L',
  },
  {
    id: '5', name: 'אנג\'לו', tagline: 'מטבח איטלקי אותנטי ביפו',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    bgColor: '#b71c1c', logoBg: '#fff', logoText: 'A', canBook: true,
  },
  {
    id: '6', name: 'ביסטרו אגאדיר', tagline: 'ברגרים ואוכל ים תיכוני',
    category: 'food', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    bgColor: '#e65100', logoBg: '#fff', logoText: 'AG',
  },

  // מלונות
  {
    id: '7', name: 'ישרוטל', tagline: 'שרשרת מלונות פרמיום בישראל',
    category: 'hotels', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון', 'באר שבע והדרום'], online: false,
    bgColor: '#0d47a1', logoBg: '#fff', logoText: 'ישרוטל', canBook: true,
  },
  {
    id: '8', name: 'מלון דן תל אביב', tagline: 'מלון יוקרה על שפת הים',
    category: 'hotels', areas: ['תל אביב והמרכז'], online: false,
    bgColor: '#1565c0', logoBg: '#fff', logoText: 'DAN', canBook: true,
  },
  {
    id: '9', name: 'לאונרדו', tagline: 'רשת מלונות עסקית ומשפחתית',
    category: 'hotels', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: false,
    bgColor: '#283593', logoBg: '#fff', logoText: 'LEO',
  },
  {
    id: '10', name: 'פנינת הצפון', tagline: 'אתר נופש ואחוזת אירוח בגליל',
    category: 'hotels', areas: ['חיפה והצפון'], online: false,
    bgColor: '#2e7d32', logoBg: '#fff', logoText: 'PN', canBook: true,
  },

  // ספא
  {
    id: '11', name: 'ספא ורדינון', tagline: 'חוויית ספא מפנקת ומרגיעה',
    category: 'spa', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    bgColor: '#880e4f', logoBg: '#fff', logoText: 'SPA', canBook: true,
  },
  {
    id: '12', name: 'חמי מעיין חרוד', tagline: 'מעיינות חמים וספא בעמק',
    category: 'spa', areas: ['חיפה והצפון'], online: false,
    bgColor: '#4a148c', logoBg: '#fff', logoText: 'חמי',
  },
  {
    id: '13', name: 'ספא מלכים', tagline: 'טיפולי פנים, עיסויים ורפואה',
    category: 'spa', areas: ['תל אביב והמרכז'], online: false,
    bgColor: '#6a1b9a', logoBg: '#fff', logoText: 'M', canBook: true,
  },
  {
    id: '14', name: 'ספא לה בומב', tagline: 'ספא עירוני מפנק במרכז תל אביב',
    category: 'spa', areas: ['תל אביב והמרכז'], online: false,
    bgColor: '#ad1457', logoBg: '#fff', logoText: 'LB',
  },

  // חוויות
  {
    id: '15', name: 'פלייגראונד TLV', tagline: 'חוויית בריחה ואטרקציות',
    category: 'exp', areas: ['תל אביב והמרכז'], online: false,
    bgColor: '#e53935', logoBg: '#fff', logoText: 'PG',
  },
  {
    id: '16', name: 'סנפלינג ישראל', tagline: 'ריגושים בטבע ואדרנלין',
    category: 'exp', areas: ['תל אביב והמרכז', 'חיפה והצפון', 'ירושלים והסביבה'], online: false,
    bgColor: '#1b5e20', logoBg: '#fff', logoText: 'SNP', canBook: true,
  },
  {
    id: '17', name: 'הגן הצומח', tagline: 'סיורי טבע ופעילות משפחתית',
    category: 'exp', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    bgColor: '#33691e', logoBg: '#fff', logoText: 'GN',
  },
  {
    id: '18', name: 'אסקייפ רום', tagline: 'חדרי בריחה לחוויה קבוצתית',
    category: 'exp', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    bgColor: '#311b92', logoBg: '#fff', logoText: 'ESC',
  },

  // קניות ואופנה
  {
    id: '19', name: 'adidas', tagline: 'מותג ספורט ואופנה בינלאומי',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: true,
    bgColor: '#212121', logoBg: '#fff', logoText: 'ADI',
  },
  {
    id: '20', name: 'MAC Cosmetics', tagline: 'קוסמטיקה מקצועית ואיפור',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: true,
    bgColor: '#1a1a1a', logoBg: '#fff', logoText: 'MAC',
  },
  {
    id: '21', name: 'טרקלין חשמל', tagline: 'רשת מוצרי חשמל ואלקטרוניקה',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון', 'באר שבע והדרום'], online: true,
    bgColor: '#b71c1c', logoBg: '#fff', logoText: 'TH',
  },
  {
    id: '22', name: 'Sephora', tagline: 'בושם, קוסמטיקה וטיפוח',
    category: 'shop', areas: ['תל אביב והמרכז'], online: true,
    bgColor: '#000000', logoBg: '#fff', logoText: 'SEP', isNew: true,
  },
  {
    id: '23', name: 'עגליגס', tagline: 'אופנת ילדים ותינוקות',
    category: 'shop', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: true,
    bgColor: '#f57f17', logoBg: '#fff', logoText: 'EG',
  },
  {
    id: '24', name: 'Castro', tagline: 'אופנה ישראלית לגבר ולאישה',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון', 'באר שבע והדרום'], online: true,
    bgColor: '#37474f', logoBg: '#fff', logoText: 'CA',
  },

  // סדנאות
  {
    id: '25', name: 'אקדמיה לצילום', tagline: 'סדנאות צילום לכל הרמות',
    category: 'workshop', areas: ['תל אביב והמרכז'], online: true,
    bgColor: '#263238', logoBg: '#fff', logoText: 'AC',
  },
  {
    id: '26', name: 'סדנת בישול שף', tagline: 'לומדים לבשל עם שפים מקצועיים',
    category: 'workshop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    bgColor: '#e65100', logoBg: '#fff', logoText: 'בישול', canBook: true,
  },
  {
    id: '27', name: 'סדנת קרמיקה', tagline: 'יצירה עם חומרים טבעיים',
    category: 'workshop', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    bgColor: '#795548', logoBg: '#fff', logoText: 'KR',
  },
  {
    id: '28', name: 'ציור ויין', tagline: 'ערב יצירה עם כוס יין',
    category: 'workshop', areas: ['תל אביב והמרכז'], online: false,
    bgColor: '#6a1b9a', logoBg: '#fff', logoText: 'W', canBook: true,
  },

  // חדש
  {
    id: '29', name: 'BuyMe Digital', tagline: 'כרטיסי מתנה דיגיטליים',
    category: 'new', areas: ['אונליין'], online: true,
    bgColor: '#F5A623', logoBg: '#fff', logoText: 'BM', isNew: true,
  },
  {
    id: '30', name: 'ספר גיפטס', tagline: 'ספרים וחוויות קריאה כמתנה',
    category: 'new', areas: ['אונליין', 'תל אביב והמרכז'], online: true,
    bgColor: '#1565c0', logoBg: '#fff', logoText: 'SP', isNew: true,
  },
]
