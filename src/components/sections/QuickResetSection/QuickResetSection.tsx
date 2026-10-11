import React from 'react';
import Button from '../../primitives/Button';
import Eyebrow from '../../primitives/Eyebrow';
import { QUICKRESET_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';
import { RESET_PRACTICES } from '../../../config/practices';
import './QuickResetSection.css';

interface ResetCardData {
  title: string;
  /** duration, e.g. "30 Seconds" */
  meta: string;
  imageSrc: string;
  imageAlt: string;
}

/** Photo + alt text per practice, in the same order as RESET_PRACTICES */
const RESET_ART: Pick<ResetCardData, 'imageSrc' | 'imageAlt'>[] = [
  { imageSrc: ASSETS.resetBreathe, imageAlt: 'Water droplet rippling on a calm surface' },
  { imageSrc: ASSETS.resetAttention, imageAlt: 'Sunlight through a misty forest' },
  { imageSrc: ASSETS.resetTension, imageAlt: 'Close-up of pink flower petals' },
  { imageSrc: ASSETS.resetCalm, imageAlt: 'Mountain lake under low clouds' },
];

const RESET_CARDS: ResetCardData[] = RESET_PRACTICES.map((practice, i) => ({ ...practice, ...RESET_ART[i] }));

/** Outer cards fan in from their own side, the middle ones rise. */
const revealFrom = (i: number): 'up' | 'left' | 'right' =>
  i === 0 ? 'left' : i === RESET_CARDS.length - 1 ? 'right' : 'up';

const ResetCard: React.FC<{ card: ResetCardData; index: number }> = ({ card, index }) => (
  <article className="reset-card" data-reveal={revealFrom(index)} data-reveal-delay={index * 110}>
    <div className="reset-photo">
      <img src={card.imageSrc} alt={card.imageAlt} width={221} height={197} loading="lazy" decoding="async" />
      <span className="reset-pill">
        <img src={ASSETS.bookIcon} alt="" width={14} height={14} aria-hidden="true" />
        {card.meta}
      </span>
    </div>
    <h3 className="reset-title">{card.title}</h3>
  </article>
);

/**
 * Quick Reset: four short practices. Each duration is a pill on its photo (instead of a separate
 * row), which keeps the cards compact.
 */
const QuickResetSection: React.FC = () => (
  <section className="reset-section" id="quick-reset" aria-labelledby="reset-heading">
    <div className="reset-inner">
      <div className="reset-header" data-reveal="up">
        <Eyebrow>QUICK RESET</Eyebrow>
        <h2 id="reset-heading" className="section-title reset-heading">Need a moment? Start here.</h2>
        <p className="reset-lead">Small moments can create meaningful shifts.</p>
      </div>

      <div className="reset-grid">
        {RESET_CARDS.map((card, i) => <ResetCard key={card.title} card={card} index={i} />)}
      </div>

      <Button variant="primary" href={QUICKRESET_LINKS.tryQuickReset} showChevron className="btn-quick-reset">
        Try a Quick Reset
      </Button>
    </div>
  </section>
);

export default QuickResetSection;
