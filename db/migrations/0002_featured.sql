-- Phase 5: add a "feature on home" flag to projects. Run in Supabase SQL Editor.
alter table public.projects
  add column if not exists is_featured boolean not null default false;
