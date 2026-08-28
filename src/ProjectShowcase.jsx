import React from "react";
import { ArrowUpRight, Check } from "lucide-react";

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
];

export default function ProjectShowcase() {
  return (
    <div className="space-y-5">
      {showcases.map((project, index) => (
        <article key={project.name} className="rounded-[24px] border border-white/10 bg-[#10100f] p-6 sm:p-8 lg:p-9 transition duration-300 hover:border-[#ff5c00]/35 hover:bg-[#121210]">
          <div className="flex flex-col gap-7 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#ff5c00]" style={mono}>{String(index + 1).padStart(2, "0")} / {project.type}</span>
                {project.live && <span className="rounded-full border border-[#4ade80]/25 bg-[#4ade80]/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#4ade80]" style={mono}>Live</span>}
              </div>
              <h3 className="mt-8 text-4xl leading-[0.94] sm:text-5xl" style={display}>{project.name}</h3>
              <p className="mt-5 max-w-xl text-lg leading-7 text-[#f4f3ef] sm:text-xl">{project.summary}</p>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#f4f3ef] hover:text-[#ff5c00]" style={mono}>
                  Open the product <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
            <div className="rounded-[20px] border border-white/10 bg-[#0a0a09] p-5 sm:p-6">
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#67665f]" style={mono}>What I built</div>
              <p className="mt-4 text-sm leading-6 text-[#b8b7b1]">{project.details}</p>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                {project.points.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm leading-6 text-[#f4f3ef]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#ff5c00]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
