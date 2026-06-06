export interface HTZBusiness {
  id: string
  name: string
  tagline: string
  category: string
  areas: string[]
  online: boolean
  imageUrl: string
  logoText: string
}

export const HTZ_CATEGORIES = [
  { id: 'all',     label: 'הכל',             emoji: '✨', bg: '#E0F7FA' },
  { id: 'fashion', label: 'אופנה',           emoji: '👗', bg: '#F3E5F5' },
  { id: 'food',    label: 'מסעדות וקפה',     emoji: '🍽️', bg: '#FFF8E1' },
  { id: 'beauty',  label: 'יופי וספא',       emoji: '💅', bg: '#FCE4EC' },
  { id: 'home',    label: 'בית ומטבח',       emoji: '🏠', bg: '#E8F5E9' },
  { id: 'shoes',   label: 'נעליים',          emoji: '👟', bg: '#FFF3E0' },
  { id: 'sports',  label: 'ספורט ואאוטדור', emoji: '🏃', bg: '#E3F2FD' },
  { id: 'kids',    label: 'ילדים',           emoji: '🧸', bg: '#FFFDE7' },
  { id: 'hotels',  label: 'מלונות ונופש',   emoji: '🏨', bg: '#E8EAF6' },
  { id: 'jewelry', label: 'תכשיטים',        emoji: '💎', bg: '#F9FBE7' },
  { id: 'books',   label: 'ספרים ובידור',   emoji: '📚', bg: '#E0F2F1' },
]

