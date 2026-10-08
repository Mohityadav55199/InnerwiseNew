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
        backgroundColor: '#E2E8F0',
      }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        width={221}
        height={197}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>

    {/* Title at card +237 (20px gap below image) */}
    <p
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '1.4',
        letterSpacing: '-0.02em',
        color: '#2E2E2E',
        margin: '12px 0 6px',
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
        marginTop: 'auto',
        justifyContent: centerTitle ? 'center' : 'flex-start',
      }}
    >
      <img
        src={ASSETS.bookIcon}
        alt=""
        width={18}
        height={18}
        aria-hidden="true"
        style={{ width: '18px', height: '18px', display: 'block' }}
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
    imageAlt: 'Water droplet',
  },
  {
    title: 'Reset your attention',
    meta: '1 Minute',
    imageSrc: ASSETS.resetAttention,
    imageAlt: 'Forest trees',
  },
  {
    title: 'Release tension and reconnect',
    meta: '3 Minute',
    imageSrc: ASSETS.resetTension,
    imageAlt: 'Flower petals',
  },
  {
    // Card 4 center-aligned title per Figma spec §4.7
    title: 'Create space for Calm & Clarity',
    meta: '5 Minute',
    imageSrc: ASSETS.resetCalm,
    imageAlt: 'Mountain lake',
    centerTitle: true,
  },
];

const QuickResetSection: React.FC = () => (
  <section
    style={{
      padding: '40px 0 60px',
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
            marginBottom: '8px',
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
            marginBottom: '16px',
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
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
          marginBottom: '40px',
        }}
        className="reset-grid"
      >
        {RESET_CARDS.map((card) => (
          <ResetCard key={card.title} {...card} />
        ))}
      </div>

      {/* Centered Button (210×39) */}
      <Button variant="primary" href={QUICKRESET_LINKS.tryQuickReset} showChevron>
        Try a Quick Reset
      </Button>
    </div>
  </section>
);

export default QuickResetSection;
