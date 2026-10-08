# INNERWISE — Figma Implementation Specification (Homepage, Desktop)

> **Purpose:** hand-off spec for building the Innerwise homepage in React. Use it **alongside** the Figma file, not instead of it.
> **Scope:** design analysis only. No code, no redesign, no invented requirements.

---

## 0. How to read this document

Every value carries one of these labels:

| Label | Meaning |
|---|---|
| **[FS] FIGMA SPECIFIED** | Read directly from a layer property via the Figma Plugin API (fill hex, font, size, line-height, radius, effect, auto-layout padding/gap, export setting). Exact. |
| **[FO] FIGMA OBSERVED** | Measured from layer positions/sizes (e.g. gaps between absolutely-positioned layers) or seen in the rendered frame. Accurate to ±1px but not a declared token. |
| **[NS] NOT SPECIFIED** | Figma does not define it. Written as "UNKNOWN / NOT SPECIFIED IN FIGMA". |
| **[IR] IMPLEMENTATION RECOMMENDATION** | A decision the developer must make; this is a suggestion, **not** a Figma requirement. |
| **[INF] INFERENCE** | A reasoned interpretation of the design. Treat as unconfirmed. |

- All coordinates are **px relative to the top-left of the frame `Desktop - Home` (1440 × 9002)**.
- `x a–b` = left edge to right edge; `y a–b` = top edge to bottom edge.
- Node IDs (e.g. `1010:58`) are included so you can jump to the layer in Figma (Dev Mode → paste ID / use the link `?node-id=1010-58`).

---

## 1. Project Overview

- **Product:** Innerwise — whole-person wellbeing platform (Body, Mind, Inner Wisdom, Habits/Rituals). [FO from copy]
- **Deliverable to build:** one marketing homepage, desktop design only. [FS]
- **Figma file:** `Innerwise-Approval (Copy)` — fileKey `zBxuSRDRpZag2E5Efn6A7U`
- **Frame to implement:** page **"Website"** (`1010:2`) → frame **"Desktop - Home"** (`1010:8`), **1440 × 9002**. [FS]
- **Visual character:** warm off-white page with a faint topographic-line pattern, orange primary actions, 3D-rendered illustrations (mascot monk character, compass, bell, sun, star, lotus), soft gradient pillar cards. [FO]

---

## 2. Figma Analysis

### 2.1 Pages in the file
| Page | Contents | Relevant to this build? |
|---|---|---|
| **Website** (`1010:2`) | `Desktop - Home` frame + one loose FAQ item outside the frame (collapsed state, see §12) | **Yes — the only source of truth** |
| **Active** (`0:1`) | Mobile **app** screens (360 px wide: Home, Profile, Content pages, pop-ups), reference screenshots of other apps, and an **older, superseded** `Desktop - Home` draft (`802:8`, 1440 × 1562) | No. App UI, not the website. The old draft is context only (see §10.5) |
| **Approved Flows** (`139:29`) | Mobile app flows (Expert, Appointments, Consultation…), mascot/logo explorations, image libraries | No |

### 2.2 What the file does and does not contain (Desktop - Home)
| Item | Finding |
|---|---|
| Breakpoint frames (tablet / mobile web) | **None.** Only one desktop frame exists. [FS] |
| Components / variants | **None** in the frame or on the page. Every repeated element is a copied group. [FS] |
| Local text / color / effect styles | **None.** [FS] |
| Variables (design tokens) | **None.** [FS] |
| Prototype interactions / flows | **None.** No reactions on any layer, no flow starting points. [FS] |
| Auto-layout | Only on: Announcement strip, Nav bar (+ its children), and the `Primary CTA` buttons. **All other sections are absolutely positioned groups.** [FS] |
| Constraints | Frame default (Left/Top). Nothing set for resizing. [FS] |
| Layout grid | 8 columns, gutter 20, stretch, margin 0 — **hidden** (visible = false). [FS] |
| Hidden layers | 3: hidden chevron on "Explore Innerwise" button (`1010:65`), hidden lotus + shadow inside Discover card 1 (`1010:82`, `1010:83`). Do **not** render these. [FS] |
| Export settings | Only the nav `Logo` frame (`1010:39`): **JPG @1x**. [FS] |
| Fonts | **Roboto only** (Regular, Italic, Medium, SemiBold, Bold). [FS] |

---

## 3. Homepage Structure (top → bottom)

| # | Section | y range | Background |
|---|---|---|---|
| 1 | Announcement bar | 0–45 | Solid `#47A3F8` |
| 2 | Navbar | 46–105 | Solid `#FFFFFF` |
| 3 | Hero (two tiers) | 105–1414 | Large white ellipse over pattern |
| 4 | "Discover what you need today" | 1514–2215 | Pattern page bg + `#E9F5FF` panel |
| 5 | "The Innerwise Framework" + Rituals banner | 2315–3184 | Pattern page bg |
| 6 | "Our Approach" | 3284–3958 | Full-width white band |
| 7 | "Quick Reset" | 3958–4723 | Pattern page bg |
| 8 | "Innerwise AI Companion" | 4723–5566 | Full-width white band |
| 9 | "Explore & Play" | 5567–6492 | Concentric blue circles |
| 10 | FAQ | 6492–7747 | Pattern page bg |
| 11 | Final CTA "Come back to yourself." | 7747–8402 | White shape with **wavy top edge** |
| 12 | Footer | 8402–9002 | Solid `#2E2E2E` |

- Vertical rhythm between most sections ≈ **100 px** [FO] (e.g. video bottom 1414 → Discover panel 1514; panel bottom 2215 → Mind card 2315; Quick Reset CTA bottom 4623 → white band 4723; FAQ last item 7647 → wave 7747).
- There is a **1 px gap** between announcement bar (ends y 45) and navbar (starts y 46). [FO] See §15.

### 3.1 Global page background [FS]
- Frame fill: `#FAF5F2`.
- Pattern: 14 image rectangles (`image 63`–`image 76`), each **720 × 1079**, tiled in 2 columns (x 0 and 720), rows starting y 123, 1202, 2281, 3834, 4913, 5992, 7071. Same image (hash `f371973d…`) at **10 % layer-fill opacity**. Content: thin beige **topographic contour lines**.
- Sections 6, 8, 9, 11, 12 and the top of the hero are drawn **over** the pattern with opaque shapes, so the pattern shows only in sections 3 (lower part), 4, 5, 7, 10. [FO]

---

## 4. Section-by-Section Specifications

### 4.1 Announcement Bar (`1010:36`)
- **Purpose:** one-line product statement.
- **Layout [FS]:** auto-layout horizontal, centered both axes, padding **12 top/bottom, 24 left/right**, height 45, width 1440.
- **Background [FS]:** `#47A3F8`.
- **Text [FS]:** "A new way to understand your wellbeing — Body, Mind, Inner Wisdom & Rituals." — Roboto **Medium 18**, line-height auto, `#FFFFFF`, centered.
- **Interactions:** [NS] (not a link, no close button).

### 4.2 Navbar (`1010:38`)
- **Layout [FS]:** auto-layout horizontal, **space-between**, centered vertically, gap 20, padding **12 / 80**, height 59, bg `#FFFFFF`.
- **Container:** content spans x 80–1360 (1280 wide). [FO]
- **Logo group `1010:39` [FS]:** auto-layout, gap 12, 162 × 34.
  - Mark: 3 vectors, 60 × 34 — gold gradients (`#FFEBA7 → #CF9A28` linear, `#CF9A28 16% → #FFEBA7` radial, small dot `#FFDE9B → #FE257A`).
  - Wordmark stack (auto-layout vertical, gap 4): "InnerWise" Roboto **Medium 20**, lh **140%**, `#000000`; "Everything is within" Roboto **Regular 10**, lh auto, `#000000`.
