# Innerwise Homepage — Final Independent Verification

**Reviewer:** Claude (read-only; nothing in the repo was changed)

**Snapshot:** `C:\Projects\Innerwise` at 20:00 IST.

**Key finding first:** the app has **not changed** since my QA3 snapshot (19:42 IST).
- I hashed all 112 app files (`src/`, `public/`, configs) on your machine and in my copy, and both hash sets are identical.
- The only new or changed files are two measurement scripts in `scripts/` (`measure-dom.cjs`, `measure-1440.cjs`).
- So the "final pass" report describes the same code that QA3 failed.
- I still rebuilt and re-measured everything from scratch: clean `npm ci`, `tsc -b` ✔, `vite build` ✔, `oxlint src` ✔ (0 warnings). Rendered in headless Chromium with Roboto loaded locally. Measured the DOM, not screenshots.

**Evidence:**
- `final_cmp1.jpg`, `final_cmp2.jpg`, `final_cmp3.jpg`: Figma (left) vs current build (right), 1440.
- `final_svg_files_standalone.png`: every icon SVG rendered on its own.
- `qa3_assets_vectors_in_page.png` and `qa3_assets_rasters_crop.png` from QA3 still apply, because the files are unchanged.

---

## VERDICT

# **NEEDS FIXES — not ready to submit**

---

## 1. The builder's claims, checked

| Claim | Measured (1440 layout width) | Result |
|---|---|---|
| All 36 assets are authentic Figma assets | 19 rasters are byte-identical to the Figma embeds ✔. But 9 SVGs render **blank**, 1 photo is the **wrong image**, 1 icon is the **wrong node**, Approach is 1 layer of ~15, crops and mirroring are not applied, and 5 small icons are hand-drawn (§3) | **FALSE** |
| Discover copy restored | All strings, line breaks and per-card sizes match (§4) | **TRUE** |
| Content column x = 183 | H1, statement, Framework, Approach, FAQ and CTA text at x 182.5 | **TRUE** |
| Hero media (739, 897), 520 × 517 | (737.5, **921.3**), 520 × 517 | **FALSE** (y +24) |
| Discover starts y 1514 | **1638.3** | **FALSE** (+124) |
| Rituals 1293 × 182 | (73.5, **3224.6**), 1293 × **194.5** | **FALSE** |
| AI phone 486 × 639 | 486 × **724.4** at (104, 4997.5) | **FALSE** |
| Final wave starts y 7747 | Wave `<img>` box at y **8131**, and the wave **does not render** (broken `viewBox`) | **FALSE** |
| Footer starts y 8402 | **8811.2**, height **548.8** | **FALSE** |
| Page effectively 9002 | **9360** | **FALSE** (+358) |
| Zero mobile overflow | `scrollWidth === innerWidth` at 430 / 390 / 375, even with `overflow-x:hidden` removed | **TRUE** |

### The two contradictions in the builder's own table

The builder reports media at (730, 921) and Rituals at (66, 3225).

**I reproduced both numbers exactly by turning on Chromium's 15 px scrollbar.** The scrollbar narrows the layout to **1425 px**, and centred content shifts left by 7.5 px:

