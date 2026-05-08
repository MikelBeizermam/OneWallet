import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { Card } from '@/types/database'

export function useCards() {
  const { user } = useAuth()
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
  }, [user])

  useEffect(() => { fetchCards() }, [fetchCards])

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

  return { cards, loading, error, refetch: fetchCards, deleteCard, reorderCards }
}
