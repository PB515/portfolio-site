import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY service-role client. Bypasses RLS — never import this into client
// components or anything that ships to the browser. Used only in trusted server
// routes (e.g. the contact route inserting into `leads`, which has no public insert).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
