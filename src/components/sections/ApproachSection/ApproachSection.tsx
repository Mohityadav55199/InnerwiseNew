import React from 'react';
import Button from '../../primitives/Button';
import { APPROACH_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

/*
 * Our Approach — full-width white band (Figma 1010:23), y 3284–3958 (674 tall) at 1440.
 * Left column (x 183): eyebrow +159, H2 +199, body +337 (24px / 24px line boxes,
 * box 516 wide, typed breaks + one empty line), button +533.5.
 * Right: complete illustration group 1010:121 exported as one image,
 * 631×567 at (702, 3355) → band-relative (+71), container-relative x +519.
 */
const ApproachSection: React.FC = () => (
  <section
    style={{
      backgroundColor: '#FFFFFF',
      position: 'relative',
      zIndex: 1,
    }}
    className="approach-section"
    aria-labelledby="approach-heading"
  >
    <div
      className="approach-inner"
      style={{
        maxWidth: '1075px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'content-box',
        position: 'relative',
        height: '674px',
      }}
    >
      {/* Left column (x = 183, 516px box) */}
      <div className="approach-text" style={{ width: '516px', maxWidth: '100%', paddingTop: '159px' }}>
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
          OUR APPROACH
        </p>

        <h2
          id="approach-heading"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.47vw, 50px)',
            lineHeight: 1.17,
            color: '#2E2E2E',
            marginBottom: '21px',
          }}
        >
          Human-centred.<br />Whole-person.
        </h2>

        {/* Body with exact Figma line breaks (24px line boxes, empty line between paragraphs) */}
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.67vw, 24px)',
            lineHeight: '24px',
            color: '#2E2E2E',
            marginBottom: '24px',
          }}
          className="approach-body"
        >
          Innerwise brings together psychological{' '}<br className="approach-break" />
          understanding, wellbeing practices and everyday{' '}<br className="approach-break" />
          behavior change.
        </p>
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.67vw, 24px)',
            lineHeight: '24px',
            color: '#2E2E2E',
            marginBottom: '52.5px',
          }}
          className="approach-body"
        >
          Understand thoughts, emotions, behavior and{' '}<br className="approach-break" />
          relationships.
        </p>

        {/* Button: "Innwise" typo preserved as-is per Figma */}
        <Button variant="primary" href={APPROACH_LINKS.discoverApproach} showChevron>
          Discover the Innwise Approach
        </Button>
      </div>

      {/* Right illustration: complete Figma group 1010:121 */}
      <div className="approach-art" aria-hidden="true">
        <img
          src={ASSETS.approachIllustration}
          alt=""
          width={631}
          height={567}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>

    <style>{`
      .approach-art { position: absolute; left: 519px; top: 71px; width: 631px; }
      @media (max-width: 1279px) {
        .approach-inner {
          box-sizing: border-box !important;
          padding: 100px 24px !important;
          height: auto !important;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 40px;
          max-width: 1180px !important;
        }
        .approach-text { padding-top: 0 !important; flex: 1 1 420px; width: auto !important; max-width: 516px !important; }
        .approach-art { position: relative; left: auto; top: auto; flex: 1 1 360px; width: auto; max-width: 631px; }
      }
      @media (max-width: 768px) {
        .approach-break { display: none; }
        .approach-inner { padding: 60px 24px !important; }
      }
    `}</style>
  </section>
);

export default ApproachSection;
