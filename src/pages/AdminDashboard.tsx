import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import styles from './AdminDashboard.module.css'

const ADMIN_EMAIL = 'miki199838@gmail.com'

interface Stats {
  totalUsers: number
  proUsers: number
  totalCards: number
  newToday: number
}

interface UserRow {
  id: string
  full_name: string | null
  plan: string
  created_at: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats | null>(null)
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.email !== ADMIN_EMAIL) {
      navigate('/home')
      return
    }
    fetchData()
  }, [user])

  const fetchData = async () => {
    const [profilesRes, cardsRes] = await Promise.all([
      supabase.from('profiles').select('id, full_name, plan, created_at').order('created_at', { ascending: false }),
      supabase.from('cards').select('id, created_at'),
    ])

    const profiles = profilesRes.data ?? []
    const cards = cardsRes.data ?? []
    const today = new Date().toISOString().slice(0, 10)

    setStats({
      totalUsers: profiles.length,
      proUsers: profiles.filter(p => p.plan === 'pro').length,
      totalCards: cards.length,
      newToday: profiles.filter(p => p.created_at.startsWith(today)).length,
    })
    setUsers(profiles)
    setLoading(false)
  }

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
          <ChevronIcon />
        </button>
        <h1 className={styles.title}>לוח ניהול</h1>
        <div className={styles.spacer} />
      </header>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <StatCard label="משתמשים" value={stats?.totalUsers ?? 0} emoji="👥" />
        <StatCard label="Pro" value={stats?.proUsers ?? 0} emoji="⭐" highlight />
        <StatCard label="כרטיסים" value={stats?.totalCards ?? 0} emoji="🪪" />
        <StatCard label="הצטרפו היום" value={stats?.newToday ?? 0} emoji="🆕" />
      </div>

      {/* Users table */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>משתמשים ({users.length})</h2>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>שם</span>
            <span>תוכנית</span>
            <span>תאריך הצטרפות</span>
          </div>
          {users.map(u => (
            <div key={u.id} className={styles.tableRow}>
              <span className={styles.userName}>{u.full_name ?? 'ללא שם'}</span>
              <span className={`${styles.plan} ${u.plan === 'pro' ? styles.planPro : ''}`}>
                {u.plan === 'pro' ? '⭐ Pro' : 'חינמי'}
              </span>
              <span className={styles.date}>
                {new Date(u.created_at).toLocaleDateString('he-IL')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, emoji, highlight }: {
  label: string; value: number; emoji: string; highlight?: boolean
}) {
  return (
    <div className={`${styles.statCard} ${highlight ? styles.statCardHighlight : ''}`}>
      <span className={styles.statEmoji}>{emoji}</span>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}
