# SVG Decor Asset Spec & System

How the theme-aware decor system works, the rules for generating assets, and where
each one is wired. Source vision: `svg-decor-visual-system-plan` ("engineering
intelligent systems that grow like nature"). Root = copper circuits/roots; Canopy =
sage branches/leaves.

---

## How it works (architecture)

1. **Generate** a flat, single-colour, transparent `.svg` (placeholder colour `#B87333`).
2. **Save** the source under `public/decor/<root|canopy>/<name>.svg` (kept for reference).
3. **Inline** it into a React component, replacing the literal colour with
   `currentColor`, and set the SVG's text colour to a token class:
   - Root art → `text-primary` (copper, `--primary`)
   - Canopy art → `text-muted` (sage, `--muted`)
   - rare Canopy accent → `text-primary` on that one element
4. **Theme swap** is automatic via `globals.css` (Root is default):
   ```css
   .decor-root   { display: block; }
   .decor-canopy { display: none; }
   [data-theme="canopy"] .decor-root   { display: none; }
   [data-theme="canopy"] .decor-canopy { display: block; }
   ```
5. **Place** the component in a parent that is `relative isolate overflow-hidden`,
   with the decor `absolute`, low `opacity-[…]`, and `-z-10` so it sits behind content.

Result: one source SVG → recoloured to the exact theme copper/sage, no duplicate
colour files, weightless, crisp at any size.

---

## Hard rules for every asset

- **True `.svg` vector** (not PNG). KBs of `<path>` text.
- **Transparent background** — no backing rectangle.
- **Single colour** `#B87333` (or group by role: `#B87333`→primary, `#6F7F63`→muted,
  `#243026`→foreground). No gradients, filters, shadows, `<text>`, `<style>`, `class=`.
- **Clean `viewBox`**, no fixed `width`/`height`.
- **Keep ALL geometry ~8–10 units inside the viewBox** — anything past the edge gets
  clipped (this caused the early "cut leaf"). Verify max/min coords.
- Strokes for lines, fills for dots/leaves; `stroke-linecap/linejoin="round"`.
- **Edge-weighted, open centre, low density.** Designed to read at low opacity.
- Optimise with SVGO before saving (strips editor cruft).

---

## Asset list (viewBox + intent + where wired)

| Asset | viewBox | Intent | Wired in | Opacity |
|---|---|---|---|---|
| `global-base` | 160×600 (tall) | gutter vines, mass one edge | `SideDecor` (fixed gutters, lg+) | .22 / .18 |
| `home-hero` | 240×240 | corner clusters, open centre, frames hero | `HeroDecor` (home hero) | .14 |
| `home-lower` | 600×200 (wide) | grounded horizontal flow | `LowerDecor` (home connect band) | .10 |
| `footer-cta` | 1200×240 (wide) | grounded spread, bottom edge | `FooterDecor` (global footer) | .09 |
| `about-accent` | 240×240 | timeline w/ milestone nodes | `AboutDecor` (about intro) | .10 |
| `contact-accent` | 240×240 | lines converging toward centre | `ContactDecor` (contact grid) | .07 |
| `portfolio-accent` | 240×240 | faint corner frame (edge ticks) | `PortfolioDecor` (stretched, main) | .06 |
| `field-notes-accent` | 240×240 | tiny TL/BR corner marks | `FieldNotesDecor` (stretched, main) | .06 |
| `admin-base` | 160×600 (tall) | faint left-edge hint | `AdminDecor` (admin, lg+) | .05 |

**Two display modes:**
- **meet/natural** (`preserveAspectRatio="xMidYMid meet"`, `h-full w-auto` or `w-full`):
  keeps aspect; used for vines, hero, lower, footer, about, contact.
- **stretch** (`preserveAspectRatio="none"` + class `decor-stretch`): stretches to the
  content box so corner ticks land at the page corners. The `.decor-stretch` CSS adds
  `vector-effect: non-scaling-stroke` so strokes stay crisp when stretched.

---

## Verify each asset before sending

- Opens transparent on BOTH a dark and a light background (no box).
- It's a vector (zoom stays crisp; openable as text with `<path>`).
- Centre open; detail at edges; all coords inside the viewBox (with margin).

## Status

All 18 assets (9 slots × Root/Canopy) are in `public/decor/` and wired. ✅
