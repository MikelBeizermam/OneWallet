export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          plan: 'free' | 'pro'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'pro'
          updated_at?: string
        }
        Relationships: []
      }
      cards: {
        Row: {
          id: string
          user_id: string
          name: string
          category: CardCategory
          card_number: string | null
          expiry_date: string | null
          image_url: string | null
          template_id: string | null
          metadata: Json
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: CardCategory
          card_number?: string | null
          expiry_date?: string | null
          image_url?: string | null
          template_id?: string | null
          metadata?: Json
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          category?: CardCategory
          card_number?: string | null
          expiry_date?: string | null
          image_url?: string | null
          template_id?: string | null
          metadata?: Json
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      card_category: CardCategory
      user_plan: 'free' | 'pro'
    }
  }
}

export type CardCategory = 'id' | 'license' | 'loyalty' | 'gift' | 'visit' | 'other' | 'student' | 'disability' | 'medical'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Card = Database['public']['Tables']['cards']['Row']
