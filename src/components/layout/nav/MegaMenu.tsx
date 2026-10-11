import React from 'react';
import type { MegaMenu as MegaMenuData } from '../../../config/navigation';
import { ASSETS } from '../../../config/assets';

interface MegaMenuProps {
  id: string;
  labelledBy: string;
  menu: MegaMenuData;
  open: boolean;
  onNavigate: () => void;
  onPointerEnter: (e: React.PointerEvent) => void;
}

/**
 * Desktop mega-menu panel (Figma "Nav / <item> / Open"): cream band, white rounded panel,
 * equal columns with a coloured accent bar, and a footer strip with the section CTA.
 * Kept mounted (hidden when closed) so the trigger's aria-controls always resolves, and
 * rendered right after its trigger so Tab moves from the trigger into the panel.
 */
const MegaMenu: React.FC<MegaMenuProps> = ({ id, labelledBy, menu, open, onNavigate, onPointerEnter }) => (
  <div id={id} className="mega" hidden={!open} onPointerEnter={onPointerEnter}>
    <div className="mega-panel" role="region" aria-labelledby={labelledBy}>
      <p className="mega-eyebrow">{menu.eyebrow}</p>

      <div className="mega-columns" style={{ gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr))` }}>
        {menu.columns.map((col) => (
          <div key={col.title}>
            <h2 className="mega-col-title" style={{ '--accent': col.accent } as React.CSSProperties}>{col.title}</h2>
            <ul className="mega-links">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={onNavigate}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mega-footer">
        <div>
          <a href={menu.footer.href} className="mega-footer-link" onClick={onNavigate}>
            {menu.footer.title} <span aria-hidden="true">→</span>
          </a>
          <p className="mega-footer-text">{menu.footer.text}</p>
        </div>
        {menu.companion && (
          <a href={menu.companion.href} className="mega-companion" onClick={onNavigate}>
            <img src={ASSETS.avatarMascot} alt="" width={40} height={40} />
            {menu.companion.label}
          </a>
        )}
      </div>
    </div>
  </div>
);

export default MegaMenu;