- **Links `1010:47` [FS]:** auto-layout, gap **28**: Your Space · Organizations · Programs · Wellness Hub · About · Help — Roboto **Medium 18**, `#2E2E2E`. Block positioned x 389–1010. [FO]
- **Actions `1010:54` [FS]:** auto-layout, gap **24**, right-aligned.
  - "Sign In": text link, Roboto **SemiBold 16**, `#FE7209`.
  - "Get Started": pill button 130 × 35, fill `#FE7209`, radius **100**, padding **8 / 24**, text SemiBold 16 `#FFFFFF`.
- **Interactions:** hover/active/current-page states, dropdowns, sticky behaviour — all **[NS]**.

### 4.3 Hero — see §10 for the full hero spec.

### 4.4 Discover Section — "What would feel better right now?" (`1010:73`)
- **Purpose:** quick entry by need (calm, sleep, self-understanding, habits, connection, change).
- **Container [FS]:** panel rect 1280 × 701 at x 79, y 1514, fill `#E9F5FF`, radius **10**, no shadow. Centered on the page. [FO]
- **Header (centered) [FS]:**
  - Eyebrow "DISCOVER WHAT YOU NEED TODAY" — SemiBold 16, lh 20 px, letter-spacing 8 %, `#FE7209`, centered. Top at y 1574 (**60 px** panel top padding). [FO]
  - H2 "What would feel better right now?" — **Bold 50**, lh auto, `#2E2E2E`, centered. y 1615 (gap ~21 below eyebrow). [FO]
  - Sub "Sometimes you need to slow down. Sometimes you need clarity. ⏎ Sometimes you simply need to understand what's happening within you." — **Regular 24**, lh auto, `#2E2E2E`, centered, **hard line break after "clarity."** y 1695. [FO]
- **Grid [FO]:** 3 × 2 cards, each **380 × 172**, gap **30** horizontal and vertical, grid x 119–1319 (40 px inset inside panel), y 1781–2155; panel bottom padding 60.
- **Card (×6) [FS]:** fill `#FAF5F2`, radius 10, shadow **0 4 12 rgba(0,0,0,0.25)**.
  - Title: SemiBold, lh 28 px, `#2E2E2E`, top at card +30.
  - Description: Regular 16 (one card 14 — see below), lh 24 px, `#2E2E2E`, top at card +64.
  - Link "Explore →": SemiBold 16, lh auto, `#2E2E2E`, top at card +122. (Arrow is a text character, not an icon.) [FS]
  - 3D image on the left. [FO]

| # | Title (size) | Description (size) | Image (node, size, left offset in card) | Text left offset |
|---|---|---|---|---|
| 1 | Feel Calmer (24) | Manage stress, overwhelm ⏎ and racing thoughts. (16) | `image 24` sun-on-cloud `1010:84`, 106×96, +30 | +154 |
| 2 | Sleep Better (24) | Create better sleep and recovery routines. (16) | `3d-icon-cloudy-night 1` `1010:90`, 116×92, +38, **rotated 180°** | +179 |
| 3 | Understand Myself (22) | Explore your thoughts, emotions and patterns. (16) | `3d-render-shiny-yellow-star 1` `1010:96`, 102×98, +38 | +163 |
| 4 | Build Better Habits (22) | Create routines that ⏎ support the life you want. (16) | bell speech-bubble `1010:102`, 117×90, +22 | +154 |
| 5 | Feel More Connected (22) | Strengthen relationships, communication and belonging. (**14**) | `3d-icon-cloudy-night 4` `1010:108`, 98×83, +25, **rotated 180°** | +140 |
| 6 | Grow Through Change (22) | Navigate uncertainty, transitions and new beginnings. (16) | `magnific__generate-4-custom…` `1010:114`, 91×89, +21 | +121 |

- **Note:** title sizes (24 vs 22), one 14 px description and per-card text offsets are **inconsistent in Figma**. [FS/FO] See §15 and §16.
- **Interactions:** card/link hover, link targets — [NS].

### 4.5 Framework Section — "Three dimensions. One whole you." + Rituals banner
**Left column [FS unless noted]** (x 181–183):
- Eyebrow "THE INNERWISE FRAMEWORK" — SemiBold 16 / lh 20 / ls 8 % / `#FE7209`, y 2513.
- H2 "Three dimensions. ⏎ One whole you." — Bold 50, lh auto, `#2E2E2E`, box 419 wide, y 2553 (2 lines).
- Body "Your wellbeing isn't divided into separate boxes. Your body affects your mind. ⏎ Your thoughts influence your habits. ⏎ Your experiences shape your inner world." — **Regular 24, lh 125 %**, `#2E2E2E`, box 471 wide, y 2681.
- Left text block is roughly vertically centred against the card stack. [FO]

**Right column — 3 pillar cards [FS]** (x 734–1258, width **524**, radius **20**, shadow 0 4 12 rgba(0,0,0,.25)), stacked with **20 px** gaps [FO]:

| Card | y | Height | Fill (linear gradient) | Label | Title | Tags | Link |
|---|---|---|---|---|---|---|---|
| MIND `1010:227` | 2315 | 198 | `#5BBCF7` @26 % → `#19AB4F` @100 % | MIND | Know Your Mind | Explore thoughts • Stress • Emotions • Focus • ⏎ Relationships and mental clarity | Explore Mind → |
| BODY `1010:220` | 2533 | 195 | `#FE7209` @0 % → `#FFCF0B` @88 % | BODY | Know Your Body | Energy • Sleep • Movement • Body signals • ⏎ Breath • Nutrition • Integrative healing | Explore Body → |
| INNER WISDOM `1010:234` | 2748 | 194 | `#CB5A9F` @0 % → `#BE7FEC` @100 % | INNER WISDOM | Know Your Inner Wisdom | Values • Meaning • Intuition • Reflection • ⏎ Self-awareness and Inner signals | **Explore Body →** (sic) |

- Gradient direction: diagonal, top-left → bottom-right. Calculated from the Figma gradient transform ≈ **150–158°** in CSS terms. [INF] — copy the exact CSS from Figma Dev Mode.
- Card text (x = card +148) [FS]: label **Regular 16** `#2E2E2E` (no tracking, not orange) at +30; title **Bold 24** at +59; tags Regular 16 (2nd line lh 24 px) at +93; link SemiBold 16 at +149.
- Card icon (left zone, ~x +45…+104) [FS]: off-white `#FAF5F2` vector — MIND: waveform (`1010:229`, 89×39); BODY: figure (`1010:222`, 59×64); INNER WISDOM: radiating-sun group (`1010:236`, 58×58).

**Rituals banner `1010:250` [FS]:**
- Rect x 66–1359 (**1293** wide), y 3002–3184 (182 high), fill `#F9E8DF`, radius 10, shadow 0 4 12 rgba(0,0,0,.25). Top is **60 px** below the Inner Wisdom card. [FO]
- Bell speech-bubble image `1010:252` 150 × 116 at x 75, y 3038.
- Label "RITUALS" Regular 16 `#2E2E2E` (x 237, y 3032); H "Shape your everyday life." **Bold 50** (y 3061); sub "Understand your patterns and build routines that support lasting wellbeing." Regular 24 (y 3126).
- Button "Explore Habits" (177 × 39) at x 1101, vertically centred in the banner, right inset ≈80 [FO]; **text and chevron colour `#FAF5F2`** (not white). [FS]

