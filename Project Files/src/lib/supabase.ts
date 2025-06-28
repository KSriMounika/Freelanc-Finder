
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/integrations/supabase/types'

const supabaseUrl = "https://jbgcahnhfuirdjadicjy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZ2NhaG5oZnVpcmRqYWRpY2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODQ0ODMsImV4cCI6MjA2NjA2MDQ4M30.CYqRXHa90EYOd-khnJX5oBhdDnO0jvJh1qZTgwBkoro"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
})
