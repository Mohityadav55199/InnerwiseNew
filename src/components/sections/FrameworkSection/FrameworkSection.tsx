import React from 'react';
import Button from '../../primitives/Button';
import Eyebrow from '../../primitives/Eyebrow';
import { FRAMEWORK_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';
import './FrameworkSection.css';

interface PillarCardData {
  label: string;
  title: string;
  /** short topic badges (the Figma copy, split at its bullets) */
  tags: string[];
  linkText: string;
  linkHref: string;
  /** Figma paint for the card */
  gradient: string;
  iconSrc: string;
}

// Copy and gradients from the Figma framework cards (paint27–29).
const PILLAR_CARDS: PillarCardData[] = [
  {
    label: 'MIND', title: 'Know Your Mind',
    tags: ['Explore thoughts', 'Stress', 'Emotions', 'Focus', 'Relationships and mental clarity'],
    linkText: 'Explore Mind', linkHref: FRAMEWORK_LINKS.exploreMind,
    gradient: 'linear-gradient(151deg, #5BBCF7 30%, #19AB4F 115%)', iconSrc: ASSETS.pillarMind,
  },
  {
    label: 'BODY', title: 'Know Your Body',
    tags: ['Energy', 'Sleep', 'Movement', 'Body signals', 'Breath', 'Nutrition', 'Integrative healing'],
    linkText: 'Explore Body', linkHref: FRAMEWORK_LINKS.exploreBody,
    gradient: 'linear-gradient(157deg, #FE7209 -55%, #FFCF0B 69%)', iconSrc: ASSETS.pillarBody,
  },
  {
    label: 'INNER WISDOM', title: 'Know Your Inner Wisdom',
    tags: ['Values', 'Meaning', 'Intuition', 'Reflection', 'Self-awareness and Inner signals'],
    linkText: 'Explore Inner Wisdom', linkHref: FRAMEWORK_LINKS.exploreWisdom,
    gradient: 'linear-gradient(158deg, #CB5A9F 6%, #BE7FEC 113%)', iconSrc: ASSETS.pillarWisdom,
  },
];

const PillarCard: React.FC<{ card: PillarCardData; index: number }> = ({ card, index }) => (
  <a
    href={card.linkHref}
    className="pillar-card"
    style={{ background: card.gradient }}
    data-reveal="right"
    data-reveal-delay={index * 130}
  >
    <span className="pillar-icon" aria-hidden="true"><img src={card.iconSrc} alt="" /></span>
    <span className="pillar-text">
      <span className="pillar-label">{card.label}</span>
      <h3 className="pillar-title">{card.title}</h3>
      <ul className="pillar-tags" aria-label={`${card.label.toLowerCase()} topics`}>
        {card.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      <span className="pillar-link">{card.linkText} <span className="pillar-arrow" aria-hidden="true">→</span></span>
    </span>
  </a>
);

const RitualsBanner: React.FC = () => (
  <div className="rituals-banner" data-reveal="up">
    <img className="rituals-bell" src={ASSETS.ritualsBell} loading="lazy" decoding="async" alt="" aria-hidden="true" width={150} height={116} />
    <div className="rituals-text">
      <p className="rituals-label">RITUALS</p>
      <h3 className="rituals-title">Shape your everyday life.</h3>
      <p className="rituals-body">Understand your patterns and build routines that support lasting wellbeing.</p>
    </div>
    {/* Button text and chevron: #FAF5F2 (cream), not white — per spec */}
    <div className="rituals-cta">
      <Button variant="creamText" href={FRAMEWORK_LINKS.exploreHabits} showChevron>Explore Habits</Button>
    </div>
  </div>
);

/**
 * The Innerwise Framework: copy on the left, three compact pillar cards on the right (so the whole
 * section fits one screen), then the Rituals banner.
 */
const FrameworkSection: React.FC = () => (
  <section className="framework-section" id="framework" aria-labelledby="framework-heading">
    <div className="framework-inner">
      <div className="framework-text" data-reveal="left">
        <Eyebrow>THE INNERWISE FRAMEWORK</Eyebrow>
        <h2 id="framework-heading" className="section-title framework-title">Three dimensions.<br />One whole you.</h2>
        <p className="framework-body">
          Your wellbeing isn't divided into separate boxes. Your body affects your mind.{' '}
          Your thoughts influence your habits.{' '}
          Your experiences shape your inner world.
        </p>
      </div>

      <div className="framework-cards">
        {PILLAR_CARDS.map((card, i) => <PillarCard key={card.label} card={card} index={i} />)}
      </div>
    </div>

    <div className="rituals-wrap"><RitualsBanner /></div>
  </section>
);

export default FrameworkSection;