### 4.6 Our Approach — "Human-centred. Whole-person."
- **Background [FS]:** full-width white rect `1010:23` y 3284–3958 (covers the pattern).
- **Left column [FS]** (x 183): eyebrow "OUR APPROACH" (y 3443 → ~159 px top padding [FO]); H2 "Human-centred. ⏎ Whole-person." Bold 50 (y 3483, box 367 wide); body Regular 24 (box 516 wide, y 3621) — text: "Innerwise brings together psychological ⏎ understanding, wellbeing practices and everyday ⏎ behavior change. ⏎⏎ Understand thoughts, emotions, behavior and ⏎ relationships." (contains an **empty line**; 2nd segment lh 24 px); button "Discover the Innwise Approach" (sic) 294 × 39 at y 3817.5.
- **Right illustration group `1010:121` [FS]** (x ≈714–1355, y 3334–3908): layered composition —
  - Purple glow: ellipse 369 Ø, `#7A5495` @76 %, layer blur 25.
  - Main mascot (meditating monk with orange goggles) `1010:127`, 329 × 458.
  - Ground shadow: ellipse 372 × 80, `#2E2E2E`, opacity 72 %, layer blur 20.
  - Dashed orbit: ellipse outline 2 px `#47A3F8`, dash **5/5**, rotated ~9°.
  - 4 gradient icon orbs on the orbit (layer blur 4, white stroke): orange→yellow leaf (`1010:129`), pink→purple sun (`1010:133`), blue→green waveform (`1010:191`, 121 Ø), orange→pink sunrise (`1010:194`, 118 Ø).
  - Floating items: bell `1010:212`; sun-on-cloud with curved text "MENTAL WELLBEING" (Roboto Bold 10, `#47A3F8`, rotated −15°) `1010:209`; polaroid card "Calm The ⏎ Chaos" (12 px, `#2E2E2E`, card `#FAF5F2`, shadow 0 0 12.6 `#686868` @78 %, rotated 15°) `1010:214`; gold coin/monogram `1010:208`; lotus with shadow `1010:122`; 2 yellow sparkles `#FFCC03` (`1010:207`, `1010:213`).
- **Bottom spacing:** illustration ends y 3908, band ends 3958 (50). [FO]

### 4.7 Quick Reset — "Need a moment? Start here." (`1010:265`)
- **Background:** pattern page bg. [FO]
- **Header (centred) [FS]:** eyebrow "QUICK RESET" y 4058; H2 Bold 50 y 4098; sub "Small moments can create meaningful shifts." Regular 24 y 4167.
- **Cards [FS]:** 4 × **261 × 309**, white `#FFFFFF`, radius 10, shadow 0 4 12 rgba(0,0,0,.25); top y 4235 (40 below sub [FO]).
  - x positions 154 / 445 / 731 / 1022 → gaps **30 / 25 / 30** (uneven in Figma). [FO]
  - Image: 221 × 197 inset **20 px** top/left/right, radius 10 (mask), image fill mode *Fill* (cover).
  - Title at card +237: **SemiBold 16, lh 140 %, ls −2 %**, `#2E2E2E`.
  - Meta row at card +260: book-open icon 18.6 × 18.6 (stroke `#2E2E2E`) + text **Regular 12, lh 140 %, ls −2 %**.

| # | Title | Meta | Image |
|---|---|---|---|
| 1 | Pause • Breathe • Notice | 30 Seconds | water-drop photo `364 1` `1010:276` |
| 2 | Reset your attention | 1 Minute | forest photo `18660 1` `1010:288` |
| 3 | Release tension and reconnect | 3 Minute | pink flower macro `79310 1` `1010:300` |
| 4 | Create space for Calm & Clarity (**centre-aligned** text box) | 5 Minute | mountain lake `624 1` `1010:312` |

- **Button:** "Try a Quick Reset" 210 × 39, centred (x 615–825), y 4584 (40 below cards). [FS/FO]

### 4.8 Innerwise AI Companion (`1010:320`)
- **Background [FS]:** full-width white rect `1010:24` y 4723–5566.
- **Left visual (x 152–638) [FS]:**
  - Phone mockup image `1010:329` 486 × 639 at (152, 4816) — app chat UI is **baked into the image**.
  - 3 chat bubbles (boolean "Union" shapes = rounded rect + tail, rotated 180°): fill `#E9F5FF`, shadow **0 4 12.6 rgba(0,0,0,0.65)**. Text **Italic 12, lh 134 %, ls −2 %**, `#2E2E2E`: "I am feeling sad today. Help me?" · "Find me a doctor!" · "Suggest a short routine that makes my mornings refreshing?". They overlap the phone's right edge. [FO]
  - Avatar badge: circle **200 Ø** at (186, 5213), white fill, **10 px `#7A5495` stroke**, outer glow drop-shadow `#91D6FF` @41 % blur 14.3 (offset 0,0); mascot image masked inside.
  - Ground shadow ellipse 318 × 82 `#2E2E2E`, opacity 53 %, blur 15.8.
  - 2 yellow sparkles `#FFCC03` above the phone.
  - Disclaimer "AI support is designed to complement — ⏎ not replace — professional care." **Italic 16**, `#686868`, centred, y 5468.
- **Right column (x 699) [FS]:**
  - Eyebrow "INNERWISE AI COMPANION" y 4884.
  - H2 "You don't always need an answer. Sometimes you need a place to begin." Bold 50, box 570 wide (3 lines), y 4924.
  - Sub "Meet your Innerwise AI Companion" Regular 24, lh 125 %, y 5111.
  - Feature list (3 rows, 30 px tall, **10 px gap** [FO]): icon ~20 px (stroke `#47A3F8`) + text **Regular 24, lh 125 %, `#47A3F8`**, text x 729: "A supportive space to reflect." · "Explore what's on your mind." · "Discover resources that fit your needs."
  - Button "Meet Your Innerwise Companion" 306 × 39, y 5311.5.

### 4.9 Explore & Play — "Learn about yourself. Experiment with everyday wellbeing."
- **Background [FS]** (mask group `1010:28`, y 5567–6492, full width): base rect `#B2DBFB` + 4 concentric hard-edged circles centred ≈ (730, 6058) [FO]: Ø1574 `#BBE0FC`, Ø1173 `#C9E5FF`, Ø762 `#D8ECFD`, Ø396 `#ECF6FF`. No blur.
- **Header (centred) [FS]:** eyebrow "EXPLORE & PLAY" y 5627 (60 below section top [FO]); H2 2 lines Bold 50 (box 820 wide) y 5667; sub "Not everything needs to feel like a lesson." Regular 24 y 5805.
- **Tiles [FS]:** 6 × **277 × 215**, white, radius 10, **no shadow**; x 265 / 572 / 879, y 5893 / 6138 (gaps 30 / 30). Grid spans x 265–1156 → centre ≈ 710, i.e. **~10 px left of page centre**. [FO]
  - Icon circle 50 Ø, centred, top +30; white line icon inside (~22–30 px tall, stroke `#FAF5F2`).
  - Title SemiBold 24, lh auto, centred visually, top +90.
  - Description Regular 16, lh auto, centred text, box 237 wide (inset 20), top +128.

| Row/Col | Title | Description | Circle colour | Icon |
|---|---|---|---|---|
| 1/1 | Did You Know? | Discover fascinating insights about your body, mind, behaviour and everyday patterns. | `#CB5A9F` | book |
| 1/2 | Tiny Experiments | Try something different and notice what changes. | `#7A5495` | flask |
| 1/3 | Quizzes | Explore your thinking, stress, emotional and habit patterns. | `#47A3F8` | quiz |
| 2/1 | Challenges | Small actions. Simple goals. Meaningful progress. | `#00A654` | flag |
| 2/2 | **Tiny Experiments** (duplicate) | Try something different and notice what changes. (duplicate) | `#F7B600` | flask |
| 2/3 | Quick Practices | Short experiences you can fit into your day. | `#DE4C3F` | play |

