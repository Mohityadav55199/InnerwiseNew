import React from 'react';
import Button from '../../primitives/Button';
import { HERO_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';
import HeroVisual from './HeroVisual';
import HeroScene from './HeroScene';

// ── Inner Compass Badge ──────────────────────────────────────────────
// Positioned relative to H1 (+419px right, -53px top) per Figma spec §4.3 & §10.2
const InnerCompassBadge: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: '372px', /* follows "Your wellbeing is" at the 44px headline */
      top: '-53px',
      width: '102px',
      height: '102px',
      pointerEvents: 'none',
      zIndex: 2,
    }}
    className="hero-badge"
  >
    <img
      src={ASSETS.innerCompassBadge}
      alt=""
      width={79}
      height={82}
      style={{ position: 'absolute', left: '18px', top: '6px', width: '79px', height: '82px', display: 'block' }}
    />
  </div>
);

// ── HeroMedia — swappable slot ────────────────────────────────────────
export interface HeroMediaProps {
  type?: 'placeholder' | 'video' | 'custom';
  videoSrc?: string;
  posterSrc?: string;
  children?: React.ReactNode;
}

export const HeroMedia: React.FC<HeroMediaProps> = ({
  type = 'placeholder',
  videoSrc,
  posterSrc,
  children,
}) => (
  <div
    style={{
      width: '520px',
      height: '517px',
      maxWidth: '100%',
      background: type === 'placeholder' ? '#161616' : '#C2C2C2',
      borderRadius: type === 'placeholder' ? '28px' : '20px',
      boxShadow: type === 'placeholder' ? '0 30px 60px -24px rgba(46, 46, 46, 0.45)' : undefined,
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}
    data-reveal="right"
    data-reveal-delay={120}
    role={type === 'placeholder' ? undefined : 'region'}
    aria-label={type !== 'placeholder' ? 'Hero media' : undefined}
  >
    {type === 'placeholder' && <HeroScene videoSrc={videoSrc} posterSrc={posterSrc} />}
    {type === 'video' && videoSrc && (
      <video
        src={videoSrc}
        poster={posterSrc}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        controls
      />
    )}
    {type === 'custom' && children}
  </div>
);

// ── Hero Tier A — headline block ──────────────────────────────────────
const HeroTierA: React.FC = () => (
  <div
    className="hero-tier-a"
    style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 564px) minmax(0, 1fr)',
      gap: '40px',
      paddingTop: '150px', /* H1 box at y 271 (Figma rev. 2: nav 46–121, headline +30) */
      position: 'relative',
      zIndex: 1,
    }}
  >
    {/* Left Column (x = 183 at 1440px desktop) */}
    <div style={{ position: 'relative', width: '100%', maxWidth: '564px', minWidth: 0 }}>
      <InnerCompassBadge />
      <h1
        data-reveal="left"
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(30px, 3.06vw, 44px)',
          lineHeight: 1.17, /* Figma line pitch 58.5px (box 241 → 358) */
          color: '#2E2E2E',
          maxWidth: '511px',
          margin: 0,
        }}
      >
        Your wellbeing is<br /><span style={{ color: '#FE7209' }}>more than one thing.</span>
      </h1>

      {/* Subhead: exactly 564px wide in 2 lines with space before break */}
      <p
        data-reveal="left"
        data-reveal-delay={120}
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 600,
          fontSize: 'clamp(16px, 1.39vw, 20px)',
          lineHeight: 1.5,
          color: '#2E2E2E',
          marginTop: '22px', /* keeps the subhead box at y 380 */
          maxWidth: '564px',
          marginBottom: 0,
        }}
      >
        Understand your Body. Clear your Mind.{' '}
        <br className="hero-subhead-break" />
        Listen to your Inner Wisdom. Build Better Habits.
      </p>

      {/* Buttons */}
      <div data-reveal="left" data-reveal-delay={240} style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '40px', flexWrap: 'wrap' }}>
        <Button variant="primary" href={HERO_LINKS.beginJourney} showChevron>
          Begin Your Journey
        </Button>
        <Button variant="outline" href={HERO_LINKS.exploreInnerwise}>
          Explore Innerwise
        </Button>
      </div>
    </div>

    {/* Right — the Figma's reserved slot: decorative illustration, positioned so it never changes the hero's height */}
    <div className="hero-visual-cell" data-reveal="right" data-reveal-delay={200} style={{ position: 'relative', minWidth: 0 }}>
      <HeroVisual />
    </div>
  </div>
);

