import { yearsOfExperience, roleTenure } from '../utils/dates';
import { TechIcon } from './TechIcon';

const handle = (url) => url.replace('https://', '').split('/').filter(Boolean).pop();

const PrintResume = ({ data }) => {
  const years = yearsOfExperience(data.experience);

  return (
    <div
      className="hidden print:block print:bg-[#f6f8f7] print:text-black print:text-[11px] print:leading-[1.45]"
      aria-hidden="true"
    >
      <header className="print:mb-1 print:border-b-2 print:pb-2 print:text-center print:[border-bottom:2px_solid_#000]">
        <h1 className="print:text-center print:text-[24px] print:tracking-normal">{data.name}</h1>
        <p className="print:my-1 print:text-center print:text-[12px] print:font-semibold">
          {data.headline}
          {years && (
            <>
              <span aria-hidden="true"> · </span>
              <strong>
                {years}+ years experience{data.availability ? ` · ${data.availability}` : ''}
              </strong>
            </>
          )}
        </p>
        <p className="print:my-1 print:text-center print:text-[10px]">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="print:whitespace-nowrap print:rounded-full print:px-2 print:py-px print:font-bold print:text-black print:no-underline print:[border:1px_solid_#333]"
            >
              <span aria-hidden="true">📧 </span>
              {data.email}
            </a>
          )}
          {data.github && (
            <>
              <span aria-hidden="true"> · </span>
              <a
                href={data.github}
                className="print:whitespace-nowrap print:rounded-full print:px-2 print:py-px print:font-bold print:text-black print:no-underline print:[border:1px_solid_#333]"
              >
                <TechIcon name="github" /> {handle(data.github)}
              </a>
            </>
          )}
          {data.linkedin && (
            <>
              <span aria-hidden="true"> · </span>
              <a
                href={data.linkedin}
                className="print:whitespace-nowrap print:rounded-full print:px-2 print:py-px print:font-bold print:text-black print:no-underline print:[border:1px_solid_#333]"
              >
                <TechIcon name="linkedin" /> {handle(data.linkedin)}
              </a>
            </>
          )}
        </p>
      </header>
      <section>
        <h2 className="print:mb-[6px] print:mt-3 print:pb-[2px] print:text-[12px] print:tracking-[0.06em] print:uppercase print:break-after-avoid print:[border-bottom:1px_solid_#000]">
          Experience
        </h2>
        {(Array.isArray(data.experience) ? data.experience : []).map((job, index) => (
          <div className="print:break-inside-avoid" key={index}>
            <p className="print:my-1 print:flex print:items-baseline print:justify-between print:gap-3">
              <span className="print:font-normal print:text-[#333]">
                <strong>{job.role}</strong> —{' '}
                {job.website ? (
                  <a
                    href={job.website}
                    className="print:text-black print:underline print:decoration-[1px] print:underline-offset-[2px]"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </span>
              <span className="print:font-normal print:text-[#333] print:whitespace-nowrap">
                {job.startDate} – {job.endDate || 'Present'}
                {roleTenure(job.startDate, job.endDate) && ` · ${roleTenure(job.startDate, job.endDate)}`}
              </span>
            </p>
            <p className="print:my-1 print:text-[10px] print:text-[#333]">
              {[job.location, job.domain, job.mainFocus].filter(Boolean).join(' · ')}
            </p>
            {!job.hideResponsibilities && Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
              <ul className="print:my-1 print:pl-4">
                {job.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            <p className="print:my-1 print:text-[10px] print:text-[#333]">{(job.technologies || []).join(', ')}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="print:mb-[6px] print:mt-3 print:pb-[2px] print:text-[12px] print:tracking-[0.06em] print:uppercase print:break-after-avoid print:[border-bottom:1px_solid_#000]">
          Selected Work
        </h2>
        {(Array.isArray(data.selectedWork) ? data.selectedWork : []).map((project) => (
          <div className="print:break-inside-avoid" key={project.title}>
            <p className="print:my-1 print:flex print:items-baseline print:justify-between print:gap-3">
              <span className="print:font-normal print:text-[#333]">
                <strong>{project.title}</strong>
              </span>
              <span className="print:font-normal print:text-[#333] print:whitespace-nowrap">{project.context}</span>
            </p>
            <p className="print:my-1">{project.problem}</p>
            <p className="print:my-1">{project.approach}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="print:mb-[6px] print:mt-3 print:pb-[2px] print:text-[12px] print:tracking-[0.06em] print:uppercase print:break-after-avoid print:[border-bottom:1px_solid_#000]">
          Skills
        </h2>
        <div className="print:columns-2 print:gap-5">
          {Object.entries(data.skills || {}).map(([category, skillList]) => (
            <p key={category} className="print:my-1 print:break-inside-avoid">
              <strong>{category}:</strong> {(Array.isArray(skillList) ? skillList : []).join(', ')}
            </p>
          ))}
        </div>
      </section>
      <section>
        <h2 className="print:mb-[6px] print:mt-3 print:pb-[2px] print:text-[12px] print:tracking-[0.06em] print:uppercase print:break-after-avoid print:[border-bottom:1px_solid_#000]">
          Education
        </h2>
        <p className="print:my-1">
          {data.education.degree} ·{' '}
          {data.education.schoolUrl ? (
            <a
              href={data.education.schoolUrl}
              className="print:text-black print:underline print:decoration-[1px] print:underline-offset-[2px]"
            >
              {data.education.school}
            </a>
          ) : (
            data.education.school
          )}{' '}
          · {data.education.graduationDate}
        </p>
      </section>
      <p className="print:my-1 print:mt-[14px] print:text-center print:font-[Consolas,monospace] print:text-[#333]">
        // Thanks for reading — {data.name}
      </p>
    </div>
  );
};

export default PrintResume;
