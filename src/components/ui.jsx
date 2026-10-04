import { TechIcon } from './TechIcon';

// Shared class strings. Keep them full literals: Tailwind v4 scans source
// text, so split or computed names would silently drop utilities.
export const sectionHeadRow = 'mb-2 flex items-center gap-[11px]';
export const sectionWrap = 'section-block scroll-mt-3';
export const sectionHeadIcon = 'h-[1em] w-[1em] text-signal';
export const sectionTitle = 'm-0 font-display text-[1.1rem] font-bold uppercase tracking-[-0.02em] text-ink';
export const sectionSub = 'text-[0.8rem] font-normal text-muted max-[768px]:hidden';

export const cardShell = 'rounded-[14px] bg-card [border:1px_solid_var(--line)]';

export const cardTitle = 'm-0 font-display font-bold text-ink';

export const tagBase =
  'inline-block rounded-full bg-card text-ink [border:1px_solid_rgba(8,127,140,0.34)] [transition:background_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[1px] hover:bg-card';

export const tagWrap = 'flex flex-wrap gap-1.5';

export function Section({ id, className, children }) {
  return (
    <section id={id} className={className ? `${sectionWrap} ${className}` : sectionWrap}>
      {children}
    </section>
  );
}

export function SectionHead({ icon, title, sub, rowClassName }) {
  return (
    <div className={rowClassName || sectionHeadRow}>
      <TechIcon name={icon} className={sectionHeadIcon} />
      <h2 className={sectionTitle}>{title}</h2>
      {sub ? <span className={sectionSub}>{sub}</span> : null}
    </div>
  );
}
