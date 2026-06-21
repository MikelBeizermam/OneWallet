import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { getTemplate, CATEGORY_LABELS } from '@/lib/cardTemplates'
import { useCards } from '@/contexts/CardsContext'
import type { Card } from '@/types/database'
import styles from './CardViewPage.module.css'

const RENEWAL_URLS: Partial<Record<string, string>> = {
  id:      'https://www.gov.il/he/service/biometric_smart_id_request',
  license: 'https://www.gov.il/he/service/driving_license_renewal',
  loyalty: 'https://www.gov.il/he/service/private_firearm_license_renewal',
}

const RENEWAL_LABELS: Partial<Record<string, string>> = {
  id:      'חידוש ת.ז',
  license: 'חידוש רישיון נהיגה',
  loyalty: 'חידוש רישיון נשק',
}

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
  const [addingToWallet, setAddingToWallet] = useState(false)

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
  const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent)
  const [copying, setCopying] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyImage = async () => {
    if (!card?.image_url) return
    setCopying(true)
    try {
      // Get image as blob (handles both base64 and URL)
      let blob: Blob
      if (card.image_url.startsWith('data:')) {
        const [header, data] = card.image_url.split(',')
        const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg'
        const bytes = Uint8Array.from(atob(data), c => c.charCodeAt(0))
        blob = new Blob([bytes], { type: mime })
      } else {
        const res = await fetch(card.image_url)
        blob = await res.blob()
      }

      // Draw to canvas to get PNG (required for clipboard)
      const blobUrl = URL.createObjectURL(blob)
      const img = new Image()
      img.crossOrigin = 'anonymous'
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = blobUrl
      })
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      canvas.getContext('2d')!.drawImage(img, 0, 0)
      URL.revokeObjectURL(blobUrl)

      const png = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(b => b ? resolve(b) : reject(), 'image/png')
      )
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })])
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2500)
    } catch {
      alert('לא ניתן להעתיק — נסה להגדיל את התמונה ולשמור ידנית')
    }
    setCopying(false)
  }

  const handleAddToWallet = useCallback(async () => {
    if (!id) return
    setAddingToWallet(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-pass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token ?? import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ cardId: id }),
      })
      if (!res.ok) throw new Error('שגיאה ביצירת הכרטיס')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${card?.name ?? 'card'}.pkpass`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      alert('שגיאה בהוספה ל-Apple Wallet')
    }
    setAddingToWallet(false)
  }, [id, card])
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

      <div className={styles.body}>
        {/* Left column on desktop */}
        <div className={styles.leftCol}>
          {/* Card visual */}
          <div
            className={styles.cardVisual}
            style={{
              '--card-bg': card.image_url
                ? '#111'
                : template.bgImageUrl
                  ? `url(${template.bgImageUrl})`
                  : template.bgColor,
              '--card-color': template.textColor,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } as React.CSSProperties}
          >
            {card.image_url && (
              <img src={card.image_url} alt="" className={styles.cardBgImage} aria-hidden="true" />
            )}
            {(card.image_url || (template.bgImageUrl && !card.image_url)) && (
              <div className={styles.cardBrandOverlay} />
            )}
            <div className={styles.cardInner}>
              <div className={styles.cardTop}>
                <template.icon size={28} strokeWidth={1.8} className={styles.cardIcon} />
                  </div>
              <div className={styles.cardBottom}>
                <h2 className={styles.cardName}>{card.name}</h2>
                {card.card_number && <p className={styles.cardNumber}>•••• {card.card_number.slice(-4)}</p>}
                {card.expiry_date && <p className={styles.cardExpiry}>{card.expiry_date}</p>}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {card.image_url && (
              <button type="button" className={styles.actionBtn} onClick={() => setShowImage(true)}>
                <ZoomIcon />
                <span>הגדל תמונה</span>
              </button>
            )}
            <button type="button" className={styles.actionBtn} onClick={() => navigate(`/cards/${id}/edit`)}>
              <EditIcon />
              <span>עריכה</span>
            </button>
            {!isMobile && card.image_url && (
              <button
                type="button"
                className={`${styles.actionBtn} ${copySuccess ? styles.actionBtnSuccess : ''}`}
                onClick={handleCopyImage}
                disabled={copying}
              >
                {copySuccess ? <CheckIcon /> : <CopyIcon />}
                <span>{copySuccess ? 'הועתק!' : 'העתק כרטיס'}</span>
              </button>
            )}
            {RENEWAL_URLS[card.category] && (
              <a
                href={RENEWAL_URLS[card.category]}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
              >
                <RenewIcon />
                <span>{RENEWAL_LABELS[card.category]}</span>
              </a>
            )}
          </div>

          {isIOS && (
            <button
              type="button"
              className={styles.walletBtn}
              onClick={handleAddToWallet}
              disabled={addingToWallet}
              aria-label="הוסף ל-Apple Wallet"
            >
              {addingToWallet ? (
                <span className={styles.walletBtnSpinner} />
              ) : (
                <>
                  <WalletIcon />
                  <span>הוסף ל-Apple Wallet</span>
                </>
              )}
            </button>
          )}

          {/* BuyMe stores button */}
          {card.template_id === 'gift-buyme' && (
            <button type="button" className={styles.storesBtn} onClick={() => navigate('/buyme-stores')}>
              <StoreIcon />
              <span>בתי עסק שמקבלים BuyMe</span>
            </button>
          )}

          {/* HTZ stores button */}
          {card.template_id === 'gift-htz' && (
            <button type="button" className={`${styles.storesBtn} ${styles.storesBtnHtz}`} onClick={() => navigate('/htz-stores')}>
              <StoreIcon />
              <span>בתי עסק שמקבלים HTZ</span>
            </button>
          )}

          {/* Expiry countdown */}
          <ExpiryBadge card={card} />

          {/* Gift balance */}
          {card.category === 'gift' && (
            <div className={styles.giftBalanceBox}>
              <div className={styles.giftBalanceTop}>
                <span className={styles.giftBalanceLabel}>יתרה בכרטיס</span>
                <span className={styles.giftBalanceAmount}>₪{currentBalance.toFixed(0)}</span>
              </div>
              <button type="button" className={styles.giftBalanceBtn}
                onClick={() => { setSpentAmount(''); setSpentPlace(''); setShowBalanceModal(true) }}>
                השתמשת? עדכן את היתרה 💸
              </button>
            </div>
          )}
        </div>

        {/* Right column on desktop */}
        <div className={styles.rightCol}>
          {/* Details */}
          <div className={styles.details}>
            <h3 className={styles.detailsTitle}>פרטי הכרטיס</h3>
            <DetailRow label="שם" value={card.name} />
            <DetailRow label="קטגוריה" value={CATEGORY_LABELS[card.category]} />
            {card.card_number && <DetailRow label="מספר" value={card.card_number} />}
            {card.expiry_date && <DetailRow label="תאריך" value={card.expiry_date} />}
            {card.category === 'visit' && (card.metadata as Record<string, string>)?.phone && (
              <DetailRow label="מספר פלאפון" value={(card.metadata as Record<string, string>).phone} />
            )}
            {card.category === 'license' && (card.metadata as Record<string, string>)?.license_expiry && (
              <DetailRow label="תאריך תוקף" value={(card.metadata as Record<string, string>).license_expiry} />
            )}
            {card.category === 'loyalty' && (card.metadata as Record<string, string>)?.holder_name && (
              <DetailRow label="שם הבעלים" value={(card.metadata as Record<string, string>).holder_name} />
            )}
            {card.category === 'id' && (card.metadata as Record<string, string>)?.id_expiry && (
              <DetailRow label="תוקף הכרטיס" value={(card.metadata as Record<string, string>).id_expiry} />
            )}
            {card.category === 'student' && (card.metadata as Record<string, string>)?.valid_year && (
              <DetailRow label="תוקף" value={(card.metadata as Record<string, string>).valid_year} />
            )}
            {card.category === 'gift' && (card.metadata as Record<string, string>)?.balance && (
              <DetailRow label="יתרה בכרטיס" value={`₪${(card.metadata as Record<string, string>).balance}`} />
            )}
            <DetailRow label="נוסף בתאריך" value={new Date(card.created_at).toLocaleDateString('he-IL')} />
          </div>

          {/* Gift history */}
          {card.category === 'gift' && history.length > 0 && (
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
        </div>
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

function getExpiryDate(card: Card): string | null {
  const meta = card.metadata as Record<string, string>
  if (card.category === 'id')      return meta?.id_expiry      || null
  if (card.category === 'license') return meta?.license_expiry || null
  if (card.category === 'student') return null
  return card.expiry_date || null
}

function parseDDMMYYYY(dateStr: string): Date | null {
  const parts = dateStr.split('/')
  if (parts.length !== 3) return null
  const [d, m, y] = parts.map(Number)
  if (!d || !m || !y) return null
  return new Date(y, m - 1, d)
}

function ExpiryBadge({ card }: { card: Card }) {
  const expiryStr = getExpiryDate(card)
  if (!expiryStr) return null

  const expiry = parseDDMMYYYY(expiryStr)
  if (!expiry) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  let icon: string
  let msg: string

  if (days < 0) {
    icon = '🔴'
    msg = `פג תוקף לפני ${Math.abs(days)} ימים`
  } else if (days <= 30) {
    icon = '🔴'
    msg = `פג תוקף בעוד ${days} ימים — דחוף!`
  } else if (days <= 90) {
    icon = '🟡'
    msg = `פג תוקף בעוד ${days} ימים`
  } else {
    icon = '🟢'
    msg = `בתוקף עד ${expiryStr} (${days} ימים)`
  }

  const status = days < 0 ? 'expired' : days <= 30 ? 'danger' : days <= 90 ? 'warning' : 'ok'

  return (
    <div className={styles.expiryBadge} data-status={status}>
      <span className={styles.expiryIcon}>{icon}</span>
      <span className={styles.expiryMsg}>{msg}</span>
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
function WalletIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/><path d="M2 10h20"/></svg>
}
function StoreIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1-5h16l1 5"/><path d="M3 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0"/><path d="M5 9v11h14V9"/><path d="M10 14h4v6h-4z"/></svg>
}
function CopyIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
}
function CheckIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
function RenewIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
}
