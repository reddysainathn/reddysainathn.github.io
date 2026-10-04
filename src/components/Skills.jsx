import { TechIcon } from './TechIcon';

const slug = (category) =>
  category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const Skills = ({ skills = {} }) => (
  <section id="skills" className="section-block scroll-mt-3">
    <div className="mb-2 flex items-center gap-[11px]">
      <TechIcon name="code" className="h-[1em] w-[1em] text-signal" />
      <h2 className="m-0 font-display text-[1.1rem] font-bold uppercase tracking-[-0.02em] text-ink">Core stack</h2>
      <span className="text-[0.8rem] font-normal text-muted max-[768px]:hidden">The toolbox, by terrain</span>
    </div>
    <div className="columns-2 gap-4 max-[768px]:columns-1">
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="mb-3 break-inside-avoid pt-0" key={category}>
          <p className="m-0 mb-1.5 font-mono text-[0.78rem] font-bold tracking-[0.02em] text-accent">
            <span className="text-[0.88rem] uppercase tracking-[0.04em] text-ink">{category}</span>{' '}
            <span className="code-accent">$</span> stack --{slug(category)}{' '}
            <span className="font-normal text-muted">{(Array.isArray(skillList) ? skillList : []).length}</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(Array.isArray(skillList) ? skillList : []).map((skill) => (
              <span
                className="inline-block rounded-full bg-card px-[9px] py-[6px] text-[0.78rem] font-semibold text-ink shadow-[inset_0_0_0_1px_rgba(8,127,140,0.06)] [border:1px_solid_rgba(8,127,140,0.34)] [transition:background_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[1px] hover:bg-card"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
