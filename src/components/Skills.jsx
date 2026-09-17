import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const CATEGORY_ICONS = {
  'Languages': '💻',
  'Applied AI': '🤖',
  'Backend & Platform': '⚙️',
  'Data': '🗄️',
  'Cloud, DevOps & Security': '☁️',
};

const Skills = ({ skills = {} }) => (
  <section id="skills" className="skills section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faCode} /><h2>Core stack</h2><span className="section-tag">The toolbox, by terrain</span></div>
    <div className="skills-grid">
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="skill-group" key={category}>
          <h3>{CATEGORY_ICONS[category] && <span aria-hidden="true">{CATEGORY_ICONS[category]}</span>} {category} <span className="skill-count">{(Array.isArray(skillList) ? skillList : []).length}</span></h3>
          <div>{(Array.isArray(skillList) ? skillList : []).map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
