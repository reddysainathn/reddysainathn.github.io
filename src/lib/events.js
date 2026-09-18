// Behavioral analytics → GA4 (gtag).
// Silent no-ops when trackers are blocked. No PII is collected.
// All listeners are passive/delegated; init is deferred to idle time
// so measurement never costs first paint.
const SECTION_IDS = ['expertise', 'selected-work', 'skills', 'experience', 'testimonials'];

const deviceBucket = () => {
  if (typeof window === 'undefined') return undefined;
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

export const trackEvent = (name, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, { device_bucket: deviceBucket(), ...params });
  }
};

export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const seenSections = new Set();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !seenSections.has(entry.target.id)) {
            seenSections.add(entry.target.id);
            trackEvent('section_view', { section: entry.target.id });
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
        trackEvent('scroll_depth', { percent: milestone });
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

export const initClickTracking = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  document.addEventListener('click', event => {
    const anchor = event.target && event.target.closest ? event.target.closest('a') : null;
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (href.startsWith('mailto:')) {
      trackEvent('contact_click', { method: 'email' });
      return;
    }
    if (/^https?:\/\//i.test(href)) {
      let host = '';
      try {
        host = new URL(href).hostname;
      } catch {
        return;
      }
      if (host && host !== window.location.hostname) {
        trackEvent('outbound_click', { host });
      }
    }
  });
};

export const initEngagementTracking = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const milestones = [30, 60, 180];
  const hit = new Set();
  let activeSeconds = 0;
  window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    activeSeconds += 5;
    milestones.forEach(milestone => {
      if (activeSeconds >= milestone && !hit.has(milestone)) {
        hit.add(milestone);
        trackEvent('engaged_time', { seconds: milestone });
      }
    });
  }, 5000);
};

export const initPrintTracking = () => {
  if (typeof window === 'undefined') return;
  window.addEventListener('afterprint', () => trackEvent('print_completed'));
};

export const initReveals = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const targets = document.querySelectorAll('.section-block, .site-footer');
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
};

export const initHashSync = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  if (!('replaceState' in window.history)) return;
  const observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => SECTION_IDS.indexOf(a.target.id) - SECTION_IDS.indexOf(b.target.id));
      const current = visible[visible.length - 1];
      if (current && window.location.hash !== `#${current.target.id}`) {
        window.history.replaceState(null, '', `#${current.target.id}`);
      }
    },
    { rootMargin: '-60% 0px -25% 0px' }
  );
  SECTION_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
};

export const initAnalytics = () => {
  initScrollTracking();
  initClickTracking();
  initEngagementTracking();
  initPrintTracking();
  initHashSync();
  initReveals();
};
