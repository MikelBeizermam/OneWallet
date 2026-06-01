import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { LucideIcon } from 'lucide-react'
import { CreditCard, Unlock, Cloud, Zap, Heart } from 'lucide-react'
import styles from './ProUpgradePageAlt.module.css'

const FEATURES: { icon: LucideIcon; text: string }[] = [
  { icon: CreditCard, text: 'עד 10 כרטיסים במקום 2' },
  { icon: Unlock,     text: 'גישה לכל סוגי הכרטיסים' },
  { icon: Cloud,      text: 'גיבוי מאובטח בענן' },
  { icon: Zap,        text: 'עדכונים ופיצ׳רים עתידיים ללא תשלום נוסף' },
  { icon: Heart,      text: 'תמיכה ישירה מהמפתח' },
]

export default function ProUpgradePageAlt() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpgrade = async () => {
    if (!user) return
    setLoading(true)
    setError('')
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { userId: user.id, email: user.email },
      })
      if (error) throw error
      if (data?.url) window.location.href = data.url
    } catch {
      setError('שגיאה ביצירת תהליך התשלום. נסה שוב.')
    } finally {
      setLoading(false)
    }
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

      <div className={styles.hero}>
        <div className={styles.badge}>PRO</div>
        <h1 className={styles.heroTitle}>OneWallet Pro</h1>
        <p className={styles.heroSub}>הפוך את הארנק שלך לחכם באמת</p>
        <div className={styles.priceBlock}>
          <span className={styles.price}>₪10</span>
          <span className={styles.pricePer}>תשלום חד פעמי</span>
        </div>
      </div>

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
        {error && <div className="alert alert-error">{error}</div>}
        <button
          type="button"
          className={styles.ctaBtn}
          onClick={handleUpgrade}
          disabled={loading}
        >
          {loading ? <span className="spinner" /> : 'שדרג עכשיו — ₪10 בלבד'}
        </button>
        <p className={styles.ctaNote}>תשלום חד פעמי · לא יחויב שוב</p>
        <button type="button" className={styles.skipBtn} onClick={() => navigate(-1)}>
          אולי מאוחר יותר
        </button>
      </div>
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}
function CheckIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
