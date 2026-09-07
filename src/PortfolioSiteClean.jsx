import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, Brain, Check, Code2, Menu, Rocket, Smartphone, X } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase.jsx";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };
const body = { fontFamily: "'Inter', sans-serif" };

const services = [
  { icon: Smartphone, title: "Web & mobile products", text: "Websites, SaaS products, dashboards and mobile apps built around the people who will actually use them." },
  { icon: Brain, title: "AI-native products", text: "AI features and workflows that solve real problems — from intelligent assistants and recommendations to analysis and automation." },
  { icon: Rocket, title: "Idea → production", text: "I take ambiguous ideas through product thinking, interface design, engineering, testing, deployment and post-build refinement." },
];

const process = [
  ["01", "Understand", "Clarify the problem, users and desired outcome before jumping into implementation."],
  ["02", "Shape", "Turn the idea into practical product flows, architecture and a clear build plan."],
  ["03", "Build", "Design and engineer the product, using AI where it creates genuine leverage."],
  ["04", "Validate", "Test, debug, harden and improve the product around real feedback and usage."],
  ["05", "Ship", "Deploy a product that is maintainable, secure and ready for real users."],
];

const experience = [
  {
    role: "Lead Full-Stack Engineer",
    company: "NaviPro",
    meta: "AI Career Mentor & Roadmap Platform · 2025 — Present",
    stack: "FastAPI · React · LLM APIs · YouTube Data API · Render",
    points: [
      "Founded and led an AI career platform that generates personalized learning roadmaps, provides conversational mentorship, and recommends context-relevant learning resources.",
      "Architected the FastAPI backend and AI service layer, separating conversational, structured-generation, and retrieval workflows across multiple model providers.",
      "Integrated the YouTube Data API into generated learning paths and deployed the backend on Render with managed configuration, rate limits, API-key handling, and CI/CD workflows.",
      "Led a five-person cross-functional team across UI/UX, backend, and visual design while owning product direction, technical decisions, and delivery.",
    ],
  },
  {
    role: "Founder & Full-Stack Engineer",
    company: "Tech Skills Hub",
    meta: "EdTech Platform · 2025 — Present",
    stack: "Next.js · Auth.js · Prisma · Neon PostgreSQL · Paystack · Vercel",
    points: [
      "Built and launched a learning platform for African developers with onboarding, guided learning tracks, content delivery, progress tracking, and paid access.",
      "Owned the full stack from product flows and UI implementation through authentication, data modeling, APIs, Paystack billing, and production deployment.",
      "Designed authenticated user flows and cross-device progress synchronization, iterating features from concept through public release.",
    ],
  },
  {
    role: "Mobile Application Engineer",
    company: "Independent Product Development",
    meta: "2025 — Present",
    stack: "React Native · Expo · FastAPI · PostgreSQL · Firebase · Gemini · Groq",
    points: [
      "Built and shipped cross-platform products across civic reporting, meal planning, habit tracking, and digital finance, working across architecture, APIs, data, AI integrations, and deployment.",
      "Developed Southwest Flood Monitor with Gemini-assisted image analysis for community reports, backed by FastAPI and PostgreSQL.",
      "Led the redesign and backend refactor of EmoHabit, including Firebase authentication and a streak engine with grace days and freeze-token logic.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Academic Journal Platform — Alex Ekwueme Federal University",
    meta: "2025",
    stack: "FastAPI · PostgreSQL/Neon · JavaScript · Render",
    points: [
      "Delivered a manuscript submission and publication system covering author submission, authentication, editorial review, verification, editing, approval, and publication workflows.",
      "Designed the PostgreSQL schema and REST endpoints while building the responsive frontend and deploying the integrated application.",
    ],
  },
];

const skills = [
  ["Languages", "TypeScript, JavaScript (ES6+), Python, HTML/CSS"],
  ["Frontend", "React, Next.js, React Native, Expo, Tailwind CSS"],
  ["Backend & Data", "Node.js, FastAPI, Flask, REST APIs, PostgreSQL, Prisma, Redis, Firebase"],
  ["AI Engineering", "LLM APIs, AI application development, prompt iteration, context engineering, structured generation, retrieval workflows, AI-assisted debugging"],
  ["AI Development Tools", "Claude / Claude Code, ChatGPT, Google Antigravity, OpenCode, DeepSeek"],
  ["Cloud & DevOps", "Git, GitHub, Docker, CI/CD, Vercel, Render, Netlify"],
  ["Integrations", "Paystack, Resend, OAuth, YouTube Data API, payment APIs"],
];

function Eyebrow({ number, children }) {
  return <p className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#ff5c00]" style={mono}><span>{number}</span><span className="text-white/20">/</span><span>{children}</span></p>;
}

function Nav({ open, setOpen }) {
  const links = [["Work", "#work"], ["Experience", "#experience"], ["About", "#about"], ["Skills", "#skills"]];
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-7 lg:h-[76px] lg:px-10 xl:px-16">
        <a href="#top" className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5c00] text-sm font-black text-[#080808]" style={display}>A</span><span className="hidden text-sm sm:block" style={display}>Awesome Akokayo</span></a>
        <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.18em] md:flex" style={mono}>{links.map(([label, href]) => <a key={label} href={href} className="text-[#9c9b94] transition hover:text-white">{label}</a>)}</nav>
        <a href="#contact" className="hidden rounded-full bg-[#ff5c00] px-5 py-2.5 text-xs font-bold text-[#080808] md:inline-flex" style={mono}>Let’s talk</a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-white/10 px-5 py-5 md:hidden"><div className="flex flex-col gap-5 text-xs uppercase tracking-[0.18em]" style={mono}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="text-[#9c9b94] hover:text-white">{label}</a>)}<a href="#contact" onClick={() => setOpen(false)} className="rounded-full bg-[#ff5c00] px-5 py-3 text-center text-[#080808]">Let’s talk</a></div></div>}
    </header>
  );
}

export default function PortfolioSiteClean() {
  const [open, setOpen] = useState(false);
  return (
    <div id="top" className="min-h-screen bg-[#080808] text-[#f4f3ef]" style={body}>
      <Nav open={open} setOpen={setOpen} />
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_5%,rgba(255,92,0,.16),transparent_68%)]" />
          <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#a78bfa]/[0.05] blur-[90px]" />
          <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center justify-center px-5 py-24 text-center sm:px-7 md:min-h-[82vh] md:py-28 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-6xl">
              <div className="hero-title-wrap"><Eyebrow number="00">Software engineer · Full-stack developer · Product builder</Eyebrow></div>
              <h1 className="mx-auto mt-7 max-w-6xl text-[3.25rem] font-semibold leading-[0.91] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[7.2rem] xl:text-[8rem]" style={display}>I build software products from <span className="text-[#ff5c00]">idea to production.</span></h1>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[#b8b7b1] md:text-lg md:leading-8">Software engineer building and shipping web, mobile and AI-integrated products across frontend, backend, data, integrations, testing and deployment.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3"><a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#ff5c00] px-6 py-3.5 text-sm font-bold text-[#080808]" style={mono}>Work with me <ArrowRight className="h-4 w-4" /></a><a href="#work" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold" style={mono}>See selected work <ArrowRight className="h-4 w-4" /></a></div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">{["TypeScript", "React", "Next.js", "Python", "FastAPI", "AI", "PostgreSQL"].map(item => <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-[#b8b7b1]" style={mono}>{item}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 lg:px-10 xl:px-16">{[["5+","products shipped"],["4","core product areas"],["01","Springer presentation"],["2026","Computer Science graduate"]].map(([value,label])=><div key={label} className="px-5 py-7 text-center sm:px-7 lg:py-9"><div className="text-3xl sm:text-4xl" style={display}>{value}</div><div className="mt-1 text-xs text-[#9c9b94]" style={mono}>{label}</div></div>)}</div></section>

        <section id="work" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="01">Selected work</Eyebrow><div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end"><h2 className="max-w-3xl text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>The work is the proof.</h2><p className="max-w-md text-sm leading-6 text-[#b8b7b1]">Production products, AI systems and full-stack builds that show how I think and what I can ship.</p></div><div className="mt-12"><ProjectShowcase /></div></div></section>

        <section id="experience" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="02">Engineering experience</Eyebrow><div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end"><h2 className="max-w-4xl text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>I own the full product loop.</h2><p className="max-w-md text-sm leading-6 text-[#b8b7b1]">From architecture and interfaces to APIs, data, AI workflows, integrations and deployment.</p></div><div className="mt-12 divide-y divide-white/10">{experience.map((item) => <article key={`${item.role}-${item.company}`} className="grid gap-7 py-10 first:pt-0 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16"><div><p className="text-[11px] uppercase tracking-[0.16em] text-[#ff5c00]" style={mono}>{item.meta}</p><h3 className="mt-4 text-3xl leading-none sm:text-4xl" style={display}>{item.role}</h3><p className="mt-3 text-lg text-[#e3e1db]">{item.company}</p><p className="mt-5 text-xs leading-6 text-[#9c9b94]" style={mono}>{item.stack}</p></div><div className="space-y-4">{item.points.map(point => <div key={point} className="flex items-start gap-3 text-sm leading-7 text-[#b8b7b1]"><Check className="mt-1.5 h-4 w-4 shrink-0 text-[#ff5c00]"/><span>{point}</span></div>)}</div></article>)}</div></div></section>

        <section id="services" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="03">How I help</Eyebrow><h2 className="mt-5 max-w-4xl text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>You bring the problem. I help build the product.</h2><div className="mt-12 grid gap-4 md:grid-cols-3">{services.map(({icon:Icon,title,text})=><div key={title} className="rounded-[20px] border border-white/10 bg-[#10100f] p-7 transition hover:border-[#ff5c00]/40 hover:bg-[#121210]"><Icon className="h-6 w-6 text-[#ff5c00]"/><h3 className="mt-7 text-xl" style={display}>{title}</h3><p className="mt-4 text-sm leading-6 text-[#b8b7b1]">{text}</p></div>)}</div></div></section>

        <section className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="04">The process</Eyebrow><div className="mt-7 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><h2 className="text-4xl leading-[0.96] sm:text-5xl" style={display}>From conversation to launch.</h2><div className="divide-y divide-white/10">{process.map(([number,title,text])=><div key={number} className="grid gap-4 py-7 sm:grid-cols-[70px_170px_1fr]"><span className="text-xs text-[#ff5c00]" style={mono}>{number}</span><h3 className="text-xl" style={display}>{title}</h3><p className="text-sm leading-6 text-[#b8b7b1]">{text}</p></div>)}</div></div></div></section>

        <section id="skills" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="05">Technical toolkit</Eyebrow><div className="mt-8 grid gap-4 md:grid-cols-2">{skills.map(([title,text])=><div key={title} className="rounded-[20px] border border-white/10 p-6"><p className="text-xs uppercase tracking-[0.16em] text-[#ff5c00]" style={mono}>{title}</p><p className="mt-4 text-sm leading-7 text-[#b8b7b1]">{text}</p></div>)}</div></div></section>

        <section id="about" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="06">About</Eyebrow><div className="mt-7 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><h2 className="text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>Software engineering with product judgment.</h2><div className="space-y-5 text-sm leading-7 text-[#b8b7b1]"><p>I’m a software engineer who enjoys taking products from unclear requirements to working software. I care about the details between the screens: data models, API contracts, authentication, integrations, testing, deployment and the decisions that make a product reliable after launch.</p><p>I work comfortably across frontend and backend systems, collaborate closely with designers, and use AI tools as engineering leverage without outsourcing technical judgment.</p><p>B.Sc. Computer Science · Coal City University · Graduated July 2026.</p></div></div></div></section>

        <section id="contact"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-7 md:py-32 lg:px-10 xl:px-16"><Eyebrow number="07">Contact</Eyebrow><div className="mx-auto mt-7 max-w-5xl text-center"><h2 className="text-5xl leading-[0.92] sm:text-6xl md:text-7xl lg:text-8xl" style={display}>Have a product to build?</h2><p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#b8b7b1]">Let’s talk about the problem, the product and what it will take to ship it well.</p><a href="mailto:awesomeakokayo@gmail.com" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#ff5c00] px-7 py-4 text-sm font-bold text-[#080808]" style={mono}>awesomeakokayo@gmail.com <ArrowUpRight className="h-4 w-4" /></a></div></div></section>
      </main>
      <footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-[#9c9b94] sm:px-7 md:flex-row md:items-center md:justify-between lg:px-10 xl:px-16" style={mono}><span>© 2026 Awesome Akokayo</span><div className="flex gap-5"><a href="https://github.com/awesomeakokayo" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a><a href="https://www.linkedin.com/in/awesomeakokayo" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a></div></div></footer>
    </div>
  );
}
