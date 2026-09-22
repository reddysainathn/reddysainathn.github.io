const commit = typeof __COMMIT__ !== 'undefined' ? __COMMIT__ : '';
const buildTime = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : '';
const stamp = [commit, buildTime].filter(Boolean).join(' · ');

const Footer = ({ name }) => (
  <footer className="site-footer" aria-label="Footer">
    <div className="status-bar">
      <span>
        <span className="code-accent">//</span> Thanks — {name.replace(/\s+R$/, '')};
      </span>
      <span>
        <span className="code-accent">✓</span> 0 errors
      </span>
      <button
        type="button"
        className="status-key no-print"
        onClick={() => window.dispatchEvent(new Event('portfolio:open-palette'))}
        aria-label="Open command palette"
      >
        ⌘K
      </button>
      <span>{stamp}</span>
    </div>
  </footer>
);

export default Footer;
