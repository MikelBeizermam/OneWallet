import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useCards } from '@/hooks/useCards'
import { WalletCard } from '@/components/WalletCard'
import { WalletStack } from '@/components/WalletStack'
import type { Card } from '@/types/database'
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


export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { cards, loading, reorderCards } = useCards()
  const [isReordering, setIsReordering] = useState(false)
  const [localOrder, setLocalOrder] = useState<Card[]>([])

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  )

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'שלי'

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
        <div className={styles.headerRight}>
          {!loading && cards.length > 1 && (
            isReordering ? (
              <button type="button" className={styles.doneBtn} onClick={exitReorder}>
                סיימתי ✓
              </button>
            ) : (
              <button type="button" className={styles.reorderBtn} onClick={enterReorder} aria-label="סדר כרטיסים">
                <SortIcon />
              </button>
            )
          )}
        </div>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.greeting}>הארנק של {firstName}</h1>
        {isReordering && <p className={styles.reorderHint}>גרור כרטיסים לשינוי סדר</p>}
        <p className={styles.subtitle}>{cards.length} כרטיסים שמורים</p>
      </section>

      <div className={styles.cardsArea}>
        {/* no reorderBar here anymore */}

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
        ) : cards.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><WalletEmptyIcon /></div>
            <h3 className={styles.emptyTitle}>אין עדיין כרטיסים</h3>
            <p className={styles.emptyText}>הוסף את הכרטיס הראשון שלך ותתחיל לארגן את הארנק הדיגיטלי</p>
            <button type="button" className={styles.addFirstBtn} onClick={() => navigate('/add')}>
              + הוסף כרטיס
            </button>
          </div>
        ) : (
          <WalletStack cards={cards} />
        )}
      </div>

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
