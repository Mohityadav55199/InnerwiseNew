import React from 'react';
import Button from '../../primitives/Button';
import { CTA_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

/*
 * Final CTA — Figma y 7747–8402 (655 tall) at 1440.
 * Background: white union 1010:25 (organic wavy top) drawn at its native 1513×843
 * aspect ratio from x −48, starting at the section top; the footer covers its lower part.
 * Below the wave's own white body the section continues white.
 * Content: H2 +250 (y 7997), body +319 (527×112, typed breaks), button +471 (y 8218).
 * Art: group 1010:539 (glow + open-arms mascot + 3 sparkles) exported as one image,
 * 411×421 at (846, 7895) → section +148, container x +663.
 */
const FinalCTASection: React.FC = () => {
  return (
    <section className="cta-section" aria-labelledby="final-cta-heading">
      <div className="cta-bg" aria-hidden="true">
        <img className="cta-wave" src={ASSETS.ctaWave} alt="" width={1513} height={843} />
        <div className="cta-fill" />
      </div>

      <div className="final-cta-inner">
        <div className="cta-text">
          <h2
            id="final-cta-heading"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 3.47vw, 50px)',
              lineHeight: 1.17,
              color: '#2E2E2E',
              margin: '0 0 10.5px',
            }}
          >
            Come back to yourself.
          </h2>

          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(18px, 1.67vw, 24px)',
              lineHeight: 1.17,
              color: '#2E2E2E',
              margin: '0 0 39.7px',
              maxWidth: '527px',
            }}
          >
            Understand your Body. Clear your Mind.{' '}<br className="cta-break" />
            Listen to your Inner Wisdom. Build better Habits.
            <br /><br />
            Your journey starts with one small step.
          </p>

          <Button href={CTA_LINKS.startJourney} variant="primary" showChevron={true}>
            Start Your Innerwise Journey
          </Button>
        </div>

        <div className="cta-art" aria-hidden="true">
          <img src={ASSETS.ctaArt} alt="" width={411} height={421} />
        </div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          z-index: 1;
          height: 655px;
          overflow: hidden; /* clips the wave's off-canvas tips (x −48 / +1465) */
        }
        .cta-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .cta-wave {
          position: absolute;
          top: 0;
          left: -3.3333vw;          /* −48px at 1440 */
          width: 105.0694vw;        /* 1513px at 1440, native aspect (height auto) */
          max-width: none;
          height: auto;
          display: block;
        }
        .cta-fill {                 /* white below the wave's rectangle body (starts at y 7884 = +137) */
          position: absolute;
          left: 0;
          right: 0;
          top: 9.5139vw;
          bottom: 0;
          background: #FFFFFF;
        }
        .final-cta-inner {
          position: relative;
          z-index: 1;
          max-width: 1075px;
          height: 100%;
          margin: 0 auto;
        }
        .cta-text { position: absolute; left: 0; top: 250px; width: 527px; }
        .cta-art { position: absolute; left: 663px; top: 148px; width: 411px; }
        .cta-art img { width: 100%; height: auto; display: block; }

        @media (max-width: 1123px) {
          .cta-section { height: auto; }
          .final-cta-inner {
            height: auto;
            padding: calc(9.5139vw + 80px) 24px 80px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 40px;
          }
          .cta-text { position: static; width: auto; flex: 1 1 360px; max-width: 527px; }
          .cta-art { position: static; flex: 0 1 411px; width: auto; max-width: 100%; margin: 0 auto; }
        }
        @media (max-width: 768px) {
          .cta-break { display: none; }
          .final-cta-inner { padding: calc(9.5139vw + 48px) 24px 60px; }
        }
      `}</style>
    </section>
  );
};

export default FinalCTASection;
