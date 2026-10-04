import React, { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ExternalLink, Layers3, Play, RotateCcw } from "lucide-react";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };

const showcases = [
  {
    name: "OpenBooks",
    type: "Business software · Live",
    summary: "A Nigeria-first business workspace for invoices, payments, expenses and records.",
    details: "I built the product around a simple problem: small businesses should not have to run their finances from Canva files, notebooks and memory.",
    image: "/work/openbooks-preview.svg",
    live: "https://www.openbooks.click",
    outcome: "Invoices, customer records and payment history in one workspace.",
    flow: [
      { label: "Overview", title: "See the business at a glance", body: "Revenue, invoices, payments and expenses sit together so an owner can understand the month before making the next decision." },
      { label: "Invoice", title: "Create an invoice", body: "Add the customer, amount and payment details, then generate a clean invoice without leaving the workspace." },
      { label: "Payment", title: "Record what actually happened", body: "Mark bank transfers, cash, POS or online payments and keep the record attached to the transaction." },
    ],
    points: ["Customers, invoices, payments and expenses", "Public invoices and payment records", "Security controls, rate limits and webhook protection"],
  },
  {
    name: "Elroi Hub",
    type: "Client build · Live",
    summary: "A digital growth agency website designed to make a serious business feel credible, ambitious and easy to approach.",
    details: "A client-facing marketing experience combining brand storytelling, services, process, team credibility, FAQ and a direct strategy-call journey.",
    image: "/work/elroi-hub-preview.svg",
    live: "https://elroihub.com",
    outcome: "A polished brand presence with a clear path from discovery to conversation.",
    flow: [
      { label: "Position", title: "Understand the promise", body: "The opening message tells a visitor what kind of company this is and why its work is different." },
      { label: "Services", title: "Make the offer tangible", body: "Visitors can move from the big promise into concrete service areas and understand what the company actually does." },
      { label: "CTA", title: "Make the next step obvious", body: "The experience ends with a strategy-call path instead of leaving the visitor to guess how to start." },
    ],
    points: ["Brand-led information architecture", "Responsive, motion-aware visual system", "Clear conversion path into a strategy call"],
  },
  {
    name: "TechSkillHub",
    type: "EdTech · Live",
    summary: "A structured learning platform for developers who want a roadmap instead of a pile of links.",
    details: "I built onboarding, guided learning tracks, authenticated progress, content delivery and paid access into one learning product.",
    image: "/work/techskillhub-preview.svg",
    live: "https://techskillhub.cv",
    outcome: "Learning journeys that show people what to learn next and why.",
    flow: [
      { label: "Roadmap", title: "Start with a path", body: "The product turns a broad goal into an ordered learning journey instead of asking the learner to figure everything out alone." },
      { label: "Lesson", title: "Work through the next step", body: "Each lesson sits inside a guided track, keeping the learner focused on the next useful piece of work." },
      { label: "Progress", title: "Know what is moving", body: "Authenticated progress lets the learner come back and continue across devices without losing the journey." },
    ],
    points: ["Guided learning tracks and progress", "Auth, Prisma and Neon PostgreSQL", "Paystack billing and production deployment"],
  },
  {
    name: "Southwest Flood Monitor",
    type: "Civic technology · Built",
    summary: "A community flood-reporting product that uses AI-assisted image analysis to support local reports.",
    details: "The product brings community reporting, location context and AI-assisted evidence analysis into one workflow.",
    image: "/work/flood-monitor-preview.svg",
    outcome: "A reporting flow that turns a photo and location into structured community data.",
    flow: [
      { label: "Report", title: "Start from the field", body: "A resident can begin with a photo, location and a short description of what is happening." },
      { label: "Analyse", title: "Use AI where it helps", body: "Image analysis supports the report workflow rather than replacing the person making the report." },
      { label: "Submit", title: "Turn the report into data", body: "The backend captures a structured report that can be stored and used for response and monitoring." },
    ],
    points: ["React Native + Expo mobile experience", "FastAPI + PostgreSQL backend", "Gemini-assisted image analysis"],
  },
];

const moreWork = [
  ["NaviPro", "AI career mentor and personalized learning roadmap platform"],
  ["EmoHabit", "Emotion-aware habit companion with a custom streak engine"],
  ["Coal City University Journal", "Manuscript submission and academic publishing workflow"],
  ["Blancquake Foundation", "Public-facing advocacy and community impact platform"],
];

