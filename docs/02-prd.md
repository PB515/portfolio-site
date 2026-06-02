# 02. PRD — Purven Bhavsar Personal Brand

*Frozen planning doc. Personal-brand variant: the competitor table becomes an **Inspirations** table and the Killer Feature becomes the **Positioning Differentiator**. Conversion Strategy, Form Security, No-List, and a success metric still apply.*

---

## GOAL (one sentence)
Establish Purven Bhavsar as a credible, curious systems-builder — someone who learns complex systems quickly and turns them into practical, working solutions — so that mentors, professors, and recruiters can evaluate him and choose to connect.

## POSITIONING DIFFERENTIATOR *(replaces "killer feature")*
> **"Learns complex systems quickly and turns them into practical, working solutions."**

This is the defensible space (reconciliation A2). It is *more specific and more honest* than the research's vague "bridging AI automation and systems thinking" — and it unifies the two skill identities into one arc (A3): hands-on AI/automation/SEO **today**, heading toward systems, infrastructure & economic growth **at scale** (the MBA trajectory). The whole site serves this one claim: the story proves it happened before (CPUs → HTML → AI automation → MBA), the projects prove it in the present, the field notes prove the thinking is live.

## INSPIRATIONS TABLE *(directional only — from the research; not competitors)*
| Source | What to borrow | What to avoid |
|---|---|---|
| **Paul Graham** (paulgraham.com) | Plain first-person voice; "ordinary words, simple sentences" | Visual plainness to the point of looking unfinished |
| **Lee Robinson** (leerob.io) | Clear one-line identity + mission up top | Over-indexing on dev-only framing |
| **Brittany Chiang** (brittanychiang.com) | Hero with a crisp tagline + clean project list | Heavy interactivity for its own sake |
| **Packy McCormick** (Not Boring) | Warm, narrative writing for Field Notes | Newsletter-y length on a portfolio homepage |
| **Benedict Evans** (ben-evans.com) | Systems framing — "step back from the noise" | Buzzword-y "big picture" with no substance |
| **Stripe / Linear** | Premium consistency, restraint, trust via clarity | Corporate B2B tone (wrong for a person) |

*Research design tokens, hero copy, and "Root/Canopy" theme names are DIRECTIONAL input only. Doc 04 + the Business Brief are authoritative on the final design system, and contrast is verified at launch. Never carry the research's `【】` citation markers into site copy.*

---

## CONVERSION STRATEGY
- **Primary CTA:** **Connect / Get in touch** — the single most important action (contact form on `/contact`, plus a persistent nav + footer link). Email and LinkedIn are equivalent connect paths. *(Decision B4.)*
- **Secondary CTA:** **View my work** (→ Portfolio) for evaluators who want evidence before reaching out.
- **The one belief a visitor must hold before acting:** *"This person can learn something hard and make it actually work — and is worth knowing / mentoring / hiring."*
- **Top objections + how the page answers each:**
  1. *"Is he just another 'I automate your business' freelancer?"* → Hero leads with **identity**, not a services pitch; About tells a genuine origin story; skills are framed as evidence, not an offer.
  2. *"Does he have real proof, or just claims?"* → Portfolio (real projects, honest about being early-stage), GitHub link, the specific story. **No invented case studies** — honest TBD slots beat fake proof.
  3. *"Is this person early-career — why engage now?"* → The MBA-in-Infrastructure trajectory frames him as on a clear, ambitious arc; "early but serious" is the asset, not a liability.

---

> **This is an authenticated app.** It includes a private, admin-only CMS (Purven manages Projects, Field Notes, Categories, Resume — live, no deploy). See **`02a-app-prd.md`** for roles + the security model, doc 06 for the data model + RLS, doc 08 for the security-first build order. The conversion strategy + form security below still apply to the public site.

## V1 FEATURES (phased — maps to the security-first Build Roadmap, doc 08)
- **Phase 0:** scaffold + Supabase project (Mumbai region).
- **Phase 1 (security foundation):** auth (email+password, single admin) + RLS deny-by-default + **prove logged-out denial**.
- **Phase 2:** public marketing shell — Home (hero + arc + trust strip + featured), About (story + philosophy + Experience section [TBD] + skills arc + resume link), Contact (UI), Privacy.
- **Phase 3:** admin CMS — Projects / Field Notes editors (rich-text⇄Markdown + cover upload), Categories (create/delete per kind), Resume upload.
- **Phase 4:** public dynamic reads (Portfolio + Field Notes via ISR; empty-states until filled) + contact form → `leads` + email.
- **Phase 5:** Polish — responsive, real states, SEO, a11y, analytics, theme toggle.

## NO-LIST (explicitly NOT in v1) *(B6 + reconciliation + 02a)*
- **NOT** a freelance/services storefront or pricing page (this is a brand, not a shop).
- **NOT** a tutorial/how-to blog (Field Notes = thinking & learning logs, not tutorials).
- **NOT** a comprehensive CV/ATS export or job board.
- **NOT** a homepage segment router (audiences converge — see 01).
- **NOT** invented projects, testimonials, metrics, or employers — Portfolio/Field-Notes launch **empty** and are filled live via the admin CMS (never fabricated).
- **NOT** a multi-user app — **single admin only**; no public sign-ups, comments, or second editor role; no content scheduling/versioning at v1 (doc 02a).

## FORM SECURITY *(public contact form + admin auth)*
- **Contact form:** **honeypot** + **server-side validation** of every field + **rate limiting** (per IP/window).
- **Admin login:** rate-limit login attempts; no public sign-up; sessions via Supabase Auth; admin writes never use an elevated anon key. The logged-out **denial gate** (doc 10) is the controlling check.
See doc 03 (Component Inventory), doc 06 (schema + RLS), doc 02a (App PRD).

## SUCCESS METRIC (v1)
A real number to measure against: **contact-form submissions + outbound LinkedIn/GitHub clicks per month** (the "connect" conversion), tracked via the events in doc 11. Target is set after a baseline month — the point is that the funnel is *instrumented*, not guessed.

---

**Legally sensitive (flag for human review before launch):** the contact form collects PII (name, email, message), and the app stores/serves the **resume** (Purven's PII) and a private **leads inbox** → a **real privacy policy is required** (India DPDP; GDPR if EU visitors), matching the analytics actually deployed (doc 11). Flagged in 03b (`/privacy`) and the launch gate. The **logged-out denial gate** (doc 10) is the security check that protects the private data.
