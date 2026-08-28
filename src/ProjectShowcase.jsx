import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Check, Layers3 } from "lucide-react";

const display = { fontFamily: "'Ojuju', sans-serif" };
const mono = { fontFamily: "'Space Mono', monospace" };

const showcases = [
  {
    name: "TechSkillHub",
    type: "EdTech · Live",
    summary: "A free technology learning platform built for African learners.",
    details: "Structured learning paths, practical content, progress tracking, and a product experience designed to help people keep moving.",
    points: ["18 structured learning tracks", "Practical, beginner-friendly learning", "Live product with payments and accounts"],
    live: "https://techskillhub.cv",
  },
  {
    name: "EmoHabit",
    type: "Health · In development",
    summary: "A habit companion that looks at the person behind the streak.",
    details: "The product explores how emotions influence consistency, helping people notice patterns instead of simply counting completed days.",
    points: ["Emotion-aware habit tracking", "Pattern-focused progress view", "Mobile-first product experience"],
  },
  {
    name: "NaviPro",
    type: "Career · MVP built",
    summary: "AI-powered career guidance for people trying to figure out their next move.",
    details: "A career mentorship product designed to make useful direction, planning, and decision support more accessible.",
    points: ["AI career guidance", "Goal and direction support", "Designed as a practical product, not a chatbot demo"],
  },
  {
    name: "Blancquake Foundation",
    type: "Non-profit · Live",
    summary: "A digital platform for a foundation focused on advocacy, awareness, and community impact.",
    details: "A public-facing website designed to communicate the foundation's mission clearly, build trust, and give visitors a simple path to learn more and get involved.",
    points: ["Mission-led information architecture", "Responsive public-facing experience", "Built to support awareness and engagement"],
    live: "https://blancquake.org",
  },
  {
    name: "Coal City University Journal",
    type: "Academic · Live",
    summary: "A digital publishing platform built for the Coal City University academic community.",
    details: "A university journal experience that brings academic publishing online with a clear structure for discovering journal content and navigating published work.",
    points: ["Academic journal publishing workflow", "Structured publication and article browsing", "University-focused digital experience"],
    live: "https://journal-nine-ruby.vercel.app",
  },
];

const labels = ["PRODUCT THINKING", "WEB", "MOBILE", "AI", "BACKEND", "DEPLOYMENT", "PRODUCT THINKING", "WEB", "MOBILE", "AI", "BACKEND", "DEPLOYMENT"];

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
