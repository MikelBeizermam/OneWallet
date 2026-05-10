import { useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCards } from '@/hooks/useCards'
import { WalletCard } from '@/components/WalletCard'
import type { CardCategory, Card } from '@/types/database'
import styles from './CardsPage.module.css'

const CATEGORIES: Array<{ key: 'all' | CardCategory; label: string; emoji: string }> = [
  { key: 'all',     label: 'הכל',        emoji: '🗂️' },
  { key: 'id',      label: 'תעודות',     emoji: '🪪' },
  { key: 'license', label: 'רישיונות',   emoji: '🚗' },
  { key: 'loyalty', label: 'רישיון נשק', emoji: '🔫' },
  { key: 'gift',    label: 'גיפט קארד',  emoji: '🎁' },
  { key: 'student', label: 'סטודנט',     emoji: '🎓' },
  { key: 'visit',   label: 'ביקור',      emoji: '📇' },
  { key: 'other',   label: 'אחר',        emoji: '📋' },
]

export default function CardsPage() {
  const navigate = useNavigate()
  const { cards, loading, deleteCard } = useCards()
  const [activeCategory, setActiveCategory] = useState<'all' | CardCategory>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let result = cards
    if (activeCategory !== 'all') result = result.filter(c => c.category === activeCategory)
    if (search.trim()) result = result.filter(c =>
      c.name.includes(search.trim()) || c.card_number?.includes(search.trim())
    )
    return result
  }, [cards, activeCategory, search])

  const countByCategory = useMemo(() => {
    const map: Record<string, number> = { all: cards.length }
    cards.forEach(c => { map[c.category] = (map[c.category] ?? 0) + 1 })
    return map
  }, [cards])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>הכרטיסים שלי</h1>
        <button
          type="button"
          className={styles.addBtn}
          aria-label="הוסף כרטיס"
          onClick={() => navigate('/add')}
        >
          <PlusIcon />
        </button>
      </header>

      {/* Search */}
      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            className={styles.searchInput}
            placeholder="חפש כרטיס..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className={styles.clearBtn}
              aria-label="נקה חיפוש"
              onClick={() => setSearch('')}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className={styles.categoryRow}>
        {CATEGORIES.map(cat => (
          <button
            type="button"
            key={cat.key}
            className={`${styles.catPill} ${activeCategory === cat.key ? styles.catPillActive : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            {countByCategory[cat.key] ? (
              <span className={styles.catCount}>{countByCategory[cat.key]}</span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Cards list */}
      <div className={styles.body}>
        {loading ? (
          <div className={styles.skeletons}>
            {[1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji}>🗂️</span>
            <p className={styles.emptyText}>
              {search ? `לא נמצאו כרטיסים עבור "${search}"` : 'אין כרטיסים בקטגוריה זו'}
            </p>
            {!search && (
              <button type="button" className={styles.emptyAddBtn} onClick={() => navigate('/add')}>
                + הוסף כרטיס
              </button>
            )}
          </div>
        ) : (
          <div className={styles.list}>
            {filtered.map(card => (
              <SwipeableCardRow
                key={card.id}
                card={card}
                onDelete={() => deleteCard(card.id)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

const DELETE_W = 80

function SwipeableCardRow({ card, onDelete }: { card: Card; onDelete: () => void }) {
  const [offset, setOffset] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [animate, setAnimate] = useState(false)
  const startX = useRef(0)
  const dragging = useRef(false)
  const swiped = useRef(false)

  const snapTo = (open: boolean) => {
    setAnimate(true)
    setOffset(open ? DELETE_W : 0)
    setIsOpen(open)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    dragging.current = true
    swiped.current = false
    setAnimate(false)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startX.current
    const base = isOpen ? DELETE_W : 0
    const next = Math.max(0, Math.min(base + dx, DELETE_W))
    if (Math.abs(dx) > 6) {
      swiped.current = true
      setOffset(next)
    }
  }

  const onPointerUp = () => {
    if (!dragging.current) return
    dragging.current = false
    if (swiped.current) snapTo(offset > DELETE_W * 0.4)
  }

  return (
    <div
      className={styles.swipeRow}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => snapTo(false)}
    >
      <div className={styles.deleteReveal}>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => {
            snapTo(false)
            if (confirm(`למחוק את "${card.name}"?`)) onDelete()
          }}
        >
          <TrashIcon />
          <span className={styles.deleteBtnLabel}>מחק</span>
        </button>
      </div>
      <div
        className={styles.swipeCard}
        style={{
          transform: `translateX(${offset}px)`,
          transition: animate ? 'transform 0.28s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
      >
        <WalletCard card={card} disableLongPress onPress={isOpen ? () => snapTo(false) : undefined} />
      </div>
    </div>
  )
}

function PlusIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
}
function SearchIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
}
function CloseIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
}
function TrashIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
}
