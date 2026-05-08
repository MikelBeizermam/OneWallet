import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Card } from '@/types/database'
import { WalletCard } from './WalletCard'

const PEEK = 76   // px visible per card
const CARD_H = 180

interface Props {
  cards: Card[]
}

export function WalletStack({ cards }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const navigate = useNavigate()

  const handlePress = (cardId: string) => {
    if (activeId === cardId) {
      navigate(`/cards/${cardId}`)
    } else {
      setActiveId(cardId)
    }
  }

  const totalHeight = cards.length > 0
    ? PEEK * (cards.length - 1) + CARD_H
    : 0

  return (
    <div
      style={{ position: 'relative', height: totalHeight, marginBottom: 24 }}
      onClick={() => setActiveId(null)}
    >
      {cards.map((card, index) => {
        const isActive = activeId === card.id
        const top = index * PEEK
        return (
          <div
            key={card.id}
            style={{
              position: 'absolute',
              top,
              left: 0,
              right: 0,
              zIndex: isActive ? 50 : index + 1,
              transition: 'transform 0.35s cubic-bezier(0.34,1.25,0.64,1)',
              ...(isActive ? {
                transform: 'translateY(-18px) scale(1.02)',
                filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.32))',
              } : {}),
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
