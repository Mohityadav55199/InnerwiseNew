import React from 'react';
import Button from '../../primitives/Button';
import { APPROACH_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

const ApproachSection: React.FC = () => (
  <section
    style={{
      backgroundColor: '#FFFFFF',
      padding: '100px 0',
      position: 'relative',
      zIndex: 1,
    }}
    aria-labelledby="approach-heading"
  >
    {/* 1075px Content Container (x = 183 to 1258 at 1440px desktop) */}
    <div
      className="approach-inner"
      style={{
        maxWidth: '1075px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'content-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px',
        flexWrap: 'wrap',
      }}
    >
      {/* Left column (x = 183, max-width 516px) */}
      <div style={{ maxWidth: '516px', flex: '1 1 450px' }}>
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
            marginBottom: '32px',
          }}
        >
          Human-centred.<br />Whole-person.
        </h2>

        {/* Body with exact Figma line breaks */}
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.67vw, 24px)',
            lineHeight: '1.25',
            color: '#2E2E2E',
            marginBottom: '16px',
            maxWidth: '516px',
          }}
        >
          Innerwise brings together psychological<br />
          understanding, wellbeing practices and everyday<br />
          behavior change.
        </p>
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.67vw, 24px)',
            lineHeight: '24px',
            color: '#2E2E2E',
            marginBottom: '32px',
            maxWidth: '516px',
          }}
        >
          Understand thoughts, emotions, behavior and<br />
          relationships.
        </p>

        {/* Button: "Innwise" typo preserved as-is per Figma spec */}
        <Button variant="primary" href={APPROACH_LINKS.discoverApproach} showChevron>
          Discover the Innwise Approach
        </Button>
      </div>

      {/* Right illustration: Complete Figma Group 1010:121 (652×588 at x ≈ 703) */}
      <div
        style={{
          flex: '1 1 480px',
          maxWidth: '652px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        aria-hidden="true"
      >
        <img
          src={ASSETS.approachIllustration}
          alt=""
          width={652}
          height={588}
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>
    </div>

    <style>{`
      @media (max-width: 1123px) {
        .approach-inner {
          box-sizing: border-box !important;
          padding: 0 24px !important;
        }
      }
    `}</style>
  </section>
);

export default ApproachSection;
