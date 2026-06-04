import { useNavigate } from 'react-router-dom'
import { CreditCard, Car, Shield, Gift } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import styles from './LostWalletPage.module.css'

const ITEMS: { id: string; icon: LucideIcon; title: string; desc: string; action: { type: string; value: string; subject?: string } }[] = [
  {
    id: 'id',
    icon: CreditCard,
    title: 'תעודת זהות',
    desc: 'הזמנת תעודת זהות חדשה במשרד הפנים',
    action: { type: 'url', value: 'https://www.gov.il/he/service/biometric_smart_id_request' },
  },
  {
    id: 'license',
    icon: Car,
    title: 'רישיון נהיגה',
    desc: 'בקשת רישיון נהיגה חלופי במקרה אובדן',
    action: { type: 'url', value: 'https://www.gov.il/he/service/duplicate_drivers_license_in_case_of_loss' },
  },
  {
    id: 'weapon',
    icon: Shield,
    title: 'רישיון נשק',
    desc: 'קבלת עותק רישיון נשק במקרה אובדן',
    action: { type: 'url', value: 'https://www.gov.il/he/service/get_firearm_license_copy' },
  },
  {
    id: 'buyme',
    icon: Gift,
    title: 'כרטיס BuyMe',
    desc: 'פנייה לתמיכה של BuyMe לדיווח על כרטיס אבוד',
    action: { type: 'email', value: 'support@buyme.co.il', subject: 'דיווח על כרטיס אבוד' },
  },
]

export default function LostWalletPage() {
  const navigate = useNavigate()

  const handleAction = (item: typeof ITEMS[0]) => {
    if (item.action.type === 'url') {
      window.open(item.action.value, '_blank')
    } else {
      window.location.href = `mailto:${item.action.value}?subject=${encodeURIComponent(item.action.subject ?? '')}`
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate(-1)}>
          <ChevronIcon />
        </button>
        <span className={styles.headerTitle}>ארנק אבד — חירום</span>
        <div className={styles.spacer} />
      </header>

      <div className={styles.alert}>
        <WarningIcon />
        <div>
          <p className={styles.alertTitle}>אבד לך הארנק?</p>
          <p className={styles.alertText}>לחץ על הכרטיס הרלוונטי לדיווח מיידי</p>
        </div>
      </div>

      <div className={styles.list}>
        {ITEMS.map(item => (
          <button
            key={item.id}
            type="button"
            className={styles.card}
            onClick={() => handleAction(item)}
          >
            <span className={styles.cardIcon}>
              <item.icon size={28} strokeWidth={1.6} />
            </span>
            <div className={styles.cardBody}>
              <span className={styles.cardTitle}>{item.title}</span>
              <span className={styles.cardDesc}>{item.desc}</span>
            </div>
            <span className={styles.cardAction}>לדיווח ←</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}

function WarningIcon() {
  return <svg className={styles.warningIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
}
