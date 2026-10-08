import React from 'react';
import Button from '../../primitives/Button';
import { HERO_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

// ── Inner Compass Badge ──────────────────────────────────────────────
// Positioned relative to H1 (+419px right, -53px top) per Figma spec §4.3 & §10.2
const InnerCompassBadge: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: '419px',
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
      width={102}
      height={102}
      style={{ width: '102px', height: '102px', display: 'block' }}
    />
  </div>
);

// ── Play Icon ────────────────────────────────────────────────────────
const PlayIcon: React.FC = () => (
  <img
    src={ASSETS.playIcon}
    alt=""
    width={70}
    height={80}
    style={{ width: '70px', height: '80px', display: 'block' }}
  />
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
      backgroundColor: '#C2C2C2',
      borderRadius: '20px',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}
    role={type === 'placeholder' ? undefined : 'region'}
    aria-label={type !== 'placeholder' ? 'Hero media' : undefined}
  >
    {type === 'placeholder' && (
      <div
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-hidden="true"
      >
        <PlayIcon />
      </div>
    )}
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
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      paddingTop: '31px',
      position: 'relative',
      zIndex: 1,
    }}
  >
    {/* Left Column (x = 183 at 1440px desktop) */}
    <div style={{ position: 'relative', width: '564px', maxWidth: '100%' }}>
      <InnerCompassBadge />
      <h1
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(32px, 3.47vw, 50px)',
          lineHeight: 1.17,
          color: '#FE7209',
          maxWidth: '511px',
          margin: 0,
        }}
      >
        Your wellbeing is<br />more than one thing.
      </h1>

      {/* Subhead: exactly 564px wide in 2 lines with space before break */}
      <p
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 600,
          fontSize: 'clamp(16px, 1.67vw, 24px)',
          lineHeight: '120%',
          color: '#2E2E2E',
          marginTop: '26px',
          width: '564px',
          maxWidth: '100%',
          marginBottom: 0,
        }}
      >
        Understand your Body. Clear your Mind.{' '}
        <br className="hero-subhead-break" />
        Listen to your Inner Wisdom. Build Better Habits.
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '27px', flexWrap: 'wrap' }}>
        <Button variant="primary" href={HERO_LINKS.beginJourney} showChevron>
          Begin Your Journey
        </Button>
        <Button variant="outline" href={HERO_LINKS.exploreInnerwise}>
          Explore Innerwise
        </Button>
      </div>
    </div>

    {/* Right — intentionally empty reserved slot per Figma spec */}
    <div aria-hidden="true" />
  </div>
);

// ── Hero Tier B — statement + media ──────────────────────────────────
const HeroTierB: React.FC = () => (
  <div
    className="hero-tier-b"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '40px',
      paddingTop: '392px',
      paddingBottom: '0',
      position: 'relative',
      zIndex: 1,
    }}
  >
    {/* Statement paragraph — 479px width with restored 'more deeply' copy at y ≈ 1089 */}
    <p
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontSize: 'clamp(15px, 1.67vw, 24px)',
        lineHeight: 1.17,
        color: '#2E2E2E',
        maxWidth: '479px',
        margin: 0,
        flexShrink: 0,
      }}
    >
      <strong style={{ fontWeight: 600 }}>Innerwise</strong>
      {' '}
      <span style={{ fontWeight: 500 }}>brings together </span>
      <span style={{ fontWeight: 500, color: '#FE7209' }}>wellbeing practices</span>
      <span style={{ fontWeight: 500 }}> and everyday tools to help you </span>
      <span style={{ fontWeight: 500, color: '#FE7209' }}>understand yourself</span>
      <span style={{ fontWeight: 500 }}> more deeply and<br />create meaningful, sustainable change.</span>
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
      paddingBottom: '0',
    }}
    aria-label="Hero"
  >
    {/* White ellipse: 1835×995, anchored to create curved boundary at y ≈ 797 */}
    <div className="hero-ellipse" aria-hidden="true" />

    {/* 1075px Content Container (x = 183 to 1258 at 1440px desktop) */}
    <div
      className="hero-container"
      style={{
        maxWidth: '1075px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'content-box',
      }}
    >
      <HeroTierA />
      <HeroTierB />
    </div>

    <style>{`
      @media (max-width: 1123px) {
        .hero-container {
          box-sizing: border-box !important;
          padding: 0 24px !important;
        }
      }
      @media (max-width: 1024px) {
        .hero-tier-a { grid-template-columns: 1fr !important; padding-top: 60px !important; }
        .hero-tier-a > div:last-child { display: none !important; }
        .hero-tier-b { flex-direction: column !important; align-items: flex-start !important; gap: 32px !important; padding-top: 60px !important; }
        .hero-tier-b > p { max-width: 100% !important; }
        .hero-tier-b > div { width: 100% !important; max-width: 520px !important; }
        .hero-badge { position: relative !important; left: 0 !important; top: 0 !important; margin-bottom: 16px !important; }
      }
      @media (max-width: 768px) {
        .hero-subhead-break { display: none; }
        .hero-tier-b > div { height: 300px !important; }
      }
    `}</style>
  </section>
);

export default Hero;
