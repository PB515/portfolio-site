-- Phase 5: single admin-uploaded site images (e.g. the home "story" photo).
-- Keyed by a slug; files live in the existing public `covers` bucket under site/.
-- Run in the Supabase SQL Editor (local + live).
create table if not exists public.site_images (
  key        text primary key,
  file_path  text not null,
  alt        text,
  updated_at timestamptz not null default now()
);

alter table public.site_images enable row level security;

-- Public read (these are public marketing images).
drop policy if exists "site_images_public_read" on public.site_images;
create policy "site_images_public_read" on public.site_images
  for select to anon using (true);

-- Admin full control.
drop policy if exists "site_images_admin_all" on public.site_images;
create policy "site_images_admin_all" on public.site_images
  for all to authenticated using (true) with check (true);
