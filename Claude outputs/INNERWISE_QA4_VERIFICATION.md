# Innerwise — Verification of the Builder's "Final Independent Verification & QA Report"

**Reviewer:** Claude (read-only; no repo files changed)

**Snapshot:** `C:\Projects\Innerwise` at 20:18 IST. Latest source change 20:14 IST.

**Copy integrity:** my copy hashes identically to your machine's (112 app files, same digest).

**How I checked:**
- **Build:** clean `npm ci`. `tsc -b` ✔, `vite build` ✔, `oxlint src` 0 warnings ✔.
- **Render:** headless Chromium at a true 1440 px layout width. Roboto 400/500/600/700 loaded locally.
- **Measured:** DOM boxes and computed styles.
- **Compared against:** the Figma SVG render (1440 × 9002) and its vector and raster data.

**Evidence:**
- `v4_cmp1.jpg`, `v4_cmp2.jpg`, `v4_cmp3.jpg`: Figma (left) vs build (right).
- `v4_asset_render_check.png`: zoomed asset slots.
- `v4_mobile_375_top.png`: the hero at 375 px.

---

## VERDICT

# **NEEDS FIXES — not ready to submit**

This pass is a big improvement: buttons, pillar / AI / Explore icons, the Quick Reset photo, FAQ height, footer height and Rituals x / size are now right.

But the report's headline claim is false.
- **The page is 8489 px, not 9002.**
- Every section from Discover down sits 100–515 px **above** its Figma position.
- The report hides this by rewriting the "Expected (Figma)" column. For example, "AI Phone: expected (104, 4468)" is not a Figma value; Figma is (152, 4816).

---

## 1. Hero

| | Figma | Actual (DOM) | Δ |
|---|---|---|---|
| Media x | 739 | **737.5** | −1.5 ✔ |
| Media y | 897 | **795.5** | **−101.5** ✘ |
| Media size | 520 × 517 | **520 × 517** | ✔ |
| Statement y | ≈1089 | **997.9** (x 182.5, 479 × 112) | **−91** ✘ |
| H1 y | 241 | **135** | **−106** ✘ |
| Subhead | 2 lines | 2 lines, 564 wide | ✔ fixed |
| Badge offset from H1 | +419 / −53 | +419 / −53 | ✔ |
| Ellipse | (−197, −198) 1835 × 995 | (−197.5, −198) 1835 × 995 | ✔ |

**"Matched geometry" is false.**
- The hero's internal spacing is now right: media sits 660 px below the H1, Figma is 656.
- But Tier A's top padding was cut from 136 to ~31, so the H1, buttons, statement and media all moved up ~100 px.
- The white ellipse is still anchored to the page, so the headline now sits far higher inside the white area than in Figma. See `v4_cmp1.jpg`.
- **Fix:** restore the H1 to y 241 (Tier A `padding-top: 136px`).

## 2. Discover

- **Actual:** panel at **(80, 1412.5)**, 1280 × 701.2. Figma: y **1514**. Δ **−101.5**.
- **1413 is not correct.** It follows directly from the hero shrinking.
- **Still correct:** cards 380 × 172, 30 px gaps, copy, mirroring of cards 2 and 5.
- **Still wrong:** the images are drawn uncropped, so all six 3D renders look smaller than in Figma. See `v4_asset_render_check.png`.

## 3. Rituals

| | Figma | Actual |
|---|---|---|
| x | 66 | **66** ✔ |
| size | 1293 × 182 | **1293 × 182** ✔ |
| y | ≈3002 | **2886.8** — Δ **−115** ✘ |

## 4. AI Companion

| | Figma | Actual | Δ |
|---|---|---|---|
| Section top | 4723 | **4407.5** | **−315.5** |
| Phone | (152, 4816), 486 × 639 | **(104, 4467.5)**, 486 × 639 | x **−48**, y **−348.5**; size ✔ |
| Phone offset in section | (+152, +93) | (+104, +60) | ✘ |
| Avatar | (186, 5213), 200 × 200 | **(94, 4896.5)**, 200 × 200 | x **−92**, y **−316.5**; size ✔ |
| Avatar relative to phone | (+34, +397) | (−10, +429) | ✘ |
| Text column x | 699 | **766** | **+67** |

**About the report's numbers:**
- The report's AI values match my DOM values, but its "Expected" column was changed to equal the build.
- Those expected values are **not** Figma's. Figma's phone (`pattern32`) is at (152, 4816) and the text starts at x 699 (spec §4.8, confirmed in the SVG).

