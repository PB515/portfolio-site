# 09. Build Log — Purven Bhavsar Personal Brand

*Living control doc. One line per significant prompt and what it produced or broke. The BROKE/reverted lines are the gold — your map of the landmines. Add a human "resume note" at each phase transition.*

---

## Changelog
```
DATE        | PHASE | PROMPT SUMMARY                          | RESULT / NOTES                  | COMMIT
2026-06-02  | plan  | Generated docs 01–11 (incl 03b, 06b)    | Done                            | (pre-repo)
2026-06-02  | plan  | Authenticated-app conversion (PART 7)   | Added 02a; rewrote 06/05/08     | (pre-repo)
2026-06-02  | 0     | Scaffold Next 16 + Tailwind v4 + tokens | Build passes; routes shelled    | e285ed3
2026-06-02  | 0     | Enforce LF (.gitattributes)             | Done                            | 565de15
2026-06-02  | 0     | git identity (local) + SSH alias + push | Pushed to PB515/portfolio-site  | (pushed)
2026-06-02  | 0     | Supabase project (Mumbai) + .env.local  | Done (.env.example committed)   | 634fab9
2026-06-02  | 0     | Vercel import + deploy (PB515 acct)      | LIVE + verified placeholder     | (vercel)
2026-06-02  | 1     | Auth + proxy guard + schema/RLS         | Denial gate PROVEN (local)      | 597f223
2026-06-02  | 1     | Merge phase-1 → main; Vercel env added  | LIVE; denial gate holds live    | cd3bfc7
2026-06-02  | 2     | Root/Canopy theme (04a) + tokens        | Default Root; persisted toggle  | 0c91f84
2026-06-02  | 2     | Site shell + identity-first home        | header/nav/footer/(site) group  | 6109a5b
2026-06-02  | 2     | Theme-aware bg motif (circuit/leaves)   | one SVG, recolors per theme     | 16bc9e1
2026-06-02  | 2     | Merge phase-2 → main (partial)          | LIVE (shell+theme+home)         | 16bc9e1
```
2026-06-02  | 2     | About + Contact UI + empty-states       | Built (brief-grounded)          | fd0a2e9
2026-06-02  | 2     | Merge phase-2 → main (complete)         | LIVE — full public site         | fd0a2e9
```
*Phase 2 COMPLETE — full public site live (Home, About, Contact, Portfolio + Field-Notes empty-states), both perspectives, admin guarded. Interim SVG motif + logo (user may supply final SVGs to swap into SiteDecor/Logo).*

2026-06-03 | 3 | Admin shell + Categories CRUD | tested OK (add/delete) | d51f5e6
2026-06-03 | 3 | Projects + Field Notes + Resume editors | CRUD + cover/resume upload | d3d5a91
2026-06-03 | 3 | Raise server-action bodySizeLimit → 15mb | fixed upload >1MB error | 5d63b01
2026-06-03 | 3 | Styled file inputs + cover size hint | polish | 13094e2
*Phase 3 COMPLETE (admin CMS) — NOT yet deployed (kept local per request). Denial gate RE-VERIFIED on real data: anon sees only published projects/notes, drafts hidden, leads denied, resume resolves. Editors all tested working locally (incl. uploads). Build the editors on the proven Phase-1 RLS; admin CRUD uses the logged-in session.*

### Phase 3 → Phase 4 resume note
Admin CMS is done + secure (re-verified denial gate on live data). KEY GAP before this is useful publicly: **the public /portfolio and /field-notes still show empty-states — they don't READ the DB yet.** That's Phase 4: wire public pages to read PUBLISHED rows (ISR, revalidate on publish), render project/note detail by slug (Markdown body → needs a renderer dep — ASK), wire the About résumé link to the current resume, and wire the contact form for real (server route: honeypot + validation + rate-limit → leads + email; needs the service-role key, so ROTATE it first, and an email provider dep — ASK). Decision pending: deploy Phase 3 alone now, or build Phase 4 then deploy together (so published content actually shows live). Markdown rendering + email are the two dep approvals Phase 4 needs.

### Phase 2 → Phase 3 resume note
Public site is done and live. Phase 3 = the **admin CMS** (the reason this is an app): build the editors on the already-proven-secure foundation (auth + RLS + denial gate from Phase 1). Order: data-access helpers → Categories CRUD → Projects CRUD → Field Notes CRUD → Resume upload → cover-image upload (Supabase Storage) → **re-run the denial gate** after writes are wired. Admin CRUD uses the logged-in admin's SESSION (anon key + RLS `authenticated` policies) — the service-role key is only needed for the contact insert (Phase 4), so it's still not load-bearing here (but rotate it). Editor body starts as a **Markdown textarea** (zero deps); the rich-text WYSIWYG is a later enhancement needing a dep approval. Open `AGENTS.md` first.
*Phase 0 COMPLETE — live at https://portfolio-site-psi-ruddy.vercel.app.*
*Phase 1 (branch `phase-1`): security foundation built + denial gate proven (see note). Pending: confirm sign-ups disabled + positive login test, then merge to main.*

### Phase 1 denial-gate evidence (2026-06-02)
- **RLS (anon, via REST):** read `leads` → `[]` (hidden); insert `projects` → `42501` RLS violation (denied); read `projects` → `[]` (published-only). 
- **Proxy (logged-out, prod server):** `GET /admin` and `/admin/projects` → `307 → /admin/login`; `/admin/login` → 200.
- Next 16 gotcha: middleware is now **`proxy.ts`** (build errors if both `middleware.ts` + `proxy.ts` exist). Guard logic lives in `proxy.ts`; each `/admin` page ALSO re-checks `getUser()` (defense in depth). Real authorization is RLS — the proxy is an optimistic redirect only.
- NOTE: the `auth` lib (`lib/supabase/*`) uses the **anon** key; the service-role key isn't used yet (no server-write features until Phase 3) — so the un-rotated `sb_secret_` key isn't load-bearing yet, but still rotate it.

### Phase 0 → Phase 1 resume note
Phase 0 is done end-to-end: the Next 16 / Tailwind v4 shell builds, all 03b routes exist (public + a noindex `/admin`), and it's deployed live on Vercel under the PB515 accounts (separate GitHub + Vercel from the machine default — pushes go through SSH alias `github-pb515`). Supabase project exists in Mumbai; its URL + anon key are public-safe, the service-role key is server-only in `.env.local` (and was rolled after it surfaced in-session). Open `AGENTS.md` first next session. Phase 1 is the security foundation and must come before any editor UI: install the Supabase client (ask first — dependency rail), wire email+password auth for the SINGLE admin, add the `/admin` middleware guard, enable RLS deny-by-default on every table per doc 06, and **prove the logged-out denial gate** (try to reach `/admin`, write endpoints, drafts, and `leads` while logged out — all must fail) before building anything else. The admin user is created by hand in the Supabase dashboard because public sign-up is disabled.

---

## Resume notes (written at each phase transition — a paragraph to future-you)

### Before Phase 0
The contradictions were resolved in the reconciliation doc (personal brand, not a services pitch — that's the one thing that must never drift back). Four gaps were decided with the client: **projects are all TBD placeholders** (do NOT invent case studies — honest "coming soon" cards only), **Field Notes launches as a designed empty-state**, the **primary CTA is Connect**, and the **Experience section is included on About but its content is TBD**. The only live/runtime feature on the whole site is the contact form — everything else is static, so there's very little that can fail for a visitor. Open `docs/03b` first (it needs sign-off before any images or code), then `CLAUDE.md`. When you write copy, keep checking it against the voice line in `docs/04`: plain, first-person, no hype — if it starts sounding like "I help businesses automate…", stop, that's the failure mode we explicitly fixed.

*(Add a fresh note here at each phase transition: why it was built this way, any hidden gotcha — e.g. "rate-limit logic lives in the API route, not the form component" — and which file to open first next time.)*
