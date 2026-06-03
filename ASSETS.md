# Asset filenames & placement

Save static assets at these **exact** paths (all under `public/`). Tell me when they're in and I'll wire each. Compress images first (Squoosh / TinyPNG).

## Brand / system
| File (save as) | Format | Notes |
|---|---|---|
| `public/brand/logo.svg` | SVG, transparent | Use one flat colour or `currentColor` so it can tint to copper per theme. |
| `public/brand/favicon-source.svg` | SVG, square | I'll generate `favicon.ico` + sizes from this. |
| `public/og/og-default.png` | PNG **1200×630** | Social share card. No fake people. |

## Decor (theme-baked — two files, shown one per perspective)
| File | Format | Notes |
|---|---|---|
| `public/ui/decor-root.svg` | SVG, transparent | Bake in **Root** colours (copper on olive feel). Shown in Root only. |
| `public/ui/decor-canopy.svg` | SVG, transparent | Bake in **Canopy** colours (sage on cream feel). Shown in Canopy only. |

*(These replace my hand-drawn motif. Because we show one file per theme, baking colours in is fine.)*

## Social icons
`public/ui/icon-github.svg` · `public/ui/icon-linkedin.svg` · `public/ui/icon-email.svg`
→ SVG, transparent, **single flat colour or `currentColor`** (so I tint them per theme).

## Skill / capability icons
`public/ui/icon-ai-automation.svg` · `public/ui/icon-systems-thinking.svg` · `public/ui/icon-frontend-engineering.svg` · `public/ui/icon-growth-marketing.svg` · `public/ui/icon-learning-research.svg` · `public/ui/icon-writing-explaining.svg`
→ SVG, transparent, single colour / `currentColor`, consistent stroke weight (line-icon style reads best with the calm vibe).

## Your photos
| File (save as) | Where it's used | Best format |
|---|---|---|
| `public/images/purven-hero.png` | **Home hero** (becomes text + image) | **Transparent cut-out PNG/WebP**, portrait, head-to-chest. (Or a non-white framed photo — I'll round + border it.) |
| `public/images/purven-about.jpg` | **About** page (beside the story) | Normal photo, JPG/WebP, portrait or 4:5. I'll frame it (rounded, copper hairline). |
| `public/images/purven-contact.jpg` | **Contact** page (optional, beside form) | Optional. Friendly photo, smaller. |

## Covers — do NOT put these in `public/`
Project & field-note covers are **uploaded per item through the admin panel** (they go to Supabase Storage, not the repo). Your `project-cover-template.png` / `field-note-cover-template.png` are just your **design templates** — keep them wherever you like; they aren't committed. Recommended cover export: **1200×630**, landscape.

---

### Hero photo guidance (text → text + image)
- **Transparent cut-out** is best — it sits naturally on the Root/Canopy gradient + decor.
- If not transparent, a **non-white** background or a framed photo works; I'll place it in a rounded container with a subtle copper edge so it blends in both themes.
- Aim ~**1000–1400px** wide, under ~400 KB after compression.
- Same image must look good on **dark (Root)** and **light (Canopy)** — avoid a background that only suits one.