- **Button:** "Explore & Play" 175 × 39, centred, y 6393 (40 below tiles; 60 above section bottom). [FO]

### 4.10 FAQ — "Frequently Asked Questions"
- **Background:** pattern page bg. [FO]
- **Header (left-aligned, x 183) [FS]:** eyebrow "YOUR QUESTIONS, ANSWERED" y 6592; H2 Bold 50 y 6632.
- **Items [FS]:** 6 × **1075 × 136**, white, radius 10, shadow 0 4 12 rgba(0,0,0,.25); x 183–1258 (centred); first at y 6731, step 156 → **20 px gap**. [FO]
  - Question: SemiBold 24, `#2E2E2E`, at +50 left, +30 top.
  - Answer: Regular 16, lh auto, `#2E2E2E`, box 699 wide, at +68 top.
  - Icon: 30 × 30 frame, stroke 2 px `#FE7209`, at +995 left (50 right inset), +53 top (vertically centred). In the expanded items the vectors are a **circle + horizontal line only = "minus" (−)**, even though the layer is named "interface-add-circle". [FS — vector geometry checked on item 1 (`1010:434`); items 2–6 are copies with the same name and size, assumed identical [INF] — glance at them in Figma]
- **All six items are drawn expanded** (answer visible, "−" icon) in the frame. A **collapsed item** with a "+" icon exists outside the frame (`1010:547`, see §12).

| Q | A |
|---|---|
| What is Innerwise? | Innerwise is a whole-person wellbeing platform that brings together Body, Mind, Inner Wisdom and Habits to help people understand themselves and build healthier ways of living. |
| What are the four Innerwise pillars? | Body, Mind, Inner Wisdom and Habits. Together, they provide a broader view of everyday wellbeing. |
| Who is Innerwise for? | Innerwise is designed for individuals as well as organisations looking to support wellbeing |
| What can I explore on Innerwise? | You can explore guided practices, Programs, self-discovery tools, articles, quizzes, reflections, habit tools and personalised wellbeing experiences. |
| Does Innerwise provide professional mental health care? | Innerwise can provide wellbeing education, tools and support. Where professional mental health care is needed, appropriate qualified professionals and services should be sought. |
| How do I start? | Simply begin with what you need today — or take the Innerwise journey to explore yourself more broadly. |

### 4.11 Final CTA — "Come back to yourself."
- **Background [FS]:** white boolean union `1010:25` (x −48–1465, y 7747–8590): a 333 px tall vector with an **organic wavy top edge** unioned with a rectangle starting y 7884. Footer overlaps its bottom. The wave is a custom path — **export it, do not approximate**.
- **Left (x 183) [FS]:** H2 "Come back to yourself." Bold 50, y 7997; body Regular 24 (box 527 wide, y 8066): "Understand your Body. Clear your Mind. Listen to your Inner Wisdom. Build better Habits. Your journey starts with one small step."; button "Start Your Innerwise Journey" 281 × 39, y 8218.
- **Right art group `1010:539` [FS]** (x 846–1257, y 7920–8334): purple glow ellipse 246 Ø `#7A5495` @76 % blur 25; mascot with open arms `1010:541` 376 × 401; 3 sparkles `#FFCC03`.

### 4.12 Footer (`1010:464`)
- **Background [FS]:** `#2E2E2E`, 1440 × 600, straight top edge, y 8402–9002.
- **Columns [FS]:** 7 columns at x 80 / 266 / 452 / 638 / 824 / 1010 / 1196 (**186 px step** [FO]), top y 8462 (**60 px** top padding [FO]).
  - Heading: SemiBold 18, `#FAF5F2`. First link 24.5 px below heading top+height; links every **32 px** (16 px text + 16 px gap). [FO]
  - Links: Regular 14, `#FFFFFF`.

| Column | Links |
|---|---|
| For You | Your Journey, Body, Mind, Inner Wisdom, Habits, Explore & Play, Library, Self-Discovery |
| For Organisations | Workplace Wellbeing, Employee Wellbeing, Leadership, Team Wellbeing, Programs, Assessments, Workshops |
| Programs | Stress & Resilience, Sleep & Recovery, Emotional Wellbeing, Conscious Living, Personal Growth, Digital Wellbeing, Healthy Habits, Integrated Wellbeing |
| Products | Innerwise App, AI Companion, Assessments, Guided Practices, Courses, Personalised Journeys, Tracking & Insights |
| Resources | Articles, Insights, Guides, Quizzes, Tiny Experiments, Research, Toolkits, Practices |
| About | About Innerwise, Our Story, Our Framework, Our Approach, Our Experts, Careers, Partnerships |
| Help | Getting Started, FAQs, Account & Membership, App Support, Contact Us |

- **Divider [FS]:** 1 px line, white, **opacity 20 %**, x 80–1360, y 8816.
- **Bottom row [FS]:** left "INNERWISE" **Bold 28** white (y 8857) + "Body • Mind • Inner Wisdom • Habits" Regular 18 white (y 8915); right "Understand yourself. Live better." **Regular 20** white, right-aligned to x 1360 (y 8871). Bottom padding ≈66. [FO]
- No logo mark, social icons, legal links or copyright in the footer. [FS — absent]

---

## 5. Typography

- **Family [FS]:** Roboto only. Weights used: 400 Regular, 400 Italic, 500 Medium, 600 SemiBold, 700 Bold.
- **"auto" line-height** means Figma's font default. For Roboto that renders ≈ **1.17 × font-size** (Bold 50 lines measure 59 px). [INF]

| Role | Weight | Size | Line-height | Letter-spacing | Colour | Where [FS] |
|---|---|---|---|---|---|---|
| Hero H1 | Bold | 50 | auto | 0 | `#FE7209` | Hero headline |
| Section H2 | Bold | 50 | auto | 0 | `#2E2E2E` | All section headings, Rituals banner heading |
| Eyebrow | SemiBold | 16 | 20 px | **8 %** | `#FE7209` | Section eyebrows (typed in CAPS) |
| Hero subhead | SemiBold | 24 | ~120 % (119.5 / 121.6) | 0 | `#2E2E2E` | Hero |
| Hero intro | Medium 24 (+ SemiBold 24 for "Innerwise") | 24 | auto | 0 | `#2E2E2E` + `#FE7209` highlights | Hero tier B |
| Lead / sub | Regular | 24 | auto **or 125 %** | 0 | `#2E2E2E` | Section subs (125 % in Framework, AI Companion) |
| Feature list | Regular | 24 | 125 % | 0 | `#47A3F8` | AI Companion |
| Card title L | SemiBold | 24 | 28 px / auto | 0 | `#2E2E2E` | Discover (2 cards), Explore tiles, FAQ questions |
| Card title M | SemiBold | 22 | 28 px | 0 | `#2E2E2E` | Discover (4 cards) |
| Pillar title | Bold | 24 | auto | 0 | `#2E2E2E` | Framework cards |
| Body | Regular | 16 | 24 px / auto | 0 | `#2E2E2E` | Card descriptions, FAQ answers, labels |
| Text link | SemiBold | 16 | auto | 0 | `#2E2E2E` | "Explore →" links |
| Button | SemiBold | 16 | auto | 0 | `#FFFFFF` / `#FE7209` / `#FAF5F2` | All buttons, Sign In |
| Small title | SemiBold | 16 | 140 % | −2 % | `#2E2E2E` | Quick Reset card titles |
| Meta | Regular | 12 | 140 % | −2 % | `#2E2E2E` | Quick Reset durations |
| Chat bubble | Italic | 12 | 134 % | −2 % | `#2E2E2E` | AI bubbles |
| Disclaimer | Italic | 16 | auto | 0 | `#686868` | AI section |
| Nav / announcement | Medium | 18 | auto | 0 | `#2E2E2E` / `#FFFFFF` | Navbar, announcement |
| Logo wordmark | Medium | 20 | 140 % | 0 | `#000000` | Nav logo |
| Logo tagline | Regular | 10 | auto | 0 | `#000000` | Nav logo |
| Footer heading | SemiBold | 18 | auto | 0 | `#FAF5F2` | Footer |
| Footer link | Regular | 14 | auto | 0 | `#FFFFFF` | Footer |
| Footer wordmark | Bold | 28 | auto | 0 | `#FFFFFF` | Footer |
| Footer taglines | Regular | 18 / 20 | auto | 0 | `#FFFFFF` | Footer |
| Curved text | SemiBold 12 (ls −2 %) / Bold 10 | 12 / 10 | — | — | `#FE7209` / `#47A3F8` | "INNER COMPASS", "MENTAL WELLBEING" (text-on-path) |

