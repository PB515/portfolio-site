-- Per-project detailed report (PDF). Stored in covers/reports/, public-read.
-- Run in the Supabase SQL Editor (local + live).
alter table public.projects
  add column if not exists report_path text;
