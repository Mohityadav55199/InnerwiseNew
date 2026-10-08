import React from 'react';
import Button from '../../primitives/Button';
import { FRAMEWORK_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

interface PillarCardProps {
  label: string;
  title: string;
  tags: string;
  linkText: string;
  linkHref: string;
  gradient: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  iconLeft: number;
  iconTop: number;
  height: number;
  /** Figma corner radii (the card paths use elliptical corners, rx / ry) */
  radius: string;
  /** gap below the title — Figma spaces Mind's tags 5px further from the title than Body/Wisdom */
  titleGap: number;
  /** Figma's Body link starts 3px right of the other two cards' links */
  linkShift?: number;
}

const PillarIcon: React.FC<{ src: string; alt: string; width: number; height: number; left: number; top: number }> = ({ src, alt, width, height, left, top }) => (
  <div className="pillar-icon" style={{ position: 'absolute', left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` }} aria-hidden="true">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ width: `${width}px`, height: `${height}px`, objectFit: 'contain', display: 'block' }}
    />
  </div>
);

const PillarCard: React.FC<PillarCardProps> = ({ label, title, tags, linkText, linkHref, gradient, iconSrc, iconAlt, iconWidth, iconHeight, iconLeft, iconTop, height, radius, titleGap, linkShift = 0 }) => (
  <div
    style={{
      background: gradient,
      borderRadius: radius,
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      height: `${height}px`,
      position: 'relative',
      overflow: 'hidden',
    }}
    className="pillar-card"
  >
    <PillarIcon src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} left={iconLeft} top={iconTop} />
    {/* Text column at card +148; label +30, title +59, tags +93, link +149 */}
    <div className="pillar-text" style={{ paddingTop: '30px', paddingLeft: '148px', paddingRight: '24px' }}>
      {/* Label: Regular 16, dark — NOT orange, NOT eyebrow (spec §15 warning 14) */}
      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '16px', color: '#2E2E2E', lineHeight: '19px', margin: '0 0 10px' }}>
        {label}
      </p>
      <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '24px', color: '#2E2E2E', lineHeight: '28px', margin: `0 0 ${titleGap}px` }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: '#2E2E2E', margin: '0 0 8px', whiteSpace: 'pre-line' }}>
        {tags}
      </p>
      <a
        href={linkHref}
        className="pillar-link"
        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '19px', color: '#2E2E2E', display: 'inline-block', marginLeft: linkShift ? `${linkShift}px` : undefined }}
      >
        {linkText}
      </a>
    </div>
  </div>
);

const PILLAR_CARDS: PillarCardProps[] = [
  {
    label: 'MIND', title: 'Know Your Mind',
    tags: 'Explore thoughts • Stress • Emotions • Focus •\nRelationships and mental clarity',
    linkText: 'Explore Mind →', linkHref: FRAMEWORK_LINKS.exploreMind,
    gradient: 'linear-gradient(151.15deg, #5BBCF7 30.18%, #19AB4F 115.01%)', // Figma paint28
    radius: '17.05px / 22.81px', titleGap: 4,
    iconSrc: ASSETS.pillarMind, iconAlt: '', iconWidth: 88, iconHeight: 38, iconLeft: 30, iconTop: 89, height: 198,
  },
  {
    label: 'BODY', title: 'Know Your Body',
    tags: 'Energy • Sleep • Movement • Body signals •\nBreath • Nutrition • Integrative healing',
    linkText: 'Explore Body →', linkHref: FRAMEWORK_LINKS.exploreBody,
    gradient: 'linear-gradient(156.9deg, #FE7209 -55.18%, #FFCF0B 69.07%)', // Figma paint27
    radius: '17.05px / 22.46px', titleGap: -1, linkShift: 3,
    iconSrc: ASSETS.pillarBody, iconAlt: '', iconWidth: 58.6, iconHeight: 63.6, iconLeft: 44.7, iconTop: 63.7, height: 195,
  },
  {
    // Link text "Explore Body →" on Wisdom card is reproduced as-is from Figma (known inconsistency, spec §16 Q9)
    label: 'INNER WISDOM', title: 'Know Your Inner Wisdom',
    tags: 'Values • Meaning • Intuition • Reflection •\nSelf-awareness and Inner signals',
    linkText: 'Explore Body →', linkHref: FRAMEWORK_LINKS.exploreBody,
    gradient: 'linear-gradient(157.58deg, #CB5A9F 6.38%, #BE7FEC 112.62%)', // Figma paint29
    radius: '17.05px / 22.35px', titleGap: -0.2,
    iconSrc: ASSETS.pillarWisdom, iconAlt: '', iconWidth: 58, iconHeight: 58, iconLeft: 44.7, iconTop: 66, height: 194,
  },
];

const RitualsBanner: React.FC = () => (
  <div
    style={{
      backgroundColor: '#F9E8DF',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'flex-start',
      padding: '0 81px 0 9px',
      height: '182px',
      width: '1293px',
      maxWidth: '100%',
      boxSizing: 'border-box',
    }}
    className="rituals-banner"
  >
    {/* Bell image — Figma node 1010:252, 150×116 at banner (+9, +36) */}
    <div style={{ width: '150px', height: '116px', flexShrink: 0, marginTop: '36px' }} aria-hidden="true" className="rituals-bell">
      <img
        src={ASSETS.ritualsBell}
        alt=""
        width={150}
        height={116}
        style={{ width: '150px', height: '116px', display: 'block' }}
      />
    </div>

    <div style={{ flex: 1, minWidth: 0, marginLeft: '12px', paddingTop: '30px' }} className="rituals-text">
      {/* Label: Regular 16, dark — not orange eyebrow */}
      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '19px', color: '#2E2E2E', margin: '0 0 10px' }}>RITUALS</p>
      <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3.47vw, 50px)', color: '#2E2E2E', lineHeight: 1.17, margin: '0 0 6.5px' }}>
        Shape your everyday life.
      </h3>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: 'clamp(15px, 1.67vw, 24px)', color: '#2E2E2E', lineHeight: 1.17, margin: 0 }}>
        Understand your patterns and build routines that support lasting wellbeing.
      </p>
    </div>

    {/* Button text and chevron: #FAF5F2 (cream), not white — per spec §4.5 */}
    <div style={{ flexShrink: 0, marginTop: '72px' }} className="rituals-cta">
      <Button variant="creamText" href={FRAMEWORK_LINKS.exploreHabits} showChevron>
        Explore Habits
      </Button>
    </div>
  </div>
);

const FrameworkSection: React.FC = () => (
  <section style={{ margin: '100px 0 0', padding: '0 0 100px' }} aria-labelledby="framework-heading">
    {/* 1075px Content Container (x = 183 to 1258 at 1440px desktop) */}
    <div
      className="framework-inner"
      style={{
        maxWidth: '1075px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'content-box',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 524px',
        gap: '40px',
        alignItems: 'start',
      }}
    >
      {/* Left: text (x = 183, max-width 471px); eyebrow at y 2513 = card stack top + 198 */}
      <div style={{ maxWidth: '471px', marginTop: '198px' }} className="framework-text">
        <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '20px', letterSpacing: '0.08em', color: '#FE7209', textTransform: 'uppercase', marginBottom: '20px' }}>
          THE INNERWISE FRAMEWORK
        </p>
        <h2 id="framework-heading" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.47vw, 50px)', lineHeight: 1.17, color: '#2E2E2E', marginBottom: '11px', maxWidth: '419px' }}>
          Three dimensions.<br />One whole you.
        </h2>
        <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: 'clamp(15px, 1.67vw, 24px)', lineHeight: '125%', color: '#2E2E2E', margin: 0 }}>
          Your wellbeing isn't divided into separate boxes. Your body affects your mind.{' '}
          <br className="framework-break" />
          Your thoughts influence your habits.{' '}
          <br className="framework-break" />
          Your experiences shape your inner world.
        </p>
      </div>

      {/* Right: 3 pillar cards stacked, 524px wide, ending at x = 1258 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '524px' }}>
        {PILLAR_CARDS.map((card) => <PillarCard key={card.label} {...card} />)}
      </div>
    </div>

    {/* Rituals banner: 1293px wide positioned at x = 66 on 1440px desktop */}
    <div style={{ maxWidth: '1440px', margin: '60px auto 0', width: '100%', paddingLeft: '66px', paddingRight: '81px', boxSizing: 'border-box' }} className="rituals-wrap">
      <RitualsBanner />
    </div>

    <style>{`
      .pillar-link:hover { opacity: 0.7; }
      .pillar-link:focus-visible { outline: 2px solid #2E2E2E; outline-offset: 2px; border-radius: 2px; }
      @media (max-width: 1123px) {
        .framework-inner {
          box-sizing: border-box !important;
          padding: 0 24px !important;
        }
      }
      @media (max-width: 1341px) {
        .rituals-wrap {
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
        .rituals-banner {
          width: 100% !important;
        }
      }
      @media (max-width: 1024px) {
        .framework-inner { grid-template-columns: minmax(0, 1fr) !important; gap: 40px !important; }
        .framework-text { margin-top: 0 !important; }
        .framework-break { display: none; }
        .pillar-card { height: auto !important; min-height: 194px; padding-bottom: 24px; }
      }
      @media (max-width: 1123px) {
        .rituals-banner { height: auto !important; min-height: 182px; padding: 24px 32px 24px 9px !important; align-items: center !important; }
        .rituals-bell, .rituals-cta { margin-top: 0 !important; }
        .rituals-text { padding-top: 0 !important; }
      }
      @media (max-width: 768px) {
        .rituals-banner { flex-direction: column !important; align-items: flex-start !important; padding: 24px !important; gap: 16px; }
        .rituals-text { margin-left: 0 !important; }
        .pillar-icon { position: static !important; margin: 24px 0 0 24px; }
        .pillar-text { padding: 12px 24px 0 24px !important; }
      }
    `}</style>
  </section>
);

export default FrameworkSection;
