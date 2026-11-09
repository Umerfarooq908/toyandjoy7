import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl =
  typeof rawUrl === 'string'
    ? rawUrl.trim().replace(/^['"]|['"]$/g, '').trim()
    : '';

const supabaseAnonKey =
  typeof rawKey === 'string'
    ? rawKey.trim().replace(/^['"]|['"]$/g, '')
    : '';

const hasValidSupabaseUrl = (() => {
  try {
    const parsed = new URL(supabaseUrl);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
})();

export const isSupabaseConfigured = Boolean(
  hasValidSupabaseUrl && supabaseAnonKey
);

export const supabase = createClient(
  hasValidSupabaseUrl
    ? supabaseUrl
    : 'https://supabase-not-configured.invalid',
  supabaseAnonKey || 'supabase-not-configured'
);
