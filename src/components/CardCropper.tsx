import { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import styles from './CardCropper.module.css'

const CARD_ASPECT = 85.6 / 53.98  // standard card ratio

interface Props {
  imageSrc: string
  onCropDone: (croppedFile: File) => void
  onCancel: () => void
}

function defaultCrop(w: number, h: number): Crop {
  return centerCrop(makeAspectCrop({ unit: '%', width: 90 }, CARD_ASPECT, w, h), w, h)
}

// Scan image pixels to find where the card is vs the background
function autoDetectCard(img: HTMLImageElement): Crop {
  try {
    const W = 200
    const H = Math.round(W * img.naturalHeight / img.naturalWidth)
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) return defaultCrop(img.width, img.height)
    ctx.drawImage(img, 0, 0, W, H)
    const d = ctx.getImageData(0, 0, W, H).data

    const gray = (x: number, y: number) => {
      const i = (y * W + x) * 4
      return (d[i] * 77 + d[i + 1] * 150 + d[i + 2] * 29) >> 8
    }

    let bgSum = 0, bgCount = 0
    for (let x = 0; x < W; x++) { bgSum += gray(x, 0) + gray(x, H - 1); bgCount += 2 }
    for (let y = 1; y < H - 1; y++) { bgSum += gray(0, y) + gray(W - 1, y); bgCount += 2 }
    const bgBrightness = bgSum / bgCount

    const THRESH = 18
    const rowAvg = (y: number) => { let s = 0; for (let x = 0; x < W; x++) s += gray(x, y); return s / W }
    const colAvg = (x: number) => { let s = 0; for (let y = 0; y < H; y++) s += gray(x, y); return s / H }

    let top = 0, bottom = H, left = 0, right = W
    for (let y = 2; y < H / 2; y++) {
      if (Math.abs(rowAvg(y) - bgBrightness) > THRESH) { top = Math.max(0, y - 3); break }
    }
    for (let y = H - 3; y > H / 2; y--) {
      if (Math.abs(rowAvg(y) - bgBrightness) > THRESH) { bottom = Math.min(H, y + 3); break }
    }
    for (let x = 2; x < W / 2; x++) {
      if (Math.abs(colAvg(x) - bgBrightness) > THRESH) { left = Math.max(0, x - 3); break }
    }
    for (let x = W - 3; x > W / 2; x--) {
      if (Math.abs(colAvg(x) - bgBrightness) > THRESH) { right = Math.min(W, x + 3); break }
    }

    const detW = ((right - left) / W) * 100
    const detH = ((bottom - top) / H) * 100

    if (detW < 25 || detH < 25 || detW > 97 || detH > 97) {
      return defaultCrop(img.width, img.height)
    }

    const cx = ((left + right) / 2 / W) * 100
    const cy = ((top + bottom) / 2 / H) * 100
    const cropW = Math.min(detW + 2, 98)
    const cropH = cropW / CARD_ASPECT

    const x = Math.max(0, cx - cropW / 2)
    const y = Math.max(0, cy - cropH / 2)

    if (x + cropW > 100 || y + cropH > 100) return defaultCrop(img.width, img.height)

    return { unit: '%', x, y, width: cropW, height: cropH }
  } catch {
    return defaultCrop(img.width, img.height)
  }
}