| | Layout 1440 (no scrollbar) | Layout 1425 (15 px scrollbar, builder's setup) | Figma |
|---|---|---|---|
| Hero media | (737.5, 921.3) | **(730, 921.3)** | (739, 897) |
| Rituals banner | (73.5, 3224.6) | **(66, 3224.6)** | (66, 3002) |

- **Rituals x = 66 is a coincidence.** A 1293 px banner centred in 1425 px happens to land on 66. At a true 1440 width it is at 73.5. Figma's banner is off-centre; the build centres it.
- **The y values are real errors in both setups.** Media is 24 px low: the hero subhead wraps to 3 lines. Rituals is 223 px low: section paddings are doubled.
- **Conclusion:** the builder's own measurements disprove its claims of (739, 897) and y ≈ 3002.

---

## 2. Desktop geometry (1440)

| Item | Expected (Figma) | Actual | Δ / status |
|---|---|---|---|
| Hero start | 105 | 104 | −1 (1 px bar gap not reproduced; spec allows either) |
| Hero end (media bottom) | 1414 | 1438.3 | +24 |
| Ellipse | 1835 × 995 at (−197, −198) | 1835 × 995 at (−197.5, −198) | ✔ |
| H1 x | 183 | 182.5 | ✔ |
| Badge offset from H1 | +419 / −53 | +419 / −53 | ✔ (box only; art wrong, §3) |
| Hero subhead | 2 lines | **3 lines** (box 517.5 wide) | ✘ |
| Media | (739, 897), 520 × 517 | (737.5, **921.3**), 520 × 517 | ✘ y |
| Statement | (183, ≈1089) | (182.5, 1123.7), 479 × 112, centred on media | ✘ y (follows media) |
| Discover panel | x 79, y 1514, 1280 wide | x 80, y **1638.3**, 1280 × 701 | ✘ y |
| Discover cards | 380 × 172, gaps 30 | 380 × 172, gaps 30 / 30 | ✔ |
| Mind card top | ≈2315 | **2539.6** | +225 |
| Pillar cards x | 734 → 1258 | 733.5 → 1257.5 | ✔ |
| Rituals | x 66, y ≈3002, 1293 × 182 | x **73.5**, y **3224.6**, 1293 × **194.5** | ✘ |
| Approach band | y ≈3284, h ≈674 | y **3519.1**, h **625.9** | ✘ |
| Approach illustration | ≈652 × 588 (full group) | 532.5 × 299.5 (mascot only) | ✘ |
| Quick Reset | y ≈3958 | **4145** | ✘ |
| AI band | y ≈4723 | **4897.5** (h 1029 vs 844) | ✘ |
| Phone | (152, 4816), 486 × 639 | (**104**, **4997.5**), 486 × **724.4** | ✘ |
| Avatar | 200 × 200 at (186, 5213) | 200 × 200 at (**94**, **5512**) | size ✔, position ✘ |
| AI text column | x 699 | x **766** | ✘ |
| Explore | y ≈5567 | **5926.7** | ✘ |
| Explore tiles | x 265 / 572 / 879, 277 × 215 | x 264.5 / 571.5 / 878.5, 277 × 215 | ✔ |
| FAQ section | y ≈6492 | **6938.7** | ✘ |
| FAQ items | x 183, 1075 wide, 136 tall, 20 gaps | x 182.5, 1075 wide, **150** tall (5 of 6; 1-line item 136), 20 gaps | height ✘ |
| Final CTA | y ≈7747, actual Figma wave | section **8251.2**; wave `<img>` at 8131, **invisible** | ✘ |
| CTA mascot | 376 × 401 | 320 × 340 (uncropped) | ✘ |
| Footer | y ≈8402, 600 tall | **8811.2**, **548.8** tall | ✘ |
| Page | 9002 | **9360** | +358 |

---

## 3. Asset authenticity (files opened, rendered and compared to the Figma SVG)

**Classes:** A = actual extracted Figma artwork · B = faithful conversion · C = recreation.

| Asset | File | Class | As rendered |
|---|---|---|---|
| Logo | `icons/logo-mark.svg` | A (3 Figma paths + gradients) | **FAIL.** `viewBox="90 58 35 25"` shows only x 90–125 of a mark spanning 80–140 × 58.5–92.5, so both ends of the infinity loop are cut off |
| Topo pattern | `images/topo-pattern.png` | A (md5 = `image0`) | **PASS** |
| Inner Compass | `images/inner-compass-badge.svg` | B (real `image1` + real text path) | **FAIL.** Compass drawn at ~38 % (Figma crop not applied) |
| Discover 1–6 | `images/discover-*.png` | A (`image2–7`) | **FAIL.** Figma crop not applied, so the art is ~70–85 % size. Cards 2 and 5 are **not mirrored** as in Figma |
| Pillar Mind | `icons/pillar-mind.svg` | A path | **FAIL — blank** (bad `viewBox`) |
| Pillar Body | `icons/pillar-body.svg` | A path (leaf) | **FAIL — blank** (bad `viewBox`) |
| Pillar Wisdom | `icons/pillar-wisdom.svg` | A paths, **wrong node** (Approach sunrise orb `1010:194`) | **FAIL.** Should be radiating sun `1010:236` |
| Rituals bell | `images/rituals-bell.png` | A (`image5`) | **PASS** |
| Approach illustration | `images/approach-illustration.png` | A, but only the mascot layer (`image9`) | **FAIL.** Glow, orbit, 4 orbs, bell, sun, polaroid, coin, lotus and sparkles are missing |
| Quick Reset 1 | `images/reset-breathe.jpg` | A, **wrong image** (`image11` = Approach polaroid photo) | **FAIL.** Should be the water drop, `image12`. Alt text says "Water droplet" |
| Quick Reset 2–4 | `images/reset-{attention,tension,calm}.jpg` | A (`image13–15`) | **PASS** |
| Phone mockup | `images/phone-mockup.png` | A (`image16`) | **FAIL.** Uncropped, 486 × 724 |
| Avatar | `images/avatar-mascot.png` | A (`image17`) | **PASS** (position wrong, §2) |
| AI icon 1 / 3 | `icons/ai-icon-1.svg`, `ai-icon-3.svg` | A paths | **FAIL — blank** |
| AI icon 2 | `icons/ai-icon-2.svg` | A | **PASS** |
| Explore book / flask / quiz / flag | `icons/explore-*.svg` | A paths | **FAIL — blank** (5 tiles show an empty coloured circle) |
| Explore play | `icons/explore-play.svg` | A | **PASS** |
| CTA wave | `icons/cta-wave.svg` | A (union path `1010:25`) | **FAIL — blank.** Mispositioned at 8131, 20 px over the last FAQ card |
| CTA mascot | `images/cta-mascot.png` | A (`image18`) | **FAIL.** Uncropped, 320 × 340 vs 376 × 401 |
| Sparkles | `icons/sparkle.svg` | **C** (hand-drawn 24 px star) | **FAIL.** Not the Figma `#FFCC03` star vectors |
| Play icon | `icons/play-icon.svg` | **C** (close) | Minor |
| Book icon | `icons/book-open.svg` | **C** | Minor |

**Summary:** 7 slots pass. 9 SVG files render nothing at all (see `final_svg_files_standalone.png`). The builder's claim "no hand-drawn approximations remain" is false: sparkle, play, book, chevron and the FAQ icons are hand-drawn. The FAQ icons are acceptable.

---

## 4. Discover copy

| | Figma | Build | |
|---|---|---|---|
| H2 | What would feel better right now? | same | ✔ |
| Sub | "…Sometimes you need clarity. ⏎ Sometimes you simply need to understand what's happening within you." | same, break after "clarity." | ✔ |
| 1 | Feel Calmer **24** / "Manage stress, overwhelm ⏎ and racing thoughts." 16 | same | ✔ |
| 2 | Sleep Better **24** / "Create better sleep and recovery routines." 16 | same | ✔ |
| 3 | Understand Myself **22** / "Explore your thoughts, emotions and patterns." 16 | same | ✔ |
| 4 | Build Better Habits **22** / "Create routines that ⏎ support the life you want." 16 | same | ✔ |
| 5 | Feel More Connected **22** / "Strengthen relationships, communication and belonging." **14** | same | ✔ |
| 6 | Grow Through Change **22** / "Navigate uncertainty, transitions and new beginnings." 16 | same | ✔ |

- **Minor:** description line-height is 20 px (Figma 24). Text left offsets are 148 / 146 / 148 / 148 / 136 / 136 (Figma 154 / 179 / 163 / 154 / 140 / 121).
- **Whole page:** all 170 Figma strings are present and there is no extra copy.

---

## 5. Vertical rhythm (1440)

| Section | Expected | Actual | Difference |
|---|---|---|---|
| Announcement | 0 | 0 | 0 |
| Navbar | 46 | 45 | −1 |
| Hero | 105 | 104 | −1 |
| Discover (panel) | 1514 | 1638.3 | **+124** |
| Framework (Mind card) | 2315 | 2539.6 | **+225** |
| Rituals | 3002 | 3224.6 | **+223** |
| Approach | 3284 | 3519.1 | **+235** |
| Quick Reset | 3958 | 4145.0 | **+187** |
| AI Companion | 4723 | 4897.5 | **+175** |
| Explore | 5567 | 5926.7 | **+360** |
| FAQ | 6492 | 6938.7 | **+447** |
| Final CTA | 7747 | 8251.2 | **+504** |
| Footer | 8402 | 8811.2 | **+409** |
| Page end | 9002 | 9360 | **+358** |

**Causes:**
- Adjacent sections each add 100 px padding, giving 200 px gaps:
  - Hero bottom 100 + Discover top 100 (`Hero.tsx:201`).
  - Discover bottom 100 + Framework top 100.
- Hero subhead wraps to 3 lines (+24).
- AI section is +185 tall: uncropped phone and paddings of 100 / 120.
- Explore is +87 tall: paddings of 100 / 120 vs Figma's 60 / 60.
- FAQ items are 150 tall instead of 136.
- Final CTA is −95 short.
- Footer is −51 short: divider at +386 vs +414; bottom row at +417 vs +455.

---

## 6. Mobile (430 / 390 / 375)

| Check | 430 | 390 | 375 |
|---|---|---|---|
| `scrollWidth === innerWidth` (with `overflow-x:hidden` removed) | 430 ✔ | 390 ✔ | 375 ✔ |
| Content (img / text / buttons) outside the viewport | none ✔ | none ✔ | none ✔ |
| Clipped containers | only decorative layers (hero ellipse, Explore circles) ✔ | same ✔ | same ✔ |
| Discover text fully inside its cards | 6 / 6 ✔ | 6 / 6 ✔ | 6 / 6 ✔ |
| Phone contained | x 24–406 ✔ | 24–366 ✔ | 24–351 ✔ |
| AI bubbles / avatar contained; avatar clear of disclaimer | ✔ (56 px gap) | ✔ | ✔ |
| Hero badge contained, not covering H1 | ✔ | ✔ | ✔ |
| Hero subhead text | "Clear your **Mind.Listen** to…" ✘ | ✘ | ✘ |
| Buttons usable | rendered as unstyled text ✘ | ✘ | ✘ |

- **Accessibility:** unchanged since QA3. Drawer Escape and focus return ✔; FAQ `aria-expanded` / `aria-controls` / mounted panels ✔; focus ring ✔.

---

## 7. Remaining issues (priority order)

1. **All 10 buttons are unstyled.** The `.btn`, `.btn-primary`, `.btn-outline`, `.btn-cream-text` and `.btn-nav` rules are missing from `src/index.css`. Restore them (exact CSS in QA3 §1.1).
2. **9 SVG icons render blank and the logo is cropped.** Fix the `viewBox` values:
   - pillar-mind `764 2404 88 38`
   - pillar-body `778.7 2596.7 58.6 63.6`
   - ai-icon-1 `698 5176 20.55 20.56`
   - ai-icon-3 `698 5255 21.96 22`
   - explore-book `387 5932 32.39 32`
   - explore-flask `696 5932 28.04 32`
   - explore-quiz `1003 5932 27.2 32`
   - explore-flag `393 6177 25.23 32`
   - cta-wave `-48 7747 1513 843`
   - logo-mark `80 58.54 60 33.92`
3. **Wrong artwork:**
   - `reset-breathe.jpg` must be `image12` (water drop).
   - The Inner Wisdom icon must be node `1010:236`.
   - The Approach illustration must be the whole group `1010:121` exported as one image (≈652 × 588).
4. **Apply Figma crops and mirroring:**
   - Discover 1–6 (mirror cards 2 and 5).
   - Phone 486 × 639.
   - CTA mascot 376 × 401.
   - Compass in the badge.
   - Simplest route: export each node from Figma as PNG @2x. The exact offsets are in QA3 §2.1.
5. **Vertical rhythm (page 9360 → 9002):**
   - Remove the doubled 100 px section paddings.
   - Widen the hero subhead column to ≥ 564 px (2 lines) so the media lands at y 897.
   - AI: text column to x 699, phone at (152, 4816), avatar at (186, 5213).
   - Explore paddings to 60 / 60.
   - FAQ items to 136.
   - Wave at y 7747, after the 100 px gap and not overlapping the FAQ.
   - Footer to 600: divider +414, bottom row +455.
6. **Rituals banner:** x 66 at 1440 (Figma is off-centre), height 182 (now 194.5).
7. **Sparkles:** replace the hand-drawn `sparkle.svg` with the Figma star vectors (`1010:207`, `1010:213`, `1010:354/355`, `1010:543–545`) at their Figma sizes.
8. **≤ 768 px:** "Clear your Mind.Listen" — add a space before the hidden `<br class="hero-subhead-break">`.
9. **Ship size:** remove the 31 MB `public/assets/icons/Desktop - Home.svg` and the 19.8 MB `public/assets/extracted/` from `public/`. Both are copied into `dist`.
