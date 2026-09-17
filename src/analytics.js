// Scroll-depth + section visibility → GA4 (gtag).
// Silent no-op when trackers are blocked. No PII is collected.
const SECTION_IDS = ['expertise', 'selected-work', 'skills', 'experience'];

export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;
  const send = (name, params) => {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  };

  const seenSections = new Set();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !seenSections.has(entry.target.id)) {
            seenSections.add(entry.target.id);
            send('section_view', { section: entry.target.id });
          }
        });
      },
      { threshold: 0.35 }
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  const milestones = [25, 50, 75, 100];
  const hit = new Set();
  let ticking = false;
  const check = () => {
    ticking = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.round((window.scrollY / scrollable) * 100);
    milestones.forEach(milestone => {
      if (pct >= milestone && !hit.has(milestone)) {
        hit.add(milestone);
        send('scroll_depth', { percent: milestone });
      }
    });
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    },
    { passive: true }
  );
  check();
};

export const trackEvent = (name, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
};
