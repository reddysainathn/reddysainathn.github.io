import { Section, SectionHead, cardShell, cardTitle, tagBase, tagWrap } from './ui';

const bodyText = 'mb-0 text-[0.9rem] leading-[1.5] text-body';

// Lane colors are fixed literals so Tailwind can see every utility.
const flowTones = {
  signal: { label: 'text-signal', node: 'border-signal/35', arrow: 'text-signal' },
  accent: { label: 'text-accent', node: 'border-accent/35', arrow: 'text-accent' },
  thumb: { label: 'text-thumb', node: 'border-thumb/35', arrow: 'text-thumb' },
};

// One schema per project: description (what it is) → optional tiny labeled
// flow lanes → tech chips only when there is no flow → links.
// Lane labels only, no fragments: the card reads in seconds and stays
// identical in shape from 1 project to 6.
const techItems = (tech) =>
  (Array.isArray(tech) ? tech : String(tech || '').split('·')).map((s) => String(s).trim()).filter(Boolean);

const techOf = (project) => {
  const direct = techItems(project.tech);
  if (direct.length > 0) return direct;
  // Back-compat with the capabilities shape: flatten per-layer tech.
  if (Array.isArray(project.capabilities)) {
    return project.capabilities.flatMap((row) => techItems(row && row.tech));
  }
  return [];
};

const PersonalProjects = ({ projects = [] }) => {
  if (!Array.isArray(projects) || projects.length === 0) return null;
  return (
    <Section id="personal-projects">
      <SectionHead icon="code" title="Personal projects" sub="Live builds — what they do, how they're built" />
      <div className="project-grid grid grid-cols-2 gap-2.5 max-[768px]:grid-cols-1">
        {(Array.isArray(projects) ? projects : []).map((project, index) => {
          const links = Array.isArray(project.links) ? project.links : [];
          const primary = links.filter((link) => link.primary);
          const secondary = links.filter((link) => !link.primary);
          const tech = techOf(project);
          const flowLanes = (Array.isArray(project.flow) ? project.flow : [])
            .map((lane) => ({
              label: typeof lane?.label === 'string' ? lane.label.trim() : '',
              tone: flowTones[lane?.tone] || flowTones.accent,
              steps: Array.isArray(lane?.steps)
                ? lane.steps.filter((step) => typeof step === 'string' || step?.break)
                : [],
            }))
            .filter((lane) => lane.steps.length > 0);
          const description = project.description || project.tagline;
          return (
            <article
              className={`work-item group flex h-full flex-col ${cardShell} px-4 py-3 [transition:border-color_0.2s_ease,box-shadow_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(23,33,38,0.08)] hover:[border-color:var(--accent)] focus-within:-translate-y-[2px] focus-within:shadow-[0_10px_24px_rgba(23,33,38,0.08)] focus-within:[border-color:var(--accent)]`}
              key={`${project.title}-${index}`}
              data-project={project.title}
            >
              <header className="mb-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h3 className={`${cardTitle} min-w-0 text-[1.05rem]`}>{project.title}</h3>
                {primary.length > 0 && (
                  <div className="flex shrink-0 items-center gap-2 max-[768px]:w-full">
                    {primary.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} ${link.label}`}
                        className="cta-pill inline-block rounded-full px-4 py-2 text-[0.85rem] font-bold max-[768px]:flex-1 max-[768px]:text-center"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </header>
              {description ? <p className={bodyText}>{description}</p> : null}
              {flowLanes.length > 0 && (
                <div className="mt-2.5 flex flex-col gap-1.5 rounded-[9px] bg-paper px-2.5 py-2 [border:1px_solid_var(--line)]">
                  {flowLanes.map((lane) => (
                    <div className="flex items-start gap-2" key={lane.label || lane.steps[0]}>
                      {lane.label ? (
                        <span
                          aria-hidden="true"
                          className={`w-[40px] shrink-0 whitespace-nowrap pt-[4px] font-mono text-[0.56rem] font-bold tracking-[0.04em] ${lane.tone.label}`}
                        >
                          {lane.label}
                        </span>
                      ) : null}
                      <ol
                        className="m-0 flex min-w-0 flex-1 list-none flex-wrap items-center gap-x-1.5 gap-y-1.5 p-0 font-mono text-[0.66rem] leading-none text-muted max-[768px]:text-[0.63rem]"
                        aria-label={`${project.title} ${lane.label || 'data'} flow`}
                        role="list"
                      >
                        {lane.steps.map((step, stepIndex) => {
                          if (typeof step === 'object' && step?.break) {
                            return (
                              <li
                                aria-hidden="true"
                                className="hidden max-[768px]:block max-[768px]:basis-full"
                                key={`break-${stepIndex}`}
                              />
                            );
                          }
                          return (
                            <li className="flex items-center gap-1.5" key={step}>
                              <span
                                className={`whitespace-nowrap rounded-[5px] border bg-card px-2 py-[4px] text-ink [transition:transform_0.2s_ease] motion-safe:hover:-translate-y-[1px] ${lane.tone.node}`}
                              >
                                {step}
                              </span>
                              {stepIndex < lane.steps.length - 1 && (
                                <span
                                  aria-hidden="true"
                                  className={`text-[0.8rem] [transition:transform_0.2s_ease] motion-safe:group-hover:translate-x-[2px] motion-safe:group-focus-within:translate-x-[2px] ${lane.tone.arrow}`}
                                >
                                  →
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  ))}
                </div>
              )}
              {/* Tech chips parked: the flow already names the stack.
                  Projects without a flow keep the chip row. */}
              {tech.length > 0 && flowLanes.length === 0 && (
                <div className={`${tagWrap} mt-2`}>
                  {tech.map((item) => (
                    <span
                      className={`${tagBase} px-[10px] py-[7px] text-[0.78rem] font-semibold shadow-[inset_0_0_0_1px_rgba(8,127,140,0.06)]`}
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
              {secondary.length > 0 && (
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                  {secondary.map((link) => (
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
          );
        })}
      </div>
    </Section>
  );
};

export default PersonalProjects;
