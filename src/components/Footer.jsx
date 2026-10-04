const commit = typeof __COMMIT__ !== 'undefined' ? __COMMIT__ : '';
const buildTime = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : '';
const stamp = [commit, buildTime].filter(Boolean).join(' · ');

const Footer = ({ name }) => (
  <footer className="site-footer [border-top:1px_solid_var(--line)] mt-1 pt-3 pb-2 text-center" aria-label="Footer">
    <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[10px] bg-ink px-3 py-2 font-mono [font-size:0.72rem] text-paper">
      <span>
        <span className="font-bold text-signal">//</span> Thanks — {name.replace(/\s+R$/, '')};
      </span>
      <span>
        <span className="font-bold text-signal">✓</span> 0 errors
      </span>
      <button
        type="button"
        className="print:hidden rounded-md border border-solid border-current bg-transparent px-2 py-[2px] [font:inherit] text-inherit cursor-pointer"
        onClick={() => window.dispatchEvent(new Event('portfolio:open-palette'))}
        aria-label="Open command palette"
      >
        ⌘K
      </button>
      <span className="max-[768px]:hidden">{stamp}</span>
    </div>
  </footer>
);

export default Footer;
