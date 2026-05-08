import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import styles from './ProSuccessPage.module.css'

export default function ProSuccessPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    // Ensure plan is updated (webhook may have already done it)
    supabase.from('profiles').update({ plan: 'pro' }).eq('id', user.id)
  }, [user])

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <span className={styles.icon}>⭐</span>
        </div>
        <h1 className={styles.title}>ברוך הבא ל-Pro!</h1>
        <p className={styles.sub}>החשבון שלך שודרג בהצלחה. תהנה מגישה ללא הגבלה לכל הכרטיסים והתכונות.</p>
        <div className={styles.features}>
          <div className={styles.feature}><span>✅</span><span>כרטיסים ללא הגבלה</span></div>
          <div className={styles.feature}><span>✅</span><span>סריקה חכמה עם AI</span></div>
          <div className={styles.feature}><span>✅</span><span>שיתוף כרטיסים</span></div>
          <div className={styles.feature}><span>✅</span><span>גיבוי בענן מוצפן</span></div>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/home')}>
          אל הארנק שלי
        </button>
      </div>
    </div>
  )
}
