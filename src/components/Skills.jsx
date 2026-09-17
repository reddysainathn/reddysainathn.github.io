import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Skills = ({ skills = {} }) => (
  <section className="skills section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faCode} /><h2>Core stack</h2></div>
    <div className="skills-grid">
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="skill-group" key={category}>
          <h3>{category}</h3>
          <div>{(Array.isArray(skillList) ? skillList : []).map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
