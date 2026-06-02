# 06b. Image & Asset Plan — Purven Bhavsar Personal Brand

*Frozen planning doc. Built FROM 03b's page list, counted by INSTANCE (one row per FILE), each row with type/depth/source/alt. Trust slots are real, never AI-faked-as-real.*

> **Counted from 03b.** Two sources now: **(1) fixed brand/static assets** (committed to `/public`, planned here) and **(2) admin-uploaded content covers** (project + post covers, and the resume PDF — uploaded live via the admin CMS into Supabase Storage, NOT pre-generated here). Because Portfolio + Field Notes launch empty and fill live, the launch static set is intentionally **small and honest** — no decorative bloat, no placeholder photos pretending to be real work.

---

## Asset table (instance-level — one row per FILE)
```
FILE (folder/name)                TYPE          DEPTH    SOURCE            STATUS   ALT TEXT
brand/logo.svg                    vector logo   unique   commissioned/own  needed   "Purven Bhavsar"
brand/favicon.ico (+ sizes)       icon          unique   from logo         needed   n/a
og/og-default.png                 concept       shared   AI/made OK        needed   (OG card — name + identity line; no fake people)
about/purven-portrait.jpg         REAL photo    unique   OWN (real photo)  TBD      "Purven Bhavsar" — TRUST SLOT: must be a real photo of Purven, never AI
home/hero (text-led — NO image by default)       —       —                 n/a      (hero is typographic per doc 04; add a subtle real/abstract image only if it earns its place)
ui/social-icons (GitHub, LinkedIn, email)        icon set n/a   icon library have   (decorative; aria-labels on the links)
ui/service-skill chips                            icons   n/a    icon set    have     (skills-as-evidence on trust strip)
resume (Supabase `resume` bucket)                 document unique OWN/admin  upload   n/a  (uploaded via /admin/resume; replaces current)
covers/<project-slug> (Supabase `covers` bucket)  real/illus   per-item admin/own upload   per-item (uploaded in the project editor; 0 at launch)
covers/<note-slug>    (Supabase `covers` bucket)  real/illus   per-item admin/own upload   per-item (uploaded in the note editor; 0 at launch)
```
*Content covers + the resume are **admin-uploaded at runtime** (not generated in Step 4). Validate type/size server-side; serve via `next/image` from the public Storage URL; provide alt text (project/note title) automatically + an editable alt field.*

## Per-page image-depth decisions
| Page | Decision | Why |
|---|---|---|
| Home | **text-led hero, no hero photo** (+ icons for trust strip) | Plain-spoken voice (04); a strong typographic hero fits better than stock |
| About | **1 REAL portrait** (trust slot) + resume PDF | A genuine photo builds trust; the one place a real image earns its weight |
| Portfolio | **admin-uploaded cover per project** (0 at launch) | Covers come with real projects, added live via admin — no faked shots |
| Field Notes | **admin-uploaded cover per post** (0 at launch) | Empty-state is typographic; covers arrive with real posts via admin |
| Case-study / Article templates | **0 instances at launch** | Scaffolds only; images added with real content |
| Contact / Privacy / 404 | **none** | Text does the job |

## Hard rules (carry into the image phase)
- **Real beats stock, always — and never AI-fake a real person.** The About portrait must be a genuine photo of Purven. Empty space beats a fake image. (No team/testimonial photos exist on this site — there is no team.)
- **No random web images** (copyright liability). Own or properly-licensed only.
- **Compress before adding** (Squoosh/TinyPNG); serve via `next/image`.
- **Concept slots OK for AI** (OG card, abstract art) — but no AI-generated humans presented as real.
- **Logo:** vector/commissioned, not AI raster.
- **The image-prompt generator (Step 4) emits one prompt per FILE, filename-labeled** — only the OG/concept slots and (optionally) an abstract hero motif are AI-generated; the portrait and resume are real assets Purven supplies.

---

**Done when:** every fixed/static image FILE implied by 03b has a row (instance-level) with type/depth/source/alt — ✓ and nothing decorative survived the "does it do a job?" test; content covers + resume are handled by the admin upload path (Supabase Storage), not pre-generated. **Assets to supply:** the real **portrait** (Step 4, static) and the **logo/favicon/OG** (Step 4); the **resume PDF** + **project/post covers** are uploaded by Purven via the admin CMS (no AI-faked people anywhere).
