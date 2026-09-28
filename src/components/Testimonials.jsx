import { TechIcon } from './TechIcon';

const Testimonials = ({ testimonials = [] }) => {
  const items = Array.isArray(testimonials) ? testimonials : [];
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="testimonials section-block scroll-mt-3">
      <div className="mb-3 flex items-center gap-[11px]">
        <TechIcon name="quote-left" className="h-[1em] w-[1em] text-signal" />
        <h2 className="m-0 font-display text-[1.1rem] font-bold uppercase tracking-[-0.02em] text-ink">Kind words</h2>
        <span className="text-[0.8rem] font-normal text-muted max-[768px]:hidden">From people I've shipped with</span>
      </div>
      <div className="testimonial-list">
        {items.map((item) => (
          <figure className="testimonial" key={item.quote}>
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
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