function DemoPanel({ project }) {
  const [step, setStep] = useState(0);
  const active = project.flow[step];
  const progress = ((step + 1) / project.flow.length) * 100;

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#080808]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#73716a]" style={mono}>Interactive preview</span>
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#4ade80]" style={mono}><span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]"/>Try it</span>
        </div>
        <div className="aspect-[12/7] w-full bg-[#111]">
          <img src={project.image} alt={`${project.name} interface preview`} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>

      <div className="rounded-[20px] border border-white/10 bg-[#0d0d0c] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#73716a]" style={mono}>Walk the flow</span>
          <span className="text-[10px] text-[#ffb36b]" style={mono}>{step + 1} / {project.flow.length}</span>
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#ff5c00] transition-all duration-500" style={{ width: `${progress}%` }}/></div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.flow.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setStep(index)} className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition ${index === step ? "border-[#ff5c00]/60 bg-[#ff5c00]/10 text-[#ffb36b]" : "border-white/10 text-[#73716a] hover:text-[#f4f3ef]"}`} style={mono}>{item.label}</button>
          ))}
        </div>
        <h4 className="mt-7 text-3xl leading-none" style={display}>{active.title}</h4>
        <p className="mt-4 text-sm leading-6 text-[#b8b7b1]">{active.body}</p>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
          <button type="button" onClick={() => setStep((step - 1 + project.flow.length) % project.flow.length)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#9c9b94] hover:text-white" style={mono}><RotateCcw className="h-3.5 w-3.5"/> Previous</button>
          <button type="button" onClick={() => setStep((step + 1) % project.flow.length)} className="inline-flex items-center gap-2 rounded-full bg-[#ff5c00] px-4 py-2.5 text-xs font-bold text-[#080808]" style={mono}>Next step <ArrowRight className="h-3.5 w-3.5"/></button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const featured = useMemo(() => showcases.slice(0, 4), []);

  return (
    <>
      <div className="space-y-6">
        {featured.map((project, index) => (
          <article key={project.name} className="project-showcase-card rounded-[26px] border border-white/10 bg-[#10100f] p-6 sm:p-8 lg:p-9">
            <div className="relative grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#ff5c00]" style={mono}>{String(index + 1).padStart(2, "0")} / {project.type}</span>
                  {project.live && <span className="rounded-full border border-[#4ade80]/25 bg-[#4ade80]/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#4ade80]" style={mono}>Live</span>}
                </div>
                <h3 className="mt-6 text-5xl leading-[0.9] sm:text-6xl" style={display}>{project.name}</h3>
                <p className="mt-5 text-lg leading-7 text-[#f4f3ef] sm:text-xl">{project.summary}</p>
                <p className="mt-5 text-sm leading-6 text-[#b8b7b1]">{project.details}</p>
                <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#f4f3ef]"><Layers3 className="mt-1 h-4 w-4 shrink-0 text-[#ffb36b]"/><span>{project.outcome}</span></div>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#f4f3ef] hover:text-[#ffb36b]" style={mono}>Open live project <ExternalLink className="h-4 w-4"/></a>
                )}
                <div className="mt-7 space-y-3 border-t border-white/10 pt-6">
                  {project.points.map(point => <div key={point} className="flex items-start gap-3 text-sm leading-6 text-[#b8b7b1]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#ffb36b]"/><span>{point}</span></div>)}
                </div>
              </div>
              <DemoPanel project={project}/>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-[24px] border border-white/10 bg-[#0b0b0b] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#ff5c00]" style={mono}>More selected work</p>
            <h3 className="mt-3 text-4xl leading-none" style={display}>More proof, less scrolling.</h3>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#73716a]">The featured builds get the interactive treatment. The rest stay concise so visitors can scan your range without drowning in cards.</p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {moreWork.map(([name,copy]) => (
            <div key={name} className="rounded-[18px] border border-white/10 bg-[#10100f] p-5">
              <p className="text-sm font-semibold text-[#f4f3ef]">{name}</p>
              <p className="mt-2 text-sm leading-6 text-[#73716a]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 overflow-hidden rounded-full border border-white/10 bg-[#0b0b0b] py-3">
        <div className="marquee-track flex w-max items-center gap-7 whitespace-nowrap px-5">
          {["PRODUCT THINKING", "WEB", "MOBILE", "AI", "BACKEND", "DEPLOYMENT", "SECURITY", "TESTING", "PRODUCT THINKING", "WEB", "MOBILE", "AI", "BACKEND", "DEPLOYMENT"].map((label, index) => (
            <React.Fragment key={`${label}-${index}`}>
              <span className="text-[10px] tracking-[0.18em] text-[#73716a]" style={mono}>{label}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffb36b]/60" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
