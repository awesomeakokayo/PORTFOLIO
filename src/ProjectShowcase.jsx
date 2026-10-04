import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Hand, Layers3 } from "lucide-react";
import { AgencyIllustration, FloodIllustration } from "./BlockWorld.jsx";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };

const showcases = [
  {
    name: "OpenBooks",
    type: "Business software · Live",
    summary: "A Nigeria-first business workspace for invoices, payments, expenses and records.",
    details: "A real product built around the everyday mess of running business finances from Canva files, notebooks and memory.",
    visual: "image",
    image: "https://raw.githubusercontent.com/awesomeakokayo/OpenBooks/main/public/image.png",
    visualClass: "aspect-[16/9]",
    live: "https://www.openbooks.click",
    outcome: "Invoices, customer records and payment history in one workspace.",
    color: "#ff5c00",
    flow: [
      ["01", "Invoice", "Create a clean invoice with the customer, amount and payment details."],
      ["02", "Payment", "Record bank transfer, cash, POS or online payment against the transaction."],
      ["03", "Track", "Keep revenue, invoices, payments and expenses in one place."],
    ],
  },
  {
    name: "Elroi Hub",
    type: "Client build · Live",
    summary: "A digital growth agency website designed to make a serious business feel credible and easy to approach.",
    details: "A brand-led marketing experience with a clear path from positioning and services to proof and a strategy-call action.",
    visual: "agency",
    live: "https://elroihub.com",
    outcome: "A polished brand presence with a clear path from discovery to conversation.",
    color: "#9FE0C1",
    flow: [
      ["01", "Position", "The opening message makes the company and its promise immediately understandable."],
      ["02", "Services", "The experience turns abstract capabilities into concrete service areas."],
      ["03", "Convert", "The visitor reaches a clear strategy-call path instead of a dead end."],
    ],
  },
  {
    name: "TechSkillHub",
    type: "EdTech · Live",
    summary: "A structured learning platform for developers who want a roadmap instead of a pile of links.",
    details: "Onboarding, learning tracks, authenticated progress, content delivery and Paystack billing in one product.",
    visual: "image",
    image: "https://raw.githubusercontent.com/awesomeakokayo/Techhubs/main/app/opengraph-image.png",
    visualClass: "aspect-[16/9]",
    live: "https://techskillhub.cv",
    outcome: "Learning journeys that show people what to learn next and why.",
    color: "#f4f3ef",
    flow: [
      ["01", "Roadmap", "Start with an ordered learning path instead of a pile of disconnected resources."],
      ["02", "Lesson", "Move through the next useful piece of work inside a focused track."],
      ["03", "Progress", "Come back later and continue with your progress saved across devices."],
    ],
  },
  {
    name: "Southwest Flood Monitor",
    type: "Civic technology · Built",
    summary: "A community flood-reporting product that uses AI-assisted image analysis to support local reports.",
    details: "A field-first reporting flow that turns a photo, location and description into structured community data.",
    visual: "flood",
    outcome: "A reporting flow that turns a photo and location into structured community data.",
    color: "#9FE0C1",
    flow: [
      ["01", "Report", "Start with a photo, location and short description from the field."],
      ["02", "Analyse", "AI assists image interpretation without replacing the person making the report."],
      ["03", "Submit", "Turn the evidence into a structured report for monitoring and response."],
    ],
  },
,
  {
    name: "CCU Journal Platform",
    type: "Academic publishing · Built",
    summary: "A journal management platform for submission, review, publishing and public access.",
    details: "The JOURNAL repository contains separate public and admin flows, including submissions, archives, authentication and editorial review.",
    visual: "brand",
    image: "https://raw.githubusercontent.com/awesomeakokayo/JOURNAL/main/journal-platform/public/CCULOGO.png",
    visualLabel: "Institution asset",
    live: "https://github.com/awesomeakokayo/JOURNAL",
    outcome: "A full editorial workflow from manuscript submission to published journal access.",
    color: "#ff5c00",
    flow: [
      ["01", "Submit", "Authors create accounts and submit manuscripts through the public platform."],
      ["02", "Review", "Admins can review, edit, approve or reject submissions."],
      ["03", "Publish", "Published work is available through archives and public download flows."]
    ]
  },
  {
    name: "AE-FUNAI Journal",
    type: "Academic publishing · Built",
    summary: "A publication platform covering author submission, editorial review and public journal access.",
    details: "The frontend and backend repositories form a full journal publication system with JWT authentication, submissions, admin publishing and public search/download.",
    visual: "brand",
    image: "https://raw.githubusercontent.com/awesomeakokayo/AE-FUNAI-journal-frontend/main/aefunai_logo.png",
    visualLabel: "Institution asset",
    live: "https://github.com/awesomeakokayo/AE-FUNAI-journal-frontend",
    outcome: "A structured publishing workflow with public discovery and administrative control.",
    color: "#9FE0C1",
    flow: [
      ["01", "Author", "Register, authenticate and submit a paper with title, authors, abstract and file."],
      ["02", "Editor", "Review submissions and move them through approval and publication."],
      ["03", "Reader", "Search and download published journals without needing an account."]
    ]
  },
  {
    name: "Blancquake Foundation",
    type: "Advocacy platform · Built",
    summary: "A public-facing foundation website built around mission, impact, people and community action.",
    details: "The project repo includes real impact photography, mission imagery, team photography and a production hero experience.",
    visual: "image",
    image: "https://raw.githubusercontent.com/awesomeakokayo/Blancquake_site/main/app/public/images/hero-poster.jpg",
    visualClass: "aspect-[16/9]",
    visualLabel: "Project photography",
    live: "https://github.com/awesomeakokayo/Blancquake_site",
    outcome: "A visual public presence that gives the organisation a stronger story to stand behind.",
    color: "#f4f3ef",
    flow: [
      ["01", "Mission", "Lead with the organisation's purpose and the people it serves."],
      ["02", "Impact", "Use real project imagery to make the work tangible."],
      ["03", "Action", "Guide visitors from understanding the mission toward engagement."]
    ]
  },];

