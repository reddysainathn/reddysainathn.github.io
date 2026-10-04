import { Section, SectionHead, tagBase, tagWrap } from './ui';

const slug = (category) =>
  category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const Skills = ({ skills = {} }) => (
  <Section id="skills">
    <SectionHead icon="code" title="Core stack" sub="The toolbox, by terrain" />
    <div className="columns-2 gap-5 max-[768px]:columns-1">
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="mb-4 break-inside-avoid pt-0" key={category}>
          <p className="m-0 mb-2 font-mono text-[0.78rem] font-bold tracking-[0.02em] text-accent">
            <span className="text-[0.88rem] uppercase tracking-[0.04em] text-ink">{category}</span>{' '}
            <span className="code-accent">$</span> stack --{slug(category)}{' '}
            <span className="font-normal text-muted">{(Array.isArray(skillList) ? skillList : []).length}</span>
          </p>
          <div className={tagWrap}>
            {(Array.isArray(skillList) ? skillList : []).map((skill) => (
              <span
                className={`${tagBase} px-[10px] py-[7px] text-[0.78rem] font-semibold shadow-[inset_0_0_0_1px_rgba(8,127,140,0.06)]`}
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
