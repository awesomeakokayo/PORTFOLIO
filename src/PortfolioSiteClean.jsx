import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase.jsx";
import { HeroBuildScene } from "./BlockWorld.jsx";
import PricingPlayground from "./PricingPlayground.jsx";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };

const experience = [
  {
    role: "Lead Full-Stack Engineer",
    company: "NaviPro",
    meta: "AI career platform · 2025 — Present",
    detail: "Led a five-person cross-functional team and architected FastAPI services for personalised roadmaps, mentorship and resource discovery.",
    stack: "FastAPI · React · LLM APIs · YouTube Data API",
  },
  {
    role: "Founder & Full-Stack Engineer",
    company: "TechSkillHub",
    meta: "EdTech product · 2025 — Present",
    detail: "Built a learning platform with structured tracks, authentication, saved progress, content delivery and guided learning flows.",
    stack: "Next.js · Prisma · PostgreSQL · Auth.js",
  },
  {
    role: "Mobile Application Engineer",
    company: "Independent product development",
    meta: "Mobile + civic technology · 2025 — Present",
    detail: "Built a flood-reporting experience that combines community reports with AI-assisted image analysis and a structured backend.",
    stack: "React Native · FastAPI · PostgreSQL · Gemini",
  },
  {
    role: "Full-Stack Developer",
    company: "Academic journal platform",
    meta: "Academic project · 2025",
    detail: "Delivered manuscript submission, editorial review and publication workflows, from data model and API to responsive interface.",
    stack: "FastAPI · PostgreSQL · JavaScript",
  },
];

const toolkit = [
  { label: "Languages & frontend", items: "TypeScript, JavaScript, Python, React, Next.js, React Native, Expo, Tailwind CSS" },
  { label: "Backend & data", items: "FastAPI, Node.js, REST APIs, PostgreSQL, Prisma, Redis, Firebase" },
  { label: "AI & integrations", items: "LLM APIs, structured generation, retrieval workflows, Paystack, OAuth, YouTube Data API" },
  { label: "Cloud & delivery", items: "Git, GitHub, Docker, CI/CD, Vercel, Render, Netlify" },
];

const contactBudgetOptions = ["Below ₦500k", "₦500k – ₦1m", "₦1m – ₦2m", "₦2m+"];

function Eyebrow({ children, light = false }) {
  return <p className={"eyebrow" + (light ? " eyebrow-light" : "")} style={mono}>{children}</p>;
}

function Nav({ open, setOpen }) {
  const links = [["Work", "#work"], ["Experience", "#experience"], ["About", "#about"], ["Contact", "#contact"]];

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [setOpen]);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <a href="#top" className="wordmark" aria-label="Awesome Akokayo, home">
          <span className="wordmark-mark" aria-hidden="true">A</span>
          <span>Awesome Akokayo</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation" style={mono}>
          {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <a href="#contact" className="nav-cta" style={mono}>Let’s talk <ArrowUpRight size={15} /></a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav-panel" className="mobile-nav" aria-label="Mobile navigation" style={mono}>
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={15} /></a>)}
          <a href="#contact" className="mobile-nav-cta" onClick={() => setOpen(false)}>Start a conversation <ArrowRight size={16} /></a>
        </nav>
      )}
    </header>
  );
}