- **Hard line breaks** (⏎ in this doc) are typed into many text layers. Reproduce them on desktop. [FS]

---

## 6. Colors

No colour styles/variables exist; names below are descriptive. [FS for hex values]

| Name (descriptive) | HEX | RGB | Where |
|---|---|---|---|
| Primary orange | `#FE7209` | 254, 114, 9 | Hero H1, eyebrows, all filled buttons, outline button, Sign In, intro highlights, FAQ icons, "INNER COMPASS" |
| Ink | `#2E2E2E` | 46, 46, 46 | Body/heading text, footer bg, blurred ground shadows |
| Page cream | `#FAF5F2` | 250, 245, 242 | Page bg, Discover cards, icon fills on gradients, "Explore Habits" text, footer headings, play icon |
| White | `#FFFFFF` | 255, 255, 255 | Nav bg, section bands, cards, button text |
| Black | `#000000` | 0, 0, 0 | Logo text; shadows at 25 % / 65 % |
| Sky blue | `#47A3F8` | 71, 163, 248 | Announcement bg, AI feature list text + icons, dashed orbit, "MENTAL WELLBEING", Quizzes circle |
| Ice blue | `#E9F5FF` | 233, 245, 255 | Discover panel, chat bubbles |
| Peach | `#F9E8DF` | 249, 232, 223 | Rituals banner |
| Placeholder grey | `#C2C2C2` | 194, 194, 194 | Hero video placeholder |
| Mid grey | `#686868` | 104, 104, 104 | Disclaimer text, polaroid shadow |
| Plum | `#7A5495` | 122, 84, 149 | Mascot glow (@76 %), avatar ring, Tiny Experiments circle |
| Sparkle yellow | `#FFCC03` | 255, 204, 3 | Sparkle vectors |
| Magenta | `#CB5A9F` | 203, 90, 159 | Inner Wisdom gradient start, Did You Know circle |
| Green | `#00A654` | 0, 166, 84 | Challenges circle |
| Amber | `#F7B600` | 247, 182, 0 | Tiny Experiments (2) circle |
| Red | `#DE4C3F` | 222, 76, 63 | Quick Practices circle |
| Explore bg blues | `#B2DBFB`, `#BBE0FC`, `#C9E5FF`, `#D8ECFD`, `#ECF6FF` | — | Concentric background |
| Avatar glow | `#91D6FF` @41 % | 145, 214, 255 | AI avatar drop shadow |
| Lotus shadow | `#400702` | 64, 7, 2 | Lotus ground blur |

**Gradients [FS stops; INF angle]**

| Use | Stops |
|---|---|
| MIND card / waveform orb | `#5BBCF7` 26 % → `#19AB4F` 100 % (orb: 0 % → 100 %) |
| BODY card | `#FE7209` 0 % → `#FFCF0B` 88 % |
| INNER WISDOM card | `#CB5A9F` 0 % → `#BE7FEC` 100 % |
| Orange orb | `#FE7209` → `#FFCF0B` |
| Pink orb | `#ED9ECE` → `#BE7FEC` |
| Sunrise orb | `#EB7839` → `#CB5A9F` |
| Logo mark | `#FFEBA7`/`#CF9A28` (linear + radial), dot `#FFDE9B` → `#FE257A` |

---

## 7. Spacing, Radius, Shadows

### 7.1 Containers & alignment [FO]
- **Nav / footer content width:** 1280 (x 80–1360) — 80 px side padding [FS on nav].
- **Discover panel:** 1280 (x 79–1359).
- **Main content column:** most sections align to **x 183 → x 1258** (≈1075 wide): hero text, FAQ items, Approach/FAQ/Final CTA text, video right edge 1259, pillar card right edge 1258.
- **Exceptions:** Rituals banner 1293 wide (x 66), Quick Reset row x 154–1283, Explore grid x 265–1156, AI visual starts x 152.

### 7.2 Recurring spacing values
| Value | Use | Source |
|---|---|---|
| 8 | Button icon gap | FS |
| 10 | AI feature-row gap | FO |
| 12 | Logo mark ↔ wordmark | FS |
| 18 | Gap between the two hero buttons | FO |
| 20 | Nav auto-layout gap; pillar card gap; FAQ item gap; Quick Reset image inset | FS / FO |
| 24 | Nav action gap; button horizontal padding (nav) | FS |
| 28 | Nav link gap | FS |
| 30 | Card grid gaps (Discover, Explore, most Quick Reset); button horizontal padding; card inner top padding | FS / FO |
| 40 | Header → card grid; cards → button | FO |
| 50 | FAQ item side padding | FO |
| 60 | Panel/section inner top/bottom padding (Discover, Explore, Footer, Rituals offset) | FO |
| ~100 | Between sections | FO |

### 7.3 Border radius [FS]
| Radius | Use |
|---|---|
| 100 | Nav "Get Started", hero buttons |
| 29 | All other `Primary CTA` buttons (39 px tall → renders as a full pill, same look as 100) |
| 20 | Hero video placeholder, pillar cards |
| 10 | Discover panel + cards, Rituals banner, Quick Reset cards + images, Explore tiles, FAQ items |
| 50 % | Explore icon circles, avatar badge, orbs |

### 7.4 Shadows & blurs [FS]
| Name | Value | Use |
|---|---|---|
| Card shadow | `0 4px 12px rgba(0,0,0,0.25)` | Discover cards, pillar cards, Rituals banner, Quick Reset cards, FAQ items |
| Bubble shadow | `0 4px 12.6px rgba(0,0,0,0.65)` | AI chat bubbles |
| Avatar glow | `0 0 14.3px rgba(145,214,255,0.41)` | AI avatar |
| Polaroid shadow | `0 0 12.6px rgba(104,104,104,0.78)` | Approach polaroid |
| Layer blurs | 25 (purple glows), 20 / 15.8 (ground shadows), 5.4 (lotus), 4 (orbs) | Illustrations |
| None | — | Explore tiles, Discover panel, nav |

---

## 8. Components (proposed React structure)

Based **only** on what the design repeats. Figma itself has no components. [IR]

