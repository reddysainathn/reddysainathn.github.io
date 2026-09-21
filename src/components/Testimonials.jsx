import { TechIcon } from './TechIcon';

const Testimonials = ({ testimonials = [] }) => {
  const items = Array.isArray(testimonials) ? testimonials : [];
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="testimonials section-block">
      <div className="section-heading"><TechIcon name="quote-left" /><h2>Kind words</h2><span className="section-tag">From people I've shipped with</span></div>
      <div className="testimonial-list">
        {items.map(item => (
          <figure className="testimonial" key={item.quote}>
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>— {item.name}{item.role && `, ${item.role}`}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
