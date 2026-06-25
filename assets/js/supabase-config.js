// Supabase Configuration
// ⚠️  Replace SUPABASE_ANON_KEY below with your actual anon/public key.
// Find it in: Supabase Dashboard → Project Settings → API → Project API keys → anon/public
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL      = 'https://kggdcbufrghocmcrdsiq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_RVEUvVbV3mqiB7vufXlMfA_bslizDwA';   // ← paste your anon key here

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Also expose globally for non-module pages / inline scripts
if (typeof window !== 'undefined') {
    window.supabase = supabase;
}
