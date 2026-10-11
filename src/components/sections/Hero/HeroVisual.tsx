import React, { useEffect, useState } from 'react';
import { ASSETS } from '../../../config/assets';
import { RESET_PRACTICES } from '../../../config/practices';
import './HeroVisual.css';

/** The four pillars, with their brand gradient colours (index.css --grad-*). */
const PILLARS = [
  { id: 'mind', label: 'Mind', color: '#19AB4F' },
  { id: 'body', label: 'Body', color: '#FE7209' },
  { id: 'wisdom', label: 'Inner Wisdom', color: '#CB5A9F' },
  { id: 'habits', label: 'Habits', color: '#FFCC03' },
] as const;

/** Row dot colours, cycled so each practice picks up a pillar colour. */
const ROW_COLORS = ['#5BBCF7', '#FE7209', '#CB5A9F', '#19AB4F'];

/** How often the "selected" practice row advances. */
const SELECT_INTERVAL_MS = 2600;

/**
 * Hero illustration: a Quick Reset card orbited by the four pillars, with the Innerwise
 * mascot. Decorative (aria-hidden) — it only echoes copy that appears in full further down
 * the page, and everything in it is existing site content. Sized in container units, so it
 * scales as one piece from phones to desktop.
 */
const HeroVisual: React.FC = () => {
  // Which practice row is "selected": steps through the list, so each row checks and unchecks in turn.
  // Stays on the first row for visitors who prefer reduced motion.
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setSelected((i) => (i + 1) % RESET_PRACTICES.length), SELECT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
  <div className="hero-visual" aria-hidden="true">
    <div className="hv-stage">
      <div className="hv-glow" />

      <svg className="hv-rings" viewBox="0 0 520 580" fill="none">
        <circle cx="260" cy="285" r="118" className="hv-ring" />
        <circle cx="260" cy="285" r="188" className="hv-ring" />
        <g className="hv-orbit">
          <circle cx="260" cy="285" r="252" className="hv-ring" />
          <circle cx="260" cy="33" r="6" fill="#5BBCF7" />
          <circle cx="512" cy="285" r="5" fill="#FE7209" />
          <circle cx="260" cy="537" r="6" fill="#CB5A9F" />
          <circle cx="8" cy="285" r="5" fill="#FFCC03" />
        </g>
      </svg>

      <div className="hv-card">
        <p className="hv-eyebrow">Quick Reset</p>
        <p className="hv-title">Need a moment?</p>
        <ul className="hv-rows">
          {RESET_PRACTICES.map((practice, i) => (
            <li
              key={practice.title}
              className={`hv-row${i === selected ? ' is-selected' : ''}`}
              style={{ '--c': ROW_COLORS[i % ROW_COLORS.length] } as React.CSSProperties}
            >
              <span className="hv-dot" />
              <span className="hv-row-text">{practice.title}</span>
              <span className="hv-row-meta">{practice.meta.replace('Seconds', 'sec').replace('Minutes', 'min').replace('Minute', 'min')}</span>
            </li>
          ))}
        </ul>
      </div>

      {PILLARS.map((pillar) => (
        <span key={pillar.id} className={`hv-chip hv-chip--${pillar.id}`}>
          <span className="hv-chip-dot" style={{ background: pillar.color }} />
          {pillar.label}
        </span>
      ))}

      <div className="hv-avatar">
        <img src={ASSETS.avatarMascot} alt="" width={200} height={200} />
      </div>

      <p className="hv-note">Small moments can create meaningful shifts.</p>

      <img className="hv-sparkle hv-sparkle--star" src={ASSETS.sparkleStar} alt="" width={68} height={73} />
      <img className="hv-sparkle hv-sparkle--thin" src={ASSETS.sparkleThin} alt="" width={44} height={48} />
    </div>
  </div>
  );
};

export default HeroVisual;
