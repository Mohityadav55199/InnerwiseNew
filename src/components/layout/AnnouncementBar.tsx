import React from 'react';

const AnnouncementBar: React.FC = () => (
  <div
    style={{
      backgroundColor: '#47A3F8',
      padding: '12px 24px',
      minHeight: '45px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <p
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 500,
        fontSize: '18px',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 1.17,
      }}
    >
      A new way to understand your wellbeing — Body, Mind, Inner Wisdom &amp; Rituals.
    </p>
  </div>
);

export default AnnouncementBar;