export const HTZ_AREAS = [
  'כל הארץ',
  'תל אביב והמרכז',
  'ירושלים והסביבה',
  'חיפה והצפון',
  'באר שבע והדרום',
  'אונליין',
]

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=225&fit=crop&auto=format`

export const HTZ_BUSINESSES: HTZBusiness[] = [
  // ─── אופנה ───────────────────────────────────────────────
  { id: 'h1',  name: 'גולף', tagline: 'רשת אופנה ישראלית איכותית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: IMG('1489987707025-afc232f7ea0f'), logoText: 'Golf' },
  { id: 'h2',  name: 'קסטרו', tagline: 'אופנה ישראלית עכשווית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: IMG('1441986300917-64674bd600d8'), logoText: 'Castro' },
  { id: 'h3',  name: 'TYO', tagline: 'אופנה צעירה ועכשווית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1483985988355-763728e1935b'), logoText: 'TYO' },
  { id: 'h4',  name: 'ביגוד', tagline: 'אופנה לכל המשפחה', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1445205170230-053b83016050'), logoText: 'ביגוד' },
  { id: 'h5',  name: 'ריפליי', tagline: 'Replay - ג\'ינס ואופנה בינלאומית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1558769132-cb1aea153895'), logoText: 'REPLAY' },
  { id: 'h6',  name: 'Poupée', tagline: 'אופנה נשית עדינה ומיוחדת', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1525507119028-ed4c629a60a3'), logoText: 'Poupée' },
  { id: 'h7',  name: 'מגזינו', tagline: 'Magazzino - אופנה איטלקית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1490481651871-ab68de25d43d'), logoText: 'Mag' },
  { id: 'h8',  name: 'GUTI ROMERO', tagline: 'אופנה ספרדית יוקרתית', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: IMG('1509631179647-0177331693ae'), logoText: 'GR' },
  { id: 'h9',  name: 'BBB', tagline: 'אופנה מובחרת אונליין', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: IMG('1558769132-cb1aea153895'), logoText: 'BBB' },
  { id: 'h10', name: 'לי קופר', tagline: 'Lee Cooper - ג\'ינס קלאסי', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1542060748-10c28b62d241'), logoText: 'Lee' },
  { id: 'h11', name: 'GUESS', tagline: 'אופנה אמריקאית בינלאומית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1445205170230-053b83016050'), logoText: 'GUESS' },
  { id: 'h12', name: 'סטורי', tagline: 'story - אופנה נשית עדינה', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: IMG('1483985988355-763728e1935b'), logoText: 'story' },
  { id: 'h13', name: 'וורקר', tagline: 'Worker - בגדי עבודה ואופנה', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1489987707025-afc232f7ea0f'), logoText: 'Work' },
  { id: 'h14', name: 'טומוקה', tagline: 'Tomoka - אופנה ייחודית', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1490481651871-ab68de25d43d'), logoText: 'Tom' },
  { id: 'h15', name: 'גאנט', tagline: 'GANT - אופנה פרפי בינלאומית', category: 'fashion', areas: ['תל אביב והמרכז'], online: true, imageUrl: IMG('1509631179647-0177331693ae'), logoText: 'GANT' },
  { id: 'h16', name: 'גולף אנד קו', tagline: 'GOLF&CO - אופנה יוקרתית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1441986300917-64674bd600d8'), logoText: 'G&CO' },
  { id: 'h17', name: 'LAAVIN', tagline: 'אופנה עכשווית אונליין', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: IMG('1525507119028-ed4c629a60a3'), logoText: 'LAV' },
  { id: 'h18', name: 'נאוטיקה', tagline: 'Nautica - אופנה ימית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1558769132-cb1aea153895'), logoText: 'Naut' },
  { id: 'h19', name: 'משביר', tagline: 'רשת כלבו ישראלית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה'], online: false, imageUrl: IMG('1483985988355-763728e1935b'), logoText: 'MSH' },
  { id: 'h20', name: 'סוהו', tagline: 'SOHO - עיצוב ואופנה', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: IMG('1489987707025-afc232f7ea0f'), logoText: 'SOHO' },
  { id: 'h21', name: 'גלי', tagline: 'Gali - אופנה נשית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1525507119028-ed4c629a60a3'), logoText: 'Gali' },
  { id: 'h22', name: 'VILEBREQUIN', tagline: 'בגדי ים יוקרתיים', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1445205170230-053b83016050'), logoText: 'VB' },
  { id: 'h23', name: 'אינטימה', tagline: 'Intima - הלבשה תחתונה', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1558769132-cb1aea153895'), logoText: 'INT' },
  { id: 'h24', name: 'פמינה', tagline: 'Femina - הלבשה תחתונה לכלה', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1525507119028-ed4c629a60a3'), logoText: 'fem' },
  { id: 'h25', name: 'יולו', tagline: 'YOLO - אופנה צעירה ועכשווית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1490481651871-ab68de25d43d'), logoText: 'YOLO' },
  { id: 'h26', name: 'גולף קידס', tagline: 'GOLF&KIDS - אופנה לילדים', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1441986300917-64674bd600d8'), logoText: 'G&K' },
  { id: 'h27', name: 'סולוג', tagline: 'Solog - אופנה נשית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1483985988355-763728e1935b'), logoText: 'SOL' },
  { id: 'h28', name: 'פולגת', tagline: 'Polgat - לבוש יומיומי', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1445205170230-053b83016050'), logoText: 'PLG' },
  { id: 'h29', name: 'אמפוריום', tagline: 'Emporium - אופנה מובחרת', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1509631179647-0177331693ae'), logoText: 'EMP' },
  { id: 'h30', name: 'ג\'ק קובה', tagline: 'Jack Kuba - לינגרי יוקרתי', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: IMG('1558769132-cb1aea153895'), logoText: 'JK' },

  // ─── מסעדות וקפה ─────────────────────────────────────────
  { id: 'h31', name: 'טאיזו', tagline: 'מסעדת שף מזרח אסיה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'TAI' },
  { id: 'h32', name: 'קפה קפה', tagline: 'CAFE CAFE - רשת קפה ישראלית', category: 'food', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: IMG('1495474472-28035d65a9a7'), logoText: 'CC' },
  { id: 'h33', name: 'קפה פלורה במשתלה', tagline: 'קפה בוטיק במשתלה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1509042239860-f550ce710b93'), logoText: 'FL' },
  { id: 'h34', name: 'מסעדת &Moshik', tagline: 'מסעדת השף מושיק רוט', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1555396273-367ea4eb4db5'), logoText: '&M' },
  { id: 'h35', name: 'בנדיקט', tagline: 'רשת ארוחות בוקר 24/7', category: 'food', areas: ['תל אביב והמרכז','ירושלים והסביבה'], online: false, imageUrl: IMG('1550547660-37f7a1f28f8c'), logoText: 'BEN' },
  { id: 'h36', name: 'גרקו - הכשרה', tagline: 'מסעדה יוונית כשרה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'GREC' },
  { id: 'h37', name: 'גרקו - קריית אונו', tagline: 'מסעדה יוונית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'GREC' },
  { id: 'h38', name: 'אגוסטין', tagline: 'Augustine Brasserie - מבית נואר', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1555396273-367ea4eb4db5'), logoText: 'AUG' },
  { id: 'h39', name: 'מסעדת לונל', tagline: 'Lunel - מסעדה יוקרתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'LUN' },
  { id: 'h40', name: 'Good Morning Sunshine', tagline: 'סאנשיין - Benedict Bakery', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1550547660-37f7a1f28f8c'), logoText: 'GMS' },
  { id: 'h41', name: 'פיצה ארציאלי', tagline: 'פיצריה מסורתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1513104890138-7c749659a591'), logoText: 'ART' },
  { id: 'h42', name: 'מאפיית לחמים', tagline: 'מאפייה בוטיק ישראלית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1509042239860-f550ce710b93'), logoText: 'לחם' },
  { id: 'h43', name: 'מסעדת DOMO', tagline: 'מסעדה יפנית יוקרתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'DOMO' },
  { id: 'h44', name: 'טולמן\'ס דוט', tagline: 'TOLLMANS DOT - מסעדה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1555396273-367ea4eb4db5'), logoText: 'TOL' },
  { id: 'h45', name: 'KFC', tagline: 'רשת פסט פוד בינלאומית', category: 'food', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1513104890138-7c749659a591'), logoText: 'KFC' },
  { id: 'h46', name: 'שגב - פתח תקווה', tagline: 'מסעדה ישראלית מובחרת', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'שגב' },
  { id: 'h47', name: 'קפה פופולר', tagline: 'Cafe Popular - קפה ומזון', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1495474472-28035d65a9a7'), logoText: 'POP' },
  { id: 'h48', name: 'ג\'ורג\' וג\'ון', tagline: 'George & John - ברסרי', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1555396273-367ea4eb4db5'), logoText: 'G&J' },
  { id: 'h49', name: 'רוסטיקו - בזל', tagline: 'מסעדה איטלקית אותנטית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'RUS' },
  { id: 'h50', name: 'רוסטיקו - רוטשילד', tagline: 'מסעדה איטלקית אותנטית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'RUS' },
  { id: 'h51', name: 'פורטונה - כולא פיצה', tagline: 'פיצריה ומסעדה', category: 'food', areas: ['חיפה והצפון'], online: false, imageUrl: IMG('1513104890138-7c749659a591'), logoText: 'FOR' },
  { id: 'h52', name: 'דנון', tagline: 'Danon - מוצרי מזון', category: 'food', areas: ['אונליין'], online: true, imageUrl: IMG('1509042239860-f550ce710b93'), logoText: 'DAN' },
  { id: 'h53', name: 'קופסא מהשוק', tagline: 'מוצרי מזון משובחים', category: 'food', areas: ['אונליין'], online: true, imageUrl: IMG('1550547660-37f7a1f28f8c'), logoText: 'קופ' },
  { id: 'h54', name: 'רשת בורגראנץ\'', tagline: 'רשת המבורגרים ישראלית', category: 'food', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1513104890138-7c749659a591'), logoText: 'BRG' },
  { id: 'h55', name: 'קפה דאז', tagline: 'קפה בוטיק מוקפד', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1495474472-28035d65a9a7'), logoText: 'DAS' },
  { id: 'h56', name: 'רשת אצה סושי בר', tagline: 'סושי טרי ואיכותי', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'אצה' },
  { id: 'h57', name: 'פאסטל', tagline: 'Pastel - מסעדה ומקום אירוח', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1555396273-367ea4eb4db5'), logoText: 'PAS' },
  { id: 'h58', name: '7to1 cocktail LAB', tagline: 'בר קוקטיילים יוצר דעת', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1514362545857-3b0d9ed00bbc'), logoText: '7to1' },
  { id: 'h59', name: 'פוד אפיל', tagline: 'food appeal - מסעדה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1414235077428-338989a2e8c0'), logoText: 'FA' },
  { id: 'h60', name: 'מועדון היין הישראלי', tagline: 'מועדון יין ואלכוהול', category: 'food', areas: ['אונליין'], online: true, imageUrl: IMG('1514362545857-3b0d9ed00bbc'), logoText: 'יין' },

  // ─── יופי וספא ───────────────────────────────────────────
  { id: 'h61', name: 'IL MAKIAGE', tagline: 'איל מקיאג - קוסמטיקה', category: 'beauty', areas: ['תל אביב והמרכז'], online: true, imageUrl: IMG('1522337360788-8b13dee7a37e'), logoText: 'ILM' },
  { id: 'h62', name: 'קלרינס', tagline: 'Clarins - קוסמטיקה צרפתית', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1560066984138-dadb4c035'), logoText: 'CLA' },
  { id: 'h63', name: 'מי טיים', tagline: 'Me time - טיפולי יופי', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1544161515-4ab6ce6db874'), logoText: 'ME' },
  { id: 'h64', name: 'קליניק', tagline: 'Clinique - קוסמטיקה רפואית', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1522337360788-8b13dee7a37e'), logoText: 'CLQ' },
  { id: 'h65', name: 'אריאה ספא', tagline: 'Prana Spa - ספא יוקרתי', category: 'beauty', areas: ['חיפה והצפון'], online: false, imageUrl: IMG('1544161515-4ab6ce6db874'), logoText: 'SPA' },
  { id: 'h66', name: 'ספא מלכת שבא', tagline: 'Sheba Spa - ספא מפנק', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1544161515-4ab6ce6db874'), logoText: 'SHB' },
  { id: 'h67', name: 'רשת מרפאות פרופורציה', tagline: 'טיפולי יופי ורפואה אסתטית', category: 'beauty', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1560066984138-dadb4c035'), logoText: 'PRO' },
  { id: 'h68', name: 'ל\'אוקסיטן', tagline: "L'Occitane - קוסמטיקה פרובנסאלית", category: 'beauty', areas: ['אונליין'], online: true, imageUrl: IMG('1522337360788-8b13dee7a37e'), logoText: 'LOC' },
  { id: 'h69', name: 'אופטיקנה', tagline: 'opticana - רשת אופטיקה', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1560066984138-dadb4c035'), logoText: 'OPT' },
  { id: 'h70', name: 'הספר הכחול', tagline: 'Blue Book - אופטיקה', category: 'beauty', areas: ['אונליין'], online: false, imageUrl: IMG('1544161515-4ab6ce6db874'), logoText: 'BLU' },
  { id: 'h71', name: 'ספא מלון קאמי', tagline: 'ספא יוקרתי במלון קאמי', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1544161515-4ab6ce6db874'), logoText: 'SPA' },
  { id: 'h72', name: 'OHAV BRACELET', tagline: 'תכשיטים ועיצוב ייחודי', category: 'beauty', areas: ['אונליין'], online: true, imageUrl: IMG('1522337360788-8b13dee7a37e'), logoText: 'OHV' },

  // ─── בית ומטבח ────────────────────────────────────────────
  { id: 'h73', name: 'וורדינון', tagline: 'Vardinon - טקסטיל ומצעים', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1556909114-f6e7ad7d3136'), logoText: 'VAR' },
  { id: 'h74', name: 'נעמן', tagline: 'Naaman - כלי מטבח ואפייה', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1555041469-a586c61ea9bc'), logoText: 'נעמן' },
  { id: 'h75', name: 'הום סנטר', tagline: 'Home Center - כלי בית', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1556909114-f6e7ad7d3136'), logoText: 'HC' },
  { id: 'h76', name: 'BUONA CASA', tagline: 'בית ועיצוב איטלקי', category: 'home', areas: ['אונליין'], online: true, imageUrl: IMG('1555041469-a586c61ea9bc'), logoText: 'BC' },
  { id: 'h77', name: 'סולתם', tagline: 'Soltam - כלי בישול מקצועיים', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1556909114-f6e7ad7d3136'), logoText: 'SOL' },
  { id: 'h78', name: 'LINENZ', tagline: 'מצעים וטקסטיל אונליין', category: 'home', areas: ['אונליין'], online: true, imageUrl: IMG('1555041469-a586c61ea9bc'), logoText: 'LIN' },
  { id: 'h79', name: 'קסטרו הום', tagline: 'Castro Home - עיצוב הבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1556909114-f6e7ad7d3136'), logoText: 'CH' },
  { id: 'h80', name: 'ארונות הזה Redwood', tagline: 'ארונות ורהיטים מובחרים', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1555041469-a586c61ea9bc'), logoText: 'RW' },
  { id: 'h81', name: 'שטיחי כרמל', tagline: 'שטיחים לבית', category: 'home', areas: ['אונליין'], online: true, imageUrl: IMG('1556909114-f6e7ad7d3136'), logoText: 'כרמל' },
  { id: 'h82', name: 'next heat', tagline: 'מוצרי חימום לבית', category: 'home', areas: ['אונליין'], online: true, imageUrl: IMG('1555041469-a586c61ea9bc'), logoText: 'NEXT' },
  { id: 'h83', name: 'גנים ושושנים', tagline: 'ריהוט גן איכותי', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1556909114-f6e7ad7d3136'), logoText: 'G&S' },
  { id: 'h84', name: 'דארלן', tagline: 'Darlain - רהיטי בית ועיצוב', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1555041469-a586c61ea9bc'), logoText: 'DAR' },
  { id: 'h85', name: 'כיתן', tagline: 'Kitan - מצעים ומגבות', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1556909114-f6e7ad7d3136'), logoText: 'כיתן' },
  { id: 'h86', name: 'רהיטי קיסר', tagline: 'Kaisar - רהיטים לבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1555041469-a586c61ea9bc'), logoText: 'KAI' },
  { id: 'h87', name: 'טרקלין חשמל', tagline: 'מוצרי חשמל לבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1556909114-f6e7ad7d3136'), logoText: 'TRK' },

  // ─── נעליים ───────────────────────────────────────────────
  { id: 'h88', name: 'WeShoes', tagline: 'נעליים לכל המשפחה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'WS' },
  { id: 'h89', name: 'Papaya - נעלי ילדים', tagline: 'נעלי ילדים איכותיות', category: 'shoes', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'PAP' },
  { id: 'h90', name: 'איזי ספיריט', tagline: 'Easy Spirit - נוחות ואופנה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'ES' },
  { id: 'h91', name: 'טימברלנד', tagline: 'Timberland - נעלי איכות', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'TBL' },
  { id: 'h92', name: 'ואנס', tagline: 'VANS - נעלי סקייט ואופנה', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'VANS' },
  { id: 'h93', name: 'שוסטר', tagline: 'Shoester - נעלי אופנה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'SHO' },
  { id: 'h94', name: 'קולומביה', tagline: 'Columbia - נעלי הרים וטיול', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'COL' },
  { id: 'h95', name: 'עגליס', tagline: 'נעלי נוחות ואופנה', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'עגל' },
  { id: 'h96', name: 'Napo מבית ד"ר גב', tagline: 'נעלי בריאות ונוחות', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: IMG('1542291026-7eec264c27ff'), logoText: 'NAP' },

  // ─── ספורט ואאוטדור ───────────────────────────────────────
  { id: 'h97', name: 'אדידס', tagline: 'adidas - ספורט ואופנה', category: 'sports', areas: ['תל אביב והמרכז','חיפה והצפון'], online: true, imageUrl: IMG('1517836357463-d25dfeac3438'), logoText: 'ADI' },
  { id: 'h98', name: 'ג\'נספורט', tagline: 'JanSport - תיקים לטיולים', category: 'sports', areas: ['אונליין'], online: true, imageUrl: IMG('1541534741688-6078c6bfb5c5'), logoText: 'JAN' },
  { id: 'h99', name: 'Trek Market', tagline: 'ציוד טיולים ואאוטדור', category: 'sports', areas: ['אונליין'], online: true, imageUrl: IMG('1517836357463-d25dfeac3438'), logoText: 'TRK' },
  { id: 'h100', name: 'The North Face', tagline: 'ציוד הרים ושכבות', category: 'sports', areas: ['אונליין'], online: true, imageUrl: IMG('1541534741688-6078c6bfb5c5'), logoText: 'TNF' },
  { id: 'h101', name: 'למטייל', tagline: 'ציוד טיולים ואאוטדור', category: 'sports', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: IMG('1517836357463-d25dfeac3438'), logoText: 'LMT' },
  { id: 'h102', name: 'הולמס פלייס', tagline: 'Holmes Place + Go Active - כושר', category: 'sports', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1541534741688-6078c6bfb5c5'), logoText: 'HP' },
  { id: 'h103', name: 'ZMRM - משוברים לחופשה', tagline: 'חבילות נופש וטיולים', category: 'sports', areas: ['אונליין'], online: true, imageUrl: IMG('1517836357463-d25dfeac3438'), logoText: 'ZMR' },
  { id: 'h104', name: 'דרונדן', tagline: 'Dronden - רחפנים והדרכה', category: 'sports', areas: ['אונליין'], online: true, imageUrl: IMG('1541534741688-6078c6bfb5c5'), logoText: 'DRN' },

  // ─── ילדים ────────────────────────────────────────────────
  { id: 'h105', name: 'סמארט טויס', tagline: 'Smart Toys - צעצועים חינוכיים', category: 'kids', areas: ['אונליין'], online: true, imageUrl: IMG('1558171813-d95ec1e79bff'), logoText: 'ST' },
  { id: 'h106', name: 'טויס ר אס', tagline: 'Toys R Us - צעצועים לכל גיל', category: 'kids', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1558171813-d95ec1e79bff'), logoText: 'TRU' },
  { id: 'h107', name: 'מוצצים', tagline: 'Mootzim - מוצרים לתינוקות', category: 'kids', areas: ['אונליין'], online: true, imageUrl: IMG('1558171813-d95ec1e79bff'), logoText: 'MOO' },
  { id: 'h108', name: 'תנדלה', tagline: 'Tendelle - אופנה לילדים', category: 'kids', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1558171813-d95ec1e79bff'), logoText: 'TND' },

  // ─── מלונות ונופש ─────────────────────────────────────────
  { id: 'h109', name: 'מלון גרנד ויסטה', tagline: 'Grand Vista - מלון בוטיק', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: IMG('1566073129761-4b4e47bab68d'), logoText: 'GV' },
  { id: 'h110', name: 'אלונאלה סוויטות יוקרה', tagline: 'Alonella - לינה יוקרתית', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: IMG('1566073129761-4b4e47bab68d'), logoText: 'ALO' },
  { id: 'h111', name: 'דולפין ים', tagline: 'מלון על חוף הים', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: IMG('1520250497591-112f2f40a3f4'), logoText: 'DOL' },
  { id: 'h112', name: 'וילה גלילי', tagline: 'Villa Galilee - צימר יוקרתי', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: IMG('1566073129761-4b4e47bab68d'), logoText: 'VG' },

  // ─── תכשיטים ──────────────────────────────────────────────
  { id: 'h113', name: 'תכשיטים Gaby\'s', tagline: "Gaby's - תכשיטי יוקרה", category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: IMG('1515562141207-7a88fb7ce338'), logoText: 'GAB' },
  { id: 'h114', name: 'סברובסקי', tagline: 'SWAROVSKI - תכשיטים מקריסטל', category: 'jewelry', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1573408301185-9519f94053b5'), logoText: 'SWA' },
  { id: 'h115', name: 'ארנקי עמנואל', tagline: 'Emanuel - תיקים ואקססוריז', category: 'jewelry', areas: ['תל אביב והמרכז'], online: false, imageUrl: IMG('1515562141207-7a88fb7ce338'), logoText: 'EMN' },
  { id: 'h116', name: 'עדה לזורגן', tagline: 'Adah - תכשיטים עכשוויים', category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: IMG('1573408301185-9519f94053b5'), logoText: 'ADA' },
  { id: 'h117', name: 'Vintage Original', tagline: 'משקפיים ואקססוריז', category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: IMG('1515562141207-7a88fb7ce338'), logoText: 'VO' },

  // ─── ספרים ובידור ─────────────────────────────────────────
  { id: 'h118', name: 'צומת ספרים', tagline: 'רשת חנויות ספרים', category: 'books', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: IMG('1481627834876-b7833e8f5570'), logoText: 'צומת' },
  { id: 'h119', name: 'פלפוט', tagline: 'Palphot - גלויות ומתנות', category: 'books', areas: ['אונליין'], online: true, imageUrl: IMG('1481627834876-b7833e8f5570'), logoText: 'PAL' },
  { id: 'h120', name: 'סלון יווני - זיכרון יעקב', tagline: 'טיפולי שיער יווניים', category: 'beauty', areas: ['חיפה והצפון'], online: false, imageUrl: IMG('1522337360788-8b13dee7a37e'), logoText: 'SLN' },
]
