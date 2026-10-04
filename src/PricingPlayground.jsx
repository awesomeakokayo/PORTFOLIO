import React, { useState } from "react";
import { ArrowRight, Check, LockKeyhole, Sparkles } from "lucide-react";

const options = [
  {
    id: "website",
    label: "Website",
    kicker: "Sell the first impression",
    price: "From ₦500,000",
    intl: "International from $1,500",
    copy: "For company sites, service businesses, landing pages and marketing experiences that need to turn attention into enquiries.",
    includes: ["Custom visual system", "Responsive build", "Enquiry flow + SEO foundations"],
  },
  {
    id: "product",
    label: "Web product",
    kicker: "Build something people use",
    price: "From ₦1,500,000",
    intl: "International quoted from scope",
    copy: "For SaaS products, dashboards, portals and internal tools where the website is also the product.",
    includes: ["Frontend + backend", "Authentication + data", "APIs + production deployment"],
  },
  {
    id: "mobile",
    label: "Mobile + AI",
    kicker: "Put the product in their hands",
    price: "From ₦2,000,000",
    intl: "International quoted from scope",
    copy: "For cross-platform apps, AI workflows and products with more moving parts.",
    includes: ["Product architecture", "Mobile / AI integrations", "Launch + refinement"],
  },
];

export default function PricingPlayground() {
  const [selected, setSelected] = useState(null);
  const [complete, setComplete] = useState(false);
  const active = options.find((item) => item.id === selected);

  const choose = (item) => {
    setSelected(item.id);
    setComplete(true);
  };

  return (
    <div className="overflow-hidden border-4 border-[#080808] bg-[#ff5c00] shadow-[0_12px_0_#080808]">
      <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="border-b-4 border-[#080808] bg-[#f4f3ef] p-6 text-[#080808] sm:p-8 lg:border-b-0 lg:border-r-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{fontFamily:"'Space Mono', monospace"}}>Build your project</p>
            <span className="border-2 border-[#080808] bg-[#9FE0C1] px-2 py-1 text-[9px] font-bold uppercase" style={{fontFamily:"'Space Mono', monospace"}}>01 / 03</span>
          </div>
          <h3 className="mt-5 max-w-xl text-4xl leading-[0.92] sm:text-5xl" style={{fontFamily:"'Ojuju', sans-serif"}}>Pick the thing you want to put into the world.</h3>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#4e4c47]">Choose one. I’ll open the matching starting point instead of throwing three anonymous price cards at you.</p>

          <div className="mt-7 grid gap-3">
            {options.map((item, index) => {
              const isActive = item.id === selected;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => choose(item)}
                  className={`group flex items-center gap-4 border-2 border-[#080808] px-4 py-4 text-left transition ${isActive ? "bg-[#080808] text-[#f4f3ef] shadow-[0_5px_0_#9FE0C1]" : "bg-[#f4f3ef] text-[#080808] hover:-translate-y-1 hover:bg-[#9FE0C1]"}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#080808] text-[10px] font-bold ${isActive ? "bg-[#ff5c00]" : "bg-[#ff5c00]"}`} style={{fontFamily:"'Space Mono', monospace"}}>0{index + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-lg leading-none" style={{fontFamily:"'Ojuju', sans-serif"}}>{item.label}</span>
                    <span className={`mt-1 block text-[10px] uppercase tracking-[0.1em] ${isActive ? "text-[#b8b7b1]" : "text-[#6c6962]"}`} style={{fontFamily:"'Space Mono', monospace"}}>{item.kicker}</span>
                  </span>
                  <ArrowRight className={`ml-auto h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${isActive ? "text-[#ffb36b]" : "text-[#66615b]"}`} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 text-[#080808]">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{fontFamily:"'Space Mono', monospace"}}>{complete ? "Unlocked starting point" : "Locked"}</span>
            <span className="flex items-center gap-2 border-2 border-[#080808] bg-[#f4f3ef] px-2.5 py-1.5 text-[9px] font-bold uppercase" style={{fontFamily:"'Space Mono', monospace"}}><Sparkles className="h-3.5 w-3.5"/> Your turn</span>
          </div>

          <div className="mt-5 min-h-[220px] sm:min-h-[260px] sm:min-h-[310px] border-4 border-[#080808] bg-[#080808] p-5 text-[#f4f3ef] shadow-[0_7px_0_#f4f3ef] sm:p-7">
            {!active ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                <LockKeyhole className="h-10 w-10 text-[#ff5c00]" />
                <p className="mt-5 max-w-sm text-3xl leading-none" style={{fontFamily:"'Ojuju', sans-serif"}}>Choose a build to open the drawer.</p>
                <div className="mt-5 border-2 border-[#f4f3ef]/20 px-3 py-2 text-[9px] uppercase tracking-[0.15em] text-[#9c9b94]" style={{fontFamily:"'Space Mono', monospace"}}>No mystery quote. Just a clearer starting point.</div>
              </div>
            ) : (
              <div className="animate-[drawerIn_.35s_ease-out_both]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#ffb36b]" style={{fontFamily:"'Space Mono', monospace"}}>{active.kicker}</p>
                    <h4 className="mt-3 text-5xl leading-[0.88] sm:text-6xl" style={{fontFamily:"'Ojuju', sans-serif"}}>{active.price}</h4>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#73716a]" style={{fontFamily:"'Space Mono', monospace"}}>{active.intl}</p>
                  </div>
                  <div className="border-2 border-[#080808] bg-[#9FE0C1] px-3 py-2 text-[9px] font-bold uppercase text-[#080808]" style={{fontFamily:"'Space Mono', monospace"}}>Unlocked</div>
                </div>
                <p className="mt-7 max-w-xl text-sm leading-7 text-[#b8b7b1]">{active.copy}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {active.includes.map((item) => (
                    <div key={item} className="border-2 border-white/15 bg-[#111] p-3">
                      <Check className="h-4 w-4 text-[#9FE0C1]" />
                      <p className="mt-3 text-[11px] leading-5 text-[#f4f3ef]" style={{fontFamily:"'Space Mono', monospace"}}>{item}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="mt-7 inline-flex items-center gap-2 border-2 border-[#080808] bg-[#ff5c00] px-5 py-3 text-xs font-bold text-[#080808] shadow-[0_5px_0_#f4f3ef]" style={{fontFamily:"'Space Mono', monospace"}}>Start with this <ArrowRight className="h-4 w-4"/></a>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.14em] text-[#080808]" style={{fontFamily:"'Space Mono', monospace"}}>
            <span className="h-2 w-2 border-2 border-[#080808] bg-[#9FE0C1]" />
            Pick your build first. We scope the final quote together.
          </div>
        </div>
      </div>
    </div>
  );
}
