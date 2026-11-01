import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Menu,
  X,
} from "lucide-react";
import { projects } from "../data/projects.js";
import "./editorial.css";

const EMAIL = "awesomeakokayo@gmail.com";
const WHATSAPP =
  "https://wa.me/2349020372640?text=Hi%20Awesome%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20talk%20about%20a%20product.";

const navigation = [
  ["Work", "#work"],
  ["Approach", "#approach"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

const projectStories = {
  openbooks: {
    headline: "Make the money side of business easier to see.",
    role: "Product engineering",
  },
  techskillhub: {
    headline: "Give independent learners a clearer direction.",
    role: "Founder · Full-stack",
  },
  "southwest-flood-monitor": {
    headline: "Turn community reports into earlier awareness.",
    role: "Mobile · Backend · AI",
  },
  "elroi-hub": {
    headline: "A digital home built to move people to action.",
    role: "Frontend development",
  },
};

const capabilities = [
  {
    number: "01",
    title: "Product thinking",
    text: "Understand the problem, map the experience and decide what is worth building before the code gets written.",
    detail: "Discovery · UX flows · Product decisions",
  },
  {
    number: "02",
    title: "Full-stack engineering",
    text: "Build the interface, the backend and the systems between them. Keep the product usable, dependable and ready to grow.",
    detail: "Web · Mobile · APIs · Data",
  },
  {
    number: "03",
    title: "AI integration",
    text: "Use AI where it creates a real advantage: useful workflows, better discovery and less repetitive work.",
    detail: "LLM APIs · Automation · Integrations",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    text: "The problem, the people affected and the outcome that would make a difference.",
  },
  {
    number: "02",
    title: "Shape",
    text: "The user flow, product direction, scope and trade-offs. Keep the first version focused.",
  },
  {
    number: "03",
    title: "Build",
    text: "Bring design, frontend, backend, data and AI together into one working product.",
  },
  {
    number: "04",
    title: "Validate & ship",
    text: "Test the important paths, launch, learn from real use and improve what matters.",
  },
];

const aboutFacts = [
  ["2026", "B.Sc. Computer Science, Coal City University"],
  ["2025", "Presented original research at Springer ETMiS"],
  ["Leadership", "Former Vice President II, NACOS"],
  ["Now", "Building products across business, education and civic technology"],
];

const additionalWork = [
  ["NaviPro", "Career technology", "AI-assisted career guidance and roadmap platform."],
  ["EmoHabit", "Health · In development", "A habit companion focused on emotional patterns, not just streaks."],
  ["CCU Journal of Education", "Academic publishing", "Submission, editorial review and publication workflows."],
  ["AE-FUNAI Journal", "Institutional platform", "A digital workflow for academic submission and review."],
  ["Blancquake Foundation", "Non-profit", "A digital home for neuro-health and blood-donation advocacy."],
];

const socialLinks = [
  ["LinkedIn", "Professional profile", "https://www.linkedin.com/in/awesomeakokayo/"],
  ["GitHub", "Code and projects", "https://github.com/awesomeakokayo"],
  ["X", "Thoughts and build notes", "https://x.com/awesomeakokayo"],
  ["Instagram", "Behind the work", "https://www.instagram.com/awesomeakokayo/"],
];

function Eyebrow({ children, light = false }) {
  return <p className={"ed-eyebrow" + (light ? " is-light" : "")}>{children}</p>;
}

function Reveal({ children, className = "", delay = 0, as: Tag = "div", ...props }) {
  return (
    <Tag
      {...props}
      className={"ed-reveal " + className}
      style={{ "--ed-reveal-delay": delay + "ms" }}
    >
      {children}
    </Tag>
  );
}

function SiteHeader({ menuOpen, setMenuOpen, scrolled, onEnterMuseum }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [setMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={"ed-header" + (scrolled ? " is-scrolled" : "") + (menuOpen ? " is-open" : "")}>
      <div className="ed-container ed-nav">
        <a className="ed-brand" href="#top" aria-label="Awesome Akokayo, home" onClick={closeMenu}>
          <span className="ed-brand-mark" aria-hidden="true">A</span>
          <span className="ed-brand-name">Awesome Akokayo</span>
        </a>

        <nav className="ed-desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <div className="ed-nav-actions">
          {onEnterMuseum && (
            <button type="button" className="ed-archive-nav" onClick={onEnterMuseum}>
              3D archive <ArrowUpRight size={14} />
            </button>
          )}
          <a className="ed-nav-cta" href="#contact">
            Let's talk <ArrowUpRight size={15} />
          </a>
        </div>

        <button
          type="button"
          className="ed-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="ed-mobile-menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <div id="ed-mobile-menu" className={"ed-mobile-menu" + (menuOpen ? " is-open" : "")}>
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, href], index) => (
            <a key={label} href={href} onClick={closeMenu}>
              <span className="ed-mobile-index">0{index + 1}</span>
              <span>{label}</span>
              <ArrowUpRight size={17} />
            </a>
          ))}
          {onEnterMuseum && (
            <button type="button" onClick={() => { closeMenu(); onEnterMuseum(); }}>
              <span className="ed-mobile-index">05</span>
              <span>Enter the 3D archive</span>
              <ArrowUpRight size={17} />
            </button>
          )}
        </nav>
        <p>Building digital products beyond the code.</p>
      </div>
    </header>
  );
}

