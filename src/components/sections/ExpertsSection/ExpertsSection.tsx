import React from 'react';
import Button from '../../primitives/Button';
import Eyebrow from '../../primitives/Eyebrow';
import { EXPERTS_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';
import './ExpertsSection.css';

/** The Figma's "Psychology | Mental Wellbeing | …" list, one badge per field, with a soft accent colour each. */
const EXPERTISE = [
  { label: 'Psychology', color: '#5BBCF7' },
  { label: 'Mental Wellbeing', color: '#19AB4F' },
  { label: 'Behaviour Change', color: '#FE7209' },
  { label: 'Conscious living', color: '#CB5A9F' },
  { label: 'Lifestyle', color: '#FFCC03' },
  { label: 'Digital Wellbeing', color: '#47A3F8' },
  { label: 'Human Behaviour', color: '#7A5495' },
] as const;

/**
 * Meet Our Experts — white band. Left: heading, the expertise badges and the closing paragraph;
 * right: the Figma video-call + expert-card illustration at a calmer size. The expert card is part
 * of the illustration, and its "Book Now" has no destination.
 * (The Figma repeats the heading as the first body line; that duplicate is not shown.)
 */
const ExpertsSection: React.FC = () => (
  <section className="experts-section" id="experts" aria-labelledby="experts-heading">
    <div className="experts-inner">
      <div className="experts-text" data-reveal="left">
        <Eyebrow>Meet Our Experts</Eyebrow>
        <h2 id="experts-heading" className="section-title experts-title">
          Built with expertise.<br />Designed for real life.
        </h2>

        <p className="experts-body">Innerwise brings together expertise across:</p>
        <ul className="experts-badges">
          {EXPERTISE.map((field, i) => (
            <li key={field.label} className="experts-badge" style={{ '--c': field.color, '--i': i } as React.CSSProperties}>
              {field.label}
            </li>
          ))}
        </ul>

        <p className="experts-body experts-closing">
          Our content and Programs are designed to make psychological knowledge understandable,
          practical and relevant to everyday life.
        </p>

        <Button variant="primary" href={EXPERTS_LINKS.discoverApproach} showChevron>
          Discover the Innerwise Approach
        </Button>
      </div>

      <div className="experts-art" data-reveal="right" data-reveal-delay={150}>
        <img
          src={ASSETS.expertsVisual}
          loading="lazy"
          decoding="async"
          alt="A video consultation with an Innerwise wellbeing expert on a phone, next to an expert profile card"
          width={516}
          height={630}
        />
      </div>
    </div>
  </section>
);

export default ExpertsSection;
