import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { getTemplate, CATEGORY_LABELS } from '@/lib/cardTemplates'
import { useCards } from '@/hooks/useCards'
import type { Card } from '@/types/database'
import styles from './CardViewPage.module.css'

export default function CardViewPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { deleteCard } = useCards()
  const [card, setCard] = useState<Card | null>(null)
  const [loading, setLoading] = useState(true)
  const [showImage, setShowImage] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showBalanceModal, setShowBalanceModal] = useState(false)
  const [spentAmount, setSpentAmount] = useState('')
  const [spentPlace, setSpentPlace] = useState('')
  const [savingBalance, setSavingBalance] = useState(false)

  useEffect(() => {
    if (!id) return
    supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setCard(data)
        setLoading(false)
      })
  }, [id])

  const handleDelete = async () => {
    if (!id) return
    setDeleting(true)
    await deleteCard(id)
    navigate('/home')
  }

  type GiftMeta = { balance: string; history?: { date: string; amount: number; place: string }[] }
  const giftMeta = card?.category === 'gift' ? (card.metadata as GiftMeta) : null
  const currentBalance = parseFloat(giftMeta?.balance ?? '0') || 0
  const history = giftMeta?.history ?? []

  const handleUpdateBalance = async () => {
    if (!id || !card) return
    const spent = parseFloat(spentAmount) || 0
    const newBalance = Math.max(0, currentBalance - spent)
    const today = new Date().toLocaleDateString('he-IL')
    const newEntry = { date: today, amount: spent, place: spentPlace.trim() || 'לא צוין' }
    const newMeta: GiftMeta = {
      balance: String(newBalance),
      history: [newEntry, ...history],
    }
    setSavingBalance(true)
    await supabase.from('cards').update({ metadata: newMeta }).eq('id', id)
    setCard(c => c ? { ...c, metadata: newMeta } : c)
    setSpentAmount('')
    setSpentPlace('')
    setSavingBalance(false)
    setShowBalanceModal(false)
    if (newBalance === 0) setShowDeleteConfirm(true)
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingWrap}>
          <div className={styles.spinner} />
        </div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingWrap}>
          <p>כרטיס לא נמצא</p>
          <button type="button" className={styles.backHomeBtn} onClick={() => navigate('/home')}>
            חזרה לבית
          </button>
        </div>
      </div>
    )
  }

  const template = getTemplate(card.template_id, card.category)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate(-1)}>
          <ChevronIcon />
        </button>
        <span className={styles.headerTitle}>{card.name}</span>
        <button
          type="button"
          className={styles.deleteBtn}
          aria-label="מחק כרטיס"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <TrashIcon />
        </button>
      </header>

      {/* Card visual */}
      <div
        className={styles.cardVisual}
        style={{ '--card-bg': template.bgColor, '--card-color': template.textColor } as React.CSSProperties}
      >
        {card.image_url && (
          <img src={card.image_url} alt="" className={styles.cardBgImage} aria-hidden="true" />
        )}
        <div className={styles.cardInner}>
          <div className={styles.cardTop}>
            <span className={styles.cardIcon}>{template.icon}</span>
            <span className={styles.cardCategoryLabel}>{CATEGORY_LABELS[card.category]}</span>
          </div>
          <div className={styles.cardBottom}>
            <h2 className={styles.cardName}>{card.name}</h2>
            {card.card_number && <p className={styles.cardNumber}>{card.card_number.slice(0, 4)} ••••</p>}
            {card.expiry_date && <p className={styles.cardExpiry}>{card.expiry_date}</p>}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {card.image_url && (
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setShowImage(true)}
          >
            <ZoomIcon />
            <span>הגדל תמונה</span>
          </button>
        )}
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => navigate(`/cards/${id}/edit`)}
        >
          <EditIcon />
          <span>עריכה</span>
        </button>
      </div>

      {/* Gift card balance widget */}
      {card.category === 'gift' && (
        <>
          <div className={styles.giftBalanceBox}>
            <div className={styles.giftBalanceTop}>
              <span className={styles.giftBalanceLabel}>יתרה בכרטיס</span>
              <span className={styles.giftBalanceAmount}>₪{currentBalance.toFixed(0)}</span>
            </div>
            <button
              type="button"
              className={styles.giftBalanceBtn}
              onClick={() => { setSpentAmount(''); setSpentPlace(''); setShowBalanceModal(true) }}
            >
              השתמשת? עדכן את היתרה 💸
            </button>
          </div>

          {history.length > 0 && (
            <div className={styles.historyBox}>
              <h3 className={styles.historyTitle}>היסטוריית שימוש</h3>
              {history.map((item, i) => (
                <div key={i} className={styles.historyRow}>
                  <div className={styles.historyLeft}>
                    <span className={styles.historyPlace}>{item.place}</span>
                    <span className={styles.historyDate}>{item.date}</span>
                  </div>
                  <span className={styles.historyAmount}>-₪{item.amount}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Details */}
      <div className={styles.details}>
        <h3 className={styles.detailsTitle}>פרטי הכרטיס</h3>
        <DetailRow label="שם" value={card.name} />
        <DetailRow label="קטגוריה" value={CATEGORY_LABELS[card.category]} />
        {card.card_number && <DetailRow label="מספר" value={card.card_number} />}
        {card.expiry_date && <DetailRow label="תאריך" value={card.expiry_date} />}
        {card.category === 'gift' && (card.metadata as Record<string, string>)?.balance && (
          <DetailRow label="יתרה בכרטיס" value={`₪${(card.metadata as Record<string, string>).balance}`} />
        )}
        <DetailRow label="נוסף בתאריך" value={new Date(card.created_at).toLocaleDateString('he-IL')} />
      </div>

      {/* Image zoom modal */}
      {showImage && card.image_url && (
        <div
          className={styles.imageOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="תמונת כרטיס מוגדלת"
          onClick={() => setShowImage(false)}
        >
          <img
            src={card.image_url}
            alt={card.name}
            className={styles.zoomedImage}
            onClick={e => e.stopPropagation()}
          />
          <button
            type="button"
            className={styles.overlayCloseBtn}
            aria-label="סגור תמונה"
            onClick={() => setShowImage(false)}
          >
            <CloseIcon />
          </button>
          <p className={styles.overlayHint}>לחץ מחוץ לתמונה לסגירה</p>
        </div>
      )}

      {/* Balance update modal */}
      {showBalanceModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>עדכון יתרה 🎁</h3>
            <p className={styles.modalText}>יתרה נוכחית: <strong>₪{currentBalance.toFixed(0)}</strong></p>
            <div className="input-group">
              <label className="input-label" htmlFor="spent-amount">כמה השתמשת? (₪)</label>
              <input
                id="spent-amount"
                className="input-field"
                placeholder="לדוגמה: 50"
                value={spentAmount}
                onChange={e => setSpentAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                inputMode="decimal"
                autoFocus
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="spent-place">איפה בזבזת?</label>
              <input
                id="spent-place"
                className="input-field"
                placeholder="לדוגמה: זארה, קפה גרג..."
                value={spentPlace}
                onChange={e => setSpentPlace(e.target.value)}
              />
            </div>
            {spentAmount && (
              <p className={styles.balancePreview}>
                יתרה לאחר עדכון: <strong>₪{Math.max(0, currentBalance - (parseFloat(spentAmount) || 0)).toFixed(0)}</strong>
                {Math.max(0, currentBalance - (parseFloat(spentAmount) || 0)) === 0 && (
                  <span className={styles.balanceEmpty}> · הכרטיס נגמר!</span>
                )}
              </p>
            )}
            <div className={styles.modalActions}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowBalanceModal(false)} disabled={savingBalance}>
                ביטול
              </button>
              <button type="button" className={styles.confirmSaveBtn} onClick={handleUpdateBalance} disabled={savingBalance || !spentAmount}>
                {savingBalance ? <span className="spinner" /> : 'עדכן'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="אישור מחיקה">
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>מחיקת כרטיס</h3>
            <p className={styles.modalText}>האם אתה בטוח שברצונך למחוק את "{card.name}"? פעולה זו לא ניתנת לביטול.</p>
            <div className={styles.modalActions}>
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>
                ביטול
              </button>
              <button type="button" className={styles.confirmDeleteBtn} onClick={handleDelete} disabled={deleting}>
                {deleting ? <span className="spinner" /> : 'מחק'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}
function TrashIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
}
function ZoomIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
}
function EditIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
}
function CloseIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
}
