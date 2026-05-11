import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { getTemplate, CATEGORY_LABELS, FIELD_LABELS } from '@/lib/cardTemplates'
import type { Card, CardCategory } from '@/types/database'
import styles from './AddCardPage.module.css'

function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

function fromNativeDate(native: string): string {
  if (!native) return ''
  const [yyyy, mm, dd] = native.split('-')
  return `${dd}/${mm}/${yyyy}`
}

export default function EditCardPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)
  const calendarRef = useRef<HTMLInputElement>(null)
  const expiryCalendarRef = useRef<HTMLInputElement>(null)
  const idExpiryCalendarRef = useRef<HTMLInputElement>(null)

  const [card, setCard] = useState<Card | null>(null)
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [dateDisplay, setDateDisplay] = useState('')
  const [category, setCategory] = useState<CardCategory>('other')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [holderName, setHolderName] = useState('')
  const [validYear, setValidYear] = useState('')
  const [licenseExpiry, setLicenseExpiry] = useState('')
  const [phone, setPhone] = useState('')
  const [idExpiry, setIdExpiry] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    supabase.from('cards').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        setCard(data)
        setName(data.name)
        setCardNumber(data.card_number ?? '')
        setDateDisplay(data.expiry_date ?? '')
        setCategory(data.category)
        setImagePreview(data.image_url ?? null)
        setHolderName((data.metadata as Record<string, string>)?.holder_name ?? '')
        setValidYear((data.metadata as Record<string, string>)?.valid_year ?? '')
        setLicenseExpiry((data.metadata as Record<string, string>)?.license_expiry ?? '')
        setPhone((data.metadata as Record<string, string>)?.phone ?? '')
        setIdExpiry((data.metadata as Record<string, string>)?.id_expiry ?? '')
      }
      setLoading(false)
    })
  }, [id])

  const handleDateTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setDateDisplay(formatDateInput(e.target.value))
  }

  const handleCalendarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateDisplay(fromNativeDate(e.target.value))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile || !user) return null
    const ext = imageFile.name.split('.').pop()
    const path = `${user.id}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('card-images').upload(path, imageFile, { upsert: true })
    if (error) return null
    const { data } = supabase.storage.from('card-images').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('יש להזין שם לכרטיס'); return }
    if (!id) return
    setError('')
    setSaving(true)

    const imageUrl = imageFile ? await uploadImage() : undefined

    const { error } = await supabase.from('cards').update({
      name: name.trim(),
      category,
      card_number: cardNumber.trim() || null,
      expiry_date: dateDisplay.trim() || null,
      ...(imageUrl !== undefined && { image_url: imageUrl }),
      ...(category === 'loyalty' ? { metadata: { ...(holderName.trim() ? { holder_name: holderName.trim() } : {}) } } : {}),
      ...(category === 'student' ? { metadata: { ...(validYear ? { valid_year: validYear } : {}) } } : {}),
      ...(category === 'license' ? { metadata: { ...(licenseExpiry.trim() ? { license_expiry: licenseExpiry.trim() } : {}) } } : {}),
      ...(category === 'visit' ? { metadata: { ...(phone.trim() ? { phone: phone.trim() } : {}) } } : {}),
      ...(category === 'id' ? { metadata: { ...(idExpiry.trim() ? { id_expiry: idExpiry.trim() } : {}) } } : {}),
    }).eq('id', id)

    if (error) {
      setError('שגיאה בשמירת הכרטיס: ' + error.message)
    } else {
      navigate(`/cards/${id}`)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '100dvh' }}>
          <div className="spinner" />
        </div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className={styles.page}>
        <p style={{ padding: '2rem', textAlign: 'center' }}>כרטיס לא נמצא</p>
      </div>
    )
  }

  const template = getTemplate(card.template_id, category)
  const fieldLabels = FIELD_LABELS[category]

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate(-1)}>
          <ChevronIcon />
        </button>
        <h1 className={styles.title}>עריכת כרטיס</h1>
        <div className={styles.headerSpacer} />
      </header>

      <div
        className={styles.preview}
        style={{ '--card-bg': template.bgColor, '--card-color': template.textColor } as React.CSSProperties}
      >
        {imagePreview && <img src={imagePreview} alt="" className={styles.previewBg} aria-hidden="true" />}
        <div className={styles.previewInner}>
          <template.icon size={28} strokeWidth={1.8} className={styles.previewIcon} />
          <div>
            <p className={styles.previewName}>{name || card.name}</p>
            {cardNumber && <p className={styles.previewNumber}>•••• {cardNumber.slice(-4)}</p>}
            {dateDisplay && <p className={styles.previewDate}>{dateDisplay}</p>}
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}

        <button
          type="button"
          className={styles.uploadBtn}
          aria-label={imagePreview ? 'החלף תמונת כרטיס' : 'הוסף תמונת כרטיס'}
          onClick={() => fileRef.current?.click()}
        >
          <CameraIcon />
          <span>{imagePreview ? 'החלף תמונה' : 'הוסף תמונה'}</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          title="בחר תמונה לכרטיס"
          aria-label="בחר תמונה לכרטיס"
          className={styles.hiddenInput}
          onChange={handleImageChange}
        />

        <div className="input-group">
          <label className="input-label" htmlFor="edit-name">שם הכרטיס *</label>
          <input
            id="edit-name"
            className="input-field"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="edit-number">{fieldLabels.numberLabel}</label>
          <input
            id="edit-number"
            className="input-field"
            placeholder={fieldLabels.numberPlaceholder}
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            inputMode="numeric"
          />
        </div>

        {category === 'visit' && (
          <div className="input-group">
            <label className="input-label" htmlFor="edit-phone">מספר פלאפון</label>
            <input
              id="edit-phone"
              className="input-field"
              placeholder="050-0000000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              inputMode="tel"
            />
          </div>
        )}

        {category === 'loyalty' && (
          <div className="input-group">
            <label className="input-label" htmlFor="edit-holder-name">שם הבעלים</label>
            <input
              id="edit-holder-name"
              className="input-field"
              placeholder="שם פרטי ושם משפחה"
              value={holderName}
              onChange={e => setHolderName(e.target.value)}
            />
          </div>
        )}

        <div className="input-group">
          <label className="input-label" htmlFor="edit-date">{fieldLabels.dateLabel}</label>
          <div className={styles.dateRow}>
            <input
              id="edit-date"
              className="input-field"
              placeholder="DD/MM/YYYY"
              value={dateDisplay}
              onChange={handleDateTyping}
              inputMode="numeric"
              maxLength={10}
            />
            <button
              type="button"
              className={styles.calendarBtn}
              aria-label="בחר תאריך מלוח שנה"
              onClick={() => calendarRef.current?.showPicker?.()}
            >
              <CalendarIcon />
            </button>
            <input
              ref={calendarRef}
              type="date"
              title="בחר תאריך"
              aria-label="בחר תאריך"
              className={styles.hiddenInput}
              onChange={handleCalendarChange}
            />
          </div>
        </div>

        {category === 'id' && (
          <div className="input-group">
            <label className="input-label" htmlFor="edit-id-expiry">תוקף הכרטיס</label>
            <div className={styles.dateRow}>
              <input
                id="edit-id-expiry"
                className="input-field"
                placeholder="DD/MM/YYYY"
                value={idExpiry}
                onChange={e => setIdExpiry(formatDateInput(e.target.value))}
                inputMode="numeric"
                maxLength={10}
              />
              <button
                type="button"
                className={styles.calendarBtn}
                aria-label="בחר תאריך תוקף מלוח שנה"
                onClick={() => idExpiryCalendarRef.current?.showPicker?.()}
              >
                <CalendarIcon />
              </button>
              <input
                ref={idExpiryCalendarRef}
                type="date"
                title="בחר תאריך תוקף"
                aria-label="בחר תאריך תוקף"
                className={styles.hiddenInput}
                onChange={e => setIdExpiry(fromNativeDate(e.target.value))}
              />
            </div>
          </div>
        )}

        {category === 'license' && (
          <div className="input-group">
            <label className="input-label" htmlFor="edit-license-expiry">תאריך תוקף</label>
            <div className={styles.dateRow}>
              <input
                id="edit-license-expiry"
                className="input-field"
                placeholder="DD/MM/YYYY"
                value={licenseExpiry}
                onChange={e => setLicenseExpiry(formatDateInput(e.target.value))}
                inputMode="numeric"
                maxLength={10}
              />
              <button
                type="button"
                className={styles.calendarBtn}
                aria-label="בחר תאריך תוקף מלוח שנה"
                onClick={() => expiryCalendarRef.current?.showPicker?.()}
              >
                <CalendarIcon />
              </button>
              <input
                ref={expiryCalendarRef}
                type="date"
                title="בחר תאריך תוקף"
                aria-label="בחר תאריך תוקף"
                className={styles.hiddenInput}
                onChange={e => setLicenseExpiry(fromNativeDate(e.target.value))}
              />
            </div>
          </div>
        )}

        {category === 'student' && (
          <div className="input-group">
            <label className="input-label" htmlFor="edit-valid-year">תוקף (שנה)</label>
            <select
              id="edit-valid-year"
              className="input-field"
              title="בחר שנת תוקף"
              value={validYear}
              onChange={e => setValidYear(e.target.value)}
            >
              <option value="">בחר שנה</option>
              {Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + i).map(y => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
          </div>
        )}

        <div className="input-group">
          <label className="input-label" htmlFor="edit-category">קטגוריה</label>
          <select
            id="edit-category"
            className="input-field"
            title="בחר קטגוריה"
            value={category}
            onChange={e => setCategory(e.target.value as CardCategory)}
          >
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? <span className="spinner" /> : '✓ שמור שינויים'}
        </button>
      </form>
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
}
function CameraIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
}
function CalendarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
}
