import { yearsOfExperience } from '../utils/dates';
import { TechIcon } from './TechIcon';

const handle = url => url.replace('https://', '').split('/').filter(Boolean).pop();

const PrintResume = ({ data }) => {
  const years = yearsOfExperience(data.experience);

  return (
    <div className="print-resume print-only" aria-hidden="true">
      <header>
        <h1>{data.name}</h1>
        <p className="pr-headline">{data.headline}</p>
        <p className="pr-contact">
          {data.email && <a href={`mailto:${data.email}`}><span aria-hidden="true">📧 </span>{data.email}</a>}
          {data.github && <><span aria-hidden="true"> · </span><a href={data.github}><TechIcon name="github" /> {handle(data.github)}</a></>}
          {data.linkedin && <><span aria-hidden="true"> · </span><a href={data.linkedin}><TechIcon name="linkedin" /> {handle(data.linkedin)}</a></>}
          {data.location && <><span aria-hidden="true"> · 📍 </span>{data.location}</>}
        </p>
        <p className="pr-snapshot">
          {[years && `${years}+ years experience`, data.availability, data.workAuthorization, data.remotePreference].filter(Boolean).join('  ·  ')}
        </p>
      </header>
      <section>
        <h2>Experience</h2>
        {(Array.isArray(data.experience) ? data.experience : []).map((job, index) => (
          <div className="pr-job" key={index}>
            <p className="pr-role"><span><strong>{job.role}</strong> — {job.company}</span><span className="pr-dates">{job.startDate} – {job.endDate || 'Present'}</span></p>
            <p className="pr-meta">{[job.domain, job.mainFocus].filter(Boolean).join(' · ')}</p>
            {!job.hideResponsibilities && Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
              <ul>{job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}</ul>
            )}
            <p className="pr-tech">{(job.technologies || []).join(', ')}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>Selected Work</h2>
        {(Array.isArray(data.selectedWork) ? data.selectedWork : []).map(project => (
          <div className="pr-job" key={project.title}>
            <p className="pr-role"><span><strong>{project.title}</strong></span><span className="pr-dates">{project.context}</span></p>
            <p>{project.problem}</p>
            <p>{project.approach}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>Skills</h2>
        {Object.entries(data.skills || {}).map(([category, skillList]) => (
          <p key={category} className="pr-skills"><strong>{category}:</strong> {(Array.isArray(skillList) ? skillList : []).join(', ')}</p>
        ))}
      </section>
      <section>
        <h2>Education</h2>
        <p>{[data.education.degree, data.education.school, data.education.graduationDate].filter(Boolean).join(' · ')}</p>
      </section>
      <p className="pr-signoff">// Thanks for reading — {data.name}</p>
    </div>
  );
};

export default PrintResume;
