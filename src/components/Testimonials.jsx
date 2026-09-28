import { TechIcon } from './TechIcon';

const Testimonials = ({ testimonials = [] }) => {
  const items = Array.isArray(testimonials) ? testimonials : [];
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="testimonials section-block">
      <div className="mb-3 flex items-center gap-[11px]">
        <TechIcon name="quote-left" className="h-[1em] w-[1em] text-signal" />
        <h2>Kind words</h2>
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
