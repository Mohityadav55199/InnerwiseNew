import React, { useState } from 'react';
import { ASSETS } from '../../../config/assets';

interface FAQData {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQData[] = [
  {
    id: 'faq-1',
    question: 'What is Innerwise?',
    answer:
      'Innerwise is a whole-person wellbeing platform that brings together Body, Mind, Inner Wisdom and Habits to help people understand themselves and build healthier ways of living.',
  },
  {
    id: 'faq-2',
    question: 'What are the four Innerwise pillars?',
    answer:
      'Body, Mind, Inner Wisdom and Habits. Together, they provide a broader view of everyday wellbeing.',
  },
  {
    id: 'faq-3',
    question: 'Who is Innerwise for?',
    answer:
      'Innerwise is designed for individuals as well as organisations looking to support wellbeing',
  },
  {
    id: 'faq-4',
    question: 'What can I explore on Innerwise?',
    answer:
      'You can explore guided practices, Programs, self-discovery tools, articles, quizzes, reflections, habit tools and personalised wellbeing experiences.',
  },
  {
    id: 'faq-5',
    question: 'Does Innerwise provide professional mental health care?',
    answer:
      'Innerwise can provide wellbeing education, tools and support. Where professional mental health care is needed, appropriate qualified professionals and services should be sought.',
  },
  {
    id: 'faq-6',
    question: 'How do I start?',
    answer:
      'Simply begin with what you need today — or take the Innerwise journey to explore yourself more broadly.',
  },
];

const FAQSection: React.FC = () => {
  // Figma initial visual state: ALL 6 items expanded initially
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() =>
    FAQ_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      style={{
        padding: '60px 0 100px',
        position: 'relative',
        zIndex: 1,
      }}
      aria-labelledby="faq-heading"
    >
      {/* 1075px Content Container (x = 183 to 1258 at 1440px desktop) */}
      <div
        className="faq-inner"
        style={{
          maxWidth: '1075px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'content-box',
        }}
      >
        {/* Left-Aligned Header at x = 183 */}
        <div style={{ marginBottom: '32px' }}>
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '0.08em',
              color: '#FE7209',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            YOUR QUESTIONS, ANSWERED
          </p>

          <h2
            id="faq-heading"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 50px)',
              lineHeight: '1.17',
              color: '#2E2E2E',
              margin: 0,
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion Items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openItems[item.id];
            const answerId = `${item.id}-answer`;
            const headerId = `${item.id}-header`;

            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                  overflow: 'hidden',
                  width: '100%',
                  height: isOpen ? '136px' : 'auto',
                  minHeight: '136px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(item.id)}
                  style={{
                    width: '100%',
                    padding: '20px 50px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                  className="faq-trigger-btn"
                >
                  <span
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 600,
                      fontSize: 'clamp(18px, 2.5vw, 24px)',
                      lineHeight: '1.17',
                      color: '#2E2E2E',
                      flex: 1,
                    }}
                  >
                    {item.question}
                  </span>

                  {/* 30x30 Orange Icon Frame */}
                  <img
                    src={isOpen ? ASSETS.faqMinus : ASSETS.faqPlus}
                    alt=""
                    width={30}
                    height={30}
                    aria-hidden="true"
                    style={{ width: '30px', height: '30px', flexShrink: 0, display: 'block' }}
                  />
                </button>

                {/* Answer Content — kept mounted in DOM with hidden attribute for accessible aria-controls */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={headerId}
                  hidden={!isOpen}
                  style={{
                    padding: '0 50px 20px',
                    maxWidth: '820px',
                    boxSizing: 'border-box',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '1.25',
                      color: '#2E2E2E',
                      margin: 0,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-trigger-btn:focus-visible { outline: 2px solid #FE7209; outline-offset: -2px; }
        @media (max-width: 1123px) {
          .faq-inner {
            box-sizing: border-box !important;
            padding: 0 24px !important;
          }
          .faq-inner > div:last-child > div {
            height: auto !important;
          }
        }
        @media (max-width: 768px) {
          .faq-trigger-btn { padding: 20px 24px 10px !important; }
          div[role="region"] { padding: 0 24px 20px !important; }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;
