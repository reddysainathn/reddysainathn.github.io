import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Experience = ({ experience = [], defaultLogo }) => (
  <section className="experience section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faBriefcase} /><h2>Career timeline</h2></div>
    {(Array.isArray(experience) ? experience : []).map((job, index) => (
      <article className={`experience-card ${index === 0 ? 'current-role' : ''}`} key={index}>
        <div className="timeline-marker" aria-hidden="true"><span /></div>
        <div className="logo-container">
          <img src={job.logo || defaultLogo} alt={`${job.company} logo`} className="company-logo" loading="lazy" decoding="async" width="84" height="58" />
        </div>
        <div className="experience-details">
          <div className="role-line"><h3>{job.role}</h3><span className="duration">{job.startDate} - {job.endDate || 'Present'}</span></div>
          <p className="company-line"><strong>{job.company}</strong><span>·</span>{job.domain}<span>·</span>{job.mainFocus}</p>
          <div className="timeline-tech" aria-label={`${job.company} technologies`}>
            {(job.technologies || []).map(technology => <span key={technology}>{technology}</span>)}
          </div>
        </div>
      </article>
    ))}
  </section>
);

export default Experience;
