import { Section, SectionHead, cardShell, cardTitle, tagBase, tagWrap } from './ui';

const bodyText = 'mb-0 text-[0.9rem] leading-[1.5] text-body';

// One schema per project: description (one clear line on what it is) →
// a single tech chip row in the exact Core Stack pill style → links.
// No layer labels, no fragments: the card reads in seconds and stays
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
          const description = project.description || project.tagline;
          return (
            <article
              className={`work-item flex h-full flex-col ${cardShell} px-4 py-3 [transition:border-color_0.2s_ease,box-shadow_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(23,33,38,0.08)] hover:[border-color:var(--accent)]`}
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
              {tech.length > 0 && (
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
