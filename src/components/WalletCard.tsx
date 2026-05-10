import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import type { Card } from '@/types/database'
import { getTemplate, CATEGORY_LABELS } from '@/lib/cardTemplates'
import styles from './WalletCard.module.css'

interface Props {
  card: Card
  compact?: boolean
  disableLongPress?: boolean
  onPress?: () => void
}

export function WalletCard({ card, compact = false, disableLongPress = false, onPress }: Props) {
  const navigate = useNavigate()
  const template = getTemplate(card.template_id, card.category)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)
  const [enlarged, setEnlarged] = useState(false)

  const startPress = () => {
    if (disableLongPress) return
    didLongPress.current = false
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true
      setEnlarged(true)
    }, 500)
  }

  const endPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
  }

  const handleClick = () => {
    if (didLongPress.current) return
    if (onPress) {
      onPress()
    } else {
      navigate(`/cards/${card.id}`)
    }
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.card} ${compact ? styles.compact : ''} ${disableLongPress ? styles.scrollable : ''}`}
        style={{
          '--card-bg': template.bgImageUrl && !card.image_url
            ? `url(${template.bgImageUrl})`
            : template.bgColor,
          '--card-color': template.textColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } as React.CSSProperties}
        onPointerDown={disableLongPress ? undefined : startPress}
        onPointerUp={disableLongPress ? undefined : endPress}
        onPointerLeave={disableLongPress ? undefined : endPress}
        onClick={handleClick}
        aria-label={`פתח כרטיס ${card.name}`}
      >
        {card.image_url && (
          <img src={card.image_url} alt="" className={styles.bgImage} aria-hidden="true" />
        )}
        {(template.bgImageUrl && !card.image_url) || card.image_url ? (
          <div className={styles.brandOverlay} />
        ) : null}
        <div className={styles.inner}>
          <div className={styles.top}>
            <div
              className={styles.iconBadge}
              style={{ background: template.accentColor + '33' } as React.CSSProperties}
            >
              <span>{template.icon}</span>
            </div>
          </div>
          <div className={styles.bottom}>
            {card.card_number && (
              <p className={styles.number}>
                <span className={styles.numberDots}>••••</span>
                <span className={styles.numberDigits}>{card.card_number.slice(-4)}</span>
              </p>
            )}
            {card.expiry_date && <p className={styles.expiry}>{card.expiry_date}</p>}
          </div>
        </div>
      </button>

      {enlarged && (
        card.image_url
          ? <ImageOverlay src={card.image_url} name={card.name} onClose={() => setEnlarged(false)} />
          : <EnlargedCard card={card} template={template} onClose={() => setEnlarged(false)} />
      )}
    </>
  )
}

/* ── תמונה אמיתית בגדול ── */
function ImageOverlay({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`תמונת ${name} מוגדלת`}
      onClick={onClose}
    >
      <div className={styles.imageFrame} onClick={e => e.stopPropagation()}>
        <img src={src} alt={name} className={styles.fullImage} />
      </div>

      <button
        type="button"
        className={styles.closeBtn}
        aria-label="סגור"
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <p className={styles.overlayHint}>לחץ מחוץ לתמונה לסגירה</p>
    </div>,
    document.body
  )
}

/* ── כרטיס מעוצב מוגדל (כשאין תמונה) ── */
function EnlargedCard({ card, template, onClose }: {
  card: Card
  template: ReturnType<typeof getTemplate>
  onClose: () => void
}) {
  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`כרטיס מוגדל: ${card.name}`}
      onClick={onClose}
    >
      <div
        className={styles.enlargedCard}
        style={{
          '--card-bg': template.bgImageUrl && !card.image_url
            ? `url(${template.bgImageUrl})`
            : template.bgColor,
          '--card-color': template.textColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >
        {template.bgImageUrl && !card.image_url && (
          <div className={styles.brandOverlay} />
        )}
        <div className={styles.enlargedInner}>
          <div className={styles.enlargedTop}>
            <span className={styles.enlargedIcon}>{template.icon}</span>
            <span className={styles.enlargedCategory}>{CATEGORY_LABELS[card.category]}</span>
          </div>
          <div className={styles.enlargedBottom}>
            <h2 className={styles.enlargedName}>{card.name}</h2>
            {card.card_number && (
              <p className={styles.enlargedNumber}>
                <span className={styles.numberDots}>••••</span>
                <span className={styles.numberDigits}>{card.card_number.slice(-4)}</span>
              </p>
            )}
            {card.expiry_date && <p className={styles.enlargedExpiry}>{card.expiry_date}</p>}
          </div>
        </div>

        <button
          type="button"
          className={styles.closeBtn}
          aria-label="סגור"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>

      <p className={styles.overlayHint}>לחץ מחוץ לכרטיס לסגירה</p>
    </div>,
    document.body
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
