import React, { useState, useEffect, useRef } from 'react';
import Button from '../primitives/Button';
import { NAV_LINKS } from '../../config/links';
import { ASSETS } from '../../config/assets';

const NAV_ITEMS = [
  { label: 'Your Space',    href: NAV_LINKS.yourSpace },
  { label: 'Organizations', href: NAV_LINKS.organizations },
  { label: 'Programs',      href: NAV_LINKS.programs },
  { label: 'Wellness Hub',  href: NAV_LINKS.wellnessHub },
  { label: 'About',         href: NAV_LINKS.about },
  { label: 'Help',          href: NAV_LINKS.help },
];

const HamburgerIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
    <rect
      y="0" width="22" height="2" rx="1" fill="#2E2E2E"
      style={{ transformOrigin: '11px 1px', transform: open ? 'rotate(45deg) translateY(7px)' : 'none', transition: 'transform 0.2s' }}
    />
    <rect
      y="7" width="22" height="2" rx="1" fill="#2E2E2E"
      style={{ opacity: open ? 0 : 1, transition: 'opacity 0.2s' }}
    />
    <rect
      y="14" width="22" height="2" rx="1" fill="#2E2E2E"
      style={{ transformOrigin: '11px 15px', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none', transition: 'transform 0.2s' }}
    />
  </svg>
);

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Accessible Escape key handler to close mobile menu and return focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header style={{ backgroundColor: '#FFFFFF', position: 'relative', zIndex: 50 }}>
      <nav
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 80px',
          height: '59px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
        aria-label="Main navigation"
        className="navbar-inner"
      >
        {/* Logo */}
        <a
          href={NAV_LINKS.home}
          aria-label="Innerwise — home"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
        >
          <img
            src={ASSETS.logoMark}
            alt=""
            width={60}
            height={34}
            aria-hidden="true"
            style={{ width: '60px', height: '34px', display: 'block' }}
          />
          {/* Wordmark lockup: Figma glyphs at y 60 (InnerWise) and y 80 (tagline) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative', top: '-3.5px' }}>
            <span style={{ fontWeight: 500, fontSize: '20px', lineHeight: 1.2, color: '#000000', fontFamily: 'Roboto, sans-serif' }}>
              InnerWise
            </span>
            <span style={{ fontWeight: 400, fontSize: '10px', lineHeight: 1.17, color: '#000000', fontFamily: 'Roboto, sans-serif', marginTop: '-3px' }}>
              Everything is within
            </span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul
          style={{ display: 'flex', alignItems: 'center', gap: '28px', listStyle: 'none', margin: 0, padding: 0 }}
          className="nav-links-desktop"
        >
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                style={{ fontWeight: 500, fontSize: '18px', color: '#2E2E2E', fontFamily: 'Roboto, sans-serif', whiteSpace: 'nowrap' }}
                className="nav-link"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }} className="nav-actions-desktop">
          <a
            href={NAV_LINKS.signIn}
            style={{ fontWeight: 600, fontSize: '16px', color: '#FE7209', fontFamily: 'Roboto, sans-serif' }}
          >
            Sign In
          </a>
          <Button variant="primary" size="nav" href={NAV_LINKS.getStarted}>
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger button */}
        <button
          ref={hamburgerRef}
          className="hamburger-btn"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', display: 'none' }}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        style={{
          position: 'absolute',
          top: '59px',
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(46,46,46,0.1)',
          padding: '20px',
          zIndex: 100,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          display: mobileOpen ? 'block' : 'none',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={label} style={{ borderBottom: '1px solid rgba(46,46,46,0.08)' }}>
              <a
                href={href}
                style={{ display: 'block', padding: '12px 0', fontWeight: 500, fontSize: '18px', color: '#2E2E2E', fontFamily: 'Roboto, sans-serif' }}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href={NAV_LINKS.signIn} style={{ fontWeight: 600, fontSize: '16px', color: '#FE7209', fontFamily: 'Roboto, sans-serif' }}>
            Sign In
          </a>
          <Button variant="primary" size="nav" href={NAV_LINKS.getStarted}>Get Started</Button>
        </div>
      </div>

      <style>{`
        .nav-link { transition: color 0.15s ease; }
        .nav-link:hover { color: #FE7209 !important; }
        .nav-link:focus-visible { outline: 2px solid #FE7209; outline-offset: 2px; border-radius: 2px; }
        @media (max-width: 1120px) {
          .nav-links-desktop { display: none !important; }
          .nav-actions-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .navbar-inner { padding: 0 40px !important; }
        }
        @media (max-width: 768px) {
          .navbar-inner { padding: 0 20px !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
