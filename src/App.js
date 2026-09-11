import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faBriefcase, faCode, faEnvelope, faGraduationCap, faLocationDot } from '@fortawesome/free-solid-svg-icons';

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
      <Education data={data.education} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} defaultLogo={data.defaultLogo} />
    </div>
  );
};

const Introduction = ({ data }) => (
  <section className="introduction">
    <p className="eyebrow">{data.eyebrow}</p>
    <h1>{data.name}</h1>
    <p className="headline">{data.headline}</p>
    <p className="intro-copy">{data.intro}</p>
    <div className="focus-tags" aria-label="Core engineering strengths">
      {data.focusAreas.map(area => <span key={area}>{area}</span>)}
    </div>
    <div className="contact-links">
      <a className="email-link" href={`mailto:${data.email}?subject=Hello%20Sainath`}><FontAwesomeIcon icon={faEnvelope} /> {data.email}</a>
      <a href={data.github} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCode} /> GitHub <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="external-icon" /></a>
      <span><FontAwesomeIcon icon={faLocationDot} /> {data.location}</span>
    </div>
  </section>
);

const Specialties = ({ specialties }) => (
  <section className="specialties section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faCode} /><h2>What I build</h2></div>
    <div className="specialty-grid">
      {specialties.map(specialty => (
        <article className="specialty" key={specialty.title}>
          <h3>{specialty.title}</h3>
          <p>{specialty.description}</p>
          <span>{specialty.stack}</span>
        </article>
      ))}
    </div>
  </section>
);

const Education = ({ data }) => (
  <section className="education section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faGraduationCap} /><h2>Education</h2></div>
    <div className="education-row"><strong>{data.degree}</strong><span>{data.graduationDate} · GPA {data.gpa}</span></div>
  </section>
);

const Skills = ({ skills }) => (
  <section className="skills section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faCode} /><h2>Core stack</h2></div>
    <div className="skills-grid">
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="skill-group" key={category}>
          <h3>{category}</h3>
          <div>{skillList.map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}</div>
        </div>
      ))}
    </div>
  </section>
);

const linkify = (text, links) => {
  const words = text.split(' ');
  return words.map((word, index) => {
    const cleanWord = word.replace(/[.,]/g, ''); // Remove punctuation
    if (links && links[cleanWord]) {
      return (
        <React.Fragment key={index}>
          <a href={links[cleanWord]} target="_blank" rel="noopener noreferrer">
            {word}
          </a>{' '}
        </React.Fragment>
      );
    }
    return <React.Fragment key={index}>{word} </React.Fragment>;
  });
};

const Experience = ({ experience, defaultLogo }) => (
  <section className="experience section-block">
    <div className="section-heading"><FontAwesomeIcon icon={faBriefcase} /><h2>Experience</h2></div>
    {experience.map((job, index) => (
      <article className="experience-card" key={index}>
        <div className="logo-container">
          <img src={job.logo || defaultLogo} alt={`${job.company} logo`} className="company-logo" />
        </div>
        <div className="experience-details">
          <div className="role-line"><h3>{job.role}</h3><span className="duration">{job.startDate} - {job.endDate || 'Present'}</span></div>
          <p className="company-line"><strong>{job.company}</strong><span>·</span>{job.domain}<span>·</span>{job.mainFocus}</p>
          {!job.hideResponsibilities && (
            <ul className="responsibilities-list">
              {job.responsibilities.map((task, idx) => <li key={idx}>{linkify(task, job.links)}</li>)}
            </ul>
          )}
        </div>
      </article>
    ))}
  </section>
);

export default App;