import React from 'react';
import Button from '../../primitives/Button';
import Eyebrow from '../../primitives/Eyebrow';
import { APPROACH_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';
import './ApproachSection.css';

/** What Innerwise helps you understand — the Figma sentence "Understand thoughts, emotions, behavior and relationships." */
const UNDERSTAND_TOPICS = [
  { label: 'thoughts', color: '#5BBCF7' },
  { label: 'emotions', color: '#CB5A9F' },
  { label: 'behavior', color: '#FE7209' },
  { label: 'relationships', color: '#19AB4F' },
] as const;

/**
 * Our Approach — white band: copy on the left (the second sentence is shown as colour-coded topic
 * badges), the Figma mascot illustration on the right at a calmer size.
 */
const ApproachSection: React.FC = () => (
  <section className="approach-section" id="approach" aria-labelledby="approach-heading">
    <div className="approach-inner">
      <div className="approach-text" data-reveal="left">
        <Eyebrow>OUR APPROACH</Eyebrow>
        <h2 id="approach-heading" className="section-title approach-title">Human-centred.<br />Whole-person.</h2>

        <p className="approach-body">
          Innerwise brings together psychological understanding, wellbeing practices and everyday behavior change.
        </p>

        <p className="approach-body approach-understand">
          <span>Understand</span>
          <span className="approach-badges">
            {UNDERSTAND_TOPICS.map((topic) => (
              <span key={topic.label} className="approach-badge" style={{ '--c': topic.color } as React.CSSProperties}>
                {topic.label}
              </span>
            ))}
          </span>
        </p>

        <Button variant="primary" href={APPROACH_LINKS.discoverApproach} showChevron>
          Discover the Innerwise Approach
        </Button>
      </div>

      <div className="approach-art" data-reveal="right" data-reveal-delay={150} aria-hidden="true">
        <img src={ASSETS.approachIllustration} loading="lazy" decoding="async" alt="" width={631} height={567} />
      </div>
    </div>
  </section>
);

export default ApproachSection;