function ProjectImage({ project, featured = false }) {
  return (
    <div className={"ed-project-image ed-project-image-" + (project.imageMode || "cover") + (featured ? " is-featured" : "")}>
      <img
        src={project.image}
        alt={project.imageAlt}
        loading={featured ? "eager" : "lazy"}
        decoding="async"
      />
      <span className="ed-image-index">{project.number} / 04</span>
      <span className="ed-image-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
    </div>
  );
}

function FeaturedProject({ project }) {
  const story = projectStories[project.slug] || {};
  return (
    <Reveal as="article" className="ed-featured-project">
      <a
        className="ed-featured-visual"
        href={project.url || "#contact"}
        target={project.url ? "_blank" : undefined}
        rel={project.url ? "noreferrer" : undefined}
        aria-label={project.url ? "Open " + project.name : "Ask about " + project.name}
      >
        <ProjectImage project={project} featured />
      </a>

      <div className="ed-featured-copy">
        <div className="ed-project-topline">
          <span>{project.category}</span>
          <span className="ed-project-role">{story.role || project.role}</span>
        </div>
        <h3>{project.name}<span className="ed-period">.</span></h3>
        <p className="ed-project-headline">{story.headline}</p>
        <p className="ed-project-description">{project.description}</p>
        <div className="ed-project-tags" aria-label="Project capabilities">
          {project.tags.map((tag, index) => (
            <span key={tag}>{index > 0 && <i aria-hidden="true">/</i>}{tag}</span>
          ))}
        </div>
        {project.url ? (
          <a className="ed-text-link" href={project.url} target="_blank" rel="noreferrer">
            {project.linkLabel || "View project"} <ArrowUpRight size={16} />
          </a>
        ) : (
          <span className="ed-project-note">Project details available on request</span>
        )}
      </div>
    </Reveal>
  );
}

