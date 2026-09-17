import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileLines, faGraduationCap, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { yearsOfExperience } from '../utils/dates';
import { pdfFileName } from '../utils/pdf';
import { trackEvent } from '../lib/analytics';
import { TechIcon } from './TechIcon';

const FALLBACK_IMAGE = '/images/profile-fallback.svg';

const Hero = ({ data }) => {
  const [profileImage, setProfileImage] = useState(data.profileImage || FALLBACK_IMAGE);
  const heroYears = yearsOfExperience(data.experience);

  return (
    <section className="introduction">
      <div className="intro-layout">
        <div className="intro-content">
          {data.eyebrow && <p className="eyebrow">{data.eyebrow}</p>}
          <div className="name-lockup">
            <h1>{data.name}</h1>
            {Array.isArray(data.mottoSteps) && <span className="motto" aria-label="Build, fix, repeat">
              {data.mottoSteps.map((step, index) => (
                <React.Fragment key={step.label}>
                  {index > 0 && <span className="motto-arrow" aria-hidden="true">=&gt;</span>}
                  <span className={`motto-step motto-step-${index + 1}`}><span aria-hidden="true">{step.emoji}</span> {step.label}</span>
                </React.Fragment>
              ))}
            </span>}
          </div>
          <p className="headline">{data.headline}</p>
          <div className="badge-row">
            {data.availability && <span className="availability-badge">{data.availability}</span>}
            {Number.isFinite(heroYears) && heroYears > 0 && <span className="years-pill">💼 {heroYears}+ years experience</span>}
            <button type="button" className="print-button no-print" onClick={() => { trackEvent('print_resume_click'); const prevTitle = document.title; document.title = pdfFileName(); window.print(); document.title = prevTitle; }}><FontAwesomeIcon icon={faFileLines} /> Resume</button>
          </div>
          <p className="intro-copy">{data.intro.replace('{years}', heroYears ?? 10)}</p>
        </div>
        <div className="intro-media">
          <picture style={{ display: 'contents' }}>
            <source srcSet={profileImage.replace(/\.jpg$/i, '.webp')} type="image/webp" />
            <img
              className="profile-image"
              src={profileImage}
              alt="Photo of Sainath R"
              width="180"
              height="180"
              fetchPriority="high"
              decoding="async"
              onError={() => setProfileImage(FALLBACK_IMAGE)}
            />
          </picture>
        </div>
      </div>
      <div className="focus-tags" aria-label="Core engineering strengths">
        {(data.focusAreas || []).map(area => {
          const label = area.label || area;
              return <span key={label}>{area.icon && <TechIcon name={area.icon} />}{label}</span>;
        })}
      </div>
      <div className="contact-links">
        <a className="email-link" href={`mailto:${data.email}?subject=Hello%20Sainath`}><FontAwesomeIcon icon={faEnvelope} /> {data.email}</a>
        <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub"><TechIcon name="github" /></a>
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><TechIcon name="linkedin" /></a>
        <span><FontAwesomeIcon icon={faLocationDot} /> {data.location}</span>
        <span className="education-inline"><FontAwesomeIcon icon={faGraduationCap} /><span>{[data.education.degree, data.education.school].filter(Boolean).join(' · ')}</span></span>
      </div>
    </section>
  );
};

export default Hero;
