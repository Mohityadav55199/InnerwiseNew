import React, { useMemo, useState } from 'react';
import Eyebrow from '../../primitives/Eyebrow';
import FAQAccordionItem from './FAQAccordionItem';
import { FAQ_HELP, FAQ_HOME_LIMIT, FAQ_ITEMS } from '../../../config/faq';
import { ASSETS } from '../../../config/assets';
import './FAQSection.css';

/**
 * FAQ — centred header, bordered accordion cards and a "Still have a question?" panel.
 * Content comes from config/faq.ts. Items start closed and open independently, so a
 * visitor can compare answers. "See all N questions" appears only when the data holds
 * more questions than the home list shows, and then expands the list in place.
 */
const FAQSection: React.FC = () => {
  const items = useMemo(() => [...FAQ_ITEMS].sort((a, b) => a.order - b.order), []);
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, FAQ_HOME_LIMIT);
  const hasMore = !showAll && items.length > visible.length;

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-inner">
        <header className="faq-header" data-reveal="up">
          <Eyebrow>Your Questions, Answered</Eyebrow>
          <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
        </header>

        <div className="faq-list">
          {visible.map((item, i) => (
            <FAQAccordionItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              open={open.has(item.id)}
              onToggle={() => toggle(item.id)}
              revealDelay={i < FAQ_HOME_LIMIT ? i * 90 : undefined}
            />
          ))}
        </div>

        <div className="faq-help" data-reveal="up">
          <img src={ASSETS.avatarMascot} alt="" width={66} height={66} className="faq-help-avatar" loading="lazy" decoding="async" />
          <div className="faq-help-text">
            <p className="faq-help-title">{FAQ_HELP.title}</p>
            <a href={FAQ_HELP.link.href} className="faq-help-link">
              {FAQ_HELP.link.label}{' '}<span aria-hidden="true">→</span>
            </a>
          </div>
          {hasMore && (
            <button type="button" className="faq-see-all" onClick={() => setShowAll(true)}>
              See all {items.length} questions
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
