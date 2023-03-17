export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      account: {
        Row: {
          account_created: boolean
          account_key: string | null
          created_at: string
          degen: boolean | null
          email: string | null
          id: string | null
          nickname: string | null
          rent: number | null
          stripe_id: string | null
          user_id: string
        }
        Insert: {
          account_created?: boolean
          account_key?: string | null
          created_at?: string
          degen?: boolean | null
          email?: string | null
          id?: string | null
          nickname?: string | null
          rent?: number | null
          stripe_id?: string | null
          user_id: string
        }
        Update: {
          account_created?: boolean
          account_key?: string | null
          created_at?: string
          degen?: boolean | null
          email?: string | null
          id?: string | null
          nickname?: string | null
          rent?: number | null
          stripe_id?: string | null
          user_id?: string
        }
      }
      address_book: {
        Row: {
          address: string | null
          created_at: string | null
          id: number
          name: string | null
          number: number
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          number?: number
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          number?: number
          user_id?: string
        }
      }
      task: {
        Row: {
          amount: number
          created_at: string
          cron: boolean
          name: string | null
          recipient: string
          rent: number
          schedule: string
          task_group: string | null
          task_key: string
          thread_key: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          cron: boolean
          name?: string | null
          recipient: string
          rent: number
          schedule: string
          task_group?: string | null
          task_key: string
          thread_key: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          cron?: boolean
          name?: string | null
          recipient?: string
          rent?: number
          schedule?: string
          task_group?: string | null
          task_key?: string
          thread_key?: string
          user_id?: string
        }
      }
      task_group: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
