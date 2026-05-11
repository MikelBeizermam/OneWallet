import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Zap, Leaf, Headphones, CreditCard, Car, Train, Check, Cloud, Fingerprint, Star } from 'lucide-react'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page} dir="rtl">

      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navContent}>
          <button type="button" className={styles.navLogo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/app-icon.png" alt="OneWallet" className={styles.navIcon} />
            <span className={styles.navBrand}>OneWallet</span>
          </button>
          <nav className={styles.navLinks}>
            <a href="#features">פיצ'רים</a>
            <a href="#benefits">יתרונות</a>
            <a href="#cta">שדרוג</a>
          </nav>
          <button type="button" className={styles.navCta} onClick={() => navigate('/login')}>
            כניסה / הרשמה
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>העתיד של הארנק הדיגיטלי כבר כאן</div>
            <h1 className={styles.heroTitle}>
              <button type="button" className={styles.heroTitleBtn} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className={styles.heroTitleGrad}>הארנק הדיגיטלי</span>
              </button><br />הבא שלך
            </h1>
            <p className={styles.heroDesc}>
              ניהול תעודות זהות, רישיונות וכרטיסים במקום אחד, בצורה חכמה, מאובטחת ויפה.
            </p>
            <div className={styles.heroBtns}>
              <button type="button" className={styles.heroBtnPrimary} onClick={() => navigate('/login')}>
                התחל עכשיו
              </button>
            </div>
          </div>

          {/* Phone mockup */}
          <div className={styles.phoneMockup}>
            <div className={styles.floatBadge1}><ShieldCheck size={13} color="#6f583c" /> מאובטח לחלוטין</div>
            <div className={styles.floatBadge2}><Star size={13} color="#e8a030" fill="#e8a030" /> 4.9 · 500+ משתמשים</div>
            <div className={styles.floatCard}>
              <div className={styles.floatCardInner}>
                <CreditCard size={14} color="#6f583c" />
                <span>תעודת זהות דיגיטלית</span>
              </div>
            </div>
            <div className={styles.phone}>
              <div className={styles.phoneScreen}>
                <div className={styles.phoneHeader}>
                  <span className={styles.phoneTitle}>OneWallet</span>
                </div>
                <div className={styles.cardStack}>
                  <div className={`${styles.mockCard} ${styles.mockCardLight}`}>
                    <span>תעודת זהות</span>
                    <Fingerprint size={18} />
                  </div>
                  <div className={`${styles.mockCard} ${styles.mockCardMid}`}>
                    <span>רישיון נהיגה</span>
                    <Car size={18} />
                  </div>
                  <div className={`${styles.mockCard} ${styles.mockCardDark}`}>
                    <span>כרטיס נסיעה</span>
                    <Train size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>הכל בנגיעה אחת</h2>
          <p className={styles.sectionSub}>החופש ללכת לכל מקום בלי הארנק הפיזי</p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIconId}`}>
                <CreditCard size={26} color="#6f583c" />
              </div>
              <h3>תעודת זהות דיגיטלית</h3>
              <p>זיהוי מאובטח בכל מקום, עם אישור מיידי ופרטיות מלאה. המידע שלך נשאר רק אצלך.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIconLicense}`}>
                <Car size={26} color="#85532e" />
              </div>
              <h3>רישיון נהיגה</h3>
              <p>כל פרטי הרישיון זמינים בפורמט דיגיטלי תקני, המקובל על ידי רשויות האכיפה.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIconTransit}`}>
                <Train size={26} color="#4e5d6e" />
              </div>
              <h3>תחבורה ציבורית</h3>
              <p>שימוש ברב-קו ישירות מהטלפון. פשוט מצמידים ועולים לרכבת או לאוטובוס.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark tactility section */}
      <section className={styles.darkSection}>
        <div className={styles.darkInner}>
          {/* Visual side */}
          <div className={styles.darkImageSide}>
            <div className={styles.leatherFrame}>
              <div className={styles.leatherOverlay} />
              <div className={styles.leatherFloatCard}>
                <Star size={18} color="#d4b896" />
                <p className={styles.darkCardTitle}>עיצוב עם נשמה</p>
                <p className={styles.darkCardSub}>שילבנו טקסטורות המעניקות תחושת ארנק עור אמיתי.</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className={styles.darkText}>
            <h2>טקטיליות דיגיטלית</h2>
            <p>
              אנחנו מאמינים שהטכנולוגיה לא צריכה להיות קרה. OneWallet מעוצב בהשראת מסורת ייצור
              של מוצרי עור יוקרתיים. כל לחיצה והחלקה תוכננו בקפידה להעניק חוויה חושית עמוקה.
            </p>
            <ul className={styles.darkList}>
              <li>גוונים טבעיים וחמים של מוקה ושמנת</li>
              <li>שכבות וטקסטורות המגיבות למגע</li>
              <li>משוב הפטי עדין המדמה מגע פיזי</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.benefits} id="benefits">
        <div className={styles.container}>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <ShieldCheck size={34} color="#6f583c" strokeWidth={1.6} />
              <h4>ביטחון ללא פשרות</h4>
              <p>הצפנה מקצה לקצה וזיהוי ביומטרי מתקדם שומרים על המידע שלך.</p>
            </div>
            <div className={styles.benefitCard}>
              <Leaf size={34} color="#6f583c" strokeWidth={1.6} />
              <h4>קיימות דיגיטלית</h4>
              <p>מפחיתים שימוש בפלסטיק ונייר עם מעבר לכרטיסים חכמים.</p>
            </div>
            <div className={styles.benefitCard}>
              <Zap size={34} color="#6f583c" strokeWidth={1.6} />
              <h4>פשטות בשימוש</h4>
              <p>ממשק אינטואיטיבי המותאם לשימוש ביד אחת, במהירות שיא.</p>
            </div>
            <div className={styles.benefitCard}>
              <Headphones size={34} color="#6f583c" strokeWidth={1.6} />
              <h4>תמיכה 24/7</h4>
              <p>הצוות שלנו זמין עבורך לכל שאלה, מסביב לשעון.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA showcase */}
      <section className={styles.ctaSection} id="cta">
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaText}>
              <h2>הארנק שלך, משודרג.</h2>
              <p>הצטרפו לאלפי המשתמשים שכבר עברו ל-OneWallet ונהנים מחוויית ניהול מסמכים וכרטיסים ברמה הגבוהה ביותר.</p>
              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeatureItem}>
                  <div className={styles.ctaFeatureIcon}><Check size={16} color="#6f583c" /></div>
                  <div className={styles.ctaFeatureInfo}>
                    <strong>סנכרון מלא</strong>
                    <span>בין כל המכשירים שלך בזמן אמת</span>
                  </div>
                </div>
                <div className={styles.ctaFeatureItem}>
                  <div className={styles.ctaFeatureIcon}><Cloud size={16} color="#6f583c" /></div>
                  <div className={styles.ctaFeatureInfo}>
                    <strong>גיבוי מאובטח</strong>
                    <span>המסמכים שלך תמיד זמינים</span>
                  </div>
                </div>
              </div>
              <button type="button" className={styles.heroBtnPrimary} onClick={() => navigate('/login')}>
                התחל בחינם
              </button>
            </div>

            <div className={styles.ctaBento}>
              <div className={styles.bentoCol}>
                <div className={`${styles.bentoCard} ${styles.bentoLight}`}>
                  <CreditCard size={26} color="#2b231d" strokeWidth={1.6} />
                  <span>כרטיס פרימיום</span>
                </div>
                <div className={`${styles.bentoCard} ${styles.bentoMid}`}>
                  <Car size={26} color="white" strokeWidth={1.6} />
                  <span>רישיון נהיגה</span>
                </div>
              </div>
              <div className={`${styles.bentoCol} ${styles.bentoColOffset}`}>
                <div className={`${styles.bentoCard} ${styles.bentoDark}`}>
                  <CreditCard size={26} color="#f0ebe3" strokeWidth={1.6} />
                  <span>יתרת ארנק</span>
                </div>
                <div className={`${styles.bentoCard} ${styles.bentoWhite}`}>
                  <ShieldCheck size={26} color="#6f583c" strokeWidth={1.6} />
                  <span>מאובטח</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrandCol}>
              <h3 className={styles.footerBrand}>OneWallet</h3>
              <p>המהפכה הבאה בניהול זהות דיגיטלית וכרטיסים, מעוצבת בקפידה לערכים של איכות וביטחון.</p>
            </div>
            <div>
              <h4>מוצר</h4>
              <ul>
                <li><a href="#features">תכונות</a></li>
                <li><a href="#benefits">אבטחה</a></li>
                <li><a href="#cta">שדרוג Pro</a></li>
              </ul>
            </div>
            <div>
              <h4>חשבון</h4>
              <ul>
                <li><a href="/login">כניסה</a></li>
                <li><a href="/register">הרשמה</a></li>
              </ul>
            </div>
            <div>
              <h4>צור קשר</h4>
              <ul>
                <li><a href="mailto:onewallet2026@gmail.com">onewallet2026@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2025 OneWallet. כל הזכויות שמורות.</span>
            <div className={styles.footerLinks}>
              <a href="#">מדיניות פרטיות</a>
              <a href="#">תנאי שימוש</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
