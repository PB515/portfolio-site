# 03. Component Inventory — Purven Bhavsar Personal Brand

*Frozen planning doc. Covers the building blocks and their STATES (doc 04 covers style). Every screen in the User Flow Map (01) and every page in 03b must be assemblable from this list — with no surprises.*

---

## Global / layout
| Component | States needed |
|---|---|
| **Nav bar** | desktop / mobile (hamburger) / scrolled (condensed) · active-link · with persistent **Connect** CTA button |
| **Footer** | default — contact links (email, LinkedIn, GitHub), nav repeat, copyright, privacy link |
| **Theme toggle** *(if kept — see 04)* | light / dark · keyboard-focusable · labelled for screen readers · persists choice |
| **Skip-to-content link** | hidden / focused (a11y) |
| **Page wrapper** | loading / empty / error / 404 (page-level states) |

## Buttons & links
| Component | States needed |
|---|---|
| **Primary button** (Connect / Send) | default / hover / focus / disabled / loading |
| **Secondary button** (View work) | default / hover / focus / disabled |
| **Text / nav link** | default / hover / focus / active / visited |
| **Outbound social link** (LinkedIn, GitHub, email) | default / hover / focus (fires an outbound event — doc 11) |

## Forms *(contact form — the only form on the site)*
| Component | States needed |
|---|---|
| **Input field** (name, email) | empty / focused / filled / error |
| **Textarea** (message) | empty / focused / filled / error |
| **Honeypot field** | visually hidden, off-screen, `aria-hidden`, `tabindex=-1`, `autocomplete=off` (bots fill it → silent reject) |
| **Contact form** | idle / submitting / success / error |
| **Inline validation message** | hidden / shown (per-field, on blur + on submit) |
| **Toast / alert** | success / warning / error |

**Form security is a component requirement, not an afterthought (PRD 02 + Playbook):** the contact form ships with **honeypot + server-side validation + rate limiting**. A public form without these becomes a spam funnel within weeks. Server-side validation re-checks every field (bots skip the browser). Rate limit per IP/window.

## Content components
| Component | States needed |
|---|---|
| **Hero** | default (headline = identity statement + one-line arc + primary CTA) |
| **Trust strip** | default — skills-as-evidence chips + GitHub/LinkedIn links |
| **Project card** | default / hover · **+ TBD/placeholder variant** (honest "Coming soon" — never faked) |
| **Project filter / tabs** | default / active / empty-result *(deferred if Portfolio is all-TBD at launch — keep simple)* |
| **Case-study layout** | default · TBD-content variant |
| **Field-note card** (index) | default / hover |
| **Field Notes index** | **empty-state** ("Writing soon" — designed, honest) / populated (later) |
| **Article layout** | default (title, date, body, optional TOC) |
| **Experience item** (About) | default · **TBD variant** (placeholder until roles supplied) |
| **Skills arc** (About) | default — the today→future sequence, not a flat tag dump |
| **Resume link/button** | default / hover / focus (links to PDF asset) |
| **Image / figure** | loaded / loading (blur placeholder) / broken-fallback · always has alt text |

## Admin / auth components *(authenticated app — Purven only; PART 7)*
| Component | States needed |
|---|---|
| **Login form** (email + password) | idle / submitting / error (bad credentials) / locked (rate-limited) |
| **Auth guard / middleware** | checking / authed (render) / not-authed (redirect to /admin/login) |
| **Admin shell/nav** | default · active-section · logout button |
| **Content table** (projects / notes list) | populated / empty / loading / error · row shows draft-vs-published badge |
| **Content editor** (project / note) | idle / dirty(unsaved) / saving / saved / error · delete-with-confirm |
| **Body editor** | **rich-text (WYSIWYG)** mode ⇄ **Markdown** mode toggle · empty / focused / filled |
| **Cover image uploader** | empty / selecting / uploading / uploaded(preview) / error / remove |
| **Category select** | default / empty (no categories yet → prompt to create) |
| **Category manager** | list by kind · create (idle/submitting/error) · delete (confirm; items become uncategorized) |
| **Draft/Published toggle** | draft / published · publish action |
| **Resume uploader** | shows current (filename + date) / selecting / uploading / replaced / error |
| **Slug field** | auto-from-title / edited / duplicate-error (unique) |

Admin pages are **`noindex`**, never linked from public nav, and gated by the auth guard. Logged-out access to any `/admin` route or write endpoint must be denied (doc 06 RLS + doc 10 gate).

---

**The states column is where consistency lives.** Empty, loading, and error states are exactly what an AI silently forgets — and a site missing them feels broken even when the happy path works. Two states matter most for *this* site because of decisions B1 + B3:
- **Project card / Portfolio "TBD" variant** — an honest, designed placeholder, never an invented case study.
- **Field Notes empty-state** — a deliberate "Writing soon", not a hollow blog.

**Done when:** every screen in 01 can be assembled from this list, and the contact form lists its honeypot + validation + rate-limit requirement.
