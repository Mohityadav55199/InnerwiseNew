import React from 'react';
import Button from '../../primitives/Button';
import { AI_LINKS } from '../../../config/links';
import { ASSETS } from '../../../config/assets';

const AI_FEATURES = [
  { icon: ASSETS.aiIcon1, text: 'A supportive space to reflect.' },
  { icon: ASSETS.aiIcon2, text: "Explore what's on your mind." },
  { icon: ASSETS.aiIcon3, text: 'Discover resources that fit your needs.' },
];

const AICompanionSection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '60px 0 60px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
      aria-labelledby="ai-companion-heading"
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '60px',
          boxSizing: 'border-box',
        }}
        className="ai-container"
      >
        {/* Left Visual Column (x = 152 to 638 at 1440px desktop) */}
        <div
          style={{
            flex: '0 0 486px',
            maxWidth: '486px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="ai-visual"
        >
          {/* Sparkles */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '10px',
              right: '20px',
              zIndex: 3,
            }}
          >
            <img src={ASSETS.sparkle} alt="" width={24} height={24} />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '60px',
              right: '0px',
              zIndex: 3,
            }}
          >
            <img src={ASSETS.sparkle} alt="" width={18} height={18} />
          </div>

          {/* Phone Mockup Frame (486 × 639) */}
          <div
            style={{
              position: 'relative',
              width: '486px',
              height: '639px',
              maxWidth: '100%',
              zIndex: 1,
            }}
            className="ai-phone-wrap"
          >
            <img
              src={ASSETS.phoneMockup}
              alt="Innerwise AI Companion app interface"
              width={486}
              height={639}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
              }}
            />

            {/* Chat Bubble 1 */}
            <div
              style={{
                position: 'absolute',
                top: '90px',
                right: '-10px',
                backgroundColor: '#E9F5FF',
                padding: '10px 16px',
                borderRadius: '14px 14px 0 14px',
                boxShadow: '0 4px 12.6px rgba(0,0,0,0.65)',
                fontFamily: 'Roboto, sans-serif',
                fontStyle: 'italic',
                fontSize: '12px',
                lineHeight: '1.34',
                letterSpacing: '-0.02em',
                color: '#2E2E2E',
                maxWidth: '220px',
                zIndex: 4,
              }}
              className="ai-bubble"
            >
              I am feeling sad today. Help me?
            </div>

            {/* Chat Bubble 2 */}
            <div
              style={{
                position: 'absolute',
                top: '200px',
                right: '-20px',
                backgroundColor: '#E9F5FF',
                padding: '10px 16px',
                borderRadius: '14px 14px 0 14px',
                boxShadow: '0 4px 12.6px rgba(0,0,0,0.65)',
                fontFamily: 'Roboto, sans-serif',
                fontStyle: 'italic',
                fontSize: '12px',
                lineHeight: '1.34',
                letterSpacing: '-0.02em',
                color: '#2E2E2E',
                maxWidth: '220px',
                zIndex: 4,
              }}
              className="ai-bubble"
            >
              Find me a doctor!
            </div>

            {/* Chat Bubble 3 */}
            <div
              style={{
                position: 'absolute',
                top: '310px',
                right: '-10px',
                backgroundColor: '#E9F5FF',
                padding: '10px 16px',
                borderRadius: '14px 14px 0 14px',
                boxShadow: '0 4px 12.6px rgba(0,0,0,0.65)',
                fontFamily: 'Roboto, sans-serif',
                fontStyle: 'italic',
                fontSize: '12px',
                lineHeight: '1.34',
                letterSpacing: '-0.02em',
                color: '#2E2E2E',
                maxWidth: '220px',
                zIndex: 4,
              }}
              className="ai-bubble"
            >
              Suggest a short routine that makes my mornings refreshing?
            </div>

            {/* Avatar Badge: 200Ø circle with 10px #7A5495 ring at (186, 5213) */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '-10px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '10px solid #7A5495',
                boxShadow: '0 0 14.3px rgba(145,214,255,0.41)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 4,
                boxSizing: 'border-box',
              }}
              className="ai-avatar"
            >
              <img
                src={ASSETS.avatarMascot}
                alt=""
                width={180}
                height={180}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Disclaimer */}
          <p
            style={{
              marginTop: '40px',
              fontFamily: 'Roboto, sans-serif',
              fontStyle: 'italic',
              fontSize: '16px',
              lineHeight: '1.4',
              color: '#686868',
              textAlign: 'center',
              maxWidth: '420px',
            }}
          >
            AI support is designed to complement —<br />
            not replace — professional care.
          </p>
        </div>

        {/* Right Content Column (x ≈ 699 at 1440px desktop) */}
        <div
          style={{
            flex: '1 1 520px',
            maxWidth: '570px',
          }}
          className="ai-content"
        >
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
            INNERWISE AI COMPANION
          </p>

          <h2
            id="ai-companion-heading"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 50px)',
              lineHeight: '1.17',
              color: '#2E2E2E',
              margin: '16px 0 24px',
            }}
          >
            You don't always need an answer. Sometimes you need a place to begin.
          </h2>

          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '1.25',
              color: '#2E2E2E',
              margin: '0 0 32px',
            }}
          >
            Meet your Innerwise AI Companion
          </p>

          {/* Feature List (3 rows, 10px gap, #47A3F8) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '40px',
            }}
          >
            {AI_FEATURES.map(({ icon, text }) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  minHeight: '30px',
                }}
              >
                <img src={icon} alt="" width={24} height={24} aria-hidden="true" style={{ width: '24px', height: '24px', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '1.25',
                    color: '#47A3F8',
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <Button
            href={AI_LINKS.meetCompanion}
            variant="primary"
            showChevron={true}
          >
            Meet Your Innerwise Companion
          </Button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ai-container { flex-direction: column !important; align-items: center !important; }
          .ai-visual { flex: 1 1 auto !important; width: 100% !important; max-width: 486px !important; }
          .ai-phone-wrap { height: auto !important; }
          .ai-content { max-width: 100% !important; text-align: left !important; }
        }
        @media (max-width: 768px) {
          .ai-bubble { position: relative !important; top: 0 !important; right: 0 !important; margin: 8px 0 !important; }
          .ai-avatar { position: relative !important; left: 0 !important; bottom: 0 !important; margin: 16px auto !important; width: 140px !important; height: 140px !important; }
        }
      `}</style>
    </section>
  );
};

export default AICompanionSection;
