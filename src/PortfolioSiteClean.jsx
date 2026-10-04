import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, Brain, Check, Code2, Menu, Rocket, Smartphone, X } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase.jsx";
import { ContactBuildScene, HeroBuildScene } from "./BlockWorld.jsx";
import PricingPlayground from "./PricingPlayground.jsx";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };
const body = { fontFamily: "'Inter', sans-serif" };

const services = [
  { icon: Smartphone, title: "Web & mobile products", text: "Websites, SaaS products, dashboards and mobile apps built around the people who will actually use them." },
  { icon: Brain, title: "AI-native products", text: "AI features and workflows that solve real problems — from intelligent assistants and recommendations to analysis and automation." },
  { icon: Rocket, title: "Idea → production", text: "I take ambiguous ideas through product thinking, interface design, engineering, testing, deployment and post-build refinement." },
];

const pricing = [
  {
    label: "Websites",
    price: "From ₦500,000",
    international: "International projects from $1,500",
    text: "For landing pages, company websites, service businesses and polished marketing sites that need to earn trust and enquiries.",
    features: ["Custom interface and responsive build", "Contact / enquiry flow", "SEO foundations and deployment"],
  },
  {
    label: "Web products",
    price: "From ₦1,500,000",
    international: "International projects quoted from scope",
    text: "For SaaS products, dashboards, portals and business systems where the website needs to actually do something.",
    features: ["Frontend + backend engineering", "Authentication, data and APIs", "Testing, deployment and handover"],
    featured: true,
  },
  {
    label: "Mobile + AI",
    price: "From ₦2,000,000",
    international: "International projects quoted from scope",
    text: "For cross-platform mobile apps, AI workflows, automations and products with more moving parts.",
    features: ["Product architecture and build", "AI / API integrations where needed", "Production launch and refinement"],
  },
];

