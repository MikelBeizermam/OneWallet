import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useCards } from '@/hooks/useCards'
import { WalletCard } from '@/components/WalletCard'
import { WalletStack } from '@/components/WalletStack'
import { BottomNav } from '@/components/BottomNav'
import { CATEGORY_LABELS } from '@/lib/cardTemplates'
import type { CardCategory, Card } from '@/types/database'
import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './HomePage.module.css'

const TABS: Array<{ key: 'all' | CardCategory; label: string }> = [
  { key: 'all', label: 'הכל' },
  { key: 'id', label: CATEGORY_LABELS.id },
  { key: 'license', label: CATEGORY_LABELS.license },
  { key: 'loyalty', label: CATEGORY_LABELS.loyalty },
  { key: 'gift', label: CATEGORY_LABELS.gift },
  { key: 'student', label: CATEGORY_LABELS.student },
  { key: 'visit', label: CATEGORY_LABELS.visit },
  { key: 'other', label: CATEGORY_LABELS.other },
]

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { cards, loading, reorderCards } = useCards()
  const [activeTab, setActiveTab] = useState<'all' | CardCategory>('all')
  const [search, setSearch] = useState('')
  const [isReordering, setIsReordering] = useState(false)
  const [localOrder, setLocalOrder] = useState<Card[]>([])

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  )

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'שלי'

  const filtered = useMemo(() => {
    let result = cards
    if (activeTab !== 'all') result = result.filter(c => c.category === activeTab)
    if (search.trim()) result = result.filter(c => c.name.includes(search.trim()))
    return result
  }, [cards, activeTab, search])

  const enterReorder = () => {
    setLocalOrder([...cards])
    setIsReordering(true)
  }

  const exitReorder = async () => {
    setIsReordering(false)
    await reorderCards(localOrder.map(c => c.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setLocalOrder(prev => {
      const oldIndex = prev.findIndex(c => c.id === active.id)
      const newIndex = prev.findIndex(c => c.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.menuBtn} aria-label="תפריט" onClick={() => navigate('/profile')}>
          <MenuIcon />
        </button>
        <span className={styles.appTitle}>oneWallet</span>
        <button type="button" className={styles.avatarBtn} aria-label="פרופיל" onClick={() => navigate('/profile')}>
          <div className={styles.avatar}>{firstName[0]?.toUpperCase()}</div>
        </button>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.greeting}>הארנק של {firstName}</h1>
        <p className={styles.subtitle}>{cards.length} כרטיסים שמורים</p>
      </section>

      {!isReordering && (
        <>
          <div className={styles.searchRow}>
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}><SearchIcon /></span>
              <input
                className={styles.searchInput}
                placeholder="חפש כרטיס..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.tabs}>
            {TABS.map(tab => (
              <button
                type="button"
                key={tab.key}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className={styles.cardsArea}>
        {/* Reorder toolbar */}
        {!loading && cards.length > 1 && (
          <div className={styles.reorderBar}>
            {isReordering ? (
              <>
                <span className={styles.reorderHint}>גרור כרטיסים לשינוי סדר</span>
                <button type="button" className={styles.doneBtn} onClick={exitReorder}>
                  סיימתי ✓
                </button>
              </>
            ) : (
              <button type="button" className={styles.reorderBtn} onClick={enterReorder} aria-label="סדר כרטיסים">
                <SortIcon />
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className={styles.loadingState}>
            {[1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : isReordering ? (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={localOrder.map(c => c.id)} strategy={verticalListSortingStrategy}>
              <div className={styles.cardsList}>
                {localOrder.map(card => (
                  <SortableCard key={card.id} card={card} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><WalletEmptyIcon /></div>
            <h3 className={styles.emptyTitle}>
              {search ? 'לא נמצאו כרטיסים' : 'אין עדיין כרטיסים'}
            </h3>
            <p className={styles.emptyText}>
              {search
                ? 'נסה לחפש מונח אחר'
                : 'הוסף את הכרטיס הראשון שלך ותתחיל לארגן את הארנק הדיגיטלי'}
            </p>
            {!search && (
              <button type="button" className={styles.addFirstBtn} onClick={() => navigate('/add')}>
                + הוסף כרטיס
              </button>
            )}
          </div>
        ) : (
          <WalletStack key={`${activeTab}-${search}`} cards={filtered} />
        )}
      </div>

      {!isReordering && (
        <button type="button" className={styles.fab} onClick={() => navigate('/add')} aria-label="הוסף כרטיס">
          <PlusIcon />
        </button>
      )}

      <BottomNav />
    </div>
  )
}

function SortableCard({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className={styles.sortableRow}
    >
      <div className={styles.dragHandle} {...attributes} {...listeners}>
        <DragHandleIcon />
      </div>
      <div className={styles.sortableCard}>
        <WalletCard card={card} compact />
      </div>
    </div>
  )
}

function MenuIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
}
function SearchIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
}
function PlusIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
}
function SortIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
}
function DragHandleIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="18" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/></svg>
}
function WalletEmptyIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="14" width="52" height="38" rx="8" fill="var(--color-secondary)" opacity="0.3"/>
      <rect x="6" y="14" width="52" height="38" rx="8" stroke="var(--color-secondary)" strokeWidth="2"/>
      <path d="M6 26h52" stroke="var(--color-secondary)" strokeWidth="2"/>
      <rect x="42" y="32" width="12" height="10" rx="5" fill="var(--color-secondary)" opacity="0.5"/>
    </svg>
  )
}
