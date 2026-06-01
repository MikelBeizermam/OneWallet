export interface Business {
  id: string
  name: string
  tagline: string
  category: string
  areas: string[]
  online: boolean
  imageUrl: string
  logoBg: string
  logoText: string
  isNew?: boolean
  canBook?: boolean
}

export const CATEGORIES = [
  { id: 'all',      label: 'הכל',             emoji: '✨', bg: '#FFF3E0' },
  { id: 'food',     label: 'מסעדות וקולינריה', emoji: '🍽️', bg: '#FFF8E1' },
  { id: 'hotels',   label: 'מלונות ונופש',     emoji: '🏖️', bg: '#E8F5E9' },
  { id: 'spa',      label: 'ספא וימי כיף',     emoji: '💆', bg: '#FCE4EC' },
  { id: 'exp',      label: 'חוויות',           emoji: '🎭', bg: '#E3F2FD' },
  { id: 'shop',     label: 'קניות ואופנה',     emoji: '🛍️', bg: '#F3E5F5' },
  { id: 'workshop', label: 'סדנאות והעשרה',    emoji: '🎨', bg: '#E8EAF6' },
  { id: 'new',      label: 'חדש על המדף',      emoji: '🏷️', bg: '#E0F7FA' },
]

export const AREAS = [
  'כל הארץ',
  'תל אביב והמרכז',
  'ירושלים והסביבה',
  'חיפה והצפון',
  'באר שבע והדרום',
  'אונליין',
]

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=225&fit=crop&auto=format`

export const BUSINESSES: Business[] = [
  // ─── מסעדות וקולינריה ────────────────────────────────────
  {
    id: '1', name: 'מסעדת MOSHIK', tagline: 'מסעדת השף מושיק רוט',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1414235077428-338989a2e8c0'), logoBg: '#1a1a2e', logoText: 'M', canBook: true,
  },
  {
    id: '2', name: 'קפה גרג', tagline: 'רשת קפה ומאפייה ישראלית',
    category: 'food', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1565299624946-b28f40a0ae38'), logoBg: '#3e2723', logoText: 'גרג',
  },
  {
    id: '3', name: 'ARIA', tagline: 'מסעדת שף יוקרתית בתל אביב',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1555396273-367ea4eb4db5'), logoBg: '#212121', logoText: 'AR', canBook: true,
  },
  {
    id: '4', name: 'לנדוור', tagline: 'קפה אירופאי בסגנון אמסטרדמי',
    category: 'food', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1567620905732-2d1ec7ab7445'), logoBg: '#5d4037', logoText: 'L',
  },
  {
    id: '5', name: "אנג'לו", tagline: 'מטבח איטלקי אותנטי ביפו',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1504674900344-0f1945d9348b'), logoBg: '#b71c1c', logoText: 'AN', canBook: true,
  },
  {
    id: '6', name: 'ביסטרו אגאדיר', tagline: 'ברגרים ואוכל ים תיכוני',
    category: 'food', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1476224203421-9ac39bcb3327'), logoBg: '#e65100', logoText: 'AG',
  },
  {
    id: '7', name: 'בראסרי', tagline: 'מסעדה צרפתית קלאסית',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1528605248644-14dd04022da1'), logoBg: '#4a148c', logoText: 'BR', canBook: true,
  },
  {
    id: '8', name: 'ים של סושי', tagline: 'מסעדת סושי כשר',
    category: 'food', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1540189549336-e6e99c3679fe'), logoBg: '#1565c0', logoText: 'YS',
  },
  {
    id: '9', name: 'אבא גריל', tagline: 'בשרים ופירות ים על הגריל',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1546241072-48010ad2862c'), logoBg: '#bf360c', logoText: 'AG', canBook: true,
  },
  {
    id: '10', name: 'פיצה פלו', tagline: 'פיצה נאפוליטנית אמיתית',
    category: 'food', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1565299624946-b28f40a0ae38'), logoBg: '#c62828', logoText: 'PF',
  },
  {
    id: '11', name: 'תמנון', tagline: 'פירות ים טריים לאוהבים',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1484980972926-edee96e0960d'), logoBg: '#006064', logoText: 'TP', canBook: true,
  },
  {
    id: '12', name: 'נומי תל אביב', tagline: 'קוקינג לאב ים תיכוני',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1550304943-4f24f54ddde9'), logoBg: '#f57f17', logoText: 'N',
  },
  {
    id: '13', name: 'המבשל', tagline: 'מטבח ישראלי ביתי ועשיר',
    category: 'food', areas: ['תל אביב והמרכז', 'חיפה והצפון', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1482049016688-2d3e1b311543'), logoBg: '#558b2f', logoText: 'HM',
  },
  {
    id: '14', name: 'מסעדת האחים', tagline: 'אוכל ערבי מסורתי בנצרת',
    category: 'food', areas: ['חיפה והצפון'], online: false,
    imageUrl: IMG('1561043433-aaf687c4cf04'), logoBg: '#2e7d32', logoText: 'AH', canBook: true,
  },
  {
    id: '15', name: "קפה קדוש'ה", tagline: 'קפה בוטיק ירושלמי',
    category: 'food', areas: ['ירושלים והסביבה'], online: false,
    imageUrl: IMG('1544025162-d76538b2a56f'), logoBg: '#4e342e', logoText: 'KK',
  },
  {
    id: '16', name: 'מקדוניה', tagline: 'מסעדת ים תיכון בחיפה',
    category: 'food', areas: ['חיפה והצפון'], online: false,
    imageUrl: IMG('1512058564366-18510be2db19'), logoBg: '#1a237e', logoText: 'MK', canBook: true,
  },
  {
    id: '17', name: 'דיקסי', tagline: "אמריקן פוד ובר'ים",
    category: 'food', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1498654896293-37aacf113fd9'), logoBg: '#bf360c', logoText: 'DX',
  },
  {
    id: '18', name: 'תאבון', tagline: 'מטבח ישראלי עכשווי',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1504754524776-8f4f37790ca0'), logoBg: '#33691e', logoText: 'TB', canBook: true,
  },
  {
    id: '19', name: 'הפסטה שלי', tagline: 'פסטה טרייה תוצרת בית',
    category: 'food', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1432139509613-5c4255815697'), logoBg: '#e65100', logoText: 'HP',
  },
  {
    id: '20', name: 'שאי', tagline: 'מסעדה אסייתית פיוז׳ן',
    category: 'food', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1553361371-9b22f78e8b1d'), logoBg: '#880e4f', logoText: 'SH', canBook: true,
  },

  // ─── מלונות ונופש ────────────────────────────────────────
  {
    id: '21', name: 'ישרוטל', tagline: 'שרשרת מלונות פרמיום בישראל',
    category: 'hotels', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון', 'באר שבע והדרום'], online: false,
    imageUrl: IMG('1566073129761-4b4e47bab68d'), logoBg: '#0d47a1', logoText: 'ישרוטל', canBook: true,
  },
  {
    id: '22', name: 'מלון דן תל אביב', tagline: 'מלון יוקרה על שפת הים',
    category: 'hotels', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1542314831-068cd1dbfeeb'), logoBg: '#1565c0', logoText: 'DAN', canBook: true,
  },
  {
    id: '23', name: 'לאונרדו', tagline: 'רשת מלונות עסקית ומשפחתית',
    category: 'hotels', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1571003123894-1f0594d2b5d9'), logoBg: '#283593', logoText: 'LEO',
  },
  {
    id: '24', name: 'פנינת הצפון', tagline: 'אתר נופש ואחוזת אירוח בגליל',
    category: 'hotels', areas: ['חיפה והצפון'], online: false,
    imageUrl: IMG('1445019980597-93fa8acb246c'), logoBg: '#2e7d32', logoText: 'PN', canBook: true,
  },
  {
    id: '25', name: 'קמפינסקי ים המלח', tagline: 'ריזורט יוקרה בים המלח',
    category: 'hotels', areas: ['באר שבע והדרום'], online: false,
    imageUrl: IMG('1520250497591-112f2f40a3f4'), logoBg: '#4e342e', logoText: 'KP', canBook: true,
  },
  {
    id: '26', name: 'אינדיגו תל אביב', tagline: 'מלון בוטיק במרכז העיר',
    category: 'hotels', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1551882547-ff40c63fe5fa'), logoBg: '#00695c', logoText: 'IG',
  },
  {
    id: '27', name: 'מלון המלך שלמה', tagline: 'מלון יוקרה בירושלים',
    category: 'hotels', areas: ['ירושלים והסביבה'], online: false,
    imageUrl: IMG('1455587734955-081b22074882'), logoBg: '#f57f17', logoText: 'KS', canBook: true,
  },
  {
    id: '28', name: 'שרתון תל אביב', tagline: 'מלון שרשרת בינלאומי',
    category: 'hotels', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1496417263034-38ec4f0b665a'), logoBg: '#1a237e', logoText: 'SH',
  },
  {
    id: '29', name: 'מונטיפיורי 16', tagline: 'מלון בוטיק אינטימי בתל אביב',
    category: 'hotels', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1578683010236-d716f9a3f461'), logoBg: '#212121', logoText: 'M16', canBook: true,
  },
  {
    id: '30', name: 'רימונים', tagline: 'רשת מלונות ישראלית',
    category: 'hotels', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1590490360182-c33d57733427'), logoBg: '#880e4f', logoText: 'RIM',
  },
  {
    id: '31', name: 'פסטורל כפר בלום', tagline: 'קיבוץ נופש בגליל העליון',
    category: 'hotels', areas: ['חיפה והצפון'], online: false,
    imageUrl: IMG('1611892440504-42a792e24d32'), logoBg: '#33691e', logoText: 'PK',
  },
  {
    id: '32', name: 'נוף גינוסר', tagline: 'נופש על שפת הכינרת',
    category: 'hotels', areas: ['חיפה והצפון'], online: false,
    imageUrl: IMG('1582719478250-c89cae4dc85b'), logoBg: '#01579b', logoText: 'NG', canBook: true,
  },
  {
    id: '33', name: 'מלון ורד הגליל', tagline: 'לינה רומנטית בגליל',
    category: 'hotels', areas: ['חיפה והצפון'], online: false,
    imageUrl: IMG('1564501049412-61c2a3083791'), logoBg: '#ad1457', logoText: 'VH',
  },
  {
    id: '34', name: 'הרודס בת ים', tagline: 'מלון נופש על קו החוף',
    category: 'hotels', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1606402179428-a57976d71f4a'), logoBg: '#4527a0', logoText: 'HR', canBook: true,
  },

  // ─── ספא וימי כיף ────────────────────────────────────────
  {
    id: '35', name: 'ספא ורדינון', tagline: 'חוויית ספא מפנקת ומרגיעה',
    category: 'spa', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1544161515-4ab6ce6db874'), logoBg: '#880e4f', logoText: 'SPA', canBook: true,
  },
  {
    id: '36', name: 'חמי מעיין חרוד', tagline: 'מעיינות חמים וספא בעמק',
    category: 'spa', areas: ['חיפה והצפון'], online: false,
    imageUrl: IMG('1540555700478-4be289fbecef'), logoBg: '#4a148c', logoText: 'חמי',
  },
  {
    id: '37', name: 'ספא מלכים', tagline: 'טיפולי פנים ועיסויים',
    category: 'spa', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1600334129128-685c5582fd35'), logoBg: '#6a1b9a', logoText: 'SM', canBook: true,
  },
  {
    id: '38', name: 'ספא לה בומב', tagline: 'ספא עירוני מפנק',
    category: 'spa', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1515377905703-c4788e51af15'), logoBg: '#ad1457', logoText: 'LB',
  },
  {
    id: '39', name: 'אורה ספא', tagline: 'טיפולים הוליסטיים ורפואה',
    category: 'spa', areas: ['ירושלים והסביבה'], online: false,
    imageUrl: IMG('1519823551278-64ac92734fb1'), logoBg: '#00695c', logoText: 'OR', canBook: true,
  },
  {
    id: '40', name: 'ספא ים המלח', tagline: 'טיפולי מינרלים ייחודיים',
    category: 'spa', areas: ['באר שבע והדרום'], online: false,
    imageUrl: IMG('1560750588-73207b1ef5b8'), logoBg: '#1565c0', logoText: 'DS',
  },
  {
    id: '41', name: 'D-Spa', tagline: 'ספא יוקרה בלב תל אביב',
    category: 'spa', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1571019613454-1cb2f99b2d8b'), logoBg: '#212121', logoText: 'DS', canBook: true,
  },
  {
    id: '42', name: 'ספא בלו', tagline: 'יום פינוק לגוף ולנפש',
    category: 'spa', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1487412720507-e7ab37603c6f'), logoBg: '#01579b', logoText: 'BL',
  },
  {
    id: '43', name: 'ספא גן עדן', tagline: 'טיפולי עיסוי תאילנדי',
    category: 'spa', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1544161515-4ab6ce6db874'), logoBg: '#2e7d32', logoText: 'GE', canBook: true,
  },
  {
    id: '44', name: 'ספא הר הצופים', tagline: 'ריטריט ספא בירושלים',
    category: 'spa', areas: ['ירושלים והסביבה'], online: false,
    imageUrl: IMG('1600334129128-685c5582fd35'), logoBg: '#4e342e', logoText: 'SH',
  },

  // ─── חוויות ──────────────────────────────────────────────
  {
    id: '45', name: 'פלייגראונד TLV', tagline: 'חוויית בריחה ואטרקציות',
    category: 'exp', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1551632811-561732d1e306'), logoBg: '#e53935', logoText: 'PG',
  },
  {
    id: '46', name: 'סנפלינג ישראל', tagline: 'ריגושים בטבע ואדרנלין',
    category: 'exp', areas: ['תל אביב והמרכז', 'חיפה והצפון', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1501908734255-16579c18c25f'), logoBg: '#1b5e20', logoText: 'SNP', canBook: true,
  },
  {
    id: '47', name: 'הגן הצומח', tagline: 'סיורי טבע ופעילות משפחתית',
    category: 'exp', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1469474968028-56623f02e42e'), logoBg: '#33691e', logoText: 'GN',
  },
  {
    id: '48', name: 'אסקייפ רום', tagline: 'חדרי בריחה לחוויה קבוצתית',
    category: 'exp', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1533130061792-64b345e4a833'), logoBg: '#311b92', logoText: 'ESC',
  },
  {
    id: '49', name: 'גו-קארט רמת גן', tagline: 'מירוצי מכוניות בטריק',
    category: 'exp', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1504280390367-361c6d9f38f4'), logoBg: '#b71c1c', logoText: 'GK', canBook: true,
  },
  {
    id: '50', name: 'טיולי ג\'יפים', tagline: 'הרפתקאות שטח בכל הארץ',
    category: 'exp', areas: ['תל אביב והמרכז', 'חיפה והצפון', 'באר שבע והדרום'], online: false,
    imageUrl: IMG('1530143584546-02191bc84eb5'), logoBg: '#e65100', logoText: 'JP',
  },
  {
    id: '51', name: 'אחוזת כפר הנוקדים', tagline: 'לינת שדה ואירוח במדבר',
    category: 'exp', areas: ['באר שבע והדרום'], online: false,
    imageUrl: IMG('1524923640463-c5f0f71f4f2f'), logoBg: '#795548', logoText: 'AK', canBook: true,
  },
  {
    id: '52', name: 'שיט בים התיכון', tagline: 'שייט יוקרה עם קברניט',
    category: 'exp', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1539635278303-d4002c07eae3'), logoBg: '#01579b', logoText: 'SH', canBook: true,
  },
  {
    id: '53', name: 'רפטינג הירדן', tagline: 'ירידת נהר בגליל העליון',
    category: 'exp', areas: ['חיפה והצפון'], online: false,
    imageUrl: IMG('1571019614242-c5c5dee9f50b'), logoBg: '#0277bd', logoText: 'RF',
  },
  {
    id: '54', name: 'פינת חי ראשון', tagline: 'חוויה עם בעלי חיים',
    category: 'exp', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1519659528534-7fd733a832a0'), logoBg: '#558b2f', logoText: 'PC',
  },
  {
    id: '55', name: 'מוזיאון תל אביב', tagline: 'אמנות ותרבות עולמית',
    category: 'exp', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1533130061792-64b345e4a833'), logoBg: '#37474f', logoText: 'MT', canBook: true,
  },

  // ─── קניות ואופנה ────────────────────────────────────────
  {
    id: '56', name: 'adidas', tagline: 'מותג ספורט ואופנה בינלאומי',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: true,
    imageUrl: IMG('1483985988355-763728e1935b'), logoBg: '#212121', logoText: 'ADI',
  },
  {
    id: '57', name: 'MAC Cosmetics', tagline: 'קוסמטיקה מקצועית ואיפור',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: true,
    imageUrl: IMG('1441984904996-e0b6ba687e04'), logoBg: '#1a1a1a', logoText: 'MAC',
  },
  {
    id: '58', name: 'טרקלין חשמל', tagline: 'רשת מוצרי חשמל ואלקטרוניקה',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון', 'באר שבע והדרום'], online: true,
    imageUrl: IMG('1490481651871-ab68de25d43d'), logoBg: '#b71c1c', logoText: 'TH',
  },
  {
    id: '59', name: 'Sephora', tagline: 'בושם, קוסמטיקה וטיפוח',
    category: 'shop', areas: ['תל אביב והמרכז'], online: true,
    imageUrl: IMG('1445205170230-053b83016050'), logoBg: '#000000', logoText: 'SEP', isNew: true,
  },
  {
    id: '60', name: 'עגליגס', tagline: 'אופנת ילדים ותינוקות',
    category: 'shop', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: true,
    imageUrl: IMG('1512436991641-6745cdb1723f'), logoBg: '#f57f17', logoText: 'EG',
  },
  {
    id: '61', name: 'Castro', tagline: 'אופנה ישראלית לגבר ולאישה',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון', 'באר שבע והדרום'], online: true,
    imageUrl: IMG('1558769132-cb1aea458c5e'), logoBg: '#37474f', logoText: 'CA',
  },
  {
    id: '62', name: 'H&O', tagline: 'אופנה שוטפת במחיר נגיש',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון', 'באר שבע והדרום'], online: true,
    imageUrl: IMG('1523381210434-271e8be1f52b'), logoBg: '#1565c0', logoText: 'H&O',
  },
  {
    id: '63', name: 'Fox', tagline: 'אופנה לכל המשפחה',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון', 'באר שבע והדרום'], online: true,
    imageUrl: IMG('1567401893414-76b7b1e5a7a5'), logoBg: '#e65100', logoText: 'FOX',
  },
  {
    id: '64', name: 'Golf & Co', tagline: 'אופנה עכשווית ואיכותית',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: true,
    imageUrl: IMG('1607082348824-0a96f2a4b9da'), logoBg: '#212121', logoText: 'GC',
  },
  {
    id: '65', name: 'Ivory', tagline: 'אופנה יוקרתית לאישה',
    category: 'shop', areas: ['תל אביב והמרכז'], online: true,
    imageUrl: IMG('1600185365926-3a2ce3cdb9eb'), logoBg: '#f5f5f5', logoText: 'IVR',
  },
  {
    id: '66', name: 'רנואר', tagline: 'ספרים, מוסיקה ומתנות',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: true,
    imageUrl: IMG('1526170375885-4d8ecf77b99f'), logoBg: '#4a148c', logoText: 'RN',
  },
  {
    id: '67', name: 'Zara', tagline: 'אופנה בינלאומית במחיר נגיש',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: true,
    imageUrl: IMG('1445205170230-053b83016050'), logoBg: '#1a1a1a', logoText: 'ZR',
  },
  {
    id: '68', name: 'Pull & Bear', tagline: 'אופנת רחוב צעירה',
    category: 'shop', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: true,
    imageUrl: IMG('1441984904996-e0b6ba687e04'), logoBg: '#212121', logoText: 'P&B', isNew: true,
  },
  {
    id: '69', name: 'KSP', tagline: 'מחשבים ואלקטרוניקה מקצועית',
    category: 'shop', areas: ['תל אביב והמרכז', 'חיפה והצפון', 'באר שבע והדרום'], online: true,
    imageUrl: IMG('1490481651871-ab68de25d43d'), logoBg: '#0d47a1', logoText: 'KSP',
  },
  {
    id: '70', name: 'טויס אר אס', tagline: 'צעצועים לכל גיל',
    category: 'shop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: true,
    imageUrl: IMG('1558769132-cb1aea458c5e'), logoBg: '#e53935', logoText: 'TRU',
  },

  // ─── סדנאות והעשרה ───────────────────────────────────────
  {
    id: '71', name: 'אקדמיה לצילום', tagline: 'סדנאות צילום לכל הרמות',
    category: 'workshop', areas: ['תל אביב והמרכז'], online: true,
    imageUrl: IMG('1452860606245-08befc0ff44b'), logoBg: '#263238', logoText: 'AC',
  },
  {
    id: '72', name: 'סדנת בישול שף', tagline: 'לומדים לבשל עם שפים מקצועיים',
    category: 'workshop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1556909114-f6e7ad7d3136'), logoBg: '#e65100', logoText: 'בישול', canBook: true,
  },
  {
    id: '73', name: 'סדנת קרמיקה', tagline: 'יצירה עם חומרים טבעיים',
    category: 'workshop', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1513364776144-60967b0f800f'), logoBg: '#795548', logoText: 'KR',
  },
  {
    id: '74', name: 'ציור ויין', tagline: 'ערב יצירה עם כוס יין',
    category: 'workshop', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1513475382585-d06e58bcb0e0'), logoBg: '#6a1b9a', logoText: 'W', canBook: true,
  },
  {
    id: '75', name: 'סדנת תכשיטים', tagline: 'יצירת תכשיטים מכסף',
    category: 'workshop', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1516321497487-e288fb19713f'), logoBg: '#607d8b', logoText: 'TK',
  },
  {
    id: '76', name: 'מרכז יוגה תל אביב', tagline: 'יוגה ומדיטציה יומית',
    category: 'workshop', areas: ['תל אביב והמרכז'], online: true,
    imageUrl: IMG('1542744094-3a31f272c490'), logoBg: '#00695c', logoText: 'YG',
  },
  {
    id: '77', name: 'סדנת סושי', tagline: 'לומדים להכין סושי מקצועי',
    category: 'workshop', areas: ['תל אביב והמרכז', 'ירושלים והסביבה'], online: false,
    imageUrl: IMG('1547036967-23d11aacaee0'), logoBg: '#1a1a2e', logoText: 'SU', canBook: true,
  },
  {
    id: '78', name: 'סדנת בצק', tagline: 'לחם ומאפים ביתיים',
    category: 'workshop', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1556909114-f6e7ad7d3136'), logoBg: '#f57f17', logoText: 'BZ',
  },
  {
    id: '79', name: 'קורס ברמן', tagline: 'ברמנות ומיקסולוגיה מקצועית',
    category: 'workshop', areas: ['תל אביב והמרכז'], online: false,
    imageUrl: IMG('1513475382585-d06e58bcb0e0'), logoBg: '#212121', logoText: 'BR', canBook: true,
  },
  {
    id: '80', name: 'קורס אפייה מתקדם', tagline: 'עוגות, קרפים ומאפים',
    category: 'workshop', areas: ['תל אביב והמרכז', 'חיפה והצפון'], online: true,
    imageUrl: IMG('1547036967-23d11aacaee0'), logoBg: '#ad1457', logoText: 'AFK',
  },

  // ─── חדש על המדף ────────────────────────────────────────
  {
    id: '81', name: 'BuyMe Digital', tagline: 'כרטיסי מתנה דיגיטליים',
    category: 'new', areas: ['אונליין'], online: true,
    imageUrl: IMG('1607082348824-0a96f2a4b9da'), logoBg: '#F5A623', logoText: 'BM', isNew: true,
  },
  {
    id: '82', name: 'ספר גיפטס', tagline: 'ספרים וחוויות קריאה כמתנה',
    category: 'new', areas: ['אונליין', 'תל אביב והמרכז'], online: true,
    imageUrl: IMG('1526170375885-4d8ecf77b99f'), logoBg: '#1565c0', logoText: 'SP', isNew: true,
  },
  {
    id: '83', name: 'גיים זון', tagline: 'משחקים וחוויות גיימינג',
    category: 'new', areas: ['תל אביב והמרכז', 'אונליין'], online: true,
    imageUrl: IMG('1533130061792-64b345e4a833'), logoBg: '#311b92', logoText: 'GZ', isNew: true,
  },
  {
    id: '84', name: 'ווינרי ישראלי', tagline: 'יינות בוטיק ישראליים',
    category: 'new', areas: ['אונליין', 'תל אביב והמרכז'], online: true,
    imageUrl: IMG('1553361371-9b22f78e8b1d'), logoBg: '#880e4f', logoText: 'WI', isNew: true,
  },
  {
    id: '85', name: 'פלאנט פיטנס', tagline: 'מנוי לרשת חדרי כושר',
    category: 'new', areas: ['תל אביב והמרכז', 'ירושלים והסביבה', 'חיפה והצפון'], online: false,
    imageUrl: IMG('1571019613454-1cb2f99b2d8b'), logoBg: '#f57f17', logoText: 'PF', isNew: true,
  },
]
