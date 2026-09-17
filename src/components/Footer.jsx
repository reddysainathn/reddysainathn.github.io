const Footer = ({ name }) => (
  <footer className="site-footer" aria-label="Footer">
    <p className="footer-line"><span className="code-accent">//</span> designed + built by {name} · React, Vite, GitHub Pages</p>
    <p className="footer-line"><span className="code-accent">$</span> thanks --for-scrolling · © {new Date().getFullYear()}</p>
  </footer>
);

export default Footer;
