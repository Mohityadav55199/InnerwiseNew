# Innerwise — Everything is within

A pixel-faithful implementation of the **Innerwise** landing page (Figma *Desktop – Home*, frame `1010:8`), built with React, TypeScript and Vite.

Innerwise is a whole-person wellbeing platform that brings together **Body, Mind, Inner Wisdom and Rituals** to help people understand themselves and build healthier ways of living.

**Live site:** https://innerwise-six.vercel.app/

---

## Screenshots

| | |
|---|---|
| ![Hero](docs/screenshots/01-hero.webp) | ![Discover what you need today](docs/screenshots/02-discover.webp) |
| **Hero** | **Discover what you need today** |
| ![Our Approach](docs/screenshots/03-approach.webp) | ![Quick Reset](docs/screenshots/04-quick-reset.webp) |
| **Our Approach** | **Quick Reset** |
| ![Innerwise AI Companion](docs/screenshots/05-ai-companion.webp) | ![Final call to action](docs/screenshots/06-final-cta.webp) |
| **Innerwise AI Companion** | **Final call to action** |

---

## Page sections

1. **Announcement bar & navigation** — responsive navbar with an accessible mobile menu (Escape closes it and returns focus)
2. **Hero** — headline, sub-heading, CTAs, Inner Compass badge and media slot
3. **Discover what you need today** — six need cards (3 × 2 grid on desktop)
4. **The Innerwise Framework** — Mind, Body and Inner Wisdom pillar cards, plus the Rituals banner
5. **Our Approach** — copy and the full Figma illustration group
6. **Quick Reset** — four short practice cards
7. **Innerwise AI Companion** — phone mockup, chat bubbles, avatar and feature list
8. **Explore & Play** — six activity tiles
9. **FAQ** — accessible accordion (`aria-expanded` / `aria-controls`, keyboard operable)
10. **Final CTA** — Figma wave shape and mascot artwork
11. **Footer** — seven link columns and brand row

## Tech stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Inline styles and component-scoped CSS, with Tailwind CSS 3 base layer |
| Linting | oxlint |
| Font | Roboto (Google Fonts) |
| Hosting | Vercel |

## Getting started

Requires **Node.js 20.19+ or 22.12+** (needed by Vite 8).

```bash
npm ci            # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check (tsc -b) and build to dist/
npm run preview   # serve the production build locally
npm run lint      # run oxlint
```

## Project structure

```
src/
├── components/
│   ├── layout/          # AnnouncementBar, Navbar, Footer
│   ├── primitives/      # Button, Eyebrow, SectionHeader
│   └── sections/        # one folder per page section (Hero, DiscoverSection, …)
├── config/
│   ├── assets.ts        # asset manifest — every image/icon path, with its Figma node
│   └── links.ts         # all link destinations (placeholders until confirmed)
├── pages/HomePage.tsx   # assembles the page
└── index.css            # global styles, buttons, background pattern
public/assets/
├── icons/               # SVGs exported from Figma (logo, pillar icons, sparkles, wave, …)
└── images/              # WebP images exported from Figma at 2× with Figma's crops applied
docs/screenshots/        # README screenshots (not shipped with the site)
```

## Design fidelity

- **Source of truth:** the Figma *Desktop – Home* frame (1440 × 9002). At a 1440 px viewport, section positions, card sizes and the total page height (9002 px) match the Figma export.
- **Assets** are exported directly from the Figma file (vectors as SVG, rasters as 2× WebP with Figma's crops, masks and mirroring baked in). The production build is about 1.2 MB.
- **Copy** is reproduced exactly as in Figma, including its intentional inconsistencies (for example "Discover the Innwise Approach" and the "Explore Body →" link on the Inner Wisdom card).
- **Design source files** (the full Figma SVG export, raw extracted rasters and superseded assets) live in a local `design-source/` folder, which is git-ignored and never shipped.

## Responsive behaviour

Figma provides a desktop frame only; smaller layouts are adapted from it.

| Width | Layout |
|---|---|
| ≥ 1382 px | Figma desktop layout |
| 1240–1381 px | Compact desktop (common 1280 / 1366 laptops): Discover stays 3 × 2, footer keeps all 7 columns in one row |
| 1121–1239 px | Desktop navigation, 2-column Discover grid, 4-column footer |
| ≤ 1120 px | Mobile menu button replaces the desktop navigation |
| ≤ 768 px | Stacked sections, 2-column footer |
| ≤ 640 px | Single-column Discover cards |

The page has no horizontal scrolling at any width from 330 px upward.

## Configuration

- **Links:** every `href` comes from `src/config/links.ts`. Destinations are placeholders (`#`) until the real URLs are confirmed.
- **Assets:** every image path comes from `src/config/assets.ts`, which also records the Figma node each asset came from.

## Deployment

The site deploys to **Vercel** automatically on every push to `main`. `vercel.json` sets the framework (Vite), the build command (`npm run build`) and the output directory (`dist`).
