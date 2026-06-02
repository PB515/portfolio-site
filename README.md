# Purven Bhavsar — Personal site + admin CMS

Personal-brand portfolio with a private, admin-only CMS (Projects, Field Notes, Categories, Resume) — edited live, no deploy. Built with the Vibe Coding Toolkit.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Supabase (Postgres + Auth + Storage, Mumbai) · Vercel.
- **Planning docs:** see [`/docs`](docs/) (01–11 + 02a). Agent context: `AGENTS.md` (imported by `CLAUDE.md`).
- **Authoritative page list:** `docs/03b`. Data model + RLS: `docs/06`. Build order (security-first): `docs/08`.

## Local development
```bash
npm install
npm run dev      # run in its OWN terminal (separate from the agent)
npm run build    # production build — run before every push
```

## Conventions
- Design **tokens only** — no hardcoded hex (tokens live in `app/globals.css`).
- **No new dependencies or upgrades** without an explicit decision.
- **Secrets in `.env.local` only** — never committed (`.env*` is gitignored).
- Single admin (email + password). Deny-by-default; the logged-out denial gate runs at Phase 1, after Phase 3, and at launch.
