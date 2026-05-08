import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import styles from './SettingsPage.module.css'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChangePassword = async () => {
    if (newPw !== confirmPw) {
      setMsg({ type: 'error', text: 'הסיסמאות אינן תואמות' })
      return
    }
    if (newPw.length < 6) {
      setMsg({ type: 'error', text: 'סיסמה חייבת להיות לפחות 6 תווים' })
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPw })
    if (error) {
      setMsg({ type: 'error', text: error.message })
    } else {
      setMsg({ type: 'success', text: 'הסיסמה עודכנה בהצלחה' })
      setNewPw(''); setConfirmPw('')
    }
    setLoading(false)
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק את החשבון? פעולה זו אינה ניתנת לביטול.')
    if (!confirmed) return
    // Sign out — full deletion requires server-side (edge function)
    await signOut()
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate(-1)}>
          <ChevronIcon />
        </button>
        <h1 className={styles.title}>אבטחה והגדרות</h1>
        <div className={styles.spacer} />
      </header>

      {/* Account info */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>חשבון</h2>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>אימייל</span>
          <span className={styles.infoValue}>{user?.email}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>הצטרף בתאריך</span>
          <span className={styles.infoValue}>
            {user?.created_at ? new Date(user.created_at).toLocaleDateString('he-IL') : '—'}
          </span>
        </div>
      </div>

      {/* Change password */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>שינוי סיסמה</h2>
        {msg && (
          <div className={`alert ${msg.type === 'error' ? 'alert-error' : 'alert-success'}`}>
            {msg.text}
          </div>
        )}
        <div className={styles.form}>
          <div className="input-group">
            <label className="input-label" htmlFor="new-pw">סיסמה חדשה</label>
            <input id="new-pw" className="input-field" type="password" value={newPw}
              onChange={e => setNewPw(e.target.value)} placeholder="לפחות 6 תווים" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="confirm-pw">אימות סיסמה</label>
            <input id="confirm-pw" className="input-field" type="password" value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)} placeholder="הזן שוב" />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleChangePassword} disabled={loading || !newPw}>
            {loading ? <span className="spinner" /> : 'עדכן סיסמה'}
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.dangerTitle}`}>אזור מסוכן</h2>
        <button type="button" className={styles.deleteBtn} onClick={handleDeleteAccount}>
          מחק חשבון לצמיתות
        </button>
      </div>
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}
