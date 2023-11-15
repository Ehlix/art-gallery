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
      artworks: {
        Row: {
          created_at: string
          description: string | null
          files: string[] | null
          folder: string | null
          id: number
          medium: string[] | null
          subject: string[] | null
          thumbnail: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          files?: string[] | null
          folder?: string | null
          id?: number
          medium?: string[] | null
          subject?: string[] | null
          thumbnail?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          files?: string[] | null
          folder?: string | null
          id?: number
          medium?: string[] | null
          subject?: string[] | null
          thumbnail?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artworks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          city: string | null
          country: string | null
          cover: string | null
          created_at: string
          folder: string | null
          headline: string | null
          id: string
          name: string | null
          resume: Json | null
          social: Json | null
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          city?: string | null
          country?: string | null
          cover?: string | null
          created_at?: string
          folder?: string | null
          headline?: string | null
          id?: string
          name?: string | null
          resume?: Json | null
          social?: Json | null
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          city?: string | null
          country?: string | null
          cover?: string | null
          created_at?: string
          folder?: string | null
          headline?: string | null
          id?: string
          name?: string | null
          resume?: Json | null
          social?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          metadata?: Json | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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