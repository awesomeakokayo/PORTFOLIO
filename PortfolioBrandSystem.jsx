import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  Brain,
  Rocket,
  Mail,
  Github,
  Linkedin,
  Youtube,
  Twitter,
  Menu,
  X,
  ChevronDown,
  Globe,
} from "lucide-react";

/* ============================================================
   BRAND TOKENS
   Colors are sampled directly from the original site and kept
   exact, per the brief. Everything else — type, spacing, scale,
   rhythm — is redesigned around Ojuju as the display face.
============================================================ */

const C = {
  ink: "#080808", // page background
  surface: "#0e0e0d", // card surface
  surfaceHover: "#121210",
  paper: "#f4f3ef", // primary text
  paperDim: "#b8b7b1", // body copy
  muted: "#9c9b94", // secondary text
  faint: "#67665f", // tertiary / meta text
  brand: "#ff5c00", // primary accent — orange
  brandHover: "#ff7324",
  signal: "#4ade80", // "live" status green
  hair: "rgba(244,243,239,0.1)",
};

const F = {
  display: { fontFamily: "'Ojuju', sans-serif" },
  mono: { fontFamily: "'Space Mono', monospace" },
  body: { fontFamily: "'Inter', sans-serif" },
};

/* ============================================================
   CONTENT
============================================================ */

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Build", href: "#build" },
  { label: "Contact", href: "#contact" },
];

const STACK = ["React Native", "FastAPI", "PostgreSQL", "Firebase", "Groq AI", "Gemini AI"];

const STATS = [
  { value: "5+", label: "Products shipped" },
  { value: "18", label: "Learning tracks built" },
  { value: "1", label: "Springer presenter" },
  { value: "NG →", label: "Nigeria. Global reach.", globe: true },
];

const CREDS = [
  "Software engineer & AI builder",
  "Founder — EmoHabit, TechSkillHub, NaviPro",
  "Technology Lead — NSO Technologies",
  "Final-year CS, Coal City University",
  "Former VP II, NACOS",
  "Based in Nigeria. Remote-ready worldwide.",
];

const CAPABILITIES = [
  {
    icon: Smartphone,
    title: "Web & Mobile Development",
    body: "I build full-stack applications end-to-end — from database design to the pixel-level interface. No handoffs, no gaps, no context lost between teams that don't exist.",
    tags: ["React Native", "React", "PostgreSQL", "Firebase"],
  },
  {
    icon: Brain,
    title: "AI-Powered Products",
    body: "I integrate AI where it creates real value — intelligent scheduling, multimodal analysis, recommendation engines, generative features. Not AI for the sake of a pitch deck.",
    tags: ["Groq API", "LLM Integration", "Prompt Engineering"],
  },
  {
    icon: Rocket,
    title: "Zero-to-One Builds",
    body: "Got an idea but no team? I handle architecture, design, development, and deployment. MVPs that are production-ready from day one, not demo-ready.",
    tags: ["MVP Development", "System Design", "Product Strategy"],
  },
];

const STATUS_COLOR = {
  active: C.signal,
  live: C.signal,
  mvp: C.brand,
  development: C.brand,
  academic: C.muted,
  deployed: C.muted,
};

