import React from 'react';
import Button from '../../primitives/Button';
import { QUICKRESET_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

interface ResetCardProps {
  title: string;
  meta: string;
  imageSrc: string;
  imageAlt: string;
  centerTitle?: boolean;
}

const ResetCard: React.FC<ResetCardProps> = ({
  title,
  meta,
  imageSrc,
  imageAlt,
  centerTitle = false,
}) => (
  <div
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      width: '261px',
      height: '309px',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}
    className="reset-card"
  >
    {/* Photo container: 221×197 */}
    <div
      style={{
        width: '221px',
        height: '197px',
        borderRadius: '10px',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        width={221}
        height={197}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>

    {/* Title: Figma glyphs sit at card +236 → line box at +232 (15px below the image) */}
    <p
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '1.4',
        letterSpacing: '-0.02em',
        color: '#2E2E2E',
        margin: '15px 0 0',
        textAlign: centerTitle ? 'center' : 'left',
      }}
    >
      {title}
    </p>

    {/* Meta row at card +260 */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: '5.6px',
        justifyContent: 'flex-start', /* meta is left-aligned on all four Figma cards, incl. card 4 */
      }}
    >
      <img
        src={ASSETS.bookIcon}
        alt=""
        width={18.64}
        height={18.64}
        aria-hidden="true"
        style={{ width: '18.64px', height: '18.64px', display: 'block' }}
      />
      <span
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '1.4',
          letterSpacing: '-0.02em',
          color: '#2E2E2E',
        }}
      >
        {meta}
      </span>
    </div>
  </div>
);

const RESET_CARDS: ResetCardProps[] = [
  {
    title: 'Pause • Breathe • Notice',
    meta: '30 Seconds',
    imageSrc: ASSETS.resetBreathe,
    imageAlt: 'Water droplet rippling on a calm surface',
  },
  {
    title: 'Reset your attention',
    meta: '1 Minute',
    imageSrc: ASSETS.resetAttention,
    imageAlt: 'Sunlight through a misty forest',
  },
  {
    title: 'Release tension and reconnect',
    meta: '3 Minute',
    imageSrc: ASSETS.resetTension,
    imageAlt: 'Close-up of pink flower petals',
  },
  {
    // Card 4: centre-aligned title per Figma spec §4.7 (its meta row stays left-aligned, as in Figma)
    title: 'Create space for Calm & Clarity',
    meta: '5 Minute',
    imageSrc: ASSETS.resetCalm,
    imageAlt: 'Mountain lake under low clouds',
    centerTitle: true,
  },
];

const QuickResetSection: React.FC = () => (
  <section
    style={{
      padding: '100px 0',
      position: 'relative',
      zIndex: 1,
    }}
    aria-labelledby="reset-heading"
  >
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Centered Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '20px',
            letterSpacing: '0.08em',
            color: '#FE7209',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          QUICK RESET
        </p>
        <h2
          id="reset-heading"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.47vw, 50px)',
            lineHeight: 1.17,
            color: '#2E2E2E',
            marginBottom: '10.5px',
          }}
        >
          Need a moment? Start here.
        </h2>
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.67vw, 24px)',
            lineHeight: 1.17,
            color: '#2E2E2E',
            margin: 0,
          }}
        >
          Small moments can create meaningful shifts.
        </p>
      </div>

      {/* 4 Cards Row (x 154 to 1283 at 1440px desktop) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
          marginBottom: '40px',
          position: 'relative',
          left: '-1.5px',
        }}
        className="reset-grid"
      >
        {RESET_CARDS.map((card) => (
          <ResetCard key={card.title} {...card} />
        ))}
      </div>

      {/* Centered Button (210×39) */}
      <Button variant="primary" href={QUICKRESET_LINKS.tryQuickReset} showChevron className="btn-quick-reset">
        Try a Quick Reset
      </Button>
    </div>
    <style>{`
      .reset-grid > .reset-card + .reset-card { margin-left: 30px; }
      .reset-grid > .reset-card:nth-child(3) { margin-left: 25px; }
      .btn-quick-reset { width: 210px; }
      @media (max-width: 1180px) {
        .reset-grid { left: 0 !important; gap: 30px; }
        .reset-grid > .reset-card + .reset-card, .reset-grid > .reset-card:nth-child(3) { margin-left: 0; }
      }
      @media (max-width: 1180px) and (min-width: 621px) {
        .reset-grid { max-width: 552px; margin-left: auto; margin-right: auto; }
      }
    `}</style>
  </section>
);

export default QuickResetSection;
