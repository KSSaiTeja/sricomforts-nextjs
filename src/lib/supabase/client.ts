import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/** Browser-safe client (anon key). Used for public storage reads. */
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}