```
HomePage
├── PageBackground              (cream + topographic pattern layer)
├── AnnouncementBar
├── Navbar
│   ├── Logo
│   ├── NavLinks
│   └── NavActions              (SignInLink, Button[primary, small])
├── Hero
│   ├── HeroIntro
│   │   ├── HeroContent         (H1, Subhead, ButtonGroup)
│   │   └── InnerCompassBadge
│   └── HeroMediaRow
│       ├── HeroStatement       (rich text with orange highlights)
│       └── HeroMedia           (swappable slot — see §10)
├── DiscoverSection
│   ├── SectionHeader[center]
│   └── NeedCard ×6
├── FrameworkSection
│   ├── SectionHeader[left] + body
│   ├── PillarCard ×3
│   └── RitualsBanner
├── ApproachSection
│   ├── SectionHeader[left] + body + Button
│   └── ApproachIllustration
├── QuickResetSection
│   ├── SectionHeader[center]
│   ├── ResetCard ×4
│   └── Button
├── AICompanionSection
│   ├── CompanionVisual         (PhoneMockup, ChatBubble ×3, AvatarBadge, Sparkles, Disclaimer)
│   └── CompanionContent        (SectionHeader, FeatureList ×3, Button)
├── ExplorePlaySection
│   ├── ConcentricBackground
│   ├── SectionHeader[center]
│   ├── ExploreTile ×6
│   └── Button
├── FAQSection
│   ├── SectionHeader[left]
│   └── FAQAccordion → FAQItem ×6
├── FinalCTASection             (WaveTop, content, CTAIllustration)
└── Footer                      (FooterColumn ×7, Divider, FooterBottom)
```

**Reusable primitives**
- `Button` — variants: `primary` (filled `#FE7209`, white text), `outline` (1 px `#FE7209` border, orange text), `primary-cream-text` (Rituals). Optional trailing chevron. Sizes: nav (130 × 35, padding 8/24), default (39 tall, padding 10/30).
- `Eyebrow`, `SectionHeading`, `SectionHeader` (eyebrow + H2 + optional sub; `align="left|center"`).
- `Container` (content column, see §7.1).
- `TextLink` ("Explore →" style).

---

## 9. Assets

- **Nothing was exported for this spec.** Export from Figma (Dev Mode → select layer → Export, or the Figma asset download). [IR]
- **Rule:** never recreate 3D renders, photos, the wave, the pattern or the mascot in CSS. [User requirement]
- Format guidance [IR]: 3D renders/photos → PNG or WebP @2x; flat vectors/icons → SVG; anything with layer blur (orbs, glows) → PNG, or export the whole illustration group as one image.

| # | Asset (Figma name) | Node | Section | Type | Size (px) | Reusable? | Export? | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | `image 63` (pattern tile) | `1010:9` (+13 copies) | Page bg | Raster | 720 × 1079 | Yes | **Yes, once** | Shown at 10 % opacity; tile it |
| 2 | Logo mark | `1010:40` | Nav | Vector (gradients) | 60 × 34 | Yes | Yes (SVG) | File export setting is JPG@1x — JPG has no transparency [IR: use SVG/PNG] |
| 3 | `cartoon-compass-model-3d-rendering 1` | `1010:67` | Hero badge | Raster | ~71 × 77, rotated 12° | No | Yes | Export badge group `1010:66` incl. curved text, or image + SVG text-path |
| 4 | "INNER COMPASS" text-on-path | `1010:68` | Hero badge | Text path | — | No | Yes (SVG) | CSS can't easily match; export |
| 5 | Play icon (`icons` › Union) | `1010:70` | Hero video | Vector | 70 × 80 | Yes | Yes (SVG) | `#FAF5F2` rounded triangle |
| 6 | `image 24` (sun on cloud) | `1010:84`, `1010:210` | Discover card 1; Approach | Raster | 106 × 96 | Yes (2 uses) | Yes | |
| 7 | `3d-icon-cloudy-night 1` | `1010:90` | Discover card 2 | Raster | 116 × 92 | — | Yes | Rotated 180° in Figma → export the **rendered** node |
| 8 | `3d-render-shiny-yellow-star 1` | `1010:96` | Discover card 3 | Raster | 102 × 98 | — | Yes | |
| 9 | bell speech bubble | `1010:102`, `1010:252`, `1010:212` | Discover 4; Rituals; Approach | Raster | 117×90 / 150×116 / 189×147 | Yes (3 uses) | Yes, largest | |
| 10 | `3d-icon-cloudy-night 4` | `1010:108` | Discover card 5 | Raster | 98 × 83 | — | Yes | Rotated 180° |
| 11 | `magnific__generate-4-custom…` | `1010:114` | Discover card 6 | Raster | 91 × 89 | — | Yes | |
| 12 | Pillar icons (waveform, figure, sun) | `1010:229`, `1010:222`, `1010:236` | Framework cards | Vector | 89×39, 59×64, 58×58 | — | Yes (SVG) | `#FAF5F2` |
| 13 | Approach illustration (whole group) | `1010:121` | Our Approach | Composite | ~652 × 588 | No | **Yes, as one image** [IR] | Contains blurs, dashed orbit, many layers |
| 13a | Meditating mascot | `1010:127` | Approach | Raster | 329 × 458 | — | (if exporting layers) | |
| 13b | Lotus / coin / polaroid photo | `1010:124`, `1010:208`, `1010:218` | Approach | Raster | 108, 77, ~107×85 | — | (if exporting layers) | |
| 14 | Quick Reset photos | `1010:276`, `1010:288`, `1010:300`, `1010:312` | Quick Reset | Raster photos | crop 221 × 197 | — | Yes | Fill/cover inside rounded mask |
| 15 | Book-open icon | `1010:280` etc. | Quick Reset meta | Vector | 18.6 | Yes (×4) | Yes (SVG) | Streamline icon, stroke `#2E2E2E` |
| 16 | Phone mockup with app UI | `1010:329` | AI Companion | Raster | 486 × 639 | No | Yes | UI is part of the image |
| 17 | Chat bubbles (Union shapes) | `1010:356`, `1010:359`, `1010:362` | AI Companion | Vector | ~228×51, 140×51, 228×67 | Yes | Yes (SVG) or CSS shape [IR] | Has tail; text stays live |
| 18 | Avatar mascot | `1010:334` | AI Companion | Raster | 159 × 280 (masked to 200 circle) | — | Yes | |
| 19 | AI feature icons | `1010:337`, `1010:344`, `1010:350` | AI Companion | Vector | ~20 | — | Yes (SVG) | stroke `#47A3F8` |
| 20 | Sparkles | `1010:207`, `1010:213`, `1010:354/355`, `1010:543–545` | Approach, AI, Final CTA | Vector | 39–72 | Yes | Yes (SVG) | `#FFCC03` 4-point stars |
| 21 | Explore icons: book, flask, quiz, flag, play | `1010:395…409` | Explore & Play | Vector | 22–30 tall | — | Yes (SVG) | |
| 22 | FAQ circle icons: minus (expanded) + plus (collapsed) | `1010:434` etc. (minus), `1010:563` (plus) | FAQ | Vector | 30 × 30 | Yes | Yes (SVG, both) | stroke 2 px `#FE7209` |
| 23 | Wave shape | `1010:25` (`1010:26` path) | Final CTA | Vector | 1513 × 333 top curve | No | **Yes (SVG)** | Custom organic curve |
| 24 | Open-arms mascot | `1010:541` | Final CTA | Raster | 376 × 401 | — | Yes | Pair with glow + sparkles |
| 25 | Button chevron | `1010:62` etc. | Buttons | Vector | 4.3 × 8.6, stroke 2 | Yes | Yes (SVG) or icon font [IR] | |

---

## 10. Hero Specification

### 10.1 What Figma shows
The hero is everything between the navbar and the Discover panel (y 105–1414). It has **two tiers** on one continuous background. [FO]

**Background [FS]:** white ellipse `1010:35`, 1835 × 995 at (−197, −198) — creates a white area at the top whose **curved lower edge** reaches ≈ y 797; below it the cream + pattern page background shows.

