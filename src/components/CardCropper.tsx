import { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import styles from './CardCropper.module.css'

interface Props {
  imageSrc: string
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

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height))
  }, [])

  const handleDone = async () => {
    const image = imgRef.current
    if (!image || !completedCrop) return

    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = completedCrop.width * scaleX
    canvas.height = completedCrop.height * scaleY

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0, 0,
      canvas.width,
      canvas.height
    )

    canvas.toBlob(blob => {
      if (!blob) return
      const file = new File([blob], 'card-cropped.jpg', { type: 'image/jpeg' })
      onCropDone(file)
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
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>ביטול</button>
          <button type="button" className={styles.doneBtn} onClick={handleDone} disabled={!completedCrop}>
            ✓ חתוך ושמור
          </button>
        </div>
      </div>
    </div>
  )
}
