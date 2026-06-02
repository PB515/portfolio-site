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
```
*Phase 0 COMPLETE — live at https://portfolio-site-psi-ruddy.vercel.app. Next: Phase 1 (security foundation).*

### Phase 0 → Phase 1 resume note
Phase 0 is done end-to-end: the Next 16 / Tailwind v4 shell builds, all 03b routes exist (public + a noindex `/admin`), and it's deployed live on Vercel under the PB515 accounts (separate GitHub + Vercel from the machine default — pushes go through SSH alias `github-pb515`). Supabase project exists in Mumbai; its URL + anon key are public-safe, the service-role key is server-only in `.env.local` (and was rolled after it surfaced in-session). Open `AGENTS.md` first next session. Phase 1 is the security foundation and must come before any editor UI: install the Supabase client (ask first — dependency rail), wire email+password auth for the SINGLE admin, add the `/admin` middleware guard, enable RLS deny-by-default on every table per doc 06, and **prove the logged-out denial gate** (try to reach `/admin`, write endpoints, drafts, and `leads` while logged out — all must fail) before building anything else. The admin user is created by hand in the Supabase dashboard because public sign-up is disabled.

---

## Resume notes (written at each phase transition — a paragraph to future-you)

### Before Phase 0
The contradictions were resolved in the reconciliation doc (personal brand, not a services pitch — that's the one thing that must never drift back). Four gaps were decided with the client: **projects are all TBD placeholders** (do NOT invent case studies — honest "coming soon" cards only), **Field Notes launches as a designed empty-state**, the **primary CTA is Connect**, and the **Experience section is included on About but its content is TBD**. The only live/runtime feature on the whole site is the contact form — everything else is static, so there's very little that can fail for a visitor. Open `docs/03b` first (it needs sign-off before any images or code), then `CLAUDE.md`. When you write copy, keep checking it against the voice line in `docs/04`: plain, first-person, no hype — if it starts sounding like "I help businesses automate…", stop, that's the failure mode we explicitly fixed.

*(Add a fresh note here at each phase transition: why it was built this way, any hidden gotcha — e.g. "rate-limit logic lives in the API route, not the form component" — and which file to open first next time.)*
