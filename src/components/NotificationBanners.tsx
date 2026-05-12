import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '@/hooks/useNotifications'
import styles from './NotificationBanners.module.css'

export function NotificationBanners() {
  const { expiringCards, giftReminders, showGiftReminder, dismissGiftReminder } = useNotifications()
  const navigate = useNavigate()
  const [dismissedExpiry, setDismissedExpiry] = useState<string[]>([])
  const [giftDismissed, setGiftDismissed] = useState(false)

  const visibleExpiry = expiringCards.filter(e => !dismissedExpiry.includes(e.card.id))
  const hasGift = showGiftReminder && !giftDismissed && giftReminders.length > 0

  if (visibleExpiry.length === 0 && !hasGift) return null

  return (
    <div className={styles.wrap}>
      {visibleExpiry.map(({ card, daysLeft }) => (
        <div key={card.id} className={styles.bannerExpiry}>
          <div className={styles.bannerContent}>
            <span className={styles.bannerIcon}>⚠️</span>
            <div className={styles.bannerText}>
              <strong className={styles.bannerTitle}>{card.name}</strong>
              <span className={styles.bannerSub}>פג תוקף בעוד {daysLeft} ימים</span>
            </div>
          </div>
          <div className={styles.bannerActions}>
            <button type="button" className={styles.viewBtn} onClick={() => navigate(`/cards/${card.id}`)}>
              הצג
            </button>
            <button type="button" className={styles.dismissBtn} onClick={() => setDismissedExpiry(p => [...p, card.id])}>
              ✕
            </button>
          </div>
        </div>
      ))}

      {hasGift && giftReminders.map(({ card, balance }) => (
        <div key={card.id} className={styles.bannerGift}>
          <div className={styles.bannerContent}>
            <span className={styles.bannerIcon}>🎁</span>
            <div className={styles.bannerText}>
              <strong className={styles.bannerTitle}>{card.name}</strong>
              <span className={styles.bannerSub}>יתרה ₪{balance.toFixed(0)} — אל תשכח להשתמש!</span>
            </div>
          </div>
          <div className={styles.bannerActions}>
            <button type="button" className={styles.viewBtn} onClick={() => navigate(`/cards/${card.id}`)}>
              הצג
            </button>
            <button type="button" className={styles.dismissBtn} onClick={() => { dismissGiftReminder(); setGiftDismissed(true) }}>
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
