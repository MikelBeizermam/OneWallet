import { useNavigate } from 'react-router-dom'
import styles from './LostWalletPage.module.css'

const ITEMS = [
  {
    id: 'id',
    emoji: '🪪',
    title: 'תעודת זהות',
    desc: 'הזמנת תעודת זהות חדשה במשרד הפנים',
    action: { type: 'url', value: 'https://www.gov.il/he/service/biometric_smart_id_request' },
    label: 'לדיווח ובקשה',
  },
  {
    id: 'license',
    emoji: '🚗',
    title: 'רישיון נהיגה',
    desc: 'בקשת רישיון נהיגה חלופי במקרה אובדן',
    action: { type: 'url', value: 'https://www.gov.il/he/service/duplicate_drivers_license_in_case_of_loss' },
    label: 'לדיווח ובקשה',
  },
  {
    id: 'weapon',
    emoji: '🔫',
    title: 'רישיון נשק',
    desc: 'קבלת עותק רישיון נשק במקרה אובדן',
    action: { type: 'url', value: 'https://www.gov.il/he/service/get_firearm_license_copy' },
    label: 'לדיווח ובקשה',
  },
  {
    id: 'buyme',
    emoji: '🎁',
    title: 'כרטיס BuyMe',
    desc: 'פנייה לתמיכה של BuyMe לדיווח על כרטיס אבוד',
    action: { type: 'email', value: 'support@buyme.co.il', subject: 'דיווח על כרטיס אבוד' },
    label: 'שלח מייל לתמיכה',
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
        <span className={styles.alertIcon}>🚨</span>
        <p className={styles.alertText}>
          אבד לך הארנק? לחץ על הכרטיס הרלוונטי לדיווח מיידי והזמנת תחליף.
        </p>
      </div>

      <div className={styles.list}>
        {ITEMS.map(item => (
          <button
            key={item.id}
            type="button"
            className={styles.card}
            onClick={() => handleAction(item)}
          >
            <span className={styles.cardEmoji}>{item.emoji}</span>
            <div className={styles.cardBody}>
              <span className={styles.cardTitle}>{item.title}</span>
              <span className={styles.cardDesc}>{item.desc}</span>
            </div>
            <span className={styles.cardAction}>{item.label} ←</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}
