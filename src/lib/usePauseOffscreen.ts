import { useEffect } from 'react';

/**
 * Pauses the looping CSS animations of page sections that are off-screen (saves CPU/battery,
 * especially on phones). Each `main > section` gets `is-offscreen` while it is more than 200px
 * outside the viewport; index.css pauses animations inside it. The margin means a section resumes
 * before it scrolls into view, and pausing (not resetting) keeps each animation where it was, so
 * nothing looks different while it is visible.
 */
export function usePauseOffscreen(): void {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
      },
      { rootMargin: '200px 0px' },
    );
    sections.forEach((section) => io.observe(section));
    return () => {
      io.disconnect();
      sections.forEach((section) => section.classList.remove('is-offscreen'));
    };
  }, []);
}
