import React from 'react';

const AnnouncementBar: React.FC = () => (
  <div
    style={{
      backgroundColor: '#2E2E2E',
      padding: '12px var(--page-gutter)',
      minHeight: '45px',
      marginBottom: '1px', /* Figma: 1px gap between bar (0–45) and navbar (46–105) */
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    }}
  >
    <span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FE7209', flexShrink: 0 }} />
    <p
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        fontSize: '15px',
        letterSpacing: '0.005em',
        color: 'rgba(255, 255, 255, 0.92)',
        textAlign: 'center',
        lineHeight: 1.17,
      }}
    >
      A new way to understand your wellbeing — Body, Mind, Inner Wisdom &amp; Rituals.
    </p>
  </div>
);

export default AnnouncementBar;
