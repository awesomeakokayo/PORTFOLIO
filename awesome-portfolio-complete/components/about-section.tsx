import Link from "next/link";
import { siteContent } from "@/lib/content";
import { AboutPhoto } from "@/components/about-photo";
import { Reveal } from "@/components/reveal";

export function AboutSection() {
  const about = siteContent.about;

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section-shell about-section__grid">
        <Reveal className="about-section__media" amount={0.15}>
          <AboutPhoto />
        </Reveal>

        <div className="about-section__body">
          <Reveal>
            <p className="section-kicker">{about.eyebrow}</p>
            <h2 className="about-section__title" id="about-title">
              {about.lineOne} <span className="serif-italic">{about.serifWord}</span> {about.lineTwo}
            </h2>
            <p className="about-section__text">{about.text}</p>
          </Reveal>

          <ul className="about-rows">
            {about.rows.map((row, index) => (
              <li key={row.label}>
                <Reveal delay={index * 0.08} amount={0.5}>
                  <div className="about-row">
                    <span className="mono-label about-row__label">{row.label}</span>
                    <span className="about-row__sentence">{row.sentence}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.12}>
            <Link
              className="about-section__button"
              href={about.href}
              data-cursor-label={about.cursor}
            >
              {about.button}
              <span className="about-section__button-arrow" aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
