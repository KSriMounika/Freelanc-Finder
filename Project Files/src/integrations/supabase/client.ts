// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jbgcahnhfuirdjadicjy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZ2NhaG5oZnVpcmRqYWRpY2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODQ0ODMsImV4cCI6MjA2NjA2MDQ4M30.CYqRXHa90EYOd-khnJX5oBhdDnO0jvJh1qZTgwBkoro";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);