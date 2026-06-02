# 05. Tech Stack + Architecture — Purven Bhavsar (Authenticated App)

*Frozen planning doc. Two layers: decisions-with-reasons, and a living architecture sketch. This is an authenticated app (admin CMS), so auth + DB-backed content + file storage are first-class.*

---

## (a) Decisions with reasons
```
Framework:   Next.js (App Router) + TypeScript — per-page SEO/meta, image optimization (next/image),
             server routes for secure writes, ISR for fast+resilient public pages; strict prod build
             catches type errors locally. Deploys per-branch on Vercel (pairs with the phase workflow).

Styling:     Tailwind CSS + CSS-variable design tokens (doc 04). Tokens enforce brand consistency
             mechanically; RULE: tokens only, NO hardcoded hex after Phase 0.

Backend:     SUPABASE — one provider for three roles:
               • Postgres  — projects, field_notes, categories, resume, leads (doc 06)
               • Auth      — email + password, SINGLE admin (public sign-up disabled)
               • Storage   — `covers` (project/post images) + `resume` (CV PDF), public-read buckets
             Because the site must be editable live without a deploy, content is DB-backed (a CMS),
             and one provider covering DB+Auth+Storage with row-level security is the least to wire
             and maintain. Region: MUMBAI (DPDP) — set at creation.

Content:     DB-backed (NOT MDX-in-repo) — that's what makes "edit without code" possible.
             Body field stores rich-text/Markdown; editor offers BOTH (WYSIWYG + Markdown mode).
             Render with a vetted renderer; sanitize HTML output (admin-authored, but sanitize anyway).

Editor:      A rich-text/Markdown editor component for the admin body fields (e.g. a Tiptap-class
             WYSIWYG with a Markdown toggle). [Exact library chosen at Step 5 — no dep added without asking.]

Email/forms: Transactional email provider (e.g. Resend) — notify Purven on contact-form submit;
             requires a verified sending domain before mail reaches anyone but himself.

Analytics:   Cookieless (Vercel Analytics / Plausible) — see doc 11. Admin pages are excluded from analytics.

Hosting:     Vercel — per-branch previews, env vars in settings, pairs with Next.js + Supabase.
```

## (b) Architecture sketch
```
                          ┌───────────────────────────────────────────────┐
   PUBLIC visitor ──▶      │  Next.js (App Router) on Vercel                │
                          │   • Marketing pages: Home, About, Contact,     │
                          │     Privacy, 404  (static)                     │
                          │   • Portfolio / Field Notes: ISR — built from  │
                          │     PUBLISHED rows, revalidated on publish      │
                          │   • Resume link → resolves current resume row   │
                          └───────┬───────────────────────────┬───────────┘
                                  │ read (published only,      │ POST /api/contact
                                  │  via anon key + RLS)        │ (honeypot+validate+rate-limit)
                                  ▼                             ▼
                          ┌───────────────────────────────────────────────┐
                          │  SUPABASE (Mumbai region)                       │
                          │   Postgres: projects · field_notes · categories │
                          │            · resume · leads   (RLS, doc 06)      │
                          │   Auth: email+password, single admin            │
                          │   Storage: covers/ (public) · resume/ (public)  │
                          └───────▲───────────────────────────▲───────────┘
                                  │ authenticated session       │ admin write/upload
   ADMIN (Purven) ──▶      ┌──────┴───────────────────────────┴───────────┐
   /admin/* (auth-gated)   │  Next.js admin area + server actions/routes    │
                          │   middleware: logged-out → /admin/login         │
                          │   CRUD projects/notes/categories · upload resume│
                          │   + covers (admin-only RLS / server-side write) │
                          └────────────────────────────────────────────────┘

   - - - - later phases (nothing thrown away) - - - -
   • editor role (second user)  • newsletter  • content scheduling/history   ← all No-List for now
```

**Runtime-dependency note (doc 10 enforces it):** more of the site is now dynamic. Mitigation: public Portfolio/Field-Notes pages use **ISR** (built from published rows, revalidated when Purven publishes) so a slow/down DB doesn't break a visitor's page — they get the last-built version; a true cold read failure shows a calm empty/error state, never an endless spinner. The contact form (live POST) and the whole `/admin` area are the genuinely live surfaces and need explicit loading/success/failed states.

**Region / compliance:** Supabase project in **Mumbai** (India / DPDP) — cheap to set at creation, expensive to move. Resume + leads are PII; privacy policy must match (doc 02 / `/privacy`).

---

**Done when:** every choice has a one-line "because"; you can trace a public read (anon → RLS → published rows → ISR page) and an admin write (session → server action → RLS → table/storage) end to end.
