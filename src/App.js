import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faBriefcase, faCode, faEnvelope, faGraduationCap, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const FALLBACK_IMAGE = '/profile-fallback.svg';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/resumeData.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="portfolio">
      <Introduction data={data} />
      <Specialties specialties={data.specialties} />
      <SelectedWork work={data.selectedWork} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} defaultLogo={data.defaultLogo} />
    </div>
  );
};

const Introduction = ({ data }) => {
  const [profileImage, setProfileImage] = useState(data.profileImage || FALLBACK_IMAGE);

  return (
    <section className="introduction">
      <div className="intro-layout">
        <div className="intro-content">
          {data.eyebrow && <p className="eyebrow">{data.eyebrow}</p>}
          <h1>{data.name}</h1>
          <p className="headline">{data.headline}</p>
          <div className="availability-badge">Open to backend and applied AI roles</div>
          <p className="intro-copy">{data.intro}</p>
          <div className="focus-tags" aria-label="Core engineering strengths">
            {(data.focusAreas || []).map(area => <span key={area}>{area}</span>)}
          </div>
          <div className="contact-links">
            <a className="email-link" href={`mailto:${data.email}?subject=Hello%20Sainath`}><FontAwesomeIcon icon={faEnvelope} /> {data.email}</a>
            <a href={data.github} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCode} /> GitHub <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="external-icon" /></a>
            <span><FontAwesomeIcon icon={faLocationDot} /> {data.location}</span>
          </div>
          <div className="education-inline">
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>{data.education.degree}</span>
          </div>
        </div>
        <img
          className="profile-image"
          src={profileImage}
          alt="Profile illustration"
          onError={() => setProfileImage(FALLBACK_IMAGE)}
        />
      </div>
    </section>
  );
};

const Specialties = ({ specialties = [] }) => (
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

const SelectedWork = ({ work = [] }) => (
  <section className="selected-work section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faCode} /><h2>Selected systems</h2></div>
    <p className="section-intro">A closer look at the problems, architecture, and tradeoffs behind the work.</p>
    <div className="work-list">
      {(Array.isArray(work) ? work : []).map(project => (
        <article className="work-item" key={project.title}>
          <header className="work-header"><h3>{project.title}</h3><small>{project.context}</small></header>
          <div className="work-notes">
            <div><b>Problem</b><p>{project.problem}</p></div>
            <div><b>Approach</b><p>{project.approach}</p></div>
            <div><b>Engineering focus</b><p>{project.focus}</p></div>
            <span className="work-stack">{project.stack}</span>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Skills = ({ skills = {} }) => (
  <section className="skills section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faCode} /><h2>Core stack</h2></div>
    <div className="skills-grid">
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="skill-group" key={category}>
          <h3>{category}</h3>
          <div>{(Array.isArray(skillList) ? skillList : []).map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}</div>
        </div>
      ))}
    </div>
  </section>
);

const Experience = ({ experience = [], defaultLogo }) => (
  <section className="experience section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faBriefcase} /><h2>Career timeline</h2></div>
    {(Array.isArray(experience) ? experience : []).map((job, index) => (
      <article className={`experience-card ${index === 0 ? 'current-role' : ''}`} key={index}>
        <div className="timeline-marker" aria-hidden="true"><span /></div>
        <div className="logo-container">
          <img src={job.logo || defaultLogo} alt={`${job.company} logo`} className="company-logo" />
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

export default App;