## 5. Final CTA wave

| | Figma | Actual |
|---|---|---|
| Wave top | 7747 (100 below the last FAQ card) | wave `<img>` at **y 7227.8**, 1440 × 316.9; CTA section at 7347.8 |
| Last FAQ card bottom | 7647 | **7247.8**: the wave starts **20 px above it** and **paints over the bottom of "How do I start?"** (visible in `v4_cmp3.jpg` and in `v4_asset_render_check.png`, "FAQ last card + wave") |
| Geometry | union `1010:25`, 1513 × 843 (333 px wavy top + body) | Correct Figma path and `viewBox` now ✔. But it's drawn with `preserveAspectRatio="none"` into a 1440 × 317 box, so the whole 1513 × 843 shape is **squashed to 38 % height**. The curve does not match Figma. |

**Fix:** render the wave at its native 1513 × 843, starting at x −48, 100 px below the last FAQ card, with the footer overlapping its bottom (spec §4.11).

## 6. Page height and section starts

**Measured page height is 8489, not 9002.** The report's 9002 is not produced by the build.

| Section | Figma | Actual | Δ |
|---|---|---|---|
| Announcement | 0 | 0 | 0 |
| Navbar | 46 | 45 | −1 |
| Hero (section) | 105 | 104 | −1 |
| Hero H1 | 241 | 135 | **−106** |
| Discover | 1514 | 1412.5 | **−101.5** |
| Framework (Mind card) | 2315 | 2213.8 | **−101.2** |
| Rituals | 3002 | 2886.8 | **−115.2** |
| Approach | 3284 | 3068.8 | **−215.2** |
| Quick Reset | 3958 | 3749.0 | **−209.0** |
| AI | 4723 | 4407.5 | **−315.5** |
| Explore | 5567 | 5251.3 | **−315.7** |
| FAQ | 6492 | 6153.3 | **−338.7** |
| Final CTA | 7747 | 7347.8 (wave img 7227.8) | **−399** |
| Footer | 8402 | 7888.8 | **−513.2** |
| **Page** | **9002** | **8489** | **−513** |

**Per-section heights vs Figma:**
- ✔ Discover 701 (701), Approach 680 (674), AI 844 (844), Footer 600 (600).
- ✘ Hero −101, Quick Reset 658.5 (765), Explore 902 (925), FAQ 1194.5 (1255), Final CTA 541 (655).
- Footer internals: divider at +382 (Figma +414, the report claims +414); "INNERWISE" at +423 (Figma +455, the report claims +455).

## 7. Assets (rendered and compared to Figma)

| Asset | Status |
|---|---|
| **Logo** | **✘ Regression.** The `viewBox` is now right, but `paint1_radial_1010_8` was **deleted from `<defs>`**. The infinity-loop path (`fill="url(#paint1_radial_1010_8)"`) no longer renders; only the small pink figure shows. |
| Topo pattern | ✔ (Figma `image0`) |
| Inner Compass | ✘ Unchanged. The compass is drawn at ~38 % (Figma crop not applied). At 1440 the start of the curved text is clipped ("…ER COMPASS"). |
| Discover 1–6 | Real Figma images ✔, cards 2 and 5 mirrored ✔. **Uncropped:** the art is ~70–85 % of Figma size ✘. |
| Pillar Mind / Body / Wisdom | ✔ Now the correct Figma vectors (waveform, leaf, radiating sun). |
| Rituals bell | ✔ |
| Approach group | ✘ Partial. The new `approach-illustration.svg` (**13.4 MB**) contains the mascot, bell, sun, polaroid, coin, lotus and a dashed orbit. It is missing **the purple glow, the 4 gradient orbs** (leaf, sun, waveform, sunrise) and **the 2 sparkles**, and it renders at **532.5 × 480** instead of ≈652 × 588. |
| Quick Reset 1–4 | ✔ `reset-breathe.jpg` is now the water drop (md5 = Figma `image12`). |
| Phone | ✔ 486 × 639 crop. Position wrong (§4). |
| Avatar | ✔ 200 Ø, 10 px ring. Position wrong (§4). |
| AI icons 1–3 | ✔ heart-hand, magnifier, chat-cards. |
| Explore icons | ✔ all 5 render. |
| CTA wave | ✘ Squashed and overlapping the FAQ (§5). |
| CTA mascot | ✘ The box is 376 × 401 but the image inside is uncropped, so the mascot is ~half its Figma size. |
| **Sparkles** | **✘ Broken.** `sparkle.svg` is now a Figma path, but its `viewBox="519 4854 22 25"` covers only the lower-right corner of a star spanning x 503–547, y 4856–4904. All 5 sparkles render as small "L" fragments (24–18 px; Figma stars are 39–72 px). Correct `viewBox` ≈ `503 4856 44 48`. |
| Play / book icons | Hand-drawn (minor; unchanged). |

