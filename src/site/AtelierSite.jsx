import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects.js";
import "./atelier.css";

const HeroScene = lazy(() => import("./scene/HeroScene.jsx"));
const ProcessScene = lazy(() => import("./scene/ProcessScene.jsx"));

const EMAIL = "awesomeakokayo@gmail.com";
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/awesomeakokayo/", note: "Professional profile" },
  { label: "GitHub", href: "https://github.com/awesomeakokayo", note: "Source and experiments" },
  { label: "X", href: "https://x.com/awesomeakokayo", note: "Thoughts and the build" },
  { label: "Instagram", href: "https://www.instagram.com/awesomeakokayo/", note: "Behind the work" },
];

const principles = [
  {
    number: "01",
    title: "Start with the person.",
    text: "The first question is not which framework to use. It is what should become easier, clearer or possible for the person using the product.",
  },
  {
    number: "02",
    title: "Design is part of the system.",
    text: "A feature is not finished when it works in isolation. It is finished when the whole experience feels coherent and trustworthy.",
  },
  {
    number: "03",
    title: "Ship into reality.",
    text: "Real usage is the best feedback. I build, release, observe and improve instead of treating launch as the finish line.",
  },
];

const processSteps = [
  ["01", "Understand", "The people, the problem and the constraints."],
  ["02", "Shape", "The experience, the scope and the system."],
  ["03", "Build", "The interface, the data and the intelligence."],
  ["04", "Ship & learn", "A real release, followed by useful iteration."],
];

