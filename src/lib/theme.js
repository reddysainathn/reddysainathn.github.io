const VALID_THEMES = ['light', 'dark'];

export const getPreferredTheme = () => {
  if (typeof window === 'undefined') return 'light';
  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const applyTheme = (theme) => {
  if (typeof document === 'undefined') return;
  const next = VALID_THEMES.includes(theme) ? theme : 'light';
  document.documentElement.dataset.theme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', next === 'dark' ? '#131c20' : '#087f8c');
};
