import React from 'react';
import { DISCOVER_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

interface NeedCardProps {
  id: string;
  title: string;
  titleSize: number;
  description: string;
  descriptionSize: number;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageLeftOffset: number;
  imageTopOffset: number;
  textLeftOffset: number;
  href: string;
}

const NeedCard: React.FC<NeedCardProps> = ({
  title,
  titleSize,
  description,
  descriptionSize,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageLeftOffset,
  imageTopOffset,
  textLeftOffset,
  href,
}) => (
  <div
    className="need-card"
    style={{
      backgroundColor: '#FAF5F2',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      width: '100%',
      maxWidth: '380px',
      height: '172px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* 3D illustration — positioned per Figma offsets and mirroring */}
    <div
      className="need-card-img"
      style={{
        position: 'absolute',
        left: `${imageLeftOffset}px`,
        top: `${imageTopOffset}px`,
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>

    {/* Text content — offset matches per-card Figma spec */}
    <div
      className="need-card-text"
      style={{
        position: 'absolute',
        left: `${textLeftOffset}px`,
        top: 0,
        right: '12px',
        bottom: 0,
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 600,
          fontSize: `${titleSize}px`,
          lineHeight: '28px',
          color: '#2E2E2E',
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 400,
          fontSize: `${descriptionSize}px`,
          lineHeight: '24px',
          color: '#2E2E2E',
          marginTop: '6px',
          marginBottom: 0,
          whiteSpace: 'pre-line',
        }}
      >
        {description}
      </p>
      <a
        href={href}
        className="discover-link"
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          color: '#2E2E2E',
          lineHeight: 1.17,
          display: 'inline-block',
        }}
      >
        Explore →
      </a>
    </div>
  </div>
);

// Exact 13 Figma strings, intentional per-card typography, and Figma mirroring
const NEED_CARDS: NeedCardProps[] = [
  {
    id: 'calm',
    title: 'Feel Calmer',
    titleSize: 24,
    description: 'Manage stress, overwhelm\nand racing thoughts.',
    descriptionSize: 16,
    imageSrc: ASSETS.discoverCalm,
    imageAlt: '',
    imageWidth: 106,
    imageHeight: 96,
    imageLeftOffset: 30,
    imageTopOffset: 38,
    textLeftOffset: 154,
    href: DISCOVER_LINKS.feelCalmer,
  },
  {
    id: 'sleep',
    title: 'Sleep Better',
    titleSize: 24,
    description: 'Create better sleep and recovery routines.',
    descriptionSize: 16,
    imageSrc: ASSETS.discoverSleep,
    imageAlt: '',
    imageWidth: 116,
    imageHeight: 92,
    imageLeftOffset: 38,
    imageTopOffset: 34,
    textLeftOffset: 179,
    href: DISCOVER_LINKS.sleepBetter,
  },
  {
    id: 'understand',
    title: 'Understand Myself',
    titleSize: 22,
    description: 'Explore your thoughts, emotions and patterns.',
    descriptionSize: 16,
    imageSrc: ASSETS.discoverUnderstand,
    imageAlt: '',
    imageWidth: 102,
    imageHeight: 98,
    imageLeftOffset: 38,
    imageTopOffset: 31,
    textLeftOffset: 163,
    href: DISCOVER_LINKS.understandMyself,
  },
  {
    id: 'habits',
    title: 'Build Better Habits',
    titleSize: 22,
    description: 'Create routines that\nsupport the life you want.',
    descriptionSize: 16,
    imageSrc: ASSETS.discoverHabits,
    imageAlt: '',
    imageWidth: 117,
    imageHeight: 90,
    imageLeftOffset: 22,
    imageTopOffset: 41,
    textLeftOffset: 154,
    href: DISCOVER_LINKS.buildHabits,
  },
  {
    id: 'connected',
    title: 'Feel More Connected',
    titleSize: 22,
    description: 'Strengthen relationships, communication and belonging.',
    descriptionSize: 14,
    imageSrc: ASSETS.discoverConnect,
    imageAlt: '',
    imageWidth: 98,
    imageHeight: 83,
    imageLeftOffset: 25,
    imageTopOffset: 47,
    textLeftOffset: 140,
    href: DISCOVER_LINKS.feelConnected,
  },
  {
    id: 'grow',
    title: 'Grow Through Change',
    titleSize: 22,
    description: 'Navigate uncertainty, transitions and new beginnings.',
    descriptionSize: 16,
    imageSrc: ASSETS.discoverChange,
    imageAlt: '',
    imageWidth: 91,
    imageHeight: 89,
    imageLeftOffset: 21,
    imageTopOffset: 41,
    textLeftOffset: 121,
    href: DISCOVER_LINKS.growThroughChange,
  },
];

const DiscoverSection: React.FC = () => (
  <section
    style={{
      padding: '0 24px',
      margin: '100px 0 0',
      display: 'flex',
      justifyContent: 'center',
    }}
    className="discover-section"
    aria-labelledby="discover-heading"
  >
    {/* Ice-blue Panel: 1280px wide (x = 79–1359 at 1440px desktop) */}
    <div
      className="discover-panel"
      style={{
        backgroundColor: '#E9F5FF',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '1280px',
        padding: '60px 40px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header — Figma's header text block is centred 4.5px right of the panel centre */}
      <div className="discover-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '20px',
            letterSpacing: '0.08em',
            color: '#FE7209',
            textTransform: 'uppercase',
            marginBottom: '21px',
          }}
        >
          DISCOVER WHAT YOU NEED TODAY
        </p>
        <h2
          id="discover-heading"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.47vw, 50px)',
            lineHeight: 1.17,
            color: '#2E2E2E',
            marginBottom: '21.5px',
          }}
        >
          What would feel better right now?
        </h2>
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.67vw, 24px)',
            lineHeight: 1.1667,
            color: '#2E2E2E',
            margin: '0 auto',
            maxWidth: '1000px',
            whiteSpace: 'pre-line',
          }}
        >
          {`Sometimes you need to slow down. Sometimes you need clarity.\nSometimes you simply need to understand what's happening within you.`}
        </p>
      </div>

      {/* 3×2 Grid: 380px cards with 30px gaps */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 380px))',
          gap: '30px',
          justifyContent: 'center',
          width: '100%',
        }}
        className="discover-grid"
      >
        {NEED_CARDS.map((card) => (
          <NeedCard key={card.id} {...card} />
        ))}
      </div>
    </div>

    <style>{`
      .need-card-text .discover-link { position: absolute; top: 122px; left: 0; }
      .discover-link:hover { opacity: 0.7; }
      /* Compact desktop (1240–1359px, e.g. 1280/1366 laptops): keep Figma's 3×2 grid.
         Cards need ≥375px for their text, so trim the outer padding and let the column gap shrink 30→20px. */
      @media (min-width: 1240px) and (max-width: 1359px) {
        .discover-section { padding: 0 16px !important; }
        .discover-panel { padding: 60px 20px !important; }
        .discover-grid { grid-template-columns: repeat(3, minmax(0, 380px)) !important; column-gap: clamp(20px, calc((100% - 1140px) / 2), 30px) !important; }
      }
      @media (min-width: 1360px) { .discover-header { position: relative; left: 4.5px; } }
      .discover-link:focus-visible { outline: 2px solid #FE7209; outline-offset: 2px; border-radius: 2px; }
      @media (max-width: 1024px) {
        .discover-panel { padding: 40px 20px !important; }
      }
      @media (max-width: 640px) {
        .discover-grid { grid-template-columns: 1fr !important; }
        .need-card {
          max-width: 100% !important;
          height: auto !important;
          min-height: 140px !important;
          display: flex !important;
          align-items: center !important;
          padding: 16px !important;
          box-sizing: border-box !important;
        }
        .need-card-img {
          position: relative !important;
          left: 0 !important;
          top: 0 !important;
          transform: none !important;
          margin-right: 16px !important;
          flex-shrink: 0 !important;
        }
        .need-card-text .discover-link { position: static !important; margin-top: 10px !important; }
        .need-card-text {
          position: relative !important;
          left: 0 !important;
          right: 0 !important;
          top: 0 !important;
          bottom: 0 !important;
          padding: 0 !important;
        }
      }
    `}</style>
  </section>
);

export default DiscoverSection;
