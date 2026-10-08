/**
 * ASSET MANIFEST — every asset below is rendered directly from the Figma
 * "Desktop - Home" frame (1010:8). Rasters were exported at 2x with Figma's
 * own crop / mirror / blur already applied (layer-isolated, transparent
 * background); vectors are the original Figma paths with tight viewBoxes.
 * Comments give the Figma node and the frame-relative position (x, y, w × h).
 */

const BASE = '/assets';

export const ASSETS = {
  // ── Page background ──────────────────────────────────────────────
  /** image 63 (pattern tile) 720×1079 — pre-flattened at Figma's 10 % opacity over #FAF5F2 */
  topoPattern: `${BASE}/images/topo-pattern.webp`,

  // ── Navbar ───────────────────────────────────────────────────────
  /** 1010:40 — logo mark, 3 gradient vectors, 60×34 at (80, 58.5) */
  logoMark: `${BASE}/icons/logo-mark.svg`,

  // ── Hero ─────────────────────────────────────────────────────────
  /** 1010:66 — Inner Compass badge (compass render + curved text), 79×82 at (620, 194) */
  innerCompassBadge: `${BASE}/images/inner-compass-badge.webp`,
  /** 1010:70 — play icon, #FAF5F2, 70×80 */
  playIcon: `${BASE}/icons/play-icon.svg`,

  // ── Discover cards (frame size = Figma frame, crop & mirror baked in) ──
  /** 1010:84 — sun on cloud, 106×96 */
  discoverCalm: `${BASE}/images/discover-calm.webp`,
  /** 1010:90 — moon & cloud (mirrored in Figma), 116×92 */
  discoverSleep: `${BASE}/images/discover-sleep.webp`,
  /** 1010:96 — star, 102×98 */
  discoverUnderstand: `${BASE}/images/discover-understand.webp`,
  /** 1010:102 — bell speech bubble, 117×90 */
  discoverHabits: `${BASE}/images/discover-habits.webp`,
  /** 1010:108 — speech bubbles (mirrored in Figma), 98×83 */
  discoverConnect: `${BASE}/images/discover-connect.webp`,
  /** 1010:114 — butterfly, 91×89 */
  discoverChange: `${BASE}/images/discover-change.webp`,

  // ── Framework pillar icons (Figma vectors, #FAF5F2) ──────────────
  /** 1010:229 — MIND waveform, 88×38 */
  pillarMind: `${BASE}/icons/pillar-mind.svg`,
  /** 1010:222 — BODY leaf, 58.6×63.6 */
  pillarBody: `${BASE}/icons/pillar-body.svg`,
  /** 1010:236 — INNER WISDOM radiating sun, 58×58 */
  pillarWisdom: `${BASE}/icons/pillar-wisdom.svg`,

  // ── Rituals banner ───────────────────────────────────────────────
  /** 1010:252 — bell speech bubble, 150×116 */
  ritualsBell: `${BASE}/images/rituals-bell.webp`,

  // ── Our Approach ─────────────────────────────────────────────────
  /** 1010:121 — complete illustration group (glow, orbit, 4 orbs, mascot, bell, sun,
   *  polaroid, coin, lotus, sparkles, ground shadow), 631×567 at (702, 3355) */
  approachIllustration: `${BASE}/images/approach-illustration.webp`,

  // ── Quick Reset (221×197 masked photos, rounded corners baked in) ──
  /** 1010:276 — water drop */
  resetBreathe: `${BASE}/images/reset-breathe.webp`,
  /** 1010:288 — forest */
  resetAttention: `${BASE}/images/reset-attention.webp`,
  /** 1010:300 — pink flower */
  resetTension: `${BASE}/images/reset-tension.webp`,
  /** 1010:312 — mountain lake */
  resetCalm: `${BASE}/images/reset-calm.webp`,
  /** 1010:280 — book-open icon, 18.64×18.64 */
  bookIcon: `${BASE}/icons/book-open.svg`,

  // ── AI Companion ─────────────────────────────────────────────────
  /** 1010:329 — phone mockup, Figma crop, 486×639 at (152, 4816) */
  phoneMockup: `${BASE}/images/phone-mockup.webp`,
  /** ground shadow under the phone (blurred ellipse), 343×90 at (292, 5369) */
  phoneShadow: `${BASE}/images/phone-shadow.webp`,
  /** 1010:334 — mascot masked to the avatar circle (transparent bg, drawn over the ring), 200×200 at (186, 5213) */
  avatarMascot: `${BASE}/images/avatar-mascot.webp`,
  /** 1010:356 / 359 / 362 — chat-bubble shapes incl. drop shadow (text stays live HTML) */
  bubble1: `${BASE}/images/bubble-1.webp`,
  bubble2: `${BASE}/images/bubble-2.webp`,
  bubble3: `${BASE}/images/bubble-3.webp`,
  /** 1010:337 / 344 / 350 — feature icons, stroke #47A3F8 */
  aiIcon1: `${BASE}/icons/ai-icon-1.svg`,
  aiIcon2: `${BASE}/icons/ai-icon-2.svg`,
  aiIcon3: `${BASE}/icons/ai-icon-3.svg`,
  /** 1010:354 — 4-point star sparkle #FFCC03, 68×73 */
  sparkleStar: `${BASE}/icons/sparkle-star.svg`,
  /** 1010:355 — thin sparkle #FFCC03, 44×48 */
  sparkleThin: `${BASE}/icons/sparkle-thin.svg`,

  // ── Explore & Play icons ─────────────────────────────────────────
  exploreBook: `${BASE}/icons/explore-book.svg`,
  exploreFlask: `${BASE}/icons/explore-flask.svg`,
  exploreQuiz: `${BASE}/icons/explore-quiz.svg`,
  exploreFlag: `${BASE}/icons/explore-flag.svg`,
  explorePlay: `${BASE}/icons/explore-play.svg`,

  // ── FAQ ──────────────────────────────────────────────────────────
  /** 1010:434 — minus (expanded) */
  faqMinus: `${BASE}/icons/faq-minus.svg`,
  /** 1010:563 — plus (collapsed) */
  faqPlus: `${BASE}/icons/faq-plus.svg`,

  // ── Final CTA ────────────────────────────────────────────────────
  /** 1010:25 — white union with organic wavy top, native 1513×843 at (−48, 7747) */
  ctaWave: `${BASE}/icons/cta-wave.svg`,
  /** 1010:539 — art group (glow + open-arms mascot + 3 sparkles), 411×421 at (846, 7895) */
  ctaArt: `${BASE}/images/cta-art.webp`,
} as const;

export type AssetKey = keyof typeof ASSETS;