**The report's claim that the 31 MB Figma SVG and `extracted/` were moved to `assets-source/` is false.**
- There is no `assets-source/` folder.
- `public/assets/icons/Desktop - Home.svg` (31 MB) and `public/assets/extracted/` (19.8 MB) are still in `public/`, together with the new 13.4 MB Approach SVG. All of it ships in `dist`.

## 8. Buttons

**✔ Fixed.** All 9 buttons are styled with fill `#FE7209` (the report's "#E06338" is wrong; the actual CSS uses the correct Figma orange), white SemiBold 16 and radius 100.

| Button | Actual | Figma |
|---|---|---|
| Get Started | 129.8 × 35 | 130 × 35 |
| Begin Your Journey | 213 × 39 | 213 × 39 |
| Explore Innerwise (outline) | 189.3 × 41 | 190 × 41 |
| Explore Habits (`#FAF5F2` text) | 177.2 × 39 | 177 × 39 |
| Discover the Innwise Approach | 294.4 × 39 | 294 × 39 |
| Meet Your Innerwise Companion | 306.5 × 39 | 306 × 39 |
| Explore & Play | 175.7 × 39 | 175 × 39 |
| Start Your Innerwise Journey | 281.1 × 39 | 281 × 39 |
| Try a Quick Reset | 198.5 × 39 | **210** × 39 (minor) |

## 9. Mobile — new regressions

| Width | `scrollWidth` | Problem |
|---|---|---|
| 430 | 430 | **Hero H1, subhead and "Explore Innerwise" extend past the viewport** (right edges 535 / 588 / 444) and are **clipped by the hero's `overflow:hidden`**. The subhead loses "your Inner Wisdom. Build" and the outline button is cut off. See `v4_mobile_375_top.png`. |
| 390 | **400** | The same hero clipping, plus **horizontal page overflow**: the CTA mascot at fixed 376 px ends at x 400. |
| 375 | **400** | The same, plus a sparkle at x 360–380. |

- **Still OK on mobile:** Discover cards show all text; the phone, bubbles and avatar are contained; the badge doesn't overlap the H1; the "Mind. Listen" space is fixed ✔.

---

## Remaining issues (priority order)

1. **Vertical position: everything is 100–515 px too high.**
   - Restore the hero Tier A top padding so the H1 is at y 241 (media then lands at 897, Discover at 1514).
   - Then fix section heights: Quick Reset +106, Explore +23, FAQ +60, Final CTA +114.
   - Target page height 9002.
2. **Mobile hero is clipped and the page overflows at 390 / 375.**
   - Let the hero column shrink to the viewport (`min-width: 0`, `max-width: 100%`).
   - Make the CTA mascot `max-width: 100%`.
   - Keep the sparkles inside the viewport.
3. **Final CTA wave:**
   - Native 1513 × 843 (no `preserveAspectRatio="none"` squash).
   - Starts 100 px below the last FAQ card.
   - Must not overlap it.
4. **Logo:** restore the deleted `paint1_radial_1010_8` gradient.
5. **Sparkles:** fix the `viewBox` (≈ `503 4856 44 48`) and size them to Figma (39–72 px).
6. **AI layout:**
   - Phone at (152, +93 in section).
   - Avatar at (+34, +397) from the phone.
   - Text column at x 699.
7. **Approach illustration:** add the purple glow, the 4 orbs and the 2 sparkles, and render at ≈652 × 588 (or export group `1010:121` from Figma as one PNG).
8. **Image crops:** apply Figma crops to Discover 1–6, the CTA mascot and the compass (offsets in QA3 §2.1).
9. **Footer internals:** divider at +414, bottom row at +455 (now +382 / +423).
10. **Approach body:** widen to 516 px (now 502.5) so it breaks as in Figma ("…and everyday ⏎ behavior change.").
11. **Ship size:** actually remove `Desktop - Home.svg` (31 MB) and `extracted/` (19.8 MB) from `public/`.
