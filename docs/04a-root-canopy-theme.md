# 04a. Root & Canopy — Theme Architecture (source of truth)

*Version 1.0 · authored by Purven. This is the authoritative spec for the visual identity, color system, behavior, and implementation of the Root ↔ Canopy toggle. Doc 04 references this for all theme/color decisions. Tokens implemented in `app/globals.css`.*

## 1. Concept
Root and Canopy are **NOT** Dark Mode and Light Mode. They are **two perspectives of the same journey**. The **content never changes** — only the visual language does. It's a **Perspective Switch**, not a theme switch.

## 2. Philosophy
- **🌱 Root — "Builder Mode."** Building · Engineering · Execution · AI Automation · Systems. Emotion: focused, grounded, purposeful, premium, intentional.
- **🌿 Canopy — "Thinking Mode."** Learning · Reflection · Growth · Ideas · Future. Emotion: curious, thoughtful, optimistic, calm, editorial.

## 3. Behavior
- **Default theme: 🌱 Root** (best represents the current professional identity; loads with zero JS).
- Users can switch to 🌿 Canopy at any time.
- **Persist** the choice (localStorage / cookie) — no reselect on every visit. An inline head script sets the theme before paint (no flash).
- **Switching must NEVER change** content, layout, navigation, functionality, or information architecture. **Only visual tokens change.**

## 4. Toggle
- Label: **Perspective**. Options: **🌱 Root** / **🌿 Canopy**.
- Avoid: "Dark Mode", "Light Mode", sun icon, moon icon. These are brand concepts, not generic UI themes.

## 5. Root color system (default)
```
Background gradient : linear-gradient(135deg, #20291F 0%, #2F3A2B 50%, #3D4937 100%)   (Deep Olive Forest)
Primary text        : #F8F6F0   (Warm White)
Secondary text      : #B8C0B3   (Muted Sage)
Copper accent       : #B87333   · light #C67A3D · dark #A56A2A
Card background      : rgba(12,18,12,0.72)   (alt solid #182118)
Borders             : rgba(184,192,179,0.15)
Hover border        : #B87333    Hover shadow: rgba(184,115,51,0.25)
```

## 6. Canopy color system
```
Background gradient : linear-gradient(135deg, #F4F1E8 0%, #E7E1D2 50%, #D6D0BE 100%)   (Warm Sage Journal)
Primary text        : #263021   (Deep Forest)
Secondary text      : #5E6B57   (Muted Forest)
Copper accent       : #A8622A   (alt #B87333)
Card background      : rgba(255,252,242,0.78)   (alt solid #FFFDF6)
Borders             : rgba(38,48,33,0.12)
Hover border        : #A8622A    Hover shadow: rgba(168,98,42,0.15)
```

## 7. Color usage rules
Hierarchy: **90%** background + typography · **8%** supporting colors · **2%** copper accent.
- **Copper YES:** important words, links, underlines, active nav, section dividers, micro-interactions, hover states, toggle states.
- **Copper NO:** entire paragraphs, large backgrounds, every heading, every icon, every button, decorative overuse.
- Rule: *copper should feel valuable.*

## 8. Component rules
Every component supports **both** themes via the **same** tokens. **Never duplicate components per theme.** One component, two token sets. Applies to: hero, navbar, footer, portfolio cards, field-note cards, timeline, resume section, contact section.

## 9. Images & media
**One image that works in both themes** — never `root-version.png` / `canopy-version.png`. Images should look good on dark *and* light backgrounds, use transparency where practical, and avoid strong theme-specific colors.

## 10. Supported pages
All public pages support both themes (required): Home, About, Portfolio, Portfolio Detail, Field Notes, Field Note Detail, Contact. Admin: optional.

## 11. Accessibility
Maintain minimum **WCAG AA** contrast. Verify text, link, button, and focus contrast in **both** themes (copper-on-background and text-on-copper are the watch points — see token notes in globals.css).

**AA adjustment (Phase 5):** on Root, copper `#B87333` as small text on the dark olive bg measured ~3.9:1 (under 4.5). Resolved by mapping Root `--primary` to the **lighter copper `#C67A3D`** (links/accents/button background) with **dark text (`#20291F`) on filled buttons** → ~4.6:1. Canopy (`#A8622A` on cream, white text on copper) already passes and is unchanged. Copper *family* per §5 is intact; this only picks which shade maps to `--primary` on Root.

## 12. Acceptance criteria
Theme system is complete only if: Root loads by default · Canopy selectable · preference persists · all pages support both themes · **no duplicate page implementations** · components share structure · only theme tokens change · accessibility passes · mobile + desktop both correct.

---
**Root = Building · Canopy = Learning.** The same story through two perspectives. The toggle is a **brand feature**, not a dark-mode feature.
