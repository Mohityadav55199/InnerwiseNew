import React from 'react';
import Eyebrow from '../../primitives/Eyebrow';
import { DISCOVER_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';
import './DiscoverSection.css';

interface NeedCardData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  /** soft backdrop behind the illustration */
  tint: string;
  /** deeper shade of the same colour, for the ring and the Explore pill */
  accent: string;
  href: string;
}

// Figma rev. 2 order and copy. Tint/accent are pale and deep versions of each illustration's own colour.
const NEED_CARDS: NeedCardData[] = [
  { id: 'calm', title: 'Feel Calmer', description: 'Manage stress, overwhelm and racing thoughts.', imageSrc: ASSETS.discoverCalm, tint: '#FFF0C9', accent: '#D99100', href: DISCOVER_LINKS.feelCalmer },
  { id: 'understand', title: 'Understand Myself', description: 'Explore your thoughts, emotions and patterns.', imageSrc: ASSETS.discoverUnderstand, tint: '#E1F2E3', accent: '#2E8B47', href: DISCOVER_LINKS.understandMyself },
  { id: 'sleep', title: 'Sleep Better', description: 'Create better sleep and recovery routines.', imageSrc: ASSETS.discoverSleep, tint: '#E3E9FB', accent: '#4A5BD4', href: DISCOVER_LINKS.sleepBetter },
  { id: 'connected', title: 'Feel More Connected', description: 'Strengthen relationships, communication and belonging.', imageSrc: ASSETS.discoverConnect, tint: '#D9ECFF', accent: '#2E86DE', href: DISCOVER_LINKS.feelConnected },
  { id: 'habits', title: 'Build Better Habits', description: 'Create routines that support the life you want.', imageSrc: ASSETS.discoverHabits, tint: '#FFE6D2', accent: '#E06A12', href: DISCOVER_LINKS.buildHabits },
  { id: 'growth', title: 'Find Growth', description: 'Navigate uncertainty, transitions & new beginnings.', imageSrc: ASSETS.discoverChange, tint: '#E4F3DD', accent: '#3E9B3A', href: DISCOVER_LINKS.findGrowth },
];

/** Cards fan in from their own side: left column from the left, right column from the right. */
const REVEAL_FROM = ['left', 'up', 'right'] as const;

const NeedCard: React.FC<{ card: NeedCardData; index: number }> = ({ card, index }) => (
  <a
    href={card.href}
    className="need-card"
    data-reveal={REVEAL_FROM[index % 3]}
    data-reveal-delay={(index % 3) * 110}
    style={{ '--tint': card.tint, '--accent': card.accent } as React.CSSProperties}
  >
    <span className="need-card-img" aria-hidden="true">
      <img src={card.imageSrc} alt="" width={112} height={112} loading="lazy" decoding="async" />
    </span>
    <span className="need-card-text">
      <h3 className="need-card-title">{card.title}</h3>
      <p className="need-card-desc">{card.description}</p>
      <span className="need-card-link">
        Explore<span className="sr-only">: {card.title}</span> <span className="need-card-arrow" aria-hidden="true">→</span>
      </span>
    </span>
  </a>
);

const DiscoverSection: React.FC = () => (
  <section className="discover-section" id="discover" aria-labelledby="discover-heading">
    <div className="discover-panel">
      <div className="discover-header" data-reveal="up">
        <Eyebrow>DISCOVER WHAT YOU NEED TODAY</Eyebrow>
        <h2 id="discover-heading" className="section-title discover-title">What would feel better right now?</h2>
        <p className="discover-lead">
          Sometimes you need to slow down. Sometimes you need clarity.{' '}
          <br className="discover-lead-break" />
          Sometimes you simply need to understand what's happening within you.
        </p>
      </div>

      <div className="discover-grid">
        {NEED_CARDS.map((card, i) => <NeedCard key={card.id} card={card} index={i} />)}
      </div>
    </div>
  </section>
);

export default DiscoverSection;
