-- Phase 5: allow the authenticated admin to delete contact messages (inbox cleanup).
-- Run in the Supabase SQL Editor (local project AND the live project).
drop policy if exists "leads_admin_delete" on public.leads;
create policy "leads_admin_delete" on public.leads
  for delete to authenticated using (true);
