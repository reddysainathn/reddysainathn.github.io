import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Expertise = ({ specialties = [] }) => (
  <section className="specialties section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faCode} /><h2>What I build</h2></div>
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
