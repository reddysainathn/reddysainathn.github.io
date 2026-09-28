import { TechIcon } from './TechIcon';

const Testimonials = ({ testimonials = [] }) => {
  const items = Array.isArray(testimonials) ? testimonials : [];
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="section-block scroll-mt-3">
      <div className="mb-3 flex items-center gap-[11px]">
        <TechIcon name="quote-left" className="h-[1em] w-[1em] text-signal" />
        <h2 className="m-0 font-display text-[1.1rem] font-bold uppercase tracking-[-0.02em] text-ink">Kind words</h2>
        <span className="text-[0.8rem] font-normal text-muted max-[768px]:hidden">From people I've shipped with</span>
      </div>
      <div className="grid grid-cols-2 gap-[14px]">
        {items.map((item) => (
          <figure className="m-0 rounded-[14px] bg-card px-[18px] py-4 [border:1px_solid_var(--line)]" key={item.quote}>
            <blockquote className="m-0 mb-[10px] text-[0.95rem] italic leading-[1.6] text-body">
              “{item.quote}”
            </blockquote>
            <figcaption className="text-[0.8rem] font-semibold text-muted">
              — {item.name}
              {item.role && `, ${item.role}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