**Tier A — headline block (left column, x 183)**
| Element | Spec [FS] | Position [FO] |
|---|---|---|
| H1 "Your wellbeing is more than one thing." | Bold 50, auto lh, `#FE7209`, fixed box 511 × 113 → wraps to 2 lines ("Your wellbeing is / more than one thing.") | x 183, y 241 (136 below nav) |
| Subhead "Understand your Body. Clear your Mind. ⏎ Listen to your Inner Wisdom. Build Better Habits." | SemiBold 24, ~120 % lh, `#2E2E2E`, hard break | y 380 (26 below H1 box) |
| Primary button "Begin Your Journey" | 213 × 39, `#FE7209`, radius 100, padding 10/30, gap 8, white SemiBold 16 + white chevron | y 465 (27 below subhead) |
| Secondary button "Explore Innerwise" | 190 × **41**, transparent, 1 px inside stroke `#FE7209`, radius 100, orange SemiBold 16, **chevron hidden** | x 414 (18 gap), y 464 |
| "Inner Compass" badge | 102 × 102 group: compass render (rotated 12°) + curved orange text "INNER COMPASS" (SemiBold 12, ls −2 %) | x 602–704, y 188–290 — **overlaps the top-right corner of the H1 box** |

**Tier B — statement + media**
| Element | Spec [FS] | Position [FO] |
|---|---|---|
| Statement paragraph | 24 px, `#2E2E2E`, box 479 × 112: "**Innerwise**" SemiBold, rest Medium; "wellbeing practices" and "understand yourself" in `#FE7209`; hard break before "create meaningful, sustainable change." | x 183–662, y 1089–1201 |
| **Media placeholder "Video- web"** (`1010:69`) | Frame **520 × 517**, fill `#C2C2C2`, radius **20**, centred play icon 70 × 80 `#FAF5F2` | x 739–1259, y 897–1414 |

- The statement paragraph is vertically centred against the media box (centres 1145 vs 1155). [FO]
- **The right half of Tier A (x ≈ 740–1260, y ≈ 105–897) is empty** apart from the badge. [FO]

### 10.2 What is NOT specified
- Video source, poster, autoplay, loop, mute, controls, click behaviour. [NS]
- Any animation, entrance motion or micro-interaction. [NS]
- Whether the grey box is the "right side of the hero" the interviewer mentioned, or whether a separate visual is intended for the empty top-right area. [NS] → §16, Q1.

### 10.3 Structure so the visual can be swapped later [IR]
- Build the media as its own component, e.g. `HeroMedia`, that owns **only the box**: 520 × 517, radius 20, `overflow: hidden`, placeholder bg `#C2C2C2`.
- Give it one input for content type: placeholder (play icon) now; `<video>` or animation component later. Content should fill the box (`object-fit: cover` for video/images).
- Keep the box's size, aspect ratio (520:517 ≈ 1:1), position and radius in the layout component (`HeroMediaRow`), not inside the content, so replacing the content does not move anything else.
- Keep Tier A and Tier B as separate rows so a visual can later be added to the empty Tier A right column without touching Tier B.
- Do not bake the play icon into a background image; render it as an overlay so it can be removed.

### 10.4 Hero responsive behaviour
- Not specified in Figma. [NS] See §11.

### 10.5 Context: older draft (not a requirement) [INF]
- The superseded frame `802:8` on page "Active" (1440 × 1562) placed the meditating-mascot illustration (now used in "Our Approach") on the **right of the hero**. This hints the empty Tier A right column may once have held a visual. **Do not implement the old draft.**

---

## 11. Responsive Behavior

> **"Responsive behavior is not explicitly specified in the supplied Figma."**

Evidence [FS]: one 1440 px frame only; no tablet/mobile web frames; no constraints beyond defaults; auto-layout only on the nav, announcement and buttons; layout grid hidden; no hidden-per-breakpoint layers; the 360 px frames in the file are **app screens**, not the website.

Observations from the Figma structure — all **[INF]**:
- The nav already uses auto-layout with space-between and 80 px side padding → it was built to stretch horizontally.
- Content mostly sits in a ~1075 px column centred in 1440, and the nav/footer/discover panel in a 1280 px column → a centred max-width container fits the design's intent.
- Two-column sections (Hero tiers, Framework, Approach, AI Companion, Final CTA) have a clear text side and visual side → they are natural candidates to stack.
- Card grids are uniform (3-col, 4-col, 3 × 2) → they can reduce column count.
- Many headings and bodies use typed line breaks tuned for 1440 px; at narrower widths these breaks will look wrong.
- Footer is 7 equal-step columns → will not fit narrow screens as-is.

---

## 12. Interactions

### 12.1 Explicitly shown in Figma
| Item | What Figma shows |
|---|---|
| FAQ accordion states | **Expanded:** all 6 items in the frame are 136 px tall with the answer visible and a **"−" circle icon** (circle + horizontal line). **Collapsed:** one loose item outside the frame (`1010:547` + `1010:548` + `1010:563`, at x 1601 on the canvas): **1075 × 90**, question only, **"+" circle icon** (circle + horizontal & vertical 14 px lines) centred vertically at +30. Same fill, radius and shadow. [FS] |
| Button visuals | Default state only (filled and outline). [FS] |
| Video placeholder | Static play icon over grey box. [FS] |

### 12.2 Not specified
- Prototype links, page navigation, link targets (nav, footer, "Explore →", buttons). [NS]
- Hover / focus / active / disabled states for buttons, links, cards, nav items, FAQ items. [NS]
- FAQ: which items open by default (the frame shows all open, but that may just be for presentation), single vs multiple open, open/close animation. [NS]
- Sticky or scroll-hiding navbar; mobile menu. [NS]
- Carousels/sliders, tabs, modals. [None present]
- Scroll or entrance animations; illustration animation; video playback. [NS]
- Announcement bar dismiss. [NS]

---

## 13. Implementation Guidance

### 13.1 General [IR]
- Treat Figma's absolute positions as the **desktop target** at 1440 px, but build with flex/grid, not absolute positioning, except for decorative layers (pattern, white ellipse, concentric circles, wave, illustration internals).
- Use CSS custom properties for the colours in §6 and the type roles in §5, since Figma has no tokens to import.
- Load Roboto 400, 400 italic, 500, 600, 700.
- Use one centred container for the 1075 px content column and one for the 1280 px nav/footer/panel width; keep the documented exceptions (§7.1).
- Use semantic HTML: `header/nav`, `main` with one `section` per row in §3, `footer`; FAQ as accessible disclosure buttons (`button` + `aria-expanded`).

### 13.2 Making it responsive (decisions you must make — none are Figma requirements) [IR]
- **Breakpoints:** NOT SPECIFIED. Choose content-driven breakpoints (where text/cards stop fitting) and confirm with the interviewer before finalising. Do not present them as design specs.
- **Containers:** max-width + side padding; let the 1440 layout centre on wider screens.
- **Two-column sections:** stack text above visual on narrow screens; keep the visual's aspect ratio.
- **Grids:** Discover 3→2→1, Quick Reset 4→2→1, Explore 3→2→1 columns.
- **Typography:** scale Bold 50 headings down with `clamp()`; allow typed line breaks to collapse on small screens (e.g. render them as optional breaks).
- **Navbar:** collapse links into a menu on narrow screens (no design exists → keep it minimal and on-brand; flag it as your decision).
- **Footer:** wrap 7 columns into fewer columns.
- **Hero media:** keep the 520:517 box, let it scale with width.
- **Decorative layers:** scale or crop the white ellipse, wave and concentric circles with the viewport; keep the pattern tiled.

---

## 14. Design Fidelity Checklist

