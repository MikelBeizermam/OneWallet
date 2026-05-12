import { useMemo, useState } from 'react'
import { useCards } from '@/contexts/CardsContext'
import type { Card } from '@/types/database'

const KEYS = {
  NOTIFY_EXPIRY: 'onewallet_notify_expiry',
  NOTIFY_GIFT: 'onewallet_notify_gift',
  GIFT_LAST_SHOWN: 'onewallet_gift_last_shown',
}

const EXPIRY_WARNING_DAYS = 30
const GIFT_REMINDER_INTERVAL_DAYS = 7

function parseCardDate(str: string | null | undefined): Date | null {
  if (!str) return null
  const parts = str.split('/')
  if (parts.length !== 3) return null
  const [dd, mm, yyyy] = parts
  const d = new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd))
  return isNaN(d.getTime()) ? null : d
}

function daysUntil(date: Date): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.ceil((date.getTime() - now.getTime()) / 86400000)
}

export interface ExpiringCard { card: Card; daysLeft: number }
export interface GiftReminder { card: Card; balance: number }
export interface NotificationPrefs { expiry: boolean; gift: boolean }

export function useNotifications() {
  const { cards } = useCards()

  const [prefs, setPrefs] = useState<NotificationPrefs>(() => ({
    expiry: localStorage.getItem(KEYS.NOTIFY_EXPIRY) !== 'false',
    gift: localStorage.getItem(KEYS.NOTIFY_GIFT) !== 'false',
  }))

  const setPref = (key: keyof NotificationPrefs, value: boolean) => {
    localStorage.setItem(key === 'expiry' ? KEYS.NOTIFY_EXPIRY : KEYS.NOTIFY_GIFT, String(value))
    setPrefs(p => ({ ...p, [key]: value }))
  }

  const expiringCards = useMemo((): ExpiringCard[] => {
    if (!prefs.expiry) return []
    return cards.flatMap(card => {
      const date = parseCardDate(card.expiry_date)
      if (!date) return []
      const days = daysUntil(date)
      if (days > 0 && days <= EXPIRY_WARNING_DAYS) return [{ card, daysLeft: days }]
      return []
    })
  }, [cards, prefs.expiry])

  const giftReminders = useMemo((): GiftReminder[] => {
    if (!prefs.gift) return []
    return cards.flatMap(card => {
      if (card.category !== 'gift') return []
      const balance = parseFloat((card.metadata as Record<string, string>)?.balance ?? '0') || 0
      if (balance > 0) return [{ card, balance }]
      return []
    })
  }, [cards, prefs.gift])

  const showGiftReminder = useMemo(() => {
    if (giftReminders.length === 0) return false
    const last = localStorage.getItem(KEYS.GIFT_LAST_SHOWN)
    if (!last) return true
    return (Date.now() - parseInt(last)) / 86400000 >= GIFT_REMINDER_INTERVAL_DAYS
  }, [giftReminders])

  const dismissGiftReminder = () => {
    localStorage.setItem(KEYS.GIFT_LAST_SHOWN, String(Date.now()))
  }

  return { expiringCards, giftReminders, showGiftReminder, prefs, setPref, dismissGiftReminder }
}
