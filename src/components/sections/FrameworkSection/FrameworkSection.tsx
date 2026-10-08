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
}

const PillarIcon: React.FC<{ src: string; alt: string; width: number; height: number }> = ({ src, alt, width, height }) => (
  <div style={{ width: '148px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ width: `${width}px`, height: `${height}px`, objectFit: 'contain', display: 'block' }}
    />
  </div>
);

const PillarCard: React.FC<PillarCardProps> = ({ label, title, tags, linkText, linkHref, gradient, iconSrc, iconAlt, iconWidth, iconHeight }) => (
  <div
    style={{
      background: gradient,
      borderRadius: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      minHeight: '195px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}
    className="pillar-card"
  >
    <PillarIcon src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} />
    <div style={{ paddingTop: '28px', paddingBottom: '20px', paddingRight: '24px', flex: 1 }}>
      {/* Label: Regular 16, dark — NOT orange, NOT eyebrow (spec §15 warning 14) */}
      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '16px', color: '#2E2E2E', lineHeight: 1.17, margin: '0 0 8px' }}>
        {label}
      </p>
      <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '24px', color: '#2E2E2E', lineHeight: 1.17, margin: '0 0 8px' }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: '#2E2E2E', margin: '0 0 12px', whiteSpace: 'pre-line' }}>
        {tags}
      </p>
      <a
        href={linkHref}
        className="pillar-link"
        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, fontSize: '16px', color: '#2E2E2E' }}
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
    gradient: 'linear-gradient(152deg, #5BBCF7 26%, #19AB4F 100%)',
    iconSrc: ASSETS.pillarMind, iconAlt: '', iconWidth: 89, iconHeight: 39,
  },
  {
    label: 'BODY', title: 'Know Your Body',
    tags: 'Energy • Sleep • Movement • Body signals •\nBreath • Nutrition • Integrative healing',
    linkText: 'Explore Body →', linkHref: FRAMEWORK_LINKS.exploreBody,
    gradient: 'linear-gradient(152deg, #FE7209 0%, #FFCF0B 88%)',
    iconSrc: ASSETS.pillarBody, iconAlt: '', iconWidth: 59, iconHeight: 64,
  },
  {
    // Link text "Explore Body →" on Wisdom card is reproduced as-is from Figma (known inconsistency, spec §16 Q9)
    label: 'INNER WISDOM', title: 'Know Your Inner Wisdom',
    tags: 'Values • Meaning • Intuition • Reflection •\nSelf-awareness and Inner signals',
    linkText: 'Explore Body →', linkHref: FRAMEWORK_LINKS.exploreBody,
    gradient: 'linear-gradient(152deg, #CB5A9F 0%, #BE7FEC 100%)',
    iconSrc: ASSETS.pillarWisdom, iconAlt: '', iconWidth: 58, iconHeight: 58,
  },
];

const RitualsBanner: React.FC = () => (
  <div
    style={{
      backgroundColor: '#F9E8DF',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      marginTop: '48px',
      display: 'flex',
      alignItems: 'center',
      padding: '24px 50px 24px 20px',
      gap: '20px',
      minHeight: '182px',
      height: '182px',
      width: '1293px',
      maxWidth: '100%',
      boxSizing: 'border-box',
    }}
    className="rituals-banner"
  >
    {/* Bell image — Figma node 1010:252, 150×116 */}
    <div style={{ width: '150px', height: '116px', flexShrink: 0 }} aria-hidden="true">
      <img
        src={ASSETS.ritualsBell}
        alt=""
        width={150}
        height={116}
        style={{ width: '150px', height: '116px', objectFit: 'contain', display: 'block' }}
      />
    </div>

    <div style={{ flex: 1 }}>
      {/* Label: Regular 16, dark — not orange eyebrow */}
      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '16px', color: '#2E2E2E', margin: '0 0 8px' }}>RITUALS</p>
      <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3.47vw, 50px)', color: '#2E2E2E', lineHeight: 1.17, margin: '0 0 12px' }}>
        Shape your everyday life.
      </h3>
      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: 'clamp(15px, 1.67vw, 24px)', color: '#2E2E2E', lineHeight: 1.17, margin: 0 }}>
        Understand your patterns and build routines that support lasting wellbeing.
      </p>
    </div>

    {/* Button text and chevron: #FAF5F2 (cream), not white — per spec §4.5 */}
    <div style={{ flexShrink: 0 }}>
      <Button variant="creamText" href={FRAMEWORK_LINKS.exploreHabits} showChevron>
        Explore Habits
      </Button>
    </div>
  </div>
);

const FrameworkSection: React.FC = () => (
  <section style={{ padding: '100px 0 0' }} aria-labelledby="framework-heading">
    {/* 1075px Content Container (x = 183 to 1258 at 1440px desktop) */}
    <div
      className="framework-inner"
      style={{
        maxWidth: '1075px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'content-box',
        display: 'grid',
        gridTemplateColumns: '1fr 524px',
        gap: '40px',
        alignItems: 'center',
      }}
    >
      {/* Left: text (x = 183, max-width 471px) */}
      <div style={{ maxWidth: '471px' }}>
        <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '20px', letterSpacing: '0.08em', color: '#FE7209', textTransform: 'uppercase', marginBottom: '8px' }}>
          THE INNERWISE FRAMEWORK
        </p>
        <h2 id="framework-heading" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.47vw, 50px)', lineHeight: 1.17, color: '#2E2E2E', marginBottom: '32px', maxWidth: '419px' }}>
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
    <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', paddingLeft: '66px', paddingRight: '66px', boxSizing: 'border-box' }} className="rituals-wrap">
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
        .framework-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
        .framework-break { display: none; }
      }
      @media (max-width: 768px) {
        .rituals-banner { flex-direction: column !important; padding: 24px !important; height: auto !important; }
      }
    `}</style>
  </section>
);

export default FrameworkSection;
