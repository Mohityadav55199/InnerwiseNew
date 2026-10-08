import React from 'react';
import Button from '../../primitives/Button';
import { AI_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

const AI_FEATURES = [
  { icon: ASSETS.aiIcon1, text: 'A supportive space to reflect.' },
  { icon: ASSETS.aiIcon2, text: "Explore what's on your mind." },
  { icon: ASSETS.aiIcon3, text: 'Discover resources that fit your needs.' },
];

/*
 * Chat bubbles (Figma Union shapes 1010:356 / 359 / 362). The shape + shadow is the
 * exported Figma layer (text removed); the copy stays live text on top of it.
 * Positions are relative to the phone's top-left (152, 4816).
 */
const BUBBLES = [
  { img: ASSETS.bubble1, imgW: 288, imgH: 111, left: 222, top: 121, w: 228, h: 51, text: <>I am feeling sad today. Help me?</> },
  { img: ASSETS.bubble2, imgW: 200, imgH: 111, left: 274, top: 201, w: 140, h: 51, text: <>Find me a doctor!</> },
  { img: ASSETS.bubble3, imgW: 288, imgH: 127, left: 250, top: 281, w: 228, h: 67, text: <>Suggest a short routine that makes{' '}<br />my mornings refreshing?</> },
];

/*
 * AI Companion — white band (Figma 1010:24), y 4723–5567 (844 tall) at 1440.
 * Visual column x 152 (phone 486×639 at section +93), text column x 699
 * (eyebrow +161, H2 +201, sub +388, feature rows +448/+488/+528, button +589).
 */
const AICompanionSection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        zIndex: 1,
      }}
      className="ai-section"
      aria-labelledby="ai-companion-heading"
    >
      <div className="ai-container">
        {/* Left visual: phone + shadow + bubbles + avatar + sparkles + disclaimer */}
        <div className="ai-visual">
          <div className="ai-stage">
            <img className="ai-phone-shadow" src={ASSETS.phoneShadow} alt="" aria-hidden="true" width={343} height={90} />
            <img
              className="ai-phone"
              src={ASSETS.phoneMockup}
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
                  style={{
                    left: `${b.left}px`,
                    top: `${b.top}px`,
                    width: `${b.w}px`,
                    height: `${b.h}px`,
                  }}
                >
                  <img
                    className="ai-bubble-shape"
                    src={b.img}
                    alt=""
                    aria-hidden="true"
                    width={b.imgW}
                    height={b.imgH}
                  />
                  <p className="ai-bubble-text">{b.text}</p>
                </div>
              ))}
            </div>

            {/* Avatar badge: 200Ø, 10px #7A5495 ring, #91D6FF glow, mascot masked inside */}
            <div className="ai-avatar">
              <img src={ASSETS.avatarMascot} alt="" aria-hidden="true" width={200} height={200} />
            </div>
          </div>

          <p className="ai-disclaimer">
            AI support is designed to complement —<br />
            not replace — professional care.
          </p>
        </div>

        {/* Right content column (x = 699 at 1440) */}
        <div className="ai-content">
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '0.08em',
              color: '#FE7209',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            INNERWISE AI COMPANION
          </p>

          <h2
            id="ai-companion-heading"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 3.47vw, 50px)',
              lineHeight: 1.17,
              color: '#2E2E2E',
              margin: '0 0 11.5px',
            }}
          >
            You don't always need an answer. Sometimes you need a place to begin.
          </h2>

          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(18px, 1.67vw, 24px)',
              lineHeight: 1.25,
              color: '#2E2E2E',
              margin: '0 0 30px',
            }}
          >
            Meet your Innerwise AI Companion
          </p>

          {/* Feature list: 3 rows × 30px, 10px gap, icon 20px at x 699, text at x 729 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '31px' }}>
            {AI_FEATURES.map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', minHeight: '30px', marginLeft: '-2px' }}>
                <img src={icon} alt="" width={24} height={24} aria-hidden="true" style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(18px, 1.67vw, 24px)',
                    lineHeight: 1.25,
                    color: '#47A3F8',
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <Button href={AI_LINKS.meetCompanion} variant="primary" showChevron={true}>
            Meet Your Innerwise Companion
          </Button>
        </div>
      </div>

      <style>{`
        .ai-container {
          position: relative;
          max-width: 1117px;
          height: 844px;
          margin: 0 auto;
          left: -9.5px; /* Figma content spans x 152–1269 (centre 710.5) */
        }
        .ai-visual { position: absolute; left: 0; top: 93px; width: 486px; }
        .ai-stage { position: relative; width: 486px; height: 639px; container-type: inline-size; }
        .ai-phone { position: absolute; left: 0; top: 0; width: 100%; height: auto; z-index: 1; display: block; }
        .ai-phone-shadow { position: absolute; left: 28.807cqw; top: 113.786cqw; width: 70.576cqw; height: auto; z-index: 0; }
        .ai-sparkle { position: absolute; z-index: 2; height: auto; }
        .ai-sparkle-star { left: 63.992cqw; top: -6.79cqw; width: 13.992cqw; }
        .ai-sparkle-thin { left: 72.222cqw; top: 8.23cqw; width: 9.053cqw; }
        .ai-bubbles { position: absolute; inset: 0; z-index: 3; }
        .ai-bubble { position: absolute; box-sizing: border-box; padding: 17px 20px 20px; } /* Figma text is vertically centred in each bubble */
        .ai-bubble-shape { position: absolute; left: -30px; top: -30px; max-width: none; pointer-events: none; }
        .ai-bubble-text {
          position: relative;
          margin: 0;
          font-family: Roboto, sans-serif;
          font-style: italic;
          font-weight: 400;
          font-size: 12px;
          line-height: 134%;
          letter-spacing: -0.02em;
          color: #2E2E2E;
          white-space: nowrap;
        }
        .ai-avatar {
          position: absolute;
          left: 6.996cqw;
          top: 81.687cqw;
          width: 41.152cqw;
          height: 41.152cqw;
          box-sizing: border-box;
          border-radius: 50%;
          background: #FFFFFF;
          /* ring drawn as an inset shadow so the mascot (Figma 1010:334, masked to the full 200Ø circle) paints over it */
          box-shadow: inset 0 0 0 10px #7A5495, 0 0 14.3px 11px rgba(145, 214, 255, 0.41); /* Figma: dilate 11 + blur σ 7.15 */
          overflow: hidden;
          z-index: 4;
        }
        .ai-avatar img { width: 100%; height: 100%; display: block; }
        .ai-disclaimer {
          position: absolute;
          left: 55px;
          top: 652px;
          width: 287px;
          margin: 0;
          font-family: Roboto, sans-serif;
          font-style: italic;
          font-size: 16px;
          line-height: 1.17;
          color: #686868;
          text-align: center;
        }
        .ai-content { position: absolute; left: 547px; top: 161px; width: 570px; }

        @media (max-width: 1159px) {
          .ai-container {
            left: 0;
            height: auto;
            max-width: 600px;
            padding: 100px 24px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 56px;
          }
          .ai-visual { position: relative; top: auto; width: 100%; max-width: 486px; padding-top: 40px; }
          .ai-disclaimer { position: static; width: auto; margin-top: 24px; }
          .ai-content { position: static; width: 100%; max-width: 570px; }
        }
        @media (max-width: 560px) {
          .ai-stage { width: 100%; height: auto; }
          .ai-phone { position: relative; }
          .ai-bubbles { position: static; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; margin-top: 20px; }
          .ai-bubble {
            position: static;
            width: auto !important;
            height: auto !important;
            max-width: 100%;
            padding: 14px 20px;
            background: #E9F5FF;
            border-radius: 4px;
            box-shadow: 0 4px 12.6px rgba(0, 0, 0, 0.65);
          }
          .ai-bubble-shape { display: none; }
          .ai-bubble-text { white-space: normal; }
          .ai-bubble-text br { display: none; }
          .ai-avatar { box-shadow: inset 0 0 0 2.058cqw #7A5495, 0 0 14.3px 11px rgba(145, 214, 255, 0.41); }
          .ai-container { padding: 60px 24px; }
        }
      `}</style>
    </section>
  );
};

export default AICompanionSection;
