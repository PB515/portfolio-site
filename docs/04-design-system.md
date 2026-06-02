# 04. Design System & Vibe — Purven Bhavsar Personal Brand

*Frozen planning doc. Leads with the vibe, then locks it into hard tokens the AI can't misread. This doc + the Business Brief are AUTHORITATIVE on design. **The color system + theme behavior are now fully specified in [`04a-root-canopy-theme.md`](04a-root-canopy-theme.md) (Root & Canopy, v1.0) — that doc is the source of truth; this section summarizes + points to it.** Contrast verified at launch.*

---

## VIBE (one line)
> **Curious, plain-spoken, and credible — a builder who explains how things work, clearly and without hype.**

This follows the voice decision (B5) and the brief's philosophy ("I enjoy understanding how systems work... making it practical"). Calm and confident, not flashy or salesy — the design must NOT read like a freelance-services pitch (the reconciliation's core fix).

## VOICE & TONE (drives copy + motion)
- First person, simple sentences, ordinary words (Paul Graham). No jargon, no buzzwords, no "synergy/disruptive/game-changer".
- Confident but humble; honest about being early-career on an ambitious arc.
- Show, don't brag — let the story and (eventually) the work speak.

## REFERENCES (feel — directional)
1. **Lee Robinson** (leerob.io) — clear identity-first intro, calm and readable.
2. **Brittany Chiang** (brittanychiang.com) — crisp hero + restrained, polished layout.
3. **Benedict Evans** (ben-evans.com) — systems framing, quiet authority.

---

## TOKENS *(implement as CSS variables / framework config in Phase 0 — then NO hardcoded hex anywhere)*

```
COLOR  → AUTHORITATIVE values in 04a (Root & Canopy). Semantic token names (in app/globals.css):
  --background / --bg-1/2/3   theme gradient + solid fallback
  --surface (+ --surface-solid)   cards, raised panels (translucent)
  --foreground                primary text  · --muted  secondary text
  --primary / --primary-hover / --accent   COPPER family — links/active-nav/underlines/hover (the "2% accent")
  --on-primary                text on copper (verify AA — copper is mid-tone)
  --border / --border-hover (copper) / --shadow-hover (copper-tinted)
  --color-success / --warning / --error   (form + toast states)
  Two themes via one token set: :root = ROOT (default), [data-theme="canopy"] overrides. NOT light/dark.
  Copper is used SPARINGLY (90% bg+type · 8% support · 2% copper) — see 04a §7.

TYPE
  Headings:  one sans-serif, heavier weight (e.g. Inter / Geist tight) — confident, clean
  Body:      a highly readable sans (e.g. Inter 16px base) — line-height ~1.6
  Scale:     h1 ~3rem · h2 ~2.25rem · h3 ~1.5rem · body 1rem · small 0.875rem
  (Field Notes long-form may use a serif body for reading comfort — decide at build, keep ONE choice.)

SPACING  (scale only — no off-scale values)
  4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
  Section vertical rhythm ~4rem; main content horizontal padding ~2rem (gutters consistent)

RADIUS   sm / md / lg  (one set, applied consistently)
SHADOWS  1-2 defined (e.g. shadow-sm for cards, shadow-md for raised) — used consistently, sparingly

ASSETS   logo (vector/commissioned — NOT AI raster), brand images — paths in 06b
```

## THEME — Root 🌱 / Canopy 🌿 (Perspective, NOT light/dark) → full spec in 04a
**Default = Root** (deep olive "Builder mode"); **Canopy** (cream "Thinking mode") is the alternate. The toggle is labelled **"Perspective"** — no "dark/light", no sun/moon. One token set; `:root` holds Root, `[data-theme="canopy"]` overrides; choice persists (localStorage) and an inline head-script applies it before paint (Root loads with zero JS). Toggle is keyboard-focusable + screen-reader-labelled. **Verify WCAG AA in BOTH perspectives** (copper-on-bg and text-on-copper are the watch points). Switching changes **only visual tokens** — never content/layout/nav. *Brought into Phase 2 (it's a brand feature in the nav), not deferred to Phase 5.*

## MOTION *(part of the spec, same rule as colour — set tone here, apply via named pieces)*
**Motion vibe (one line):** *calm and understated — motion confirms structure, never decorates.* (Matches the credible, plain-spoken voice — restrained end of the `frontend-design` skill, never its bold default.)

Named pieces this site uses, and where:
- **reveal** (the workhorse) — sections and cards fade/slide up gently on scroll-in. Used on: homepage sections, About sections, project/field-note cards. **Fires once** (never re-animates on scroll-back).
- **pop-in** — the hero headline + primary CTA land into place on first paint. Hero only.
- **bounce** — **not used** (too playful for this brand) unless a single hero accent earns it later.

**Hard rules (polished vs amateur):** animate **transform/opacity only** (never width/height/margin — they jank and shift layout) · entrances fire **once** · **honor `prefers-reduced-motion`** — with it on, the page is fully static and readable (an accessibility requirement, checked in doc 10). Executed via the toolkit's **motion layer** + **frontend-design** skill, steered by this doc toward the restrained end.

## RECONCILE-TO-REALITY RULE
If the framework's current version stores tokens differently than this doc assumes, **update this doc to match reality** (commit the doc change separately, per Safety Rails) — don't fight the tool. A frozen doc that lies is worse than no doc.

---

**Done when:** a stranger could read the vibe line and describe how the site feels — calm, clear, credible, curious; never salesy.
