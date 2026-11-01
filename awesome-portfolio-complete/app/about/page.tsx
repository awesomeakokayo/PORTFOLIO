import type { Metadata } from "next";
import Link from "next/link";
import { AboutPhoto } from "@/components/about-photo";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { siteContent } from "@/lib/content";

const aboutPage = siteContent.aboutPage;

export const metadata: Metadata = {
  title: aboutPage.meta.title,
  description: aboutPage.meta.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: aboutPage.meta.title,
    description: aboutPage.meta.description,
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className="portfolio-main about-page" tabIndex={-1}>
        <div id="top" aria-hidden="true" />

        <section className="about-hero" aria-labelledby="about-hero-title">
          <div className="section-shell about-hero__grid">
            <div className="about-hero__copy">
              <Reveal>
                <h1 className="about-hero__title" id="about-hero-title">
                  {aboutPage.hero.lineOne} <span className="serif-italic">{aboutPage.hero.serifWord}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="about-hero__subline">{aboutPage.hero.subline}</p>
              </Reveal>
            </div>

            <Reveal className="about-hero__media" delay={0.12} amount={0.1}>
              <AboutPhoto priority sizes="(max-width: 900px) 90vw, 480px" />
            </Reveal>
          </div>
        </section>

        <section className="about-story" aria-labelledby="about-story-label">
          <div className="section-shell">
            <Reveal>
              <p className="section-kicker" id="about-story-label">{aboutPage.story.label}</p>
            </Reveal>
            <div className="about-story__body">
              {aboutPage.story.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.06} amount={0.35}>
                  <p className="about-story__paragraph">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="about-drives" aria-label={aboutPage.drives.label}>
          <div className="section-shell">
            <Reveal>
              <p className="section-kicker">{aboutPage.drives.label}</p>
            </Reveal>
            <div className="about-drives__grid">
              {aboutPage.drives.items.map((item, index) => (
                <Reveal key={item.word} delay={index * 0.06} amount={0.2}>
                  <article className={`drive-card drive-card--${item.theme}`}>
                    <span className="drive-card__word">{item.word}</span>
                    <p className="drive-card__line">{item.line}</p>
                    <span className="drive-card__arrow" aria-hidden="true">↗</span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="about-thinking" aria-labelledby="about-thinking-label">
          <div className="section-shell">
            <Reveal>
              <p className="section-kicker" id="about-thinking-label">{aboutPage.thinking.label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="about-statement">{aboutPage.thinking.text}</p>
            </Reveal>
          </div>
        </section>

        <section className="about-looking" aria-labelledby="about-looking-label">
          <div className="section-shell">
            <Reveal>
              <p className="section-kicker" id="about-looking-label">{aboutPage.looking.label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="about-statement">{aboutPage.looking.text}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                className="magnetic-button about-cta"
                href={aboutPage.looking.href}
                data-cursor-label={siteContent.nav.cursorTalk}
              >
                {aboutPage.looking.button}
                <span className="magnetic-button__arrow" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