function ProjectCard({ project }) {
  const story = projectStories[project.slug] || {};
  return (
    <Reveal as="article" className="ed-project-card">
      <a
        className="ed-card-visual"
        href={project.url || "#contact"}
        target={project.url ? "_blank" : undefined}
        rel={project.url ? "noreferrer" : undefined}
        aria-label={project.url ? "Open " + project.name : "Ask about " + project.name}
      >
        <ProjectImage project={project} />
      </a>
      <div className="ed-card-copy">
        <div className="ed-card-meta">
          <span>{project.number}</span>
          <span>{project.category}</span>
        </div>
        <h3>{project.name}<span className="ed-period">.</span></h3>
        <p className="ed-card-headline">{story.headline}</p>
        <p>{project.description}</p>
        {project.url && (
          <a className="ed-text-link" href={project.url} target="_blank" rel="noreferrer">
            {project.linkLabel || "View project"} <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

export default function EditorialSite({ onEnterMuseum, museumEntryRef, museumOpen = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [formError, setFormError] = useState("");
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  useEffect(() => {
    document.body.classList.add("ed-body");
    document.documentElement.classList.add("ed-html");
    return () => {
      document.body.classList.remove("ed-body");
      document.documentElement.classList.remove("ed-html");
    };
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll(".ed-reveal"));
    if (!elements.length) return undefined;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    document.documentElement.classList.add("ed-motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("ed-motion-ready");
    };
  }, []);

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:" + EMAIL;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState === "sending" || formState === "sent") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email")?.toString().trim();

    setFormState("sending");
    setFormError("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/" + EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email,
          company: data.get("company"),
          projectType: data.get("projectType"),
          budget: data.get("budget"),
          brief: data.get("brief"),
          _subject: "New project enquiry from awesomeakokayo.cv",
          _replyto: email,
          _template: "table",
          _honey: "",
          _url: window.location.href,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) throw new Error("Submission failed");
      setFormState("sent");
      form.reset();
    } catch {
      setFormState("error");
      setFormError("The form could not send just now. Please use email or WhatsApp directly.");
    }
  };

  return (
    <div id="top" className="ed-root">
      <a className="ed-skip-link" href="#work">Skip to selected work</a>
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        onEnterMuseum={onEnterMuseum}
      />

      <main>
        <section className="ed-hero" aria-labelledby="ed-hero-title">
          <div className="ed-container">
            <div className="ed-hero-overline">
              <span>Independent product engineer</span>
              <span>Nigeria <i aria-hidden="true">/</i> Working worldwide</span>
            </div>

            <div className="ed-hero-grid">
              <div className="ed-hero-copy">
                <Eyebrow><span className="ed-live-dot" aria-hidden="true" /> PRODUCT THINKING · FULL-STACK ENGINEERING · AI</Eyebrow>
                <h1 id="ed-hero-title">
                  I build <span>software</span> people <em>actually use.</em>
                </h1>
                <p className="ed-hero-description">
                  I turn real problems into useful digital products, shaping the experience,
                  building the system and helping the work reach real users.
                </p>
                <div className="ed-hero-actions">
                  <a className="ed-button ed-button-dark" href="#work">
                    Explore selected work <ArrowRight size={17} />
                  </a>
                  <a className="ed-button ed-button-text" href="#about">
                    A little about me <ArrowUpRight size={16} />
                  </a>
                </div>
                <div className="ed-hero-note">
                  <span className="ed-hero-note-line" aria-hidden="true" />
                  <p>From the first product decision to the final deployment.</p>
                </div>
              </div>

              <div className="ed-hero-visual">
                <div className="ed-visual-meta">
                  <span>01 / A PRODUCT IN THE WILD</span>
                  <span>OPENBOOKS</span>
                </div>
                <a className="ed-hero-image" href={featuredProject.url} target="_blank" rel="noreferrer" aria-label="Explore OpenBooks">
                  <img src={featuredProject.image} alt={featuredProject.imageAlt} fetchPriority="high" decoding="async" />
                  <span className="ed-hero-image-shade" aria-hidden="true" />
                  <span className="ed-hero-image-caption">
                    <span>OpenBooks</span>
                    <small>Business product · Live</small>
                  </span>
                  <span className="ed-hero-image-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
                </a>
                <div className="ed-visual-foot">
                  <span>Product engineering</span>
                  <span>Web · Data · Payments</span>
                </div>
                <div className="ed-floating-index" aria-hidden="true">AA / 26</div>
              </div>
            </div>

            <div className="ed-hero-bottom">
              <span><i aria-hidden="true" /> Available for select opportunities</span>
              <a href="#work">Scroll to explore <ArrowDown size={14} /></a>
            </div>
          </div>
        </section>

        <section className="ed-proof-strip" aria-label="Selected products and platforms">
          <div className="ed-container ed-proof-inner">
            <p>Built, shipped & explored</p>
            <div className="ed-proof-names">
              <span>OpenBooks</span>
              <span>TechSkillHub</span>
              <span>Flood Monitor</span>
              <span>Elroi Hub</span>
              <span>NaviPro</span>
            </div>
          </div>
        </section>

        <section id="work" className="ed-section ed-work" aria-labelledby="ed-work-title">
          <div className="ed-container">
            <div className="ed-section-heading">
              <Reveal>
                <Eyebrow>01 / Selected work</Eyebrow>
                <h2 id="ed-work-title">Less talk. <span>More proof.</span></h2>
              </Reveal>
              <Reveal delay={100} className="ed-section-intro">
                <p>A selection of products and systems built around real needs, from business operations to learning and civic technology.</p>
              </Reveal>
            </div>

            <FeaturedProject project={featuredProject} />
            <div className="ed-project-grid">
              {otherProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            <Reveal className="ed-additional-work">
              <div className="ed-additional-head">
                <Eyebrow>Also in the workshop</Eyebrow>
                <p>Other products, experiments and platform work.</p>
              </div>
              <div className="ed-additional-list">
                {additionalWork.map(([name, type, description], index) => (
                  <div className="ed-additional-row" key={name}>
                    <span className="ed-additional-number">0{index + 1}</span>
                    <strong>{name}</strong>
                    <span className="ed-additional-type">{type}</span>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {onEnterMuseum && (
              <div className="ed-archive-invite">
                <div>
                  <Eyebrow>Take another route</Eyebrow>
                  <p>Explore the work in a different way.</p>
                </div>
                <button
                  ref={museumEntryRef}
                  type="button"
                  onClick={onEnterMuseum}
                  aria-haspopup="dialog"
                  aria-expanded={museumOpen}
                >
                  Enter the 3D archive <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="ed-capabilities" aria-labelledby="ed-capabilities-title">
          <div className="ed-container">
            <div className="ed-capabilities-heading">
              <Reveal>
                <Eyebrow light>02 / What I bring</Eyebrow>
                <h2 id="ed-capabilities-title">Good products need more than <span>good code.</span></h2>
              </Reveal>
              <Reveal delay={100}>
                <p>Engineering matters. So does knowing what to build, how it should feel and what happens after launch.</p>
              </Reveal>
            </div>
            <div className="ed-capability-grid">
              {capabilities.map((item) => (
                <Reveal as="article" className="ed-capability" key={item.number}>
                  <span className="ed-capability-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="ed-capability-detail">{item.detail}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="ed-section ed-approach" aria-labelledby="ed-approach-title">
          <div className="ed-container">
            <div className="ed-section-heading">
              <Reveal>
                <Eyebrow>03 / The approach</Eyebrow>
                <h2 id="ed-approach-title">From unclear idea to <span>working product.</span></h2>
              </Reveal>
              <Reveal delay={100} className="ed-section-intro">
                <p>A practical process that keeps the problem in view and the work moving towards something people can use.</p>
              </Reveal>
            </div>
            <div className="ed-process-grid">
              {processSteps.map((step) => (
                <Reveal as="article" className="ed-process-step" key={step.number}>
                  <span className="ed-process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <span className="ed-process-rule" aria-hidden="true" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="ed-section ed-about" aria-labelledby="ed-about-title">
          <div className="ed-container ed-about-grid">
            <Reveal className="ed-about-side">
              <Eyebrow>04 / About</Eyebrow>
              <p className="ed-about-location">NIGERIA <span>/</span> REMOTE</p>
              <div className="ed-about-monogram" aria-hidden="true">A<span>.</span></div>
              <p className="ed-about-caption">Curious by nature.<br />Engineering-led by practice.</p>
            </Reveal>
            <div className="ed-about-main">
              <Reveal>
                <h2 id="ed-about-title">I care about what gets <span>built,</span> not just what gets coded.</h2>
                <div className="ed-about-copy">
                  <p>
                    I'm Awesome, a software engineer from Nigeria. I enjoy taking ideas that are
                    still messy, unclear or sitting in someone's head and turning them into
                    products people can actually use.
                  </p>
                  <p>
                    I studied Computer Science at Coal City University, presented original
                    research at Springer ETMiS 2025, and have led a cross-functional team building
                    an AI career platform. I use AI as leverage, while keeping product decisions,
                    engineering judgement and accountability with the builder.
                  </p>
                </div>
              </Reveal>
              <Reveal className="ed-about-facts" delay={100}>
                {aboutFacts.map(([label, detail]) => (
                  <div className="ed-about-fact" key={label}>
                    <span>{label}</span>
                    <p>{detail}</p>
                  </div>
                ))}
              </Reveal>
              <Reveal className="ed-toolkit" delay={140}>
                <p className="ed-toolkit-label">The toolkit</p>
                <p>TypeScript · JavaScript · Python · React · Next.js · React Native · FastAPI · Node.js · PostgreSQL · Prisma · Redis · Firebase · LLM APIs · Docker · Vercel</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contact" className="ed-contact" aria-labelledby="ed-contact-title">
          <div className="ed-container">
            <Reveal className="ed-contact-heading">
              <Eyebrow light>05 / Contact</Eyebrow>
              <h2 id="ed-contact-title">Have a real problem <span>to solve?</span></h2>
              <p>Bring the idea, the challenge or the rough sketch. Let's work out what a useful product could look like.</p>
            </Reveal>

            <div className="ed-contact-grid">
              <Reveal className="ed-contact-direct">
                <a className="ed-email-link" href={"mailto:" + EMAIL}>
                  <span>Email</span>
                  <strong>{EMAIL}</strong>
                  <ArrowUpRight size={20} />
                </a>
                <div className="ed-contact-actions">
                  <a className="ed-button ed-button-light" href={"mailto:" + EMAIL}>
                    Start a conversation <ArrowRight size={16} />
                  </a>
                  <button type="button" className="ed-button ed-button-outline" onClick={copyEmail}>
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "Copied" : "Copy email"}
                  </button>
                  <a className="ed-button ed-button-outline" href={WHATSAPP} target="_blank" rel="noreferrer">
                    WhatsApp <ArrowUpRight size={15} />
                  </a>
                </div>
                <ul className="ed-social-links">
                  {socialLinks.map(([label, detail, href]) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer">
                        <span>{label}</span>
                        <small>{detail}</small>
                        <ArrowUpRight size={15} />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="ed-form-panel" delay={100}>
                <div className="ed-form-intro">
                  <span>Prefer a project brief?</span>
                  <p>Share a few details and I'll reply by email.</p>
                </div>
                <form className="ed-form" onSubmit={handleSubmit}>
                  <div className="ed-form-grid">
                    <label>
                      <span>Name</span>
                      <input required name="name" autoComplete="name" placeholder="Your name" />
                    </label>
                    <label>
                      <span>Email</span>
                      <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" />
                    </label>
                    <label>
                      <span>Company / organisation</span>
                      <input name="company" autoComplete="organization" placeholder="Optional" />
                    </label>
                    <label>
                      <span>Project type</span>
                      <select required name="projectType" defaultValue="">
                        <option value="">Select one</option>
                        <option>Website</option>
                        <option>Web application / SaaS</option>
                        <option>Mobile app</option>
                        <option>AI integration / automation</option>
                        <option>Something else</option>
                      </select>
                    </label>
                    <label className="ed-form-budget">
                      <span>Budget</span>
                      <select required name="budget" defaultValue="">
                        <option value="">Choose a range</option>
                        <option>Below ₦500k</option>
                        <option>₦500k – ₦1m</option>
                        <option>₦1m – ₦2m</option>
                        <option>₦2m+</option>
                      </select>
                    </label>
                  </div>
                  <label className="ed-form-brief">
                    <span>What are you trying to build?</span>
                    <textarea required name="brief" rows="4" placeholder="The problem, who it is for, and what you need it to do." />
                  </label>
                  <div className="ed-form-bottom">
                    <button
                      className="ed-button ed-button-dark"
                      type="submit"
                      disabled={formState === "sending" || formState === "sent"}
                    >
                      {formState === "sending" ? "Sending..." : formState === "sent" ? "Enquiry sent" : "Send project enquiry"}
                      <ArrowRight size={16} />
                    </button>
                    <p className={"ed-form-status" + (formState === "error" ? " is-error" : "")} aria-live="polite">
                      {formState === "sent" ? "Thanks. Your enquiry has been sent." : formState === "error" ? formError : ""}
                    </p>
                  </div>
                </form>
              </Reveal>
            </div>
            <p className="ed-availability"><i aria-hidden="true" /> Available for select product and engineering opportunities · Remote</p>
          </div>
        </section>
      </main>

      <footer className="ed-footer">
        <div className="ed-container ed-footer-main">
          <a className="ed-brand ed-footer-brand" href="#top">
            <span className="ed-brand-mark" aria-hidden="true">A</span>
            <span className="ed-brand-name">Awesome Akokayo</span>
          </a>
          <p>Building digital products beyond the code.</p>
          <nav aria-label="Footer navigation">
            {navigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </nav>
          {onEnterMuseum && (
            <button
              type="button"
              className="ed-footer-archive"
              onClick={onEnterMuseum}
              aria-haspopup="dialog"
              aria-expanded={museumOpen}
            >
              Enter the 3D archive <ArrowUpRight size={14} />
            </button>
          )}
        </div>
        <div className="ed-container ed-footer-bottom">
          <span>© {new Date().getFullYear()} Awesome Akokayo</span>
          <span>Built in Nigeria · Shipping worldwide</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
