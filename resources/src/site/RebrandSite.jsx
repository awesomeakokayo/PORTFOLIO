import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
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
  useScrollProgress,
  useScrollReveal,
} from "./motion.js";
import { getThemeMode, useThemeLevel } from "./theme.js";
import "./site.css";

const ProcessScene = lazy(() => import("./scene/ProcessScene.jsx"));
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
    title: "A clearer way to run the money side of a business.",
    description:
      "A Nigeria-first cashbook for invoices, payments, expenses and customer records — built so a small business owner can see what is owed and where the money is going.",
    tags: ["Invoices", "Payment tracking", "Business records"],
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
      "A free learning platform with structured paths, practical projects and saved progress — designed around the reality of learning technology independently in Africa.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
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
      "A community flood-reporting flow that pairs location-tagged reports with AI-assisted image analysis, so incidents become visible before they become disasters.",
    tags: ["React Native", "FastAPI", "Gemini"],
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
      "A brand-led agency website that connects services, proof and a clear next step — responsive, fast and shaped around how people actually decide to get in touch.",
    tags: ["TypeScript", "CSS", "Responsive UI"],
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
    title: "Problem before code.",
    text: "Understand what should change for the person using the product. The stack comes after that, not before it.",
  },
  {
    number: "02",
    title: "Design is part of engineering.",
    text: "A feature is finished when someone can use it without being taught, and trust it with something real.",
  },
  {
    number: "03",
    title: "Ship, then learn.",
    text: "Working software in front of real people beats a perfect plan in a document. Usage decides what comes next.",
  },
  {
    number: "04",
    title: "AI with judgement.",
    text: "AI is leverage, not a personality. It earns its place where it removes real work — the decisions stay human.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    short: "The problem, the people, the constraint.",
    text: "I start with the outcome and the person on the other side of it. What is broken, for whom, and what would make the situation measurably better?",
  },
  {
    number: "02",
    title: "Shape",
    short: "A direction that can survive reality.",
    text: "Flows, interface, scope and trade-offs. We decide what the product is, what it is not, and what the smallest honest version looks like.",
  },
  {
    number: "03",
    title: "Build",
    short: "Frontend, backend, data, intelligence.",
    text: "Design and engineering move together. Interfaces, APIs, data models and AI where it earns its place — with the edges and failure states treated as part of the product.",
  },
  {
    number: "04",
    title: "Ship & learn",
    short: "Put it in front of people, then improve.",
    text: "Deploy, test with real usage, watch what people actually do, and fix what matters. Launch is the beginning of the useful part.",
  },
];

const toolkit = [
  {
    label: "Frontend & mobile",
    items: "TypeScript, JavaScript, React, Next.js, React Native, Expo, Tailwind CSS",
  },
  {
    label: "Backend & data",
    items: "FastAPI, Node.js, REST APIs, PostgreSQL, Prisma, Redis, Firebase",
  },
  {
    label: "AI & integrations",
    items: "LLM APIs, structured generation, retrieval workflows, Paystack, OAuth, YouTube Data API",
  },
  {
    label: "Cloud & delivery",
    items: "Git, GitHub, Docker, CI/CD, Vercel, Render, Netlify",
  },
];

const moreWork = [
  {
    name: "EmoHabit",
    type: "Health · In development",
    text: "A habit companion that looks at emotional patterns, not just streaks.",
  },
  {
    name: "NaviPro",
    type: "Career · MVP built",
    text: "An AI career platform turning unclear next steps into practical direction.",
  },
  {
    name: "CCU Journal of Education",
    type: "Academic publishing",
    text: "Submission, review and publication workflows for a university journal.",
  },
  {
    name: "AE-FUNAI Journal",
    type: "Institutional platform",
    text: "A digital workflow for academic submission, review and publication.",
  },
  {
    name: "Blancquake Foundation",
    type: "Non-profit",
    text: "A clearer digital home for neuro-health and blood-donation advocacy.",
  },
];

