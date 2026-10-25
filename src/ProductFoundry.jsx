import React, { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./ProductFoundry.css";

const zones = [
  { id: "work", number: "01", label: "The workshop", short: "SELECTED WORK", hint: "Products made real", x: 0 },
  { id: "systems", number: "02", label: "The engine room", short: "HOW I BUILD", hint: "What lives underneath", x: 1 },
  { id: "about", number: "03", label: "The architect", short: "ABOUT ME", hint: "The person behind it", x: 2 },
  { id: "contact", number: "04", label: "The next doorway", short: "CONTACT", hint: "Something we can build", x: 3 }
];

const projects = [
  {
    number: "01",
    name: "OpenBooks",
    type: "Business product",
    status: "Live product",
    role: "Product engineering",
    image: "/projects/openbooks-cover.webp",
    imageAlt: "OpenBooks business cashbook interface",
    imageMode: "cover",
    summary: "A Nigeria-first cashbook for invoices, payments, expenses and customer records.",
    tags: ["Business tools", "Money tracking", "Records"],
    url: "https://www.openbooks.click",
    linkLabel: "Open the product",
    note: "The goal is to make everyday business records easier to keep without burying simple tasks inside heavyweight accounting software. The product centres on clear transaction history and straightforward money-in and money-out workflows."
  },
  {
    number: "02",
    name: "TechSkillHub",
    type: "Learning platform",
    status: "Live product",
    role: "Founder · Full-stack",
    image: "/projects/tech-skill-hub.webp",
    imageAlt: "TechSkillHub learning platform interface",
    imageMode: "cover",
    summary: "A learning academy that gives beginners structured tracks, practical roadmaps and a clearer way to make progress.",
    tags: ["Next.js", "PostgreSQL", "Learning systems"],
    url: "https://techskillhub.cv",
    linkLabel: "Visit the platform",
    note: "The product responds to a familiar problem: beginners can find endless resources online but struggle to understand what to learn next. The experience organises learning around guided tracks, practical projects and saved progress."
  },
  {
    number: "03",
    name: "Southwest Flood Monitor",
    type: "Civic technology",
    status: "Built project",
    role: "Mobile + backend",
    image: "/projects/flood-monitor.webp",
    imageAlt: "Southwest Flood Monitor mobile reporting interface",
    imageMode: "contain",
    summary: "A mobile reporting experience for community flood incidents, supported by AI-assisted image analysis and a structured backend.",
    tags: ["React Native", "FastAPI", "AI-assisted reports"],
    url: "https://github.com/awesomeakokayo/Flood-Report-App",
    linkLabel: "Explore the code",
    note: "This project connects a field reporting flow with a structured API and data layer. AI-assisted image analysis supports the report experience; it is one part of the workflow, not a substitute for clear reporting and review."
  },
  {
    number: "04",
    name: "Elroi Hub",
    type: "Client website",
    status: "Live website",
    role: "Frontend development",
    image: "/projects/elroi-hub.webp",
    imageAlt: "Elroi Hub agency website",
    imageMode: "cover",
    summary: "A brand-led agency website that brings services, proof and a clear path to enquire into one composed experience.",
    tags: ["Responsive UI", "Brand systems", "Web"],
    url: "https://www.elroihubllc.com/",
    linkLabel: "Visit the website",
    note: "The focus here is translating a brand into a useful web experience. Clear service structure, considered visual hierarchy and an easy route to enquiry matter as much as the visual treatment."
  }
];

const buildSteps = [
  {
    number: "01",
    title: "Read the terrain",
    summary: "Understand the people, the friction and the real problem.",
    detail: "Before opening an editor, I work to understand who the product is for, what is getting in their way, and what success should look like. The first responsibility is to solve the right problem."
  },
  {
    number: "02",
    title: "Draw the structure",
    summary: "Shape the experience, data and architecture together.",
    detail: "I turn an unclear idea into clear flows, a suitable system design and a realistic plan. Good structure helps a product feel simple on the surface and remain understandable underneath."
  },
  {
    number: "03",
    title: "Build the living system",
    summary: "Connect interface, APIs, data and integrations.",
    detail: "Frontend, backend, data and product behaviour have to work together. AI is useful when it solves a real problem, but engineering judgement, testing and ownership remain with the builder."
  },
  {
    number: "04",
    title: "Test the real world",
    summary: "Validate the awkward cases, then ship deliberately.",
    detail: "I check the important journeys, error states, accessibility and performance before release. A convincing demo is a beginning; a useful product needs to hold up when people depend on it."
  }
];

function Arrow({ diagonal = false, size = 16 }) {
  return diagonal ? (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EntryPortal({ onEnter, entering }) {
  return (
    <section className={"bp-entry" + (entering ? " is-entering" : "")} aria-label="Enter the blueprint world">
      <div className="bp-entry-grain" aria-hidden="true" />
      <header className="bp-entry-header">
        <a href="#top" className="bp-entry-brand" aria-label="Awesome Akokayo home">
          <span className="bp-entry-monogram">A.</span>
          <span>AWESOME AKOKAYO<small>INDEPENDENT PRODUCT ENGINEER</small></span>
        </a>
        <span className="bp-entry-index">EXPERIMENT 001 <i /> PORTFOLIO / 2026</span>
      </header>

      <div className="bp-entry-grid">
        <div className="bp-entry-copy">
          <p className="bp-entry-kicker"><span /> AN INVITATION TO EXPLORE</p>
          <h1>A world is hidden <span>in every idea.</span></h1>
          <p className="bp-entry-description">Beyond the interface is a structure. Beyond the structure is a possibility. Step inside and see what can be built.</p>
          <div className="bp-entry-actions">
            <button className="bp-enter-button" type="button" onClick={onEnter}>
              <span>STEP INTO THE BLUEPRINT</span><Arrow diagonal size={16} />
            </button>
            <button className="bp-skip-button" type="button" onClick={() => onEnter(true)}>Skip the introduction</button>
          </div>
          <p className="bp-entry-footnote">A PORTFOLIO YOU CAN MOVE THROUGH, NOT JUST SCROLL.</p>
        </div>

        <div className="bp-entry-art" aria-hidden="true">
          <div className="bp-entry-coordinate bp-coordinate-top">X 024.80 / Y 090.14</div>
          <div className="bp-entry-paper">
            <svg viewBox="0 0 760 700" role="presentation">
              <defs>
                <pattern id="bp-entry-grid" width="22" height="22" patternUnits="userSpaceOnUse">
                  <path d="M22 0H0V22" fill="none" stroke="#2661d8" strokeWidth=".65" opacity=".34" />
                </pattern>
                <linearGradient id="bp-paper-shadow" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="1" stopColor="#e5edff" />
                </linearGradient>
              </defs>
              <path d="M130 70 560 40 686 568 220 645Z" fill="url(#bp-paper-shadow)" stroke="#9db6ee" strokeWidth="1.5" />
              <path d="M130 70 560 40 686 568 220 645Z" fill="url(#bp-entry-grid)" />
              <g fill="none" stroke="#2058d3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M222 503V276L398 169 574 276V503Z" strokeWidth="2.4" />
                <path d="M254 503V294L398 208 542 294V503Z" strokeWidth="1.7" />
                <path d="M287 503V312L398 246 509 312V503Z" strokeWidth="1.3" />
                <path d="M222 276 398 376 574 276M398 169V376M398 376V503" strokeWidth="1.5" />
                <path d="M254 294 398 376 542 294M287 312 398 376 509 312" strokeWidth="1.15" />
                <path d="M330 231V503M466 231V503M287 375H509M254 421H542M222 465H574" strokeWidth=".95" opacity=".8" />
                <path d="M180 535H610M194 545H590M200 554H594" strokeWidth="1" opacity=".8" />
                <path d="M190 267 190 512M184 267H196M184 512H196M610 268V511M604 268H616M604 511H616" strokeWidth=".9" />
                <path d="M222 256 574 256M222 250V262M574 250V262" strokeWidth=".9" />
                <path d="M398 150V129M386 139H410M610 240 633 228M626 221 640 235" strokeWidth="1" />
                <path d="M238 287 251 281M238 304 251 298M550 288 563 282M550 305 563 299" strokeWidth="1" />
                <path d="M302 490h53m-53 6h36m56-7h42m-42 6h30" strokeWidth="2" />
              </g>
              <g fill="#2058d3" fontFamily="monospace" fontSize="11" letterSpacing="1.5">
                <text x="157" y="94">PROTOTYPE / 001</text>
                <text x="485" y="94">SECTION A—A</text>
                <text x="154" y="573">FOUNDATION / IDEA</text>
                <text x="493" y="592">SCALE 1:100</text>
                <text x="409" y="137">+12.40</text>
                <text x="618" y="259">N</text>
              </g>
              <g fill="none" stroke="#2058d3" strokeWidth="1">
                <circle cx="398" cy="376" r="8" />
                <circle cx="398" cy="376" r="17" strokeDasharray="2 5" />
                <path d="M398 359V343M381 376H365M415 376H431M398 393V409" />
              </g>
              <g transform="translate(130 520) rotate(-5)">
                <rect width="44" height="44" fill="#f5b75f" stroke="#2058d3" />
                <path d="M10 22h24M22 10v24" stroke="#2058d3" strokeWidth="1.5" />
              </g>
            </svg>
            <div className="bp-entry-person">
              <span className="bp-person-head" />
              <span className="bp-person-body" />
              <span className="bp-person-leg bp-leg-left" />
              <span className="bp-person-leg bp-leg-right" />
            </div>
            <div className="bp-entry-paper-label">YOU ARE HERE <span>→</span></div>
          </div>
          <div className="bp-entry-coordinate bp-coordinate-bottom">DRAWING ROOM / NOT TO SCALE</div>
        </div>
      </div>

      <footer className="bp-entry-footer">
        <span>IDEAS / SYSTEMS / WORKING SOFTWARE</span>
        <span>SCROLLING IS OPTIONAL. CURIOSITY IS NOT.</span>
      </footer>
    </section>
  );
}

function ArchitectureBackground({ focus }) {
  return (
    <svg className="bp-architecture" data-focus={focus || "overview"} viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="bp-paper-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#2c61ce" strokeWidth=".5" opacity=".21" />
        </pattern>
        <pattern id="bp-small-grid" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M6 0H0V6" fill="none" stroke="#2c61ce" strokeWidth=".45" opacity=".16" />
        </pattern>
        <linearGradient id="bp-horizon-glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".56" stopColor="#fff" stopOpacity=".83" />
          <stop offset="1" stopColor="#dce8ff" stopOpacity=".02" />
        </linearGradient>
      </defs>
      <rect width="1440" height="820" fill="#f8fbff" />
      <rect width="1440" height="820" fill="url(#bp-paper-grid)" />
      <path d="M0 0H1440V820H0Z" fill="url(#bp-small-grid)" opacity=".35" />
      <path d="M0 0H1440V460L720 278 0 460Z" fill="#fdfefe" opacity=".78" />
      <path d="M0 0 720 284 1440 0M0 96 720 284 1440 96M0 198 720 284 1440 198" fill="none" stroke="#2a60cf" strokeWidth="1" opacity=".23" />
      <path d="M0 0V820M72 0V820M144 0V820M216 0V820M288 0V820M360 0V820M432 0V820M504 0V820M576 0V820M648 0V820M720 0V820M792 0V820M864 0V820M936 0V820M1008 0V820M1080 0V820M1152 0V820M1224 0V820M1296 0V820M1368 0V820M1440 0V820" stroke="#2a60cf" strokeWidth=".6" opacity=".12" />
      <path d="M0 470 720 284 1440 470V820H0Z" fill="#eef4ff" opacity=".64" />
      <path d="M0 470 720 284 1440 470M0 540 720 284 1440 540M0 620 720 284 1440 620M0 725 720 284 1440 725" fill="none" stroke="#245ccc" strokeWidth="1" opacity=".27" />
      <g fill="none" stroke="#245ccc" strokeWidth=".9" opacity=".42">
        <path d="M-60 820 720 284 1500 820M70 820 720 284 1370 820M205 820 720 284 1235 820M350 820 720 284 1090 820M500 820 720 284 940 820M660 820 720 284 780 820" />
        <path d="M-60 765Q720 648 1500 765M-60 705Q720 555 1500 705M-60 645Q720 480 1500 645M-60 592Q720 420 1500 592M-60 548Q720 360 1500 548M-60 510Q720 320 1500 510" />
      </g>
      <g className="bp-architecture-room" fill="none" stroke="#2058d3" strokeLinejoin="round">
        <path d="M0 120 336 207 336 638 0 820" strokeWidth="2" opacity=".55" />
        <path d="M0 188 270 254 270 668 0 820" strokeWidth="1.3" opacity=".42" />
        <path d="M0 280 200 329 200 710 0 820" strokeWidth="1.1" opacity=".42" />
        <path d="M0 355 140 389 140 745 0 820" strokeWidth=".9" opacity=".36" />
        <path d="M1440 120 1104 207 1104 638 1440 820" strokeWidth="2" opacity=".55" />
        <path d="M1440 188 1170 254 1170 668 1440 820" strokeWidth="1.3" opacity=".42" />
        <path d="M1440 280 1240 329 1240 710 1440 820" strokeWidth="1.1" opacity=".42" />
        <path d="M1440 355 1300 389 1300 745 1440 820" strokeWidth=".9" opacity=".36" />
        <path d="M0 120 720 285 1440 120M0 188 720 285 1440 188M0 280 720 285 1440 280" strokeWidth="1" opacity=".32" />
        <path d="M336 207 460 235 460 620 336 638M1104 207 980 235 980 620 1104 638" strokeWidth="1.3" opacity=".7" />
        <path d="M336 260H460M336 340H460M336 420H460M336 500H460M336 580H460M980 260H1104M980 340H1104M980 420H1104M980 500H1104M980 580H1104" strokeWidth=".8" opacity=".48" />
        <path d="M390 223V622M406 227V626M422 231V622M1034 223V622M1018 227V626M1002 231V622" strokeWidth=".75" opacity=".6" />
        <path d="M440 236 440 185 484 174 484 223M1000 236 1000 185 956 174 956 223" strokeWidth="1.2" />
        <path d="M0 120 0 0M1440 120V0M336 207V0M1104 207V0" strokeWidth="1" opacity=".3" />
      </g>
      <g className="bp-architecture-portal" fill="none" stroke="#1b53cb" strokeLinejoin="round">
        <path d="M438 690V328Q438 178 588 178H852Q1002 178 1002 328V690" strokeWidth="2.4" />
        <path d="M470 690V337Q470 210 597 210H843Q970 210 970 337V690" strokeWidth="1.6" />
        <path d="M507 690V347Q507 247 607 247H833Q933 247 933 347V690" strokeWidth="1.1" opacity=".8" />
        <path d="M548 690V359Q548 286 621 286H819Q892 286 892 359V690" strokeWidth="1" opacity=".65" />
        <path d="M438 470H1002M470 520H970M507 574H933M548 630H892" strokeWidth=".8" opacity=".5" />
        <path d="M588 178V285M852 178V285M607 247V319M833 247V319M621 286V346M819 286V346" strokeWidth=".85" opacity=".66" />
        <path d="M438 690 720 284 1002 690M470 690 720 284 970 690M507 690 720 284 933 690M548 690 720 284 892 690" strokeWidth=".75" opacity=".42" />
        <path d="M720 146V690M700 284H740M710 266H730M710 302H730" strokeWidth="1" strokeDasharray="5 6" opacity=".7" />
        <path d="M398 690H1042M414 701H1026M430 712H1010" strokeWidth="1" opacity=".6" />
        <path d="M430 329 438 329M430 346 438 346M1002 329H1010M1002 346H1010" strokeWidth="2" />
      </g>
      <g className="bp-architecture-annotation" fill="#2058d3" fontFamily="monospace" fontSize="10" letterSpacing="1.6" opacity=".76">
        <text x="36" y="48">CONCEPT / SPACE 001</text>
        <text x="1110" y="48">A—A / 1:100</text>
        <text x="40" y="790">FOUNDATION : IDEA</text>
        <text x="1110" y="790">STRUCTURE : POSSIBILITY</text>
        <text x="748" y="166">ENTRY / NORTH</text>
        <text x="109" y="325" transform="rotate(-14 109 325)">SYSTEMS</text>
        <text x="1189" y="325" transform="rotate(14 1189 325)">INTERFACE</text>
        <text x="705" y="754">YOU ARE HERE</text>
      </g>
      <g fill="none" stroke="#2058d3" strokeWidth="1" opacity=".7">
        <path d="M36 64H180M1260 64H1404M36 755H180M1260 755H1404" />
        <path d="M720 24V40M712 32H728M30 410H45M37 402V418M1395 410H1410M1402 402V418" />
        <circle cx="720" cy="284" r="7" strokeDasharray="2 3" />
        <circle cx="720" cy="284" r="18" strokeDasharray="1 7" />
      </g>
      <rect x="0" y="250" width="1440" height="220" fill="url(#bp-horizon-glow)" opacity=".45" />
    </svg>
  );
}

function PortalDrawing({ variant }) {
  const detail = {
    work: <><rect x="54" y="74" width="82" height="94" /><path d="M64 86h62M64 97h41M64 113h62M64 124h48M64 140h62M64 151h37" /><rect x="64" y="179" width="26" height="24" /><rect x="100" y="179" width="26" height="24" /></>,
    systems: <><path d="M60 91h68M94 91v24M65 115h58M94 115v24M65 139h58" /><circle cx="94" cy="91" r="7" /><circle cx="94" cy="115" r="7" /><circle cx="94" cy="139" r="7" /><path d="M68 166h52M68 175h35M68 184h44" /></>,
    about: <><circle cx="94" cy="101" r="17" /><path d="M67 147q27-33 54 0M72 160h44M80 173h28" /></>,
    contact: <><path d="M63 111l31-22 31 22v38l-31 22-31-22Z" /><path d="M63 111l31 22 31-22M94 133v38" /><circle cx="94" cy="133" r="6" /></>
  }[variant];

  return (
    <svg className="bp-node-drawing" viewBox="0 0 190 270" aria-hidden="true">
      <g className="bp-node-structure" fill="none" stroke="currentColor" strokeLinejoin="round">
        <path d="M18 244V83L95 25l77 58v161Z" strokeWidth="1.8" />
        <path d="M31 244V91L95 43l64 48v153Z" strokeWidth="1.2" />
        <path d="M43 244V100L95 61l52 39v144Z" strokeWidth=".9" opacity=".68" />
        <path d="M18 83 95 129l77-46M31 91l64 38 64-38M43 100l52 31 52-31M18 244l77-115 77 115" strokeWidth=".85" opacity=".68" />
        <path d="M18 144H172M31 172H159M43 202H147M95 25V244" strokeWidth=".8" opacity=".55" />
        <path d="M52 244V108M138 244V108M61 244V118M129 244V118" strokeWidth=".8" opacity=".48" />
        <path d="M9 244H181M0 254H190M25 264H165" strokeWidth=".85" opacity=".76" />
      </g>
      <g className="bp-node-inner" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {detail}
      </g>
      <g className="bp-node-marks" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".78">
        <path d="M18 69V56M12 62H24M172 69V56M166 62H178M95 13V2M89 8H101M95 255V267M89 261H101" />
        <circle cx="95" cy="129" r="5" strokeDasharray="2 3" />
      </g>
    </svg>
  );
}

function BlueprintNode({ zone, active, onClick }) {
  return (
    <button
      type="button"
      className={"bp-node bp-node--" + zone.id + (active ? " is-active" : "")}
      onClick={onClick}
      aria-label={"Enter " + zone.label + ": " + zone.hint}
      aria-pressed={active}
    >
      <span className="bp-node-annotation bp-node-annotation-top"><span>{zone.number}</span> / {zone.short}</span>
      <PortalDrawing variant={zone.id} />
      <span className="bp-node-title">{zone.label}<Arrow diagonal size={13} /></span>
      <span className="bp-node-hint">{zone.hint}</span>
    </button>
  );
}

function ProjectZone({ onClose }) {
  const [index, setIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const project = projects[index];

  useEffect(() => { setNotesOpen(false); }, [index]);

  return (
    <>
      <div className="bp-panel-eyebrow">SPACE 01 / THE WORKSHOP <span>FOCUS VIEW</span></div>
      <h2 className="bp-panel-title">Made real<span>.</span></h2>
      <p className="bp-panel-intro">Select an object in the workshop to inspect the problem, the product and the decisions behind it.</p>

      <div className="bp-project-visual">
        <span className="bp-project-stamp">{project.number} / SPECIMEN</span>
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            className={project.imageMode === "contain" ? "is-contained" : ""}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="bp-project-fallback" aria-hidden="true"><span>A.</span></div>
        )}
        <span className="bp-project-frame-corner" aria-hidden="true" />
      </div>

      <div className="bp-project-meta"><span>{project.type}</span><span className="bp-live-indicator">{project.status}</span></div>
      <p className="bp-project-role">{project.role}</p>
      <h3 className="bp-project-title">{project.name}</h3>
      <p className="bp-project-summary">{project.summary}</p>
      <div className="bp-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>

      <button className="bp-inline-action" type="button" aria-expanded={notesOpen} onClick={() => setNotesOpen((value) => !value)}>
        {notesOpen ? "Close the build notes" : "Inspect the build"} <Arrow size={14} />
      </button>
      {notesOpen && <div className="bp-build-note"><strong>DESIGN INTENT</strong><p>{project.note}</p></div>}

      <div className="bp-project-switcher" aria-label="Choose a project to inspect">
        {projects.map((item, i) => (
          <button type="button" key={item.name} aria-pressed={i === index} onClick={() => setIndex(i)}>
            <span>{item.number}</span>{item.name}
          </button>
        ))}
      </div>

      <div className="bp-panel-bottom-link">
        <a className="bp-panel-cta" href={project.url} target="_blank" rel="noreferrer">{project.linkLabel} <Arrow diagonal size={15} /></a>
        <button className="bp-secondary-action" type="button" onClick={onClose}>Return to the world</button>
      </div>
    </>
  );
}

function SystemsZone({ onClose }) {
  const [active, setActive] = useState(0);
  const step = buildSteps[active];

  return (
    <>
      <div className="bp-panel-eyebrow">SPACE 02 / THE ENGINE ROOM <span>BUILD SEQUENCE</span></div>
      <h2 className="bp-panel-title">What holds it <span>together.</span></h2>
      <p className="bp-panel-intro">The visual experience is only the surface. Choose a stage to see the structure underneath the work.</p>
      <div className="bp-build-sequence">
        {buildSteps.map((item, index) => (
          <button type="button" key={item.number} className={active === index ? "is-active" : ""} aria-pressed={active === index} onClick={() => setActive(index)}>
            <span className="bp-sequence-number">{item.number}</span>
            <span><strong>{item.title}</strong><small>{item.summary}</small></span>
            <span className="bp-sequence-symbol">{active === index ? "−" : "+"}</span>
          </button>
        ))}
      </div>
      <div className="bp-sequence-detail" aria-live="polite">
        <span>FIELD NOTES / {step.number}</span>
        <h3>{step.title}</h3>
        <p>{step.detail}</p>
      </div>
      <div className="bp-panel-bottom-link">
        <a className="bp-panel-cta" href="https://github.com/awesomeakokayo" target="_blank" rel="noreferrer">Explore engineering work <Arrow diagonal size={15} /></a>
        <button className="bp-secondary-action" type="button" onClick={onClose}>Return to the world</button>
      </div>
    </>
  );
}

function AboutZone({ onClose }) {
  return (
    <>
      <div className="bp-panel-eyebrow">SPACE 03 / THE ARCHITECT <span>ABOUT THE BUILDER</span></div>
      <h2 className="bp-panel-title">A little about <span>the mind.</span></h2>
      <div className="bp-about-card">
        <div className="bp-about-monogram">A<span>.</span></div>
        <div><strong>Awesome Akokayo</strong><small>FULL-STACK ENGINEER / PRODUCT BUILDER</small></div>
      </div>
      <p className="bp-panel-intro bp-about-lead">I like taking complicated, unclear problems and turning them into software that feels straightforward to use.</p>
      <div className="bp-about-copy">
        <p>I work across product thinking, frontend, backend and delivery. I care about the details people notice and the quieter engineering decisions that make a product reliable.</p>
        <p>AI is part of my toolkit, not a substitute for engineering judgement. The goal is to make something useful, understandable and built to hold up.</p>
      </div>
      <div className="bp-profile-stats">
        <div><span>EDUCATION</span><strong>B.Sc. Computer Science</strong><small>Coal City University · 2026</small></div>
        <div><span>WORKING STYLE</span><strong>Remote / Worldwide</strong><small>Based in Nigeria</small></div>
      </div>
      <div className="bp-skill-cloud" aria-label="Core technologies">
        {["React", "TypeScript", "Next.js", "React Native", "Python", "FastAPI", "PostgreSQL", "APIs", "AI integrations"].map((skill) => <span key={skill}>{skill}</span>)}
      </div>
      <div className="bp-panel-bottom-link">
        <a className="bp-panel-cta" href="https://www.linkedin.com/in/awesomeakokayo/" target="_blank" rel="noreferrer">Connect professionally <Arrow diagonal size={15} /></a>
        <button className="bp-secondary-action" type="button" onClick={onClose}>Return to the world</button>
      </div>
    </>
  );
}

function ContactZone({ onClose }) {
  return (
    <>
      <div className="bp-panel-eyebrow">SPACE 04 / THE NEXT DOORWAY <span>OPEN CHANNEL</span></div>
      <h2 className="bp-panel-title">What should we <span>make?</span></h2>
      <p className="bp-panel-intro">Have a problem worth solving, a product idea, or an opportunity to work together? Start with a conversation.</p>
      <div className="bp-contact-card">
        <span className="bp-contact-spark" aria-hidden="true">↗</span>
        <span className="bp-contact-card-label">DIRECT LINE</span>
        <strong>Let’s build something useful.</strong>
        <a href="mailto:awesomeakokayo@gmail.com">awesomeakokayo@gmail.com <Arrow diagonal size={14} /></a>
      </div>
      <div className="bp-contact-links">
        <a href="https://www.linkedin.com/in/awesomeakokayo/" target="_blank" rel="noreferrer"><span>LinkedIn</span><Arrow diagonal size={15} /></a>
        <a href="https://github.com/awesomeakokayo" target="_blank" rel="noreferrer"><span>GitHub</span><Arrow diagonal size={15} /></a>
        <a href="https://wa.me/2349020372640?text=Hi%20Awesome%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noreferrer"><span>WhatsApp</span><Arrow diagonal size={15} /></a>
      </div>
      <div className="bp-panel-bottom-link">
        <button className="bp-secondary-action" type="button" onClick={onClose}>Return to the world</button>
      </div>
    </>
  );
}

function WorldPanel({ zone, onClose }) {
  if (!zone) return null;
  return (
    <aside className="bp-panel" aria-label={zone.label} aria-live="polite">
      <div className="bp-panel-topline">
        <span><i /> YOU HAVE ARRIVED / {zone.number}</span>
        <button type="button" className="bp-panel-close" onClick={onClose} aria-label="Close this room and return to the blueprint world">
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>
      <div className="bp-panel-content" key={zone.id}>
        {zone.id === "work" && <ProjectZone onClose={onClose} />}
        {zone.id === "systems" && <SystemsZone onClose={onClose} />}
        {zone.id === "about" && <AboutZone onClose={onClose} />}
        {zone.id === "contact" && <ContactZone onClose={onClose} />}
      </div>
    </aside>
  );
}

export default function ProductFoundry() {
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [activeZoneId, setActiveZoneId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const entryTimer = useRef(null);
  const worldRef = useRef(null);
  const activeZone = zones.find((zone) => zone.id === activeZoneId) || null;

  const enterWorld = (skipMotion = false) => {
    if (entered || entering) return;
    if (skipMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }
    setEntering(true);
    entryTimer.current = window.setTimeout(() => {
      setEntered(true);
      setEntering(false);
    }, 760);
  };

  useEffect(() => () => window.clearTimeout(entryTimer.current), []);

  useEffect(() => {
    if (!entered) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setActiveZoneId(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [entered]);

  const goToZone = (zoneId) => {
    setActiveZoneId(zoneId);
    setMenuOpen(false);
  };

  const moveBetweenZones = (direction) => {
    const current = zones.findIndex((zone) => zone.id === activeZoneId);
    const next = current < 0
      ? (direction > 0 ? 0 : zones.length - 1)
      : (current + direction + zones.length) % zones.length;
    goToZone(zones[next].id);
  };

  const handleWorldKeyDown = (event) => {
    if (event.target.closest("input, textarea, select, [contenteditable='true']")) return;
    if (event.target.closest(".bp-panel")) return;
    const key = event.key.toLowerCase();
    if (["arrowright", "d"].includes(key)) {
      event.preventDefault();
      moveBetweenZones(1);
    } else if (["arrowleft", "a"].includes(key)) {
      event.preventDefault();
      moveBetweenZones(-1);
    } else if (["arrowup", "w"].includes(key)) {
      event.preventDefault();
      moveBetweenZones(-1);
    } else if (["arrowdown", "s"].includes(key)) {
      event.preventDefault();
      moveBetweenZones(1);
    }
  };

  const handleWorldPointer = (event) => {
    if (!worldRef.current || event.pointerType === "touch") return;
    const rect = worldRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 26;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
    worldRef.current.style.setProperty("--bp-look-x", x.toFixed(1) + "px");
    worldRef.current.style.setProperty("--bp-look-y", y.toFixed(1) + "px");
  };

  const resetWorldPointer = () => {
    if (!worldRef.current) return;
    worldRef.current.style.setProperty("--bp-look-x", "0px");
    worldRef.current.style.setProperty("--bp-look-y", "0px");
  };

  return (
    <div className={"bp-root" + (entered ? " is-inside" : "")} id="top">
      {!entered && <EntryPortal onEnter={enterWorld} entering={entering} />}

      {entered && (
        <main className="bp-world-root" ref={worldRef} data-focus={activeZoneId || "overview"} onPointerMove={handleWorldPointer} onPointerLeave={resetWorldPointer}>
          <header className="bp-world-header">
            <a href="#top" className="bp-world-brand" aria-label="Awesome Akokayo, world overview" onClick={(event) => { event.preventDefault(); setActiveZoneId(null); }}>
              <span className="bp-world-brand-mark">A.</span>
              <span>AWESOME AKOKAYO<small>AN INTERACTIVE PORTFOLIO</small></span>
            </a>
            <div className="bp-world-location"><span className="bp-status-live" /> BLUEPRINT ENVIRONMENT <span className="bp-location-divider">/</span> <span>{activeZone ? activeZone.short : "OVERVIEW"}</span></div>
            <nav className="bp-world-nav" aria-label="Explore portfolio spaces">
              {zones.map((zone) => (
                <button key={zone.id} type="button" className={activeZoneId === zone.id ? "is-active" : ""} onClick={() => goToZone(zone.id)} aria-pressed={activeZoneId === zone.id}>
                  <span>{zone.number}</span>{zone.short}
                </button>
              ))}
            </nav>
            <button className="bp-world-menu" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close rooms menu" : "Open rooms menu"} aria-expanded={menuOpen}>
              <span /><span />
            </button>
          </header>

          {menuOpen && (
            <nav className="bp-world-mobile-menu" aria-label="Portfolio rooms">
              {zones.map((zone) => <button key={zone.id} type="button" onClick={() => goToZone(zone.id)}>{zone.number} / {zone.label}<Arrow diagonal size={14} /></button>)}
              <button type="button" onClick={() => { setEntered(false); setActiveZoneId(null); setMenuOpen(false); }}>Return to the entrance <Arrow diagonal size={14} /></button>
            </nav>
          )}

          <section className="bp-world-stage" aria-label="Explore the blueprint world" tabIndex={0} onKeyDown={handleWorldKeyDown}>
            <ArchitectureBackground focus={activeZoneId} />

            <div className="bp-world-caption">
              <span className="bp-caption-index">WORLD / 001</span>
              <h1>Ideas become <span>architecture.</span></h1>
              <p>Move closer to a structure to discover what it holds.</p>
            </div>

            <div className="bp-world-coordinate bp-coordinate-left">X / 024.80 <i /> DEPTH 01—04</div>
            <div className="bp-world-coordinate bp-coordinate-right">NORTH ELEVATION <i /> 1 : 100</div>

            <svg className="bp-travel-lines" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path className="bp-travel-path" d="M720 660 C610 575 455 525 344 468 S218 405 225 336" />
              <path className="bp-travel-path" d="M720 660 C790 570 916 506 1040 425 S1149 354 1196 301" />
              <path className="bp-travel-path" d="M720 660 C715 530 725 435 720 328 S720 240 720 192" />
              <circle cx="720" cy="660" r="6" />
            </svg>

            <div className="bp-world-nodes" aria-label="Interactive destinations">
              {zones.map((zone) => <BlueprintNode key={zone.id} zone={zone} active={activeZoneId === zone.id} onClick={() => goToZone(zone.id)} />)}
            </div>

            <div className="bp-visitor-marker" aria-hidden="true">
              <span className="bp-visitor-axis bp-visitor-axis-x" />
              <span className="bp-visitor-axis bp-visitor-axis-y" />
              <span className="bp-visitor-dot" />
              <span className="bp-visitor-label">YOU / 001</span>
            </div>

            <div className="bp-world-instructions">
              <span className="bp-instruction-orbit" aria-hidden="true"><i /><i /><i /></span>
              <span><strong>You're inside.</strong><small>Tap a structure to enter its space.</small></span>
              <button type="button" className="bp-instruction-toggle" onClick={() => setShowControls((value) => !value)} aria-expanded={showControls}>
                {showControls ? "Hide controls" : "How to move"} <Arrow size={13} />
              </button>
            </div>

            {showControls && (
              <div className="bp-control-card">
                <div><span className="bp-keycap">W</span><span className="bp-keycap">A</span><span className="bp-keycap">S</span><span className="bp-keycap">D</span></div>
                <p>Use the arrow keys or W A S D to move between spaces. On mobile, use the directional controls or tap a structure.</p>
              </div>
            )}

            <div className="bp-mobile-movement" aria-label="Move between blueprint spaces">
              <button type="button" onClick={() => moveBetweenZones(-1)} aria-label="Move to previous space">←</button>
              <span>MOVE</span>
              <button type="button" onClick={() => moveBetweenZones(1)} aria-label="Move to next space">→</button>
            </div>

            <div className="bp-stage-footer">
              <span><i /> BLUE LINES / OPEN POSSIBILITIES</span>
              <button type="button" onClick={() => { setEntered(false); setActiveZoneId(null); }}>EXIT THE BLUEPRINT <Arrow diagonal size={13} /></button>
            </div>

            <WorldPanel zone={activeZone} onClose={() => setActiveZoneId(null)} />
          </section>
        </main>
      )}

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
