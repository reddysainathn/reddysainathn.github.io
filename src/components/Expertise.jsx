import { TechIcon } from './TechIcon';

const Expertise = ({ specialties = [] }) => (
  <section id="expertise" className="specialties section-block">
    <div className="section-heading"><TechIcon name="code" /><h2>What I build</h2><span className="section-tag">Three practices, one engineer</span></div>
    <div className="specialty-grid">
      {(Array.isArray(specialties) ? specialties : []).map(specialty => (
        <article className="specialty" key={specialty.title}>
          <h3>{specialty.title}</h3>
          <p>{specialty.description}</p>
          <span>{specialty.stack}</span>
        </article>
      ))}
    </div>
  </section>
);

export default Expertise;
