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
          description: string
          files: string[]
          folder: string
          id: number
          medium: string[]
          subject: string[]
          thumbnail: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          files: string[]
          folder: string
          id?: number
          medium: string[]
          subject: string[]
          thumbnail: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          files?: string[]
          folder?: string
          id?: number
          medium?: string[]
          subject?: string[]
          thumbnail?: string
          title?: string
          user_id?: string
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
      artworks_bookmarks: {
        Row: {
          artwork_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          artwork_id: number
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          artwork_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artworks_bookmarks_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artworks_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      artworks_comments: {
        Row: {
          artwork_id: number
          created_at: string
          id: number
          title: string | null
          user_id: string
        }
        Insert: {
          artwork_id: number
          created_at?: string
          id?: number
          title?: string | null
          user_id: string
        }
        Update: {
          artwork_id?: number
          created_at?: string
          id?: number
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artworks_comments_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artworks_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      artworks_likes: {
        Row: {
          artwork_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          artwork_id: number
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          artwork_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "artworks_likes_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artworks_likes_user_id_fkey"
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
          city: string
          country: string
          cover: string | null
          created_at: string
          folder: string | null
          headline: string
          id: string
          name: string
          resume: Json | null
          site: string
          social: Json | null
          user_id: string
        }
        Insert: {
          avatar?: string | null
          city: string
          country: string
          cover?: string | null
          created_at?: string
          folder?: string | null
          headline: string
          id?: string
          name: string
          resume?: Json | null
          site?: string
          social?: Json | null
          user_id: string
        }
        Update: {
          avatar?: string | null
          city?: string
          country?: string
          cover?: string | null
          created_at?: string
          folder?: string | null
          headline?: string
          id?: string
          name?: string
          resume?: Json | null
          site?: string
          social?: Json | null
          user_id?: string
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
          email: string
          id: string
          metadata: Json
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          metadata: Json
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json
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
      users_followers: {
        Row: {
          created_at: string
          follower_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_followers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
