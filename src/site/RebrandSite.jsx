import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
} from "lucide-react";
import BrandMark from "./BrandMark.jsx";
import ThemeSlider from "./ThemeSlider.jsx";
import {
  useInView,
  useMediaQuery,
  useReducedMotion,
  useScrollReveal,
  useTilt,
} from "./motion.js";
import { getThemeMode, useThemeLevel } from "./theme.js";
import "./site.css";

const HeroScene = lazy(() => import("./scene/HeroScene.jsx"));

const EMAIL = "awesomeakokayo@gmail.com";
const WHATSAPP =
  "https://wa.me/2349020372640?text=Hi%20Awesome%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20talk%20about%20a%20product.";

const projects = [
  {
    number: "01",
    name: "OpenBooks",
    category: "Business product · Live",
    role: "Product engineering",
    domain: "openbooks.click",
    title: "Money, made easier to follow.",
    description:
      "A simple cashbook for invoices, expenses and customer balances.",
    tags: ["Invoices", "Payments"],
    image: "/projects/openbooks-cover.webp",
    imageAlt: "OpenBooks cashbook landing screen",
    url: "https://www.openbooks.click",
    linkLabel: "Open the product",
    accent: "clay",
  },
  {
    number: "02",
    name: "TechSkillHub",
    category: "EdTech platform · Live",
    role: "Founder · Full-stack",
    domain: "techskillhub.cv",
    title: "Direction, not more information.",
    description:
      "Guided tech learning paths, practical projects and saved progress.",
    tags: ["Next.js", "PostgreSQL"],
    image: "/projects/tech-skill-hub.webp",
    imageAlt: "TechSkillHub learning platform screen",
    url: "https://www.techskillhub.cv",
    linkLabel: "Visit the platform",
    accent: "pine",
  },
  {
    number: "03",
    name: "Southwest Flood Monitor",
    category: "Civic technology · Built",
    role: "Mobile · Backend · AI",
    domain: "Mobile product",
    title: "Earlier, clearer warnings when water starts to rise.",
    description:
      "Location-tagged community reports with AI-assisted image analysis.",
    tags: ["React Native", "FastAPI"],
    image: "/projects/flood-monitor.webp",
    imageAlt: "Southwest Flood Monitor map screen",
    url: "",
    linkLabel: "",
    accent: "mist",
  },
  {
    number: "04",
    name: "Elroi Hub",
    category: "Client build · Live",
    role: "Frontend development",
    domain: "elroihubllc.com",
    title: "A brand site built to turn attention into enquiries.",
    description:
      "A responsive agency site designed to turn attention into enquiries.",
    tags: ["TypeScript", "Responsive UI"],
    image: "/projects/elroi-hub.webp",
    imageAlt: "Elroi Hub agency website on mobile",
    url: "https://www.elroihubllc.com",
    linkLabel: "Visit the website",
    accent: "sand",
  },
];


const principles = [
  {
    number: "01",
    title: "Start with the problem.",
    text: "Understand the person before choosing the technology.",
    tag: "Clarity",
  },
  {
    number: "02",
    title: "Make it feel obvious.",
    text: "Useful flows. Thoughtful details. Less friction.",
    tag: "Experience",
  },
  {
    number: "03",
    title: "Ship and improve.",
    text: "Real use is better feedback than a perfect plan.",
    tag: "Delivery",
  },
];

const aboutFacts = [
  ["2026", "B.Sc. Computer Science"],
  ["2025", "Springer ETMiS research"],
  ["2024", "Former NACOS Vice President II"],
];

const moreWork = [
  "NaviPro",
  "EmoHabit",
  "CCU Journal",
  "AE-FUNAI Journal",
  "Blancquake Foundation",
];

const toolkit =
  "TypeScript · React · Next.js · React Native · FastAPI · PostgreSQL · AI APIs";

const contactLinks = [
  ["LinkedIn", "https://www.linkedin.com/in/awesomeakokayo/"],
  ["GitHub", "https://github.com/awesomeakokayo"],
  ["X / Twitter", "https://x.com/awesomeakokayo"],
];