const contactLinks = [
  ["LinkedIn", "Connect professionally", "https://www.linkedin.com/in/awesomeakokayo/"],
  ["GitHub", "Explore the code", "https://github.com/awesomeakokayo"],
  ["X / Twitter", "Follow the build", "https://x.com/awesomeakokayo"],
  ["Instagram", "Behind the work", "https://www.instagram.com/awesomeakokayo/"],
];

const budgetOptions = ["Below ₦500k", "₦500k – ₦1m", "₦1m – ₦2m", "₦2m+"];

const clientLogos = [
  {
    name: "OpenBooks",
    url: "https://www.openbooks.click",
    logo: "/logos/openbooks.png",
  },
  {
    name: "TechSkillHub",
    url: "https://www.techskillhub.cv",
    logo: "/logos/steps-mark.png",
  },
  {
    name: "Elroi Hub",
    url: "https://www.elroihubllc.com",
    logo: "/logos/elroi-hub.png",
  },
  {
    name: "NaviPro",
    url: "#work",
    wordmark: "NaviPro",
    variant: "sans",
  },
  {
    name: "CCU Journal",
    url: "#work",
    wordmark: "CCU Journal",
    variant: "serif",
  },
  {
    name: "Blancquake",
    url: "#work",
    wordmark: "Blancquake",
    variant: "mono",
  },
];

const sectors = [
  {
    name: "Startups",
    note: "0→1 products and MVPs",
    color: "#b06a4a",
    position: "is-top",
  },
  {
    name: "SaaS & B2B",
    note: "Dashboards and workflows",
    color: "#3f6b52",
    position: "is-right",
  },
  {
    name: "Agencies",
    note: "Brand sites and platforms",
    color: "#a9893f",
    position: "is-bottom",
  },
  {
    name: "NGOs & civic",
    note: "Public-interest tools",
    color: "#5b6f8a",
    position: "is-left",
  },
];

const capabilities = [
  "Product engineering",
  "Interface design",
  "Technical SEO",
  "AI when it helps",
];

