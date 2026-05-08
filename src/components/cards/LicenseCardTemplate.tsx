import styles from './CardTemplates.module.css'

interface LicenseCardProps {
  name?: string
  licenseNumber?: string
  issueDate?: string
  photoUrl?: string | null
}

export function LicenseCardTemplate({ name, licenseNumber, issueDate, photoUrl }: LicenseCardProps) {
  return (
    <div className={styles.licenseCard}>
      <div className={styles.licenseHeader}>
        <span className={styles.licenseFlag}>🇮🇱</span>
        <div className={styles.licenseHeaderText}>
          <span className={styles.licenseState}>ISRAEL · ישראל</span>
          <span className={styles.licenseTitle}>רישיון נהיגה</span>
          <span className={styles.licenseTitleEn}>DRIVING LICENCE</span>
        </div>
        <div className={styles.licenseEU}>EU</div>
      </div>

      <div className={styles.licenseBody}>
        <div className={styles.licensePhotoBox}>
          {photoUrl
            ? <img src={photoUrl} alt="תמונת הנהג" className={styles.licensePhoto} />
            : <div className={styles.licensePhotoPlaceholder}><PersonIcon /></div>
          }
        </div>

        <div className={styles.licenseFields}>
          <LicenseField num="1." label="שם" value={name ?? '—'} />
          <LicenseField num="4d." label="מספר רישיון" value={licenseNumber ?? '—'} mono />
          <LicenseField num="4b." label="תאריך הנפקה" value={issueDate ?? '—'} />
          <LicenseField num="9." label="קטגוריות" value="B" />
        </div>
      </div>

      <div className={styles.licenseFooter}>
        <div className={styles.licenseBarcode}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={styles.licenseBar}
              style={{ height: `${Math.random() * 16 + 8}px` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function LicenseField({ num, label, value, mono }: { num: string; label: string; value: string; mono?: boolean }) {
  return (
    <div className={styles.licenseField}>
      <span className={styles.licenseFieldNum}>{num}</span>
      <div>
        <span className={styles.licenseFieldLabel}>{label}</span>
        <span className={`${styles.licenseFieldValue} ${mono ? styles.mono : ''}`}>{value}</span>
      </div>
    </div>
  )
}

function PersonIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )
}
