import { TechIcon } from './TechIcon';

const Expertise = ({ specialties = [] }) => (
  <section id="expertise" className="section-block scroll-mt-3">
    <div className="mb-3 flex items-center gap-[11px]">
      <TechIcon name="code" className="h-[1em] w-[1em] text-signal" />
      <h2 className="m-0 font-display text-[1.1rem] font-bold uppercase tracking-[-0.02em] text-ink">What I build</h2>
      <span className="text-[0.8rem] font-normal text-muted max-[768px]:hidden">Three practices, one engineer</span>
    </div>
    <div className="grid grid-cols-3 gap-[18px] max-[768px]:grid-cols-1">
      {(Array.isArray(specialties) ? specialties : []).map((specialty) => (
        <article
          className="min-h-[120px] py-[2px] pl-[18px] [border-left:2px_solid_var(--accent)] [transition:border-color_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[2px] hover:[border-color:var(--signal)]"
          key={specialty.title}
        >
          <h3 className="m-0 mb-3 font-display text-[1.08rem] font-bold text-ink">{specialty.title}</h3>
          <p className="m-0 mb-[22px] text-[0.9rem] leading-[1.55] text-muted">{specialty.description}</p>
          <span className="text-[0.75rem] font-bold leading-[1.45] text-accent">{specialty.stack}</span>
        </article>
      ))}
    </div>
  </section>
);

export default Expertise;
