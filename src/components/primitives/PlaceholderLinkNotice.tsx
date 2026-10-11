import React, { useEffect, useRef, useState } from 'react';

const MESSAGE = "This page isn't available yet.";
const VISIBLE_MS = 3200;

/**
 * Many destinations are still placeholders (`href="#"`, see config/links.ts). A click on one would
 * jump the visitor to the top of the page, so this intercepts exactly those links — nothing else:
 * same-page anchors (`#faq`), real URLs and buttons are untouched — keeps the scroll position, and
 * shows a short, polite notice. The notice lives in an always-mounted live region so screen readers
 * announce it.
 */
const PlaceholderLinkNotice: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link || link.getAttribute('href') !== '#') return;
      e.preventDefault();
      setVisible(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), VISIBLE_MS);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="placeholder-notice" role="status" aria-live="polite" aria-atomic="true">
      {visible && <span className="placeholder-notice-text">{MESSAGE}</span>}
    </div>
  );
};

export default PlaceholderLinkNotice;
