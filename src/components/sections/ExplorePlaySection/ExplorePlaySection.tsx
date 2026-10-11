import React from 'react';
import Eyebrow from '../../primitives/Eyebrow';
import { ASSETS } from '../../../config/assets';
import './ExplorePlaySection.css';

interface ExploreTileData {
  id: string;
  title: string;
  description: string;
  circleColor: string;
  iconSrc: string;
}

// Figma copy. "Self Assessments" reuses the Tiny Experiments description in the Figma file.
const EXPLORE_TILES: ExploreTileData[] = [
  { id: 'did-you-know', title: 'Did You Know?', description: 'Discover fascinating insights about your body, mind, behaviour and everyday patterns.', circleColor: '#CB5A9F', iconSrc: ASSETS.exploreBook },
  { id: 'tiny-experiments', title: 'Tiny Experiments', description: 'Try something different and notice what changes.', circleColor: '#7A5495', iconSrc: ASSETS.exploreFlask },
  { id: 'quizzes', title: 'Quizzes', description: 'Explore your thinking, stress, emotional and habit patterns.', circleColor: '#47A3F8', iconSrc: ASSETS.exploreQuiz },
  { id: 'challenges', title: 'Challenges', description: 'Small actions. Simple goals. Meaningful progress.', circleColor: '#00A654', iconSrc: ASSETS.exploreFlag },
  { id: 'self-assessments', title: 'Self Assessments', description: 'Try something different and notice what changes.', circleColor: '#F7B600', iconSrc: ASSETS.exploreFlask },
  { id: 'quick-practices', title: 'Quick Practices', description: 'Short experiences you can fit into your day.', circleColor: '#DE4C3F', iconSrc: ASSETS.explorePlay },
];

/** Row-wise fan-in: left column from the left, right column from the right, middle rises. */
const REVEAL_FROM = ['left', 'up', 'right'] as const;

/**
 * Explore & Play — pale-blue band with concentric circles behind six compact tiles.
 * Each tile is an icon medallion beside its title and description.
 */
const ExplorePlaySection: React.FC = () => (
  <section className="explore-section" id="explore-play" aria-labelledby="explore-play-heading">
    <div className="explore-rings" aria-hidden="true">
      <span /><span /><span /><span />
    </div>

    <div className="explore-inner">
      <div className="explore-header" data-reveal="up">
        <Eyebrow>EXPLORE & PLAY</Eyebrow>
        <h2 id="explore-play-heading" className="section-title explore-title">
          Learn about yourself.<br />Experiment with everyday wellbeing.
        </h2>
        <p className="explore-lead">Not everything needs to feel like a lesson.</p>
      </div>

      <div className="explore-grid">
        {EXPLORE_TILES.map((tile, i) => (
          <article
            key={tile.id}
            className="explore-tile"
            data-reveal={REVEAL_FROM[i % 3]}
            data-reveal-delay={(i % 3) * 110}
            style={{ '--c': tile.circleColor } as React.CSSProperties}
          >
            <span className="explore-icon" aria-hidden="true"><img src={tile.iconSrc} alt="" /></span>
            <div className="explore-text">
              <h3 className="explore-tile-title">{tile.title}</h3>
              <p className="explore-tile-desc">{tile.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ExplorePlaySection;
