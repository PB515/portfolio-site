-- Phase 5: add a "feature" flag to field_notes. Run in Supabase SQL Editor.
alter table public.field_notes
  add column if not exists is_featured boolean not null default false;
