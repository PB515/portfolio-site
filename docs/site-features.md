# Purven Bhavsar — Site Features Reference

A single place documenting **what** the site does, **why** each piece exists, and **how**
it's built. Pairs with `AGENTS.md` (status/context), `docs/01–11` (planning), and
`docs/decor-asset-spec.md` (the SVG decor system).

> One-line identity: *"I learn complex systems quickly — and turn them into practical,
> working solutions."* The site is a **personal brand** that is also an **authenticated
> app** (private admin CMS, Purven only).

---

## Table of contents
1. [Stack & architecture](#1-stack--architecture)
2. [Root & Canopy theme system](#2-root--canopy-theme-system)
3. [Design tokens & AA contrast](#3-design-tokens--aa-contrast)
4. [Public pages](#4-public-pages)
5. [Portraits (framed cut-outs)](#5-portraits-framed-cut-outs)
6. [SVG decor system](#6-svg-decor-system)
7. [Motion layer](#7-motion-layer)
8. [Logo & favicon](#8-logo--favicon)
9. [Authentication & security](#9-authentication--security)
10. [Database & RLS](#10-database--rls)
11. [Admin CMS](#11-admin-cms)
12. [Rich content: images, video, code](#12-rich-content-images-video-code)
13. [Contact form pipeline](#13-contact-form-pipeline)
14. [SEO & analytics](#14-seo--analytics)
15. [Performance / image optimization](#15-performance--image-optimization)
16. [Deployment](#16-deployment)
17. [Conventions & gotchas](#17-conventions--gotchas)
18. [Open / pending items](#18-open--pending-items)

---

## 1. Stack & architecture

**Why:** DB-backed content edited live (no redeploy to add a project), security-first
(it's an authed app), and a calm premium feel.

**How:**
- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4** (CSS-first: `@import
  "tailwindcss"` + `@theme inline` in `app/globals.css`, no `tailwind.config.js`).
- **Supabase** (Postgres + Auth email/password + Storage), **Mumbai** region.
- **Vercel** hosting; push to `main` → auto-deploy.
- Route groups: `app/(site)/*` = public pages (share `SiteHeader`/`SiteFooter`/`SideDecor`);
  `app/admin/*` = private CMS (own chrome, `noindex`); `app/api/*` = route handlers.
- **ISR** for public reads (`export const revalidate = 60`) + instant `revalidatePath`
  when the admin publishes.

---

## 2. Root & Canopy theme system

**Why:** A signature brand idea — not "dark/light" but two *perspectives*: **Root**
(the builder; deep olive, circuits/roots) and **Canopy** (the thinker; warm cream,
branches/leaves). Copper is the ~2% accent in both.

**How:**
- Tokens live in `app/globals.css` under `:root,[data-theme="root"]` (default) and
  `[data-theme="canopy"]`. Only **values** change per theme — never duplicate components.
- A "Perspective" toggle (`components/PerspectiveToggle.tsx`) sets `data-theme` on `<html>`
  and persists to `localStorage`; an inline script in `app/layout.tsx` applies it before
  paint (no flash). Root loads with zero JS.
- Theme-specific artwork (decor SVGs) is swapped via CSS: `.decor-root` shows in Root,
  `.decor-canopy` in Canopy (`[data-theme="canopy"]` flips `display`).

---

## 3. Design tokens & AA contrast

**Why:** One token set keeps both themes consistent; **no hardcoded hex in components**
(hex lives only in `globals.css`). Accessibility (WCAG AA) matters for a professional site.

**How:**
- Core tokens: `--background`, `--surface`, `--foreground`, `--muted`, `--border`,
  `--primary` (copper for links/accents), `--on-primary`, `--success/warning/error`.
- **AA fix — decoupled CTA copper:** links need a *light* copper to read on the dark olive
  bg (~4.6:1), but *white button text* needs a *darker* copper to read (≥4.5:1). One copper
  can't do both, so buttons use a separate **`--cta` / `--cta-hover`** token (deeper copper),
  while `--primary` stays light for links. Result: white CTA labels pass AA without hurting
  link contrast.
- **`--portrait-plate`** token: a dark backdrop behind the portrait art so copper circuits
  read in both themes (deep olive in Root, warm taupe in Canopy).

---

## 4. Public pages

All under `app/(site)/`. Content is honest — Projects/Field Notes launch empty and fill
live via admin; never fabricated.

- **Home** (`page.tsx`) — identity-first hero (headline + framed portrait), "Browse my work
  by area" category tiles (link to filtered Portfolio), story teaser → About, **Featured
  work** + **Featured field notes** (admin-flagged, hard cap 5), Connect band. Decor: hero
  frame + grounded lower flow + gutters.
- **About** — intro + portrait; **journey timeline** ("How I got here"), philosophy + values,
  **skills as one arc** (today AI/automation → future systems/infra), Education, Experience
  (TBD), résumé CTA. Decor: timeline accent.
- **Portfolio** (`/portfolio` + `/portfolio/[slug]`) — category chips + featured row (list);
  detail page renders Markdown body, cover, role/stack/outcome, a **"More work"** featured
  strip, and an enlarged Get-in-touch CTA.
- **Field Notes** (`/field-notes` + `/field-notes/[slug]`) — same pattern; detail has
  Article JSON-LD + a **"More field notes"** strip.
- **Contact** — framed photo + direct links + working contact form. Mobile order: photo →
  form → links (via CSS grid areas); desktop: photo+links left, form right.
- **Privacy** — plain-language policy (flagged for legal review).

---

## 5. Portraits (framed cut-outs)

**Why:** Real transparent cut-out photos framed in copper, with a branded backdrop, are the
one place a real image earns trust.

**How:** `components/Portrait.tsx` — a copper-bordered 4:5 frame with:
- a **`--portrait-plate`** dark backdrop (theme-aware) so the copper-on-black art shows;
- a CSS **glow/grid/rings** wash (`portrait-*` classes) for color depth;
- the user's **copper circuit art** (`/brand/portrait-*.png`) layered via
  `mix-blend-screen` (drops the black, copper glows) — served through `next/image`;
- the **cut-out photo** on top (`object-cover object-bottom` so the figure fills the frame
  and touches the border, trimming top headroom not the arm);
- a thin **inner copper frame** + warm copper glow shadow for richness.

---

## 6. SVG decor system

**Why:** Turn a clean-but-forgettable portfolio into an immersive branded world
("engineering intelligent systems that grow like nature") — subtle, edge-weighted, never
noisy. Full spec: `docs/decor-asset-spec.md`.

**How:**
- **18 assets** (9 slots × Root/Canopy) in `public/decor/{root,canopy}/*.svg`, generated as
  flat single-color (`#B87333`) transparent SVGs, then **inlined as React components** with
  colors bound to `currentColor` → recolored to the exact theme copper/sage via tokens.
- Theme swap via the `.decor-root` / `.decor-canopy` CSS rules. All faint (opacity 5–22%),
  behind content (`-z-10`), reduced-motion-safe.
- Components: `SideDecor` (fixed gutter vines, lg+ only, computed from content width so it
  only fills the true gutter), `HeroDecor`, `LowerDecor`, `FooterDecor` (global), `AboutDecor`,
  `ContactDecor`, `PortfolioDecor` + `FieldNotesDecor` (stretched corner frames with
  `vector-effect: non-scaling-stroke`), `AdminDecor`. Plus `Decor`/`Motif` helpers.

---

## 7. Motion layer

**Why:** Make the site feel alive without distraction. Fully gated behind
`prefers-reduced-motion` (anyone with that OS setting sees everything static).

**How:**
- **Scroll reveal** — `components/Reveal.tsx` (IntersectionObserver) adds `.is-visible`,
  driving a fade-up; supports staggered `delay`. Applied to hero (staggered), sections, and
  card lists across all pages.
- **Hover lift** — `.lift` raises cards 3px with a soft copper shadow.
- **Image zoom** — covers/portraits scale slightly on hover (clipped by the frame).
- CSS for all of the above lives in `globals.css` inside a
  `@media (prefers-reduced-motion: no-preference)` block.

---

## 8. Logo & favicon

**Why:** A recognizable brand mark (a copper circuit-tree = systems + growth) that works on
both themes.

**How:** `components/Logo.tsx` — a horizontal lockup: the copper tree mark
(`/brand/logo-mark.png`, copper-on-transparent so it reads on both themes) + the wordmark
"Purven Bhavsar." (token-colored) + tagline. Used in header and footer. Favicon =
`app/icon.png` (the same mark, resized to 96px).

---

## 9. Authentication & security

**Why:** It's an authed app — the failure mode is one unauthorized person reaching admin or
private data. Security is built first, deny-by-default.

**How:**
- **`proxy.ts`** (Next 16's renamed middleware) guards `/admin` — logged-out → `/admin/login`.
  Each admin page also re-checks `getUser()` (defense in depth).
- **Four Supabase clients** (`lib/supabase/*`): `server` (session via cookies, `@supabase/ssr`),
  `client` (browser), `public` (cookieless anon for ISR public reads), `admin` (service-role,
  **server-only** — used by the contact route + body-image upload).
- Single admin (Purven), email + password. Public sign-ups disabled.
- The **logged-out denial gate** (no /admin, no writes, no drafts, no leads) is verified at
  each phase: anon can't read leads, can't write, drafts hidden, published exposed.

---

## 10. Database & RLS

**Why:** Row-Level Security enforces who can read/write what — the real protection for
private data.

**How:** `db/migrations/0001_init.sql` (+ `0002`–`0004`):
- Tables: `projects`, `field_notes`, `categories`, `resume`, `leads`. Storage buckets:
  `covers` (public read, admin write) + `resume` (public read, admin write).
- **RLS deny-by-default.** Public (anon) can read only **published** projects/notes,
  categories, and the **current** resume. Admin (authenticated) gets full CRUD.
- `leads`: **no anon read/insert** (inserts go through the server route with service-role);
  admin may read (`0001`) and **delete** (`0004`).
- `is_featured` flags added in `0002` (projects) and `0003` (field_notes).
- Run migrations in the Supabase SQL Editor on **both** local and live projects.

---

## 11. Admin CMS

**Why:** Purven manages everything live, no deploy.

**How:** `app/admin/*` (auth-gated, noindex; top nav + bottom footer with the toggle):
- **Dashboard** (`/admin`) — live counts (projects/notes/categories/messages, published
  sub-counts), **featured usage** (x/5), **recent messages**, **resume status**, quick
  "+ New" actions.
- **Projects / Field Notes editors** — title, slug (always `slugify`-d → URL-safe), summary/
  excerpt, **Markdown body**, category, cover upload (`covers` bucket), draft/published,
  **"Feature" checkbox with a hard cap of 5** (enforced via a count query in the server action).
  Mutations `revalidatePath` the public pages for instant updates.
- **List pages** — title **search** + **category filter chips** + a **scroll container**
  (`max-h`) so they handle 30+ items; rows show category, ★ featured, and a status badge
  (`components/AdminItemList.tsx`).
- **Categories** — create/delete per kind (project / field_note), scrollable lists.
- **Resume** — upload a PDF → Storage → set `is_current`; the public résumé link resolves the
  current row automatically.
- **Messages** — contact inbox with **search**, **scroll**, and per-message **delete**
  (server action; needs the `leads` delete RLS from `0004`).

---

## 12. Rich content: images, video, code

**Why:** Project/blog bodies need images, a process video, and code blocks — the efficient
way, not a heavy editor.

**How:** Body is Markdown, rendered by `components/Markdown.tsx`
(`react-markdown` + `remark-gfm`):
- **Images** — an "Upload image" button in the editor (`MarkdownBodyField`) POSTs to
  `/api/admin/upload-image` (admin-only, 5 MB cap, Storage `covers/body/`) and **inserts
  `![alt](url)` at the cursor**. External URLs work too.
- **Video** — paste a **YouTube/Vimeo link on its own line**; the renderer parses the video
  ID (`lib/video.ts`) and embeds a responsive `<iframe>` (no raw HTML injected → XSS-safe).
- **Code** — fenced ` ```lang ` blocks render via `components/CodeBlock.tsx` (styled block +
  **copy button**) with **syntax highlighting** (`rehype-highlight`, themed to the palette via
  `.hljs-*` token CSS; runs server-side so near-zero client weight).
- **Live preview** — `MarkdownBodyField` has a **Write / Preview** toggle (preview uses the
  same `<Markdown>`), plus a collapsible **Formatting help** cheat-sheet.

---

## 13. Contact form pipeline

**Why:** Capture leads safely (PII) without exposing the inbox.

**How:** `components/ContactForm.tsx` → `POST /api/contact`:
- **Honeypot** field (`company`) + server-side validation.
- **DB rate-limit** (3 submissions / 10 min / IP, via a hashed `ip_hash`).
- Insert via the **service-role** client (`lib/supabase/admin.ts`) — anon can't write `leads`.
- Lands in `/admin/messages` (admin-only read). Email links work.

---

## 14. SEO & analytics

**Why:** Discoverable, shareable, measurable.

**How:** `Person` JSON-LD (home) + `Article` JSON-LD (notes) via `components/JsonLd.tsx`;
`app/sitemap.ts` (static + published slugs), `app/robots.ts` (disallow /admin),
`metadataBase` = live URL, OpenGraph/Twitter images. `@vercel/analytics` (cookieless;
needs enabling in the Vercel dashboard).

---

## 15. Performance / image optimization

**Why:** Big PNGs hurt load time.

**How:** Recompressed with **`sharp`** (Next's bundled image lib — no new dep): OG image
5 MB → 130 KB, favicon 946 KB → 7.4 KB, portraits/art/logo ~11 MB → ~1 MB. Public images go
through **`next/image`** (auto WebP/resize). Decor is SVG (KBs).

---

## 16. Deployment

**Why:** Simple, repeatable.

**How:** Local git identity (Purven), pushes via SSH alias `git@github-pb515`. **Deploy =
push to `main`** → Vercel auto-deploys to `portfolio-site-psi-ruddy.vercel.app` (the
production alias; per-deployment `…-<hash>-….vercel.app` URLs are frozen snapshots).
Workflow: `tsc --noEmit` → `npm run build` → commit → push.

---

## 17. Conventions & gotchas

- **Next 16:** middleware is `proxy.ts` (build fails if both `middleware.ts` + `proxy.ts`
  exist); dynamic route `params` / `searchParams` are **Promises** (await them); dynamic
  params are URL-encoded — detail pages `decodeURIComponent` the slug.
- **Tailwind v4:** CSS-first; no config file; arbitrary values use `_` for spaces (e.g.
  grid-template-areas).
- **Slugs** are always `slugify`-d (lowercase, hyphenated) — never raw spaces/caps.
- **Tokens only**, no hardcoded hex in components. **No new deps without asking.**
- **Secrets** in `.env.local` only (gitignored). Service-role key is server-only.
- "Resume" (no é accents) in UI text — but **never** rename the `resume` route/table/bucket.
- Turbopack can serve **stale CSS** after rapid edits → restart the dev server.

---

## 18. Open / pending items

- **Rotate the `sb_secret_` service-role key** (exposed in a setup session; now load-bearing
  in the contact route) → update `.env.local` + Vercel → redeploy.
- Ensure **`SUPABASE_SERVICE_ROLE_KEY`** is set in Vercel (contact + body-image upload need it).
- **Enable Vercel Web Analytics** in the dashboard.
- Run migrations **0002 / 0003 / 0004** on the **live** Supabase project (featured flags +
  message delete).
- A 360px responsive pass; optional live-preview niceties.
</content>
