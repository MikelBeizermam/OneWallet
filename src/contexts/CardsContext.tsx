import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { Card } from '@/types/database'

interface CardsContextValue {
  cards: Card[]
  loading: boolean
  error: string | null
  plan: 'free' | 'pro'
  refetch: () => Promise<void>
  deleteCard: (id: string) => Promise<unknown>
  reorderCards: (orderedIds: string[]) => Promise<void>
  addCard: (card: Card) => void
  updateCard: (card: Card) => void
}

const CardsContext = createContext<CardsContextValue | null>(null)

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [plan, setPlan] = useState<'free' | 'pro'>('free')
  const fetchedForUser = useRef<string | null>(null)

  const fetchCards = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    else setCards(data ?? [])
    setLoading(false)
    fetchedForUser.current = user.id
  }, [user])

  useEffect(() => {
    if (!user) {
      setCards([])
      setLoading(false)
      setPlan('free')
      fetchedForUser.current = null
      return
    }
    if (fetchedForUser.current !== user.id) {
      fetchCards()
      supabase.from('profiles').select('plan').eq('id', user.id).single()
        .then(({ data }) => { if (data) setPlan(data.plan ?? 'free') })
    }
  }, [user, fetchCards])

  const deleteCard = async (id: string) => {
    const { error } = await supabase.from('cards').delete().eq('id', id)
    if (!error) setCards(prev => prev.filter(c => c.id !== id))
    return error
  }

  const reorderCards = async (orderedIds: string[]) => {
    setCards(prev => {
      const map = new Map(prev.map(c => [c.id, c]))
      return orderedIds.map((id, i) => ({ ...map.get(id)!, sort_order: i }))
    })
    await Promise.all(
      orderedIds.map((id, i) =>
        supabase.from('cards').update({ sort_order: i }).eq('id', id)
      )
    )
  }

  const addCard = (card: Card) => {
    setCards(prev => [card, ...prev])
  }

  const updateCard = (card: Card) => {
    setCards(prev => prev.map(c => c.id === card.id ? card : c))
  }

  return (
    <CardsContext.Provider value={{ cards, loading, error, plan, refetch: fetchCards, deleteCard, reorderCards, addCard, updateCard }}>
      {children}
    </CardsContext.Provider>
  )
}

export function useCards() {
  const ctx = useContext(CardsContext)
  if (!ctx) throw new Error('useCards must be used inside CardsProvider')
  return ctx
}
