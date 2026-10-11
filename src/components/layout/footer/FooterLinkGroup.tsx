import React from 'react';
import type { FooterGroup } from '../../../config/footer';

/** One titled list of footer links. */
const FooterLinkGroup: React.FC<{ group: FooterGroup; revealDelay?: number }> = ({ group, revealDelay }) => (
  <div className="footer-group" data-reveal="up" data-reveal-delay={revealDelay}>
    <h2 className="footer-group-title">{group.heading}</h2>
    <ul className="footer-group-links">
      {group.links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className="footer-link">{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterLinkGroup;
