import { TechIcon } from './TechIcon';
import { roleTenure } from '../utils/dates';

const Experience = ({ experience = [], defaultLogo }) => (
  <section id="experience" className="experience section-block">
    <div className="timeline-rail" aria-hidden="true" />
    <div className="section-heading"><TechIcon name="briefcase" /><h2>Career timeline</h2></div>
    {(Array.isArray(experience) ? experience : []).map((job, index) => (
      <article className={`experience-card ${index === 0 ? 'current-role' : ''}`} key={index}>
        <div className="timeline-marker" aria-label={`${job.role} at ${job.company}: ${roleTenure(job.startDate, job.endDate) || job.startDate}`}><span data-tenure={roleTenure(job.startDate, job.endDate) || undefined} /></div>
        <div className="logo-container">
          <img src={job.logo || defaultLogo} alt={`${job.company} logo`} className="company-logo" loading="lazy" decoding="async" width="84" height="58" />
        </div>
        <div className="experience-details">
          <div className="role-line"><h3>{job.role}</h3><span className="duration">{job.startDate} - {job.endDate || 'Present'}</span></div>
          <p className="company-line"><strong>{job.company}</strong><span>·</span>{job.domain}<span>·</span>{job.mainFocus}{job.location && (<><span>·</span>{job.location}</>)}</p>
          <div className="timeline-tech" aria-label={`${job.company} technologies`}>
            {(job.technologies || []).map(technology => <span key={technology}>{technology}</span>)}
          </div>
          {!job.hideResponsibilities && Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
            <ul className="responsibilities-list">
              {job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}
        </div>
      </article>
    ))}
  </section>
);

export default Experience;
