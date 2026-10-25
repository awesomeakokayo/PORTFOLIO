import React, { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./ProductFoundry.css";

const projects = [
  {
    number: "01",
    name: "OpenBooks",
    type: "Business product",
    status: "Live product",
    role: "Product engineering",
    image: "/projects/openbooks-cover.webp",
    imageAlt: "OpenBooks business cashbook interface",
    imageMode: "cover",
    summary: "A Nigeria-first cashbook for invoices, payments, expenses and customer records.",
    tags: ["Business tools", "Money tracking", "Records"],
    url: "https://www.openbooks.click",
    linkLabel: "Open the product",
    buildNote: "The goal is to make everyday business records easier to keep without burying simple tasks inside heavyweight accounting software. The product centres on clear transaction history and straightforward money-in and money-out workflows."
  },
  {
    number: "02",
    name: "TechSkillHub",
    type: "Learning platform",
    status: "Live product",
    role: "Founder · Full-stack",
    image: "/projects/tech-skill-hub.webp",
    imageAlt: "TechSkillHub learning platform interface",
    imageMode: "cover",
    summary: "A learning academy that gives beginners structured tracks, practical roadmaps and a clearer way to make progress.",
    tags: ["Next.js", "PostgreSQL", "Learning systems"],
    url: "https://techskillhub.cv",
    linkLabel: "Visit the platform",
    buildNote: "The product responds to a familiar problem: beginners can find endless resources online but struggle to understand what to learn next. The experience organises learning around guided tracks, practical projects and saved progress."
  },
  {
    number: "03",
    name: "Southwest Flood Monitor",
    type: "Civic technology",
    status: "Built project",
    role: "Mobile + backend",
    image: "/projects/flood-monitor.webp",
    imageAlt: "Southwest Flood Monitor mobile reporting interface",
    imageMode: "contain",
    summary: "A mobile reporting experience for community flood incidents, supported by AI-assisted image analysis and a structured backend.",
    tags: ["React Native", "FastAPI", "AI-assisted reports"],
    url: "https://github.com/awesomeakokayo/Flood-Report-App",
    linkLabel: "Explore the code",
    buildNote: "This project connects a field reporting flow with a structured API and data layer. AI-assisted image analysis supports the report experience; it is one part of the workflow, not a substitute for clear reporting and review."
  },
  {
    number: "04",
    name: "Elroi Hub",
    type: "Client website",
    status: "Live website",
    role: "Frontend development",
    image: "/projects/elroi-hub.webp",
    imageAlt: "Elroi Hub agency website",
    imageMode: "cover",
    summary: "A brand-led agency website that brings services, proof and a clear path to enquire into one composed experience.",
    tags: ["Responsive UI", "Brand systems", "Web"],
    url: "https://www.elroihubllc.com/",
    linkLabel: "Visit the website",
    buildNote: "The focus here is translating a brand into a useful web experience. Clear service structure, considered visual hierarchy and an easy route to enquiry matter as much as the visual treatment."
  }
];

const steps = [
  {
    number: "01",
    label: "Find the real problem",
    caption: "Understand the person before choosing the technology.",
    title: "Start with the friction.",
    detail: "Clarify who the product serves, what is getting in their way, and what a useful outcome should look like. The first job is not to add features. It is to understand what deserves to be built.",
    flow: 0
  },
  {
    number: "02",
    label: "Shape the experience",
    caption: "Give the idea a structure people can understand.",
    title: "Make the path make sense.",
    detail: "Turn the problem into a coherent experience, the right data model and a realistic build plan. Good structure makes the product easier to use today and easier to change tomorrow.",
    flow: 1
  },
  {
    number: "03",
    label: "Engineer the system",
    caption: "Connect interface, data and behaviour.",
    title: "Make the pieces work together.",
    detail: "Build the interface, APIs, data layer and integrations as one product. Use AI where it genuinely helps, then keep testing, judgement and ownership with the engineer.",
    flow: 2
  },
  {
    number: "04",
    label: "Validate and ship",
    caption: "Test the real journeys, then get it into people's hands.",
    title: "A build is not done at the first demo.",
    detail: "Exercise important user flows, handle awkward states, improve accessibility and performance, and deploy deliberately. The final measure is whether the product works for the people it was made for.",
    flow: 3
  }
];

function Arrow({ diagonal = false, size = 16 }) {
  return diagonal ? (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FoundryArtifact() {
  const [assembled, setAssembled] = useState(false);
  const artifactRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!artifactRef.current || event.pointerType === "touch") return;
    const rect = artifactRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 42;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 42;
    const layers = {
      "--pf-pointer-x": x,
      "--pf-pointer-y": y,
      "--pf-device-x": x * 0.09,
      "--pf-device-y": y * 0.07,
      "--pf-orange-x": x * -0.12,
      "--pf-orange-y": y * -0.08,
      "--pf-cream-x": x * 0.06,
      "--pf-cream-y": y * -0.11,
      "--pf-blue-x": x * -0.07,
      "--pf-blue-y": y * 0.1,
      "--pf-mint-x": x * 0.12,
      "--pf-mint-y": y * 0.1,
      "--pf-yellow-x": x * -0.15,
      "--pf-yellow-y": y * -0.07,
      "--pf-cube-x": x * 0.07,
      "--pf-cube-y": y * -0.11
    };
    Object.entries(layers).forEach(([name, value]) => {
      artifactRef.current.style.setProperty(name, value.toFixed(1) + "px");
    });
  };

  const resetPointer = () => {
    if (!artifactRef.current) return;
    [
      "--pf-pointer-x", "--pf-pointer-y", "--pf-device-x", "--pf-device-y",
      "--pf-orange-x", "--pf-orange-y", "--pf-cream-x", "--pf-cream-y",
      "--pf-blue-x", "--pf-blue-y", "--pf-mint-x", "--pf-mint-y",
      "--pf-yellow-x", "--pf-yellow-y", "--pf-cube-x", "--pf-cube-y"
    ].forEach((name) => artifactRef.current.style.setProperty(name, "0px"));
  };

  return (
    <div className="pf-artifact-wrap">
      <div
        ref={artifactRef}
        className="pf-artifact"
        data-assembled={assembled ? "true" : "false"}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        aria-label="Interactive illustration of an idea assembling into a digital product"
      >
        <div className="pf-artifact-head pf-mono">
          <span>Field study / 001</span>
          <span>Idea to reality</span>
        </div>

        <div className="pf-scene" aria-hidden="true">
          <div className="pf-scene-grid" />
          <svg className="pf-connector-layer" viewBox="0 0 700 500" preserveAspectRatio="none">
            <path d="M140 110 C210 135 225 175 280 195" />
            <path d="M505 76 C460 125 438 148 426 190" />
            <path d="M175 390 C235 354 245 322 300 300" />
            <path d="M570 354 C520 330 498 303 460 290" />
            <path d="M350 65 C355 110 362 128 361 166" />
            <circle cx="140" cy="110" r="4" />
            <circle cx="505" cy="76" r="4" />
            <circle cx="175" cy="390" r="4" />
            <circle cx="570" cy="354" r="4" />
          </svg>

          <div className="pf-object pf-orb pf-orb-mint" />
          <div className="pf-object pf-orb pf-orb-yellow" />
          <div className="pf-object pf-cube" />

          <div className="pf-object pf-float-panel pf-panel-orange">
            <small>01 / INPUT</small>
            <strong>An idea.</strong>
            <div className="pf-panel-bars"><i /><i /><i /></div>
          </div>

          <div className="pf-object pf-float-panel pf-panel-cream">
            <small>02 / SYSTEM</small>
            <strong>Make it useful.</strong>
            <div className="pf-panel-bars"><i /><i /><i /></div>
          </div>

          <div className="pf-object pf-float-panel pf-panel-blue">
            <small>03 / OUTPUT</small>
            <strong>Real people.</strong>
          </div>

          <div className="pf-object pf-core-device">
            <div className="pf-device-top pf-mono">
              <span>PRODUCT / 01</span>
              <span className="pf-device-lights"><i /><i /><i /></span>
            </div>
            <div className="pf-device-screen">
              <div className="pf-device-welcome">
                <strong>Good work,<br />made useful.</strong>
                <span className="pf-device-avatar">A.</span>
              </div>
              <div className="pf-device-subtitle" />
              <div className="pf-device-metrics">
                <div className="pf-device-metric"><span /><strong>01</strong></div>
                <div className="pf-device-metric"><span /><strong>02</strong></div>
                <div className="pf-device-metric"><span /><strong>03</strong></div>
              </div>
              <div className="pf-device-chart">
                <svg viewBox="0 0 220 52" preserveAspectRatio="none">
                  <path d="M0 44 C18 42 25 25 44 30 S72 44 91 23 S118 18 137 24 S166 10 185 15 S207 7 220 4" />
                  <circle cx="185" cy="15" r="3" />
                </svg>
              </div>
              <div className="pf-device-row"><i /><span /><b /></div>
              <div className="pf-device-row"><i /><span /><b /></div>
            </div>
          </div>

          <div className="pf-object-tag pf-tag-idea">IDEA / 01</div>
          <div className="pf-object-tag pf-tag-system">SYSTEM / 02</div>
          <div className="pf-object-tag pf-tag-output">SHIP / 03</div>
        </div>

        <div className="pf-artifact-foot pf-mono">
          <div>
            <span>Current state</span>
            <strong>{assembled ? "SYSTEM ASSEMBLED" : "FRAGMENTS IN MOTION"}</strong>
          </div>
          <button type="button" onClick={() => setAssembled((value) => !value)} aria-pressed={assembled}>
            {assembled ? "Reset the scene" : "Assemble the idea"} <Arrow diagonal={false} size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectFallback() {
  return (
    <div className="pf-project-fallback" aria-hidden="true">
      <svg viewBox="0 0 520 420" fill="none">
        <rect x="82" y="59" width="354" height="292" stroke="#171815" strokeWidth="2" />
        <rect x="103" y="81" width="312" height="45" fill="#171815" />
        <circle cx="125" cy="103" r="4" fill="#FF6038" />
        <circle cx="139" cy="103" r="4" fill="#9ED9C4" />
        <path d="M108 158h153M108 173h105" stroke="#171815" strokeWidth="5" strokeLinecap="round" />
        <rect x="108" y="196" width="118" height="92" fill="#FF6038" />
        <rect x="242" y="196" width="83" height="92" fill="#9ED9C4" />
        <rect x="341" y="196" width="74" height="92" fill="#4B66DC" />
        <path d="M108 311h226" stroke="#171815" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function PortfolioWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const project = projects[activeIndex];

  const chooseProject = (index) => {
    setActiveIndex(index);
    setNotesOpen(false);
  };

  return (
    <section id="work" className="pf-section pf-work-section">
      <div className="pf-wrap">
        <div className="pf-section-head">
          <div>
            <p className="pf-eyebrow">01 / Selected work</p>
            <h2 className="pf-section-title">Things I’ve brought <span className="pf-heading-numeral">into the world.</span></h2>
          </div>
          <p className="pf-section-copy">A few products and systems, each built around a real problem rather than a stack of features.</p>
        </div>

        <div className="pf-project-stage">
          <div className="pf-project-visual">
            <div className="pf-project-stamp pf-mono"><span>{project.number}</span> / SPECIMEN</div>
            <div className="pf-project-image-frame" key={project.name}>
              {project.image ? (
                <img
                  className={project.imageMode === "contain" ? "pf-contain" : "pf-screenshot"}
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              ) : <ProjectFallback />}
            </div>
            <div className="pf-project-corner" aria-hidden="true"><Arrow diagonal size={17} /></div>
          </div>

          <div className="pf-project-info" aria-live="polite">
            <div className="pf-project-info-top pf-mono">
              <span>{project.type}</span>
              <span className="pf-project-status">{project.status}</span>
            </div>
            <div>
              <p className="pf-project-role">{project.role}</p>
              <h3 className="pf-project-title">{project.name}<span className="pf-heading-numeral">.</span></h3>
              <p className="pf-project-summary">{project.summary}</p>
              <div className="pf-project-tags" aria-label="Project technologies and areas">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="pf-project-actions">
                <a className="pf-button pf-button-primary" href={project.url} target="_blank" rel="noreferrer">
                  {project.linkLabel} <Arrow diagonal size={15} />
                </a>
                <button
                  type="button"
                  className="pf-text-button"
                  aria-expanded={notesOpen}
                  onClick={() => setNotesOpen((value) => !value)}
                >
                  {notesOpen ? "Close build notes" : "Inside the build"} <Arrow size={15} />
                </button>
              </div>
              <div className={"pf-project-notes" + (notesOpen ? " is-open" : "")} aria-hidden={!notesOpen}>
                <div className="pf-project-notes-inner">
                  <p><strong>Design intent.</strong> {project.buildNote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pf-project-switcher" aria-label="Choose a project to inspect">
          {projects.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className="pf-project-switch"
              aria-pressed={activeIndex === index}
              onClick={() => chooseProject(index)}
            >
              <span className="pf-project-switch-num">{item.number}</span>
              <span className="pf-project-switch-name">{item.name}<small>{item.type}</small></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildMethod() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];
  const flows = ["Problem", "Experience", "System", "Release"];

  return (
    <section id="method" className="pf-section pf-method-section">
      <div className="pf-wrap pf-method-layout">
        <div className="pf-method-intro">
          <p className="pf-eyebrow">02 / Under the surface</p>
          <h2 className="pf-section-title">Beautiful is good. <span className="pf-heading-numeral">Working is better.</span></h2>
          <p>The interface is only the part people see. The real craft is making the experience, system and decisions work together.</p>
        </div>

        <div>
          <div className="pf-method-steps" role="group" aria-label="Explore my product engineering process">
            {steps.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className="pf-method-step"
                aria-pressed={activeStep === index}
                onClick={() => setActiveStep(index)}
              >
                <span className="pf-method-step-num">{item.number}</span>
                <span className="pf-method-step-label">{item.label}<span className="pf-method-step-caption">{item.caption}</span></span>
                <span className="pf-method-step-arrow" aria-hidden="true"><Arrow size={15} /></span>
              </button>
            ))}
          </div>

          <div className="pf-method-output" aria-live="polite">
            <div className="pf-method-output-top"><span>Build notes / {step.number}</span><span>Principle in practice</span></div>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
            <div className="pf-flow-visual" aria-label={"Process stage: " + step.label}>
              {flows.map((flow, index) => (
                <React.Fragment key={flow}>
                  <div className={"pf-flow-block" + (index === step.flow ? " is-current" : "")}>{flow}</div>
                  {index < flows.length - 1 && <span className="pf-flow-connector" aria-hidden="true" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="pf-about-section">
      <div className="pf-wrap pf-about-grid">
        <div className="pf-about-aside">
          <div className="pf-about-portrait" aria-label="Abstract monogram representing Awesome Akokayo">
            <span className="pf-portrait-mark" aria-hidden="true">A.</span>
          </div>
          <div className="pf-about-education">
            AWESOME AKOKAYO<br />
            B.Sc. COMPUTER SCIENCE<br />
            COAL CITY UNIVERSITY · 2026<br />
            NIGERIA / AVAILABLE REMOTELY
          </div>
        </div>

        <div className="pf-about-copy">
          <p className="pf-eyebrow">03 / The person behind the build</p>
          <h2 className="pf-section-title">Curious by nature. <span className="pf-heading-numeral">Responsible by design.</span></h2>
          <p className="pf-about-lead">I like taking a complicated, unclear problem and turning it into software that feels straightforward to use.</p>
          <div className="pf-about-body">
            <p>I work across product thinking, frontend, backend and delivery. I care about the details people notice and the quieter engineering decisions that make a product reliable.</p>
            <p>AI is part of my toolkit, not a substitute for engineering judgement. The goal is not to generate more software. It is to make something useful, understandable and built to hold up.</p>
          </div>
          <div className="pf-about-callout">
            <span aria-hidden="true">↗</span>
            <p>Good software should feel obvious to the person using it, even when a lot of careful thinking went into making it that way.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductFoundry() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="pf-shell" id="top">
      <a className="pf-skip-link" href="#pf-main">Skip to content</a>
      <header className="pf-header">
        <div className="pf-wrap pf-nav">
          <a className="pf-brand" href="#top" aria-label="Awesome Akokayo, home">
            <span className="pf-brand-mark" aria-hidden="true">A.</span>
            <span>Awesome Akokayo<span className="pf-brand-sub">PRODUCT THINKING / SOFTWARE</span></span>
          </a>
          <nav className="pf-nav-links" aria-label="Main navigation">
            <a href="#work">Selected work</a>
            <a href="#method">How I build</a>
            <a href="#about">About</a>
          </nav>
          <a className="pf-nav-cta" href="#contact">Let’s talk <Arrow diagonal size={14} /></a>
          <button
            type="button"
            className="pf-menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="pf-mobile-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="pf-menu-lines" aria-hidden="true" />
          </button>
        </div>
        {menuOpen && (
          <nav id="pf-mobile-nav" className="pf-mobile-nav" aria-label="Mobile navigation">
            <a href="#work" onClick={closeMenu}>Selected work <Arrow diagonal size={14} /></a>
            <a href="#method" onClick={closeMenu}>How I build <Arrow diagonal size={14} /></a>
            <a href="#about" onClick={closeMenu}>About <Arrow diagonal size={14} /></a>
            <a href="#contact" onClick={closeMenu}>Start a conversation <Arrow diagonal size={14} /></a>
          </nav>
        )}
      </header>

      <main id="pf-main">
        <section className="pf-hero">
          <div className="pf-wrap pf-hero-grid">
            <div className="pf-hero-copy pf-reveal">
              <p className="pf-eyebrow pf-kicker">Full-stack engineer / Product builder</p>
              <h1><span>Ideas don’t</span><span className="pf-title-accent">ship themselves.</span></h1>
              <p className="pf-hero-summary">I design and engineer web, mobile and AI-enabled products that turn real problems into useful software.</p>
              <div className="pf-hero-actions">
                <a className="pf-button pf-button-primary" href="#work">Explore the work <Arrow size={16} /></a>
                <a className="pf-button" href="#contact">Start a conversation <Arrow diagonal size={15} /></a>
              </div>
              <div className="pf-hero-meta pf-mono">
                <span><i className="pf-status-dot" />Based in Nigeria</span>
                <span>Working remotely</span>
                <span>Web · Mobile · Systems</span>
              </div>
              <p className="pf-hero-note"><span /> Drag your curiosity around. Tap to bring the pieces together.</p>
            </div>
            <FoundryArtifact />
          </div>

          <div className="pf-wrap pf-scroll-strip pf-mono" aria-label="Areas of work">
            <span>Product thinking</span>
            <span>Systems that scale</span>
            <span>Interfaces with intent</span>
            <span>Thoughtful delivery</span>
          </div>
        </section>

        <PortfolioWork />
        <BuildMethod />
        <AboutSection />

        <section id="contact" className="pf-section pf-contact-section">
          <div className="pf-wrap pf-contact-layout">
            <div>
              <p className="pf-eyebrow">04 / Your turn</p>
              <h2 className="pf-contact-title">Have a good problem?</h2>
              <a className="pf-contact-email" href="mailto:awesomeakokayo@gmail.com"><span>Let’s turn it into something real.</span><Arrow diagonal size={15} /></a>
            </div>
            <div>
              <p className="pf-contact-copy">Tell me what you’re trying to build, what is getting in the way, or what you think could be better. We can start there.</p>
              <div className="pf-contact-links">
                <a className="pf-contact-link" href="mailto:awesomeakokayo@gmail.com"><span>Email me</span><Arrow diagonal size={16} /></a>
                <a className="pf-contact-link" href="https://www.linkedin.com/in/awesomeakokayo/" target="_blank" rel="noreferrer"><span>Connect on LinkedIn</span><Arrow diagonal size={16} /></a>
                <a className="pf-contact-link" href="https://github.com/awesomeakokayo" target="_blank" rel="noreferrer"><span>Explore my GitHub</span><Arrow diagonal size={16} /></a>
                <a className="pf-contact-link" href="https://wa.me/2349020372640?text=Hi%20Awesome%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noreferrer"><span>Message on WhatsApp</span><Arrow diagonal size={16} /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-wrap pf-footer pf-mono">
        <p>© {new Date().getFullYear()} Awesome Akokayo</p>
        <p>Made with intention. Built to be useful.</p>
        <a href="#top">Back to the beginning ↑</a>
      </footer>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