const PROJECTS = [
  {
    name: "EmoHabit",
    tagline: "AI-Powered Habit Intelligence",
    status: "active",
    statusLabel: "Active — In development",
    problem:
      "Most habit apps track streaks and stop there. They never ask why someone skipped a day. EmoHabit reads the emotional pattern behind the habit, not just the checkbox.",
    tags: ["React Native", "Expo", "FastAPI", "Groq AI"],
    link: null,
  },
  {
    name: "TechSkillHub",
    tagline: "Free Tech Education for Africa",
    status: "live",
    statusLabel: "Live — Launched early 2026",
    problem:
      "Quality tech education is either too expensive or too shallow. TechSkillHub gives African developers 18 structured, free learning tracks — no paywall on ambition.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Paystack"],
    link: "https://techskillhub.cv",
  },
  {
    name: "NaviPro",
    tagline: "AI Career Mentorship Platform",
    status: "mvp",
    statusLabel: "MVP — Built",
    problem:
      "Career mentorship is expensive and hard to access at scale. NaviPro pairs every professional with an AI mentor that actually understands their goals and market.",
    tags: ["React", "FastAPI", "Groq API"],
    link: null,
  },
  {
    name: "Southwest Flood Monitor",
    tagline: "Community Flood Warning System",
    status: "academic",
    statusLabel: "Academic — Capstone project",
    problem:
      "Flood-prone communities in southwest Nigeria often get warnings too late, if at all. This system reads real-time signals and gets alerts to people before the water does.",
    tags: ["React Native", "FastAPI", "Gemini AI"],
    link: null,
  },
  {
    name: "AE-FUNAI Journal of Education",
    tagline: "Academic Journal Submission Platform",
    status: "deployed",
    statusLabel: "Deployed — Institutional use",
    problem:
      "Academic publishing at AE-FUNAI ran on email threads and manual tracking. This platform gives the university a real submission-to-publication pipeline.",
    tags: ["PHP", "MySQL", "PostgreSQL"],
    link: null,
  },
  {
    name: "Blancquake Foundation",
    tagline: "Neuro Health & Blood Donation Advocacy",
    status: "live",
    statusLabel: "Live — Non-profit partner",
    problem:
      "A grassroots neuro-health and blood donation foundation deserved a digital presence that matched internationally recognized health organizations, not a template site.",
    tags: ["React", "Next.js", "Framer Motion"],
    link: null,
  },
  {
    name: "CCU Journal of Education",
    tagline: "Academic Journal Publishing Platform",
    status: "development",
    statusLabel: "In development",
    problem:
      "Coal City University needed its own peer-reviewed publishing system — submission, review, and publication, built in-house rather than outsourced.",
    tags: ["React", "FastAPI", "PostgreSQL"],
    link: null,
  },
];

const BRING = [
  "Full-stack execution — mobile, web, backend",
  "Production AI integration, not demos",
  "Founder-level product thinking",
  "Community leadership — NACOS, EmoHabit",
  "Fast, disciplined shipping",
];

const TOWARD = [
  "Fintech for underserved communities",
  "AI-native tools for African developers",
  "Health & civic tech that saves time and lives",
  "Long-term partnerships, not one-off gigs",
];

const RECOGNITION = [
  {
    title: "Springer ETMiS 2025",
    body: "Presented original research at ETMiS 2025, an international Springer-published conference on emerging trends in mathematical and information sciences.",
  },
  {
    title: "NACOS Vice President II",
    body: "Served as Vice President II of the Computer Science student association at Coal City University — leading a technical community, not just attending it.",
  },
  {
    title: "5+ Products Shipped",
    body: "Fintech, edtech, civic tech, health tech. Five-plus builds shipped to real users, not just pushed to a portfolio.",
  },
];

const PALETTE = [
  { name: "Ink", hex: C.ink },
  { name: "Paper", hex: C.paper },
  { name: "Brand", hex: C.brand },
  { name: "Signal", hex: C.signal },
  { name: "Muted", hex: C.muted },
];

const VOICE = [
  "Confident, not loud.",
  "Specific, not generic.",
  "Built, not promised.",
  "Nigerian-first, globally minded.",
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/awesomeakokayo", icon: Github },
  { label: "X / Twitter", href: "#", icon: Twitter },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "LinkedIn", href: "#", icon: Linkedin },
];

/* ============================================================
   SHARED PIECES
============================================================ */

function SectionEyebrow({ index, label }) {
  return (
    <p
      className="flex items-center gap-3 text-xs uppercase tracking-widest"
      style={{ ...F.mono, color: C.brand }}
    >
      <span>{index}</span>
      <span style={{ color: "rgba(244,243,239,0.25)" }}>/</span>
      <span>{label}</span>
    </p>
  );
}

function Chip({ children }) {
  return (
    <span className="chip rounded-full px-3.5 py-1.5 text-xs" style={F.mono}>
      {children}
    </span>
  );
}

/* ============================================================
   NAV
============================================================ */

