import { yearsOfExperience, roleTenure } from '../utils/dates';
import { TechIcon } from './TechIcon';
import { cardTitle } from './ui';

const handle = (url) => url.replace('https://', '').split('/').filter(Boolean).pop();

const printH2 =
  'font-display font-bold print:mb-[6px]! print:mt-3! print:pb-[2px]! print:text-[12px]! print:text-ink print:tracking-[0.06em]! print:uppercase print:break-after-avoid print:[border-bottom:1px_solid_#000]';
const printPill =
  'print:whitespace-nowrap print:rounded-full print:px-2 print:py-px print:font-bold print:text-black print:no-underline print:[border:1px_solid_#333]';
const printIcon = 'h-[1.05em] w-[1.05em] mr-[5px] align-[-2px]';
const printMeta = 'print:font-normal print:text-[#333]';
const printRow = 'print:my-1 print:flex print:items-baseline print:justify-between print:gap-3';
const printLink = 'print:text-black print:underline! print:decoration-[1px] print:underline-offset-[2px]!';
const printFine = 'print:my-1 print:text-[10px] print:text-[#333]';

const PrintResume = ({ data }) => {
  const years = yearsOfExperience(data.experience);

  return (
    <div
      className="hidden print:block print:bg-[#f6f8f7] print:text-black print:text-[11px] print:leading-[1.45]"
      aria-hidden="true"
    >
      <header className="print:mb-1 print:border-b-2 print:pb-2 print:text-center print:[border-bottom:2px_solid_#000]">
        <h1 className={`${cardTitle} print:text-center print:text-[24px]! print:tracking-normal!`}>{data.name}</h1>
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
            <a href={`mailto:${data.email}`} className={printPill}>
              <span aria-hidden="true">📧 </span>
              {data.email}
            </a>
          )}
          {data.github && (
            <>
              <span aria-hidden="true"> · </span>
              <a href={data.github} className={printPill}>
                <TechIcon name="github" className={printIcon} /> {handle(data.github)}
              </a>
            </>
          )}
          {data.linkedin && (
            <>
              <span aria-hidden="true"> · </span>
              <a href={data.linkedin} className={printPill}>
                <TechIcon name="linkedin" className={printIcon} /> {handle(data.linkedin)}
              </a>
            </>
          )}
        </p>
      </header>
      <section>
        <h2 className={printH2}>Experience</h2>
        {(Array.isArray(data.experience) ? data.experience : []).map((job, index) => (
          <div className="print:break-inside-avoid" key={index}>
            <p className={printRow}>
              <span className={printMeta}>
                <strong>{job.role}</strong> —{' '}
                {job.website ? (
                  <a href={job.website} className={printLink}>
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </span>
              <span className={`${printMeta} print:whitespace-nowrap`}>
                {job.startDate} – {job.endDate || 'Present'}
                {roleTenure(job.startDate, job.endDate) && ` · ${roleTenure(job.startDate, job.endDate)}`}
              </span>
            </p>
            <p className={printFine}>{[job.location, job.domain, job.mainFocus].filter(Boolean).join(' · ')}</p>
            {!job.hideResponsibilities && Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
              <ul className="print:my-1 print:pl-4">
                {job.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            <p className={printFine}>{(job.technologies || []).join(', ')}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className={printH2}>Selected Work</h2>
        {(Array.isArray(data.selectedWork) ? data.selectedWork : []).map((project) => (
          <div className="print:break-inside-avoid" key={project.title}>
            <p className={printRow}>
              <span className={printMeta}>
                <strong>{project.title}</strong>
              </span>
              <span className={`${printMeta} print:whitespace-nowrap`}>{project.context}</span>
            </p>
            <p className="print:my-1">{project.problem}</p>
            <p className="print:my-1">{project.approach}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className={printH2}>Skills</h2>
        <div className="print:columns-2 print:gap-5">
          {Object.entries(data.skills || {}).map(([category, skillList]) => (
            <p key={category} className="print:my-1 print:break-inside-avoid">
              <strong>{category}:</strong> {(Array.isArray(skillList) ? skillList : []).join(', ')}
            </p>
          ))}
        </div>
      </section>
      <section>
        <h2 className={printH2}>Education</h2>
        <p className="print:my-1">
          {data.education.degree} ·{' '}
          {data.education.schoolUrl ? (
            <a href={data.education.schoolUrl} className={printLink}>
              {data.education.school}
            </a>
          ) : (
            data.education.school
          )}{' '}
          · {data.education.graduationDate}
        </p>
      </section>
      <p className="print:mt-[14px] print:mb-1 print:text-center print:font-[Consolas,monospace] print:text-[#333] print:[margin:14px_0_4px]">
        // Thanks for reading — {data.name}
      </p>
    </div>
  );
};

export default PrintResume;
