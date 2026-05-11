import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Users, Star, CreditCard, UserPlus, ChevronLeft, X, Calendar, Mail } from 'lucide-react'
import styles from './AdminDashboard.module.css'

const ADMIN_EMAIL = 'miki199838@gmail.com'

interface UserRow {
  id: string
  full_name: string | null
  plan: string
  created_at: string
  cardCount: number
  email: string
}

interface UserCard {
  id: string
  name: string
  category: string
  created_at: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null)
  const [userCards, setUserCards] = useState<UserCard[]>([])
  const [loadingCards, setLoadingCards] = useState(false)

  useEffect(() => {
    if (user?.email !== ADMIN_EMAIL) { navigate('/home'); return }
    fetchData()
  }, [user])

  const fetchData = async () => {
    const { data } = await supabase.rpc('get_admin_users')
    const rows = (data ?? []) as Array<{ id: string; full_name: string | null; plan: string; created_at: string; email: string; card_count: number }>
    setUsers(rows.map(r => ({ id: r.id, full_name: r.full_name, plan: r.plan, created_at: r.created_at, email: r.email, cardCount: r.card_count })))
    setLoading(false)
  }

  const openUser = async (u: UserRow) => {
    setSelectedUser(u)
    setLoadingCards(true)
    const { data } = await supabase
      .from('cards')
      .select('id, name, category, created_at')
      .eq('user_id', u.id)
      .order('created_at', { ascending: false })
    setUserCards(data ?? [])
    setLoadingCards(false)
  }

  const totalUsers = users.length
  const proUsers = users.filter(u => u.plan === 'pro').length
  const totalCards = users.reduce((sum, u) => sum + u.cardCount, 0)
  const today = new Date().toISOString().slice(0, 10)
  const newToday = users.filter(u => u.created_at.startsWith(today)).length

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.center}><div className={styles.spinner} /></div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate('/profile')}>
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <h1 className={styles.title}>לוח ניהול</h1>
        <div className={styles.spacer} />
      </header>

      <div className={styles.statsGrid}>
        <StatCard label="משתמשים" value={totalUsers} icon={Users} />
        <StatCard label="Pro" value={proUsers} icon={Star} highlight />
        <StatCard label="כרטיסים" value={totalCards} icon={CreditCard} />
        <StatCard label="הצטרפו היום" value={newToday} icon={UserPlus} />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>משתמשים ({totalUsers})</h2>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>שם / אימייל</span>
            <span>כרטיסים</span>
            <span>תוכנית</span>
            <span className={styles.hideOnMobile}>תאריך</span>
          </div>
          {users.map(u => (
            <button
              type="button"
              key={u.id}
              className={styles.tableRow}
              onClick={() => openUser(u)}
            >
              <span className={styles.userInfo}>
                <span className={styles.userName}>{u.full_name ?? 'ללא שם'}</span>
                <span className={styles.userEmail}>{u.email}</span>
              </span>
              <span className={styles.cardCount}>{u.cardCount}</span>
              <span className={`${styles.plan} ${u.plan === 'pro' ? styles.planPro : ''}`}>
                {u.plan === 'pro' ? 'Pro' : 'חינמי'}
              </span>
              <span className={`${styles.date} ${styles.hideOnMobile}`}>
                {new Date(u.created_at).toLocaleDateString('he-IL')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedUser && (
        <div className={styles.modalOverlay} onClick={() => setSelectedUser(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{selectedUser.full_name ?? 'ללא שם'}</h3>
              <button type="button" className={styles.closeBtn} aria-label="סגור" onClick={() => setSelectedUser(null)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalMeta}>
              <span className={`${styles.plan} ${selectedUser.plan === 'pro' ? styles.planPro : ''}`}>
                {selectedUser.plan === 'pro' ? 'Pro' : 'חינמי'}
              </span>
              <span className={styles.modalMetaItem}>
                <Mail size={13} />
                {selectedUser.email}
              </span>
              <span className={styles.modalMetaItem}>
                <Calendar size={13} />
                {new Date(selectedUser.created_at).toLocaleDateString('he-IL')}
              </span>
              <span className={styles.modalMetaItem}>
                <CreditCard size={13} />
                {selectedUser.cardCount} כרטיסים
              </span>
            </div>

            <h4 className={styles.modalSubtitle}>כרטיסים</h4>
            {loadingCards ? (
              <div className={styles.cardsLoading}><div className={styles.spinner} /></div>
            ) : userCards.length === 0 ? (
              <p className={styles.emptyCards}>אין כרטיסים</p>
            ) : (
              <div className={styles.cardsList}>
                {userCards.map(c => (
                  <div key={c.id} className={styles.cardRow}>
                    <span className={styles.cardName}>{c.name}</span>
                    <span className={styles.cardCategory}>{c.category}</span>
                    <span className={styles.cardDate}>{new Date(c.created_at).toLocaleDateString('he-IL')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, icon: Icon, highlight }: {
  label: string; value: number; icon: typeof Users; highlight?: boolean
}) {
  return (
    <div className={`${styles.statCard} ${highlight ? styles.statCardHighlight : ''}`}>
      <Icon size={22} strokeWidth={1.8} />
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}