export default function PortfolioSiteClean() {
  const [open, setOpen] = useState(false);
  const [projectPrefill, setProjectPrefill] = useState(null);
  const [contactState, setContactState] = useState("idle");
  const formDisclosureRef = useRef(null);
  const [contactError, setContactError] = useState("");

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    if (contactState === "sending" || contactState === "sent") return;

    const target = event.currentTarget;
    const form = new FormData(target);
    const email = form.get("email")?.toString().trim();
    setContactState("sending");
    setContactError("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/awesomeakokayo@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email,
          company: form.get("company"),
          projectType: form.get("projectType"),
          budget: form.get("budget"),
          timeline: form.get("timeline"),
          brief: form.get("brief"),
          _subject: "New project enquiry from awesomeakokayo.cv",
          _replyto: email,
          _template: "table",
          _honey: "",
          _url: window.location.href,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) throw new Error("Submission failed");
      setContactState("sent");
      target.reset();
    } catch {
      setContactState("error");
      setContactError("The form could not send just now. Please use WhatsApp or email directly.");
    }
  };

  return (
    <div id="top" className="portfolio-shell">
      <Nav open={open} setOpen={setOpen} />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-inner page-container">
            <div className="hero-copy">
              <Eyebrow light>FULL-STACK ENGINEER <span aria-hidden="true">/</span> AI-NATIVE PRODUCT BUILDER</Eyebrow>
              <h1 id="hero-title" style={display}>I build software <span>that ships.</span></h1>
              <p className="hero-summary">Full-stack engineer building web, mobile and AI products from architecture to launch.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore selected work <ArrowRight size={17} /></a>
                <a className="button button-secondary" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
              </div>
              <p className="hero-location" style={mono}><span className="location-dot" aria-hidden="true" /> Based in Nigeria · Working remotely</p>
            </div>
            <div className="hero-visual" aria-label="Illustration of a collaborative software workbench">
              <HeroBuildScene />
            </div>
          </div>
          <div className="hero-baseline page-container" style={mono}>
            <span>Product thinking to shipped software</span>
            <a href="#work" aria-label="Scroll to selected work">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section id="work" className="work-section page-section" aria-labelledby="work-title">
          <div className="page-container">
            <div className="section-heading work-heading">
              <div>
                <Eyebrow>01 / SELECTED WORK</Eyebrow>
                <h2 id="work-title" style={display}>Selected work<span className="heading-period">.</span></h2>
              </div>
              <p>A small sample of products and systems I’ve built.</p>
            </div>
            <ProjectShowcase />
          </div>
        </section>

        <section id="experience" className="experience-section page-section" aria-labelledby="experience-title">
          <div className="page-container">
            <div className="section-heading experience-heading">
              <div>
                <Eyebrow>02 / EXPERIENCE</Eyebrow>
                <h2 id="experience-title" style={display}>Built across the stack<span className="heading-period">.</span></h2>
              </div>
              <p>Product ownership, engineering and delivery.</p>
            </div>
            <div className="experience-list">
              {experience.map((item, index) => (
                <article className="experience-row motion-reveal" key={item.company}>
                  <div className="experience-index" style={mono}>{String(index + 1).padStart(2, "0")}</div>
                  <div className="experience-main">
                    <p className="experience-meta" style={mono}>{item.meta}</p>
                    <h3 style={display}>{item.role}</h3>
                    <p className="experience-company">{item.company}</p>
                  </div>
                  <div className="experience-detail">
                    <p>{item.detail}</p>
                    <p className="experience-stack" style={mono}>{item.stack}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="toolkit-section page-section" aria-labelledby="toolkit-title">
          <div className="page-container toolkit-layout">
            <div className="toolkit-intro">
              <Eyebrow>03 / TOOLKIT</Eyebrow>
              <h2 id="toolkit-title" style={display}>The tools behind the work<span className="heading-period">.</span></h2>
            </div>
            <div className="toolkit-list">
              {toolkit.map((group, index) => (
                <div className="toolkit-row" key={group.label}>
                  <span className="toolkit-number" style={mono}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{group.label}</h3>
                  <p>{group.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section page-section" aria-labelledby="about-title">
          <div className="page-container about-layout">
            <div className="about-label">
              <Eyebrow>04 / ABOUT</Eyebrow>
              <p className="about-degree" style={mono}>B.Sc. Computer Science<br />Coal City University · 2026</p>
            </div>
            <div>
              <h2 id="about-title" style={display}>Product-minded. Engineering-led.</h2>
              <p className="about-copy">I enjoy turning unclear problems into useful software. I use AI as leverage, while keeping engineering decisions, testing and responsibility with the builder.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section page-section" aria-labelledby="contact-title">
          <div className="page-container">
            <div className="contact-top">
              <div>
                <Eyebrow>05 / CONTACT</Eyebrow>
                <h2 id="contact-title" style={display}>Have something worth building<span className="heading-period">?</span></h2>
              </div>
              <p>Tell me what you’re working on. I’ll get back to you by email.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-direct">
                <a className="contact-link contact-email" href="mailto:awesomeakokayo@gmail.com">
                  <span><span className="contact-link-label" style={mono}>EMAIL</span><strong>awesomeakokayo@gmail.com</strong></span>
                  <ArrowUpRight size={20} />
                </a>
                <a className="contact-link" href="https://www.linkedin.com/in/awesomeakokayo/" target="_blank" rel="noreferrer">
                  <span><span className="contact-link-label" style={mono}>LINKEDIN</span><strong>Connect professionally</strong></span>
                  <ArrowUpRight size={20} />
                </a>
                <a className="contact-link" href="https://github.com/awesomeakokayo" target="_blank" rel="noreferrer">
                  <span><span className="contact-link-label" style={mono}>GITHUB</span><strong>Explore the code</strong></span>
                  <ArrowUpRight size={20} />
                </a>
                <a className="contact-link" href="https://wa.me/2349020372640?text=Hi%20Awesome%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20connect." target="_blank" rel="noreferrer">
                  <span><span className="contact-link-label" style={mono}>WHATSAPP</span><strong>+234 902 037 2640</strong></span>
                  <ArrowUpRight size={20} />
                </a>
                <details className="pricing-disclosure">
                  <summary>Project starting points <ArrowRight size={17} /></summary>
                  <div className="pricing-disclosure-body">
                    <p className="pricing-disclosure-intro">Starting budgets for common project types. Final scope depends on the brief.</p>
                    <PricingPlayground
                      onStartProject={(choice) => {
                        setProjectPrefill({
                          nonce: Date.now(),
                          projectType: choice.id === "mobile" ? "Mobile app" : choice.id === "product" ? "Web application / SaaS" : "Website",
                          budget: choice.id === "mobile" ? "₦2m+" : choice.id === "product" ? "₦1m – ₦2m" : "₦500k – ₦1m",
                          label: choice.label,
                          price: choice.price,
                        });
                        setContactState("idle");
                        setContactError("");
                        if (formDisclosureRef.current) formDisclosureRef.current.open = true;
                        window.requestAnimationFrame(() => {
                          formDisclosureRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                        });
                      }}
                    />
                  </div>
                </details>
              </div>

              <details ref={formDisclosureRef} className="contact-form-disclosure" key={projectPrefill?.nonce || "contact-form"}>
                <summary>Or send a project brief <ArrowRight size={17} /></summary>
                <form onSubmit={handleProjectSubmit} className="contact-form">
                  {projectPrefill && (
                    <div className="project-prefill">
                      <p className="contact-link-label" style={mono}>Selected starting point</p>
                      <p className="project-prefill-title">{projectPrefill.label} · {projectPrefill.price}</p>
                      <p className="project-prefill-copy">I’ve carried this choice into the form. Add your details and brief.</p>
                    </div>
                  )}
                  <div className="form-grid">
                    <label><span>Name</span><input required name="name" autoComplete="name" placeholder="Your name" /></label>
                    <label><span>Email</span><input required type="email" name="email" autoComplete="email" placeholder="you@company.com" /></label>
                    <label><span>Company / organisation</span><input name="company" autoComplete="organization" placeholder="Company name" /></label>
                    <label><span>Project type</span><select required name="projectType" defaultValue={projectPrefill?.projectType || ""}><option value="">Select one</option><option>Website</option><option>Web application / SaaS</option><option>Mobile app</option><option>AI integration / automation</option><option>Something else</option></select></label>
                    <label><span>Budget</span><select required name="budget" defaultValue={projectPrefill?.budget || ""}><option value="">Choose a range</option>{contactBudgetOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                    <label><span>Timeline</span><select required name="timeline" defaultValue=""><option value="">Choose one</option><option>ASAP</option><option>2–4 weeks</option><option>1–2 months</option><option>2–3 months</option><option>Flexible</option></select></label>
                  </div>
                  <label className="form-brief"><span>What are you trying to build?</span><textarea required name="brief" rows="5" placeholder="The problem, who it is for, and what you need it to do." /></label>
                  <button className="button button-primary form-submit" type="submit" disabled={contactState === "sending" || contactState === "sent"}>
                    {contactState === "sending" ? "Sending…" : contactState === "sent" ? "Enquiry sent" : "Send project enquiry"} <ArrowRight size={17} />
                  </button>
                  <p className={"form-status" + (contactState === "error" ? " form-status-error" : "")} aria-live="polite">
                    {contactState === "sent" ? "Thanks. Your enquiry has been sent." : contactState === "error" ? contactError : ""}
                  </p>
                </form>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-container footer-inner" style={mono}>
          <span>© {new Date().getFullYear()} Awesome Akokayo</span>
          <span>Full-stack software engineer · Nigeria</span>
          <a href="#top">Back to the top ↑</a>
        </div>
      </footer>
    </div>
  );
}