function BrandVisual({ project }) {
  return (
    <div className="relative flex aspect-[16/9] w-full flex-col justify-between overflow-hidden border-4 border-[#080808] bg-[#f4f3ef] p-5 text-[#080808] sm:p-6">
      <div className="flex items-center justify-between border-b-2 border-[#080808] pb-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={mono}>Real project asset</span>
        <span className="border-2 border-[#080808] bg-[#ff5c00] px-2 py-1 text-[8px] font-bold uppercase" style={mono}>Journal</span>
      </div>
      <div className="grid flex-1 place-items-center py-5">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden border-4 border-[#080808] bg-white p-3 shadow-[0_6px_0_#080808] sm:h-32 sm:w-32">
          <img src={project.image} alt={project.name + " institutional logo"} className="max-h-full max-w-full object-contain" loading="lazy" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["SUBMIT", "REVIEW", "PUBLISH"].map((label) => (
          <span key={label} className="border-2 border-[#080808] bg-[#9FE0C1] px-2 py-2 text-center text-[8px] font-bold tracking-[0.08em]" style={mono}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function Visual({ project }) {
  if (project.visual === "agency") return <AgencyIllustration />;
  if (project.visual === "flood") return <FloodIllustration />;
  if (project.visual === "brand") return <BrandVisual project={project} />;
  return (
    <div className={`relative w-full overflow-hidden border-4 border-[#080808] bg-[#f4f3ef] ${project.visualClass}`}>
      <img
        src={project.image}
        alt={`${project.name} project screen`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        draggable="false"
      />
    </div>
  );
}

function FanPanel({ project, index, active, onClick, style }) {
  return (
    <button
      type="button"
      aria-label={`View ${project.name}`}
      onClick={onClick}
      className={`fan-panel absolute left-1/2 top-0 h-full w-[92%] -translate-x-1/2 text-left sm:w-[72%] lg:w-[60%] ${active ? "z-30 cursor-grab active:cursor-grabbing" : "z-10 cursor-pointer"}`}
      style={style}
    >
      <div className={`h-full overflow-hidden border-4 border-[#080808] bg-[#f4f3ef] shadow-[0_12px_0_#080808] ${active ? "ring-4 ring-[#ff5c00] ring-offset-4 ring-offset-[#f4f3ef]" : ""}`}>
        <div className="flex items-center justify-between border-b-4 border-[#080808] bg-[#080808] px-4 py-3 text-[#f4f3ef]">
          <span className="text-[9px] uppercase tracking-[0.16em]" style={mono}>Build {String(index + 1).padStart(2, "0")}</span>
          <span className="text-[9px] uppercase tracking-[0.16em] text-[#ffb36b]" style={mono}>{project.type.split(" · ")[0]}</span>
        </div>
        <div className="flex h-[calc(100%-49px)] flex-col p-4 sm:p-5">
          <div className="min-h-0 flex-1 overflow-hidden">
            <Visual project={project} />
          </div>
          <div className="mt-4 border-t-2 border-[#080808] pt-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-3xl leading-none text-[#080808] sm:text-4xl" style={display}>{project.name}</h3>
                <p className="mt-2 text-xs leading-5 text-[#55524d]">{project.summary}</p>
              </div>
              <span className="mt-1 h-4 w-4 shrink-0 border-2 border-[#080808]" style={{ background: project.color }} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function ProjectShowcase() {
  const featured = useMemo(() => showcases, []);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pointerStart = useRef(null);
  const suppressClick = useRef(false);

  const next = () => {
    setActive((current) => (current + 1) % featured.length);
    setHasInteracted(true);
  };
  const previous = () => {
    setActive((current) => (current - 1 + featured.length) % featured.length);
    setHasInteracted(true);
  };

  const onPointerDown = (event) => {
    pointerStart.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerUp = (event) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    setDragging(false);
    if (Math.abs(distance) > 55) {
      suppressClick.current = true;
      distance < 0 ? next() : previous();
      window.setTimeout(() => { suppressClick.current = false; }, 120);
    }
  };

  useEffect(() => {
    const handler = (event) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const getPanelStyle = (index) => {
    let delta = index - active;
    if (delta > featured.length / 2) delta -= featured.length;
    if (delta < -featured.length / 2) delta += featured.length;

    if (delta === 0) {
      return { transform: "translateX(-50%) translateY(0) rotate(0deg) scale(1)", opacity: 1 };
    }
    if (delta === -1) {
      return { transform: "translateX(-76%) translateY(20px) rotate(-7deg) scale(.9)", opacity: .88 };
    }
    if (delta === 1) {
      return { transform: "translateX(-24%) translateY(20px) rotate(7deg) scale(.9)", opacity: .88 };
    }
    return { transform: `translateX(-50%) translateY(55px) rotate(${delta * 12}deg) scale(.78)`, opacity: .16 };
  };

  const project = featured[active];
  const step = project.flow[0];

  return (
    <div className="border-4 border-[#080808] bg-[#f4f3ef] shadow-[0_14px_0_#080808]">
      <div className="grid gap-0 lg:grid-cols-[1.2fr_.8fr]">
        <div className="border-b-4 border-[#080808] p-5 sm:p-7 lg:border-b-0 lg:border-r-4 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#080808]" style={mono}>01 / Fold-out project wall</p>
              <h2 className="mt-3 max-w-xl text-3xl leading-[0.9] text-[#080808] sm:text-5xl" style={display}>Pull the next build into view.</h2>
            </div>
            <div className="border-2 border-[#080808] bg-[#9FE0C1] px-3 py-2 text-[9px] font-bold uppercase text-[#080808]" style={mono}>{String(active + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}</div>
          </div>

          <div
            className={`relative mt-6 h-[430px] touch-pan-y select-none sm:mt-7 sm:h-[540px] lg:h-[590px] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { pointerStart.current = null; setDragging(false); suppressClick.current = false; }}
          >
            <div className="absolute inset-x-0 bottom-0 mx-auto h-7 w-[70%] border-2 border-[#080808] bg-[#ff5c00]" />
            {featured.map((item, index) => (
              <FanPanel
                key={item.name}
                project={item}
                index={index}
                active={index === active}
                onClick={() => { if (suppressClick.current) return; setActive(index); setHasInteracted(true); }}
                style={getPanelStyle(index)}
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <button type="button" onClick={previous} aria-label="Previous project" className="flex h-11 w-11 items-center justify-center border-2 border-[#080808] bg-[#f4f3ef] text-[#080808] shadow-[0_4px_0_#080808] transition hover:-translate-y-0.5"><ArrowLeft className="h-4 w-4"/></button>
            <div className="border-2 border-[#080808] bg-[#080808] px-4 py-3 text-center text-[9px] uppercase tracking-[0.14em] text-[#f4f3ef]" style={mono}>
              <span className="inline-flex items-center gap-2"><Hand className="h-3.5 w-3.5 text-[#ffb36b]"/>{hasInteracted ? "Keep unfolding" : "Swipe / drag to unfold"}</span>
            </div>
            <button type="button" onClick={next} aria-label="Next project" className="flex h-11 w-11 items-center justify-center border-2 border-[#080808] bg-[#ff5c00] text-[#080808] shadow-[0_4px_0_#080808] transition hover:-translate-y-0.5"><ArrowRight className="h-4 w-4"/></button>
          </div>
        </div>

        <div className="bg-[#080808] p-6 text-[#f4f3ef] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#ffb36b]" style={mono}>You opened</p>
              <h3 className="mt-3 text-5xl leading-[0.88] sm:text-6xl" style={display}>{project.name}</h3>
            </div>
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="border-2 border-[#f4f3ef] px-3 py-2 text-[9px] font-bold uppercase text-[#f4f3ef] hover:bg-[#f4f3ef] hover:text-[#080808]" style={mono}>Live <ExternalLink className="ml-1 inline h-3 w-3"/></a>}
          </div>

          <p className="mt-7 text-sm leading-7 text-[#b8b7b1]">{project.details}</p>

          <div className="mt-8 border-2 border-white/15 bg-[#101010] p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#9c9b94]" style={mono}>One useful thing inside</p>
              <span className="text-[10px] text-[#ffb36b]" style={mono}>{step[0]} / {project.flow.length}</span>
            </div>
            <h4 className="mt-3 text-3xl leading-none" style={display}>{step[1]}</h4>
            <p className="mt-3 text-sm leading-6 text-[#b8b7b1]">{step[2]}</p>
          </div>

          <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
            {[
              project.outcome,
              "Built across the product loop, not just the visible screen.",
              "Interaction reveals the thinking behind the build."
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-6 text-[#f4f3ef]">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#9FE0C1]"/><span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#73716a]" style={mono}><Layers3 className="h-3.5 w-3.5"/> The wall is the navigation</p>
            <p className="mt-3 text-xs leading-5 text-[#73716a]">Drag left or right, click a panel, or use the arrows. The next build is always waiting behind the current one.</p>
          </div>
        </div>
      </div>

      <div className="border-t-4 border-[#080808] bg-[#ff5c00] px-5 py-4 sm:px-7">
        <div className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#080808] sm:flex-row sm:items-center sm:justify-between" style={mono}>
          <span>04 builds · 04 different problems · one full-stack loop</span>
          <span>Swipe → inspect → open → move on</span>
        </div>
      </div>
    </div>
  );
}
