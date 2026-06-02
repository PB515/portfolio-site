# 08. Build Roadmap — Purven Bhavsar (Authenticated App, security-first)

*Living control doc. Because this is an authenticated app (admin CMS), the order is **security-first**: auth → access rules → PROVE cross-user/admin denial → THEN the editors and public reads. Features-first is the trap. Branch per phase, merge when green.*

---

## PHASE 0 — Scaffold
```
Goal:        Repo + Next.js/TS + Tailwind + design TOKENS (CSS vars) + Supabase project (Mumbai) + empty routes.
Acceptance:  - `npm run build` passes locally; deploys a blank shell to Vercel
             - All doc-04 tokens exist as CSS variables; NO hardcoded hex
             - Empty routes for every PUBLIC + /admin page in 03b
             - Supabase project created (Mumbai); env keys in .env.local (yourself) + Vercel settings
Out of scope: real content, auth logic, the form, images
```

## PHASE 1 — Auth + access rules + PROVE denial *(security foundation — before any private data screens)*
```
Goal:        Login works; RLS enabled and DENY-BY-DEFAULT; prove a logged-out user is blocked.
Acceptance:  - Email+password login for the single admin; public sign-up DISABLED
             - /admin/* gated by middleware: logged-out → redirect to /admin/login
             - RLS ENABLED on every table per doc 06 (deny by default; only the listed grants)
             - ► DENIAL GATE (non-negotiable): logged OUT, attempt to (a) load /admin, (b) hit a write/upload
               endpoint by direct URL/API, (c) read drafts or `leads` → ALL must FAIL. Prove each. (doc 10)
             - Tables created (empty); storage buckets `covers` + `resume` created with public-read/admin-write
Out of scope: the editor UIs, public content rendering, polish
```

## PHASE 2 — Public marketing shell (static)
```
Goal:        Home + About + Contact (UI) + Privacy + 404, static, per 03b.
Acceptance:  - Home: hero leads with IDENTITY (not a services pitch); primary CTA Connect + secondary View work
             - About: story, philosophy, skills ARC, Experience [TBD content], resume link (resolves current resume)
             - Contact page form UI (idle only — not wired yet); Privacy draft [flag]; global 404/empty/error
             - 360px; nav desktop+mobile; tokens only; voice per doc 04 (plain, first-person, no hype)
Out of scope: admin editors, DB-driven lists, form backend
```

## PHASE 3 — Admin CMS (the editors) *(now safe — denial already proven)*
```
Goal:        Build the admin surface on the proven-secure foundation.
Acceptance:  - Projects: list/create/edit/delete · body (rich-text⇄Markdown) · category · cover upload ·
               role/stack/outcome/link · draft↔published · slug unique
             - Field Notes: list/create/edit/delete · body (rich-text⇄Markdown) · excerpt · category · cover ·
               draft↔published
             - Categories: create/delete per kind; delete sets items to uncategorized (no cascade delete)
             - Resume: upload replaces current; public link updates automatically
             - All admin writes go through authenticated session/server actions (never the anon key elevated)
             - ► Re-run the DENIAL GATE after wiring writes — still blocked for logged-out users
             - Editor states: dirty/saving/saved/error; delete-with-confirm; cover upload states (doc 03)
Out of scope: public rendering of the new content, analytics
```

## PHASE 4 — Public dynamic reads + contact form
```
Goal:        Surface published content publicly; wire the contact form.
Acceptance:  - /portfolio + /field-notes read PUBLISHED rows via ISR (revalidate on publish); honest EMPTY-STATE
               when none yet; category filters appear only when categories exist
             - /portfolio/[slug] + /field-notes/[slug] render a published item; not-found + failed states (doc 10)
             - DRAFTS never appear publicly (verify)
             - Contact form → `leads` + email notify; FORM SECURITY (honeypot + server validation + rate limit);
               failed submit → calm message + direct email/LinkedIn fallback (NO endless spinner)
Out of scope: polish, analytics dashboards
```

## PHASE 5 — Polish
```
Goal:        Responsive, real states, SEO, a11y, performance, analytics, theme toggle.
Acceptance:  - 360px everywhere; light/dark toggle persists; AA contrast BOTH themes
             - SEO: unique title/meta/OG per page; Person schema (Home/About), Article schema (published notes);
               sitemap from published slugs; clean URLs; admin pages noindex
             - Motion: named pieces only (reveal, hero pop-in); honors prefers-reduced-motion (doc 04/10)
             - Cookieless analytics wired with doc-11 events BEFORE launch; admin excluded
             - Lighthouse perf+a11y healthy; no console errors
Out of scope: anything on the No-List (doc 02 / 02a)
```

## LAUNCH — Go live
```
Acceptance:  - npm run build passes locally; env keys in host; Supabase prod ready (Mumbai)
             - Purven adds real projects + notes + categories + resume via admin (or honest empty-states kept)
             - Privacy policy real + matches deployed analytics (cookieless); rendered <title> correct per page
             - ► FINAL DENIAL GATE on the DEPLOYED url: logged-out cannot reach /admin, write endpoints,
               drafts, or leads
             - Live smoke test: log in + publish a test item → it appears publicly; contact form saves + email
               arrives; resume link serves the uploaded PDF; LinkedIn/GitHub/email links open; 360px on a phone
```

---
**Done when (per phase):** every acceptance line is *checked*. The **denial gate** runs at Phase 1, again after Phase 3 writes, and again at Launch — it is the difference between "works for me" and "safe for everyone."