const otherWork = [
  ["NaviPro", "Career technology", "An AI-assisted career platform turning unclear next steps into practical direction."],
  ["EmoHabit", "Health · In development", "A habit companion exploring emotional patterns alongside consistency."],
  ["CCU Journal of Education", "Academic publishing", "Submission, peer-review and publication workflows for a university journal."],
  ["AE-FUNAI Journal", "Institutional platform", "A digital workflow for academic submission, review and publication."],
  ["Blancquake Foundation", "Non-profit", "A clearer digital home for neuro-health and blood-donation advocacy."],
];

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  });

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return undefined;
    const update = () => setReduced(query.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function useWideViewport() {
  const [wide, setWide] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(min-width: 960px)").matches ?? window.innerWidth >= 960;
  });

  useEffect(() => {
    const query = window.matchMedia?.("(min-width: 960px)");
    if (!query) return undefined;
    const update = () => setWide(query.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return wide;
}

function Arrow({ diagonal = false }) {
  return (
    <svg className="at-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {diagonal ? (
        <path d="M4 16 16 4M6 4h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function SectionLabel({ number, children, light = false }) {
  return (
    <div className={"at-section-label" + (light ? " is-light" : "")}>
      <span>{number}</span>
      <span className="at-label-rule" />
      <span>{children}</span>
    </div>
  );
}

function ProjectArtwork({ project, featured = false }) {
  return (
    <div className={"at-project-art at-art-" + project.slug + (featured ? " is-featured" : "")}>
      <div className="at-art-topline">
        <span>{project.category}</span>
        <span>{project.number} / 04</span>
      </div>
      <img
        src={project.image}
        alt={project.imageAlt || project.name}
        loading="lazy"
        decoding="async"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.parentElement.classList.add("has-image-fallback");
        }}
      />
      <div className="at-art-bottom">
        <span>{project.role}</span>
        <span className="at-art-open"><Arrow diagonal /></span>
      </div>
    </div>
  );
}

function ProjectFeature({ project }) {
  return (
    <article className="at-feature-project" data-at-reveal>
      <a className="at-feature-link" href={project.url || "#contact"} target={project.url ? "_blank" : undefined} rel={project.url ? "noreferrer" : undefined}>
        <ProjectArtwork project={project} featured />
        <div className="at-feature-copy">
          <div className="at-project-meta">
            <span>{project.number} — {project.category}</span>
            <span>{project.role}</span>
          </div>
          <div className="at-feature-title-row">
            <h3>{project.name}</h3>
            <span className="at-circle-arrow"><Arrow diagonal /></span>
          </div>
          <p>{project.description}</p>
          <div className="at-project-tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <span className="at-text-link">{project.url ? project.linkLabel || "Visit product" : "Project overview"} <Arrow /></span>
        </div>
      </a>
    </article>
  );
}

function ProjectTile({ project, layout = "standard" }) {
  const link = project.url || "#contact";
  return (
    <article className={"at-project-tile at-tile-" + layout} data-at-reveal>
      <a href={link} target={project.url ? "_blank" : undefined} rel={project.url ? "noreferrer" : undefined}>
        <ProjectArtwork project={project} />
        <div className="at-tile-copy">
          <div className="at-project-meta">
            <span>{project.number} — {project.category}</span>
            <span>{project.role}</span>
          </div>
          <div className="at-tile-title-row">
            <h3>{project.name}</h3>
            <span className="at-small-arrow"><Arrow diagonal /></span>
          </div>
          <p>{project.description}</p>
          <div className="at-project-tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </a>
    </article>
  );
}

function ProcessArtwork({ visible, progressRef, reduced }) {
  return (
    <div className="at-process-art">
      {visible ? (
        <Suspense fallback={<div className="at-process-fallback"><span /><span /><span /><i /></div>}>
          <ProcessScene progressRef={progressRef} active={visible} reduced={reduced} dark />
        </Suspense>
      ) : (
        <div className="at-process-fallback" aria-hidden="true"><span /><span /><span /><i /></div>
      )}
      <span className="at-art-caption">FIG. 02 — FROM PARTS TO PRODUCT</span>
    </div>
  );
}

export default function AtelierSite({ onEnterMuseum, museumEntryRef }) {
  const rootRef = useRef(null);
  const processRef = useRef(null);
  const processProgress = useRef({ current: 0 });
  const heroProgress = useRef({ current: 0 });
  const reduced = useReducedMotionPreference();
  const wide = useWideViewport();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:" + EMAIL;
    }
  }, []);

  const enterMuseum = useCallback(() => {
    setMenuOpen(false);
    onEnterMuseum?.();
  }, [onEnterMuseum]);

  useEffect(() => {
    const element = processRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setProcessVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setProcessVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "360px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!rootRef.current) return undefined;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-at-reveal]", { autoAlpha: 1, y: 0 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".at-hero-kicker", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 })
        .fromTo(".at-hero-line-inner", { yPercent: 112 }, { yPercent: 0, duration: 1.05, stagger: 0.12 }, "-=0.25")
        .fromTo(".at-hero-description, .at-hero-actions, .at-hero-foot", { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12 }, "-=0.42")
        .fromTo(".at-hero-visual", { autoAlpha: 0, scale: 0.94, rotate: 3 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.1 }, "-=0.9");

      gsap.utils.toArray("[data-at-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          }
        );
      });

      gsap.to(".at-work-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: "#work", start: "top 72%", end: "bottom 78%", scrub: true },
      });

      gsap.to(".at-feature-project .at-project-art img", {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: ".at-feature-project", start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.to(heroProgress.current, {
        current: 1,
        ease: "none",
        scrollTrigger: { trigger: ".at-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(processProgress.current, {
        current: 1,
        ease: "none",
        scrollTrigger: { trigger: processRef.current, start: "top 80%", end: "bottom 20%", scrub: 0.6 },
      });

      gsap.to(".at-orbit", { rotate: 360, duration: 58, repeat: -1, ease: "none" });
      gsap.to(".at-orbit-inner", { rotate: -360, duration: 42, repeat: -1, ease: "none" });
    }, rootRef);

    return () => context.revert();
  }, [reduced]);

  const closeMenu = () => setMenuOpen(false);
  const selected = projects.slice(0, 4);
  const featured = selected[0];
  const remaining = selected.slice(1);

  return (
    <main className="at-site" ref={rootRef}>
      <div className="at-grain" aria-hidden="true" />
      <a className="at-skip" href="#main-content">Skip to content</a>

      <header className="at-header">
        <a href="#top" className="at-brand" aria-label="Awesome Akokayo home">
          <span className="at-brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>AWESOME AKOKAYO</span>
        </a>
        <nav className={"at-nav" + (menuOpen ? " is-open" : "")} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Selected work <span>01</span></a>
          <a href="#approach" onClick={closeMenu}>Approach <span>02</span></a>
          <a href="#about" onClick={closeMenu}>About <span>03</span></a>
          <a href="#contact" onClick={closeMenu}>Contact <span>04</span></a>
          <button className="at-nav-archive" type="button" onClick={enterMuseum}>3D archive <Arrow diagonal /></button>
        </nav>
        <a className="at-header-contact" href="#contact">Let's talk <Arrow diagonal /></a>
        <button className="at-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i className={menuOpen ? "is-open" : ""} />
        </button>
      </header>

      <section className="at-hero" id="top">
        <div className="at-hero-noise" aria-hidden="true" />
        <div className="at-hero-inner at-container" id="main-content">
          <div className="at-hero-copy">
            <p className="at-hero-kicker"><span className="at-live-dot" /> INDEPENDENT PRODUCT ENGINEER <span className="at-kicker-slash">/</span> NIGERIA · WORKING WORLDWIDE</p>
            <h1 className="at-hero-title">
              <span className="at-hero-line"><span className="at-hero-line-inner">I build digital</span></span>
              <span className="at-hero-line"><span className="at-hero-line-inner">products <em>with</em></span></span>
              <span className="at-hero-line"><span className="at-hero-line-inner at-title-last">a point of view<span className="at-title-period">.</span></span></span>
            </h1>
            <p className="at-hero-description">From an unclear idea to a product people can use. I shape the experience, engineer the system and stay close to what happens after launch.</p>
            <div className="at-hero-actions">
              <a className="at-button at-button-light" href="#work">Explore selected work <Arrow diagonal /></a>
              <button className="at-button at-button-quiet" type="button" onClick={enterMuseum} ref={museumEntryRef}>Enter the 3D archive <Arrow diagonal /></button>
            </div>
            <div className="at-hero-foot">
              <span>PRODUCT THINKING · ENGINEERING · AI</span>
              <a href="#manifesto">SCROLL TO EXPLORE <span className="at-down-mark">↓</span></a>
            </div>
          </div>

          <div className="at-hero-visual" aria-label="A sculptural compass object representing direction and product building">
            <div className="at-visual-index"><span>OBJECT 001</span><span>FIND THE NORTH</span></div>
            <div className="at-visual-stage">
              {wide ? (
                <Suspense fallback={<div className="at-hero-object-fallback"><span /><i /></div>}>
                  <HeroScene progressRef={heroProgress.current} active={true} reduced={reduced} dark narrow={false} />
                </Suspense>
              ) : (
                <div className="at-hero-object-fallback"><span /><i /></div>
              )}
              <div className="at-orbit" aria-hidden="true"><span /><b /><i /></div>
              <div className="at-orbit-inner" aria-hidden="true"><span /></div>
            </div>
            <div className="at-visual-caption"><span>01 / DIRECTION</span><span>IDEA → PRODUCT</span></div>
            <div className="at-vertical-note" aria-hidden="true">CLARITY OVER COMPLEXITY</div>
          </div>
        </div>
        <div className="at-hero-bottom-line" />
      </section>

      <div className="at-running-line" aria-label="Product thinking, full-stack engineering, AI integration and digital experiences">
        <div className="at-running-track">
          <span>PRODUCT THINKING</span><i>✳</i><span>FULL-STACK ENGINEERING</span><i>✳</i><span>AI INTEGRATION</span><i>✳</i><span>DIGITAL EXPERIENCES</span><i>✳</i><span>PRODUCT THINKING</span><i>✳</i><span>FULL-STACK ENGINEERING</span><i>✳</i><span>AI INTEGRATION</span><i>✳</i>
        </div>
      </div>

      <section className="at-manifesto" id="manifesto">
        <div className="at-container at-manifesto-inner">
          <SectionLabel number="01">THE POINT OF IT ALL</SectionLabel>
          <div className="at-manifesto-copy" data-at-reveal>
            <p className="at-overline">GOOD SOFTWARE SHOULD CHANGE SOMETHING.</p>
            <h2>Not code for the sake of code. <span>Useful things,</span> made with care.</h2>
          </div>
          <div className="at-manifesto-foot" data-at-reveal>
            <p>I care about the space between the idea and the outcome: what to build, how it should feel, how the system holds together and whether people actually use it.</p>
            <span className="at-manifesto-mark">A / 26</span>
          </div>
        </div>
      </section>

      <section className="at-work" id="work">
        <div className="at-work-progress"><span /></div>
        <div className="at-container">
          <div className="at-work-heading">
            <div>
              <SectionLabel number="02" light>SELECTED WORK</SectionLabel>
              <h2>Built for <em>real life.</em></h2>
            </div>
            <p>A few products and systems I've helped bring into the world. Each one starts with a problem worth solving.</p>
          </div>

          <div className="at-work-feature">
            <div className="at-work-count"><span>01</span><span>THE FEATURED PROJECT</span><span className="at-count-rule" /></div>
            <ProjectFeature project={featured} />
          </div>

          <div className="at-project-grid">
            {remaining.map((project, index) => (
              <ProjectTile key={project.slug} project={project} layout={index === 0 ? "wide" : "standard"} />
            ))}
          </div>

          <div className="at-more-work">
            <div className="at-more-heading">
              <SectionLabel number="02.1" light>ALSO IN THE ARCHIVE</SectionLabel>
              <p>Other things explored, built and brought forward.</p>
            </div>
            <div className="at-more-list">
              {otherWork.map(([name, type, text], index) => (
                <div className="at-more-row" key={name}>
                  <span className="at-more-number">0{index + 1}</span>
                  <h3>{name}</h3>
                  <span className="at-more-type">{type}</span>
                  <p>{text}</p>
                  <span className="at-more-arrow"><Arrow diagonal /></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="at-approach" id="approach" ref={processRef}>
        <div className="at-container">
          <div className="at-approach-top">
            <SectionLabel number="03">HOW I APPROACH THE BUILD</SectionLabel>
            <p className="at-approach-intro">The difference is not another framework. It is knowing what to build, what to leave out and how to make the result hold up in real use.</p>
          </div>
          <div className="at-approach-layout">
            <div className="at-approach-copy">
              <h2>From <em>unclear</em><br />to useful.</h2>
              <div className="at-process-list">
                {processSteps.map(([number, title, text]) => (
                  <div className="at-process-step" key={number} data-at-reveal>
                    <span>{number}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                    <b>↗</b>
                  </div>
                ))}
              </div>
            </div>
            <ProcessArtwork visible={processVisible && wide} progressRef={processProgress.current} reduced={reduced} />
          </div>
        </div>
      </section>

      <section className="at-principles">
        <div className="at-container">
          <div className="at-principles-heading">
            <SectionLabel number="04" light>WHAT GUIDES THE WORK</SectionLabel>
            <h2>Build with <em>intention.</em></h2>
          </div>
          <div className="at-principles-grid">
            {principles.map((principle) => (
              <article className="at-principle" key={principle.number} data-at-reveal>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
                <div className="at-principle-rule" />
              </article>
            ))}
          </div>
          <div className="at-principles-note">
            <span>ENGINEERING WITH JUDGEMENT</span>
            <span>AI IS LEVERAGE. THE BUILDER OWNS THE OUTCOME.</span>
          </div>
        </div>
      </section>

      <section className="at-about" id="about">
        <div className="at-container">
          <SectionLabel number="05">A LITTLE ABOUT ME</SectionLabel>
          <div className="at-about-layout">
            <div className="at-about-heading">
              <h2>Engineer by training. <em>Product person</em> by instinct.</h2>
              <p>I'm Awesome Akokayo, a software engineer from Nigeria. I enjoy taking ideas that are still messy, unclear or sitting in someone's head and turning them into products people can actually use.</p>
              <p>I studied Computer Science at Coal City University, presented original research at Springer ETMiS 2025, and have led a cross-functional team building an AI career platform. I care about what gets built, not just what gets coded.</p>
              <a className="at-text-link at-about-link" href="https://www.linkedin.com/in/awesomeakokayo/" target="_blank" rel="noreferrer">More about my work <Arrow diagonal /></a>
            </div>
            <div className="at-about-record">
              <div className="at-record-heading"><span>FIELD NOTES</span><span>2024 — 2026</span></div>
              <div className="at-record-row"><strong>2026</strong><span>B.Sc. Computer Science<br />Coal City University</span></div>
              <div className="at-record-row"><strong>2025</strong><span>Presented original research<br />Springer ETMiS</span></div>
              <div className="at-record-row"><strong>2024</strong><span>Vice President II<br />NACOS</span></div>
              <div className="at-record-row"><strong>NOW</strong><span>Founder & builder<br />OpenBooks · TechSkillHub · NaviPro</span></div>
            </div>
          </div>

          <div className="at-toolkit">
            <div className="at-toolkit-heading"><span>TOOLS OF THE TRADE</span><span>THE STACK SERVES THE PRODUCT</span></div>
            <div className="at-toolkit-row"><span>FRONTEND / MOBILE</span><p>TypeScript · JavaScript · React · Next.js · React Native · Expo · Tailwind CSS</p></div>
            <div className="at-toolkit-row"><span>BACKEND / DATA</span><p>FastAPI · Node.js · REST APIs · PostgreSQL · Prisma · Redis · Firebase</p></div>
            <div className="at-toolkit-row"><span>AI / INTEGRATIONS</span><p>LLM APIs · Structured generation · Retrieval workflows · Paystack · OAuth</p></div>
            <div className="at-toolkit-row"><span>CLOUD / DELIVERY</span><p>Git · GitHub · Docker · CI/CD · Vercel · Render · Netlify</p></div>
          </div>
        </div>
      </section>

      <section className="at-contact" id="contact">
        <div className="at-container">
          <SectionLabel number="06" light>START A CONVERSATION</SectionLabel>
          <div className="at-contact-main">
            <div>
              <p className="at-contact-kicker">HAVE A GOOD PROBLEM?</p>
              <h2>Let's make<br /><em>something</em><br />matter.</h2>
            </div>
            <div className="at-contact-aside">
              <p>It doesn't need to be fully figured out. Bring the problem, the idea or the rough sketch. We can work out the product from there.</p>
              <a className="at-contact-email" href={"mailto:" + EMAIL}>{EMAIL} <Arrow diagonal /></a>
              <button className="at-copy-email" type="button" onClick={copyEmail}>{copied ? "COPIED TO CLIPBOARD ✓" : "COPY EMAIL +"}</button>
              <a className="at-whatsapp" href="https://wa.me/2349020372640?text=Hi%20Awesome%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20talk%20about%20a%20product." target="_blank" rel="noreferrer">Or start on WhatsApp <Arrow diagonal /></a>
            </div>
          </div>
          <div className="at-contact-bottom">
            <span><i className="at-live-dot" /> AVAILABLE FOR SELECT PRODUCT & ENGINEERING WORK</span>
            <span>NIGERIA / REMOTE</span>
          </div>
        </div>
      </section>

      <footer className="at-footer">
        <div className="at-container">
          <div className="at-footer-top">
            <a href="#top" className="at-brand at-footer-brand">
              <span className="at-brand-mark" aria-hidden="true"><i /><i /><i /></span>
              <span>AWESOME AKOKAYO</span>
            </a>
            <p>Building digital products beyond the code.</p>
            <button type="button" className="at-back-top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}>BACK TO TOP ↑</button>
          </div>
          <div className="at-footer-bottom">
            <span>© 2026 AWESOME AKOKAYO</span>
            <span>BUILT IN NIGERIA · SHIPPING WORLDWIDE</span>
            <div className="at-socials">
              {SOCIALS.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>{social.label} <Arrow diagonal /></a>)}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
