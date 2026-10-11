import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../primitives/Button';
import Logo from './nav/Logo';
import MegaMenu from './nav/MegaMenu';
import MobileMenu from './nav/MobileMenu';
import { HamburgerIcon } from './nav/icons';
import { NAV_ITEMS } from '../../config/navigation';
import { NAV_LINKS } from '../../config/links';
import './Navbar.css';

const HOVER_OPEN_DELAY = 120;
const HOVER_CLOSE_DELAY = 220;
const DESKTOP_QUERY = '(min-width: 1200px)';

/**
 * Site header. Desktop (≥1200px): 7 items; four open a mega-menu by click or by hover
 * (with intent delays). A click on a hover-opened menu pins it open; pinned menus close on
 * Escape, an outside click, focus leaving the header, or a second click.
 * Below 1200px: logo · Get Started · hamburger, opening the full-screen MobileMenu.
 */
const Navbar: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openedBy = useRef<'hover' | 'click'>('click');
  const timer = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const clearTimer = () => window.clearTimeout(timer.current);
  const later = (fn: () => void, ms: number) => { clearTimer(); timer.current = window.setTimeout(fn, ms); };

  const openIdRef = useRef(openId);
  useEffect(() => { openIdRef.current = openId; }, [openId]);

  const closeMenu = useCallback((restoreFocus = false) => {
    clearTimer();
    const current = openIdRef.current;
    setOpenId(null);
    if (restoreFocus && current) document.getElementById(`nav-trigger-${current}`)?.focus();
  }, []);

  // Escape + outside click while a mega-menu is open
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(true); };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [openId, closeMenu]);

  // Close whichever menu no longer applies when crossing the desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => (mq.matches ? setMobileOpen(false) : closeMenu());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [closeMenu]);

  useEffect(() => () => clearTimer(), []);

  const onTriggerClick = (id: string) => {
    clearTimer();
    if (openId === id && openedBy.current === 'hover') { openedBy.current = 'click'; return; }
    openedBy.current = 'click';
    setOpenId(openId === id ? null : id);
  };

  const onItemPointerEnter = (e: React.PointerEvent, id: string | null) => {
    if (e.pointerType !== 'mouse') return;
    if (id === null) {
      // plain link: hovering it dismisses a hover-opened menu
      if (openId && openedBy.current === 'hover') later(() => setOpenId(null), HOVER_OPEN_DELAY);
      return;
    }
    if (openId === id) { clearTimer(); return; }
    if (openId && openedBy.current === 'click') return; // a pinned menu stays until dismissed
    later(() => { openedBy.current = 'hover'; setOpenId(id); }, openId ? 0 : HOVER_OPEN_DELAY);
  };

  const onHeaderPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (openedBy.current === 'hover') later(() => setOpenId(null), HOVER_CLOSE_DELAY);
    else clearTimer();
  };

  const onHeaderBlur = (e: React.FocusEvent) => {
    if (openId && !headerRef.current?.contains(e.relatedTarget as Node | null)) closeMenu();
  };

  const closeMobile = () => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <header ref={headerRef} className="site-header" onPointerLeave={onHeaderPointerLeave} onBlur={onHeaderBlur}>
      <nav className="nav-bar" aria-label="Main">
        <Logo />

        <ul className="nav-items">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} onPointerEnter={(e) => onItemPointerEnter(e, item.menu ? item.id : null)}>
              {item.menu ? (
                <>
                  <button
                    id={`nav-trigger-${item.id}`}
                    type="button"
                    className="nav-item-link"
                    aria-expanded={openId === item.id}
                    aria-controls={`nav-menu-${item.id}`}
                    onClick={() => onTriggerClick(item.id)}
                  >
                    {item.label}
                  </button>
                  <MegaMenu
                    id={`nav-menu-${item.id}`}
                    labelledBy={`nav-trigger-${item.id}`}
                    menu={item.menu}
                    open={openId === item.id}
                    onNavigate={() => closeMenu()}
                    onPointerEnter={(e) => { if (e.pointerType === 'mouse') clearTimer(); }}
                  />
                </>
              ) : (
                <a href={item.href} className="nav-item-link">{item.label}</a>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href={NAV_LINKS.signIn} className="nav-signin">Sign In</a>
          <Button variant="primary" size="nav" href={NAV_LINKS.getStarted}>Get Started</Button>
        </div>

        <div className="nav-mobile-actions">
          <Button variant="primary" size="nav" href={NAV_LINKS.getStarted}>Get Started</Button>
          <button
            ref={hamburgerRef}
            type="button"
            className="nav-hamburger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? 'mobile-nav' : undefined}
            onClick={() => setMobileOpen(true)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {mobileOpen && <MobileMenu onClose={closeMobile} />}
    </header>
  );
};

export default Navbar;
