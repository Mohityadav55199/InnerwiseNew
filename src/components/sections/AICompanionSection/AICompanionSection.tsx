import React from 'react';
import Button from '../../primitives/Button';
import Eyebrow from '../../primitives/Eyebrow';
import { AI_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';
import './AICompanionSection.css';

const AI_FEATURES = [
  { icon: ASSETS.aiIcon1, text: 'A supportive space to reflect.' },
  { icon: ASSETS.aiIcon2, text: "Explore what's on your mind." },
  { icon: ASSETS.aiIcon3, text: 'Discover resources that fit your needs.' },
];

/*
 * Chat bubbles (Figma shapes 1010:356 / 359 / 362). The shape + shadow is the exported Figma layer
 * (text removed); the copy stays live text on top of it. Geometry is in % of the phone width
 * (Figma px ÷ 486), so the whole composition scales as one piece. They "pop in" one after another.
 */
const BUBBLES = [
  { img: ASSETS.bubble1, imgW: 59.26, imgH: 22.84, left: 45.68, top: 24.9, w: 46.91, h: 10.49, text: <>I am feeling sad today. Help me?</> },
  { img: ASSETS.bubble2, imgW: 41.15, imgH: 22.84, left: 56.38, top: 41.36, w: 28.81, h: 10.49, text: <>Find me a doctor!</> },
  { img: ASSETS.bubble3, imgW: 59.26, imgH: 26.13, left: 51.44, top: 57.82, w: 46.91, h: 13.79, text: <>Suggest a short routine that makes{' '}<br />my mornings refreshing?</> },
];

/** AI Companion — phone mockup with chat bubbles and the mascot avatar on the left, copy and features on the right. */
const AICompanionSection: React.FC = () => (
  <section className="ai-section" id="ai-companion" aria-labelledby="ai-companion-heading">
    <div className="ai-container">
      <div className="ai-visual" data-reveal="left">
        <div className="ai-stage">
          <img className="ai-phone-shadow" src={ASSETS.phoneShadow} loading="lazy" decoding="async" alt="" aria-hidden="true" width={343} height={90} />
          <img
            className="ai-phone"
            src={ASSETS.phoneMockup}
            loading="lazy"
            decoding="async"
            alt="Innerwise AI Companion app showing a body check-in conversation"
            width={486}
            height={639}
          />
          <img className="ai-sparkle ai-sparkle-star" src={ASSETS.sparkleStar} alt="" aria-hidden="true" width={68} height={73} />
          <img className="ai-sparkle ai-sparkle-thin" src={ASSETS.sparkleThin} alt="" aria-hidden="true" width={44} height={48} />

          <div className="ai-bubbles">
            {BUBBLES.map((b, i) => (
              <div
                key={i}
                className="ai-bubble"
                style={{ left: `${b.left}cqw`, top: `${b.top}cqw`, width: `${b.w}cqw`, height: `${b.h}cqw`, '--i': i } as React.CSSProperties}
              >
                <img className="ai-bubble-shape" src={b.img} loading="lazy" decoding="async" alt="" aria-hidden="true" style={{ width: `${b.imgW}cqw`, height: `${b.imgH}cqw` }} />
                <p className="ai-bubble-text">{b.text}</p>
              </div>
            ))}
          </div>

          {/* Avatar badge: purple ring, soft blue glow, mascot masked inside */}
          <div className="ai-avatar">
            <img src={ASSETS.avatarMascot} loading="lazy" decoding="async" alt="" aria-hidden="true" width={200} height={200} />
          </div>
        </div>

        <p className="ai-disclaimer">
          AI support is designed to complement —<br />
          not replace — professional care.
        </p>
      </div>

      <div className="ai-content" data-reveal="right" data-reveal-delay={120}>
        <Eyebrow>INNERWISE AI COMPANION</Eyebrow>
        <h2 id="ai-companion-heading" className="section-title ai-title">
          You don't always need an answer. Sometimes you need a place to begin.
        </h2>
        <p className="ai-lead">Meet your Innerwise AI Companion</p>

        <ul className="ai-features">
          {AI_FEATURES.map(({ icon, text }) => (
            <li key={text} className="ai-feature">
              <span className="ai-feature-icon" aria-hidden="true"><img src={icon} alt="" width={22} height={22} /></span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <Button href={AI_LINKS.meetCompanion} variant="primary" showChevron>
          Meet Your Innerwise Companion
        </Button>
      </div>
    </div>
  </section>
);

export default AICompanionSection;
