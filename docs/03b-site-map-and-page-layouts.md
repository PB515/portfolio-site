# 03b. Site Map & Page Layouts — Purven Bhavsar Personal Brand

> ⚠️ **THIS DOC NEEDS YOUR SIGN-OFF (Step 3b gate) BEFORE ANY IMAGES OR CODE.** The image plan (06b) is counted FROM this page list. Approve the structure, the page list, the nav behaviour, and each page's section order — then we proceed to images.

---

## Job 1 — Site Structure
**MULTI-PAGE, with a private admin area (authenticated app — PART 7).**
*Why:* the credibility-first journey (01) needs room — the About story is long-form, Portfolio and Field Notes are their own browsable sections, each with its own title/meta. **Public content is now DB-driven** (projects + field notes read from Supabase, managed via `/admin`), not hardcoded/MDX — that's what lets Purven update live without a deploy. Use **static generation + revalidation on publish (ISR)** for public pages so they stay fast and resilient (don't hard-depend on a live DB read at every request — doc 10). The `/admin/*` area is dynamic and auth-gated.

## Job 2 — Page / route list + nav behaviour
```
PUBLIC PAGES (the authoritative master list — 06b counts from this):
  /                      home
  /about                 about (story · philosophy · Experience [TBD] · skills arc · resume link)
  /portfolio             portfolio index — reads PUBLISHED projects from DB (empty-state until filled via admin)
  /portfolio/[slug]      project detail — one published project (0 at launch; added via admin)
  /field-notes           field notes index — reads PUBLISHED notes (designed EMPTY-STATE until filled via admin)
  /field-notes/[slug]    article — one published note (0 at launch; added via admin)
  /contact               contact page (form + connect links)
  /privacy               privacy policy (REAL — required, PII collected)
  [404]                  not-found page

ADMIN PAGES (auth-gated — Purven only; not in nav, not indexed):
  /admin                 dashboard (links to the four areas)
  /admin/login           email + password login
  /admin/projects        list + create; /admin/projects/[id] edit
  /admin/field-notes     list + create; /admin/field-notes/[id] edit (rich-text OR Markdown)
  /admin/categories      manage categories for both kinds (create / delete)
  /admin/resume          upload / replace the current resume PDF
```
```
NAV ITEMS (public nav — all navigate; admin NOT in public nav):
  About        → /about        (navigates)
  Portfolio    → /portfolio    (navigates)
  Field Notes  → /field-notes  (navigates)
  Contact      → /contact      (navigates)
  Connect [CTA button] → /contact   (navigates — primary CTA, visually distinct)
  Logo / name  → /             (navigates home)
```
No hybrid scroll-to-section nav items in v1. Footer repeats the nav + the three connect links (email, LinkedIn, GitHub). **`/admin` is reached by direct URL only** — never linked from the public site, `noindex`, and gated by auth middleware (logged-out → redirect to `/admin/login`).

## Job 3 — Section order per page
```
HOMEPAGE  (/)
  1. Hero              — identity statement headline + one-line skill arc + primary CTA (Connect) + secondary (View work)
  2. Trust strip       — skills-as-evidence chips (AI automation, n8n, SEO, web) + GitHub/LinkedIn links
  3. Story teaser      — 2-3 lines of the origin story → link to About
  4. Featured work     — 2-3 project cards (TBD variant at launch) → link to Portfolio
  5. Latest thinking   — Field Notes teaser (empty-state "Writing soon" at launch) → link to Field Notes
  6. Connect band      — primary CTA repeated
  7. Footer

ABOUT  (/about)
  1. Page hero         — one-line identity ("...learns complex systems quickly and turns them into practical, working solutions")
  2. Personal story    — CPUs/electronics → school labs → HTML teacher → first webpage → AI automation → MBA (from the brief, verbatim-grounded)
  3. Philosophy        — "I enjoy understanding how systems work..." (brief)
  4. Skills arc        — today (AI automation, n8n, SEO, WordPress, web) → future (systems, infrastructure, economic growth) — ONE arc, not a flat list
  5. Experience        — formal section [TBD content — decision B2: included now, roles to be supplied]
  6. Resume            — view/download PDF link
  7. Connect CTA · Footer

PORTFOLIO INDEX  (/portfolio)  — reads PUBLISHED projects from DB
  1. Page header       — "Projects, experiments, and learning"
  2. Category filter   — built from `categories` (kind=project); shown only when categories exist
  3. Project grid      — cards (cover image + title + summary + category) per published project
  4. EMPTY-STATE       — honest "Projects coming soon" when none published yet (launch state)
  5. Connect CTA · Footer

PROJECT DETAIL  (/portfolio/[slug])  — one published project from DB
  1. Title + summary  2. Role & date  3. Cover image  4. Body (rich-text/Markdown)
  5. Stack  6. Outcome / external link  7. Connect/footer
  (loading / not-found / failed states per doc 10)

FIELD NOTES INDEX  (/field-notes)  — reads PUBLISHED notes from DB
  1. Page header       — "Notes on what I'm learning and thinking about"
  2. Category filter   — from `categories` (kind=field_note); shown only when categories exist
  3. Note cards        — cover + title + excerpt + date per published note
  4. EMPTY-STATE       — honest "Writing soon" panel when none published yet (launch state, B3)
  5. Connect CTA · Footer

ARTICLE  (/field-notes/[slug])  — one published note from DB
  1. Title + date  2. Optional excerpt/TL;DR  3. Cover image  4. Body (H2/H3)  5. Conclusion  6. Connect/footer

ADMIN LAYOUTS  (auth-gated — Purven only)
  /admin/login         — email + password form (idle/submitting/error)
  /admin               — dashboard: cards linking to Projects, Field Notes, Categories, Resume; logout
  /admin/projects      — table of all projects (incl. drafts) + "New"; row → edit
  /admin/projects/[id] — editor: title, slug, summary, body (rich-text/Markdown toggle), category select,
                         cover upload, role, stack, outcome, external link, draft/published, save/delete
  /admin/field-notes   — table of all notes (incl. drafts) + "New"; row → edit
  /admin/field-notes/[id] — editor: title, slug, excerpt, body (rich-text/Markdown), category, cover,
                         draft/published, save/delete
  /admin/categories    — list by kind (project | field_note) + create form + delete (with confirm)
  /admin/resume        — current resume + upload-new (replaces current); shows filename + uploaded date

CONTACT  (/contact)
  1. Page header       — "Let's connect" + the one belief
  2. Contact form      — name, email, message + honeypot (idle/submitting/success/error)
  3. Direct connect    — email, LinkedIn, GitHub links
  4. Footer

PRIVACY  (/privacy)
  1. Real privacy policy — what's collected (contact form PII), why, retention, contact; MUST match deployed analytics (doc 11). [Flag: human/legal review.]

404
  1. Friendly not-found + link home + nav
```

---

**Kept distinct from the User Flow Map (01):** 01 predicts movement (journeys); 03b declares structure (pages that exist). This page list is the **authoritative** one and the source 06b counts from.

**Done when:** structure declared with a reason ✓ · every page listed ✓ · every nav item marked navigate ✓ · every page has its section order ✓ · **and you sign off before images/code.** ← awaiting your approval.
