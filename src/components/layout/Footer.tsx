import React from 'react';
import FooterBrand from './footer/FooterBrand';
import FooterLinkGroup from './footer/FooterLinkGroup';
import { FOOTER_GROUPS } from '../../config/footer';
import './Footer.css';

/**
 * Site footer: brand column on the left, link groups (from config/footer.ts) on a grid
 * to its right. Stacks to brand-over-links on tablet and phone.
 */
const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="footer-inner">
      <FooterBrand />
      <nav aria-label="Footer" className="footer-groups">
        {FOOTER_GROUPS.map((group, i) => <FooterLinkGroup key={group.heading} group={group} revealDelay={i * 70} />)}
      </nav>
    </div>
  </footer>
);

export default Footer;
