import styles from './CardTemplates.module.css'

interface IdCardProps {
  name?: string
  idNumber?: string
  issueDate?: string
  photoUrl?: string | null
}

export function IdCardTemplate({ name, idNumber, issueDate, photoUrl }: IdCardProps) {
  return (
    <div className={styles.idCard}>
      {/* Header strip */}
      <div className={styles.idHeader}>
        <span className={styles.idFlag}>🇮🇱</span>
        <div className={styles.idHeaderText}>
          <span className={styles.idState}>מדינת ישראל</span>
          <span className={styles.idTitle}>תעודת זהות</span>
        </div>
        <div className={styles.idEmblem}>✡</div>
      </div>

      {/* Body */}
      <div className={styles.idBody}>
        {/* Photo */}
        <div className={styles.idPhotoBox}>
          {photoUrl
            ? <img src={photoUrl} alt="תמונת המחזיק" className={styles.idPhoto} />
            : <div className={styles.idPhotoPlaceholder}><PersonIcon /></div>
          }
        </div>

        {/* Fields */}
        <div className={styles.idFields}>
          <IdField label="שם" value={name ?? '—'} />
          <IdField label="מספר זהות" value={idNumber ?? '—'} mono />
          <IdField label="תאריך הנפקה" value={issueDate ?? '—'} />
        </div>
      </div>

      {/* Footer */}
      <div className={styles.idFooter}>
        <span className={styles.idFooterText}>ISRAEL · ישראל · إسرائيل</span>
      </div>
    </div>
  )
}

function IdField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className={styles.idField}>
      <span className={styles.idFieldLabel}>{label}</span>
      <span className={`${styles.idFieldValue} ${mono ? styles.mono : ''}`}>{value}</span>
    </div>
  )
}

function PersonIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )
}
