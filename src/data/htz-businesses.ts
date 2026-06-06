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

// Picsum with unique seed per business — guaranteed no duplicates
const P = (n: number) =>
  `https://picsum.photos/seed/htz${n}/400/225`

export const HTZ_BUSINESSES: HTZBusiness[] = [
  // ─── אופנה ───────────────────────────────────────────────
  { id: 'h1',  name: 'גולף', tagline: 'רשת אופנה ישראלית איכותית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: P(1), logoText: 'Golf' },
  { id: 'h2',  name: 'קסטרו', tagline: 'אופנה ישראלית עכשווית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: P(2), logoText: 'Castro' },
  { id: 'h3',  name: 'TYO', tagline: 'אופנה צעירה ועכשווית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(3), logoText: 'TYO' },
  { id: 'h4',  name: 'ביגוד', tagline: 'אופנה לכל המשפחה', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(4), logoText: 'ביגוד' },
  { id: 'h5',  name: 'ריפליי', tagline: "Replay - ג'ינס ואופנה בינלאומית", category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(5), logoText: 'REPLAY' },
  { id: 'h6',  name: 'Poupée', tagline: 'אופנה נשית עדינה ומיוחדת', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(6), logoText: 'Poupée' },
  { id: 'h7',  name: 'מגזינו', tagline: 'Magazzino - אופנה איטלקית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(7), logoText: 'Mag' },
  { id: 'h8',  name: 'GUTI ROMERO', tagline: 'אופנה ספרדית יוקרתית', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: P(8), logoText: 'GR' },
  { id: 'h10', name: 'לי קופר', tagline: "Lee Cooper - ג'ינס קלאסי", category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(10), logoText: 'Lee' },
  { id: 'h11', name: 'GUESS', tagline: 'אופנה אמריקאית בינלאומית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(11), logoText: 'GUESS' },
  { id: 'h12', name: 'סטורי', tagline: 'story - אופנה נשית עדינה', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: P(12), logoText: 'story' },
  { id: 'h13', name: 'וורקר', tagline: 'Worker - בגדי עבודה ואופנה', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(13), logoText: 'Work' },
  { id: 'h14', name: 'טומוקה', tagline: 'Tomoka - אופנה ייחודית', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(14), logoText: 'Tom' },
  { id: 'h15', name: 'גאנט', tagline: 'GANT - אופנה פרפי בינלאומית', category: 'fashion', areas: ['תל אביב והמרכז'], online: true, imageUrl: P(15), logoText: 'GANT' },
  { id: 'h16', name: 'גולף אנד קו', tagline: 'GOLF&CO - אופנה יוקרתית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(16), logoText: 'G&CO' },
  { id: 'h17', name: 'LAAVIN', tagline: 'אופנה עכשווית אונליין', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: P(17), logoText: 'LAV' },
  { id: 'h18', name: 'נאוטיקה', tagline: 'Nautica - אופנה ימית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(18), logoText: 'Naut' },
  { id: 'h19', name: 'משביר', tagline: 'רשת כלבו ישראלית', category: 'fashion', areas: ['תל אביב והמרכז','ירושלים והסביבה'], online: false, imageUrl: P(19), logoText: 'MSH' },
  { id: 'h20', name: 'סוהו', tagline: 'SOHO - עיצוב ואופנה', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: P(20), logoText: 'SOHO' },
  { id: 'h21', name: 'גלי', tagline: 'Gali - אופנה נשית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(21), logoText: 'Gali' },
  { id: 'h22', name: 'VILEBREQUIN', tagline: 'בגדי ים יוקרתיים', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(22), logoText: 'VB' },
  { id: 'h23', name: 'אינטימה', tagline: 'Intima - הלבשה תחתונה', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(23), logoText: 'INT' },
  { id: 'h24', name: 'פמינה', tagline: 'Femina - הלבשה תחתונה לכלה', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(24), logoText: 'fem' },
  { id: 'h25', name: 'יולו', tagline: 'YOLO - אופנה צעירה ועכשווית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(25), logoText: 'YOLO' },
  { id: 'h26', name: 'גולף קידס', tagline: 'GOLF&KIDS - אופנה לילדים', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(26), logoText: 'G&K' },
  { id: 'h27', name: 'סולוג', tagline: 'Solog - אופנה נשית', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(27), logoText: 'SOL' },
  { id: 'h28', name: 'פולגת', tagline: 'Polgat - לבוש יומיומי', category: 'fashion', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(28), logoText: 'PLG' },
  { id: 'h29', name: 'אמפוריום', tagline: 'Emporium - אופנה מובחרת', category: 'fashion', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(29), logoText: 'EMP' },
  { id: 'h30', name: "ג'ק קובה", tagline: 'Jack Kuba - לינגרי יוקרתי', category: 'fashion', areas: ['אונליין'], online: true, imageUrl: P(30), logoText: 'JK' },

  // ─── מסעדות וקפה ─────────────────────────────────────────
  { id: 'h9',  name: 'BBB', tagline: 'רשת המבורגרים המובחרת', category: 'food', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(9), logoText: 'BBB' },
  { id: 'h31', name: 'טאיזו', tagline: 'מסעדת שף מזרח אסיה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(31), logoText: 'TAI' },
  { id: 'h32', name: 'קפה קפה', tagline: 'CAFE CAFE - רשת קפה ישראלית', category: 'food', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: P(32), logoText: 'CC' },
  { id: 'h33', name: 'קפה פלורה במשתלה', tagline: 'קפה בוטיק במשתלה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(33), logoText: 'FL' },
  { id: 'h34', name: 'מסעדת &Moshik', tagline: 'מסעדת השף מושיק רוט', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(34), logoText: '&M' },
  { id: 'h35', name: 'בנדיקט', tagline: 'רשת ארוחות בוקר 24/7', category: 'food', areas: ['תל אביב והמרכז','ירושלים והסביבה'], online: false, imageUrl: P(35), logoText: 'BEN' },
  { id: 'h36', name: 'גרקו - הכשרה', tagline: 'מסעדה יוונית כשרה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(36), logoText: 'GREC' },
  { id: 'h37', name: 'גרקו - קריית אונו', tagline: 'מסעדה יוונית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(37), logoText: 'GREC' },
  { id: 'h38', name: 'אגוסטין', tagline: 'Augustine Brasserie - מבית נואר', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(38), logoText: 'AUG' },
  { id: 'h39', name: 'מסעדת לונל', tagline: 'Lunel - מסעדה יוקרתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(39), logoText: 'LUN' },
  { id: 'h40', name: 'Good Morning Sunshine', tagline: 'סאנשיין - Benedict Bakery', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(40), logoText: 'GMS' },
  { id: 'h41', name: 'פיצה ארציאלי', tagline: 'פיצריה מסורתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(41), logoText: 'ART' },
  { id: 'h42', name: 'מאפיית לחמים', tagline: 'מאפייה בוטיק ישראלית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(42), logoText: 'לחם' },
  { id: 'h43', name: 'מסעדת DOMO', tagline: 'מסעדה יפנית יוקרתית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(43), logoText: 'DOMO' },
  { id: 'h44', name: "טולמן'ס דוט", tagline: 'TOLLMANS DOT - מסעדה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(44), logoText: 'TOL' },
  { id: 'h45', name: 'KFC', tagline: 'רשת עוף מטוגן בינלאומית', category: 'food', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(45), logoText: 'KFC' },
  { id: 'h46', name: 'שגב - פתח תקווה', tagline: 'מסעדה ישראלית מובחרת', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(46), logoText: 'שגב' },
  { id: 'h47', name: 'קפה פופולר', tagline: 'Cafe Popular - קפה ומזון', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(47), logoText: 'POP' },
  { id: 'h48', name: "ג'ורג' וג'ון", tagline: "George & John - ברסרי", category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(48), logoText: 'G&J' },
  { id: 'h49', name: 'רוסטיקו - בזל', tagline: 'מסעדה איטלקית אותנטית', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(49), logoText: 'RUS' },
  { id: 'h50', name: 'רוסטיקו - רוטשילד', tagline: 'מסעדה איטלקית - רוטשילד', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(50), logoText: 'RUS' },
  { id: 'h51', name: 'פורטונה - כולא פיצה', tagline: 'פיצריה ומסעדה', category: 'food', areas: ['חיפה והצפון'], online: false, imageUrl: P(51), logoText: 'FOR' },
  { id: 'h52', name: 'דנון', tagline: 'Danon - מוצרי מזון', category: 'food', areas: ['אונליין'], online: true, imageUrl: P(52), logoText: 'DAN' },
  { id: 'h53', name: 'קופסא מהשוק', tagline: 'מוצרי מזון משובחים', category: 'food', areas: ['אונליין'], online: true, imageUrl: P(53), logoText: 'קופ' },
  { id: 'h54', name: "רשת בורגראנץ'", tagline: 'רשת המבורגרים ישראלית', category: 'food', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(54), logoText: 'BRG' },
  { id: 'h55', name: 'קפה דאז', tagline: 'קפה בוטיק מוקפד', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(55), logoText: 'DAS' },
  { id: 'h56', name: 'רשת אצה סושי בר', tagline: 'סושי טרי ואיכותי', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(56), logoText: 'אצה' },
  { id: 'h57', name: 'פאסטל', tagline: 'Pastel - מסעדה ומקום אירוח', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(57), logoText: 'PAS' },
  { id: 'h58', name: '7to1 cocktail LAB', tagline: 'בר קוקטיילים יוצר דעת', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(58), logoText: '7to1' },
  { id: 'h59', name: 'פוד אפיל', tagline: 'food appeal - מסעדה', category: 'food', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(59), logoText: 'FA' },
  { id: 'h60', name: 'מועדון היין הישראלי', tagline: 'מועדון יין ואלכוהול', category: 'food', areas: ['אונליין'], online: true, imageUrl: P(60), logoText: 'יין' },

  // ─── יופי וספא ───────────────────────────────────────────
  { id: 'h61', name: 'IL MAKIAGE', tagline: 'איל מקיאג - קוסמטיקה', category: 'beauty', areas: ['תל אביב והמרכז'], online: true, imageUrl: P(61), logoText: 'ILM' },
  { id: 'h62', name: 'קלרינס', tagline: 'Clarins - קוסמטיקה צרפתית', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(62), logoText: 'CLA' },
  { id: 'h63', name: 'מי טיים', tagline: 'Me time - טיפולי יופי', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(63), logoText: 'ME' },
  { id: 'h64', name: 'קליניק', tagline: 'Clinique - קוסמטיקה רפואית', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(64), logoText: 'CLQ' },
  { id: 'h65', name: 'אריאה ספא', tagline: 'Prana Spa - ספא יוקרתי', category: 'beauty', areas: ['חיפה והצפון'], online: false, imageUrl: P(65), logoText: 'SPA' },
  { id: 'h66', name: 'ספא מלכת שבא', tagline: 'Sheba Spa - ספא מפנק', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(66), logoText: 'SHB' },
  { id: 'h67', name: 'רשת מרפאות פרופורציה', tagline: 'טיפולי יופי ורפואה אסתטית', category: 'beauty', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(67), logoText: 'PRO' },
  { id: 'h68', name: "ל'אוקסיטן", tagline: "L'Occitane - קוסמטיקה פרובנסאלית", category: 'beauty', areas: ['אונליין'], online: true, imageUrl: P(68), logoText: 'LOC' },
  { id: 'h69', name: 'אופטיקנה', tagline: 'opticana - רשת אופטיקה', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(69), logoText: 'OPT' },
  { id: 'h70', name: 'הספר הכחול', tagline: 'Blue Book - אופטיקה', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(70), logoText: 'BLU' },
  { id: 'h71', name: 'ספא מלון קאמי', tagline: 'ספא יוקרתי במלון קאמי', category: 'beauty', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(71), logoText: 'SPA' },
  { id: 'h120', name: 'סלון יווני - זיכרון יעקב', tagline: 'טיפולי שיער יווניים', category: 'beauty', areas: ['חיפה והצפון'], online: false, imageUrl: P(120), logoText: 'SLN' },

  // ─── בית ומטבח ────────────────────────────────────────────
  { id: 'h73', name: 'וורדינון', tagline: 'Vardinon - טקסטיל ומצעים', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(73), logoText: 'VAR' },
  { id: 'h74', name: 'נעמן', tagline: 'Naaman - כלי מטבח ואפייה', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(74), logoText: 'נעמן' },
  { id: 'h75', name: 'הום סנטר', tagline: 'Home Center - כלי בית', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(75), logoText: 'HC' },
  { id: 'h76', name: 'BUONA CASA', tagline: 'בית ועיצוב איטלקי', category: 'home', areas: ['אונליין'], online: true, imageUrl: P(76), logoText: 'BC' },
  { id: 'h77', name: 'סולתם', tagline: 'Soltam - כלי בישול מקצועיים', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(77), logoText: 'SOL' },
  { id: 'h78', name: 'LINENZ', tagline: 'מצעים וטקסטיל אונליין', category: 'home', areas: ['אונליין'], online: true, imageUrl: P(78), logoText: 'LIN' },
  { id: 'h79', name: 'קסטרו הום', tagline: 'Castro Home - עיצוב הבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(79), logoText: 'CH' },
  { id: 'h80', name: 'ארונות הזה Redwood', tagline: 'ארונות ורהיטים מובחרים', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(80), logoText: 'RW' },
  { id: 'h81', name: 'שטיחי כרמל', tagline: 'שטיחים לבית', category: 'home', areas: ['אונליין'], online: true, imageUrl: P(81), logoText: 'כרמל' },
  { id: 'h82', name: 'next heat', tagline: 'מוצרי חימום לבית', category: 'home', areas: ['אונליין'], online: true, imageUrl: P(82), logoText: 'NEXT' },
  { id: 'h83', name: 'גנים ושושנים', tagline: 'ריהוט גן איכותי', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(83), logoText: 'G&S' },
  { id: 'h84', name: 'דארלן', tagline: 'Darlain - רהיטי בית ועיצוב', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(84), logoText: 'DAR' },
  { id: 'h85', name: 'כיתן', tagline: 'Kitan - מצעים ומגבות', category: 'home', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(85), logoText: 'כיתן' },
  { id: 'h86', name: 'רהיטי קיסר', tagline: 'Kaisar - רהיטים לבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(86), logoText: 'KAI' },
  { id: 'h87', name: 'טרקלין חשמל', tagline: 'מוצרי חשמל לבית', category: 'home', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(87), logoText: 'TRK' },

  // ─── נעליים ───────────────────────────────────────────────
  { id: 'h88', name: 'WeShoes', tagline: 'נעליים לכל המשפחה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(88), logoText: 'WS' },
  { id: 'h89', name: 'Papaya - נעלי ילדים', tagline: 'נעלי ילדים איכותיות', category: 'shoes', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(89), logoText: 'PAP' },
  { id: 'h90', name: 'איזי ספיריט', tagline: 'Easy Spirit - נוחות ואופנה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(90), logoText: 'ES' },
  { id: 'h91', name: 'טימברלנד', tagline: 'Timberland - נעלי איכות', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(91), logoText: 'TBL' },
  { id: 'h92', name: 'ואנס', tagline: 'VANS - נעלי סקייט ואופנה', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: P(92), logoText: 'VANS' },
  { id: 'h93', name: 'שוסטר', tagline: 'Shoester - נעלי אופנה', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(93), logoText: 'SHO' },
  { id: 'h94', name: 'קולומביה', tagline: 'Columbia - נעלי הרים וטיול', category: 'shoes', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(94), logoText: 'COL' },
  { id: 'h95', name: 'עגליס', tagline: 'נעלי נוחות ואופנה', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: P(95), logoText: 'עגל' },
  { id: 'h96', name: 'Napo מבית ד"ר גב', tagline: 'נעלי בריאות ונוחות', category: 'shoes', areas: ['אונליין'], online: true, imageUrl: P(96), logoText: 'NAP' },

  // ─── ספורט ואאוטדור ───────────────────────────────────────
  { id: 'h97',  name: 'אדידס', tagline: 'adidas - ספורט ואופנה', category: 'sports', areas: ['תל אביב והמרכז','חיפה והצפון'], online: true, imageUrl: P(97), logoText: 'ADI' },
  { id: 'h98',  name: "ג'נספורט", tagline: 'JanSport - תיקים לטיולים', category: 'sports', areas: ['אונליין'], online: true, imageUrl: P(98), logoText: 'JAN' },
  { id: 'h99',  name: 'Trek Market', tagline: 'ציוד טיולים ואאוטדור', category: 'sports', areas: ['אונליין'], online: true, imageUrl: P(99), logoText: 'TRK' },
  { id: 'h100', name: 'The North Face', tagline: 'ציוד הרים ושכבות', category: 'sports', areas: ['אונליין'], online: true, imageUrl: P(100), logoText: 'TNF' },
  { id: 'h101', name: 'למטייל', tagline: 'ציוד טיולים ואאוטדור', category: 'sports', areas: ['תל אביב והמרכז','חיפה והצפון'], online: false, imageUrl: P(101), logoText: 'LMT' },
  { id: 'h102', name: 'הולמס פלייס', tagline: 'Holmes Place + Go Active - כושר', category: 'sports', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(102), logoText: 'HP' },
  { id: 'h103', name: 'ZMRM - משוברים לחופשה', tagline: 'חבילות נופש וטיולים', category: 'sports', areas: ['אונליין'], online: true, imageUrl: P(103), logoText: 'ZMR' },
  { id: 'h104', name: 'דרונדן', tagline: 'Dronden - רחפנים והדרכה', category: 'sports', areas: ['אונליין'], online: true, imageUrl: P(104), logoText: 'DRN' },

  // ─── ילדים ────────────────────────────────────────────────
  { id: 'h105', name: 'סמארט טויס', tagline: 'Smart Toys - צעצועים חינוכיים', category: 'kids', areas: ['אונליין'], online: true, imageUrl: P(105), logoText: 'ST' },
  { id: 'h106', name: 'טויס ר אס', tagline: 'Toys R Us - צעצועים לכל גיל', category: 'kids', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(106), logoText: 'TRU' },
  { id: 'h107', name: 'מוצצים', tagline: 'Mootzim - מוצרים לתינוקות', category: 'kids', areas: ['אונליין'], online: true, imageUrl: P(107), logoText: 'MOO' },
  { id: 'h108', name: 'תנדלה', tagline: 'Tendelle - אופנה לילדים', category: 'kids', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(108), logoText: 'TND' },

  // ─── מלונות ונופש ─────────────────────────────────────────
  { id: 'h109', name: 'מלון גרנד ויסטה', tagline: 'Grand Vista - מלון בוטיק', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: P(109), logoText: 'GV' },
  { id: 'h110', name: 'אלונאלה סוויטות יוקרה', tagline: 'Alonella - לינה יוקרתית', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: P(110), logoText: 'ALO' },
  { id: 'h111', name: 'דולפין ים', tagline: 'מלון על חוף הים', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: P(111), logoText: 'DOL' },
  { id: 'h112', name: 'וילה גלילי', tagline: 'Villa Galilee - צימר יוקרתי', category: 'hotels', areas: ['חיפה והצפון'], online: false, imageUrl: P(112), logoText: 'VG' },

  // ─── תכשיטים ──────────────────────────────────────────────
  { id: 'h72',  name: 'OHAV BRACELET', tagline: 'צמידים ותכשיטים ייחודיים', category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: P(72), logoText: 'OHV' },
  { id: 'h113', name: "תכשיטים Gaby's", tagline: "Gaby's - תכשיטי יוקרה", category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: P(113), logoText: 'GAB' },
  { id: 'h114', name: 'סברובסקי', tagline: 'SWAROVSKI - תכשיטים מקריסטל', category: 'jewelry', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(114), logoText: 'SWA' },
  { id: 'h115', name: 'ארנקי עמנואל', tagline: 'Emanuel - תיקים ואקססוריז', category: 'jewelry', areas: ['תל אביב והמרכז'], online: false, imageUrl: P(115), logoText: 'EMN' },
  { id: 'h116', name: 'עדה לזורגן', tagline: 'Adah - תכשיטים עכשוויים', category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: P(116), logoText: 'ADA' },
  { id: 'h117', name: 'Vintage Original', tagline: 'משקפיים ואקססוריז', category: 'jewelry', areas: ['אונליין'], online: true, imageUrl: P(117), logoText: 'VO' },

  // ─── ספרים ובידור ─────────────────────────────────────────
  { id: 'h118', name: 'צומת ספרים', tagline: 'רשת חנויות ספרים', category: 'books', areas: ['תל אביב והמרכז','ירושלים והסביבה','חיפה והצפון'], online: false, imageUrl: P(118), logoText: 'צומת' },
  { id: 'h119', name: 'פלפוט', tagline: 'Palphot - גלויות ומתנות', category: 'books', areas: ['אונליין'], online: true, imageUrl: P(119), logoText: 'PAL' },
]
