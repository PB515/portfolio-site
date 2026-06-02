-- =====================================================================
-- Purven portfolio — schema + RLS  (doc 06 / doc 02a)
-- Run in Supabase → SQL Editor → New query → Run. Safe to re-run.
-- DENY BY DEFAULT: RLS is ON for every table; only the policies below grant access.
-- "authenticated" == the single admin (public sign-up is DISABLED in Auth settings).
-- =====================================================================

-- ---------- tables ----------
create table if not exists public.categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text not null,
  kind       text not null check (kind in ('project','field_note')),
  created_at timestamptz not null default now(),
  unique (kind, slug)
);

create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  summary      text not null,
  body         text,
  category_id  uuid references public.categories(id) on delete set null,
  cover_path   text,
  role         text,
  stack        text[] not null default '{}',
  outcome      text,
  external_url text,
  status       text not null default 'draft' check (status in ('draft','published')),
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz,
  published_at timestamptz
);

create table if not exists public.field_notes (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  body         text not null,
  category_id  uuid references public.categories(id) on delete set null,
  cover_path   text,
  status       text not null default 'draft' check (status in ('draft','published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz,
  published_at timestamptz
);

create table if not exists public.resume (
  id            uuid primary key default gen_random_uuid(),
  file_path     text not null,
  original_name text,
  is_current    boolean not null default true,
  uploaded_at   timestamptz not null default now()
);

create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  source     text not null,
  consent_at timestamptz,
  created_at timestamptz not null default now(),
  ip_hash    text                       -- server-only; set by the contact route
);

-- ---------- enable RLS (deny by default) ----------
alter table public.categories  enable row level security;
alter table public.projects    enable row level security;
alter table public.field_notes enable row level security;
alter table public.resume      enable row level security;
alter table public.leads       enable row level security;

-- ---------- categories: public read all · admin full ----------
drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read" on public.categories
  for select to anon using (true);
drop policy if exists "categories_admin_all" on public.categories;
create policy "categories_admin_all" on public.categories
  for all to authenticated using (true) with check (true);

-- ---------- projects: public read PUBLISHED only · admin full ----------
drop policy if exists "projects_public_read_published" on public.projects;
create policy "projects_public_read_published" on public.projects
  for select to anon using (status = 'published');
drop policy if exists "projects_admin_all" on public.projects;
create policy "projects_admin_all" on public.projects
  for all to authenticated using (true) with check (true);

-- ---------- field_notes: public read PUBLISHED only · admin full ----------
drop policy if exists "field_notes_public_read_published" on public.field_notes;
create policy "field_notes_public_read_published" on public.field_notes
  for select to anon using (status = 'published');
drop policy if exists "field_notes_admin_all" on public.field_notes;
create policy "field_notes_admin_all" on public.field_notes
  for all to authenticated using (true) with check (true);

-- ---------- resume: public read CURRENT only · admin full ----------
drop policy if exists "resume_public_read_current" on public.resume;
create policy "resume_public_read_current" on public.resume
  for select to anon using (is_current = true);
drop policy if exists "resume_admin_all" on public.resume;
create policy "resume_admin_all" on public.resume
  for all to authenticated using (true) with check (true);

-- ---------- leads: NO anon access (inserts go through the server route w/ service role) ----------
--           admin may read the inbox. No public read, no public insert.
drop policy if exists "leads_admin_read" on public.leads;
create policy "leads_admin_read" on public.leads
  for select to authenticated using (true);

-- ---------- storage buckets: covers + resume (public read, admin write) ----------
insert into storage.buckets (id, name, public)
values ('covers','covers', true), ('resume','resume', true)
on conflict (id) do nothing;

drop policy if exists "covers_public_read" on storage.objects;
create policy "covers_public_read" on storage.objects
  for select to anon using (bucket_id = 'covers');
drop policy if exists "covers_admin_write" on storage.objects;
create policy "covers_admin_write" on storage.objects
  for all to authenticated using (bucket_id = 'covers') with check (bucket_id = 'covers');

drop policy if exists "resume_public_read" on storage.objects;
create policy "resume_public_read" on storage.objects
  for select to anon using (bucket_id = 'resume');
drop policy if exists "resume_admin_write" on storage.objects;
create policy "resume_admin_write" on storage.objects
  for all to authenticated using (bucket_id = 'resume') with check (bucket_id = 'resume');
