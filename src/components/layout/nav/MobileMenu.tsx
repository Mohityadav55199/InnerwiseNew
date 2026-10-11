import React, { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '../../../config/navigation';
import { NAV_LINKS } from '../../../config/links';
import Button from '../../primitives/Button';
import { ChevronDown, ChevronRight, CircleIcon } from './icons';

interface MobileMenuProps {
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Full-screen mobile menu (Figma "Web Nav-1/2/3"): level 1 lists the nav items, items with a
 * mega-menu drill into level 2 (back · title · close) where each column is an accordion.
 * Behaves as a modal dialog: focus moves in, Tab is trapped, Escape closes, page scroll is
 * locked, and focus returns to the trigger when it closes (handled by the Navbar).
 * Mounted only while open, so its level/accordion state resets on every open.
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const [levelId, setLevelId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<string | null>(null);

  const level = NAV_ITEMS.find((item) => item.id === levelId);

  // Scroll lock while open
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = prev; };
  }, []);

  // Move focus into the dialog on open and on every level change
  useEffect(() => {
    const root = dialogRef.current;
    if (!root) return;
    const target = levelId
      ? root.querySelector<HTMLElement>('[data-autofocus]')
      : (lastItemRef.current && root.querySelector<HTMLElement>(`[data-item="${lastItemRef.current}"]`))
        || root.querySelector<HTMLElement>('.mnav-close');
    target?.focus();
  }, [levelId]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const nodes = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const openLevel = (id: string) => { lastItemRef.current = id; setExpanded(null); setLevelId(id); };

  return (
    <div
      id="mobile-nav"
      ref={dialogRef}
      className="mnav"
      role="dialog"
      aria-modal="true"
      aria-label={level ? level.label : 'Menu'}
      onKeyDown={onKeyDown}
    >
      <div className="mnav-inner">
        <div className="mnav-top">
          {level && (
            <button type="button" className="mnav-icon-btn" onClick={() => setLevelId(null)} aria-label="Back to menu" data-autofocus>
              <CircleIcon kind="back" />
            </button>
          )}
          {level && <h2 className="mnav-title">{level.label}</h2>}
          <button type="button" className="mnav-icon-btn mnav-close" onClick={onClose} aria-label="Close menu">
            <CircleIcon kind="close" />
          </button>
        </div>

        {!level && (
          <ul className="mnav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                {item.menu ? (
                  <button type="button" className="mnav-row" data-item={item.id} onClick={() => openLevel(item.id)}>
                    {item.label}
                    <ChevronRight />
                  </button>
                ) : (
                  <a href={item.href} className="mnav-row" data-item={item.id} onClick={onClose}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        )}

        {level?.menu && (
          <ul className="mnav-groups">
            {level.menu.columns.map((col) => {
              const isOpen = expanded === col.title;
              const panelId = `mnav-${level.id}-${col.title.replace(/\W+/g, '-').toLowerCase()}`;
              return (
                <li key={col.title}>
                  <button
                    type="button"
                    className="mnav-group-btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isOpen ? null : col.title)}
                  >
                    {col.title}
                    <ChevronDown up={isOpen} />
                  </button>
                  <ul id={panelId} className="mnav-group-links" hidden={!isOpen}>
                    {col.links.map((link) => (
                      <li key={link.label}><a href={link.href} onClick={onClose}>{link.label}</a></li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mnav-bottom">
          <hr className="mnav-bottom-rule" />
          <a href={NAV_LINKS.signIn} className="mnav-signin" onClick={onClose}>Sign In</a>
          <Button variant="primary" href={NAV_LINKS.getStarted} className="mnav-cta">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
