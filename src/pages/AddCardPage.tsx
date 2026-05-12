import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { useCards } from '@/contexts/CardsContext'
import { CARD_TEMPLATES, CATEGORY_LABELS, FIELD_LABELS } from '@/lib/cardTemplates'
import { CardCropper } from '@/components/CardCropper'
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

// Resize source image to maxW, output JPEG base64 (no cropping — crop done by CardCropper)
function drawToJpeg(source: CanvasImageSource, sw: number, sh: number, maxW: number, quality: number): string {
  const scale = Math.min(maxW / sw, 1)
  const w = Math.max(1, Math.round(sw * scale))
  const h = Math.max(1, Math.round(sh * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('no ctx')
  ctx.drawImage(source, 0, 0, w, h)
  const result = canvas.toDataURL('image/jpeg', quality)
  if (result.length < 500) throw new Error('empty canvas output')
  return result
}

// Compress any image (including HEIC) to base64 JPEG
async function toBase64(file: File, maxW = 900, quality = 0.78): Promise<string> {
  // Primary: createImageBitmap — handles HEIC natively on iOS without DOM
  try {
    const bitmap = await createImageBitmap(file)
    const result = drawToJpeg(bitmap, bitmap.width, bitmap.height, maxW, quality)
    bitmap.close()
    return result
  } catch {}

  // Secondary: Image element + canvas (works for JPEG/PNG/WebP)
  return new Promise((resolve, reject) => {
    const img = new Image()
    const blobUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(blobUrl)
      try {
        resolve(drawToJpeg(img, img.width, img.height, maxW, quality))
      } catch (e) {
        reject(e)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(blobUrl)
      reject(new Error('Image failed to load — unsupported format'))
    }
    img.src = blobUrl
  })
}

export default function AddCardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { refetch, cards, plan, loading: cardsLoading } = useCards()
  const calendarRef = useRef<HTMLInputElement>(null)
  const expiryCalendarRef = useRef<HTMLInputElement>(null)
  const idExpiryCalendarRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<'template' | 'gift-brand' | 'form'>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CardCategory>('other')
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [dateDisplay, setDateDisplay] = useState('')
  const [licenseExpiry, setLicenseExpiry] = useState('')
  const [holderName, setHolderName] = useState('')
  const [validYear, setValidYear] = useState('')
  const [phone, setPhone] = useState('')
  const [idExpiry, setIdExpiry] = useState('')
  const [giftBalance, setGiftBalance] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState('')

  const fieldLabels = FIELD_LABELS[selectedCategory]

  const handleTemplateSelect = (templateId: string, category: CardCategory, templateName: string) => {
    setSelectedTemplate(templateId)
    setSelectedCategory(category)
    setName(templateName)
    setCardNumber('')
    setDateDisplay('')
    setPhone('')
    setHolderName('')
    setValidYear('')
    setLicenseExpiry('')
    setIdExpiry('')
    setGiftBalance('')
    setImageFile(null)
    setImagePreview(null)
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
    setDateDisplay(formatDateInput(e.target.value))
  }

  const handleCalendarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateDisplay(fromNativeDate(e.target.value))
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setConverting(true)
    let finalFile: File = file
    try {
      const bitmap = await createImageBitmap(file)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      canvas.getContext('2d')!.drawImage(bitmap, 0, 0)
      bitmap.close()
      const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/jpeg', 0.95))
      if (blob) finalFile = new File([blob], 'image.jpg', { type: 'image/jpeg' })
    } catch {}
    setConverting(false)
    setImageFile(finalFile)
    setCropSrc(URL.createObjectURL(finalFile))
  }

  const handleCropDone = (croppedFile: File) => {
    setImageFile(croppedFile)
    setImagePreview(URL.createObjectURL(croppedFile))
    setCropSrc(null)
  }

  const handleCropCancel = () => {
    setCropSrc(null)
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('יש להזין שם לכרטיס'); return }
    if (!user) return

    setError('')
    setLoading(true)

    let imageUrl: string | null = null
    if (imageFile) {
      try {
        imageUrl = await toBase64(imageFile)
      } catch {
        setError('שגיאה בעיבוד התמונה, נסה תמונה אחרת')
        setLoading(false)
        return
      }
    }

    const { error: insertError } = await supabase.from('cards').insert({
      user_id: user.id,
      name: name.trim(),
      category: selectedCategory,
      card_number: cardNumber.trim() || null,
      expiry_date: dateDisplay.trim() || null,
      image_url: imageUrl,
      template_id: selectedTemplate,
      metadata: {
        ...(selectedCategory === 'gift' && giftBalance ? { balance: giftBalance } : {}),
        ...(selectedCategory === 'loyalty' && holderName.trim() ? { holder_name: holderName.trim() } : {}),
        ...(selectedCategory === 'student' && validYear ? { valid_year: validYear } : {}),
        ...(selectedCategory === 'license' && licenseExpiry.trim() ? { license_expiry: licenseExpiry.trim() } : {}),
        ...(selectedCategory === 'visit' && phone.trim() ? { phone: phone.trim() } : {}),
        ...(selectedCategory === 'id' && idExpiry.trim() ? { id_expiry: idExpiry.trim() } : {}),
      },
    })

    if (insertError) {
      setError('שגיאה בשמירת הכרטיס: ' + insertError.message)
    } else {
      navigate('/home')
      refetch()
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
              <t.icon size={28} strokeWidth={1.8} className={styles.templateIcon} />
              <span className={styles.templateName}>{t.name}</span>
              <span className={styles.templateCategory}>{CATEGORY_LABELS[t.category]}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const template = CARD_TEMPLATES.find(t => t.id === selectedTemplate)

  if (cropSrc) {
    return <CardCropper imageSrc={cropSrc} onCropDone={handleCropDone} onCancel={handleCropCancel} />
  }

  if (cardsLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingWrap}>
          <div className="spinner" />
        </div>
      </div>
    )
  }

  if (plan === 'free' && cards.length >= 3) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <button type="button" className={styles.backBtn} aria-label="חזרה" onClick={() => navigate(-1)}>
            <ChevronIcon />
          </button>
          <h1 className={styles.title}>הוספת כרטיס</h1>
          <div className={styles.headerSpacer} />
        </header>
        <div className={styles.limitGate}>
          <div className={styles.limitGateEmoji}>🔒</div>
          <h2 className={styles.limitGateTitle}>הגעת למגבלת הכרטיסים</h2>
          <p className={styles.limitGateText}>
            במסלול החינמי ניתן לשמור עד 3 כרטיסים.<br />שדרג ל-Pro לכרטיסים ללא הגבלה.
          </p>
          <button type="button" className={`btn btn-primary ${styles.limitGateUpgradeBtn}`} onClick={() => navigate('/pro')}>
            ✨ שדרג ל-Pro
          </button>
          <button type="button" className={styles.limitGateBackBtn} onClick={() => navigate(-1)}>
            חזרה
          </button>
        </div>
      </div>
    )
  }

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
          {imagePreview && (
            <img src={imagePreview} alt="" className={styles.previewBg} aria-hidden="true" />
          )}
          <div className={styles.previewOverlay} />
          <div className={styles.previewInner}>
            <template.icon size={28} strokeWidth={1.8} className={styles.previewIcon} />
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

        <label
          className={`${styles.uploadBtn} ${imagePreview ? styles.uploadBtnDone : ''}`}
          aria-label={imagePreview ? 'החלף תמונת כרטיס' : 'הוסף תמונת כרטיס'}
        >
          {converting ? <span className="spinner" /> : <CameraIcon />}
          <span>
            {converting ? 'מעבד תמונה...' : imagePreview ? '✓ תמונה נבחרה — לחץ להחלפה' : 'הוסף תמונה (אופציונלי)'}
          </span>
          <input
            type="file"
            accept="image/*"
            aria-label="בחר תמונה לכרטיס"
            className={styles.hiddenInput}
            onChange={handleImageChange}
            disabled={converting}
          />
        </label>

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

        {selectedCategory === 'visit' && (
          <div className="input-group">
            <label className="input-label" htmlFor="phone">מספר פלאפון</label>
            <input
              id="phone"
              className="input-field"
              placeholder="050-0000000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              inputMode="tel"
              maxLength={10}
            />
          </div>
        )}

        {selectedCategory === 'loyalty' && (
          <div className="input-group">
            <label className="input-label" htmlFor="holder-name">שם הבעלים</label>
            <input
              id="holder-name"
              className="input-field"
              placeholder="שם פרטי ושם משפחה"
              value={holderName}
              onChange={e => setHolderName(e.target.value)}
            />
          </div>
        )}

        {selectedCategory !== 'visit' && (
          <div className="input-group">
            <label className="input-label" htmlFor="card-number">{fieldLabels.numberLabel}</label>
            <input
              id="card-number"
              className="input-field"
              placeholder={fieldLabels.numberPlaceholder}
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
              inputMode="numeric"
              maxLength={['id', 'license', 'student'].includes(selectedCategory) ? 9 : undefined}
            />
          </div>
        )}

        {selectedCategory !== 'visit' && selectedCategory !== 'license' && (
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
        )}

        {selectedCategory === 'id' && (
          <div className="input-group">
            <label className="input-label" htmlFor="id-expiry">תוקף הכרטיס</label>
            <div className={styles.dateRow}>
              <input
                id="id-expiry"
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

        {selectedCategory === 'license' && (
          <div className="input-group">
            <label className="input-label" htmlFor="license-expiry">תאריך תוקף</label>
            <div className={styles.dateRow}>
              <input
                id="license-expiry"
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

        {selectedCategory === 'student' && (
          <div className="input-group">
            <label className="input-label" htmlFor="valid-year">תוקף (שנה)</label>
            <select
              id="valid-year"
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
