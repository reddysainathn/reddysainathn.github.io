import React, { useState, useEffect, useMemo, useRef } from 'react';
import { trackEvent } from '../lib/events';

const scrollToId = id => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const fire = name => window.dispatchEvent(new Event(name));

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(() => [
    { id: 'top', label: 'Go to top', keywords: 'home start', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'expertise', label: 'Go to What I build', keywords: '01 expertise', run: () => scrollToId('expertise') },
    { id: 'work', label: 'Go to Selected systems', keywords: '02 systems projects work', run: () => scrollToId('selected-work') },
    { id: 'skills', label: 'Go to Core stack', keywords: '03 skills stack tools', run: () => scrollToId('skills') },
    { id: 'experience', label: 'Go to Career timeline', keywords: '04 experience jobs career', run: () => scrollToId('experience') },
    { id: 'testimonials', label: 'Go to Kind words', keywords: 'testimonials quotes praise', run: () => scrollToId('testimonials') },
    { id: 'print', label: 'Print resume', keywords: 'pdf download resume cv', run: () => fire('portfolio:print') },
    { id: 'copy', label: 'Copy email address', keywords: 'mail contact email copy', run: () => fire('portfolio:copy-email') },
    { id: 'theme', label: 'Toggle light / dark theme', keywords: 'dark light mode theme', run: () => fire('portfolio:toggle-theme') },
  ], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(action => `${action.label} ${action.keywords}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => { setActive(0); }, [query, open]);

  useEffect(() => {
    const onKey = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        trackEvent('palette_open');
        setOpen(previous => !previous);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    const onExternalOpen = () => {
      trackEvent('palette_open');
      setOpen(true);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('portfolio:open-palette', onExternalOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('portfolio:open-palette', onExternalOpen);
    };
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  const runAction = action => {
    trackEvent('palette_action', { action: action.id });
    setOpen(false);
    action.run();
  };

  return (
    <div className="palette-backdrop no-print" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          className="palette-input"
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={event => {
            if (filtered.length === 0) return;
            if (event.key === 'ArrowDown') { event.preventDefault(); setActive(a => (a + 1) % filtered.length); }
            else if (event.key === 'ArrowUp') { event.preventDefault(); setActive(a => (a - 1 + filtered.length) % filtered.length); }
            else if (event.key === 'Enter' && filtered[active]) { runAction(filtered[active]); }
          }}
          placeholder="Type a command…"
          aria-label="Command palette"
        />
        <ul className="palette-list">
          {filtered.map((action, index) => (
            <li key={action.id}>
              <button
                type="button"
                className={`palette-item${index === active ? ' active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => runAction(action)}
              >
                {action.label}
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="palette-empty">No matching command</li>}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
