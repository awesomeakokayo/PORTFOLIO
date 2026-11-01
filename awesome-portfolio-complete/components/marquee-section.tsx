import { siteContent } from "@/lib/content";

export function MarqueeSection() {
  const marquee = siteContent.marquee;
  const items = [...marquee.items, ...marquee.items];

  return (
    <section className="marquee-section" aria-label={marquee.label}>
      <span className="marquee-section__label">{marquee.label}</span>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="marquee-track__group" key={group}>
            {items.map((item, index) => (
              <span className="marquee-track__group-item" key={`${group}-${item}-${index}`}>
                <span className="marquee-track__item">{item}</span>
                <span className="marquee-track__dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
