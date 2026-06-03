import { createClient } from "@supabase/supabase-js";

// Cookieless anon client for PUBLIC reads (no session) — lets public pages be
// statically generated + revalidated (ISR) instead of dynamic. RLS still applies
// (anon role → only published rows / current résumé are visible).
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

// Resolve a Storage path (in a public bucket) to its public URL.
export function publicAsset(bucket: string, path: string | null): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/${bucket}/${path}` : null;
}
