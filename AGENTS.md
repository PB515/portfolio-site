<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# PROJECT CONTEXT — read this first

*This is doc 07 (Context Anchor). `CLAUDE.md` imports this file via `@AGENTS.md`, so this is the single context source for the agent. Update the "Current status" block at the end of every session.*

## What this is
The personal-brand portfolio of **Purven Bhavsar** — a curious, plain-spoken builder whose differentiator is that he **learns complex systems quickly and turns them into practical, working solutions**. Today he builds practical AI/automation (n8n, SEO, web); heading toward systems, infrastructure & economic growth (MBA in Infrastructure Development, 2026). The public site lets mentors/professors/recruiters evaluate him and **connect**. **It is also an AUTHENTICATED APP**: a private, admin-only area (Purven only) where he manages Projects, Field Notes, Categories, and the Resume — DB-backed, edited live without a deploy. NOT a freelance-services storefront. Built with the Vibe Coding Toolkit (current Playbook version + PART 7 app extension).

## Current status
**Phase 0 COMPLETE.** Scaffold (Next 16 + Tailwind v4) · tokens in app/globals.css (light/dark + reduced-motion) · all 03b routes shelled (public + /admin noindex) + 404 · prod build passes · git LOCAL identity (Purven Bhavsar / bhavsarpurven515@gmail.com) · SSH alias `github-pb515` · repo PB515/portfolio-site · Supabase project created (Mumbai), keys in .env.local · **deployed live: https://portfolio-site-psi-ruddy.vercel.app** (auto-deploys on push to main).
**Phase 1 COMPLETE — merged to main + LIVE.** Security foundation: @supabase/ssr clients (lib/supabase/*), `proxy.ts` guards /admin (logged-out → /admin/login), email+password login + /admin dashboard, db/migrations/0001_init.sql (5 tables + storage buckets, RLS deny-by-default — already run in SQL Editor). 3 Supabase env vars added in Vercel. Denial gate PROVEN local AND live: anon can't read leads / can't write / drafts hidden; logged-out /admin → 307 /admin/login on https://portfolio-site-psi-ruddy.vercel.app.
PENDING (non-blocking): user to confirm the POSITIVE login (admin logs in → dashboard) on the live site — can't be automated. Sign-ups should be disabled in Supabase Auth (confirm).
**Phase 2 COMPLETE — full public site LIVE** (Mumbai edge): Root/Canopy theme (04a; default Root, persisted "Perspective" toggle, NOT dark/light), (site) route group w/ SiteHeader (interim tree logo) + SiteFooter + MobileNav, theme-aware SiteDecor (Root circuit / Canopy leaves — one SVG recolored via tokens), identity-first Home, About (real story/philosophy/skills-arc/education/Experience[TBD]/resume CTA), Contact (working links + ContactForm UI w/ honeypot, Phase-4 submit stub), styled Portfolio/Field-Notes empty-states. Components in `components/`. Interim logo/motif SVGs — user may supply finals to swap into Logo.tsx / SiteDecor.tsx (they recolor via var(--primary)=copper, var(--muted)=sage).
**Phase 3 COMPLETE — admin CMS (branch `phase-3`, NOT yet deployed, kept local per request).** Built + tested working: admin shell (bar+logout), Categories CRUD, Projects + Field Notes editors (new/edit/delete, Markdown body textarea, category select, cover upload, draft/published), Résumé upload (PDF→Storage→is_current). Uploads needed `serverActions.bodySizeLimit: 15mb` in next.config.ts (default 1MB blocked them). File inputs styled (copper pill) + cover size hint (~1200×630). Admin CRUD uses logged-in SESSION + RLS. **Denial gate RE-VERIFIED on real data** (drafts hidden, leads denied, published exposed, resume resolves).
**Phase 4 COMPLETE (branch `phase-4`).** Public pages now READ the DB: /portfolio + /field-notes (ISR, revalidate=60 + instant revalidatePath on admin publish), detail-by-slug w/ generateMetadata + notFound, Markdown render (react-markdown + remark-gfm, components/Markdown.tsx), cookieless public client (lib/supabase/public + publicAsset()). About résumé CTA → current resume PDF. **Contact form WIRED**: /api/contact (honeypot + server validation + DB rate-limit 3/10min/IP) → inserts via service-role (lib/supabase/admin, SERVER-ONLY) → /admin/messages inbox (admin-only). Verified end-to-end (honeypot/invalid drop, valid inserts, anon still can't read leads). Static asset folders created: public/{brand,og,ui,images}; map in ASSETS.md (user supplying logo/icons/decor/photos).
**Phase 5 NEXT — polish:** rework Home hero text→text+image (awaiting public/images/purven-hero.png), wire user-supplied SVG icons/decor/logo, AA contrast both themes, SEO (Person/Article schema, sitemap, metadataBase=live URL), analytics (cookieless), 360px pass, swap public <img> → next/image (config remotePatterns).
OPEN/IMPORTANT: **rotate sb_secret_ service-role key** — now LOAD-BEARING (contact route uses it in prod). Update .env.local + Vercel + redeploy when rotated.
Theme rule (04a): "Perspective" not dark/light; copper is the ~2% accent; never duplicate components per theme.
OPEN: rotate sb_secret_ key; set metadataBase to live URL (SEO/OG).
OPEN: rotate the sb_secret_ service-role key (surfaced in session; not load-bearing until Phase 3). Last commit on main: cd3bfc7. Tooling: Node 26.2 / npm 11.13 / git 2.54.
Next 16 gotchas: middleware is now `proxy.ts` (build fails if both exist); Tailwind v4 CSS-first tokens in app/globals.css; dynamic route params is a Promise.
NOTE: Next.js 16 + Tailwind v4 are NEW/BREAKING — Tailwind config is CSS-first (`@import "tailwindcss"` + `@theme inline` in globals.css, no tailwind.config.js); dynamic route `params` is a Promise (await it); read `node_modules/next/dist/docs/` before non-trivial route code.
Git: pushes use SSH alias `git@github-pb515:...` (a dedicated key, NOT the machine default account). Keep using it for this repo.

## Stack
Next.js (App Router) + TypeScript · Tailwind + CSS-variable tokens · **Supabase (Postgres + Auth email/password + Storage), Mumbai region** · **DB-backed content** (rich-text/Markdown), NOT MDX · ISR for public lists · transactional email (contact) · cookieless analytics · Vercel. (See `docs/05-tech-stack-architecture.md`.)

## Conventions
- Folders: `app/` routes · `components/` (small, modular) · `docs/` planning set · `public/images/...` by filename.
- **TOKENS ONLY — no hardcoded hex** anywhere after Phase 0.
- **No new dependencies, and no upgrades**, without asking (no `npm update`, no version bumps).
- **Secrets in `.env.local` only** — never in chat, never committed. `.env*` gitignored.
- Small components: if one's doing two jobs, split it.
- Changing a frozen doc = update the doc first, commit separately, then build.

## Decisions made (do not revisit)
- **Spine = personal brand**, not a services pitch. Skills are *evidence*, not the headline. (reconciliation A1)
- **Differentiator = the identity statement** ("learns complex systems quickly → practical, working solutions"). (A2)
- **Skills = one arc**: practical AI/automation today → systems & infrastructure at scale. (A3)
- **Primary CTA = Connect / Get in touch.** Secondary = View my work. (B4)
- **Projects + Field Notes launch EMPTY** (honest empty-states); Purven fills them **live via the admin panel** — never invent content. (B1/B3, via the CMS)
- **Experience section = included now** on About; content TBD. (B2)
- **Voice = curious, plain-spoken builder; first person, simple, no hype.** (B5)
- **No-List**: not a services storefront · not a tutorial blog · not a full CV · not a segment router · no public sign-ups/comments · no second admin role · no content scheduling/versioning (v1). (B6 / doc 02a)
- **IS an authenticated app** — Playbook PART 7 applies. **Single admin (Purven), email+password.** Security-first build order; **deny by default**; the **logged-out denial gate** (no /admin, no writes, no drafts, no leads) runs at Phase 1, after Phase 3, and at Launch (doc 08 + doc 10).
- Structure = **multi-page + private /admin** (see `docs/03b`). Analytics = **cookieless**, admin excluded (see `docs/11`).

## Where things live
- Design tokens → `app/globals.css` (CSS variables) · Tailwind config.
- Data model + RLS → `docs/06` (projects, field_notes, categories, resume, leads). App roles/surface → `docs/02a-app-prd.md`.
- Admin area → `app/admin/*` (auth-gated, noindex); write logic in server actions/routes; auth middleware redirects logged-out → `/admin/login`.
- Supabase keys → `.env.local` (yourself) + Vercel settings; anon key never elevated; service-role key server-only.
- Planning docs → `docs/01` … `docs/11` (+ `02a`). Authoritative page list → `docs/03b`. Brand/static assets → `docs/06b` + `public/images/`; uploaded covers/resume → Supabase Storage.
- Voice + design authority → `docs/04-design-system.md` + the Business Brief.
