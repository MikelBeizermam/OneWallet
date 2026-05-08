import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import styles from './Auth.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'אימייל או סיסמה שגויים' : error.message)
    } else {
      navigate('/home')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <WalletIcon />
        </div>
        <h1 className={styles.appName}>oneWallet</h1>
        <p className={styles.tagline}>ברוך הבא ל-oneWallet<br />הארנק הדיגיטלי שלך במקום אחד</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="input-group">
          <div className="input-wrapper">
            <span className="input-icon"><EmailIcon /></span>
            <input
              className="input-field"
              type="email"
              placeholder="אימייל..."
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              inputMode="email"
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <span className="input-icon"><LockIcon /></span>
            <input
              className="input-field"
              type="password"
              placeholder="קוד PIN / סיסמה"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <Link to="/forgot-password" className={styles.forgotLink}>שכחת את הסיסמה?</Link>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : <>כניסה &lsaquo;</>}
        </button>
      </form>

      <div className={styles.footer}>
        <p className={styles.switchText}>
          אין לך חשבון?{' '}
          <Link to="/register" className={styles.switchLink}>הצטרף עכשיו</Link>
        </p>

      </div>
    </div>
  )
}

function WalletIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="7" width="28" height="20" rx="4" fill="currentColor" opacity="0.15"/>
      <rect x="2" y="7" width="28" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 14h28" stroke="currentColor" strokeWidth="2"/>
      <rect x="20" y="17" width="7" height="5" rx="2.5" fill="currentColor"/>
    </svg>
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

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 118 0v4"/>
    </svg>
  )
}

