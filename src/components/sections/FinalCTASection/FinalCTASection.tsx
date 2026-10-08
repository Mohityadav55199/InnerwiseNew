import React from 'react';
import Button from '../../primitives/Button';
import { CTA_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

const FinalCTASection: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        paddingTop: '60px',
        paddingBottom: '80px',
        zIndex: 1,
      }}
      aria-labelledby="final-cta-heading"
    >
      {/* Figma node 1010:25 Custom Organic Wave Transition at y ≈ 7747 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1513px',
          overflow: 'hidden',
          lineHeight: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <img
          src={ASSETS.ctaWave}
          alt=""
          width={1513}
          height={333}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* 1075px Content Container (x = 183 to 1258 at 1440px desktop) */}
      <div
        className="final-cta-inner"
        style={{
          maxWidth: '1075px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'content-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '60px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left Column: Text & CTA Button (x = 183, max-width 527px) */}
        <div
          style={{
            flex: '1 1 500px',
            maxWidth: '527px',
          }}
        >
          <h2
            id="final-cta-heading"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 4.5vw, 50px)',
              lineHeight: '1.17',
              color: '#2E2E2E',
              margin: '0 0 24px',
            }}
          >
            Come back to yourself.
          </h2>

          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 1.67vw, 24px)',
              lineHeight: 1.25,
              color: '#2E2E2E',
              margin: '0 0 40px',
              maxWidth: '527px',
            }}
          >
            Understand your Body. Clear your Mind. Listen to your Inner Wisdom. Build better Habits.
            <br /><br />
            Your journey starts with one small step.
          </p>

          <Button
            href={CTA_LINKS.startJourney}
            variant="primary"
            showChevron={true}
          >
            Start Your Innerwise Journey
          </Button>
        </div>

        {/* Right Column: Mascot with Open Arms, Sparkles, and Glow (376×401 at x ≈ 846–1258) */}
        <div
          style={{
            flex: '0 0 376px',
            maxWidth: '376px',
            minHeight: '401px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Purple Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '246px',
              height: '246px',
              borderRadius: '50%',
              backgroundColor: '#7A5495',
              opacity: 0.76,
              filter: 'blur(25px)',
              zIndex: 0,
            }}
          />

          {/* Sparkles (Figma nodes 1010:543–545) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 2,
            }}
          >
            <img src={ASSETS.sparkle} alt="" width={24} height={24} />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50px',
              right: '20px',
              zIndex: 2,
            }}
          >
            <img src={ASSETS.sparkle} alt="" width={20} height={20} />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '30px',
              zIndex: 2,
            }}
          >
            <img src={ASSETS.sparkle} alt="" width={18} height={18} />
          </div>

          {/* Open-Arms Mascot Image (376×401) */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: '376px',
              height: '401px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={ASSETS.ctaMascot}
              alt=""
              width={376}
              height={401}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1123px) {
          .final-cta-inner {
            box-sizing: border-box !important;
            padding: 0 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FinalCTASection;
