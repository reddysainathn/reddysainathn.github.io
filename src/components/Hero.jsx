import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGraduationCap, faLocationDot, faPrint } from '@fortawesome/free-solid-svg-icons';

const FALLBACK_IMAGE = '/images/profile-fallback.svg';

const Hero = ({ data }) => {
  const [profileImage, setProfileImage] = useState(data.profileImage || FALLBACK_IMAGE);

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
          {data.availability && <div className="availability-badge">{data.availability}</div>}
          <p className="intro-copy">{data.intro}</p>
          <div className="focus-tags" aria-label="Core engineering strengths">
            {(data.focusAreas || []).map(area => <span key={area}>{area}</span>)}
          </div>
        </div>
        <div className="intro-media">
          <img
            className="profile-image"
            src={profileImage}
            alt="Profile illustration"
            width="180"
            height="180"
            fetchPriority="high"
            decoding="async"
            onError={() => setProfileImage(FALLBACK_IMAGE)}
          />
        </div>
      </div>
      <div className="contact-links">
        <a className="email-link" href={`mailto:${data.email}?subject=Hello%20Sainath`}><FontAwesomeIcon icon={faEnvelope} /> {data.email}</a>
        <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
        <span><FontAwesomeIcon icon={faLocationDot} /> {data.location}</span>
        <span className="education-inline"><FontAwesomeIcon icon={faGraduationCap} /><span>{[data.education.degree, data.education.school].filter(Boolean).join(' · ')}</span></span>
        <button type="button" className="print-button no-print" onClick={() => window.print()}><FontAwesomeIcon icon={faPrint} /> Print resume</button>
      </div>
    </section>
  );
};

export default Hero;
