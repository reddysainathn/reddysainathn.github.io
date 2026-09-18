const Footer = ({ name }) => (
  <footer className="site-footer" aria-label="Footer">
    <div className="status-bar">
      <span><span className="code-accent">//</span> Thanks — {name.replace(/\s+R$/, '')};</span>
      <span><span className="code-accent">✓</span> 0 errors</span>
      <button type="button" className="status-key no-print" onClick={() => window.dispatchEvent(new Event('portfolio:open-palette'))} aria-label="Open command palette">⌘K</button>
      <span>{__COMMIT__} · {__BUILD_TIME__}</span>
    </div>
  </footer>
);

export default Footer;
