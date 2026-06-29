import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/database'
import type { LucideIcon } from 'lucide-react'
import { Star, CreditCard, Bell, Lock, HelpCircle, Settings, Pencil, AlertTriangle, MessageSquare } from 'lucide-react'
import styles from './ProfilePage.module.css'

const CACHE_KEY      = (uid: string) => `profile_name_${uid}`
const PLAN_CACHE_KEY = (uid: string) => `profile_plan_${uid}`

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const cachedName = user ? (localStorage.getItem(CACHE_KEY(user.id)) ?? '') : ''
  const cachedPlan = user ? (localStorage.getItem(PLAN_CACHE_KEY(user.id)) ?? 'free') : 'free'
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(!cachedName)
  const [plan, setPlan] = useState<string>(cachedPlan)
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(cachedName)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfile(data)
          setFullName(data.full_name ?? '')
          if (data.full_name) localStorage.setItem(CACHE_KEY(user.id), data.full_name)
          const fetchedPlan = data.plan ?? 'free'
          setPlan(fetchedPlan)
          localStorage.setItem(PLAN_CACHE_KEY(user.id), fetchedPlan)
        }
        setProfileLoading(false)
      })
  }, [user])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() })
      .eq('id', user.id)
    if (!error) {
      const trimmed = fullName.trim()
      setProfile(p => p ? { ...p, full_name: trimmed } : p)
      if (user && trimmed) localStorage.setItem(CACHE_KEY(user.id), trimmed)
      setSaveMsg('נשמר בהצלחה')
      setTimeout(() => setSaveMsg(''), 2000)
      setEditing(false)
    }
    setSaving(false)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const ADMIN_EMAILS = ['miki199838@gmail.com', 'onewallet2026@gmail.com']
  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? '')
  const isPro = plan === 'pro'
  const displayName = fullName || profile?.full_name || null
  const initial = (displayName ?? user?.email ?? '?')[0].toUpperCase()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>פרופיל</h1>
      </header>

      {/* Avatar + name */}
      <div className={styles.avatarSection}>
        {profile?.avatar_url
          ? <img src={profile.avatar_url} alt="" referrerPolicy="no-referrer" className={styles.avatarImage} />
          : <div className={styles.avatar}>{initial}</div>
        }
        {editing ? (
          <div className={styles.editRow}>
            <input
              className="input-field"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="שם מלא"
            />
            <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={saving}>
              {saving ? '...' : 'שמור'}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => setEditing(false)}>
              ביטול
            </button>
          </div>
        ) : (
          <>
            {profileLoading && !displayName
              ? <span className={styles.nameSkeleton} />
              : <h2 className={styles.name}>{displayName ?? 'משתמש'}</h2>
            }
            <p className={styles.email}>{user?.email}</p>
          </>
        )}

        {saveMsg && <p className={styles.saveMsg}>{saveMsg}</p>}

        <div className={styles.planRow}>
          <span className={`${styles.planBadge} ${isAdmin ? styles.planBadgeAdmin : isPro ? styles.planBadgePro : ''}`}>
            {isAdmin ? '⚙ מנהל' : isPro ? <><Star size={13} fill="currentColor" /> Pro</> : 'תוכנית חינמית'}
          </span>
          {!editing && (
            <button type="button" className={styles.editNameBtn} onClick={() => setEditing(true)}>
              <Pencil size={14} /> ערוך שם
            </button>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className={styles.menu}>
        {!isPro && !isAdmin && (
          <MenuItem
            icon={Star}
            label="שדרג ל-Pro"
            sub="₪10 חד פעמי · עד 10 כרטיסים"
            accent
            onClick={() => navigate('/pro')}
          />
        )}
        <MenuItem icon={CreditCard} label="הכרטיסים שלי" onClick={() => navigate('/cards')} />
        <MenuItem icon={Bell} label="התראות" onClick={() => navigate('/notifications')} />
        <MenuItem icon={Lock} label="אבטחה" onClick={() => navigate('/settings')} />
        <MenuItem icon={HelpCircle} label="עזרה ותמיכה" onClick={() => window.location.href = 'mailto:onewallet2026@gmail.com?subject=פנייה לתמיכה - OneWallet'} />
        <MenuItem icon={MessageSquare} label="שלח פידבק" sub="עזור לנו להשתפר" onClick={() => window.open('https://tally.so/r/WOQ0dL', '_blank')} />
        <MenuItem icon={AlertTriangle} label="ארנק אבד — חירום" danger onClick={() => navigate('/lost-wallet')} />
        {isAdmin && (
          <MenuItem icon={Settings} label="ניהול מנהל" accent onClick={() => navigate('/admin')} />
        )}
      </div>

      <div className={styles.signOutWrap}>
        <button type="button" className={styles.signOutBtn} onClick={handleSignOut}>
          התנתקות
        </button>
        <p className={styles.version}>oneWallet v0.2.0</p>
      </div>

    </div>
  )
}

function MenuItem({ icon: Icon, label, sub, accent, danger, onClick }: {
  icon: LucideIcon; label: string; sub?: string; accent?: boolean; danger?: boolean; onClick: () => void
}) {
  return (
    <button type="button" className={`${styles.menuItem} ${accent ? styles.menuItemAccent : ''} ${danger ? styles.menuItemDanger : ''}`} onClick={onClick}>
      <span className={styles.menuIcon}><Icon size={20} strokeWidth={1.8} /></span>
      <span className={styles.menuContent}>
        <span className={styles.menuLabel}>{label}</span>
        {sub && <span className={styles.menuSub}>{sub}</span>}
      </span>
      <ChevronIcon />
    </button>
  )
}

function ChevronIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
}

