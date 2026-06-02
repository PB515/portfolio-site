# 06. Data Model & Security — Purven Bhavsar (Authenticated App)

*Frozen planning doc. The schema PLUS, for every table, who may read/write which rows — row-level security (RLS) specified, not assumed. **Deny by default; allow on purpose.** Backend: Supabase (Postgres + Auth + Storage), Mumbai region (DPDP).*

---

## Auth
- **Supabase Auth**, **email + password**, **single admin** (Purven). No public sign-up (disabled).
- Admin identity check: the authenticated user's id must match the one admin. Implemented as an `admins` allowlist table (one row) **or** a custom `is_admin` claim — RLS policies reference it. Deny everyone else.

## Tables

### `categories`
```
id          uuid PK
name        text   required
slug        text   required, unique within kind
kind        text   required — 'project' | 'field_note'   (a category belongs to ONE kind)
created_at  timestamptz default now()
```
Delete behavior: **ON DELETE SET NULL** on referencing items (clearing a category never deletes content — App PRD).

### `projects`
```
id            uuid PK
title         text   required
slug          text   required, unique
summary       text   required          — one-line for cards
body          text                      — rich-text/Markdown (see doc 05)
category_id   uuid   FK → categories(id) ON DELETE SET NULL  (nullable = "uncategorized")
cover_path    text                      — storage path in `covers` bucket (nullable)
role          text                      — Purven's role
stack         text[]                    — tech tags
outcome       text                      — result / metric (nullable)
external_url  text                      — live/GitHub link (nullable)
status        text   required           — 'draft' | 'published'   (default 'draft')
sort_order    int    default 0          — manual ordering
created_at    timestamptz default now()
updated_at    timestamptz
published_at  timestamptz               — set when first published
```

### `field_notes`
```
id            uuid PK
title         text   required
slug          text   required, unique
excerpt       text                      — short summary for index + OG
body          text   required           — rich-text/Markdown
category_id   uuid   FK → categories(id) ON DELETE SET NULL
cover_path    text                      — storage path in `covers` bucket (nullable)
status        text   required           — 'draft' | 'published'   (default 'draft')
created_at    timestamptz default now()
updated_at    timestamptz
published_at  timestamptz
```

### `resume`
```
id              uuid PK
file_path       text   required         — storage path in `resume` bucket
original_name   text
is_current      bool   required default true   — exactly ONE current row; site links to it
uploaded_at     timestamptz default now()
```
Upload flow: new upload → unset previous `is_current`, set new = true. Public resume link resolves the current row.

### `leads`  (contact form — unchanged, the public WRITE path)
```
id          uuid PK
name        text   required
email       text   required, validated server-side
message     text   required
source      text   required            — which page/CTA
consent_at  timestamptz                — set on PII consent
created_at  timestamptz default now()
ip_hash     text   SERVER-ONLY         — hashed IP, for rate limiting
honeypot    (NOT stored)               — filled → reject before insert
```

**Field marks:** PII = `leads.*` (name/email/message), `resume` (Purven's CV). Server-only = `leads.ip_hash`, all secrets, storage write keys.

## Storage buckets (Supabase Storage)
```
covers   — project + post cover images.   PUBLIC read.  Admin write only.
resume   — the CV PDF(s).                  PUBLIC read (meant to be downloaded). Admin write only.
```

## RLS — per table (deny by default)
| Table | Public (anon) | Admin (authenticated = Purven) |
|---|---|---|
| `categories` | **SELECT** all | full CRUD |
| `projects` | **SELECT WHERE status='published'** only (drafts invisible) | full CRUD |
| `field_notes` | **SELECT WHERE status='published'** only | full CRUD |
| `resume` | **SELECT WHERE is_current** (to resolve the link) | full CRUD |
| `leads` | **INSERT only**, via the server route (honeypot+validation+rate-limit); **no SELECT** | SELECT (read inbox); no public read ever |
| storage `covers` / `resume` | read (public buckets) | write/delete |

Every policy starts closed; the rows above are the *only* grants. Anything not listed = denied.

## What never leaves the server
Secrets / Supabase service-role key (admin writes go through authenticated session or a server route — never the anon key with elevated rights), `leads.ip_hash`, the full `leads` table, draft content.

---

## Consistency check (flows → schema)
Walking doc 01 for every `Data:` line:
- Public contact submit → `leads` ✅ (all fields housed; insert-only RLS)
- Public views portfolio/notes → `projects`/`field_notes` WHERE published ✅
- Public resume link → `resume` (current) ✅
- Admin CRUD projects/notes/categories → respective tables, admin-only RLS ✅
- Admin resume upload → `resume` + `resume` storage bucket ✅
- Admin cover upload → `covers` storage bucket, path on the item ✅

**Done when:** every "Data:" line from the flow map has a home **and** an explicit read/write rule; deny-by-default confirmed; the cross-user/admin denial test (doc 10) is specified before any admin feature ships.
