import { TechIcon } from './TechIcon';
import { roleTenure } from '../utils/dates';

const CompanyLogo = ({ job, defaultLogo }) => {
  const img = (
    <img
      src={job.logo || defaultLogo}
      alt={`${job.company} logo`}
      className="max-h-[58px] max-w-[84px] max-[768px]:max-h-[44px] max-[768px]:max-w-[52px] dark:max-h-full dark:max-w-full"
      loading="lazy"
      decoding="async"
      width="84"
      height="58"
    />
  );
  return job.website ? (
    <a
      href={job.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${job.company} website`}
      className="inline-flex"
    >
      {img}
      <span className="sr-only">{`${job.company} website`}</span>
    </a>
  ) : (
    img
  );
};

const Experience = ({ experience = [], defaultLogo }) => (
  <section id="experience" className="section-block relative overflow-visible scroll-mt-3">
    <div
      className="absolute bottom-0 left-[29px] top-0 z-[1] w-[2px] bg-[linear-gradient(transparent_0,var(--accent)_48px,var(--line)_160px,var(--line)_calc(100%_-_24px),transparent_100%)] max-[768px]:left-[26px]"
      aria-hidden="true"
    />
    <div className="relative z-[1] mb-3 flex items-center gap-[11px] bg-paper">
      <TechIcon name="briefcase" className="h-[1em] w-[1em] text-signal" />
      <h2 className="m-0 font-display text-[1.1rem] font-bold uppercase tracking-[-0.02em] text-ink">
        Career timeline
      </h2>
    </div>
    {(Array.isArray(experience) ? experience : []).map((job, index) => (
      <article
        className={`experience-card ${index === 0 ? 'current-role' : ''} relative grid grid-cols-[18px_84px_minmax(0,1fr)] gap-5 overflow-visible rounded-[14px] px-5 py-[25px] [border:1px_solid_transparent] [transition:background_0.2s_ease,border-color_0.2s_ease,box-shadow_0.2s_ease] hover:bg-card hover:shadow-[0_8px_20px_rgba(23,33,38,0.07)] hover:[border-color:var(--accent)] max-[768px]:gap-[13px] max-[768px]:grid-cols-[14px_52px_minmax(0,1fr)] max-[768px]:pr-3 [&:first-of-type]:mt-[6px]`}
        key={index}
      >
        <div
          className="timeline-marker relative flex items-center justify-center overflow-visible"
          aria-label={`${job.role} at ${job.company}: ${roleTenure(job.startDate, job.endDate) || job.startDate}`}
        >
          <span
            data-tenure={roleTenure(job.startDate, job.endDate) || undefined}
            className="relative z-[2] h-3 w-3 rounded-full bg-paper [border:2px_solid_var(--accent)]"
          />
        </div>
        <div className="flex h-[58px] w-[84px] shrink-0 items-center justify-center max-[768px]:h-[44px] max-[768px]:w-[52px] dark:bg-white dark:rounded-[12px] dark:p-1.5 dark:[box-sizing:border-box]">
          <CompanyLogo job={job} defaultLogo={defaultLogo} />
        </div>
        <div className="min-w-0 grow">
          <div className="flex items-baseline justify-between gap-[18px] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[5px]">
            <h3 className="m-0 font-display text-[1.25rem] font-bold text-ink [transition:color_0.2s_ease]">
              {job.role}
            </h3>
            <span className="text-[0.82rem] font-semibold whitespace-nowrap text-accent max-[768px]:whitespace-normal">
              {job.startDate} - {job.endDate || 'Present'}
            </span>
          </div>
          <p className="mt-1 mb-[10px] text-[0.9rem] font-semibold text-ink max-[768px]:flex max-[768px]:flex-col max-[768px]:gap-[2px]">
            <strong>
              {job.website ? (
                <a href={job.website} target="_blank" rel="noopener noreferrer">
                  {job.company}
                </a>
              ) : (
                job.company
              )}
            </strong>
            {job.location && (
              <>
                <span className="px-[7px] text-muted max-[768px]:hidden">·</span>
                <span className="px-[7px] font-bold text-accent max-[768px]:px-0">
                  <TechIcon
                    name="location-dot"
                    className="h-[0.95em] w-[0.95em] mr-[2px] align-[-2px] text-[#d93025]"
                  />{' '}
                  {job.location}
                </span>
              </>
            )}
            <span className="px-[7px] text-muted max-[768px]:hidden">·</span>
            <span>{job.domain}</span>
            <span className="px-[7px] text-muted max-[768px]:hidden">·</span>
            <span>{job.mainFocus}</span>
          </p>
          <div className="flex flex-wrap gap-[7px]" aria-label={`${job.company} technologies`}>
            {(job.technologies || []).map((technology) => (
              <span
                key={technology}
                className="mr-[6px] mb-[6px] inline-block rounded-full bg-card px-[10px] py-[7px] font-mono text-[0.7rem] font-semibold leading-none text-ink [border:1px_solid_rgba(8,127,140,0.34)] [transition:background_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[1px] hover:bg-card"
              >
                {technology}
              </span>
            ))}
          </div>
          {!job.hideResponsibilities && Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
            <ul className="m-0 pl-[19px] leading-[1.6] text-body">
              {job.responsibilities.map((item, i) => (
                <li className="my-2" key={i}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    ))}
  </section>
);

export default Experience;
