import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { CARD_TEMPLATES, CATEGORY_LABELS, FIELD_LABELS } from '@/lib/cardTemplates'
import type { CardCategory } from '@/types/database'
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

export default function AddCardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)
  const calendarRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<'template' | 'gift-brand' | 'form'>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CardCategory>('other')
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [dateDisplay, setDateDisplay] = useState('')
  const [giftBalance, setGiftBalance] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fieldLabels = FIELD_LABELS[selectedCategory]

  const handleTemplateSelect = (templateId: string, category: CardCategory, templateName: string) => {
    setSelectedTemplate(templateId)
    setSelectedCategory(category)
    setName(templateName)
    if (category === 'gift') {
      setStep('gift-brand')
    } else {
      setStep('form')
    }
  }

  const handleGiftBrandSelect = (brand: 'general' | 'buyme') => {
    if (brand === 'buyme') {
      setSelectedTemplate('gift-buyme')
      setName('BuyMe')
    } else {
      setSelectedTemplate('gift-general')
    }
    setStep('form')
  }

  const handleDateTyping = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setDateDisplay(formatted)
  }

  const handleCalendarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateDisplay(fromNativeDate(e.target.value))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Set the file immediately — never rely on async conversion completing
    setImageFile(file)
    // Blob URL always works for preview (even HEIC on iOS Safari)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile || !user) return null
    const ext = (imageFile.name.split('.').pop() ?? 'jpg').toLowerCase()
    const path = `${user.id}/${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from('card-images')
      .upload(path, imageFile, { upsert: true, contentType: imageFile.type || 'image/jpeg' })
    if (error) {
      setError('שגיאה בהעלאת התמונה: ' + error.message)
      return null
    }
    const { data } = supabase.storage.from('card-images').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('יש להזין שם לכרטיס'); return }
    if (!user) return

    setError('')
    setLoading(true)

    const imageUrl = await uploadImage()
    if (imageFile && imageUrl === null) { setLoading(false); return }

    const { error } = await supabase.from('cards').insert({
      user_id: user.id,
      name: name.trim(),
      category: selectedCategory,
      card_number: cardNumber.trim() || null,
      expiry_date: dateDisplay.trim() || null,
      image_url: imageUrl,
      template_id: selectedTemplate,
      metadata: selectedCategory === 'gift' && giftBalance ? { balance: giftBalance } : {},
    })

    if (error) {
      setError('שגיאה בשמירת הכרטיס: ' + error.message)
    } else {
      navigate('/home')
    }
    setLoading(false)
  }

  if (step === 'gift-brand') {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => setStep('template')}>
            <ChevronIcon />
          </button>
          <h1 className={styles.title}>בחר סוג כרטיס מתנה</h1>
          <div className={styles.headerSpacer} />
        </header>

        <div className={styles.brandGrid}>
          <button
            type="button"
            className={styles.brandCard}
            aria-label="כרטיס מתנה כללי"
            onClick={() => handleGiftBrandSelect('general')}
          >
            <img src={CARD_TEMPLATES.find(t => t.id === 'gift-general')?.bgImageUrl} alt="" className={styles.brandImage} aria-hidden="true" />
            <span className={styles.brandLabel}>גיפט קארד כללי</span>
          </button>

          <button
            type="button"
            className={styles.brandCard}
            aria-label="כרטיס BuyMe"
            onClick={() => handleGiftBrandSelect('buyme')}
          >
            <img src={CARD_TEMPLATES.find(t => t.id === 'gift-buyme')?.bgImageUrl} alt="" className={styles.brandImage} aria-hidden="true" />
            <span className={styles.brandLabel}>BuyMe</span>
          </button>
        </div>
      </div>
    )
  }

  if (step === 'template') {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate(-1)}>
            <ChevronIcon />
          </button>
          <h1 className={styles.title}>בחר סוג כרטיס</h1>
          <div className={styles.headerSpacer} />
        </header>

        <div className={styles.templateGrid}>
          {CARD_TEMPLATES.filter(t => !t.hidden).map(t => (
            <button
              type="button"
              key={t.id}
              className={styles.templateCard}
              aria-label={`בחר תבנית ${t.name}`}
              style={{ '--card-bg': t.bgColor, '--card-color': t.textColor, '--card-muted': t.textColor + 'aa' } as React.CSSProperties}
              onClick={() => handleTemplateSelect(t.id, t.category, t.name)}
            >
              <span className={styles.templateIcon}>{t.icon}</span>
              <span className={styles.templateName}>{t.name}</span>
              <span className={styles.templateCategory}>{CATEGORY_LABELS[t.category]}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const template = CARD_TEMPLATES.find(t => t.id === selectedTemplate)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} aria-label="חזרה לבחירת תבנית" onClick={() => setStep('template')}>
          <ChevronIcon />
        </button>
        <h1 className={styles.title}>פרטי הכרטיס</h1>
        <div className={styles.headerSpacer} />
      </header>

      {template && (
        <div
          className={styles.preview}
          style={{
            '--card-bg': template.bgImageUrl ? `url(${template.bgImageUrl})` : template.bgColor,
            '--card-color': template.textColor,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } as React.CSSProperties}
        >
          {imagePreview && !template.bgImageUrl && (
            <img src={imagePreview} alt="" className={styles.previewBg} aria-hidden="true" />
          )}
          {template.bgImageUrl && <div className={styles.previewBrandOverlay} />}
          <div className={styles.previewInner}>
            <span className={styles.previewIcon}>{template.icon}</span>
            <div>
              <p className={styles.previewName}>{name || template.name}</p>
              {cardNumber && <p className={styles.previewNumber}>•••• {cardNumber.slice(-4)}</p>}
              {dateDisplay && <p className={styles.previewDate}>{dateDisplay}</p>}
            </div>
          </div>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}

        <button
          type="button"
          className={styles.uploadBtn}
          aria-label={imagePreview ? 'החלף תמונת כרטיס' : 'הוסף תמונת כרטיס'}
          onClick={() => fileRef.current?.click()}
        >
          <CameraIcon />
          <span>{imagePreview ? 'החלף תמונה' : 'הוסף תמונה (אופציונלי)'}</span>
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
          <label className="input-label" htmlFor="card-name">שם הכרטיס *</label>
          <input
            id="card-name"
            className="input-field"
            placeholder={template?.name ?? 'שם הכרטיס'}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="card-number">{fieldLabels.numberLabel}</label>
          <input
            id="card-number"
            className="input-field"
            placeholder={fieldLabels.numberPlaceholder}
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            inputMode="numeric"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="card-date">{fieldLabels.dateLabel}</label>
          <div className={styles.dateRow}>
            <input
              id="card-date"
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

        {selectedCategory === 'gift' && (
          <div className="input-group">
            <label className="input-label" htmlFor="gift-balance">יתרה בכרטיס (₪)</label>
            <input
              id="gift-balance"
              className="input-field"
              placeholder="לדוגמה: 150"
              value={giftBalance}
              onChange={e => setGiftBalance(e.target.value.replace(/[^0-9.]/g, ''))}
              inputMode="decimal"
            />
          </div>
        )}

        <div className="input-group">
          <label className="input-label" htmlFor="card-category">קטגוריה</label>
          <select
            id="card-category"
            className="input-field"
            title="בחר קטגוריה"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value as CardCategory)}
          >
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : '✓ שמור כרטיס'}
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
