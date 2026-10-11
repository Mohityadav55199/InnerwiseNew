import React from 'react';
import { ASSETS } from '../../../config/assets';

interface FAQAccordionItemProps {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  /** stagger (ms) for the scroll reveal; omit for items added after first paint */
  revealDelay?: number;
}

/**
 * One FAQ row: a heading-wrapped button toggles a region below it.
 * The answer stays mounted (so aria-controls always resolves) and expands with a
 * grid-rows transition; while closed it is `inert`, so its text is not focusable or read.
 */
const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({ id, question, answer, open, onToggle, revealDelay }) => {
  const buttonId = `faq-${id}-button`;
  const panelId = `faq-${id}-panel`;
  return (
    <div
      className={`faq-card${open ? ' is-open' : ''}`}
      {...(revealDelay !== undefined ? { 'data-reveal': 'up', 'data-reveal-delay': revealDelay } : {})}
    >
      <h3 className="faq-q">
        <button id={buttonId} type="button" className="faq-trigger" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span>{question}</span>
          <img src={open ? ASSETS.faqMinus : ASSETS.faqPlus} alt="" width={30} height={30} className="faq-icon" />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-panel" inert={!open}>
        <div className="faq-panel-inner">
          <p className="faq-answer">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordionItem;
