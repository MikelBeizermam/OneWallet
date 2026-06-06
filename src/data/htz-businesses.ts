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

// Picsum — unique per seed word, always same image for same seed
const P = (seed: string) =>
  `https://picsum.photos/seed/${seed}/400/225`

// Unsplash — verified photo IDs for key categories
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=225&fit=crop&auto=format`

export const HTZ_BUSINESSES: HTZBusiness[] = [
  // ─── אופנה ───────────────────────────────────────────────
  { id: 'h1',  name: 'גולף', tagline: 'רשת אופנה ישראלית איכותית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: U('1441986300917-64674bd600d8'), logoText: 'Golf' },
  { id: 'h2',  name: 'קסטרו', tagline: 'אופנה ישראלית עכשווית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: U('1490481651871-ab68de25d43d'), logoText: 'Castro' },
  { id: 'h3',  name: 'TYO', tagline: 'אופנה צעירה ועכשווית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1558769132-cb1aea153895'), logoText: 'TYO' },
  { id: 'h4',  name: 'ביגוד', tagline: 'אופנה לכל המשפחה', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1489987707025-afc232f7ea0f'), logoText: 'ביגוד' },
  { id: 'h5',  name: 'ריפליי', tagline: "Replay - ג'ינס ואופנה בינלאומית", category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1542060748-10c28b62d241'), logoText: 'REPLAY' },
  { id: 'h6',  name: 'Poupée', tagline: 'אופנה נשית עדינה ומיוחדת', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1525507119028-ed4c629a60a3'), logoText: 'Poupée' },
  { id: 'h7',  name: 'מגזינו', tagline: 'Magazzino - אופנה איטלקית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1509631179647-0177331693ae'), logoText: 'Mag' },
  { id: 'h8',  name: 'GUTI ROMERO', tagline: 'אופנה ספרדית יוקרתית', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: U('1445205170230-053b83016050'), logoText: 'GR' },
  { id: 'h10', name: 'לי קופר', tagline: "Lee Cooper - ג'ינס קלאסי", category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1469334031218-e382a71b716b'), logoText: 'Lee' },
  { id: 'h11', name: 'GUESS', tagline: 'אופנה אמריקאית בינלאומית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1483985988355-763728e1935b'), logoText: 'GUESS' },
  { id: 'h12', name: 'סטורי', tagline: 'story - אופנה נשית עדינה', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: U('1517841905240-472988babdf9'), logoText: 'story' },
  { id: 'h13', name: 'וורקר', tagline: 'Worker - בגדי עבודה ואופנה', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1596755094514-f87e34085b2c'), logoText: 'Work' },
  { id: 'h14', name: 'טומוקה', tagline: 'Tomoka - אופנה ייחודית', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1598300042247-d088f8ab3a91'), logoText: 'Tom' },
  { id: 'h15', name: 'גאנט', tagline: 'GANT - אופנה פרפי בינלאומית', category: 'fashion', areas: ['תל אביב והמרכז'], online: true, imageUrl: U('1515886657613-9f3515b0c78f'), logoText: 'GANT' },
  { id: 'h16', name: 'גולף אנד קו', tagline: 'GOLF&CO - אופנה יוקרתית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1576566588080-c81bb1cff597'), logoText: 'G&CO' },
  { id: 'h17', name: 'LAAVIN', tagline: 'אופנה עכשווית אונליין', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: U('1523381210434-271e8be8a52e'), logoText: 'LAV' },
  { id: 'h18', name: 'נאוטיקה', tagline: 'Nautica - אופנה ימית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1520854221256-17451cc331bf'), logoText: 'Naut' },
  { id: 'h19', name: 'משביר', tagline: 'רשת כלבו ישראלית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה'], online: false, imageUrl: U('1564257631407-4deb1f99d992'), logoText: 'MSH' },
  { id: 'h20', name: 'סוהו', tagline: 'SOHO - עיצוב ואופנה', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: U('1539109136881-3be0616acf4b'), logoText: 'SOHO' },
  { id: 'h21', name: 'גלי', tagline: 'Gali - אופנה נשית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1550639525-c97d492191a4'), logoText: 'Gali' },
  { id: 'h22', name: 'VILEBREQUIN', tagline: 'בגדי ים יוקרתיים', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1502716119720-3ec70e6e4aca'), logoText: 'VB' },
  { id: 'h23', name: 'אינטימה', tagline: 'Intima - הלבשה תחתונה', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1554412933-0c6b9ad67eb1'), logoText: 'INT' },
  { id: 'h24', name: 'פמינה', tagline: 'Femina - הלבשה תחתונה לכלה', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('femina-fashion'), logoText: 'fem' },
  { id: 'h25', name: 'יולו', tagline: 'YOLO - אופנה צעירה ועכשווית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('yolo-fashion'), logoText: 'YOLO' },
  { id: 'h26', name: 'גולף קידס', tagline: 'GOLF&KIDS - אופנה לילדים', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1518831959646-742c3a14ebf5'), logoText: 'G&K' },
  { id: 'h27', name: 'סולוג', tagline: 'Solog - אופנה נשית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('solog-clothing'), logoText: 'SOL' },
  { id: 'h28', name: 'פולגת', tagline: 'Polgat - לבוש יומיומי', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P('polgat-casual'), logoText: 'PLG' },
  { id: 'h29', name: 'אמפוריום', tagline: 'Emporium - אופנה מובחרת', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('emporium-luxury'), logoText: 'EMP' },
  { id: 'h30', name: "ג'ק קובה", tagline: 'Jack Kuba - לינגרי יוקרתי', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: P('jack-kuba-lingerie'), logoText: 'JK' },

  // ─── מסעדות וקפה ─────────────────────────────────────────
  { id: 'h9',  name: 'BBB', tagline: 'רשת המבורגרים המובחרת', category: 'food', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1568901346375-23c9450c58cd'), logoText: 'BBB' },
  { id: 'h31', name: 'טאיזו', tagline: 'מסעדת שף מזרח אסיה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1553361371-9b09c68b0a4c'), logoText: 'TAI' },
  { id: 'h32', name: 'קפה קפה', tagline: 'CAFE CAFE - רשת קפה ישראלית', category: 'food', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: U('1495474472-28035d65a9a7'), logoText: 'CC' },
  { id: 'h33', name: 'קפה פלורה במשתלה', tagline: 'קפה בוטיק במשתלה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1519984388953-d2406bc725e1'), logoText: 'FL' },
  { id: 'h34', name: 'מסעדת &Moshik', tagline: 'מסעדת השף מושיק רוט', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1414235077428-338989a2e8c0'), logoText: '&M' },
  { id: 'h35', name: 'בנדיקט', tagline: 'רשת ארוחות בוקר 24/7', category: 'food', areas: ['תל אביב והמרכז','ירושלים והסביבה'], online: false, imageUrl: U('1550547660-37f7a1f28f8c'), logoText: 'BEN' },
  { id: 'h36', name: 'גרקו - הכשרה', tagline: 'מסעדה יוונית כשרה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1559041881-36b2c8d0cec5'), logoText: 'GREC' },
  { id: 'h37', name: 'גרקו - קריית אונו', tagline: 'מסעדה יוונית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1504674900247-0877df9cc836'), logoText: 'GREC' },
  { id: 'h38', name: 'אגוסטין', tagline: 'Augustine Brasserie - מבית נואר', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1567620905732-2d1ec7ab7445'), logoText: 'AUG' },
  { id: 'h39', name: 'מסעדת לונל', tagline: 'Lunel - מסעדה יוקרתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('lunel-restaurant'), logoText: 'LUN' },
  { id: 'h40', name: 'Good Morning Sunshine', tagline: 'סאנשיין - Benedict Bakery', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1484723091739-30991ea58702'), logoText: 'GMS' },
  { id: 'h41', name: 'פיצה ארציאלי', tagline: 'פיצריה מסורתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1513104890138-7c749659a591'), logoText: 'ART' },
  { id: 'h42', name: 'מאפיית לחמים', tagline: 'מאפייה בוטיק ישראלית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1509042239860-f550ce710b93'), logoText: 'לחם' },
  { id: 'h43', name: 'מסעדת DOMO', tagline: 'מסעדה יפנית יוקרתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1547592166-23ac5f8f97b9'), logoText: 'DOMO' },
  { id: 'h44', name: "טולמן'ס דוט", tagline: 'TOLLMANS DOT - מסעדה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1565299624946-b28f40a0ae38'), logoText: 'TOL' },
  { id: 'h45', name: 'KFC', tagline: 'רשת עוף מטוגן בינלאומית', category: 'food', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1561758033-d89a2a3a5a42'), logoText: 'KFC' },
  { id: 'h46', name: 'שגב - פתח תקווה', tagline: 'מסעדה ישראלית מובחרת', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1481931098730-318b6f776db0'), logoText: 'שגב' },
  { id: 'h47', name: 'קפה פופולר', tagline: 'Cafe Popular - קפה ומזון', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1544025162-d76538147789'), logoText: 'POP' },
  { id: 'h48', name: "ג'ורג' וג'ון", tagline: "George & John - ברסרי", category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('george-john-bistro'), logoText: 'G&J' },
  { id: 'h49', name: 'רוסטיקו - בזל', tagline: 'מסעדה איטלקית אותנטית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1555396273-367ea4eb4db5'), logoText: 'RUS' },
  { id: 'h50', name: 'רוסטיקו - רוטשילד', tagline: 'מסעדה איטלקית - רוטשילד', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1482049016688-2d3e1b311543'), logoText: 'RUS' },
  { id: 'h51', name: 'פורטונה - כולא פיצה', tagline: 'פיצריה ומסעדה', category: 'food', areas: ['חיפה והצפון'], online: false, imageUrl: P('fortuna-pizza'), logoText: 'FOR' },
  { id: 'h52', name: 'דנון', tagline: 'Danon - מוצרי מזון', category: 'food', areas: ['אונליין'], online: true, imageUrl: U('1551024709-8f23befc1f5b'), logoText: 'DAN' },
  { id: 'h53', name: 'קופסא מהשוק', tagline: 'מוצרי מזון משובחים', category: 'food', areas: ['אונליין'], online: true, imageUrl: U('1428515799195-c06f7f58b5c5'), logoText: 'קופ' },
  { id: 'h54', name: "רשת בורגראנץ'", tagline: 'רשת המבורגרים ישראלית', category: 'food', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1531525645387-7f14be1bdbbd'), logoText: 'BRG' },
  { id: 'h55', name: 'קפה דאז', tagline: 'קפה בוטיק מוקפד', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1464305795204-6f5bbfa7d812'), logoText: 'DAS' },
  { id: 'h56', name: 'רשת אצה סושי בר', tagline: 'סושי טרי ואיכותי', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('atza-sushi-bar'), logoText: 'אצה' },
  { id: 'h57', name: 'פאסטל', tagline: 'Pastel - מסעדה ומקום אירוח', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1506354666786-223a8eb1e524'), logoText: 'PAS' },
  { id: 'h58', name: '7to1 cocktail LAB', tagline: 'בר קוקטיילים יוצר דעת', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1514362545857-3b0d9ed00bbc'), logoText: '7to1' },
  { id: 'h59', name: 'פוד אפיל', tagline: 'food appeal - מסעדה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('food-appeal-restaurant'), logoText: 'FA' },
  { id: 'h60', name: 'מועדון היין הישראלי', tagline: 'מועדון יין ואלכוהול', category: 'food', areas: ['אונליין'], online: true, imageUrl: U('1510812431401-41d2bd2722f3'), logoText: 'יין' },

  // ─── יופי וספא ───────────────────────────────────────────
  { id: 'h61', name: 'IL MAKIAGE', tagline: 'איל מקיאג - קוסמטיקה', category: 'beauty', areas: ['תל אביב והמרכז'], online: true, imageUrl: U('1522337360788-8b13dee7a37e'), logoText: 'ILM' },
  { id: 'h62', name: 'קלרינס', tagline: 'Clarins - קוסמטיקה צרפתית', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1596462502278-27bfdc798ce3'), logoText: 'CLA' },
  { id: 'h63', name: 'מי טיים', tagline: 'Me time - טיפולי יופי', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1544161515-4ab6ce6db874'), logoText: 'ME' },
  { id: 'h64', name: 'קליניק', tagline: 'Clinique - קוסמטיקה רפואית', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1487412947147-5cebf100d293'), logoText: 'CLQ' },
  { id: 'h65', name: 'אריאה ספא', tagline: 'Prana Spa - ספא יוקרתי', category: 'beauty', areas: ['חיפה והצפון'], online: false, imageUrl: U('1571781926291-c477ebfd024b'), logoText: 'SPA' },
  { id: 'h66', name: 'ספא מלכת שבא', tagline: 'Sheba Spa - ספא מפנק', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1541643600914-78b084683702'), logoText: 'SHB' },
  { id: 'h67', name: 'רשת מרפאות פרופורציה', tagline: 'טיפולי יופי ורפואה אסתטית', category: 'beauty', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1607522370275-f14206abe5d3'), logoText: 'PRO' },
  { id: 'h68', name: "ל'אוקסיטן", tagline: "L'Occitane - קוסמטיקה פרובנסאלית", category: 'beauty', areas: ['אונליין'], online: true, imageUrl: U('1560066984138-dadb4c035'), logoText: 'LOC' },
  { id: 'h69', name: 'אופטיקנה', tagline: 'opticana - רשת אופטיקה', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('opticana-eyewear'), logoText: 'OPT' },
  { id: 'h70', name: 'הספר הכחול', tagline: 'Blue Book - אופטיקה', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('blue-book-optics'), logoText: 'BLU' },
  { id: 'h71', name: 'ספא מלון קאמי', tagline: 'ספא יוקרתי במלון קאמי', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('kami-hotel-spa'), logoText: 'SPA' },
  { id: 'h72', name: 'OHAV BRACELET', tagline: 'צמידים ותכשיטים ייחודיים', category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: U('1515562141207-7a88fb7ce338'), logoText: 'OHV' },
  { id: 'h120', name: 'סלון יווני - זיכרון יעקב', tagline: 'טיפולי שיער יווניים', category: 'beauty', areas: ['חיפה והצפון'], online: false, imageUrl: P('greek-hair-salon'), logoText: 'SLN' },

  // ─── בית ומטבח ────────────────────────────────────────────
  { id: 'h73', name: 'וורדינון', tagline: 'Vardinon - טקסטיל ומצעים', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1631049307264-da0ec9d70304'), logoText: 'VAR' },
  { id: 'h74', name: 'נעמן', tagline: 'Naaman - כלי מטבח ואפייה', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1556909114-f6e7ad7d3136'), logoText: 'נעמן' },
  { id: 'h75', name: 'הום סנטר', tagline: 'Home Center - כלי בית', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1555041469-a586c61ea9bc'), logoText: 'HC' },
  { id: 'h76', name: 'BUONA CASA', tagline: 'בית ועיצוב איטלקי', category: 'home', areas: ['אונליין'], online: true, imageUrl: U('1567538096630-e0c55bd6374c'), logoText: 'BC' },
  { id: 'h77', name: 'סולתם', tagline: 'Soltam - כלי בישול מקצועיים', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1560185007-cde436f6a4d0'), logoText: 'SOL' },
  { id: 'h78', name: 'LINENZ', tagline: 'מצעים וטקסטיל אונליין', category: 'home', areas: ['אונליין'], online: true, imageUrl: P('linenz-bedding'), logoText: 'LIN' },
  { id: 'h79', name: 'קסטרו הום', tagline: 'Castro Home - עיצוב הבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1556909172-54557c7e4fb7'), logoText: 'CH' },
  { id: 'h80', name: 'ארונות הזה Redwood', tagline: 'ארונות ורהיטים מובחרים', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('redwood-closets'), logoText: 'RW' },
  { id: 'h81', name: 'שטיחי כרמל', tagline: 'שטיחים לבית', category: 'home', areas: ['אונליין'], online: true, imageUrl: P('carmel-rugs'), logoText: 'כרמל' },
  { id: 'h82', name: 'next heat', tagline: 'מוצרי חימום לבית', category: 'home', areas: ['אונליין'], online: true, imageUrl: P('nextheat-home'), logoText: 'NEXT' },
  { id: 'h83', name: 'גנים ושושנים', tagline: 'ריהוט גן איכותי', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1416879595882-3373a0480b5b'), logoText: 'G&S' },
  { id: 'h84', name: 'דארלן', tagline: 'Darlain - רהיטי בית ועיצוב', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('darlain-furniture'), logoText: 'DAR' },
  { id: 'h85', name: 'כיתן', tagline: 'Kitan - מצעים ומגבות', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P('kitan-textiles'), logoText: 'כיתן' },
  { id: 'h86', name: 'רהיטי קיסר', tagline: 'Kaisar - רהיטים לבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('kaisar-furniture'), logoText: 'KAI' },
  { id: 'h87', name: 'טרקלין חשמל', tagline: 'מוצרי חשמל לבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('traklin-electronics'), logoText: 'TRK' },

  // ─── נעליים ───────────────────────────────────────────────
  { id: 'h88', name: 'WeShoes', tagline: 'נעליים לכל המשפחה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1542291026-7eec264c27ff'), logoText: 'WS' },
  { id: 'h89', name: 'Papaya - נעלי ילדים', tagline: 'נעלי ילדים איכותיות', category: 'shoes', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: U('1515538182180-6a2d4a4b5e94'), logoText: 'PAP' },
  { id: 'h90', name: 'איזי ספיריט', tagline: 'Easy Spirit - נוחות ואופנה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1535043934128-cf0b28d52153'), logoText: 'ES' },
  { id: 'h91', name: 'טימברלנד', tagline: 'Timberland - נעלי איכות', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1606107557195-0e29a4b5b4aa'), logoText: 'TBL' },
  { id: 'h92', name: 'ואנס', tagline: 'VANS - נעלי סקייט ואופנה', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: U('1491553895291-0676a7522ab8'), logoText: 'VANS' },
  { id: 'h93', name: 'שוסטר', tagline: 'Shoester - נעלי אופנה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1549298916-b41d501d3772'), logoText: 'SHO' },
  { id: 'h94', name: 'קולומביה', tagline: 'Columbia - נעלי הרים וטיול', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1490578474895-69ae3e54bcf3'), logoText: 'COL' },
  { id: 'h95', name: 'עגליס', tagline: 'נעלי נוחות ואופנה', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: U('1460353581641-37baddab0fa2'), logoText: 'עגל' },
  { id: 'h96', name: 'Napo מבית ד"ר גב', tagline: 'נעלי בריאות ונוחות', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: P('napo-health-shoes'), logoText: 'NAP' },

  // ─── ספורט ואאוטדור ───────────────────────────────────────
  { id: 'h97',  name: 'אדידס', tagline: 'adidas - ספורט ואופנה', category: 'sports', areas: ['תל אביב והמרכז','חיפה והצפון'], online: true, imageUrl: U('1517836357463-d25dfeac3438'), logoText: 'ADI' },
  { id: 'h98',  name: "ג'נספורט", tagline: 'JanSport - תיקים לטיולים', category: 'sports', areas: ['אונליין'], online: true, imageUrl: U('1551632436-cbf8dd35adfa'), logoText: 'JAN' },
  { id: 'h99',  name: 'Trek Market', tagline: 'ציוד טיולים ואאוטדור', category: 'sports', areas: ['אונליין'], online: true, imageUrl: U('1506905925346-21bda4d32df4'), logoText: 'TRK' },
  { id: 'h100', name: 'The North Face', tagline: 'ציוד הרים ושכבות', category: 'sports', areas: ['אונליין'], online: true, imageUrl: P('northface-mountain'), logoText: 'TNF' },
  { id: 'h101', name: 'למטייל', tagline: 'ציוד טיולים ואאוטדור', category: 'sports', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P('lametayel-outdoor'), logoText: 'LMT' },
  { id: 'h102', name: 'הולמס פלייס', tagline: 'Holmes Place + Go Active - כושר', category: 'sports', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1534438327276-14e5300c3a48'), logoText: 'HP' },
  { id: 'h103', name: 'ZMRM - משוברים לחופשה', tagline: 'חבילות נופש וטיולים', category: 'sports', areas: ['אונליין'], online: true, imageUrl: P('zmrm-vacation'), logoText: 'ZMR' },
  { id: 'h104', name: 'דרונדן', tagline: 'Dronden - רחפנים והדרכה', category: 'sports', areas: ['אונליין'], online: true, imageUrl: U('1488229297570-58520851e618'), logoText: 'DRN' },

  // ─── ילדים ────────────────────────────────────────────────
  { id: 'h105', name: 'סמארט טויס', tagline: 'Smart Toys - צעצועים חינוכיים', category: 'kids', areas: ['אונליין'], online: true, imageUrl: U('1558171813-d95ec1e79bff'), logoText: 'ST' },
  { id: 'h106', name: 'טויס ר אס', tagline: 'Toys R Us - צעצועים לכל גיל', category: 'kids', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1515488042361-ee00e41b77ee'), logoText: 'TRU' },
  { id: 'h107', name: 'מוצצים', tagline: 'Mootzim - מוצרים לתינוקות', category: 'kids', areas: ['אונליין'], online: true, imageUrl: U('1596461404969-9ae70f2830c1'), logoText: 'MOO' },
  { id: 'h108', name: 'תנדלה', tagline: 'Tendelle - אופנה לילדים', category: 'kids', areas: ['תל אביב והמרכז'], online: false, imageUrl: P('tendelle-kids-fashion'), logoText: 'TND' },

  // ─── מלונות ונופש ─────────────────────────────────────────
  { id: 'h109', name: 'מלון גרנד ויסטה', tagline: 'Grand Vista - מלון בוטיק', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: U('1566073129761-4b4e47bab68d'), logoText: 'GV' },
  { id: 'h110', name: 'אלונאלה סוויטות יוקרה', tagline: 'Alonella - לינה יוקרתית', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: U('1520250497591-112f2f40a3f4'), logoText: 'ALO' },
  { id: 'h111', name: 'דולפין ים', tagline: 'מלון על חוף הים', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: U('1507525428034-b723cf961d3e'), logoText: 'DOL' },
  { id: 'h112', name: 'וילה גלילי', tagline: 'Villa Galilee - צימר יוקרתי', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: U('1582719508461-92a26e8d9a97'), logoText: 'VG' },

  // ─── תכשיטים ──────────────────────────────────────────────
  { id: 'h113', name: "תכשיטים Gaby's", tagline: "Gaby's - תכשיטי יוקרה", category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: U('1573408301185-9519f94053b5'), logoText: 'GAB' },
  { id: 'h114', name: 'סברובסקי', tagline: 'SWAROVSKI - תכשיטים מקריסטל', category: 'jewelry', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1611944212129-29977ae1398c'), logoText: 'SWA' },
  { id: 'h115', name: 'ארנקי עמנואל', tagline: 'Emanuel - תיקים ואקססוריז', category: 'jewelry', areas: ['תל אביב והמרכז'], online: false, imageUrl: U('1434056886845-dac89ffe9b56'), logoText: 'EMN' },
  { id: 'h116', name: 'עדה לזורגן', tagline: 'Adah - תכשיטים עכשוויים', category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: U('1589128777073-263566ae5e4d'), logoText: 'ADA' },
  { id: 'h117', name: 'Vintage Original', tagline: 'משקפיים ואקססוריז', category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: P('vintage-original-glasses'), logoText: 'VO' },

  // ─── ספרים ובידור ─────────────────────────────────────────
  { id: 'h118', name: 'צומת ספרים', tagline: 'רשת חנויות ספרים', category: 'books', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: U('1481627834876-b7833e8f5570'), logoText: 'צומת' },
  { id: 'h119', name: 'פלפוט', tagline: 'Palphot - גלויות ומתנות', category: 'books', areas: ['אונליין'], online: true, imageUrl: U('1524578271613-d73989f7ef3b'), logoText: 'PAL' },
]