const contactBudgetOptions = [
  "Below ₦500k",
  "₦500k – ₦1m",
  "₦1m – ₦2m",
  "₦2m+",
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

function Eyebrow({ number, children, light = false }) {
  return <p className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#ff5c00]" style={mono}><span>{number}</span><span className={light ? "text-black/20" : "text-white/20"}>/</span><span>{children}</span></p>;
}

function Nav({ open, setOpen }) {
  const links = [["Work", "#work"], ["Pricing", "#pricing"], ["Experience", "#experience"], ["About", "#about"], ["Skills", "#skills"]];
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
  const [projectPrefill, setProjectPrefill] = useState(null);
  const [contactState, setContactState] = useState("idle");
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
    } catch (error) {
      setContactState("error");
      setContactError("The form could not send just now. Please use WhatsApp or email directly.");
    }
  };
  return (
    <div id="top" className="min-h-screen bg-[#080808] text-[#f4f3ef]" style={body}>
      <Nav open={open} setOpen={setOpen} />
      <main>
        <section className="border-b-4 border-[#080808] bg-[#f4f3ef] text-[#080808]">
          <div className="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-12 px-5 py-16 sm:px-7 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 xl:px-16">
            <div className="text-left">
              <div className="text-left"><Eyebrow light number="00">Software engineer · Full-stack developer · Product builder</Eyebrow></div>
              <div className="mt-6 inline-flex items-center gap-2 border-2 border-[#080808] bg-[#ff5c00] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#080808]" style={mono}><span className="h-2 w-2 rounded-full border border-[#080808] bg-[#9FE0C1]" /> Building in public</div>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.88] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[6.8rem]" style={display}>I build software products from <span className="text-[#ff5c00]">idea to production.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[#262626] md:text-lg md:leading-8">Software engineer building and shipping web, mobile and AI-integrated products across frontend, backend, data, integrations, testing and deployment.</p>
              <div className="mt-8 flex flex-wrap justify-start gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 border-2 border-[#080808] bg-[#080808] px-6 py-3.5 text-sm font-bold text-[#f4f3ef] shadow-[0_6px_0_#ff5c00]" style={mono}>Work with me <ArrowRight className="h-4 w-4" /></a>
                <a href="#work" className="inline-flex items-center gap-2 border-2 border-[#080808] bg-[#f4f3ef] px-6 py-3.5 text-sm font-bold text-[#080808]" style={mono}>See the builds <ArrowRight className="h-4 w-4" /></a>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="border-2 border-[#080808] bg-[#ff5c00] px-3 py-1.5 text-[10px] font-bold text-[#080808]" style={mono}>Projects from ₦500k</span>
                <span className="border-2 border-[#080808] bg-[#9FE0C1] px-3 py-1.5 text-[10px] font-bold text-[#080808]" style={mono}>Web · Mobile · AI</span>
              </div>
              <p className="mt-5 text-xs text-[#66605a]" style={mono}>awesomeakokayo@gmail.com · +234 902 037 2640</p>
            </div>
            <div className="lg:pl-4"><HeroBuildScene /></div>
          </div>
        </section>

        <section className="border-b border-white/10"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 lg:px-10 xl:px-16">{[["5+","products shipped"],["4","core product areas"],["01","Springer presentation"],["2026","Computer Science graduate"]].map(([value,label])=><div key={label} className="px-5 py-7 text-center sm:px-7 lg:py-9"><div className="text-3xl sm:text-4xl" style={display}>{value}</div><div className="mt-1 text-xs text-[#9c9b94]" style={mono}>{label}</div></div>)}</div></section>

        <section id="work" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="01">Selected work</Eyebrow><div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end"><h2 className="max-w-3xl text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>The work is the proof.</h2><p className="max-w-md text-sm leading-6 text-[#b8b7b1]">Production products, AI systems and full-stack builds that show how I think and what I can ship.</p></div><div className="mt-12"><ProjectShowcase /></div></div></section>

        <section id="experience" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16"><Eyebrow number="02">Engineering experience</Eyebrow><div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end"><h2 className="max-w-4xl text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>I own the full product loop.</h2><p className="max-w-md text-sm leading-6 text-[#b8b7b1]">From architecture and interfaces to APIs, data, AI workflows, integrations and deployment.</p></div><div className="mt-12 divide-y divide-white/10">{experience.map((item) => <article key={`${item.role}-${item.company}`} className="grid gap-7 py-10 first:pt-0 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16"><div><p className="text-[11px] uppercase tracking-[0.16em] text-[#ff5c00]" style={mono}>{item.meta}</p><h3 className="mt-4 text-3xl leading-none sm:text-4xl" style={display}>{item.role}</h3><p className="mt-3 text-lg text-[#e3e1db]">{item.company}</p><p className="mt-5 text-xs leading-6 text-[#9c9b94]" style={mono}>{item.stack}</p></div><div className="space-y-4">{item.points.map(point => <div key={point} className="flex items-start gap-3 text-sm leading-7 text-[#b8b7b1]"><Check className="mt-1.5 h-4 w-4 shrink-0 text-[#ff5c00]"/><span>{point}</span></div>)}</div></article>)}</div></div></section>

        <section id="services" className="border-b-4 border-[#080808] bg-[#ff5c00] text-[#080808]"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 sm:py-16 md:py-24 lg:px-10 xl:px-16"><div className="flex items-center justify-between gap-4 border-b-2 border-[#080808] pb-4"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#080808]" style={mono}>03 / How I help</p><span className="border-2 border-[#080808] bg-[#9FE0C1] px-2 py-1 text-[9px] font-bold" style={mono}>BUILD → SHIP</span></div><h2 className="mt-5 max-w-4xl text-4xl leading-[0.96] sm:text-5xl md:text-6xl" style={display}>You bring the problem. I help build the product.</h2><div className="mt-12 grid gap-4 md:grid-cols-3">{services.map(({icon:Icon,title,text})=><div key={title} className="rounded-[20px] border border-white/10 bg-[#10100f] p-7 transition hover:border-[#ff5c00]/40 hover:bg-[#121210]"><Icon className="h-6 w-6 text-[#ff5c00]"/><h3 className="mt-7 text-xl" style={display}>{title}</h3><p className="mt-4 text-sm leading-6 text-[#b8b7b1]">{text}</p></div>)}</div></div></section>

        <section id="pricing" className="border-b-4 border-[#080808] bg-[#f4f3ef] text-[#080808]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-7 md:py-28 lg:px-10 xl:px-16">
            <div className="grid gap-8 lg:grid-cols-[0.52fr_1.48fr] lg:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#ff5c00]" style={mono}>04 / Pricing</p>
                <h2 className="mt-5 max-w-xl text-5xl leading-[0.9] sm:text-6xl md:text-7xl" style={display}>Don’t read the menu. Build your order.</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-[#4e4c47]">A starting point should help you qualify the project, not make you feel like you’re buying a pre-packaged website.</p>
            </div>
            <div className="mt-10">
              <PricingPlayground
                onStartProject={(choice) => {
                  setProjectPrefill({
                    nonce: Date.now(),
                    projectType: choice.id === "mobile" ? "Mobile app" : choice.id === "product" ? "Web application / SaaS" : "Website",
                    budget: choice.id === "mobile" ? "₦2m+" : choice.id === "product" ? "₦1m – ₦2m" : "₦500k – ₦1m",
                    label: choice.label,
                    price: choice.price,
                  });
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["Flexible scope", "Starting points change with the actual product decisions."],
                ["Nigeria + global", "Local pricing is clear. International work is scoped from the brief."],
                ["No fake urgency", "The interaction is for clarity, not pressure."],
              ].map(([title, copy]) => (
                <div key={title} className="border-2 border-[#080808] bg-white p-5 shadow-[0_4px_0_#080808]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff5c00]" style={mono}>{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#4e4c47]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-4 border-[#080808] bg-[#9FE0C1] text-[#080808]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 sm:py-16 md:py-24 lg:px-10 xl:px-16">
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14 lg:items-start">
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#080808] pb-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#ff5c00]" style={mono}>05 / The process</p>
                  <span className="border-2 border-[#080808] bg-[#f4f3ef] px-2 py-1 text-[9px] font-bold text-[#080808]" style={mono}>01→05</span>
                </div>
                <h2 className="mt-5 text-4xl leading-[0.9] sm:text-5xl md:text-6xl" style={display}>From conversation to launch.</h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-[#292a28]">Five practical moves. No mysterious hand-off between “design” and “development.”</p>
                <div className="mt-7 grid grid-cols-5 gap-1.5 lg:grid-cols-1 lg:gap-2">
                  {process.map(([number,title], index) => (
                    <div key={number} className="border-2 border-[#080808] bg-[#f4f3ef] p-2.5 lg:flex lg:items-center lg:gap-3">
                      <span className="text-[10px] font-bold text-[#ff5c00]" style={mono}>{number}</span>
                      <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.09em] text-[#080808] lg:mt-0" style={mono}>{title}</span>
                      {index < 4 && <span className="hidden text-[#666] lg:block">↓</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-2 border-[#080808] bg-[#080808] p-4 shadow-[0_7px_0_#080808] sm:p-5">
                <div className="divide-y divide-white/15">
                  {process.map(([number,title,text])=>(
                    <article key={number} className="grid gap-3 py-5 first:pt-1 sm:grid-cols-[56px_150px_1fr] sm:gap-4">
                      <span className="text-xs font-bold text-[#ffb36b]" style={mono}>{number}</span>
                      <h3 className="text-2xl leading-none text-[#f4f3ef]" style={display}>{title}</h3>
                      <p className="text-sm leading-6 text-[#d7d6d0]">{text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="border-b-4 border-[#080808] bg-[#f4f3ef] text-[#080808]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 sm:py-18 md:py-24 lg:px-10 xl:px-16">
            <div className="grid gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:gap-14 lg:items-start">
              <div>
                <div className="flex items-center justify-between border-b-2 border-[#080808] pb-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#ff5c00]" style={mono}>06 / Technical toolkit</p>
                  <span className="h-5 w-5 border-2 border-[#080808] bg-[#ff5c00]" />
                </div>
                <h2 className="mt-5 text-4xl leading-[0.9] sm:text-5xl md:text-6xl" style={display}>The tools behind the screen.</h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-[#4e4c47]">The visible interface is only one layer. These are the systems I work across to get the product running.</p>
                <div className="mt-7 border-2 border-[#080808] bg-[#080808] p-4 text-[#f4f3ef] shadow-[0_6px_0_#ff5c00]">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#ffb36b]" style={mono}>Stack signal</p>
                  <p className="mt-2 text-2xl leading-none" style={display}>Frontend + backend + data + AI.</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {skills.map(([title,text], index)=>(
                  <article key={title} className="border-2 border-[#080808] bg-white p-5 shadow-[0_4px_0_#080808] transition hover:-translate-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff5c00]" style={mono}>{title}</p>
                      <span className="flex h-7 w-7 items-center justify-center border-2 border-[#080808] bg-[#9FE0C1] text-[9px] font-bold text-[#080808]" style={mono}>{String(index+1).padStart(2,"0")}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#2f2e2a]">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-b border-white/10 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 sm:py-18 md:py-24 lg:px-10 xl:px-16">
            <div className="grid gap-9 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
              <div>
                <Eyebrow number="07">About</Eyebrow>
                <div className="mt-6 border-2 border-[#f4f3ef]/20 bg-[#10100f] p-4 shadow-[0_7px_0_#ff5c00]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border-2 border-[#080808] bg-[#f4f3ef] p-3 text-[#080808]"><p className="text-[9px] uppercase text-[#666]" style={mono}>Based</p><p className="mt-1 text-sm font-bold" style={mono}>Nigeria</p></div>
                    <div className="border-2 border-[#080808] bg-[#9FE0C1] p-3 text-[#080808]"><p className="text-[9px] uppercase text-[#666]" style={mono}>Mode</p><p className="mt-1 text-sm font-bold" style={mono}>Remote</p></div>
                    <div className="border-2 border-[#080808] bg-[#ff5c00] p-3 text-[#080808]"><p className="text-[9px] uppercase text-[#666]" style={mono}>Degree</p><p className="mt-1 text-sm font-bold" style={mono}>B.Sc. CS</p></div>
                    <div className="border-2 border-[#080808] bg-[#f4f3ef] p-3 text-[#080808]"><p className="text-[9px] uppercase text-[#666]" style={mono}>Graduated</p><p className="mt-1 text-sm font-bold" style={mono}>2026</p></div>
                  </div>
                  <p className="mt-4 text-[9px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}>Product builder / full-stack / AI-native</p>
                </div>
              </div>
              <div>
                <h2 className="max-w-4xl text-4xl leading-[0.92] sm:text-5xl md:text-6xl" style={display}>Software engineering with product judgment.</h2>
                <div className="mt-7 grid gap-5 border-t border-white/10 pt-6 text-sm leading-7 text-[#b8b7b1] md:grid-cols-2">
                  <p>I’m a software engineer who enjoys taking products from unclear requirements to working software. I care about the details between the screens: data models, API contracts, authentication, integrations, testing, deployment and the decisions that make a product reliable after launch.</p>
                  <div className="space-y-5">
                    <p>I work comfortably across frontend and backend systems, collaborate closely with designers, and use AI tools as engineering leverage without outsourcing technical judgment.</p>
                    <p className="border-l-2 border-[#ff5c00] pl-4 text-[#f4f3ef]">B.Sc. Computer Science · Coal City University · Graduated July 2026.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-7 md:py-32 lg:px-10 xl:px-16">
          <Eyebrow number="08">Start a project</Eyebrow>
          <div className="mt-7 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="text-5xl leading-[0.92] sm:text-6xl md:text-7xl" style={display}>Tell me what you’re trying to build.</h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#b8b7b1]">Prefer WhatsApp? Message me directly and I’ll get back to you there. For detailed projects, the form gives me enough context to make the first reply useful.</p>
              <div className="mt-8 rounded-[14px] border-2 border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#73716a]" style={mono}>Direct email</p>
                <div className="mt-3 flex flex-col gap-3"><a href="mailto:awesomeakokayo@gmail.com" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#ffb36b]" style={mono}>awesomeakokayo@gmail.com <ArrowUpRight className="h-4 w-4"/></a><a href="https://wa.me/2349020372640?text=Hi%20Awesome%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#0d1711] px-4 py-2.5 text-xs font-bold text-[#d8ffe5] hover:border-[#25D366]/70" style={mono}>WhatsApp: +234 902 037 2640 <ArrowUpRight className="h-4 w-4"/></a></div>
              </div>
              <div className="mt-7"><ContactBuildScene /></div>
            </div>

            <form key={projectPrefill?.nonce || "default-contact"} onSubmit={handleProjectSubmit} className="rounded-[14px] border-2 border-white/10 bg-[#10100f] p-6 shadow-[0_10px_0_#050505] sm:p-8">
                            {projectPrefill && (
                <div className="mb-6 border-2 border-[#ff5c00]/50 bg-[#15110d] p-4 shadow-[0_4px_0_#ff5c00]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.16em] text-[#ffb36b]" style={mono}>Carried from your project choice</p>
                      <p className="mt-2 text-lg text-[#f4f3ef]" style={display}>{projectPrefill.label} · {projectPrefill.price}</p>
                    </div>
                    <span className="border-2 border-[#ff5c00] bg-[#ff5c00] px-2 py-1 text-[9px] font-bold uppercase text-[#080808]" style={mono}>Pre-filled</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#b8b7b1]">I’ve already selected the project type and budget below. You only need to add your details and brief.</p>
                </div>
              )}

<div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}>Name</span><input required name="name" className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-[#f4f3ef] outline-none placeholder:text-[#73716a]" placeholder="Your name" /></label>
                <label className="block"><span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}>Email</span><input required type="email" name="email" className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-[#f4f3ef] outline-none placeholder:text-[#73716a]" placeholder="you@company.com" /></label>
                <label className="block"><span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}>Company / organisation</span><input name="company" className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-[#f4f3ef] outline-none placeholder:text-[#73716a]" placeholder="Company name" /></label>
                <label className="block"><span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}>Project type</span><select required name="projectType" defaultValue={projectPrefill?.projectType || ""} className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-[#f4f3ef] outline-none"><option value="">Select one</option><option>Website</option><option>Web application / SaaS</option><option>Mobile app</option><option>AI integration / automation</option><option>Something else</option></select></label>
                <label className="block"><span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}>Budget</span><select required name="budget" defaultValue={projectPrefill?.budget || ""} className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-[#f4f3ef] outline-none"><option value="">Choose a range</option>{contactBudgetOptions.map(option => <option key={option}>{option}</option>)}</select></label>
                <label className="block"><span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}>Timeline</span><select required name="timeline" defaultValue="" className="mt-2 w-full rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm text-[#f4f3ef] outline-none"><option value="">Choose one</option><option>ASAP</option><option>2–4 weeks</option><option>1–2 months</option><option>2–3 months</option><option>Flexible</option></select></label>
              </div>
              <label className="mt-5 block"><span className="text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}>What are you trying to build?</span><textarea required name="brief" rows="6" className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#080808] px-4 py-3 text-sm leading-6 text-[#f4f3ef] outline-none placeholder:text-[#73716a]" placeholder="Give me the short version. What is the problem, who is it for, and what do you need the product to do?"></textarea></label>
              <button type="submit" disabled={contactState === "sending" || contactState === "sent"} className="mt-6 inline-flex items-center gap-2 border-2 border-[#080808] bg-[#ff5c00] px-6 py-3.5 text-sm font-bold text-[#080808] shadow-[0_5px_0_#080808] disabled:cursor-not-allowed disabled:opacity-70" style={mono}>{contactState === "sending" ? "Sending…" : contactState === "sent" ? "Enquiry sent" : "Send project enquiry"} <ArrowRight className="h-4 w-4"/></button>
              {contactState === "sent" && <p className="mt-4 text-xs text-[#86efac]" style={mono}>Sent to my inbox. I’ll reply from email.</p>}
              {contactState === "error" && <p className="mt-4 text-xs leading-5 text-[#ffb36b]" style={mono}>{contactError}</p>}
            </form>
          </div>
        </div></section>
      </main>
      <footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-[#9c9b94] sm:px-7 md:flex-row md:items-center md:justify-between lg:px-10 xl:px-16" style={mono}><span>© 2026 Awesome Akokayo</span><div className="flex gap-5"><a href="https://github.com/awesomeakokayo" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a><a href="https://www.linkedin.com/in/awesomeakokayo" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a></div></div></footer>
    </div>
  );
}
