-- keepalive — free-tier anti-pause target.
-- The /api/health route calls this daily (.github/workflows/keepalive.yml) so a
-- real DB query resets Supabase's 7-day inactivity timer. Free projects pause
-- after 7 days idle → the site's DB calls fail until a manual restore.
-- Granted to anon so the logged-out health route can call it.
-- Run in the Supabase SQL Editor (local + live).
create or replace function public.keepalive()
returns timestamptz
language sql
stable
as $$ select now(); $$;

grant execute on function public.keepalive() to anon, authenticated;
