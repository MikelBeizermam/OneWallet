import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import styles from './Auth.module.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className={styles.page}>
        <div className={styles.logoSection}>
          <div style={{ fontSize: '48px', textAlign: 'center' }}>📧</div>
          <h1 className={styles.title}>בדוק את המייל שלך</h1>
          <p className={styles.tagline}>שלחנו לך קישור לאיפוס הסיסמה לכתובת<br /><strong>{email}</strong></p>
        </div>
        <Link to="/login" className="btn btn-secondary" style={{ display: 'flex' }}>
          חזרה לכניסה
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Link to="/login" className={styles.backBtn} aria-label="חזרה">
        <BackIcon />
      </Link>

      <div className={styles.logoSection}>
        <h1 className={styles.title}>איפוס סיסמה</h1>
        <p className={styles.tagline}>הזן את האימייל שלך ונשלח לך קישור לאיפוס</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="input-group">
          <div className="input-wrapper">
            <span className="input-icon"><EmailIcon /></span>
            <input
              className="input-field"
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              inputMode="email"
            />
          </div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'שלח קישור לאיפוס'}
        </button>
      </form>

      <p className={styles.switchText}>
        זכרת את הסיסמה?{' '}
        <Link to="/login" className={styles.switchLink}>כניסה</Link>
      </p>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}
