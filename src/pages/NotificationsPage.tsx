import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Gift } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import styles from './NotificationsPage.module.css'

export default function NotificationsPage() {
  const navigate = useNavigate()
  const { prefs, setPref } = useNotifications()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate(-1)}>
          <ChevronIcon />
        </button>
        <h1 className={styles.title}>התראות</h1>
        <div className={styles.headerSpacer} />
      </header>

      <div className={styles.content}>
        <p className={styles.intro}>בחר אילו התראות ברצונך לקבל בכניסה לאפליקציה.</p>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>סוגי התראות</div>

          <div className={styles.item}>
            <span className={`${styles.itemIcon} ${styles.itemIconWarning}`}>
              <AlertTriangle size={22} strokeWidth={1.8} />
            </span>
            <div className={styles.itemText}>
              <strong className={styles.itemTitle}>תפוגת כרטיסים</strong>
              <span className={styles.itemDesc}>התראה כאשר תוקף כרטיס עומד לפוג בתוך 30 יום</span>
            </div>
            <Toggle value={prefs.expiry} onChange={v => setPref('expiry', v)} label="תפוגת כרטיסים" />
          </div>

          <div className={styles.item}>
            <span className={`${styles.itemIcon} ${styles.itemIconGift}`}>
              <Gift size={22} strokeWidth={1.8} />
            </span>
            <div className={styles.itemText}>
              <strong className={styles.itemTitle}>תזכורת כרטיס מתנה</strong>
              <span className={styles.itemDesc}>תזכורת שבועית לכרטיסי מתנה עם יתרה פעילה, כדי שלא תשכח להשתמש</span>
            </div>
            <Toggle value={prefs.gift} onChange={v => setPref('gift', v)} label="תזכורת כרטיס מתנה" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value ? 'true' : 'false'}
      aria-label={`${value ? 'כבה' : 'הפעל'} ${label}`}
      title={`${value ? 'כבה' : 'הפעל'} ${label}`}
      className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}
      onClick={() => onChange(!value)}
    >
      <span className={styles.toggleThumb} />
    </button>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}
