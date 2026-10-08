// Behavioral analytics → GA4 (gtag).
// Silent no-ops when trackers are blocked. No PII is collected.
// All listeners are passive/delegated; init is deferred to idle time
// so measurement never costs first paint.
// Measurement runs ONLY on the canonical host (plus localhost for testing);
// UX behaviors (hash sync, reveals) run everywhere.
const SECTION_IDS = ['expertise', 'selected-work', 'skills', 'experience', 'testimonials'];

const DEFAULT_HOSTS = ['reddysainathn.github.io'];

const allowedHosts = () => {
  if (typeof window !== 'undefined' && Array.isArray(window.__analyticsHosts)) {
    return window.__analyticsHosts;
  }
  return DEFAULT_HOSTS;
};

export const isAnalyticsEnabled = () => {
  if (typeof window === 'undefined') return false;
  if (typeof window.__analyticsEnabled === 'boolean') return window.__analyticsEnabled;
  return allowedHosts().includes(window.location.hostname);
};

const deviceBucket = () => {
  if (typeof window === 'undefined') return undefined;
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

export const trackEvent = (name, params = {}) => {
  // Host gate parked: track everywhere until re-enabled.
  // if (!isAnalyticsEnabled()) return;
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, { device_bucket: deviceBucket(), ...params });
  }
};

let scrollWired = false;
let clickWired = false;
let pageViewSent = false;

const textLabel = (el) => {
  const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);
  return text || undefined;
};

const sectionOf = (el) => el.closest?.('section[id]')?.id || 'hero';

export const initPageViewTracking = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (pageViewSent) return;
  pageViewSent = true;
  const params = {};
  try {
    params.referrer_host = document.referrer ? new URL(document.referrer).hostname : 'direct';
  } catch {
    params.referrer_host = 'direct';
  }
  try {
    const search = new URLSearchParams(window.location.search);
    const source = search.get('utm_source')?.slice(0, 60);
    const medium = search.get('utm_medium')?.slice(0, 60);
    const campaign = search.get('utm_campaign')?.slice(0, 60);
    if (source) params.utm_source = source;
    if (medium) params.utm_medium = medium;
    if (campaign) params.utm_campaign = campaign;
  } catch {
    /* ignore */
  }
  const landing = window.location.hash.slice(1);
  if (landing && SECTION_IDS.includes(landing)) params.landing_section = landing;
  trackEvent('page_view', params);
};

export const initScrollTracking = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (scrollWired) return;
  scrollWired = true;

  const seenSections = new Set();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seenSections.has(entry.target.id)) {
            seenSections.add(entry.target.id);
            trackEvent('section_view', { section: entry.target.id });
          }
        });
      },
      { threshold: 0.35 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  const seenCompanies = new Set();
  if ('IntersectionObserver' in window) {
    const cards = document.querySelectorAll('.experience-card[data-company]');
    if (cards.length > 0) {
      const companyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const company = entry.target.dataset?.company;
            if (entry.isIntersecting && company && !seenCompanies.has(company)) {
              seenCompanies.add(company);
              trackEvent('company_view', { company });
            }
          });
        },
        { threshold: 0.5 }
      );
      cards.forEach((el) => companyObserver.observe(el));
    }
  }

  const milestones = [25, 50, 75, 100];
  const hit = new Set();
  let ticking = false;
  const check = () => {
    ticking = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.round((window.scrollY / scrollable) * 100);
    milestones.forEach((milestone) => {
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
  if (clickWired) return;
  clickWired = true;
  document.addEventListener('click', (event) => {
    const anchor = event.target && event.target.closest ? event.target.closest('a') : null;
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (href.startsWith('mailto:')) {
      // Hero tracks directly in onClick (idle-deferred listener can miss
      // early clicks); skip here when default was prevented to avoid doubles.
      if (event.defaultPrevented) return;
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
      if (!host || host === window.location.hostname) return;
      if (anchor.closest('#selected-work')) {
        const article = anchor.closest('article');
        const project = article?.dataset?.project || article?.querySelector('h3')?.textContent?.trim().slice(0, 60);
        const params = { host };
        if (project) params.project = project;
        const label = textLabel(anchor);
        if (label) params.label = label;
        trackEvent('project_click', params);
        return;
      }
      const section = sectionOf(anchor);
      const label = anchor.getAttribute('aria-label') || textLabel(anchor);
      const type = /github\.com/i.test(host)
        ? 'github'
        : /linkedin\.com/i.test(host)
          ? 'linkedin'
          : anchor.closest('#experience')
            ? 'company'
            : 'general';
      const params = { host, section, type };
      if (label) params.label = label;
      trackEvent('outbound_click', params);
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
    milestones.forEach((milestone) => {
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

let revealsWired = false;
let hashSyncWired = false;

export const initReveals = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (revealsWired) return;
  revealsWired = true;
  const targets = document.querySelectorAll('.section-block, .site-footer');
  if (!('IntersectionObserver' in window)) {
    // No observer (old browser / prerender): leave content visible.
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    // Reveal as soon as any pixel is within 200px below the viewport, so the
    // next block fades in before the user scrolls it into view. Threshold 0.12
    // kept sections at opacity:0 until scrolled well inside (reported blank).
    { threshold: 0, rootMargin: '0px 0px 200px 0px' }
  );
  targets.forEach((el) => {
    if (el.classList.contains('revealed')) return;
    el.classList.add('reveal');
    observer.observe(el);
  });
};

export const initScrollPosition = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  try {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  } catch {
    /* ignore */
  }
  const apply = () => {
    const hash = window.location.hash.slice(1);
    if (hash && SECTION_IDS.includes(hash)) {
      // Deep link (e.g. #experience): honor it instantly, no smooth swoop.
      document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };
  apply();
  // Dev client-render mounts sections async — retry once painted if target missing.
  if (window.location.hash && !document.getElementById(window.location.hash.slice(1))) {
    window.addEventListener('load', apply, { once: true });
  }
};

export const initHashSync = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  if (!('replaceState' in window.history)) return;
  if (hashSyncWired) return;
  hashSyncWired = true;
  const topLimit = () => {
    const first = document.getElementById(SECTION_IDS[0]);
    return Math.max(first ? first.offsetTop - 80 : 160, 0);
  };
  // Scrollspy in document order: the current section is the deepest one
  // whose top has crossed the upper-third line. Recomputed from all
  // sections (not just changed entries) so the hash always follows
  // reading order and never skips or runs ahead. Hero has no hash.
  const syncHash = () => {
    if (window.scrollY < topLimit()) {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }
    const probe = window.innerHeight * 0.35;
    let current = null;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= probe) current = id;
    }
    if (current && window.location.hash !== `#${current}`) {
      window.history.replaceState(null, '', `#${current}`);
    }
  };
  const observer = new IntersectionObserver(syncHash, { rootMargin: '-60% 0px -25% 0px' });
  SECTION_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
  // rAF-throttled passive scroll keeps the hash tracking every frame in
  // order (observer alone only fires on band crossings, which lag). The
  // observer stays as backup for resizes and layout shifts without scroll.
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    syncHash();
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
};

export const initAnalytics = () => {
  initHashSync();
  initReveals();
  // Host gate parked: track everywhere until re-enabled.
  // if (!isAnalyticsEnabled()) return;
  initPageViewTracking();
  initScrollTracking();
  initClickTracking();
  initEngagementTracking();
  initPrintTracking();
};