// ── Hero Tier B — statement + media ──────────────────────────────────
const HeroTierB: React.FC = () => (
  <div
    className="hero-tier-b"
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '40px',
      paddingTop: '348px', /* media box stays at y 897 */
      paddingBottom: '0',
      position: 'relative',
      zIndex: 1,
    }}
  >
    {/* Statement paragraph — 479px wide, first line box at y 1119 */}
    <p
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontSize: 'clamp(16px, 1.39vw, 20px)',
        lineHeight: 1.5,
        color: '#2E2E2E',
        maxWidth: '479px',
        margin: '222px 0 0',
        flexShrink: 1,
        minWidth: 0,
      }}
      className="hero-statement"
      data-reveal="left"
    >
      <strong style={{ fontWeight: 600 }}>Innerwise</strong>
      {' '}
      <span style={{ fontWeight: 500 }}>brings together </span>
      <span style={{ fontWeight: 500, color: '#FE7209' }}>wellbeing practices</span>
      <span style={{ fontWeight: 500 }}> and everyday tools to help you </span>
      <span style={{ fontWeight: 500, color: '#FE7209' }}>understand yourself</span>
      <span style={{ fontWeight: 500 }}> more deeply and{' '}<br className="hero-statement-break" />create meaningful, sustainable change.</span>
    </p>

    {/* HeroMedia slot — 520×517 right-aligned at (739, 897) */}
    <HeroMedia type="placeholder" />
  </div>
);

// ── Hero — main section ───────────────────────────────────────────────
const Hero: React.FC = () => (
  <section
    style={{
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: '30px', /* Discover panel at y 1544 */
    }}
    aria-label="Hero"
  >
    {/* White ellipse: 1835×995, anchored to create curved boundary at y ≈ 797 */}
    <div className="hero-ellipse" aria-hidden="true" />

    {/* 1075px Content Container (x = 183 to 1258 at 1440px desktop) */}
    <div
      className="hero-container"
      style={{
        margin: '0 var(--g-fixed)',   /* content edge = navbar logo edge */
      }}
    >
      <HeroTierA />
      <HeroTierB />
    </div>

    <style>{`
      @media (max-width: 1399px) {
        .hero-statement-break { display: none; }
      }
      /* One column from 1179px down: the illustration drops under the buttons */
      @media (max-width: 1179px) {
        .hero-container { margin: 0 var(--page-gutter) !important; }
        .hero-tier-a { grid-template-columns: minmax(0, 1fr) !important; padding-top: 96px !important; }
        .hero-tier-b { padding-top: 56px !important; }
        .hero-tier-b > p { margin-top: 0 !important; }
        /* "Your wellbeing is" ends ≈ 8.2 × the headline size — the badge follows it as on desktop */
        .hero-badge { left: min(calc(max(30px, min(44px, 3.06vw)) * 8.2), calc(100% - 87px)) !important; top: -78px !important; transform: scale(0.85); transform-origin: top left; }
      }
      @media (max-width: 1024px) {
        .hero-tier-b { flex-direction: column !important; align-items: flex-start !important; gap: 32px !important; padding-top: 60px !important; }
        .hero-tier-b > p { max-width: 100% !important; margin-top: 0 !important; }
        .hero-tier-b > div { width: 100% !important; max-width: 520px !important; }
      }
      @media (max-width: 768px) {
        .hero-subhead-break { display: none; }
        .hero-tier-b > div { height: 300px !important; }
      }
    `}</style>
  </section>
);

export default Hero;
