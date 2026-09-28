import React, { useState, useEffect, useMemo, useRef } from 'react';
import { trackEvent } from '../lib/events';

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const fire = (name) => window.dispatchEvent(new Event(name));

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(
    () => [
      {
        id: 'top',
        label: 'Go to top',
        keywords: 'home start',
        run: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      },
      { id: 'expertise', label: 'Go to What I build', keywords: '01 expertise', run: () => scrollToId('expertise') },
      {
        id: 'work',
        label: 'Go to Selected systems',
        keywords: '02 systems projects work',
        run: () => scrollToId('selected-work'),
      },
      { id: 'skills', label: 'Go to Core stack', keywords: '03 skills stack tools', run: () => scrollToId('skills') },
      {
        id: 'experience',
        label: 'Go to Career timeline',
        keywords: '04 experience jobs career',
        run: () => scrollToId('experience'),
      },
      {
        id: 'testimonials',
        label: 'Go to Kind words',
        keywords: 'testimonials quotes praise',
        run: () => scrollToId('testimonials'),
      },
      { id: 'print', label: 'Print resume', keywords: 'pdf download resume cv', run: () => fire('portfolio:print') },
      {
        id: 'copy',
        label: 'Copy email address',
        keywords: 'mail contact email copy',
        run: () => fire('portfolio:copy-email'),
      },
      {
        id: 'theme',
        label: 'Toggle light / dark theme',
        keywords: 'dark light mode theme',
        run: () => fire('portfolio:toggle-theme'),
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((action) => `${action.label} ${action.keywords}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        trackEvent('palette_open');
        setOpen((previous) => !previous);
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

  const runAction = (action) => {
    trackEvent('palette_action', { action: action.id });
    setOpen(false);
    action.run();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[rgba(23,33,38,0.45)] print:hidden"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        className="palette fixed left-1/2 top-[16vh] z-[101] w-[calc(100%_-_36px)] max-w-[520px] -translate-x-1/2 animate-[pop_0.12s_ease_both] rounded-[14px] bg-card shadow-[0_24px_60px_rgba(0,0,0,0.25)] [border:1px_solid_var(--line)]"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <input
          ref={inputRef}
          className="box-border w-full border-x-0 border-t-0 bg-transparent px-4 py-[14px] font-mono text-[0.9rem] text-ink outline-none [border-bottom:1px_solid_var(--line)] pointer-coarse:text-base"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (filtered.length === 0) return;
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setActive((a) => (a + 1) % filtered.length);
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              setActive((a) => (a - 1 + filtered.length) % filtered.length);
            } else if (event.key === 'Enter' && filtered[active]) {
              runAction(filtered[active]);
            }
          }}
          placeholder="Type a command…"
          aria-label="Command palette"
        />
        <ul className="m-0 max-h-[300px] list-none overflow-y-auto p-2">
          {filtered.map((action, index) => (
            <li key={action.id}>
              <button
                type="button"
                className={`${index === active ? 'bg-[rgba(8,127,140,0.1)] ' : 'bg-transparent '}block w-full cursor-pointer rounded-lg border-0 px-3 py-[10px] text-left text-[0.88rem] font-semibold text-ink`}
                onMouseEnter={() => setActive(index)}
                onClick={() => runAction(action)}
              >
                {action.label}
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="px-3 py-[10px] text-[0.85rem] text-muted">No matching command</li>}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
