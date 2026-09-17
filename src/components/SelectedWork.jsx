import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

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

export default SelectedWork;
