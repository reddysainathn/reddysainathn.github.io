import { Section, SectionHead, cardShell } from './ui';

const Testimonials = ({ testimonials = [] }) => {
  const items = Array.isArray(testimonials) ? testimonials : [];
  if (items.length === 0) return null;

  return (
    <Section id="testimonials">
      <SectionHead
        icon="quote-left"
        title="Kind words"
        sub="From people I've shipped with"
        rowClassName="mb-3 flex items-center gap-[11px]"
      />
      <div className="grid grid-cols-2 gap-[14px]">
        {items.map((item) => (
          <figure className={`m-0 ${cardShell} px-[18px] py-4`} key={item.quote}>
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
    </Section>
  );
};

export default Testimonials;