const compassArms = [
  { x1: 310, y1: 132, x2: 310, y2: 302 },
  { x1: 488, y1: 310, x2: 318, y2: 310 },
  { x1: 310, y1: 488, x2: 310, y2: 318 },
  { x1: 132, y1: 310, x2: 302, y2: 310 },
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

function SectorCompass() {
  return (
    <div className="rb-compass-figure">
      <svg className="rb-compass-svg" viewBox="0 0 620 620" aria-hidden="true">
        <defs>
          {sectors.map((sector, index) => (
            <marker
              key={sector.name}
              id={`rb-sector-arrow-${index}`}
              viewBox="0 0 10 10"
              refX="7.5"
              refY="5"
              markerWidth="4.5"
              markerHeight="4.5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 10 5 0 10z" fill={sector.color} />
            </marker>
          ))}
        </defs>

        <circle className="rb-compass-ring" cx="310" cy="310" r="176" />

        {Array.from({ length: 24 }).map((_, index) => {
          const angle = (index / 24) * Math.PI * 2;
          const major = index % 6 === 0;
          const inner = major ? 150 : 162;
          const outer = 176;
          return (
            <line
              key={index}
              className={"rb-compass-tick" + (major ? " is-major" : "")}
              x1={310 + Math.sin(angle) * inner}
              y1={310 - Math.cos(angle) * inner}
              x2={310 + Math.sin(angle) * outer}
              y2={310 - Math.cos(angle) * outer}
            />
          );
        })}

        {compassArms.map((arm, index) => (
          <line
            key={sectors[index].name}
            className="rb-compass-arm"
            x1={arm.x1}
            y1={arm.y1}
            x2={arm.x2}
            y2={arm.y2}
            stroke={sectors[index].color}
            markerEnd={`url(#rb-sector-arrow-${index})`}
          />
        ))}

        <circle className="rb-compass-hub" cx="310" cy="310" r="5" />
      </svg>

      <ul className="rb-sector-list">
        {sectors.map((sector) => (
          <li
            key={sector.name}
            className={"rb-sector " + sector.position}
            style={{ "--sector": sector.color }}
          >
            <span className="rb-sector-dot" aria-hidden="true" />
            <strong>{sector.name}</strong>
            <small>{sector.note}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EntityFallback() {
  return (
    <span className="rb-entity-fallback" aria-hidden="true">
      <span className="rb-entity-fallback-pill">
        <span className="rb-entity-fallback-rim" />
        <span className="rb-entity-fallback-button">
          <span className="rb-fallback-rose" aria-hidden="true">
            <i className="is-n">N</i>
            <i className="is-e">E</i>
            <i className="is-s">S</i>
            <i className="is-w">W</i>
          </span>
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M12 20 20 12M13 12h7v7" />
          </svg>
        </span>
      </span>
    </span>
  );
}

function ScenePlaceholder({ process = false }) {
  return (
    <div className="rb-scene-fallback" aria-hidden="true">
      <div className={"rb-stack-fallback" + (process ? " rb-stack-fallback-process" : "")}>
        <span className="rb-stack-layer rb-stack-layer-1" />
        <span className="rb-stack-layer rb-stack-layer-2" />
        <span className="rb-stack-layer rb-stack-layer-3" />
        <span className="rb-stack-orb" />
        {!process && <span className="rb-stack-ring" />}
      </div>
    </div>
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
  const links = [
    ["Work", "#work"],
    ["Approach", "#approach"],
    ["About", "#about"],
  ];

  return (
    <header className={"rb-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="rb-container rb-nav">
        <a className="rb-brand" href="#top" aria-label="Awesome Akokayo, home">
          <BrandMark size={46} standalone />
          <span className="rb-brand-name">Awesome</span>
        </a>

        <div className="rb-nav-glass">
          <nav className="rb-nav-links" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <span className="rb-nav-rule" aria-hidden="true" />

          <ThemeSlider
            level={themeLevel}
            onChange={setThemeLevel}
            className="rb-theme-nav"
          />

          <a className="rb-nav-cta" href="#contact">
            <span className="rb-nav-orb" aria-hidden="true">
              <ArrowRight size={13} />
            </span>
            Contact
          </a>
        </div>

        <a className="rb-mobile-cta" href="#contact">
          <span className="rb-pill-orb" aria-hidden="true">
            <ArrowRight size={13} />
          </span>
          <span>Contact</span>
        </a>

        <div className={"rb-mobile-theme" + (scrolled ? " is-hidden" : "")}>
          <ThemeSlider
            wide
            level={themeLevel}
            onChange={setThemeLevel}
            className="rb-theme-mobile"
          />
        </div>
      </div>
    </header>
  );
}

function SectionHead({ title, aside, id }) {
  return (
    <Reveal className="rb-section-head">
      <div className="rb-section-head-main">
        <h2 id={id}>{title}</h2>
      </div>
      {aside && <p className="rb-section-aside">{aside}</p>}
    </Reveal>
  );
}

function ProjectFigure({ project, large = false }) {
  return (
    <div className={"rb-project-figure" + (large ? " is-large" : "")}>
      <img
        src={project.image}
        alt={project.imageAlt}
        loading={large ? "eager" : "lazy"}
        decoding="async"
      />
      <span className="rb-figure-cta" aria-hidden="true">
        {project.url ? "Open the project" : "Built prototype"}
        <ArrowUpRight size={15} />
      </span>
    </div>
  );
}

function FeaturedProject({ project }) {
  const linked = Boolean(project.url);
  const Tag = linked ? "a" : "article";

  return (
    <Reveal
      as={Tag}
      className="rb-featured"
      {...(linked
        ? {
            href: project.url,
            target: "_blank",
            rel: "noreferrer",
            "aria-label": `${project.name} — ${project.linkLabel || "Open the product"}`,
          }
        : {})}
    >
      <div className="rb-featured-figure-col">
        <ProjectFigure project={project} large />
      </div>

      <div className="rb-featured-copy">
        <div className="rb-project-meta-row">
          <span className="rb-project-category">{project.category}</span>
        </div>

        <h3>{project.name}</h3>
        <p className="rb-featured-title">{project.title}</p>
        <p className="rb-featured-description">{project.description}</p>

        <p className="rb-project-stack">{project.tags.join(" · ")}</p>

        <div className="rb-project-foot">
          <span className="rb-project-link">
            {linked ? project.linkLabel || "Open the product" : "Available on request"}
            {linked && <ArrowUpRight size={15} />}
          </span>
          <span className="rb-project-role">{project.role}</span>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, delay, className = "" }) {
  const linked = Boolean(project.url);
  const Tag = linked ? "a" : "article";

  return (
    <Reveal
      as={Tag}
      className={"rb-project " + className}
      delay={delay}
      {...(linked
        ? {
            href: project.url,
            target: "_blank",
            rel: "noreferrer",
            "aria-label": `${project.name} — ${project.linkLabel || "Visit the site"}`,
          }
        : {})}
    >
      <ProjectFigure project={project} />

      <div className="rb-project-copy">
        <div className="rb-project-meta-row">
          <span className="rb-project-category">{project.category}</span>
        </div>

        <h3>{project.name}</h3>
        <p className="rb-project-title">{project.title}</p>
        <p className="rb-project-description">{project.description}</p>

        <div className="rb-project-foot">
          <p className="rb-project-stack">{project.tags.join(" · ")}</p>
          <span className="rb-project-link">
            {linked ? "Visit site" : project.role}
            {linked && <ArrowUpRight size={14} />}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export default function RebrandSite({ onEnterMuseum, museumEntryRef, museumOpen = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState("idle");
  const [formError, setFormError] = useState("");
  const [themeLevel, setThemeLevel] = useThemeLevel();

  const reduced = useReducedMotion();
  useScrollReveal();

  const heroTrackRef = useRef(null);
  const heroProgressRef = useRef(0);
  const processRef = useRef(null);
  const processTrackRef = useRef(null);
  const progressRef = useRef(0);

  const processInView = useInView(processRef, { rootMargin: "200px" });
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
      let progress = 0;

      if (isNarrow) {
        /* Mobile: the object is in normal flow, so the dial lets go from the
           top of the capsule as soon as the page starts moving. */
        progress = Math.min(
          1,
          Math.max(0, window.scrollY / Math.max(window.innerHeight * 0.55, 1))
        );
      } else {
        const distance = Math.max(rect.height - window.innerHeight, 1);
        progress = Math.min(1, Math.max(0, -rect.top / distance));
      }

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

  const handleProgress = useCallback((progress) => {
    progressRef.current = progress;
    const next = Math.min(
      processSteps.length - 1,
      Math.max(0, Math.floor(progress * processSteps.length))
    );
    setActiveStep((current) => (current === next ? current : next));
  }, []);

  useScrollProgress(processTrackRef, handleProgress);

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
                      <span>Startups · SaaS · B2B websites · NGOs &amp; civic systems</span>
                    </div>

                    <h1 id="rb-hero-title" className="rb-hero-title">
                      Product-focused <span className="rb-accent">software engineer.</span>
                    </h1>

                    <p className="rb-hero-lede">
                      I design, build and ship digital products — from the first sketch to a live system.
                    </p>

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
                      Shaping the experience, building the system, and making sure people use it.
                    </p>
                    <a className="rb-text-link" href="#about">
                      More about me <ArrowRight size={15} />
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
                    <span>Made to move</span> Idea → live product
                  </p>
                </div>
              </div>

              <div className="rb-container rb-hero-foot">
                <span>
                  <span className="rb-status-dot" aria-hidden="true" /> Available for select product work
                </span>
                <a href="#work">Scroll to explore <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* In the wild: a plain black band, monochrome marks only. */}
        <section className="rb-logos" aria-labelledby="rb-logos-title">
          <div className="rb-container rb-logos-inner">
            <p id="rb-logos-title" className="rb-logos-label">
              In the wild
            </p>
            <ul className="rb-logos-row">
              {clientLogos.map((item) => (
                <li key={item.name}>
                  <a
                    className="rb-logo-link"
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : "_self"}
                    rel={item.url.startsWith("http") ? "noreferrer" : ""}
                    aria-label={item.name}
                  >
                    {item.logo ? (
                      <img src={item.logo} alt={item.name} loading="lazy" decoding="async" />
                    ) : (
                      <span className={"rb-wordmark is-" + item.variant}>{item.wordmark}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why I build: one compact statement, one compass of sectors. */}
        <section className="rb-section rb-pillars-section" aria-labelledby="rb-pillars-title">
          <div className="rb-container rb-pillars-grid">
            <Reveal className="rb-pillars-copy">
              <h2 id="rb-pillars-title" className="rb-pillars-heading">
                Designed, engineered, and built to be <span className="rb-accent">found.</span>
              </h2>
              <p className="rb-pillars-lead">
                I work across product engineering, interface design and technical SEO. Fewer handoffs,
                faster decisions, and a product that still makes sense after launch.
              </p>
              <ul className="rb-capability-line" aria-label="Capabilities">
                {capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="rb-pillars-interactive" delay={110}>
              <SectorCompass />
            </Reveal>
          </div>
        </section>

        <section id="work" className="rb-section rb-work" aria-labelledby="rb-work-title">
          <div className="rb-container">
            <SectionHead
              title={<>A few things I've <span className="rb-accent">shipped.</span></>}
              aside="Products, platforms and client work — what they do, who they are for, and the part I played."
              id="rb-work-title"
            />

            <FeaturedProject project={projects[0]} />

            <div className="rb-project-grid">
              {projects.slice(1).map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  delay={index * 70}
                  className={"rb-project-" + ["a", "b", "c"][index]}
                />
              ))}
            </div>

            <Reveal className="rb-more">
              <h3>Also built</h3>
              <ul>
                {moreWork.map((item, index) => (
                  <li key={item.name} style={{ "--row": index }}>
                    <span className="rb-more-name">{item.name}</span>
                    <span className="rb-more-type">{item.type}</span>
                    <span className="rb-more-text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="approach" className="rb-section rb-approach" aria-labelledby="rb-approach-title">
          <div className="rb-container">
            <SectionHead
              title={<>How I think about <span className="rb-accent">the work.</span></>}
              aside="Not another framework. A set of decisions about what to build, what to leave out, and how to make the result hold up in real use."
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
                  <div className="rb-principle-main">
                    <h3>{principle.title}</h3>
                    <p>{principle.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="rb-section rb-process" aria-labelledby="rb-process-title">
          <div className="rb-container">
            <SectionHead
              title={<>From a rough idea to <span className="rb-accent">working software.</span></>}
              aside="The loop is simple. The decisions are not. Scroll through what each stage actually involves."
              id="rb-process-title"
            />
          </div>

          <div className="rb-container rb-process-grid">
            <div className="rb-process-stage-col">
              <div className="rb-process-stage" ref={processRef}>
                <div className="rb-process-canvas">
                  {processInView ? (
                    <Suspense fallback={<ScenePlaceholder process />}>
                      <ProcessScene
                        progressRef={progressRef}
                        active={processInView}
                        reduced={reduced}
                        dark={themeIsDark}
                      />
                    </Suspense>
                  ) : (
                    <ScenePlaceholder process />
                  )}
                </div>
                <div className="rb-process-caption">
                  <p>{processSteps[activeStep].short}</p>
                </div>
              </div>
            </div>

            <div className="rb-process-steps" ref={processTrackRef}>
              {processSteps.map((step, index) => (
                <article
                  className={
                    "rb-process-step" +
                    (index < activeStep ? " is-done" : "") +
                    (index === activeStep ? " is-current" : "")
                  }
                  key={step.number}
                >
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="rb-section rb-about" aria-labelledby="rb-about-title">
          <div className="rb-container rb-about-grid">
            <div className="rb-about-body">
              <Reveal>
                <h2 id="rb-about-title">
                  Engineer by training. <span className="rb-accent">Product person</span> by instinct.
                </h2>
                <div className="rb-about-copy">
                  <p>
                    I'm Awesome, a software engineer from Nigeria. I take ideas that are still
                    messy, unclear or sitting in someone's head and turn them into products people
                    can actually use.
                  </p>
                  <p>
                    I studied Computer Science at Coal City University and now work across product,
                    design and engineering — often for teams that need one person to hold the whole
                    thing together.
                  </p>
                </div>
              </Reveal>

              <Reveal className="rb-about-signature" delay={60}>
                <BrandMark size={40} standalone />
                <div>
                  <p className="rb-about-name">Awesome Akokayo</p>
                  <p className="rb-about-role">Product-focused software engineer</p>
                </div>
                <span className="rb-about-available">
                  <i aria-hidden="true" />
                  Available for select work
                </span>
              </Reveal>
            </div>

            <Reveal className="rb-toolkit" delay={90}>
              <div className="rb-toolkit-grid">
                {toolkit.map((group) => (
                  <div key={group.label}>
                    <h3>{group.label}</h3>
                    <p>{group.items}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="rb-contact" aria-labelledby="rb-contact-title">
          <div className="rb-container">
            <Reveal className="rb-contact-head">
              <h2 id="rb-contact-title">Have something worth <span className="rb-accent">building?</span></h2>
              <p>
                It does not need to be fully figured out. Bring the problem, the idea, or the
                rough sketch. We can work out the product from there.
              </p>
            </Reveal>

            <div className="rb-contact-grid">
              <Reveal className="rb-contact-main" delay={60}>
                <a className="rb-mail" href={`mailto:${EMAIL}`}>
                  <span className="rb-label">Email</span>
                  <strong>{EMAIL}</strong>
                  <ArrowUpRight size={22} />
                </a>
                <div className="rb-contact-buttons">
                  <a className="rb-button rb-button-primary" href={`mailto:${EMAIL}`}>
                    Start the conversation <ArrowRight size={16} />
                  </a>
                  <button type="button" className="rb-button rb-button-ghost" onClick={copyEmail}>
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "Copied" : "Copy email"}
                  </button>
                  <a
                    className="rb-button rb-button-ghost"
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp <ArrowUpRight size={15} />
                  </a>
                </div>
              </Reveal>

              <Reveal className="rb-contact-side" delay={120}>
                <ul>
                  {contactLinks.map(([label, note, href]) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer">
                        <span>{label}</span>
                        <small>{note}</small>
                        <ArrowUpRight size={15} />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="rb-reply-note">Usually replies within 1–2 working days.</p>
              </Reveal>
            </div>

            <Reveal className="rb-brief" delay={80}>
              <details>
                <summary>
                  <span>Prefer a project brief?</span>
                  <span className="rb-brief-action">Open the form <ArrowDown size={15} /></span>
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
                    <label>
                      <span>Budget</span>
                      <select required name="budget" defaultValue="">
                        <option value="">Choose a range</option>
                        {budgetOptions.map((option) => <option key={option}>{option}</option>)}
                      </select>
                    </label>
                  </div>
                  <label className="rb-form-brief">
                    <span>What are you trying to build?</span>
                    <textarea
                      required
                      name="brief"
                      rows="5"
                      placeholder="The problem, who it is for, and what you need it to do."
                    />
                  </label>
                  <div className="rb-form-foot">
                    <button
                      className="rb-button rb-button-primary"
                      type="submit"
                      disabled={formState === "sending" || formState === "sent"}
                    >
                      {formState === "sending"
                        ? "Sending…"
                        : formState === "sent"
                          ? "Enquiry sent"
                          : "Send project enquiry"}
                      <ArrowRight size={16} />
                    </button>
                    <p className={"rb-form-status" + (formState === "error" ? " is-error" : "")} aria-live="polite">
                      {formState === "sent"
                        ? "Thanks. Your enquiry has been sent."
                        : formState === "error"
                          ? formError
                          : ""}
                    </p>
                  </div>
                </form>
              </details>
            </Reveal>

            <div className="rb-availability">
              <span className="rb-status-dot" aria-hidden="true" />
              Available for select product and engineering work · Remote
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
            <p>Building digital products beyond the code.</p>
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
          <span>Built in Nigeria · Shipping worldwide</span>
          <a href="#top">Back to the top ↑</a>
        </div>
      </footer>
    </div>
  );
}
