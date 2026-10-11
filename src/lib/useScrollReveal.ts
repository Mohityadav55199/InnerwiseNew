import { useEffect } from 'react';

/**
 * Scroll-triggered reveal. Any element with `data-reveal="up|left|right|scale"` starts hidden
 * (see "Scroll reveal" in index.css) and fades/slides in the first time it scrolls into view.
 * `data-reveal-delay="120"` staggers siblings. With reduced motion, or without
 * IntersectionObserver, everything is simply shown.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const reveal = (el: HTMLElement) => {
      const delay = Number(el.dataset.revealDelay ?? 0);
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add('is-revealed');
      // drop the delay afterwards so it doesn't slow down hover transitions on the same element
      if (delay) window.setTimeout(() => { el.style.transitionDelay = ''; }, delay + 900);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => { if (!el.classList.contains('is-revealed')) io.observe(el); });
    return () => io.disconnect();
  }, []);
}
