import React from 'react';

/* Line icons used by the mobile menu (Figma "Web Nav" frames: 1.5–2px #2E2E2E strokes). */

const stroke = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

export const ChevronRight: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" {...stroke} /></svg>
);

export const ChevronDown: React.FC<{ up?: boolean }> = ({ up = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" style={{ transform: up ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s ease' }}>
    <path d="M5 9l7 7 7-7" {...stroke} />
  </svg>
);

/** Ø36 outlined circle with an × (close) or ‹ (back), as in the mobile frames. */
export const CircleIcon: React.FC<{ kind: 'close' | 'back' }> = ({ kind }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
    <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.5" fill="none" />
    {kind === 'close'
      ? <path d="M12.5 12.5l11 11M23.5 12.5l-11 11" {...stroke} strokeWidth={1.75} />
      : <path d="M20.5 11.5L14 18l6.5 6.5" {...stroke} strokeWidth={1.75} />}
  </svg>
);

export const HamburgerIcon: React.FC = () => (
  <svg width="24" height="18" viewBox="0 0 24 18" aria-hidden="true">
    <path d="M1 1h22M1 9h22M1 17h22" {...stroke} />
  </svg>
);
