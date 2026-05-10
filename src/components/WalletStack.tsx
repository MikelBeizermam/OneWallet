import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Card } from '@/types/database'
import { WalletCard } from './WalletCard'
import styles from './WalletStack.module.css'

const PEEK = 76      // px visible per card in normal stack
const CARD_H = 180   // card height
const BOTTOM_PEEK = 28  // px visible per card when slid to bottom

interface Props {
  cards: Card[]
}

export function WalletStack({ cards }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerH, setContainerH] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setContainerH(el.clientHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handlePress = (cardId: string) => {
    if (activeId === cardId) {
      navigate(`/cards/${cardId}`)
    } else {
      setActiveId(cardId)
    }
  }

  const getTranslateY = (index: number): number => {
    if (!activeId || containerH === 0) return 0
    const activeIndex = cards.findIndex(c => c.id === activeId)

    if (index === activeIndex) {
      // active card → move to very top
      return -(activeIndex * PEEK)
    }

    // all other cards → slide to bottom, preserving their relative order
    const others = cards.map((_, i) => i).filter(i => i !== activeIndex)
    const posInOthers = others.indexOf(index)
    const fromBottom = (others.length - 1) - posInOthers  // 0 = bottommost

    const targetTop = containerH - CARD_H - fromBottom * BOTTOM_PEEK
    const baseTop = index * PEEK
    return targetTop - baseTop
  }

  const normalHeight = cards.length > 0 ? PEEK * (cards.length - 1) + CARD_H : 0

  return (
    <div
      ref={containerRef}
      className={styles.stack}
      style={{ position: 'relative', flex: 1, minHeight: normalHeight }}
      onClick={() => setActiveId(null)}
    >
      {cards.map((card, index) => {
        const isActive = activeId === card.id
        const ty = getTranslateY(index)
        return (
          <div
            key={card.id}
            style={{
              position: 'absolute',
              top: index * PEEK,
              left: 0,
              right: 0,
              zIndex: isActive ? 50 : index + 1,
              transition: 'transform 0.42s cubic-bezier(0.34, 1.1, 0.64, 1)',
              transform: `translateY(${ty + (isActive ? -10 : 0)}px)`,
              ...(isActive ? { filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.3))' } : {}),
            }}
            onClick={e => e.stopPropagation()}
          >
            <WalletCard card={card} onPress={() => handlePress(card.id)} />
          </div>
        )
      })}
    </div>
  )
}
