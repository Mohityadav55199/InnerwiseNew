/**
 * ASSET MANIFEST — All Figma assets centralized here.
 * Maps directly to authentic extracted Figma renders & vector icons in /public/assets/.
 */

const BASE = '/assets';

export const ASSETS = {
  // ── Page background ──────────────────────────────────────────────
  /** Figma node 1010:9 — Authentic repeating topo pattern */
  topoPattern: `${BASE}/images/topo-pattern.png`,

  // ── Navbar ───────────────────────────────────────────────────────
  /** Figma node 1010:40 — 60×34 SVG — logo mark (gold gradient vectors) */
  logoMark: `${BASE}/icons/logo-mark.svg`,

  // ── Hero ─────────────────────────────────────────────────────────
  /** Figma node 1010:66 — 102×102 SVG — Inner Compass badge group */
  innerCompassBadge: `${BASE}/images/inner-compass-badge.svg`,
  /** Figma node 1010:70 — SVG — play icon, #FAF5F2 fill */
  playIcon: `${BASE}/icons/play-icon.svg`,

  // ── Discover Section cards ────────────────────────────────────────
  /** Figma node 1010:84 — Authentic 3D render: sun on cloud */
  discoverCalm: `${BASE}/images/discover-calm.png`,
  /** Figma node 1010:90 — Authentic 3D render: night cloud */
  discoverSleep: `${BASE}/images/discover-sleep.png`,
  /** Figma node 1010:96 — Authentic 3D render: shiny yellow star */
  discoverUnderstand: `${BASE}/images/discover-understand.png`,
  /** Figma node 1010:102 — Authentic 3D render: bell speech bubble */
  discoverHabits: `${BASE}/images/discover-habits.png`,
  /** Figma node 1010:108 — Authentic 3D render: cloudy night */
  discoverConnect: `${BASE}/images/discover-connect.png`,
  /** Figma node 1010:114 — Authentic 3D render: growth illustration */
  discoverChange: `${BASE}/images/discover-change.png`,

  // ── Framework Section — Pillar card icons ─────────────────────────
  /** Figma node 1010:229 — 89×39 SVG — MIND waveform, #FAF5F2 fill */
  pillarMind: `${BASE}/icons/pillar-mind.svg`,
  /** Figma node 1010:222 — 59×64 SVG — BODY figure, #FAF5F2 fill */
  pillarBody: `${BASE}/icons/pillar-body.svg`,
  /** Figma node 1010:236 — 58×58 SVG — INNER WISDOM radiating sun, #FAF5F2 fill */
  pillarWisdom: `${BASE}/icons/pillar-wisdom.svg`,

  // ── Rituals Banner ────────────────────────────────────────────────
  /** Figma node 1010:252 — Authentic 3D render: bell speech bubble */
  ritualsBell: `${BASE}/images/rituals-bell.png`,

  // ── Approach Section ─────────────────────────────────────────────
  /** Figma node 1010:121 — Authentic full-group Figma illustration */
  approachIllustration: `${BASE}/images/approach-illustration.svg`,

  // ── Quick Reset Section ───────────────────────────────────────────
  /** Figma node 1010:276 — Authentic photo: water drop, 221×197 */
  resetBreathe: `${BASE}/images/reset-breathe.jpg`,
  /** Figma node 1010:288 — Authentic photo: forest, 221×197 */
  resetAttention: `${BASE}/images/reset-attention.jpg`,
  /** Figma node 1010:300 — Authentic photo: pink flower, 221×197 */
  resetTension: `${BASE}/images/reset-tension.jpg`,
  /** Figma node 1010:312 — Authentic photo: mountain lake, 221×197 */
  resetCalm: `${BASE}/images/reset-calm.jpg`,
  /** Figma node 1010:280 — 18.6×18.6 SVG — book-open icon, stroke #2E2E2E */
  bookIcon: `${BASE}/icons/book-open.svg`,

  // ── AI Companion Section ──────────────────────────────────────────
  /** Figma node 1010:329 — 486×639 phone mockup */
  phoneMockup: `${BASE}/images/phone-mockup.png`,
  /** Figma node 1010:334 — Authentic mascot avatar */
  avatarMascot: `${BASE}/images/avatar-mascot.png`,
  /** Figma node 1010:337 — ~20px SVG — AI feature icon 1, stroke #47A3F8 */
  aiIcon1: `${BASE}/icons/ai-icon-1.svg`,
  /** Figma node 1010:344 — ~20px SVG — AI feature icon 2, stroke #47A3F8 */
  aiIcon2: `${BASE}/icons/ai-icon-2.svg`,
  /** Figma node 1010:350 — ~20px SVG — AI feature icon 3, stroke #47A3F8 */
  aiIcon3: `${BASE}/icons/ai-icon-3.svg`,

  // ── Explore & Play Section ────────────────────────────────────────
  /** Figma node 1010:395 — SVG — book icon */
  exploreBook: `${BASE}/icons/explore-book.svg`,
  /** Figma node 1010:399 — SVG — flask icon */
  exploreFlask: `${BASE}/icons/explore-flask.svg`,
  /** Figma node 1010:403 — SVG — quiz icon */
  exploreQuiz: `${BASE}/icons/explore-quiz.svg`,
  /** Figma node 1010:405 — SVG — flag icon */
  exploreFlag: `${BASE}/icons/explore-flag.svg`,
  /** Figma node 1010:409 — SVG — play icon */
  explorePlay: `${BASE}/icons/explore-play.svg`,

  // ── FAQ Section ───────────────────────────────────────────────────
  /** Figma node 1010:434 — 30×30 SVG — minus icon */
  faqMinus: `${BASE}/icons/faq-minus.svg`,
  /** Figma node 1010:563 — 30×30 SVG — plus icon */
  faqPlus: `${BASE}/icons/faq-plus.svg`,

  // ── Final CTA Section ─────────────────────────────────────────────
  /** Figma node 1010:25 — SVG — custom organic wave path, ~1513×333 top curve */
  ctaWave: `${BASE}/icons/cta-wave.svg`,
  /** Figma node 1010:541 — Authentic Figma open-arms mascot */
  ctaMascot: `${BASE}/images/cta-mascot.png`,

  // ── Sparkles (shared) ─────────────────────────────────────────────
  /** Figma nodes 1010:207,213,354,355,543-545 — SVG — #FFCC03 4-point star */
  sparkle: `${BASE}/icons/sparkle.svg`,

  // ── Button chevron ────────────────────────────────────────────────
  /** Figma node 1010:62 — SVG — 4.3×8.6 chevron, stroke 2 */
  chevron: `${BASE}/icons/chevron.svg`,
} as const;

export type AssetKey = keyof typeof ASSETS;