- [ ] Typography matches (Roboto only; sizes, weights, line-heights, 8 % eyebrow tracking, −2 % on small text)
- [ ] Colors match (§6 hex values; orange `#FE7209`, ink `#2E2E2E`, cream `#FAF5F2`)
- [ ] Section order matches (§3, 12 rows)
- [ ] Spacing matches (~100 px section rhythm; 30 px card gaps; 60 px panel padding)
- [ ] Assets match (exported, not redrawn)
- [ ] Illustrations match (Approach composition, AI phone + bubbles + avatar, Final CTA mascot)
- [ ] Buttons match (pill, 39 px tall, padding 10/30, chevron; nav button 35 tall, padding 8/24; outline variant 41 tall without chevron)
- [ ] Cards match (radius 10, shadow 0 4 12 25 %, Explore tiles **without** shadow)
- [ ] Background patterns match (topographic tile at 10 % opacity over `#FAF5F2`)
- [ ] Curves/shapes match (top white ellipse, Explore concentric circles, Final CTA wave)
- [ ] Navbar matches (80 px padding, link gap 28, actions gap 24)
- [ ] Footer matches (7 columns, 186 px step, 20 % divider, bottom row)
- [ ] FAQ matches (1075 wide, 20 gap, icon at right: "−" expanded 136 px / "+" collapsed 90 px)
- [ ] Hero matches (two tiers, badge overlapping H1, 520 × 517 media box)
- [ ] Responsive behavior matches (nothing specified — document your own choices)
- [ ] No unnecessary redesign
- [ ] Hidden Figma layers are **not** rendered (`1010:65`, `1010:82`, `1010:83`)
- [ ] Rotated images (Discover cards 2 & 5) appear as in Figma
- [ ] Pillar card gradients and label style (Regular 16, dark — not orange eyebrow)
- [ ] "Explore Habits" button text is `#FAF5F2`, not white
- [ ] AI feature list is blue `#47A3F8`, 24 px
- [ ] Chat bubbles overlap the phone edge with strong shadow
- [ ] Footer overlaps the bottom of the wave shape (no gap)
- [ ] Copy reproduced exactly, including typed line breaks and known typos until confirmed (§16)

---

## 15. Implementation Warnings

1. **No tokens/components in Figma.** Values are per-layer; inconsistencies are real. Don't "fix" them silently — follow Figma or get confirmation.
2. **Hero layout is unusual:** the media box is in the *lower* tier beside the statement, not beside the headline; the top-right is empty. Easy to "correct" by mistake.
3. **Badge overlap:** the Inner Compass badge overlaps the H1 box. Position it absolutely relative to the H1/content block.
4. **Curved text** ("INNER COMPASS", "MENTAL WELLBEING") is text-on-path — export as SVG.
5. **Top white ellipse** (1835 × 995, off-canvas) creates the curved white hero area — easy to miss and render as a flat white block.
6. **Pattern** is 10 % opacity tiles; the opaque white bands and shapes must sit **above** it (layer order).
7. **Wave shape** in Final CTA is a custom path — export, don't approximate with border-radius.
8. **Concentric circles** in Explore & Play are hard-edged, centred ≈ (730, 6058), clipped to the section.
9. **Rotated images:** Discover cards 2 and 5 images are rotated 180°; export the rendered result.
10. **Discover cards are inconsistent:** title 24 vs 22, one description at 14 px, different image sizes and text offsets per card.
11. **Quick Reset gaps** are 30/25/30 and card 4's title is centre-aligned while others are left-aligned.
12. **Explore grid** is ~10 px left of page centre; row 2 col 2 duplicates "Tiny Experiments".
13. **Button heights differ:** most 39 px; outline hero button 41 px; nav button 35 px. Radius 100 vs 29 render identically.
14. **Eyebrow vs label:** section eyebrows are orange SemiBold 8 % tracking; pillar/Rituals labels are dark Regular 16 with no tracking.
15. **FAQ card heights:** fixed 136 in Figma whether the answer is 1 or 2 lines; collapsed is 90. Decide hug vs fixed height (§16).
16. **FAQ icon layer names lie:** every icon is named "interface-add-circle…", but the expanded items draw a **minus** and only the collapsed item draws a plus. Check the vectors, not the names.
17. **Illustration groups** (Approach, AI visual, Final CTA) have blurs, glows, dashed orbits and overlapping elements — exporting each group as one image is the safest way to match.
18. **Phone mockup** already contains the chat UI; only the 3 bubbles and avatar sit on top as separate layers.
19. **Logo export setting is JPG** — would lose transparency on the white nav; use SVG/PNG.
20. **1 px gap** between announcement bar and navbar (y 45–46). Decide whether to keep it.
21. **Typed line breaks** in many text layers will break awkwardly when the layout narrows.
22. **"Auto" line-height** in Figma ≠ CSS `normal` in every browser; set explicit line-heights (≈1.17 for Roboto) to match.

---

## 16. Unknowns / Clarifications

**Ask the interviewer:**
1. **Hero visual:** is the grey "Video- web" box (lower tier, beside the statement) the "right side of the hero" that will become a video/animation, or is something intended for the empty top-right area beside the headline?
2. **Video:** source file, poster image, autoplay/loop/mute, controls, click-to-play?
3. **Responsive:** are tablet/mobile designs coming? If not, is the developer free to choose breakpoints and the mobile nav?
4. **Hover/focus states** for buttons, links, cards and nav — any guidance?
5. **FAQ:** default open item(s) (frame shows all open), single vs multiple open, fixed (136) vs content-height items.
6. **Navbar:** sticky? active-page indicator?
7. **Link targets** for nav, footer, buttons and "Explore →" links (or `#` placeholders?).
8. **Inconsistencies — intentional or to normalise?** Discover card title sizes/offsets and 14 px description; Quick Reset 25 px gap and centred card-4 title; Explore grid off-centre; button heights 35/39/41.
9. **Copy to confirm (reproduce as-is until answered):**
   - "Discover the Innwise Approach" (missing "er"?)
   - Inner Wisdom card link reads "Explore Body →"
   - Explore & Play has "Tiny Experiments" twice with the same description
   - "3 Minute" / "5 Minute" vs "30 Seconds"
   - Nav "Organizations" vs footer "For Organisations"
   - Announcement "…& Rituals" vs footer "…Habits"; hero "Build Better Habits" vs final CTA "Build better Habits"
   - Brand spelled "InnerWise" (logo), "Innerwise" (copy), "INNERWISE" (footer)
   - FAQ answer 3 has no closing full stop
10. **Assets:** can the original high-resolution images be provided, or should they be exported from Figma?
11. **1 px gap** under the announcement bar — intentional?

---

## 17. Final Developer Handoff Checklist

- [ ] Open the Figma frame `Desktop - Home` (`1010:8`) on page "Website" in Dev Mode next to this spec
- [ ] Export all assets in §9 (pattern tile once; illustration groups as single images; vectors as SVG)
- [ ] Set up colour + type variables from §5–§6; load Roboto 400/400i/500/600/700
- [ ] Build primitives: Container, Button (primary / outline / cream-text), Eyebrow, SectionHeader, TextLink
- [ ] Build sections in the order of §3, checking each against §4
- [ ] Build `HeroMedia` as a swappable slot (§10.3)
- [ ] Implement FAQ as an accessible disclosure using the 136 / 90 states (§12)
- [ ] Reproduce copy exactly; keep a list of the §16 items pending confirmation
- [ ] Do not render hidden layers; do not add hover/animation/responsive rules as "design" — label them as your decisions
- [ ] Compare at 1440 px against the Figma frame section by section (overlay or side-by-side)
- [ ] Run through §14 Design Fidelity Checklist
- [ ] Send §16 questions to the interviewer before final polish
