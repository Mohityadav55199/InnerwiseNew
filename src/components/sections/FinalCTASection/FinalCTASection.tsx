import React from 'react';
import Button from '../../primitives/Button';
import { CTA_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';
import './FinalCTASection.css';

/** A pillar word, tinted with a darker shade of its pillar colour (≥ 4.5:1 on white). */
const Pillar: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <strong className="cta-pillar" style={{ color }}>{children}</strong>
);

/**
 * Final CTA — the Figma's wavy white closing band: headline, the four-pillar sentence with each pillar
 * in its colour, the closing line and the button, beside the open-arms mascot.
 */
const FinalCTASection: React.FC = () => (
  <section className="cta-section" aria-labelledby="final-cta-heading">
    <div className="cta-bg" aria-hidden="true">
      <img className="cta-wave" src={ASSETS.ctaWave} loading="lazy" decoding="async" alt="" width={1513} height={843} />
      <div className="cta-fill" />
    </div>

    <div className="final-cta-inner">
      <div className="cta-text" data-reveal="left">
        <h2 id="final-cta-heading" className="section-title cta-title">Come back to yourself.</h2>

        <p className="cta-body">
          Understand your <Pillar color="#B54C00">Body</Pillar>. Clear your <Pillar color="#1F6EB0">Mind</Pillar>.{' '}
          Listen to your <Pillar color="#9E3A85">Inner Wisdom</Pillar>. Build better <Pillar color="#1B7A39">Habits</Pillar>.
        </p>
        <p className="cta-closing">Your journey starts with one small step.</p>

        <Button href={CTA_LINKS.startJourney} variant="primary" showChevron>
          Start Your Innerwise Journey
        </Button>
      </div>

      <div className="cta-art" data-reveal="right" data-reveal-delay={150} aria-hidden="true">
        <img src={ASSETS.ctaArt} loading="lazy" decoding="async" alt="" width={411} height={421} />
      </div>
    </div>
  </section>
);

export default FinalCTASection;
