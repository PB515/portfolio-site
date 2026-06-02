# 02a. App PRD — Admin / Content Management (PART 7)

*Frozen planning doc. This site is an **authenticated app**: it has a private, admin-only area where Purven manages content without touching code. This doc defines the roles, what each can see/do, and the data that must stay private. Read alongside doc 02 (PRD), doc 06 (Data Model & Security), and doc 08 (security-first roadmap).*

---

## Why this exists
Purven updates the site regularly — adding/removing projects, writing Field Notes, managing categories, swapping the resume — and must do it **live, without a deploy**. That requires logins, a private editing area, and DB-backed content. The failure mode of an authenticated app is **one unauthorized person reaching private actions or admin** — here, a logged-out visitor (or a bot) creating/editing/deleting content, or reaching `/admin`. Security is built first, not bolted on.

## Roles
| Role | Who | Can see | Can do |
|---|---|---|---|
| **Public (anon)** | Every visitor | Published projects, published field notes, categories, the current resume, all marketing pages | Read published content · submit the contact form (insert-only) |
| **Admin** | **Purven only** (single account, email+password) | Everything, incl. drafts and the leads inbox | Full CRUD on projects, field notes, categories; upload/replace resume; upload cover images; read leads |

No public sign-up. No second role at v1. (A future "editor" role is on the No-List.)

## What the admin can do (the admin surface)
- **Projects:** create / edit / delete; set title, summary, body (rich-text **or** Markdown), category, cover image, role, stack, outcome, external link; **draft vs published**; reorder.
- **Field Notes:** create / edit / delete; title, excerpt, body (rich-text/Markdown), category, cover image; draft vs published.
- **Categories:** create / delete — for **both** projects and field notes (each category belongs to one kind). Deleting a category does **not** delete its items; their category is cleared (set to "uncategorized"). *(Deny destructive cascades by default.)*
- **Resume:** upload a new PDF → the public site's resume link updates automatically (points at the current resume record). Old file replaced/superseded.
- **Cover images:** upload per project / per post → stored in object storage, served optimized.

## Data that must stay private (never public)
- The **leads** table (contact submissions — PII). Admin-read only.
- **Draft** projects and field notes (status ≠ published) — invisible to the public until published.
- Auth/session data, storage write access, all secrets.

## The one non-negotiable security gate (see doc 08 + doc 10)
Before any admin feature ships: **prove a logged-out visitor cannot** (a) load any `/admin` page, (b) hit any write/upload endpoint by direct URL or API call, or (c) read drafts or leads. Deny by default; allow only the authenticated admin on purpose.

## Conversion impact (reconciles with doc 02 + reconciliation B1/B3)
The earlier "all projects TBD / Field Notes empty at launch" decisions now mean: the site **launches with empty Portfolio + Field Notes (honest empty-states), and Purven fills them live via the admin panel** — no placeholder/TBD content in code, no fabrication. The admin CMS itself moves **into v1 scope** (off the original No-List).

## App No-List (explicitly NOT in v1)
- No public user accounts / comments / newsletter.
- No second admin or role hierarchy (single admin only).
- No content scheduling, versioning/history, or multi-language.
- No media library beyond per-item cover images + the resume.

**Legally sensitive (flag):** admin collects nothing new from the public, but it stores/serves the resume (Purven's PII) and reads the leads inbox — the privacy policy (doc 02 / `/privacy`) must still match what's deployed.
