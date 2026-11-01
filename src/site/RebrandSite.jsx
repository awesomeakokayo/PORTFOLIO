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
  useTilt,
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
    text: "The first job is to understand what should change for the person using the product. The stack comes after that, not before it.",
    tag: "Discovery",
  },
  {
    number: "02",
    title: "Design is part of engineering.",
    text: "A feature is not finished when it runs. It is finished when someone can use it without being taught, and trust it with something real.",
    tag: "Experience",
  },
  {
    number: "03",
    title: "Ship, then learn.",
    text: "Working software in front of real people beats a perfect plan in a document. What happens after launch decides what gets built next.",
    tag: "Delivery",
  },
  {
    number: "04",
    title: "AI with judgement.",
    text: "AI is leverage, not a personality. I use it where it removes real work, and keep the product decisions and accountability with the builder.",
    tag: "Leverage",
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

const aboutFacts = [
  ["2026", "B.Sc. Computer Science, Coal City University"],
  ["2025", "Presented original research at Springer ETMiS"],
  ["2024", "Former Vice President II, NACOS"],
  ["Now", "Founder & builder — OpenBooks, TechSkillHub, NaviPro"],
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
    name: "Elroi Hub",
    url: "https://www.elroihubllc.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="rb-monomark-svg">
        <circle cx="12" cy="12" r="10" />
        <polygon points="12 8 8 12 12 16 16 12 12 8" />
      </svg>
    ),
  },
  {
    name: "NaviPro",
    url: "#work",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="rb-monomark-svg">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    name: "CCU Journal",
    url: "#work",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="rb-monomark-svg">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    name: "Blancquake",
    url: "#work",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="rb-monomark-svg">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

const focusPillars = [
  {
    id: "saas",
    name: "SaaS",
    desc: "Self-serve platforms, recurring workflows, billing & complex dashboard UX",
    accent: "#8ae2a8",
    bgClass: "rb-pillar-green",
  },
  {
    id: "startup",
    name: "Startups",
    desc: "Rapid 0-to-1 MVP architecture, clickable prototypes & investor-ready launches",
    accent: "#f6df69",
    bgClass: "rb-pillar-yellow",
  },
  {
    id: "agencies",
    name: "Agencies & B2B",
    desc: "High-conversion web platforms, bespoke client systems & scalable REST APIs",
    accent: "#7c8cf6",
    bgClass: "rb-pillar-blue",
  },
  {
    id: "civic",
    name: "Civic & NGOs",
    desc: "Mission-driven products, accessible interfaces, reporting & community advocacy",
    accent: "#f8a3d6",
    bgClass: "rb-pillar-pink",
  },
];

const capabilityPills = [
  "Product Strategy",
  "Full-Stack Dev",
  "AI & LLM APIs",
  "Design Systems",
  "SEO & Performance",
  "Conversion UX",
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
        <div className="rb-featured-role-pill">
          <span>{project.role}</span>
        </div>
      </div>

      <div className="rb-featured-title-wrap">
        <h3>{project.name}</h3>
        <p className="rb-featured-title">{project.title}</p>
        <p className="rb-featured-description">{project.description}</p>
      </div>

      {/* Interactive Live Frame Centerpiece */}
      <InteractiveLiveFrame project={project} large />

      <div className="rb-featured-bottom">
        <ul className="rb-tags" aria-label="Product stack">
          {project.tags.map((tag) => (
            <li key={tag} className="rb-tag-chip">{tag}</li>
          ))}
        </ul>

        <div className="rb-featured-actions">
          {project.url ? (
            <a className="rb-liveframe-btn" href={project.url} target="_blank" rel="noreferrer">
              <span>{project.linkLabel || "Open the product"}</span>
              <ArrowUpRight size={15} />
            </a>
          ) : (
            <span className="rb-muted-note">Available on request</span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, delay }) {
  return (
    <Reveal as="article" className="rb-project-liveframe" delay={delay}>
      <div className="rb-card-head">
        <div className="rb-project-kicker">
          <span className="rb-project-category">{project.category}</span>
          {project.url && <LiveBadge />}
        </div>
        <span className="rb-card-role">{project.role}</span>
      </div>

      <div className="rb-card-title-wrap">
        <h3>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="rb-project-title">{project.title}</p>
      </div>

      {/* Interactive Live Frame */}
      <InteractiveLiveFrame project={project} />

      <p className="rb-project-description">{project.description}</p>

      <div className="rb-card-bottom">
        <ul className="rb-tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag} className="rb-tag-chip">{tag}</li>
          ))}
        </ul>

        {project.url && (
          <a
            className="rb-card-action-btn"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.linkLabel || "Open"}: ${project.name}`}
          >
            <span>Live demo</span>
            <ArrowUpRight size={14} />
          </a>
        )}
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
                      <span>SaaS · Startups · B2B Platforms · Civic Systems</span>
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
                    <span>The round trip</span> Idea → shipped
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

        {/* IN THE WILD: Theme-aware liquid-glass strip for the products built and shipped */}
        <section className="rb-logos" aria-labelledby="rb-logos-title">
          <div className="rb-container">
            <Reveal className="rb-logos-capsule-dark">
              <div className="rb-logos-capsule-head">
                <span className="rb-capsule-dot" aria-hidden="true" />
                <span id="rb-logos-title" className="rb-capsule-title">In the wild</span>
                <span className="rb-capsule-divider" aria-hidden="true">/</span>
                <span className="rb-capsule-sub">Products built, shipped & deployed</span>
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

        {/* PILLARS OF PRACTICE (Image 2 style): Slanted colorful pill tracks with interactive dark buttons */}
        <section className="rb-section rb-pillars-section" aria-labelledby="rb-pillars-title">
          <div className="rb-container rb-pillars-grid">
            <Reveal className="rb-pillars-copy">
              <p className="rb-eyebrow">
                <span className="rb-status-dot" aria-hidden="true" />
                <span>Why & how I build</span>
              </p>
              <h2 id="rb-pillars-title" className="rb-pillars-heading">
                Engineering in service of <span className="rb-accent">real outcomes.</span>
              </h2>
              <p className="rb-pillars-lead">
                I partner with founders and forward-thinking teams to turn ambiguous ideas into resilient, production-grade software. The goal is never code for its own sake—it is clarity for the user, stability under load, and measurable traction for the business.
              </p>
              
              <div className="rb-pillars-tags-wrap">
                <p className="rb-pillars-tags-label">Core capabilities & focus:</p>
                <ul className="rb-pillars-tags">
                  {capabilityPills.map((tag) => (
                    <li key={tag} className="rb-tag-pill">{tag}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="rb-pillars-interactive" delay={120}>
              <div className="rb-slanted-track-row">
                {focusPillars.map((pillar) => (
                  <div key={pillar.id} className="rb-slanted-column">
                    <div className={`rb-slanted-capsule ${pillar.bgClass}`}>
                      <span className="rb-slanted-capsule-glare" aria-hidden="true" />
                      <div className="rb-slanted-capsule-button">
                        <ArrowUpRight size={22} strokeWidth={2.4} />
                      </div>
                    </div>
                    <div className="rb-slanted-label">
                      <strong>{pillar.name}</strong>
                      <p>{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="work" className="rb-section rb-work" aria-labelledby="rb-work-title">
          <div className="rb-container">
            <SectionHead
              label="Selected work"
              title={<>The work is the <span className="rb-accent">proof.</span></>}
              aside="A small sample of products and systems — what they do, who they are for, and the part I played."
              id="rb-work-title"
            />

            <FeaturedProject project={projects[0]} />

            <div className="rb-project-grid">
              {projects.slice(1).map((project, index) => (
                <ProjectCard key={project.name} project={project} delay={index * 70} />
              ))}
            </div>

            <Reveal className="rb-more">
              <p className="rb-label">Also built & explored</p>
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
              label="How I work"
              title={<>Product thinking. <span className="rb-accent">Engineering discipline.</span></>}
              aside="The difference is not another framework. It is knowing what to build, what not to build, and how to make the result hold up in real use."
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
                  <span className="rb-principle-tag">{principle.tag}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="rb-section rb-process" aria-labelledby="rb-process-title">
          <div className="rb-container">
            <SectionHead
              label="The build loop"
              title={<>From an unclear idea to <span className="rb-accent">working software.</span></>}
              aside="Scroll through the loop. The object does what the work does: separate pieces become one product."
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
                <div className="rb-process-overlay" aria-hidden="true">
                  <span className="rb-label">Fig. 02 — The build</span>
                  <span className="rb-process-count">
                    {String(activeStep + 1).padStart(2, "0")} / 04
                  </span>
                </div>
                <div className="rb-process-caption">
                  <span className="rb-process-caption-index" aria-hidden="true">
                    {processSteps[activeStep].number}
                  </span>
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
                  <span className="rb-process-step-number">{step.number}</span>
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
            <div className="rb-about-side">
              <Eyebrow index="04">About</Eyebrow>
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
                <h2 id="rb-about-title">
                  Engineer by training. <span className="rb-accent">Product person</span> by instinct.
                </h2>
                <div className="rb-about-copy">
                  <p>
                    I'm Awesome, a software engineer from Nigeria. I enjoy taking ideas that are
                    still messy, unclear or sitting in someone's head and turning them into
                    products people can actually use.
                  </p>
                  <p>
                    I studied Computer Science at Coal City University, presented original
                    research at Springer ETMiS 2025, and have led a cross-functional team building
                    an AI career platform. I care about what gets built, not just what gets coded.
                  </p>
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

              <Reveal className="rb-toolkit" delay={80}>
                <p className="rb-label">Toolkit</p>
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
          </div>
        </section>

        <section id="contact" className="rb-contact" aria-labelledby="rb-contact-title">
          <div className="rb-container">
            <Reveal className="rb-contact-head">
              <Eyebrow index="05">Contact</Eyebrow>
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
