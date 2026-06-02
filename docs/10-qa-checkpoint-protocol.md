# 10. QA Checkpoint Protocol — Purven Bhavsar Personal Brand

*Living control doc. Run this gate at the end of EVERY phase. Phases compound — never enter the next on a broken foundation.*

---

## The per-phase gate
```
[ ] Renders on real mobile width (360px), not just narrow desktop
[ ] All links/buttons in this phase actually work (incl. nav + the Connect CTA + outbound social links)
[ ] Matches Design System (doc 04) — colours are TOKENS, spacing on the scale, no hardcoded hex
[ ] Matches PRD scope for this phase (doc 02/08) — nothing off the No-List crept in
[ ] Empty / loading / error states exist where relevant
    → specifically: Portfolio + Field Notes show their honest EMPTY-STATE when nothing is published yet
      (never invented content); category filters appear only when categories exist
[ ] RUNTIME-DEPENDENCY FALLBACK — the live surfaces (contact form; DB-driven Portfolio/Field-Notes; admin):
      • public lists use ISR (last-built version survives a slow/down DB); a cold read failure → calm
        empty/error state, NEVER an endless spinner; content visible if JS is slow/blocked
      • contact form: loading-with-timeout · success · failed (calm message + direct email/LinkedIn fallback)
      • detail pages: loading · not-found · failed states
[ ] MOTION uses only the named pieces (reveal, hero pop-in — doc 04); no ad-hoc inline animation;
      honors prefers-reduced-motion → with it on, the page is fully static and readable
[ ] No console errors
[ ] Committed to git on the phase branch
[ ] Context Anchor (CLAUDE.md) + Build Log (09) updated
```

## Launch-specific gate (in addition, at LAUNCH)
```
[ ] npm run build passes LOCALLY before push
[ ] Rendered <title> correct per page TYPE — "Purven Bhavsar" appears once, not doubled (check output, not template)
[ ] Privacy policy is real AND matches the analytics actually deployed (cookieless — doc 11)
[ ] Live smoke test on the DEPLOYED url: form saves + email arrives; LinkedIn/GitHub/email links open
    the REAL destinations; analytics receives events; walk it on a real phone at 360px
[ ] AA contrast verified in BOTH light and dark themes
[ ] Real portrait + resume PDF in place (or honest placeholder kept — no AI-faked person)
```

---

## Admin / authenticated-app gate *(PART 7 — runs on every phase that touches auth, admin, or private data)*
```
[ ] ► CROSS-USER / ADMIN DENIAL (non-negotiable): while LOGGED OUT, attempt to —
      (a) load any /admin page by direct URL            → redirected to /admin/login, never rendered
      (b) call any write/upload endpoint (POST/PUT/DELETE) by direct URL or API → DENIED
      (c) read a DRAFT project/note (guess the slug/id)  → not found / denied (drafts invisible)
      (d) read the `leads` table                          → denied (no public read)
    ALL must FAIL. Re-run at Phase 1, after Phase 3 (writes wired), and at Launch (on the deployed URL).
[ ] RLS is ENABLED on every table (deny by default); only the grants in doc 06 exist
[ ] Public sign-up is disabled; only the single admin can authenticate
[ ] Admin writes use the authenticated session / server actions — the anon key never has elevated rights
[ ] Admin pages are noindex and absent from public nav/sitemap
[ ] Editor never silently loses work: dirty/saving/saved/error states present; failed save shows a clear error
[ ] Published vs draft respected: drafts never render publicly; ISR revalidates on publish
[ ] Uploaded files (covers, resume) are validated (type/size) server-side
```

## Self-review trick (run before you review)
> "Review what you built this phase against `@docs/02-prd.md` and `@docs/04-design-system.md`. List every deviation, missing state (empty/loading/error), and convention mismatch. Don't fix — just list."

## Stuck-State Protocol (three strikes, then revert)
> **If a bug isn't fixed in ~3 tries, STOP. `git checkout` to the last good commit and re-approach in a fresh session with a re-thought prompt.** Each failed fix pollutes the context with wrong assumptions; a clean session often solves in one shot what a poisoned one couldn't in five. Per-phase commits make this safe. Log the spiral in the Build Log so the triggering prompt isn't repeated.
