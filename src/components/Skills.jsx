import { TechIcon } from './TechIcon';

const slug = category => category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const Skills = ({ skills = {} }) => (
  <section id="skills" className="skills section-block">
    <div className="section-heading"><TechIcon name="code" /><h2>Core stack</h2><span className="section-tag">The toolbox, by terrain</span></div>
    <div className="skills-grid">
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="skill-group" key={category}>
          <p className="skill-cmd"><span className="skill-name">{category}</span> <span className="code-accent">$</span> stack --{slug(category)} <span className="skill-count">{(Array.isArray(skillList) ? skillList : []).length}</span></p>
          <div>{(Array.isArray(skillList) ? skillList : []).map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
