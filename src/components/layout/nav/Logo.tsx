import React from 'react';
import { ASSETS } from '../../../config/assets';
import { NAV_LINKS } from '../../../config/links';
import './Logo.css';

/**
 * InnerWise lockup — Figma logo mark (60×34) + "InnerWise / Everything is within" wordmark.
 * `tone="light"` renders the wordmark in white for dark surfaces (footer).
 */
const Logo: React.FC<{ tone?: 'dark' | 'light' }> = ({ tone = 'dark' }) => (
  <a href={NAV_LINKS.home} className={`nav-logo${tone === 'light' ? ' nav-logo--light' : ''}`} aria-label="Innerwise — home">
    <img src={ASSETS.logoMark} alt="" width={60} height={34} className="nav-logo-mark" />
    <span className="nav-logo-text" aria-hidden="true">
      <span className="nav-logo-name">InnerWise</span>
      <span className="nav-logo-tagline">Everything is within</span>
    </span>
  </a>
);

export default Logo;