export function CardCropper({ imageSrc, onCropDone, onCancel }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [currentSrc, setCurrentSrc] = useState(imageSrc)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [busy, setBusy] = useState(false)
  const [rotating, setRotating] = useState(false)
  const [tiltDeg, setTiltDeg] = useState(0)
  const [applying, setApplying] = useState(false)
  const blobUrls = useRef<string[]>([])

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    setCrop(autoDetectCard(img))
  }, [])

  const handleRotate = () => {
    const img = imgRef.current
    if (!img) return
    setRotating(true)

    const canvas = document.createElement('canvas')
    canvas.width = img.naturalHeight
    canvas.height = img.naturalWidth
    const ctx = canvas.getContext('2d')!
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(Math.PI / 2)
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)

    canvas.toBlob(blob => {
      setRotating(false)
      if (!blob) return
      const url = URL.createObjectURL(blob)
      blobUrls.current.push(url)
      setCurrentSrc(url)
      setCrop(undefined)
      setCompletedCrop(undefined)
    }, 'image/jpeg', 0.95)
  }

  const handleApplyTilt = () => {
    const img = imgRef.current
    if (!img || tiltDeg === 0) return
    setApplying(true)

    const rad = tiltDeg * Math.PI / 180
    const sin = Math.abs(Math.sin(rad))
    const cos = Math.abs(Math.cos(rad))
    const W = img.naturalWidth
    const H = img.naturalHeight
    const cw = Math.round(W * cos + H * sin)
    const ch = Math.round(W * sin + H * cos)

    const canvas = document.createElement('canvas')
    canvas.width = cw
    canvas.height = ch
    const ctx = canvas.getContext('2d')!
    ctx.translate(cw / 2, ch / 2)
    ctx.rotate(rad)
    ctx.drawImage(img, -W / 2, -H / 2)

    canvas.toBlob(blob => {
      setApplying(false)
      if (!blob) return
      const url = URL.createObjectURL(blob)
      blobUrls.current.push(url)
      setCurrentSrc(url)
      setTiltDeg(0)
      setCrop(undefined)
      setCompletedCrop(undefined)
    }, 'image/jpeg', 0.95)
  }

  const handleDone = () => {
    const image = imgRef.current
    if (!image || !completedCrop) return
    setBusy(true)

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const sx = Math.round(completedCrop.x * scaleX)
    const sy = Math.round(completedCrop.y * scaleY)
    const sw = Math.round(completedCrop.width * scaleX)
    const sh = Math.round(completedCrop.height * scaleY)

    const canvas = document.createElement('canvas')
    canvas.width = sw
    canvas.height = sh
    const ctx = canvas.getContext('2d')
    if (!ctx) { setBusy(false); return }
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh)
    canvas.toBlob(b => {
      setBusy(false)
      blobUrls.current.forEach(u => URL.revokeObjectURL(u))
      if (!b) return
      onCropDone(new File([b], 'card-cropped.jpg', { type: 'image/jpeg' }))
    }, 'image/jpeg', 0.92)
  }

  const handleCancel = () => {
    blobUrls.current.forEach(u => URL.revokeObjectURL(u))
    onCancel()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <div className={styles.topBar}>
          <p className={styles.hint}>גרור לכוונון מדויק</p>
          <button
            type="button"
            className={styles.rotateBtn}
            onClick={handleRotate}
            disabled={busy || rotating}
            aria-label="סובב תמונה 90°"
          >
            {rotating ? <span className={`spinner ${styles.spinnerSm}`} /> : <RotateIcon />}
            <span>סובב</span>
          </button>
        </div>
        <div className={styles.cropArea}>
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={c => setCompletedCrop(c)}
            keepSelection
          >
            <img
              ref={imgRef}
              src={currentSrc}
              alt="חתוך כרטיס"
              className={styles.img}
              style={{ '--tilt': `${tiltDeg}deg` } as React.CSSProperties}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
        <div className={styles.tiltRow}>
          <span className={styles.tiltLabel}>{tiltDeg > 0 ? '+' : ''}{tiltDeg.toFixed(1)}°</span>
          <input
            type="range"
            className={styles.tiltSlider}
            min={-20}
            max={20}
            step={0.5}
            value={tiltDeg}
            aria-label="יישור טיה"
            onChange={e => setTiltDeg(Number(e.target.value))}
          />
          <button
            type="button"
            className={styles.applyBtn}
            onClick={handleApplyTilt}
            disabled={tiltDeg === 0 || applying || busy}
          >
            {applying ? <span className={`spinner ${styles.spinnerSm}`} /> : 'החל'}
          </button>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel} disabled={busy}>ביטול</button>
          <button type="button" className={styles.doneBtn} onClick={handleDone} disabled={!completedCrop || busy}>
            {busy ? <span className="spinner" /> : '✓ חתוך ושמור'}
          </button>
        </div>
      </div>
    </div>
  )
}

function RotateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  )
}
