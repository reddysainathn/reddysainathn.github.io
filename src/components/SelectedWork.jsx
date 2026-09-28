import { TechIcon } from './TechIcon';

const SelectedWork = ({ work = [] }) => (
  <section id="selected-work" className="selected-work section-block scroll-mt-3">
    <div className="mb-3 flex items-center gap-[11px]">
      <TechIcon name="code" className="h-[1em] w-[1em] text-signal" />
      <h2 className="m-0 font-display text-[1.1rem] font-bold uppercase tracking-[-0.02em] text-ink">
        Selected systems
      </h2>
      <span className="text-[0.8rem] font-normal text-muted max-[768px]:hidden">Problems, architecture, tradeoffs</span>
    </div>
    <div>
      {(Array.isArray(work) ? work : []).map((project) => (
        <article
          className="work-item mb-[14px] rounded-[14px] bg-card px-[18px] py-4 [border:1px_solid_var(--line)] [transition:border-color_0.2s_ease,box-shadow_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(23,33,38,0.08)] hover:[border-color:var(--accent)]"
          key={project.title}
        >
          <header className="mb-[10px] flex items-baseline justify-between gap-4">
            <h3 className="m-0 font-display text-[1.12rem] font-bold text-ink">{project.title}</h3>
            <small className="text-right font-mono text-[0.75rem] uppercase text-accent">{project.context}</small>
          </header>
          <div className="grid grid-cols-2 gap-x-[18px] gap-y-3 max-[768px]:grid-cols-1">
            <div>
              <b className="font-mono text-[0.75rem] uppercase text-accent">Problem</b>
              <p className="mt-[5px] mb-0 text-[0.92rem] leading-[1.5] text-body">{project.problem}</p>
            </div>
            <div>
              <b className="font-mono text-[0.75rem] uppercase text-accent">Approach</b>
              <p className="mt-[5px] mb-0 text-[0.92rem] leading-[1.5] text-body">{project.approach}</p>
            </div>
            <span className="col-span-full text-[0.75rem] font-bold text-accent max-[768px]:col-auto">
              {project.stack}
            </span>
          </div>
          {Array.isArray(project.links) && project.links.length > 0 && (
            <div className="mt-[10px] flex flex-wrap gap-x-4 gap-y-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] font-bold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  </section>
);

export default SelectedWork;
