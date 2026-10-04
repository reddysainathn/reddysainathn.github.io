import { Section, SectionHead, cardTitle } from './ui';

const Expertise = ({ specialties = [] }) => (
  <Section id="expertise">
    <SectionHead icon="code" title="What I build" sub="What I do best" />
    <div className="grid grid-cols-3 gap-3 max-[768px]:grid-cols-1">
      {(Array.isArray(specialties) ? specialties : []).map((specialty) => (
        <article
          className="py-[2px] pl-3 [border-left:2px_solid_var(--accent)] [transition:border-color_0.2s_ease,transform_0.2s_ease] hover:-translate-y-[2px] hover:[border-color:var(--signal)]"
          key={specialty.title}
        >
          <h3 className={`${cardTitle} mb-1.5 text-[1.08rem]`}>{specialty.title}</h3>
          <p className="m-0 mb-2 text-[0.9rem] leading-[1.55] text-muted">{specialty.description}</p>
          <span className="text-[0.75rem] font-bold leading-[1.45] text-accent">{specialty.stack}</span>
        </article>
      ))}
    </div>
  </Section>
);

export default Expertise;
