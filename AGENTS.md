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
NEXT: **Phase 1 — security foundation**: install @supabase/supabase-js + @supabase/ssr (ASK before adding) → email+password auth (single admin) → /admin middleware guard → RLS deny-by-default on every table → **PROVE logged-out denial gate** (no /admin, no writes, no drafts, no leads). Admin user created in Supabase dashboard (sign-up disabled).
OPEN: rotate the sb_secret_ service-role key (was surfaced in session). Last commit: 634fab9. Tooling: Node 26.2 / npm 11.13 / git 2.54.
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
