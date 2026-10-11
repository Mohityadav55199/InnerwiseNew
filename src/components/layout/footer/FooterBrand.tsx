import React from 'react';
import Logo from '../nav/Logo';
import { FOOTER_BRAND } from '../../../config/footer';

/** Brand row above the link groups: logo + taglines on the left, the professional-care note on the right. */
const FooterBrand: React.FC = () => (
  <div className="footer-brand" data-reveal="up">
    <div className="footer-brand-main">
      <Logo tone="light" />
      <p className="footer-pillars">{FOOTER_BRAND.pillars}</p>
      <p className="footer-tagline">{FOOTER_BRAND.tagline}</p>
    </div>
    <p className="footer-care">{FOOTER_BRAND.careNote}</p>
  </div>
);

export default FooterBrand;
