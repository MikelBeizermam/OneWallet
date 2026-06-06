import type { CardCategory } from '@/types/database'
import buymeLogoUrl from '@/assets/gift-buyme.png'
import type { LucideIcon } from 'lucide-react'
import {
  CreditCard,
  Car,
  Target,
  Gift,
  GraduationCap,
  Contact,
  Layers,
} from 'lucide-react'

export interface CardTemplate {
  id: string
  name: string
  category: CardCategory
  bgColor: string
  textColor: string
  accentColor: string
  icon: LucideIcon
  bgImageUrl?: string
  hidden?: boolean
}

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'id_il',
    name: 'תעודת זהות ישראלית',
    category: 'id',
    bgColor: '#4A96B8',
    textColor: '#FFFFFF',
    accentColor: '#A8D8EF',
    icon: CreditCard,
  },
  {
    id: 'license_il',
    name: 'רישיון נהיגה',
    category: 'license',
    bgColor: '#8C7355',
    textColor: '#FAF8F5',
    accentColor: '#D4B896',
    icon: Car,
  },
  {
    id: 'loyalty',
    name: 'רישיון נשק',
    category: 'loyalty',
    bgColor: '#1C2526',
    textColor: '#FAF8F5',
    accentColor: '#6B7280',
    icon: Target,
  },
  {
    id: 'gift',
    name: 'כרטיס מתנה',
    category: 'gift',
    bgColor: '#7C3AED',
    textColor: '#FFFFFF',
    accentColor: '#DDD6FE',
    icon: Gift,
  },
  {
    id: 'gift-general',
    name: 'כרטיס מתנה כללי',
    category: 'gift',
    bgColor: '#080010',
    textColor: '#FFFFFF',
    accentColor: '#9333EA',
    icon: Gift,
    bgImageUrl: '/images/gift-general.svg',
    hidden: true,
  },
  {
    id: 'gift-buyme',
    name: 'BuyMe',
    category: 'gift',
    bgColor: '#F5A623',
    textColor: '#FFFFFF',
    accentColor: '#FDE68A',
    icon: Gift,
    bgImageUrl: buymeLogoUrl,
    hidden: true,
  },
  {
    id: 'gift-htz',
    name: 'HTZ Gift Card',
    category: 'gift',
    bgColor: '#1E1E22',
    textColor: '#FFFFFF',
    accentColor: '#00CDB8',
    icon: Gift,
    bgImageUrl: '/images/gift-htz.svg',
    hidden: true,
  },
  {
    id: 'gift-kaveret',
    name: 'כוורת צה"ל',
    category: 'gift',
    bgColor: '#F5C400',
    textColor: '#1A1A1A',
    accentColor: '#1A1A1A',
    icon: Gift,
    bgImageUrl: '/images/gift-kaveret.svg',
    hidden: true,
  },
  {
    id: 'student',
    name: 'כרטיס סטודנט',
    category: 'student',
    bgColor: '#1E3A8A',
    textColor: '#FFFFFF',
    accentColor: '#93C5FD',
    icon: GraduationCap,
  },
  {
    id: 'disability',
    name: 'תעודת נכה',
    category: 'disability',
    bgColor: '#DDD0F5',
    textColor: '#2D1B6B',
    accentColor: '#C8B8E8',
    icon: CreditCard,
  },
  {
    id: 'disability-card',
    name: 'תעודת נכה',
    category: 'disability',
    bgColor: '#DDD0F5',
    textColor: '#2D1B6B',
    accentColor: '#C8B8E8',
    icon: CreditCard,
    bgImageUrl: '/images/disability-card.jpg',
    hidden: true,
  },
  {
    id: 'disability-queue',
    name: 'פטור מתור',
    category: 'disability',
    bgColor: '#047857',
    textColor: '#FFFFFF',
    accentColor: '#A7F3D0',
    icon: CreditCard,
    bgImageUrl: '/images/disability-queue.webp',
    hidden: true,
  },
  {
    id: 'visit',
    name: 'כרטיס ביקור',
    category: 'visit',
    bgColor: '#FAF8F5',
    textColor: '#1A1208',
    accentColor: '#8C7355',
    icon: Contact,
  },
  {
    id: 'other',
    name: 'כרטיס כללי',
    category: 'other',
    bgColor: '#F0EBE3',
    textColor: '#1A1208',
    accentColor: '#8C7355',
    icon: Layers,
  },
]

export const CATEGORY_LABELS: Record<CardCategory, string> = {
  id: 'תעודות',
  license: 'רישיונות',
  loyalty: 'רישיון נשק',
  gift: 'גיפט קארד',
  student: 'סטודנט',
  disability: 'נכה',
  visit: 'ביקור',
  other: 'אחר',
}

export interface FieldLabels {
  numberLabel: string
  numberPlaceholder: string
  dateLabel: string
  datePlaceholder: string
}

export const FIELD_LABELS: Record<CardCategory, FieldLabels> = {
  id: {
    numberLabel: 'מספר ת.ז',
    numberPlaceholder: '000000000',
    dateLabel: 'תאריך הנפקת תעודה',
    datePlaceholder: 'DD/MM/YYYY',
  },
  license: {
    numberLabel: 'מספר תעודת זהות',
    numberPlaceholder: '000000000',
    dateLabel: 'תאריך הנפקה',
    datePlaceholder: 'DD/MM/YYYY',
  },
  loyalty: {
    numberLabel: 'מספר רישיון',
    numberPlaceholder: '000000000',
    dateLabel: 'תאריך תפוגה',
    datePlaceholder: 'DD/MM/YYYY',
  },
  gift: {
    numberLabel: 'קוד כרטיס',
    numberPlaceholder: 'XXXX-XXXX-XXXX',
    dateLabel: 'תאריך תפוגה',
    datePlaceholder: 'DD/MM/YYYY',
  },
  student: {
    numberLabel: 'מספר תעודת זהות',
    numberPlaceholder: '000000000',
    dateLabel: 'תאריך לידה',
    datePlaceholder: 'DD/MM/YYYY',
  },
  disability: {
    numberLabel: 'מספר תעודה',
    numberPlaceholder: '000000000',
    dateLabel: 'תאריך תפוגה',
    datePlaceholder: 'DD/MM/YYYY',
  },
  visit: {
    numberLabel: 'מספר',
    numberPlaceholder: '',
    dateLabel: 'תאריך',
    datePlaceholder: 'DD/MM/YYYY',
  },
  other: {
    numberLabel: 'מספר כרטיס',
    numberPlaceholder: '',
    dateLabel: 'תאריך תפוגה',
    datePlaceholder: 'DD/MM/YYYY',
  },
}

export function getTemplate(templateId: string | null, category: CardCategory): CardTemplate {
  return (
    CARD_TEMPLATES.find(t => t.id === templateId) ??
    CARD_TEMPLATES.find(t => t.category === category) ??
    CARD_TEMPLATES[CARD_TEMPLATES.length - 1]
  )
}
