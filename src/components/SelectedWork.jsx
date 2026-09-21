import { TechIcon } from './TechIcon';

const SelectedWork = ({ work = [] }) => (
  <section id="selected-work" className="selected-work section-block">
    <div className="section-heading"><TechIcon name="code" /><h2>Selected systems</h2><span className="section-tag">Problems, architecture, tradeoffs</span></div>
    <div className="work-list">
      {(Array.isArray(work) ? work : []).map(project => (
        <article className="work-item" key={project.title}>
          <header className="work-header"><h3>{project.title}</h3><small>{project.context}</small></header>
          <div className="work-notes">
            <div><b>Problem</b><p>{project.problem}</p></div>
            <div><b>Approach</b><p>{project.approach}</p></div>
            <span className="work-stack">{project.stack}</span>
          </div>
          {Array.isArray(project.links) && project.links.length > 0 && (
            <div className="work-links">
              {project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
            </div>
          )}
        </article>
      ))}
    </div>
  </section>
);

export default SelectedWork;
