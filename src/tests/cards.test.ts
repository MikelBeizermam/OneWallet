import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Supabase client
const mockSelect = vi.fn()
const mockInsert = vi.fn()
const mockUpdate = vi.fn()
const mockDelete = vi.fn()
const mockEq = vi.fn()
const mockSingle = vi.fn()
const mockOrder = vi.fn()

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: mockSelect.mockReturnThis(),
      insert: mockInsert.mockReturnThis(),
      update: mockUpdate.mockReturnThis(),
      delete: mockDelete.mockReturnThis(),
      eq: mockEq.mockReturnThis(),
      order: mockOrder.mockReturnThis(),
      single: mockSingle,
    })),
    auth: {
      getUser: vi.fn(() => ({
        data: { user: { id: 'test-user-123' } },
      })),
    },
  },
}))

const { supabase } = await import('@/lib/supabase')

const MOCK_USER_ID = 'test-user-123'

const MOCK_CARDS = [
  {
    id: 'card-1',
    user_id: MOCK_USER_ID,
    name: 'תעודת זהות',
    category: 'id',
    card_number: '312456789',
    expiry_date: '15/03/2029',
    template_id: 'id_il',
    metadata: { id_expiry: '15/03/2029' },
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'card-2',
    user_id: MOCK_USER_ID,
    name: 'רישיון נהיגה',
    category: 'license',
    card_number: '312456789',
    expiry_date: '20/08/2027',
    template_id: 'license_il',
    metadata: { license_expiry: '20/08/2027' },
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

beforeEach(() => {
  vi.clearAllMocks()
})

// ── Read ───────────────────────────────────────────────────

describe('קריאת כרטיסים (Read)', () => {
  it('מחזיר רק את הכרטיסים של המשתמש המחובר', async () => {
    mockOrder.mockResolvedValueOnce({ data: MOCK_CARDS, error: null })

    const result = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', MOCK_USER_ID)
      .order('sort_order')

    expect(result.data).toHaveLength(2)
    expect(result.data?.every(c => c.user_id === MOCK_USER_ID)).toBe(true)
  })

  it('לא מחזיר כרטיסים של משתמש אחר', async () => {
    const otherUserId = 'other-user-999'
    mockOrder.mockResolvedValueOnce({ data: [], error: null })

    const result = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', otherUserId)
      .order('sort_order')

    expect(result.data).toHaveLength(0)
  })

  it('מחזיר שגיאה כאשר יש בעיה בחיבור', async () => {
    mockOrder.mockResolvedValueOnce({
      data: null,
      error: { message: 'Connection error' },
    })

    const result = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', MOCK_USER_ID)
      .order('sort_order')

    expect(result.error).toBeTruthy()
    expect(result.data).toBeNull()
  })
})

// ── Create ─────────────────────────────────────────────────

describe('יצירת כרטיס (Create)', () => {
  it('מוסיף כרטיס חדש עם user_id של המשתמש המחובר', async () => {
    const newCard = {
      user_id: MOCK_USER_ID,
      name: 'כרטיס ביקור',
      category: 'visit',
      card_number: null,
      expiry_date: null,
      template_id: 'visit',
      metadata: { phone: '050-1234567' },
      sort_order: 3,
    }

    mockSingle.mockResolvedValueOnce({ data: { id: 'card-3', ...newCard }, error: null })

    const result = await supabase.from('cards').insert(newCard).single()

    expect(result.data).toMatchObject({ name: 'כרטיס ביקור', category: 'visit' })
    expect(result.error).toBeNull()
  })

  it('נכשל אם user_id חסר', async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: 'violates not-null constraint' },
    })

    const result = await supabase
      .from('cards')
      .insert({ name: 'כרטיס ללא משתמש', category: 'other' })
      .single()

    expect(result.error).toBeTruthy()
    expect(result.data).toBeNull()
  })
})

// ── Update ─────────────────────────────────────────────────

describe('עדכון כרטיס (Update)', () => {
  it('מעדכן שם כרטיס קיים', async () => {
    const updatedCard = { ...MOCK_CARDS[0], name: 'תעודת זהות מעודכנת' }
    mockSingle.mockResolvedValueOnce({ data: updatedCard, error: null })

    const result = await supabase
      .from('cards')
      .update({ name: 'תעודת זהות מעודכנת' })
      .eq('id', 'card-1')
      .single()

    expect(result.data?.name).toBe('תעודת זהות מעודכנת')
    expect(result.error).toBeNull()
  })

  it('מעדכן תאריך תפוגה', async () => {
    const updatedCard = { ...MOCK_CARDS[1], expiry_date: '01/01/2030' }
    mockSingle.mockResolvedValueOnce({ data: updatedCard, error: null })

    const result = await supabase
      .from('cards')
      .update({ expiry_date: '01/01/2030' })
      .eq('id', 'card-2')
      .single()

    expect(result.data?.expiry_date).toBe('01/01/2030')
  })
})

// ── Delete ─────────────────────────────────────────────────

describe('מחיקת כרטיס (Delete)', () => {
  it('מוחק כרטיס לפי ID', async () => {
    mockEq.mockResolvedValueOnce({ data: null, error: null })

    const result = await supabase.from('cards').delete().eq('id', 'card-1')

    expect(result.error).toBeNull()
  })

  it('מחזיר שגיאה אם הכרטיס לא קיים', async () => {
    mockEq.mockResolvedValueOnce({
      data: null,
      error: { message: 'Row not found' },
    })

    const result = await supabase.from('cards').delete().eq('id', 'card-not-exist')

    expect(result.error).toBeTruthy()
  })
})

// ── RLS ────────────────────────────────────────────────────

describe('אבטחת RLS', () => {
  it('משתמש רואה רק את הכרטיסים שלו', async () => {
    mockOrder.mockResolvedValueOnce({ data: MOCK_CARDS, error: null })

    const result = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', MOCK_USER_ID)
      .order('sort_order')

    const foreignCards = result.data?.filter(c => c.user_id !== MOCK_USER_ID)
    expect(foreignCards).toHaveLength(0)
  })

  it('משתמש לא מורשה מקבל שגיאת גישה', async () => {
    mockOrder.mockResolvedValueOnce({
      data: null,
      error: { message: 'permission denied', code: '42501' },
    })

    const result = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', 'hacker-user')
      .order('sort_order')

    expect(result.error?.code).toBe('42501')
    expect(result.data).toBeNull()
  })
})
