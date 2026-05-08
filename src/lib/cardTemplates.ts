import type { CardCategory } from '@/types/database'

export interface CardTemplate {
  id: string
  name: string
  category: CardCategory
  bgColor: string
  textColor: string
  accentColor: string
  icon: string
}

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'id_il',
    name: 'תעודת זהות ישראלית',
    category: 'id',
    bgColor: '#D4B896',
    textColor: '#1A1208',
    accentColor: '#8C7355',
    icon: '🪪',
  },
  {
    id: 'license_il',
    name: 'רישיון נהיגה',
    category: 'license',
    bgColor: '#8C7355',
    textColor: '#FAF8F5',
    accentColor: '#D4B896',
    icon: '🚗',
  },
  {
    id: 'loyalty',
    name: 'כרטיס נאמנות',
    category: 'loyalty',
    bgColor: '#1A1208',
    textColor: '#FAF8F5',
    accentColor: '#D4B896',
    icon: '⭐',
  },
  {
    id: 'credit',
    name: 'כרטיס אשראי',
    category: 'credit',
    bgColor: '#2C2C2E',
    textColor: '#FFFFFF',
    accentColor: '#D4B896',
    icon: '💳',
  },
  {
    id: 'visit',
    name: 'כרטיס ביקור',
    category: 'visit',
    bgColor: '#FAF8F5',
    textColor: '#1A1208',
    accentColor: '#8C7355',
    icon: '📇',
  },
  {
    id: 'other',
    name: 'כרטיס כללי',
    category: 'other',
    bgColor: '#F0EBE3',
    textColor: '#1A1208',
    accentColor: '#8C7355',
    icon: '🗂️',
  },
]

export const CATEGORY_LABELS: Record<CardCategory, string> = {
  id: 'תעודות',
  license: 'רישיונות',
  loyalty: 'נאמנות',
  credit: 'אשראי',
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
    numberLabel: 'מספר רישיון',
    numberPlaceholder: '00000000',
    dateLabel: 'תאריך הנפקה',
    datePlaceholder: 'DD/MM/YYYY',
  },
  loyalty: {
    numberLabel: 'מספר חבר',
    numberPlaceholder: '0000-0000-0000',
    dateLabel: 'תאריך תפוגה',
    datePlaceholder: 'DD/MM/YYYY',
  },
  credit: {
    numberLabel: 'מספר כרטיס',
    numberPlaceholder: '0000-0000-0000-0000',
    dateLabel: 'תאריך תפוגה',
    datePlaceholder: 'MM/YY',
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
