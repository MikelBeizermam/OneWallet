import { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import styles from './CardCropper.module.css'

interface Props {
  imageSrc: string   // blob URL — works for JPEG and HEIC on iOS
  onCropDone: (croppedFile: File) => void
  onCancel: () => void
}

function centerAspectCrop(width: number, height: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, 85.6 / 53.98, width, height),
    width,
    height
  )
}

export function CardCropper({ imageSrc, onCropDone, onCancel }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [busy, setBusy] = useState(false)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height))
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

    // Primary: createImageBitmap with crop rect — handles HEIC natively on iOS
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

    // Fallback: canvas drawImage (works for JPEG/PNG)
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
        <p className={styles.hint}>גרור את המסגרת כך שתכסה רק את הכרטיס</p>
        <div className={styles.cropArea}>
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={c => setCompletedCrop(c)}
            aspect={85.6 / 53.98}
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
