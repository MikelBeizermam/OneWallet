import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { CreditCard, Unlock, Cloud, Zap, Heart } from 'lucide-react'
import styles from './ProUpgradePage.module.css'

const BIT_PAYMENT_URL = 'https://www.bitpay.co.il/app/me/8ABC9095-092B-0CFC-3585-B33B1BA1690295A9'

const FEATURES: { icon: LucideIcon; text: string }[] = [
  { icon: CreditCard, text: 'עד 10 כרטיסים במקום 2' },
  { icon: Unlock,     text: 'גישה לכל סוגי הכרטיסים' },
  { icon: Cloud,      text: 'גיבוי מאובטח בענן' },
  { icon: Zap,        text: 'עדכונים ופיצ׳רים עתידיים ללא תשלום נוסף' },
  { icon: Heart,      text: 'תמיכה ישירה מהמפתח' },
]

export default function ProUpgradePage() {
  const navigate = useNavigate()
  const [paid, setPaid] = useState(false)

  const handleUpgrade = () => {
    window.open(BIT_PAYMENT_URL, '_blank')
    setPaid(true)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate(-1)}>
          <ChevronIcon />
        </button>
        <span className={styles.headerTitle}>שדרג ל-Pro</span>
        <div className={styles.spacer} />
      </header>

      {paid ? (
        <div className={styles.successBox}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>כמעט שם!</h2>
          <p className={styles.successText}>
            לאחר התשלום, החשבון שלך יוגדר כ-PRO תוך 24 שעות.
          </p>
          <button type="button" className={styles.ctaBtn} onClick={() => navigate('/home')}>
            חזרה לארנק
          </button>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.heroCol}>
            <div className={styles.hero}>
              <div className={styles.badge}>PRO</div>
              <h1 className={styles.heroTitle}>OneWallet Pro</h1>
              <p className={styles.heroSub}>הפוך את הארנק שלך לחכם באמת</p>
              <div className={styles.priceBlock}>
                <span className={styles.price}>₪10</span>
                <span className={styles.pricePer}>תשלום חד פעמי</span>
              </div>
            </div>
          </div>

          <div className={styles.detailsCol}>
            <div className={styles.featuresList}>
              {FEATURES.map((f, i) => (
                <div key={i} className={styles.featureRow}>
                  <span className={styles.featureIcon}><f.icon size={24} strokeWidth={1.8} /></span>
                  <span className={styles.featureText}>{f.text}</span>
                  <CheckIcon />
                </div>
              ))}
            </div>

            <div className={styles.ctaSection}>
              <button
                type="button"
                className={styles.ctaBtn}
                onClick={handleUpgrade}
              >
                שדרג עכשיו — ₪10 בלבד
              </button>
              <p className={styles.ctaNote}>תשלום חד פעמי · לא יחויב שוב</p>
              <button type="button" className={styles.skipBtn} onClick={() => navigate(-1)}>
                אולי מאוחר יותר
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}
function CheckIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