function Nav({ open, setOpen }) {
  return (
    <header
      className="sticky top-0 z-50 hairline-b"
      style={{ backgroundColor: "rgba(8,8,8,0.85)", backdropFilter: "blur(8px)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold"
            style={{ ...F.display, backgroundColor: C.brand, color: C.ink }}
          >
            A
          </span>
          <span className="hidden text-base tracking-tight sm:inline" style={{ ...F.display, color: C.paper }}>
            Awesome Akokayo
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-widest md:flex" style={F.mono}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="nav-link transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="btn-primary hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex"
          style={F.mono}
        >
          Hire Me <ArrowRight className="h-3.5 w-3.5" />
        </a>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: C.paper }}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          className="flex flex-col gap-4 px-6 py-6 text-sm uppercase tracking-widest hairline-t md:hidden"
          style={F.mono}
        >
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="nav-link">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary rounded-full px-5 py-3 text-center font-semibold"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
============================================================ */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden hairline-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 560px at 15% 10%, rgba(255,92,0,0.10), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-6 hidden select-none whitespace-nowrap font-extrabold md:block"
        style={{
          ...F.display,
          fontSize: "clamp(9rem, 22vw, 20rem)",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,92,0,0.28)",
        }}
      >
        AWESOME
      </span>

      <div className="relative mx-auto max-w-7xl px-6 pb-6 pt-16 md:px-10 md:pt-24 lg:px-16">
        <p
          className="fade-up mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest"
          style={{ ...F.mono, color: C.brand }}
        >
          <span>00</span>
          <span style={{ color: "rgba(244,243,239,0.2)" }}>/</span>
          <span>Software Engineer</span>
          <span style={{ color: "rgba(244,243,239,0.3)" }}>·</span>
          <span>AI Builder</span>
          <span style={{ color: "rgba(244,243,239,0.3)" }}>·</span>
          <span>Open to Work</span>
        </p>

        <h1
          className="fade-up delay-1 max-w-4xl text-5xl font-semibold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ ...F.display, color: C.paper }}
        >
          I build software
          <br />
          that belongs in
          <br />
          the <span style={{ color: C.brand }}>future.</span>
        </h1>

        <p
          className="fade-up delay-2 mt-8 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ ...F.body, color: C.muted }}
        >
          React Native. FastAPI. AI APIs. I turn a napkin sketch into a deployed,
          production-grade product — built in Nigeria, shipped worldwide.
        </p>

        <div className="fade-up delay-3 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
            style={F.mono}
          >
            Hire Me <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#work"
            className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
            style={F.mono}
          >
            See the Work
          </a>
        </div>

        <div className="fade-up delay-4 mt-14">
          <p className="mb-3 text-xs uppercase tracking-widest" style={{ ...F.mono, color: C.faint }}>
            Built with
          </p>
          <div className="flex flex-wrap" style={{ gap: '0.625rem' }}>
            {STACK.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>

        <div className="fade-up delay-5 mt-14 flex justify-center md:mt-16">
          <ChevronDown className="bounce-slow h-5 w-5" style={{ color: C.faint }} aria-hidden="true" />
        </div>
      </div>

      <div className="hairline-t">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:px-10 lg:px-16">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="flex items-center gap-2 text-3xl font-semibold md:text-4xl" style={{ ...F.display, color: C.paper }}>
                {s.value}
                {s.globe && <Globe className="h-7 w-7 md:h-8 md:w-8" style={{ color: C.paper }} />}
              </p>
              <p className="mt-1 text-xs md:text-sm" style={{ ...F.body, color: C.muted }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
============================================================ */

function About() {
  return (
    <section className="hairline-b">
      <div className="w-full px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="grid lg:grid-cols-2" style={{ gap: '3.5rem' }}>
          <div>
            <SectionEyebrow index="01" label="About" />
            <h2
              className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl"
              style={{ ...F.display, color: C.paper }}
            >
              From Nigeria.
              <br />
              Built for the world.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed md:text-lg" style={F.body}>
              <p style={{ color: C.paperDim }}>
                I'm Awesome Akokayo — a software engineer and AI builder who turns ideas into
                production-grade software. React Native, FastAPI, Postgres, and AI APIs are my
                instruments. I don't just write code — I make decisions: architecture, product,
                and the details most people skip.
              </p>
              <p style={{ color: C.paperDim }}>
                I studied Computer Science because I wanted to understand systems before I built
                them. Since then I've founded a habit-intelligence app, launched a free
                tech-education platform, and presented research at an international Springer
                conference. I'm in my final year — and already building like it's day one of the
                next thing.
              </p>
              <p style={{ color: C.muted }}>
                I'm currently open to freelance projects, contract work, and conversations with
                people building in the African tech space. If you know someone building something
                worth building, I'd love the introduction.
              </p>
            </div>
          </div>

          <div>
            <ul className="space-y-4">
              {CREDS.map((c) => (
                <li key={c} className="hairline-t pt-4 text-sm" style={{ ...F.mono, color: C.paperDim }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CAPABILITIES
============================================================ */

function Capabilities() {
  return (
    <section id="build" className="hairline-b">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionEyebrow index="02" label="What I Build" />
        <h2
          className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          style={{ ...F.display, color: C.paper }}
        >
          End-to-end. AI-native.
          <br />
          No handoffs needed.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="surface surface-hover rounded-2xl p-8 transition-colors duration-300">
              <cap.icon className="h-7 w-7" style={{ color: C.brand }} strokeWidth={1.75} />
              <h3 className="mt-6 text-xl font-semibold" style={{ ...F.display, color: C.paper }}>
                {cap.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ ...F.body, color: C.muted }}>
                {cap.body}
              </p>
              <div className="mt-6 flex flex-wrap" style={{ gap: '0.5rem' }}>
                {cap.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WORK
============================================================ */

function ProjectCard({ p }) {
  const dot = STATUS_COLOR[p.status] || C.muted;
  return (
    <div className="surface surface-hover flex flex-col rounded-2xl p-8 transition-colors duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold" style={{ ...F.display, color: C.paper }}>
            {p.name}
          </h3>
          <p className="mt-1.5 text-xs uppercase tracking-widest" style={{ ...F.mono, color: C.faint }}>
            {p.tagline}
          </p>
        </div>
        <span className="chip flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs" style={F.mono}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot }} />
          {p.statusLabel}
        </span>
      </div>

      <div className="mt-5 border-l-2" style={{ borderColor: "rgba(255,92,0,0.4)", paddingLeft: '1rem' }}>
        <p className="mb-1.5 text-xs uppercase tracking-widest" style={{ ...F.mono, color: C.brand }}>
          Problem
        </p>
        <p className="text-sm leading-relaxed" style={{ ...F.body, color: C.muted }}>
          {p.problem}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap" style={{ gap: '0.5rem' }}>
        {p.tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="link-arrow mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={F.mono}
        >
          Visit Site <ArrowUpRight className="arrow-icon h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="hairline-b">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionEyebrow index="03" label="Ventures" />
        <h2
          className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          style={{ ...F.display, color: C.paper }}
        >
          Things I've built.
          <br />
          Things I'm building.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VISION / MARKET
============================================================ */

function Vision() {
  return (
    <section className="hairline-b" style={{ backgroundColor: "#0b0b0a" }}>
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionEyebrow index="04" label="Why Now" />
        <h2
          className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          style={{ ...F.display, color: C.paper }}
        >
          Africa's tech market is a <span style={{ color: C.brand }}>$180B opportunity</span> by
          2025. I'm already building in it.
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-relaxed md:text-lg" style={{ ...F.body, color: C.muted }}>
          The African tech ecosystem isn't a future bet — it's a present reality. A young,
          mobile-first population, and developers who ship inside real constraints. That makes us
          resourceful, not behind.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg" style={{ ...F.body, color: C.muted }}>
          If you're an investor, founder, or team looking for someone who thinks in products, not
          tickets — I'd like to talk.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest" style={{ ...F.mono, color: C.faint }}>
              What I Bring
            </p>
            <ul className="space-y-3">
              {BRING.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm md:text-base" style={{ ...F.body, color: C.paperDim }}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: C.brand }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest" style={{ ...F.mono, color: C.faint }}>
              What I'm Building Toward
            </p>
            <ul className="space-y-3">
              {TOWARD.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm md:text-base" style={{ ...F.body, color: C.paperDim }}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: C.signal }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="#contact"
          className="link-arrow mt-14 inline-flex items-center gap-2 text-base font-semibold transition-colors"
          style={F.mono}
        >
          Start the Conversation <ArrowRight className="arrow-icon h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ============================================================
   RECOGNITION
============================================================ */

function Recognition() {
  return (
    <section className="hairline-b">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <SectionEyebrow index="05" label="Recognition" />
        <h2
          className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          style={{ ...F.display, color: C.paper }}
        >
          Proof, not promises.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {RECOGNITION.map((r) => (
            <div key={r.title} className="surface rounded-2xl p-8">
              <h3 className="text-lg font-semibold" style={{ ...F.display, color: C.paper }}>
                {r.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ ...F.body, color: C.muted }}>
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   FINAL CTA
============================================================ */

function FinalCTA() {
  return (
    <section id="contact" className="relative hairline-b overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 hidden select-none font-extrabold md:block"
        style={{
          ...F.display,
          fontSize: "clamp(10rem, 26vw, 22rem)",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(244,243,239,0.05)",
        }}
      >
        A
      </span>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <SectionEyebrow index="06" label="Let's Build" />
        <h2
          className="mt-6 max-w-3xl text-5xl font-semibold leading-none tracking-tight sm:text-6xl md:text-7xl"
          style={{ ...F.display, color: C.paper }}
        >
          Have an idea?
          <br />
          <span style={{ color: C.brand }}>I build things.</span>
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed md:text-lg" style={{ ...F.body, color: C.muted }}>
          A full spec or a napkin sketch — either way, I turn it into something people can
          actually use. Based in Nigeria, working with teams everywhere.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="mailto:awesomeakokayo@gmail.com"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
            style={F.mono}
          >
            <Mail className="h-4 w-4" /> Send Me an Email
          </a>
          <a
            href="#"
            className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
            style={F.mono}
          >
            <Linkedin className="h-4 w-4" /> Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
============================================================ */

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold" style={{ ...F.display, color: C.paper }}>
            Awesome Akokayo
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest" style={{ ...F.mono, color: C.faint }}>
            Built in Nigeria. Available worldwide.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="icon-link flex h-10 w-10 items-center justify-center rounded-full transition-colors"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div
        className="mt-10 flex flex-col gap-2 pt-6 text-xs hairline-t sm:flex-row sm:items-center sm:justify-between"
        style={{ ...F.mono, color: C.faint }}
      >
        <p>© 2026 Awesome Akokayo. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT
============================================================ */

export default function PortfolioBrandSystem() {
  const [open, setOpen] = useState(false);

  return (
    <div className="brand-root min-h-screen" style={{ backgroundColor: C.ink, ...F.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ojuju:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap');

        .brand-root ::selection { background: ${C.brand}; color: ${C.ink}; }
        .brand-root *:focus-visible { outline: 2px solid ${C.brand}; outline-offset: 3px; border-radius: 2px; }

        .hairline-b { border-bottom: 1px solid ${C.hair}; }
        .hairline-t { border-top: 1px solid ${C.hair}; }

        .surface { background: ${C.surface}; border: 1px solid ${C.hair}; }
        .surface-hover:hover { border-color: rgba(255,92,0,0.4); background: ${C.surfaceHover}; }

        .chip { background: rgba(244,243,239,0.04); border: 1px solid ${C.hair}; color: ${C.muted}; }

        .swatch { border: 1px solid ${C.hair}; }

        .btn-primary { background: ${C.brand}; color: ${C.ink}; }
        .btn-primary:hover { background: ${C.brandHover}; }

        .btn-outline { border: 1px solid rgba(244,243,239,0.25); color: ${C.paper}; background: transparent; }
        .btn-outline:hover { border-color: ${C.paper}; background: rgba(244,243,239,0.06); }

        .nav-link { color: ${C.muted}; }
        .nav-link:hover { color: ${C.paper}; }

        .icon-link { color: ${C.muted}; border: 1px solid rgba(244,243,239,0.12); }
        .icon-link:hover { color: ${C.ink}; background: ${C.paper}; border-color: ${C.paper}; }

        .link-arrow { color: ${C.paper}; }
        .link-arrow:hover { color: ${C.brand}; }
        .link-arrow:hover .arrow-icon { transform: translate(3px, -3px); }
        .arrow-icon { transition: transform 0.25s ease; }

        .fade-up { animation: fadeUp 0.9s cubic-bezier(.16,.84,.44,1) both; }
        .delay-1 { animation-delay: .08s; }
        .delay-2 { animation-delay: .16s; }
        .delay-3 { animation-delay: .24s; }
        .delay-4 { animation-delay: .36s; }
        .delay-5 { animation-delay: .48s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

        .bounce-slow { animation: bounceSlow 2.2s ease-in-out infinite; }
        @keyframes bounceSlow { 0%, 100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(6px); opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .fade-up { animation: none !important; opacity: 1 !important; transform: none !important; }
          .bounce-slow { animation: none !important; }
          * { transition-duration: .01ms !important; }
        }
      `}</style>

      <Nav open={open} setOpen={setOpen} />
      <Hero />
      <About />
      <Capabilities />
      <Work />
      <Vision />
      <Recognition />
      <FinalCTA />
      <Footer />
    </div>
  );
}
