import React from "react";

const skinTones = {
  warm: "#C98B5A",
  deep: "#6B3E2E",
  golden: "#E2AA72",
  dark: "#9B6042",
};

export function BlockCharacter({
  skin = "golden",
  shirt = "#ff5c00",
  accent = "#f4f3ef",
  prop = "laptop",
  scale = 1,
  className = "",
}) {
  const tone = skinTones[skin] || skinTones.golden;

  return (
    <div
      className={className}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
      }}
    >
      <svg viewBox="0 0 120 170" role="img" aria-label="Block character illustration" className="h-full w-full overflow-visible">
        <g stroke="#080808" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="60" cy="32" r="21" fill={tone} />
          <path d="M48 30c4-7 20-11 29-2" fill="none" />
          <circle cx="52" cy="34" r="2.5" fill="#080808" stroke="none" />
          <circle cx="68" cy="34" r="2.5" fill="#080808" stroke="none" />

          <rect x="31" y="57" width="58" height="52" rx="9" fill={shirt} />
          <path d="M31 67L17 83M89 67l14 13" fill="none" stroke={tone} strokeWidth="11" />
          <path d="M47 109v32M73 109v32" fill="none" stroke={tone} strokeWidth="13" />
          <path d="M41 144h13M66 144h13" fill="none" stroke="#080808" strokeWidth="7" />

          {prop === "laptop" && (
            <g>
              <rect x="36" y="78" width="48" height="28" rx="3" fill="#f4f3ef" />
              <rect x="41" y="83" width="38" height="18" rx="2" fill="#232323" stroke="none" />
              <path d="M31 108h58l-5 7H36z" fill={accent} />
            </g>
          )}

          {prop === "phone" && (
            <g>
              <rect x="78" y="78" width="17" height="31" rx="3" fill="#f4f3ef" />
              <rect x="81" y="82" width="11" height="21" rx="1" fill="#232323" stroke="none" />
            </g>
          )}

          {prop === "box" && (
            <g>
              <rect x="77" y="81" width="25" height="24" fill="#f4f3ef" />
              <path d="M77 88h25M89 81v24" fill="none" stroke="#080808" strokeWidth="3" />
            </g>
          )}

          {prop === "pen" && (
            <g>
              <path d="M82 77l18 18" stroke={accent} strokeWidth="7" />
              <path d="M79 74l5 5" stroke={accent} strokeWidth="4" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

function Brick({ className = "", color = "#ff5c00", wide = false }) {
  return (
    <div
      className={className}
      style={{
        width: wide ? 74 : 34,
        height: 24,
        background: color,
        border: "3px solid #080808",
        borderRadius: 7,
        boxShadow: "0 6px 0 #080808",
      }}
    >
      <span
        style={{
          display: "block",
          width: 8,
          height: 8,
          margin: "5px 0 0 9px",
          borderRadius: 2,
          border: "2px solid #080808",
          background: "#f4f3ef",
          opacity: 0.7,
        }}
      />
    </div>
  );
}

export function HeroBuildScene() {
  return (
    <div className="block-world relative mx-auto w-full max-w-[560px] select-none">
      <div className="relative overflow-hidden border-4 border-[#080808] bg-[#f4f3ef] p-5 shadow-[0_14px_0_#080808] sm:p-7">
        <div className="flex items-center justify-between border-b-2 border-[#080808] pb-3">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>
            Awesome's workbench
          </span>
          <span className="rounded-full border-2 border-[#080808] bg-[#ff5c00] px-2.5 py-1 text-[9px] font-bold uppercase text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>
            live
          </span>
        </div>

        <div className="relative mt-5 min-h-[300px] overflow-hidden border-2 border-[#080808] bg-[#ff5c00] px-3 pb-1 pt-7 sm:min-h-[340px]">
          <div className="absolute left-4 top-4"><Brick color="#080808" wide /></div>
          <div className="absolute right-8 top-10 rotate-3"><Brick color="#9FE0C1" /></div>
          <div className="absolute right-20 top-8 rotate-[-6deg]"><Brick color="#f4f3ef" /></div>

          <div className="relative flex h-[270px] items-end justify-center gap-1 sm:h-[305px] sm:gap-4">
            <div className="h-48 w-24 sm:h-56 sm:w-28"><BlockCharacter skin="warm" shirt="#080808" prop="box" /></div>
            <div className="h-60 w-28 sm:h-72 sm:w-32"><BlockCharacter skin="golden" shirt="#f4f3ef" prop="laptop" /></div>
            <div className="h-52 w-24 sm:h-60 sm:w-28"><BlockCharacter skin="deep" shirt="#9FE0C1" prop="phone" /></div>
            <div className="hidden h-44 w-24 sm:block"><BlockCharacter skin="dark" shirt="#f4f3ef" prop="pen" /></div>
          </div>

          <div className="absolute bottom-2 left-3 right-3 flex gap-2">
            {["IDEA", "BUILD", "SHIP"].map((label, index) => (
              <div
                key={label}
                className="flex-1 border-2 border-[#080808] px-2 py-2 text-center text-[9px] font-bold tracking-[0.15em] text-[#080808]"
                style={{ background: index === 1 ? "#9FE0C1" : "#f4f3ef", fontFamily: "'Space Mono', monospace" }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>
          <span className="border-2 border-[#080808] bg-[#080808] px-2 py-1 text-[#f4f3ef]">Web</span>
          <span className="border-2 border-[#080808] bg-[#f4f3ef] px-2 py-1">Mobile</span>
          <span className="border-2 border-[#080808] bg-[#9FE0C1] px-2 py-1">AI</span>
          <span className="ml-auto">from brief → browser</span>
        </div>
      </div>
    </div>
  );
}

export function ContactBuildScene() {
  return (
    <div className="relative overflow-hidden border-4 border-[#080808] bg-[#9FE0C1] p-5 shadow-[0_12px_0_#080808] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>Build a thing</p>
          <p className="mt-2 max-w-sm text-3xl leading-none text-[#080808]" style={{ fontFamily: "'Ojuju', sans-serif" }}>Tell me what is missing.</p>
        </div>
        <div className="border-2 border-[#080808] bg-[#ff5c00] px-3 py-2 text-[9px] font-bold uppercase text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>
          01
        </div>
      </div>

      <div className="mt-6 flex items-end gap-4">
        <div className="h-44 w-28 shrink-0 sm:h-52 sm:w-32">
          <BlockCharacter skin="warm" shirt="#ff5c00" prop="phone" />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div className="border-2 border-[#080808] bg-[#f4f3ef] p-4">
            <p className="text-[9px] uppercase tracking-[0.14em] text-[#666]" style={{ fontFamily: "'Space Mono', monospace" }}>Your idea</p>
            <p className="mt-2 text-sm font-semibold text-[#080808]">Website, web app, mobile product or AI workflow.</p>
          </div>
          <div className="flex gap-2">
            <Brick color="#080808" wide />
            <Brick color="#ff5c00" />
            <Brick color="#f4f3ef" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloodIllustration() {
  return (
    <div className="border-4 border-[#080808] bg-[#d8f1e4] p-4 shadow-[0_10px_0_#080808]">
      <div className="flex items-center justify-between border-b-2 border-[#080808] pb-3">
        <span className="text-[9px] uppercase tracking-[0.14em] text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>Workflow illustration</span>
        <span className="border-2 border-[#080808] bg-[#ff5c00] px-2 py-1 text-[8px] font-bold text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>REPORT</span>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_92px] gap-4">
        <div className="relative min-h-[220px] border-2 border-[#080808] bg-[#9FE0C1] p-3">
          <div className="absolute left-5 top-5 h-24 w-24 rounded-[46%] border-2 border-[#080808] bg-[#f4f3ef]" />
          <div className="absolute bottom-7 left-12 h-20 w-36 rotate-[-8deg] rounded-[42%] border-2 border-[#080808] bg-[#ff5c00]" />
          {[["23%","32%"],["58%","22%"],["68%","67%"],["36%","76%"]].map(([left,top], i)=>(
            <span key={i} className="absolute flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#080808] bg-[#f4f3ef] text-[8px] font-bold text-[#080808]" style={{ left, top, transform:"translate(-50%,-50%)", fontFamily:"'Space Mono', monospace" }}>
              {i+1}
            </span>
          ))}
          <div className="absolute bottom-3 left-3 right-3 border-2 border-[#080808] bg-[#080808] px-2 py-2 text-[8px] text-[#f4f3ef]" style={{ fontFamily: "'Space Mono', monospace" }}>
            PHOTO + GPS + REPORT
          </div>
        </div>
        <div className="relative border-2 border-[#080808] bg-[#080808] p-2">
          <div className="mx-auto h-28 w-[58px] rounded-xl border-4 border-[#f4f3ef] bg-[#9FE0C1]">
            <div className="m-2 h-8 rounded border-2 border-[#080808] bg-[#ff5c00]" />
            <div className="mx-2 mt-2 h-3 rounded border-2 border-[#080808] bg-[#f4f3ef]" />
            <div className="mx-2 mt-2 h-10 rounded border-2 border-[#080808] bg-[#f4f3ef]" />
          </div>
          <div className="mt-3 text-center text-[8px] uppercase tracking-[0.12em] text-[#f4f3ef]" style={{ fontFamily: "'Space Mono', monospace" }}>AI assist</div>
        </div>
      </div>
    </div>
  );
}

export function AgencyIllustration() {
  return (
    <div className="border-4 border-[#080808] bg-[#f4f3ef] p-4 shadow-[0_10px_0_#080808]">
      <div className="flex items-center justify-between border-b-2 border-[#080808] pb-3">
        <span className="text-[9px] uppercase tracking-[0.14em] text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>Brand / conversion</span>
        <span className="text-[9px] font-bold text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>ELROI HUB</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1.15fr_.85fr]">
        <div className="border-2 border-[#080808] bg-[#ff5c00] p-5">
          <p className="text-[9px] uppercase tracking-[0.14em] text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>Position</p>
          <p className="mt-3 text-4xl leading-[0.9] text-[#080808]" style={{ fontFamily: "'Ojuju', sans-serif" }}>Make the business easy to trust.</p>
        </div>
        <div className="grid gap-3">
          {["Services", "Proof", "Strategy call"].map((item, index) => (
            <div key={item} className="border-2 border-[#080808] bg-white p-3 text-[10px] font-bold uppercase text-[#080808]" style={{ fontFamily: "'Space Mono', monospace" }}>
              <span className="mr-2 text-[#ff5c00]">0{index + 1}</span>{item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
