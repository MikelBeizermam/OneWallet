import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/database'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState('')
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
        }
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
      setProfile(p => p ? { ...p, full_name: fullName.trim() } : p)
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

  const isPro = profile?.plan === 'pro'
  const initial = (profile?.full_name ?? user?.email ?? '?')[0].toUpperCase()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>פרופיל</h1>
      </header>

      {/* Avatar + name */}
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>{initial}</div>
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
            <h2 className={styles.name}>{profile?.full_name ?? 'משתמש'}</h2>
            <p className={styles.email}>{user?.email}</p>
          </>
        )}

        {saveMsg && <p className={styles.saveMsg}>{saveMsg}</p>}

        <div className={styles.planRow}>
          <span className={`${styles.planBadge} ${isPro ? styles.planBadgePro : ''}`}>
            {isPro ? '⭐ Pro' : 'תוכנית חינמית'}
          </span>
          {!editing && (
            <button type="button" className={styles.editNameBtn} onClick={() => setEditing(true)}>
              ✏️ ערוך שם
            </button>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className={styles.menu}>
        {!isPro && (
          <MenuItem
            icon="⭐"
            label="שדרג ל-Pro"
            sub="₪10 לחודש · ביטול בכל עת"
            accent
            onClick={() => navigate('/pro')}
          />
        )}
        <MenuItem icon="🪪" label="הכרטיסים שלי" onClick={() => navigate('/cards')} />
        <MenuItem icon="🔔" label="התראות" onClick={() => {}} />
        <MenuItem icon="🔒" label="אבטחה" onClick={() => navigate('/settings')} />
        <MenuItem icon="❓" label="עזרה ותמיכה" onClick={() => {}} />
        {user?.email === 'miki199838@gmail.com' && (
          <MenuItem icon="⚙️" label="ניהול מנהל" accent onClick={() => navigate('/admin')} />
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

function MenuItem({ icon, label, sub, accent, onClick }: {
  icon: string; label: string; sub?: string; accent?: boolean; onClick: () => void
}) {
  return (
    <button type="button" className={`${styles.menuItem} ${accent ? styles.menuItemAccent : ''}`} onClick={onClick}>
      <span className={styles.menuIcon}>{icon}</span>
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