const clientLogos = [
  {
    name: "OpenBooks",
    url: "https://www.openbooks.click",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="rb-monomark-svg">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10M6 10h10" />
      </svg>
    ),
  },
  {
    name: "TechSkillHub",
    url: "https://www.techskillhub.cv",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="rb-monomark-svg">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    name: "NaviPro",
    url: "#more-work",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="rb-monomark-svg">
        <circle cx="12" cy="12" r="10" />
        <path d="m15.5 7.5-2.3 6.2-6.2 2.8 2.8-6.2 5.7-2.8Z" />
      </svg>
    ),
  },
];

function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  return (
    <Tag
      {...rest}
      data-reveal
      className={"rb-reveal " + className}
      style={{ ...style, "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function TiltSurface({ className = "", children }) {
  const tilt = useTilt({ max: 3.2 });
  return (
    <div
      ref={tilt.ref}
      className={"rb-tilt " + className}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="rb-eyebrow">
      <span>{children}</span>
    </p>
  );
}

function EntityFallback() {
  return (
    <span className="rb-entity-fallback" aria-hidden="true">
      <span className="rb-entity-fallback-pill">
        <span className="rb-entity-fallback-rim" />
        <span className="rb-entity-fallback-button">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M8 24 24 8M12 8h12v12" />
          </svg>
        </span>
      </span>
    </span>
  );
}

function ScrollProgress() {
  const bar = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? root.scrollTop / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="rb-progress" aria-hidden="true">
      <span ref={bar} />
    </div>
  );
}

function Nav({ scrolled, themeLevel, setThemeLevel }) {
  return (
    <header className={"rb-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="rb-container rb-nav">
        <a className="rb-brand" href="#top" aria-label="Awesome Akokayo, home">
          <BrandMark size={44} standalone />
          <span className="rb-brand-name">Awesome</span>
        </a>

        <div className={"rb-header-theme" + (scrolled ? " is-hidden" : "")}>
          <ThemeSlider
            wide
            level={themeLevel}
            onChange={setThemeLevel}
            className="rb-theme-header"
          />
        </div>

        <a
          className={"rb-pill rb-pill-cta rb-mobile-scrolled-cta" + (scrolled ? " is-visible" : "")}
          href="#contact"
        >
          <span className="rb-pill-orb" aria-hidden="true">
            <ArrowRight size={13} />
          </span>
          <span>Contact</span>
        </a>
      </div>
    </header>
  );
}
function SectionHead({ label, title, aside, id }) {
  return (
    <Reveal className="rb-section-head">
      <div className="rb-section-head-main">
        <Eyebrow>{label}</Eyebrow>
        <h2 id={id}>{title}</h2>
      </div>
      {aside && <p className="rb-section-aside">{aside}</p>}
    </Reveal>
  );
}

function LiveBadge() {
  return (
    <span className="rb-live">
      <span aria-hidden="true" />
      Live
    </span>
  );
}

function InteractiveLiveFrame({ project, large = false }) {
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    frameRef.current.style.setProperty("--mouse-x", `${x}px`);
    frameRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={frameRef}
      className={`rb-liveframe ${large ? "is-large" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial cursor spotlight tracking */}
      <span className="rb-liveframe-spotlight" aria-hidden="true" />
      <span className="rb-liveframe-scanline" aria-hidden="true" />

      {/* Browser / Application Chrome Header */}
      <div className="rb-liveframe-chrome">
        <div className="rb-liveframe-dots" aria-hidden="true">
          <span className="rb-dot rb-dot-red" />
          <span className="rb-dot rb-dot-yellow" />
          <span className="rb-dot rb-dot-green" />
        </div>

        <div className="rb-liveframe-urlbar">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="rb-lock-icon">
            <rect x="3" y="7" width="10" height="7" rx="1.5" />
            <path d="M5.5 7V4.5a2.5 2.5 0 0 1 5 0V7" />
          </svg>
          <span className="rb-liveframe-domain">{project.domain || "app.production"}</span>
          {project.url && <span className="rb-liveframe-ping" title="Production live" />}
        </div>

        <div className="rb-liveframe-status">
          {project.url ? (
            <span className="rb-liveframe-badge">200 OK</span>
          ) : (
            <span className="rb-liveframe-badge rb-badge-beta">PROTOTYPE</span>
          )}
        </div>
      </div>

      {/* Frame Viewport */}
      <div className="rb-liveframe-viewport">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading={large ? "eager" : "lazy"}
          decoding="async"
        />

        {/* Hover overlay micro-interaction */}
        <div className={`rb-liveframe-overlay ${hovered ? "is-active" : ""}`}>
          <span className="rb-liveframe-cta-pill">
            <span>{project.url ? "Launch preview" : "View architecture"}</span>
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}

function FeaturedProject({ project }) {
  return (
    <Reveal className="rb-featured-liveframe">
      <div className="rb-featured-head">
        <div className="rb-project-kicker">
          <span className="rb-project-category">{project.category}</span>
          {project.url && <LiveBadge />}
        </div>
        <span className="rb-featured-role-pill">{project.role}</span>
      </div>

      <div className="rb-featured-title-wrap">
        <h3>{project.name}</h3>
        <p className="rb-featured-title">{project.title}</p>
        <p className="rb-featured-description">{project.description}</p>
      </div>

      <InteractiveLiveFrame project={project} large />

      <div className="rb-featured-bottom">
        <ul className="rb-tags" aria-label="Product stack">
          {project.tags.map((tag) => (
            <li key={tag} className="rb-tag-chip">{tag}</li>
          ))}
        </ul>
        {project.url && (
          <a className="rb-liveframe-btn" href={project.url} target="_blank" rel="noreferrer">
            Visit {project.name} <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, delay }) {
  return (
    <Reveal as="article" className="rb-project-liveframe" delay={delay}>
      <div className="rb-card-head">
        <span className="rb-project-category">{project.category}</span>
        {project.url && <LiveBadge />}
      </div>

      <div className="rb-card-title-wrap">
        <h3>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer">{project.name}</a>
          ) : project.name}
        </h3>
        <p className="rb-project-title">{project.title}</p>
      </div>

      <InteractiveLiveFrame project={project} />

      <p className="rb-project-description">{project.description}</p>

      <div className="rb-card-bottom">
        <span className="rb-card-role">{project.role}</span>
        {project.url && (
          <a className="rb-card-action-btn" href={project.url} target="_blank" rel="noreferrer">
            Visit <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

export default function RebrandSite({ onEnterMuseum, museumEntryRef, museumOpen = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [formError, setFormError] = useState("");
  const [themeLevel, setThemeLevel] = useThemeLevel();

  const reduced = useReducedMotion();
  useScrollReveal();

  const heroTrackRef = useRef(null);
  const heroProgressRef = useRef(0);

  const entityRef = useRef(null);
  const entityInView = useInView(entityRef, { rootMargin: "320px" });
  const themeIsDark = getThemeMode(themeLevel) === "dark";
  const narrow = useMediaQuery("(max-width: 860px)");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const track = heroTrackRef.current;
    if (!track) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const isNarrow = window.innerWidth < 861;
      const distance = isNarrow
        ? Math.max(rect.height * 0.62, 1)
        : Math.max(rect.height - window.innerHeight, 1);

      const progress = isNarrow
        ? Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight * 0.55, 1)))
        : Math.min(1, Math.max(0, -rect.top / distance));

      heroProgressRef.current = progress;
      track.style.setProperty("--hero-shift", progress.toFixed(4));
      track.classList.toggle("is-shifted", progress > 0.34);
    };

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
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
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email,
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
    <div id="top" className="rb-root">
      <a className="rb-skip" href="#work">Skip to selected work</a>
      <ScrollProgress />
      <Nav
        scrolled={scrolled}
        themeLevel={themeLevel}
        setThemeLevel={setThemeLevel}
      />

      <main>
        <section className="rb-hero" aria-labelledby="rb-hero-title">
          <div className="rb-hero-track" ref={heroTrackRef}>
            <div className="rb-hero-sticky">
              <div className="rb-container rb-hero-grid">
                <div className="rb-hero-copy">
                  <div className="rb-hero-intro">
                    <div className="rb-hero-focus-tag">
                      <span className="rb-focus-dot" aria-hidden="true" />
                      <span>Product engineering · Full-stack · AI</span>
                    </div>

                    <h1 id="rb-hero-title" className="rb-hero-title">
                      Product-focused <span className="rb-accent">software engineer.</span>
                    </h1>

                    <p className="rb-hero-location">
                      Nigeria <span aria-hidden="true">/</span> Remote
                    </p>
                  </div>

                  <div className="rb-hero-about">
                    <p className="rb-eyebrow">
                      <span className="rb-status-dot" aria-hidden="true" />
                      I'm Awesome Akokayo
                    </p>
                    <p className="rb-hero-about-title">
                      I take messy ideas and <span className="rb-accent">ship products.</span>
                    </p>
                    <p className="rb-hero-about-text">
                      Design-led. Built to ship.
                    </p>
                    <a className="rb-text-link" href="#about">
                      About me <ArrowRight size={15} />
                    </a>
                  </div>
                </div>

                <div className="rb-hero-entity" ref={entityRef}>
                  <a className="rb-hero-entity-link" href="#work" aria-label="See selected work">
                    <span className="rb-entity-stage">
                      {entityInView ? (
                        <Suspense fallback={<EntityFallback />}>
                          <HeroScene
                            progressRef={heroProgressRef}
                            active={entityInView}
                            reduced={reduced}
                            dark={themeIsDark}
                            narrow={narrow}
                          />
                        </Suspense>
                      ) : (
                        <EntityFallback />
                      )}
                    </span>
                    <span className="rb-entity-shadow" aria-hidden="true" />
                  </a>
                  <p className="rb-entity-caption">
                    <span>The process</span> Idea → real use
                  </p>
                </div>
              </div>

              <div className="rb-container rb-hero-foot">
                <span>
                  <span className="rb-status-dot" aria-hidden="true" /> Available for select work
                </span>
                <a href="#work">Selected work <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* IN THE WILD: Theme-aware liquid-glass strip for the products built and shipped */}
        <section className="rb-logos" aria-labelledby="rb-logos-title">
          <div className="rb-container">
            <Reveal className="rb-logos-capsule-dark">
              <div className="rb-logos-capsule-head">
                <span className="rb-capsule-dot" aria-hidden="true" />
                <span id="rb-logos-title" className="rb-capsule-title">Selected products</span>
              </div>
              <ul className="rb-logos-capsule-row">
                {clientLogos.map((item) => (
                  <li key={item.name}>
                    <a
                      className="rb-capsule-item"
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : "_self"}
                      rel={item.url.startsWith("http") ? "noreferrer" : ""}
                    >
                      <span className="rb-capsule-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="rb-capsule-text">
                        <strong>{item.name}</strong>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="work" className="rb-section rb-work" aria-labelledby="rb-work-title">
          <div className="rb-container">
            <SectionHead
              label="Selected work"
              title={<>The work is the <span className="rb-accent">proof.</span></>}
              id="rb-work-title"
            />

            <FeaturedProject project={projects[0]} />

            <div className="rb-project-grid">
              {projects.slice(1).map((project, index) => (
                <ProjectCard key={project.name} project={project} delay={index * 70} />
              ))}
            </div>

            <Reveal className="rb-more" id="more-work">
              <p className="rb-label">Also in the archive</p>
              <p className="rb-more-inline">{moreWork.join(" · ")}</p>
            </Reveal>
          </div>
        </section>

        <section id="approach" className="rb-section rb-approach" aria-labelledby="rb-approach-title">
          <div className="rb-container">
            <SectionHead
              label="How I work"
              title={<>Clear thinking. <span className="rb-accent">Useful work.</span></>}
              id="rb-approach-title"
            />
            <div className="rb-principles">
              {principles.map((principle, index) => (
                <Reveal
                  as="article"
                  className="rb-principle"
                  key={principle.number}
                  delay={index * 55}
                >
                  <span className="rb-principle-tag">{principle.tag}</span>
                  <div className="rb-principle-main">
                    <h3>{principle.title}</h3>
                    <p>{principle.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="rb-section rb-about" aria-labelledby="rb-about-title">
          <div className="rb-container rb-about-grid">
            <div className="rb-about-side">
              <div className="rb-about-card">
                <BrandMark size={52} standalone />
                <p className="rb-about-name">Awesome Akokayo</p>
                <p className="rb-about-role">Product-focused software engineer</p>
                <div className="rb-about-meta">
                  <span>Nigeria</span>
                  <span>Remote</span>
                  <span className="rb-about-available"><i aria-hidden="true" />Available</span>
                </div>
              </div>
            </div>

            <div className="rb-about-body">
              <Reveal>
                <Eyebrow>Background</Eyebrow>
                <h2 id="rb-about-title">
                  Engineer by training. <span className="rb-accent">Product by instinct.</span>
                </h2>
                <div className="rb-about-copy">
                  <p>Computer Science graduate building digital products across design, engineering and AI.</p>
                </div>
              </Reveal>

              <Reveal className="rb-about-facts" delay={80}>
                <ul>
                  {aboutFacts.map(([year, text]) => (
                    <li key={text}>
                      <span>{year}</span>
                      <p>{text}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="rb-toolkit" delay={100}>
                <p className="rb-label">Tools</p>
                <p className="rb-stackline">{toolkit}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contact" className="rb-contact" aria-labelledby="rb-contact-title">
          <div className="rb-container">
            <Reveal className="rb-contact-head">
              <Eyebrow>Available for select work</Eyebrow>
              <h2 id="rb-contact-title">Have a <span className="rb-accent">good problem?</span></h2>
              <p>Let's make it useful.</p>
            </Reveal>

            <div className="rb-contact-grid">
              <Reveal className="rb-contact-main" delay={60}>
                <a className="rb-mail" href={`mailto:${EMAIL}`}>
                  <span className="rb-label">Email</span>
                  <strong>{EMAIL}</strong>
                  <ArrowUpRight size={22} />
                </a>
                <div className="rb-contact-buttons">
                  <a className="rb-button rb-button-primary" href={WHATSAPP} target="_blank" rel="noreferrer">
                    Let's talk <ArrowRight size={16} />
                  </a>
                  <button type="button" className="rb-button rb-button-ghost" onClick={copyEmail}>
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "Copied" : "Copy email"}
                  </button>
                </div>
              </Reveal>

              <Reveal className="rb-contact-side" delay={120}>
                <ul>
                  {contactLinks.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer">
                        <span>{label}</span>
                        <ArrowUpRight size={15} />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className="rb-brief" delay={80}>
              <details>
                <summary>
                  <span>Send a short brief</span>
                  <span className="rb-brief-action">Open form <ArrowDown size={15} /></span>
                </summary>
                <form className="rb-form" onSubmit={handleSubmit}>
                  <div className="rb-form-grid">
                    <label>
                      <span>Name</span>
                      <input required name="name" autoComplete="name" placeholder="Your name" />
                    </label>
                    <label>
                      <span>Email</span>
                      <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" />
                    </label>
                  </div>
                  <label className="rb-form-brief">
                    <span>What are you building?</span>
                    <textarea required name="brief" rows="4" placeholder="A few lines about the problem and the people it's for." />
                  </label>
                  <div className="rb-form-foot">
                    <button className="rb-button rb-button-primary" type="submit" disabled={formState === "sending" || formState === "sent"}>
                      {formState === "sending" ? "Sending…" : formState === "sent" ? "Enquiry sent" : "Send brief"}
                      <ArrowRight size={16} />
                    </button>
                    <p className={"rb-form-status" + (formState === "error" ? " is-error" : "")} aria-live="polite">
                      {formState === "sent" ? "Thanks. Your enquiry has been sent." : formState === "error" ? formError : ""}
                    </p>
                  </div>
                </form>
              </details>
            </Reveal>

            <div className="rb-availability">
              <span className="rb-status-dot" aria-hidden="true" />
              Nigeria · Remote · Select projects
            </div>
          </div>
        </section>
      </main>

      <footer className="rb-footer">
        <div className="rb-container rb-footer-main">
          <div className="rb-footer-brand">
            <a className="rb-brand rb-footer-brand-link" href="#top" aria-label="Awesome Akokayo, back to top">
              <BrandMark size={38} standalone className="rb-footer-mark" />
              <span className="rb-brand-name">Awesome</span>
            </a>
            <p>Useful products. Thoughtfully engineered.</p>
          </div>

          <nav className="rb-footer-nav" aria-label="Footer navigation">
            <a href="#work">Work</a>
            <a href="#approach">Approach</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="rb-footer-links">
            <a href="https://github.com/awesomeakokayo" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/awesomeakokayo/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://x.com/awesomeakokayo" target="_blank" rel="noreferrer">X</a>
            {onEnterMuseum && (
              <button
                ref={museumEntryRef}
                type="button"
                className="rb-archive-link"
                onClick={onEnterMuseum}
                aria-haspopup="dialog"
                aria-expanded={museumOpen}
              >
                <span className="rb-archive-dot" aria-hidden="true" />
                Enter the 3D archive <ArrowUpRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="rb-container rb-footer-bottom">
          <span>© {new Date().getFullYear()} Awesome Akokayo</span>
          <span>Nigeria · Working worldwide</span>
          <a href="#top">Back to the top ↑</a>
        </div>
      </footer>
    </div>
  );
}
