import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import styles from './Auth.module.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (error) {
      if (error.message.includes('already registered')) {
        setError('כתובת האימייל הזו כבר רשומה')
      } else {
        setError(error.message)
      }
    } else {
      navigate('/home')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.logoSection}>
        <h1 className={styles.title}>יצירת חשבון</h1>
        <p className={styles.tagline}>הצטרף ל-oneWallet וצא מהארנק הישן</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="input-group">
          <div className="input-wrapper">
            <span className="input-icon"><PersonIcon /></span>
            <input
              className="input-field"
              type="text"
              placeholder="שם מלא"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
        </div>

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

        <div className="input-group">
          <div className="input-wrapper">
            <span className="input-icon"><LockIcon /></span>
            <input
              className="input-field"
              type="password"
              placeholder="סיסמה (לפחות 6 תווים)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'צור חשבון'}
        </button>
      </form>

      <p className={styles.switchText}>
        כבר יש לך חשבון?{' '}
        <Link to="/login" className={styles.switchLink}>כניסה</Link>
      </p>
    </div>
  )
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
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
