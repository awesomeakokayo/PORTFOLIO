import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Check, Layers3 } from "lucide-react";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };

const showcases = [
  {
    name: "OpenBooks NG",
    type: "Business software · Production",
    summary: "A Nigeria-first digital business notebook for small businesses and freelancers.",
    details: "A production full-stack business management platform that helps owners record sales, manage customers, create invoices, track payments and expenses, and keep clear business records in one simple workspace.",
    points: ["Business workspaces, customers, sales, invoices and expenses", "Flexible payment methods including bank transfer, cash, POS and Paystack", "Public invoices, payment records, receipts, audit events, rate limiting, security headers and webhook protection"],
    live: "https://www.openbooks.click",
  },
  {
    name: "NaviPro",
    type: "AI product · Built",
    summary: "An AI career mentor that turns career goals into practical learning roadmaps.",
    details: "A career platform combining conversational guidance, structured roadmap generation and context-relevant learning resources rather than treating AI as a simple chatbot layer.",
    points: ["Personalized learning roadmaps", "Conversational AI mentorship", "YouTube Data API-powered learning resources and retrieval workflows"],
  },
  {
    name: "Tech Skills Hub",
    type: "SaaS / EdTech · Live",
    summary: "A structured technical learning platform focused on accessible education for African developers.",
    details: "A full-stack learning product with onboarding, guided tracks, content delivery, authenticated progress, paid access and cross-device synchronization.",
    points: ["Guided learning tracks and progress tracking", "Auth.js, Prisma and Neon PostgreSQL", "Paystack billing and production deployment on Vercel"],
    live: "https://techskillhub.cv",
  },
  {
    name: "Southwest Flood Monitor",
    type: "Civic technology · Built",
    summary: "A community flood-reporting mobile app using AI-assisted image analysis.",
    details: "A cross-platform civic reporting product designed to help communities submit flood information while using AI to support report verification.",
    points: ["React Native + Expo mobile experience", "FastAPI and PostgreSQL backend", "Gemini-assisted image analysis for community reports"],
  },
  {
    name: "EmoHabit",
    type: "Mobile · In development",
    summary: "A habit companion that looks at the person behind the streak.",
    details: "A mobile product exploring how emotions influence consistency, with a focus on patterns and sustainable progress rather than simply counting completed days.",
    points: ["Emotion-aware habit tracking", "Firebase authentication", "Streak engine with grace days and freeze-token logic"],
  },
  {
    name: "Coal City University Journal",
    type: "Academic · Live",
    summary: "A manuscript submission and academic publishing platform.",
    details: "A full-stack publication system covering author submission, authentication, editorial review, verification, editing, approval and publication workflows.",
    points: ["PostgreSQL schema and REST API design", "Responsive frontend and role-based publication workflow", "FastAPI backend deployed on Render"],
    live: "https://journal-nine-ruby.vercel.app",
  },
  {
    name: "Blancquake Foundation",
    type: "Non-profit · Live",
    summary: "A public-facing digital platform for advocacy, awareness and community impact.",
    details: "A mission-led website designed to communicate the foundation's work clearly, build trust and give visitors a simple path to learn more and get involved.",
    points: ["Mission-led information architecture", "Responsive public-facing experience", "Built to support awareness and engagement"],
    live: "https://blancquake.org",
  },
];

const labels = ["PRODUCT THINKING", "WEB", "MOBILE", "AI", "BACKEND", "DEPLOYMENT", "SECURITY", "TESTING", "PRODUCT THINKING", "WEB", "MOBILE", "AI", "BACKEND", "DEPLOYMENT"];

export default function ProjectShowcase() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onMove = (event) => {
      const rect = track.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      track.style.setProperty("--pointer-shift", `${x * 10}px`);
    };

    track.addEventListener("pointermove", onMove);
    return () => track.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div className="space-y-5">
        {showcases.map((project, index) => (
          <article
            key={project.name}
            className={`project-showcase-card project-accent-${index % 3} rounded-[24px] border border-white/10 p-6 sm:p-8 lg:p-9`}
          >
            <div className="relative flex flex-col gap-8 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#ff5c00]" style={mono}>{String(index + 1).padStart(2, "0")} / {project.type}</span>
                  {project.live && <span className="rounded-full border border-[#4ade80]/25 bg-[#4ade80]/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#4ade80]" style={mono}>Live</span>}
                </div>
                <h3 className="mt-8 text-4xl leading-[0.94] sm:text-5xl" style={display}>{project.name}</h3>
                <p className="mt-5 max-w-xl text-lg leading-7 text-[#f4f3ef] sm:text-xl">{project.summary}</p>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#f4f3ef] transition hover:text-[#ffb36b]" style={mono}>
                    Open the project <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>

              <div className="rounded-[20px] border border-white/10 bg-[#090909]/70 p-5 backdrop-blur-sm sm:p-6">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#73716a]" style={mono}>
                  <Layers3 className="h-4 w-4 text-[#ffb36b]" />
                  What I built
                </div>
                <p className="mt-4 text-sm leading-6 text-[#b8b7b1]">{project.details}</p>
                <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  {project.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm leading-6 text-[#f4f3ef]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#ffb36b]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-full border border-white/10 bg-[#0b0b0b] py-3">
        <div ref={trackRef} className="marquee-track flex w-max items-center gap-7 whitespace-nowrap px-5" style={{ transform: "translateX(var(--pointer-shift, 0px))" }}>
          {labels.map((label, index) => (
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
