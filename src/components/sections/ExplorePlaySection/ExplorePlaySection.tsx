import React from 'react';
import Button from '../../primitives/Button';
import { EXPLORE_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

interface ExploreTileData {
  id: string;
  title: string;
  description: string;
  circleColor: string;
  iconSrc: string;
  iconW: number;
  iconH: number;
}

const EXPLORE_TILES: ExploreTileData[] = [
  {
    id: 'did-you-know',
    title: 'Did You Know?',
    description: 'Discover fascinating insights about your body, mind, behaviour and everyday patterns.',
    circleColor: '#CB5A9F',
    iconSrc: ASSETS.exploreBook, iconW: 32.39, iconH: 32,
  },
  {
    id: 'tiny-experiments-1',
    title: 'Tiny Experiments',
    description: 'Try something different and notice what changes.',
    circleColor: '#7A5495',
    iconSrc: ASSETS.exploreFlask, iconW: 28.04, iconH: 32,
  },
  {
    id: 'quizzes',
    title: 'Quizzes',
    description: 'Explore your thinking, stress, emotional and habit patterns.',
    circleColor: '#47A3F8',
    iconSrc: ASSETS.exploreQuiz, iconW: 27.2, iconH: 32,
  },
  {
    id: 'challenges',
    title: 'Challenges',
    description: 'Small actions. Simple goals. Meaningful progress.',
    circleColor: '#00A654',
    iconSrc: ASSETS.exploreFlag, iconW: 25.23, iconH: 32,
  },
  {
    id: 'tiny-experiments-2',
    title: 'Tiny Experiments',
    description: 'Try something different and notice what changes.',
    circleColor: '#F7B600',
    iconSrc: ASSETS.exploreFlask, iconW: 28.04, iconH: 32,
  },
  {
    id: 'quick-practices',
    title: 'Quick Practices',
    description: 'Short experiences you can fit into your day.',
    circleColor: '#DE4C3F',
    iconSrc: ASSETS.explorePlay, iconW: 24.63, iconH: 31.52,
  },
];

const ExplorePlaySection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#B2DBFB',
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 0 60px',
        zIndex: 1,
        boxSizing: 'border-box',
      }}
      aria-labelledby="explore-play-heading"
    >
      {/* Concentric Background Circles per Figma Spec (center ~730px at 1440px frame) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '491px',
          left: 'calc(50% + 10px)',
          transform: 'translate(-50%, -50%)',
          width: '1574px',
          height: '1574px',
          borderRadius: '50%',
          backgroundColor: '#BBE0FC',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1173px',
            height: '1173px',
            borderRadius: '50%',
            backgroundColor: '#C9E5FF',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '762px',
              height: '762px',
              borderRadius: '50%',
              backgroundColor: '#D8ECFD',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '396px',
                height: '396px',
                borderRadius: '50%',
                backgroundColor: '#ECF6FF',
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Centered Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '820px' }}>
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
            EXPLORE & PLAY
          </p>

          <h2
            id="explore-play-heading"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 50px)',
              lineHeight: '1.17',
              color: '#2E2E2E',
              margin: '0 0 21px',
            }}
          >
            Learn about yourself.
            <br />
            Experiment with everyday wellbeing.
          </h2>

          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(18px, 1.67vw, 24px)',
              lineHeight: 1.17,
              color: '#2E2E2E',
              margin: 0,
            }}
          >
            Not everything needs to feel like a lesson.
          </p>
        </div>

        {/* 3x2 Tile Grid: 3 × 277px columns with 30px gaps, shifted 10px left per Figma spec */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 277px)',
            gap: '30px',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '891px',
            marginBottom: '40px',
            transform: 'translateX(-10px)',
          }}
          className="explore-grid"
        >
          {EXPLORE_TILES.map((tile) => (
            <div
              key={tile.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                width: '277px',
                height: '215px',
                padding: '30px 20px 0',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: 'none',
              }}
            >
              {/* Icon Circle */}
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: tile.circleColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  flexShrink: 0,
                }}
              >
                <img
                  src={tile.iconSrc}
                  alt=""
                  width={tile.iconW}
                  height={tile.iconH}
                  aria-hidden="true"
                  style={{
                    width: `${tile.iconW}px`,
                    height: `${tile.iconH}px`,
                    display: 'block',
                  }}
                />
              </div>

              {/* Title (tile 1's title sits 4px right of centre in Figma) */}
              <h3
                className={`explore-tile-title explore-tile-title--${tile.id}`}
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: 1.17,
                  color: '#2E2E2E',
                  margin: '0 0 9.9px',
                }}
              >
                {tile.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: 1.17,
                  color: '#2E2E2E',
                  margin: 0,
                  maxWidth: '237px',
                }}
              >
                {tile.description}
              </p>
            </div>
          ))}
        </div>

        {/* Centered Button (175×39) */}
        <Button
          href={EXPLORE_LINKS.explorePlay}
          variant="primary"
          showChevron={true}
        >
          Explore & Play
        </Button>
      </div>
      <style>{`
        @media (min-width: 1180px) { .explore-tile-title--did-you-know { position: relative; left: 4px; } }
      `}</style>
    </section>
  );
};

export default ExplorePlaySection;
