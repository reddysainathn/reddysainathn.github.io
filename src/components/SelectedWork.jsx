import { Section, SectionHead, cardShell, cardTitle } from './ui';

const labelMono = 'font-mono text-[0.75rem] uppercase text-accent';
const bodyText = 'mt-1 mb-0 text-[0.9rem] leading-[1.5] text-body';

const SelectedWork = ({ work = [] }) => (
  <Section id="selected-work">
    <SectionHead icon="code" title="Selected systems" sub="Problems, architecture, tradeoffs" />
    <div>
      {(Array.isArray(work) ? work : []).map((project) => (
        <article
          className={`work-item mb-2.5 ${cardShell} px-4 py-3 [transition:border-color_0.2s_ease,box-shadow_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(23,33,38,0.08)] hover:[border-color:var(--accent)]`}
          key={project.title}
          data-project={project.title}
        >
          <header className="mb-1.5 flex items-baseline justify-between gap-4">
            <h3 className={`${cardTitle} text-[1.12rem]`}>{project.title}</h3>
            <small className={`text-right ${labelMono}`}>{project.context}</small>
          </header>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 max-[768px]:grid-cols-1">
            <div>
              <b className={labelMono}>Problem</b>
              <p className={bodyText}>{project.problem}</p>
            </div>
            <div>
              <b className={labelMono}>Approach</b>
              <p className={bodyText}>{project.approach}</p>
            </div>
            <span className="col-span-full text-[0.75rem] font-bold text-accent max-[768px]:col-auto">
              {project.stack}
            </span>
          </div>
          {Array.isArray(project.links) && project.links.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
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
  </Section>
);

export default SelectedWork;
