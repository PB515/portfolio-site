# 11. Analytics & Events — Purven Bhavsar Personal Brand

*Living control doc. Makes measurement a first-class spec. Decide events HERE (early) so components are built with the hooks in place; wire them in Phase 5; instrument BEFORE launch (you can't measure a launch retroactively).*

---

## ANALYTICS TOOL — the choice
**Cookieless (Vercel Analytics or Plausible).**
*Why:* this is a personal brand with a simple privacy story and an India-based owner (DPDP). Cookieless means **no consent banner**, a clean privacy posture, and it counts everyone. The trade-off (shallow — counts + pageviews, little slicing) is fine here: the funnel is tiny (visit → connect), so deep GA4-style segmentation isn't worth the cookie banner + cross-border data + consent-gating complexity. **No GA4 at launch.** If deep acquisition analysis is ever wanted later, add GA4 *consent-gated* and update the privacy policy to match — but that's a deliberate later decision, not v1.

*Launch gate (doc 10):* the privacy policy MUST describe the cookieless tool actually deployed (what's collected, that there are no tracking cookies, where data goes).

## URL STRUCTURE (canonical — don't let the agent improvise slugs)
```
/                     home
/about                about
/portfolio            portfolio index
/portfolio/[slug]     project detail (0 at launch; slug from the project's `slug` field)
/field-notes          field notes index
/field-notes/[slug]   article (0 at launch; slug from the note's `slug` field)
/contact              contact
/privacy              privacy policy
/admin/*              admin — NOINDEX, excluded from analytics + sitemap
```
Clean, readable, stable. Slugs come from the DB `slug` field (admin sets/edits, unique, human-readable, e.g. `/field-notes/learning-n8n`). Sitemap is generated from **published** slugs.

## META PER PAGE (required on every page)
- Unique `<title>` + meta description + Open Graph (title, description, `og/og-default.png`).
- Rendered `<title>` shows "Purven Bhavsar" once, not doubled (launch gate, doc 10).

## STRUCTURED DATA
- **Person** schema on Home/About (real details: name, the identity line, GitHub `PB515`, LinkedIn).
- **Article** schema rendered automatically on each **published** Field Note (from its DB fields: title, date, excerpt, cover). None at launch; appears as Purven publishes.
- **CreativeWork** (optional) on published project detail pages.
- Never fabricate fields; omit what isn't real. Admin pages carry no schema and are noindex.

## KEY EVENTS TO TRACK (the funnel — the few moments that prove the site works)
The funnel is short: **visit → connect.** Named events:
```
- connect_started      — visitor focuses/opens the contact form OR clicks a direct connect link
- lead_submitted       — contact form submitted successfully (the conversion moment)
- outbound_click       — click on LinkedIn / GitHub / email (a valid "connect" outcome for this brand)
- resume_view          — resume PDF opened/downloaded (recruiter signal)
- portfolio_view       — Portfolio index reached (secondary-CTA engagement; useful once real projects exist)
```
*(These map to the Conversion Strategy in doc 02: primary = Connect → `connect_started`/`lead_submitted`/`outbound_click`; secondary = View work → `portfolio_view`.)*

---

**Why events beat pageviews:** pageviews tell you traffic; events tell you whether the *connect* funnel works — e.g. lots of `portfolio_view` but no `lead_submitted`/`outbound_click` means people look but don't reach out, which no traffic number reveals.

**Done when:** every conversion moment (Connect) has a named event, and every page has a title/description/schema plan. **Wire in Phase 5, before launch.**
