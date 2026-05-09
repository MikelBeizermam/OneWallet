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

    // Average brightness of the border pixels → background
    let bgSum = 0, bgCount = 0
    for (let x = 0; x < W; x++) { bgSum += gray(x, 0) + gray(x, H - 1); bgCount += 2 }
    for (let y = 1; y < H - 1; y++) { bgSum += gray(0, y) + gray(W - 1, y); bgCount += 2 }
    const bgBrightness = bgSum / bgCount

    // Threshold: pixels that differ from background by this amount are "card"
    const THRESH = 18

    // Row and column average brightness
    const rowAvg = (y: number) => { let s = 0; for (let x = 0; x < W; x++) s += gray(x, y); return s / W }
    const colAvg = (x: number) => { let s = 0; for (let y = 0; y < H; y++) s += gray(x, y); return s / H }

    // Scan inward from each edge until a row/column differs from background
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

    // If detected region is unreasonably small or large, fall back
    if (detW < 25 || detH < 25 || detW > 97 || detH > 97) {
      return defaultCrop(img.width, img.height)
    }

    // Center a card-aspect crop on the detected region
    const cx = ((left + right) / 2 / W) * 100
    const cy = ((top + bottom) / 2 / H) * 100
    const cropW = Math.min(detW + 2, 98)
    const cropH = cropW / CARD_ASPECT

    const x = Math.max(0, cx - cropW / 2)
    const y = Math.max(0, cy - cropH / 2)

    // Validate final crop fits in bounds
    if (x + cropW > 100 || y + cropH > 100) return defaultCrop(img.width, img.height)

    return { unit: '%', x, y, width: cropW, height: cropH }
  } catch {
    return defaultCrop(img.width, img.height)
  }
}

export function CardCropper({ imageSrc, onCropDone, onCancel }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [busy, setBusy] = useState(false)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    setCrop(autoDetectCard(img))
  }, [])

  const handleDone = async () => {
    const image = imgRef.current
    if (!image || !completedCrop) return
    setBusy(true)

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const sx = Math.round(completedCrop.x * scaleX)
    const sy = Math.round(completedCrop.y * scaleY)
    const sw = Math.round(completedCrop.width * scaleX)
    const sh = Math.round(completedCrop.height * scaleY)

    // Primary: createImageBitmap with crop rect — handles HEIC on iOS
    try {
      const blob = await fetch(imageSrc).then(r => r.blob())
      const bitmap = await createImageBitmap(blob, sx, sy, sw, sh)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      canvas.getContext('2d')!.drawImage(bitmap, 0, 0)
      bitmap.close()
      await new Promise<void>((res, rej) =>
        canvas.toBlob(b => {
          if (!b) { rej(new Error('toBlob')); return }
          onCropDone(new File([b], 'card-cropped.jpg', { type: 'image/jpeg' }))
          res()
        }, 'image/jpeg', 0.92)
      )
      return
    } catch {}

    // Fallback: canvas drawImage (JPEG / PNG)
    const canvas = document.createElement('canvas')
    canvas.width = sw
    canvas.height = sh
    const ctx = canvas.getContext('2d')
    if (!ctx) { setBusy(false); return }
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh)
    canvas.toBlob(b => {
      setBusy(false)
      if (!b) return
      onCropDone(new File([b], 'card-cropped.jpg', { type: 'image/jpeg' }))
    }, 'image/jpeg', 0.92)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <p className={styles.hint}>התמונה זוהתה אוטומטית — גרור לכוונון מדויק</p>
        <div className={styles.cropArea}>
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={c => setCompletedCrop(c)}
            aspect={CARD_ASPECT}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="חתוך כרטיס"
              className={styles.img}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={busy}>ביטול</button>
          <button type="button" className={styles.doneBtn} onClick={handleDone} disabled={!completedCrop || busy}>
            {busy ? <span className="spinner" /> : '✓ חתוך ושמור'}
          </button>
        </div>
      </div>
    </div>
  )
}
