import { TechIcon } from './TechIcon';

const slug = (category) =>
  category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const Skills = ({ skills = {} }) => (
  <section id="skills" className="skills section-block">
    <div className="mb-3 flex items-center gap-[11px]">
      <TechIcon name="code" className="h-[1em] w-[1em] text-signal" />
      <h2>Core stack</h2>
      <span className="text-[0.8rem] font-normal text-muted max-[768px]:hidden">The toolbox, by terrain</span>
    </div>
    <div className="columns-2 gap-6 max-[768px]:columns-1">
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="mb-4 break-inside-avoid pt-[2px]" key={category}>
          <p className="m-0 mb-[10px] font-mono text-[0.78rem] font-bold tracking-[0.02em] text-accent">
            <span className="text-[0.88rem] uppercase tracking-[0.04em] text-ink">{category}</span>{' '}
            <span className="code-accent">$</span> stack --{slug(category)}{' '}
            <span className="font-normal text-muted">{(Array.isArray(skillList) ? skillList : []).length}</span>
          </p>
          <div>
            {(Array.isArray(skillList) ? skillList : []).map((skill) => (
              <span
                className="mr-[6px] mb-[6px] rounded-full bg-card px-[10px] py-[7px] text-[0.78rem] font-semibold text-ink shadow-[inset_0_0_0_1px_rgba(8,127,140,0.06)] [border:1px_solid_rgba(8,127,140,0.34)] [transition:background_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[1px] hover:bg-card"
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
