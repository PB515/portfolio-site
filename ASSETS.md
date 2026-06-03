# Asset filenames & placement

Save static assets at these **exact** paths (all under `public/`). Tell me when they're in and I'll wire each. Compress images first (Squoosh / TinyPNG).

> **All PNG is fine.** High-resolution + transparent where noted, then compress. SVG not required anywhere.

## Brand / system
| File (save as) | Format | Notes |
|---|---|---|
| `public/brand/logo.png` | PNG, transparent, high-res (≥ 4× display, e.g. ~600px wide) | Header shows it ~36px tall, so give plenty of resolution. |
| `public/brand/favicon-source.png` | PNG, **square 512×512**, transparent | I'll generate the favicon sizes from this. |
| `public/og/og-default.png` | PNG **1200×630** | Social share card. No fake people. |

## Decor (theme-baked — two files, shown one per perspective)
| File | Format | Notes |
|---|---|---|
| `public/ui/decor-root.png` | PNG, transparent, large (e.g. ~1600px wide) | Already in **Root** colours (copper/olive). Shown in Root only. |
| `public/ui/decor-canopy.png` | PNG, transparent, large | Already in **Canopy** colours (sage/cream). Shown in Canopy only. |

*(Two pre-coloured files = no recolouring needed. These replace my hand-drawn motif.)*

## Social icons
`public/ui/icon-github.png` · `public/ui/icon-linkedin.png` · `public/ui/icon-email.png`
→ PNG, transparent, ~128px square. **Single-colour silhouette** (any one colour) so I can tint per theme — or just make them copper if you'd rather not bother.

## Skill / capability icons
`public/ui/icon-ai-automation.png` · `public/ui/icon-systems-thinking.png` · `public/ui/icon-frontend-engineering.png` · `public/ui/icon-growth-marketing.png` · `public/ui/icon-learning-research.png` · `public/ui/icon-writing-explaining.png`
→ PNG, transparent, ~128px square, **single-colour silhouette**, consistent style (line or solid — pick one and keep it consistent).

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
