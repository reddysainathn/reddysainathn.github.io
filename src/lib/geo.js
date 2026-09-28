// Visitor country preselector (stub — NOT enforced).
// Timezone mapping is approximate: VPNs, travelers, and relays defeat it,
// so this must never gate access control. When ready to enforce, have
// callers check isAllowedVisitor() before enabling contact actions.
// A server-side GeoIP lookup is the only precise alternative.
export const ALLOWED_COUNTRIES = ['US'];

const US_TIMEZONES = [
  'America/New_York',
  'America/Detroit',
  'America/Kentucky/Louisville',
  'America/Kentucky/Monticello',
  'America/Indiana/Indianapolis',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Chicago',
  'America/Menominee',
  'America/North_Dakota/Center',
  'America/Denver',
  'America/Boise',
  'America/Phoenix',
  'America/Los_Angeles',
  'America/Anchorage',
  'America/Adak',
  'America/Sitka',
  'America/Juneau',
  'America/Nome',
  'America/Yakutat',
  'America/Metlakatla',
  'Pacific/Honolulu',
];

export const visitorCountry = () => {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (US_TIMEZONES.includes(zone)) return 'US';
  } catch {
    // Intl unavailable — country unknown.
  }
  return null;
};

// Always true until enforcement is switched on.
export const isAllowedVisitor = () => true;

let networkCache = null;
export const cachedNetwork = () => networkCache;

const shortOS = (raw) => {
  const s = (raw || '').toLowerCase();
  if (s.includes('android')) return 'android';
  if (s.includes('iphone') || s.includes('ipad') || s.includes('ios')) return 'ios';
  if (s.includes('mac')) return 'mac';
  if (s.includes('win')) return 'win';
  if (s.includes('linux')) return 'lin';
  return (raw || '?').slice(0, 8);
};

const detectDevice = () => {
  const ua = (typeof window !== 'undefined' && window.navigator.userAgent) || '';
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) return 'm';
  if (/Tablet|PlayBook|Touch/i.test(ua)) return 't';
  return 'd';
};

// Best-effort visitor network fingerprint via a public lookup.
// Idle-warmed and cached; never blocks UI. Returns null on any failure.
// NOTE: only ever embed the result where the sender can see it
// (e.g. a prefilled email body) — never exfiltrate silently.
export const visitorNetwork = async ({ timeout = 3000 } = {}) => {
  if (networkCache) return networkCache;
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeout);
    const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    window.clearTimeout(timer);
    if (!response.ok) return null;
    const body = await response.json();
    const uad = window.navigator.userAgentData;
    networkCache = {
      country: body.country_code || null,
      ip: body.ip || null,
      city: body.city || null,
      os: shortOS((uad && uad.platform) || window.navigator.platform),
      device: detectDevice(),
    };
  } catch {
    networkCache = null;
  }
  return networkCache;
};
