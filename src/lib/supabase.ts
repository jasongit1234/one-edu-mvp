import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', !!supabaseAnonKey)
}

export const supabase = createClient(
  supabaseUrl || 'https://your-project-url.supabase.co',
  supabaseAnonKey || 'your-anon-key',
  {
    auth: {
      // Configure session storage
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce', // More secure auth flow
      debug: false // Explicitly disable debug mode
    }
  }
)

// Add session debugging helper
export const debugSession = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { data: { session }, error } = await supabase.auth.getSession()
    console.log('🔍 Session Debug:', { session, error })
    console.log('🔍 User:', session?.user)
    console.log('🔍 Access Token:', session?.access_token ? 'Present' : 'Missing')
    console.log('🔍 Refresh Token:', session?.refresh_token ? 'Present' : 'Missing')
  }
}

// Database types
export interface ChildProfile {
  id: string
  user_id: string
  name: string
  age: number
  interests: string
  avatar_emoji: string
  is_primary: boolean
  created_at?: string
  updated_at?: string
} 