import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCode, faBriefcase } from '@fortawesome/free-solid-svg-icons';

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
      {/* <Education data={data.education} /> */}
      <Skills skills={data.skills} />
      <Experience experience={data.experience} defaultLogo={data.defaultLogo} />
    </div>
  );
};

const Introduction = ({ data }) => (
  <section className="introduction">
    {/* <h1>Hi! I'm <a href='https://about.me/reddysainathn'>{data.name}</a></h1> */}
    <p className="bold">Hi! I'm <a href='https://about.me/reddysainathn'  target="_blank" rel="noopener noreferrer">{data.name}</a> {data.intro}</p>
    <span><FontAwesomeIcon icon={faEnvelope} /> <a href={`mailto:${data.email}`}>{data.email}</a></span>&nbsp;
    <span><FontAwesomeIcon icon={faCode} /> <a href={data.github}  target="_blank" rel="noopener noreferrer">GitHub</a></span>
    {/* <p><FontAwesomeIcon icon={faGraduationCap} /> Education : {data.degree}</p> */}
  </section>
);

// const Education = ({ data }) => (
//   <section className="education">
//     <h2><FontAwesomeIcon icon={faGraduationCap} /> Education</h2>
//     <p>{data.degree}, {data.graduationDate}</p>
//     <p>GPA: {data.gpa}</p>
//   </section>
// );

const Skills = ({ skills }) => (
  <section className="skills">
    <h2><FontAwesomeIcon icon={faCode} /> Technical Skills</h2>
    <table className="skills-table">
      <tbody>
        {Object.entries(skills).map(([category, skillList]) => (
          <tr key={category}>
            <td><strong>{category.charAt(0).toUpperCase() + category.slice(1)}</strong></td>
            <td>{skillList.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
  <section className="experience">
    <h2><FontAwesomeIcon icon={faBriefcase} /> Experience</h2>
    {experience.map((job, index) => (
      <div className="experience-card" key={index}>
        <div className="logo-container">
          <img src={job.logo || defaultLogo} alt={`${job.company} logo`} className="company-logo" />
        </div>
        <div className="experience-details">
          <span className="heading1">{job.role}</span>&nbsp;
          <span className="duration">[{job.startDate} - {job.endDate || 'Present'}];</span>
          <br></br>
          <span className="heading2">Role => </span><span>{job.mainFocus};</span>
          {!job.hideResponsibilities && ( 
            <ul className="responsibilities-list">
              {job.responsibilities.map((task, idx) => <li key={idx}>{linkify(task, job.links)}</li>)}
            </ul>
          )}
        </div>
      </div>
    ))}
  </section>
);

export default App;