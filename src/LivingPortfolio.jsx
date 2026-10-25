import React, { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, Code2,
  ExternalLink, Github, Laptop, Mail, Map, Monitor, Phone, Sparkles, X, Linkedin
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./LivingPortfolio.css";

const projects = [
  {
    number: "01",
    name: "OpenBooks",
    type: "Business product",
    status: "Live product",
    role: "Product engineering",
    image: "/projects/openbooks-cover.webp",
    imageAlt: "OpenBooks business cashbook interface",
    url: "https://www.openbooks.click",
    github: "https://github.com/awesomeakokayo/openbooks",
    linkLabel: "Open the product",
    summary: "A Nigeria-first cashbook for invoices, payments, expenses and customer records.",
    problem: "For a small business, keeping track of money can mean scattered notes, receipts and transactions that are difficult to review later.",
    approach: "Make everyday record-keeping straightforward, with a clear view of money in, money out, invoices, payments and customer records.",
    tags: ["Business tools", "Money tracking", "Records"]
  },
  {
    number: "02",
    name: "TechSkillHub",
    type: "Learning platform",
    status: "Live product",
    role: "Founder · Full-stack",
    image: "/projects/tech-skill-hub.webp",
    imageAlt: "TechSkillHub learning platform interface",
    url: "https://techskillhub.cv",
    github: "https://github.com/awesomeakokayo/Techhubs",
    linkLabel: "Visit the platform",
    summary: "A learning academy that gives beginners structured tracks, practical roadmaps and a clearer way to make progress.",
    problem: "Beginners can find endless tutorials online and still struggle to decide what to learn next, how to practise, and how to measure progress.",
    approach: "Organise learning around guided tracks, practical roadmaps and saved progress so the next step feels clearer.",
    tags: ["Next.js", "PostgreSQL", "Learning systems"]
  },
  {
    number: "03",
    name: "Southwest Flood Monitor",
    type: "Civic technology",
    status: "Built project",
    role: "Mobile + backend",
    image: "/projects/flood-monitor.webp",
    imageAlt: "Southwest Flood Monitor mobile reporting interface",
    url: "https://github.com/awesomeakokayo/Flood-Report-App",
    github: "https://github.com/awesomeakokayo/Flood-Report-App",
    linkLabel: "Explore the code",
    summary: "A mobile reporting experience for community flood incidents, supported by AI-assisted image analysis and a structured backend.",
    problem: "Reports about local flood incidents need a useful structure so details can be submitted and reviewed rather than getting lost in informal messages.",
    approach: "Connect a mobile reporting flow to a structured API and data layer, using AI-assisted image analysis as one part of the reporting workflow.",
    tags: ["React Native", "FastAPI", "AI-assisted reports"]
  },
  {
    number: "04",
    name: "Elroi Hub",
    type: "Client website",
    status: "Live website",
    role: "Frontend development",
    image: "/projects/elroi-hub.webp",
    imageAlt: "Elroi Hub agency website",
    url: "https://www.elroihubllc.com/",
    github: null,
    linkLabel: "Visit the website",
    summary: "A brand-led agency website that brings services, proof and a clear path to enquire into one composed experience.",
    problem: "A service business needs a website that explains what it does, presents the brand clearly and gives potential customers a direct next step.",
    approach: "Bring service structure, visual hierarchy, responsive presentation and the route to enquiry into one cohesive experience.",
    tags: ["Responsive UI", "Brand systems", "Web"]
  }
];

const buildSteps = [
  {
    number: "01",
    title: "Understand the real problem",
    summary: "Start with the people and the friction.",
    detail: "I look at who the product is for, what is getting in their way and what a useful outcome would look like. The first job is making sure we're solving the right problem."
  },
  {
    number: "02",
    title: "Shape the experience",
    summary: "Make the next step feel clear.",
    detail: "I turn an unclear idea into understandable flows, interface decisions, a suitable system design and a realistic plan. Good structure makes a product feel simple on the surface."
  },
  {
    number: "03",
    title: "Connect the system",
    summary: "Frontend, backend, data and integrations.",
    detail: "I build across the product: interface, APIs, data and behaviour. AI is useful when it solves a real problem, but engineering judgement, testing and ownership remain with the builder."
  },
  {
    number: "04",
    title: "Test it in the real world",
    summary: "Check the awkward cases before shipping.",
    detail: "I check important journeys, error states, accessibility and performance. A convincing demo is a beginning; a useful product needs to hold up when people depend on it."
  }
];

const discoveries = [
  { id: "work", label: "The laptop", hint: "Projects and products", icon: Laptop },
  { id: "craft", label: "The pinboard", hint: "How I build", icon: Code2 },
  { id: "story", label: "The bookshelf", hint: "The person behind it", icon: BookOpen },
  { id: "city", label: "The window", hint: "Ideas out in the world", icon: Map },
  { id: "contact", label: "The phone", hint: "Start a conversation", icon: Phone }
];

function RoomIllustration() {
  return (
    <svg className="lp-room-art" viewBox="0 0 1200 820" preserveAspectRatio="none" role="img" aria-label="Illustrated creative workspace with a desk, laptop, bookshelves, planning board and a window looking out over a small city">
      <defs>
        <linearGradient id="lp-wall" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#f4f0e5" />
          <stop offset="1" stopColor="#dddcd0" />
        </linearGradient>
        <linearGradient id="lp-floor" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#d4d0c5" />
          <stop offset="1" stopColor="#b8b7ae" />
        </linearGradient>
        <linearGradient id="lp-window-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#435b70" />
          <stop offset=".55" stopColor="#708d95" />
          <stop offset="1" stopColor="#ec9c71" />
        </linearGradient>
        <linearGradient id="lp-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#21333b" />
          <stop offset="1" stopColor="#121e23" />
        </linearGradient>
        <linearGradient id="lp-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bd9167" />
          <stop offset="1" stopColor="#8f694b" />
        </linearGradient>
        <pattern id="lp-wall-lines" width="54" height="54" patternUnits="userSpaceOnUse">
          <path d="M54 0H0V54" fill="none" stroke="#59615c" strokeWidth=".7" opacity=".08" />
        </pattern>
        <clipPath id="lp-window-clip">
          <rect x="758" y="104" width="356" height="260" rx="2" />
        </clipPath>
        <filter id="lp-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <rect width="1200" height="820" fill="url(#lp-wall)" />
      <rect width="1200" height="582" fill="url(#lp-wall-lines)" />
      <path d="M0 0H1200V584L0 592Z" fill="#ffffff" opacity=".11" />
      <path d="M0 592 1200 572 1200 820H0Z" fill="url(#lp-floor)" />
      <path d="M0 592 1200 572" fill="none" stroke="#a9a89e" strokeWidth="3" />
      <path d="M0 655 1200 633M0 735 1200 714M175 820 342 586M445 820 525 582M715 820 706 579M970 820 890 578" stroke="#aaa99f" strokeWidth="1.3" opacity=".35" />
      <path d="M0 0H1200V16H0Z" fill="#ffffff" opacity=".5" />
      <path d="M28 26V565M1172 26V565" stroke="#b9b7aa" strokeWidth="2" opacity=".4" />
      <path d="M335 24V570M712 24V570" stroke="#b7b6aa" strokeWidth="1" opacity=".25" />

      <g className="lp-art-window">
        <rect x="738" y="81" width="396" height="310" rx="5" fill="#303a3c" opacity=".12" />
        <rect x="730" y="73" width="396" height="310" rx="4" fill="#f9f7ef" stroke="#414a46" strokeWidth="10" />
        <g clipPath="url(#lp-window-clip)">
          <rect x="758" y="104" width="356" height="260" fill="url(#lp-window-sky)" />
          <circle cx="1005" cy="167" r="34" fill="#ffb47e" opacity=".9" />
          <circle cx="1005" cy="167" r="48" fill="#ffb47e" opacity=".12" />
          <path d="M758 280 812 240 846 267 893 215 929 264 971 231 1019 265 1072 224 1114 255V364H758Z" fill="#435965" opacity=".7" />
          <path d="M758 308 802 271 838 291 883 247 930 290 970 266 1012 293 1055 262 1114 287V364H758Z" fill="#314b53" />
          <path d="M758 327 785 309 808 319 835 285 863 311 894 300 919 322 944 289 975 312 1007 299 1038 322 1071 295 1114 315V364H758Z" fill="#243e46" />
          <g fill="#f7d7a0" opacity=".83">
            <path d="M788 327h9v14h-9zM804 324h7v10h-7zM843 305h8v13h-8zM858 317h9v15h-9zM888 307h7v12h-7zM920 326h8v13h-8zM946 309h8v12h-8zM970 321h7v11h-7zM1000 306h9v14h-9zM1032 323h8v10h-8zM1061 310h8v14h-8zM1082 325h7v10h-7z" />
          </g>
          <path d="M758 347Q900 332 1114 348V364H758Z" fill="#1c353e" opacity=".7" />
        </g>
        <path d="M936 78V379M735 228H1122" stroke="#303a3c" strokeWidth="8" />
        <path d="M744 91 1120 91M744 368 1120 368" stroke="#ffffff" strokeWidth="2" opacity=".8" />
        <rect x="755" y="395" width="352" height="10" rx="5" fill="#8f8d82" opacity=".27" />
      </g>

      <g className="lp-art-pinboard">
        <rect x="373" y="128" width="278" height="224" rx="5" fill="#555b55" opacity=".12" />
        <rect x="366" y="120" width="278" height="224" rx="5" fill="#f5f3e9" stroke="#777b70" strokeWidth="3" />
        <rect x="381" y="135" width="248" height="194" fill="#fffdf5" stroke="#dedbd0" strokeWidth="1" />
        <path d="M400 167H602M400 183H554M400 199H577" stroke="#b9b8ad" strokeWidth="2" strokeLinecap="round" />
        <g fill="none" stroke="#477c82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M410 240H465V291H410Z" />
          <path d="M465 266H505V222H539V252H576" />
          <circle cx="505" cy="266" r="5" fill="#ff7046" stroke="none" />
          <circle cx="539" cy="222" r="5" fill="#9bd8bf" stroke="none" />
          <path d="M576 252l-8-6m8 6-8 6M539 222l-6 7m6-7 6 7" />
          <path d="M426 253V278M439 253V278M452 253V278" opacity=".55" />
        </g>
        <rect x="568" y="151" width="44" height="8" rx="4" fill="#e7b16d" />
        <circle cx="625" cy="132" r="4" fill="#ff7046" />
        <path d="M407 311h69M407 318h42" stroke="#b8b6a8" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="lp-art-shelf">
        <ellipse cx="189" cy="585" rx="141" ry="18" fill="#333c37" opacity=".15" filter="url(#lp-shadow)" />
        <rect x="57" y="237" width="262" height="343" rx="4" fill="#8a6348" stroke="#4d4840" strokeWidth="3" />
        <rect x="70" y="251" width="236" height="315" fill="#e4d1b6" stroke="#4d4840" strokeWidth="2" />
        <rect x="70" y="355" width="236" height="8" fill="#5d5043" />
        <rect x="70" y="458" width="236" height="8" fill="#5d5043" />
        <rect x="70" y="558" width="236" height="8" fill="#5d5043" />
        <g stroke="#4c514b" strokeWidth="1.5">
          <rect x="85" y="271" width="23" height="78" rx="2" fill="#6c8f8b" />
          <rect x="112" y="263" width="31" height="86" rx="2" fill="#f1b979" />
          <rect x="148" y="279" width="19" height="70" rx="2" fill="#455b67" />
          <rect x="173" y="269" width="28" height="80" rx="2" fill="#c87c5b" />
          <rect x="207" y="283" width="25" height="66" rx="2" fill="#99b8a4" />
          <rect x="238" y="275" width="16" height="74" rx="2" fill="#f4eee0" />
          <rect x="258" y="290" width="32" height="59" rx="2" fill="#596e83" />
          <rect x="88" y="382" width="43" height="62" rx="2" fill="#e8e4d8" />
          <rect x="137" y="375" width="26" height="69" rx="2" fill="#c57f5c" />
          <rect x="169" y="389" width="39" height="55" rx="2" fill="#4f7779" />
          <rect x="215" y="379" width="25" height="65" rx="2" fill="#e8b365" />
          <rect x="247" y="384" width="42" height="60" rx="2" fill="#627b8a" />
          <rect x="86" y="481" width="80" height="61" rx="2" fill="#c2bda9" />
          <rect x="172" y="486" width="116" height="56" rx="2" fill="#879d8a" />
        </g>
        <path d="M95 285v52M122 277v61M158 290v52M184 281v58M217 294v49M245 284v55M269 299v45" stroke="#ffffff" strokeWidth="1.2" opacity=".5" />
        <path d="M96 395h25m-25 7h20m-20 7h29" stroke="#8b8c7e" strokeWidth="2" strokeLinecap="round" />
        <path d="M184 500h92m-92 8h75" stroke="#f6f1e5" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      </g>

      <g className="lp-art-small-poster">
        <rect x="93" y="84" width="175" height="111" fill="#c7d0c6" stroke="#5a625b" strokeWidth="3" />
        <rect x="105" y="96" width="151" height="87" fill="#e8e8db" />
        <circle cx="216" cy="130" r="24" fill="#f2ac77" />
        <path d="M108 166 144 126 165 147 189 119 232 177H108Z" fill="#779793" />
        <path d="M116 106h35m-35 7h20" stroke="#435e5b" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="lp-art-desk">
        <ellipse cx="700" cy="685" rx="390" ry="36" fill="#2d332f" opacity=".18" filter="url(#lp-shadow)" />
        <path d="M399 511 986 498 955 536 372 551Z" fill="#5a473b" />
        <path d="M372 551 955 536 947 557 364 573Z" fill="#76553e" />
        <path d="M399 511 986 498 955 536 372 551Z" fill="url(#lp-desk)" stroke="#5e4b3b" strokeWidth="2" />
        <path d="M403 519 956 507M431 530 813 520M841 519 931 516" stroke="#f5d6af" strokeWidth="2" opacity=".42" />
        <path d="M413 550 403 709 445 709 474 547M902 537 913 700 953 700 944 537" fill="#6a4c39" stroke="#4f4137" strokeWidth="3" />
        <path d="M418 577 414 655M924 562 933 650" stroke="#b58b66" strokeWidth="3" opacity=".45" />
      </g>

      <g className="lp-art-laptop">
        <path d="M570 371 745 366 775 478 590 485Z" fill="#262f31" stroke="#111918" strokeWidth="4" />
        <path d="M582 379 738 375 763 465 601 472Z" fill="url(#lp-screen)" />
        <rect x="598" y="393" width="147" height="6" rx="3" fill="#9bd8bf" opacity=".88" transform="rotate(-1.5 598 393)" />
        <path d="M600 407 727 404M604 419 711 416M607 431 730 428" stroke="#9bb6b4" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        <rect x="605" y="442" width="54" height="16" rx="3" fill="#ff754d" transform="rotate(-1.5 605 442)" />
        <rect x="666" y="439" width="64" height="17" rx="3" fill="#b5c5b4" opacity=".8" transform="rotate(-1.5 666 439)" />
        <path d="M570 371 745 366 775 478 590 485Z" fill="none" stroke="#9daba4" strokeWidth="1.4" />
        <path d="M590 485 775 478 797 496 571 503Z" fill="#d2d5cb" stroke="#59635f" strokeWidth="2" />
        <path d="M614 488 752 483M628 493 736 489" stroke="#7c8580" strokeWidth="1.3" />
        <path d="M680 488 710 487" stroke="#ff754d" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <g className="lp-art-notebook">
        <path d="M795 468 871 465 884 501 807 506Z" fill="#26363b" />
        <path d="M801 465 873 462 885 497 812 501Z" fill="#fff8e9" stroke="#4c5b56" strokeWidth="2" />
        <path d="M811 473 868 470M814 481 870 478M817 489 868 486" stroke="#7b9d9d" strokeWidth="1.5" />
        <path d="M824 466 837 499" stroke="#ff754d" strokeWidth="2" />
        <path d="M801 465 808 460 880 457 873 462Z" fill="#e9e1d1" stroke="#4c5b56" strokeWidth="1.3" />
      </g>

      <g className="lp-art-phone">
        <path d="M892 473 922 471 931 518 900 521Z" fill="#293436" stroke="#182021" strokeWidth="2" />
        <path d="M897 479 918 477 925 511 904 513Z" fill="#d6e5d9" />
        <circle cx="912" cy="507" r="2.2" fill="#ff754d" />
        <path d="M901 485 914 484M903 491 916 490M905 497 918 496" stroke="#5d837c" strokeWidth="1.4" />
      </g>

      <g className="lp-art-cup">
        <ellipse cx="514" cy="512" rx="23" ry="5" fill="#4d4137" opacity=".3" />
        <path d="M495 476H528L523 506Q512 516 501 506Z" fill="#f1eee3" stroke="#565e56" strokeWidth="2" />
        <path d="M528 483Q548 481 539 499H524" fill="none" stroke="#565e56" strokeWidth="3" />
        <path d="M502 478q-5-13 1-18m10 17q-5-13 1-18" stroke="#9e9e92" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M501 489h22" stroke="#ff754d" strokeWidth="3" />
      </g>

      <g className="lp-art-plant">
        <path d="M1022 505 1011 580H1078L1065 505Z" fill="#b97856" stroke="#5d5145" strokeWidth="2" />
        <path d="M1044 505Q1039 454 1010 443Q1005 478 1044 505Z" fill="#6f9c83" stroke="#3c6657" strokeWidth="2" />
        <path d="M1047 507Q1077 455 1103 456Q1097 488 1047 507Z" fill="#8ab69a" stroke="#3c6657" strokeWidth="2" />
        <path d="M1047 503Q1024 465 1038 430Q1060 461 1047 503Z" fill="#9dc6a4" stroke="#3c6657" strokeWidth="2" />
        <path d="M1047 507V438" stroke="#3c6657" strokeWidth="2" />
      </g>

      <g className="lp-art-rug">
        <path d="M295 690 650 660 950 706 595 761Z" fill="#8ca7a0" opacity=".43" />
        <path d="M321 692 648 668 919 705 595 749Z" fill="none" stroke="#f4f0e5" strokeWidth="2" opacity=".7" />
        <path d="M350 694 650 674 888 705 594 735Z" fill="none" stroke="#f4f0e5" strokeWidth="1.4" opacity=".5" />
      </g>

      <g className="lp-art-person">
        <ellipse cx="1090" cy="720" rx="36" ry="8" fill="#293936" opacity=".15" />
        <circle cx="1088" cy="608" r="19" fill="#b9825d" stroke="#293633" strokeWidth="3" />
        <path d="M1070 606Q1070 582 1091 587Q1108 591 1106 608L1098 603 1084 602 1076 613Z" fill="#283a3c" />
        <path d="M1066 634Q1088 620 1110 635L1123 684 1105 695 1094 665 1092 714 1067 713 1069 669 1054 692 1040 683Z" fill="#527b79" stroke="#293633" strokeWidth="3" strokeLinejoin="round" />
        <path d="M1068 711 1082 711 1078 754 1059 754Z" fill="#283a3c" />
        <path d="M1094 711 1108 711 1120 751 1101 755Z" fill="#283a3c" />
        <path d="M1053 646 1033 671M1110 646 1127 670" stroke="#b9825d" strokeWidth="10" strokeLinecap="round" />
      </g>

      <g opacity=".45" fill="none" stroke="#3e5f5c" strokeWidth="1.4">
        <path d="M692 44h40m-20-20v40M691 574h40m-20-20v40" />
        <circle cx="712" cy="64" r="4" />
        <circle cx="712" cy="554" r="4" />
      </g>
    </svg>
  );
}

function ObjectHotspot({ id, label, hint, icon: Icon, visited, onClick }) {
  const positions = {
    story: { left: "16%", top: "53%" },
    craft: { left: "42%", top: "31%" },
    work: { left: "55%", top: "57%" },
    city: { left: "78%", top: "26%" },
    contact: { left: "76%", top: "66%" }
  };
  return (
    <button
      type="button"
      className={"lp-hotspot lp-hotspot--" + id + (visited ? " is-visited" : "")}
      style={positions[id]}
      onClick={onClick}
      aria-label={label + ": " + hint}
    >
      <span className="lp-hotspot-marker">{visited ? <Check size={14} strokeWidth={2.5} /> : <Icon size={15} strokeWidth={1.8} />}</span>
      <span className="lp-hotspot-label"><strong>{label}</strong><small>{hint}</small></span>
    </button>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className="lp-project-visual">
      <div className="lp-project-fallback">
        <div className="lp-fallback-top"><span /><span /><span /><small>PROJECT / {project.number}</small></div>
        <div className="lp-fallback-screen">
          <span className="lp-fallback-brand">{project.name}</span>
          <span className="lp-fallback-rule" />
          <span className="lp-fallback-rule short" />
          <span className="lp-fallback-block" />
          <span className="lp-fallback-block small" />
        </div>
      </div>
      <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = "none"; }} />
      <span className="lp-project-number">{project.number} / 04</span>
    </div>
  );
}

function PanelHeader({ kicker, title, description, onClose }) {
  return (
    <div className="lp-panel-heading">
      <div className="lp-panel-kicker"><span className="lp-live-dot" />{kicker}</div>
      <button type="button" className="lp-close" aria-label="Close panel" onClick={onClose}><X size={18} /></button>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function WorkPanel({ projectIndex, setProjectIndex, onClose }) {
  const [lens, setLens] = useState("approach");
  const project = projects[projectIndex];
  useEffect(() => { setLens("approach"); }, [projectIndex]);

  return (
    <div className="lp-panel-content">
      <PanelHeader
        kicker="THE PROJECT DESK / 01"
        title={<>Real problems.<br /><span>Useful software.</span></>}
        description="A few things I've put into the world, and the real-life problems behind them."
        onClose={onClose}
      />
      <div className="lp-project-layout">
        <div className="lp-project-list" aria-label="Choose a project">
          {projects.map((item, index) => (
            <button key={item.name} className={projectIndex === index ? "is-current" : ""} type="button" aria-pressed={projectIndex === index} onClick={() => setProjectIndex(index)}>
              <span className="lp-project-list-number">{item.number}</span>
              <span className="lp-project-list-copy"><strong>{item.name}</strong><small>{item.type}</small></span>
              {projectIndex === index ? <span className="lp-project-list-check"><Check size={14} /></span> : <ChevronRight size={16} />}
            </button>
          ))}
        </div>
        <article className="lp-project-detail">
          <ProjectVisual project={project} />
          <div className="lp-project-meta"><span>{project.type}</span><span className="lp-status">{project.status}</span></div>
          <div className="lp-project-title-row"><h3>{project.name}</h3><span>{project.role}</span></div>
          <p className="lp-project-summary">{project.summary}</p>
          <div className="lp-lens-tabs" role="group" aria-label="Project story">
            <button type="button" className={lens === "problem" ? "is-selected" : ""} aria-pressed={lens === "problem"} onClick={() => setLens("problem")}>The problem</button>
            <button type="button" className={lens === "approach" ? "is-selected" : ""} aria-pressed={lens === "approach"} onClick={() => setLens("approach")}>My approach</button>
          </div>
          <div className="lp-project-lens" aria-live="polite">
            <span>{lens === "problem" ? "WHAT NEEDED TO CHANGE" : "HOW I APPROACHED IT"}</span>
            <p>{lens === "problem" ? project.problem : project.approach}</p>
          </div>
          <div className="lp-tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="lp-project-actions">
            <a className="lp-primary-action" href={project.url} target="_blank" rel="noopener noreferrer">{project.linkLabel}<ArrowUpRight size={16} /></a>
            {project.github && <a className="lp-icon-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={"View " + project.name + " on GitHub"}><Github size={17} /></a>}
          </div>
        </article>
      </div>
      <div className="lp-panel-footnote"><Sparkles size={15} /> Start with the problem. The technology matters because of what it helps people do.</div>
    </div>
  );
}

function BuildPanel({ onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const step = buildSteps[activeStep];
  return (
    <div className="lp-panel-content">
      <PanelHeader
        kicker="THE PINBOARD / 02"
        title={<>What happens<br /><span>behind the screen.</span></>}
        description="The product should feel simple. The thinking underneath it should be deliberate."
        onClose={onClose}
      />
      <div className="lp-build-board">
        <div className="lp-build-step-list">
          {buildSteps.map((item, index) => (
            <button key={item.number} type="button" className={activeStep === index ? "is-current" : ""} aria-pressed={activeStep === index} onClick={() => setActiveStep(index)}>
              <span>{item.number}</span><span><strong>{item.title}</strong><small>{item.summary}</small></span><ChevronRight size={16} />
            </button>
          ))}
        </div>
        <div className="lp-build-detail" aria-live="polite">
          <div className="lp-build-detail-top"><span>FIELD NOTE / {step.number}</span><Code2 size={18} /></div>
          <div className="lp-build-illustration" aria-hidden="true">
            <div className="lp-build-illustration-node node-a" />
            <div className="lp-build-illustration-node node-b" />
            <div className="lp-build-illustration-node node-c" />
            <div className="lp-build-illustration-link link-a" />
            <div className="lp-build-illustration-link link-b" />
            <div className="lp-build-illustration-core"><span>{step.number}</span></div>
          </div>
          <h3>{step.title}</h3><p>{step.detail}</p>
        </div>
      </div>
      <div className="lp-panel-bottom"><span>GOOD PRODUCTS ARE MADE OF GOOD DECISIONS.</span><a href="https://github.com/awesomeakokayo" target="_blank" rel="noopener noreferrer">See my engineering work <ArrowUpRight size={15} /></a></div>
    </div>
  );
}

function StoryPanel({ onClose }) {
  const skills = ["React", "TypeScript", "Next.js", "React Native", "Python", "FastAPI", "PostgreSQL", "APIs", "AI integrations"];
  return (
    <div className="lp-panel-content">
      <PanelHeader
        kicker="THE BOOKSHELF / 03"
        title={<>The person behind<br /><span>the pixels.</span></>}
        description="I'm Awesome Akokayo, a full-stack engineer who enjoys turning unclear problems into software that feels straightforward to use."
        onClose={onClose}
      />
      <div className="lp-story-card">
        <div className="lp-story-avatar"><span>A<span>.</span></span><div className="lp-story-avatar-orbit orbit-a" /><div className="lp-story-avatar-orbit orbit-b" /></div>
        <div className="lp-story-identity"><span className="lp-story-label">THE BUILDER</span><h3>Awesome Akokayo</h3><p>Full-stack engineer · Product builder</p><div className="lp-availability"><span className="lp-live-dot" />Open to meaningful work</div></div>
      </div>
      <div className="lp-story-copy">
        <p>I work across product thinking, frontend, backend and delivery. I care about the details people notice and the quieter engineering decisions that make a product reliable.</p>
        <p>AI is part of my toolkit, not a substitute for engineering judgement. The goal is to make something useful, understandable and built to hold up.</p>
      </div>
      <div className="lp-story-facts">
        <div><span>EDUCATION</span><strong>B.Sc. Computer Science</strong><small>Coal City University · 2026</small></div>
        <div><span>WORKING STYLE</span><strong>Remote / Worldwide</strong><small>Based in Nigeria</small></div>
      </div>
      <div className="lp-skills-title"><span>TOOLS I WORK WITH</span><span>NOT A COMPLETE LIST</span></div>
      <div className="lp-skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      <div className="lp-social-row">
        <a href="https://www.linkedin.com/in/awesomeakokayo/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} />Connect on LinkedIn<ArrowUpRight size={14} /></a>
        <a href="https://github.com/awesomeakokayo" target="_blank" rel="noopener noreferrer"><Github size={16} />Browse GitHub<ArrowUpRight size={14} /></a>
      </div>
    </div>
  );
}

function CityPanel({ onClose, onChooseProject }) {
  const locations = [
    { number: "01", label: "The neighbourhood shop", text: "Make everyday business records easier.", projectIndex: 0, className: "shop" },
    { number: "02", label: "The learning corner", text: "Make the next step easier to see.", projectIndex: 1, className: "learning" },
    { number: "03", label: "The street after rain", text: "Turn a local report into useful information.", projectIndex: 2, className: "street" },
    { number: "04", label: "The digital studio", text: "Give a service business a clearer presence.", projectIndex: 3, className: "studio" }
  ];
  return (
    <div className="lp-panel-content">
      <PanelHeader
        kicker="THROUGH THE WINDOW / 04"
        title={<>The world is bigger<br /><span>than this room.</span></>}
        description="Every useful product starts somewhere out there, with a person trying to get something done. Choose a place to see the kind of problem it represents."
        onClose={onClose}
      />
      <div className="lp-mini-city" aria-label="Miniature city map">
        <div className="lp-city-skyline"><span /><span /><span /><span /><span /><span /><i /></div>
        <svg viewBox="0 0 600 110" preserveAspectRatio="none" aria-hidden="true"><path d="M0 76C95 28 143 101 226 60S363 14 430 62 529 94 600 30" fill="none" stroke="#ff744d" strokeWidth="2" strokeDasharray="4 7" /><circle cx="226" cy="60" r="5" fill="#9bd8bf" stroke="#20312f" strokeWidth="2" /><circle cx="430" cy="62" r="5" fill="#ff744d" stroke="#20312f" strokeWidth="2" /></svg>
        <span className="lp-city-map-label">A FEW PLACES WORTH SOLVING FOR</span>
      </div>
      <div className="lp-city-locations">
        {locations.map((location) => (
          <button key={location.number} className={"lp-city-location " + location.className} type="button" onClick={() => onChooseProject(location.projectIndex)}>
            <span className="lp-city-location-number">{location.number}</span>
            <span className="lp-city-location-copy"><strong>{location.label}</strong><small>{location.text}</small></span>
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactPanel({ onClose }) {
  return (
    <div className="lp-panel-content">
      <PanelHeader
        kicker="THE PHONE / 05"
        title={<>Have something<br /><span>worth building?</span></>}
        description="A product idea, an engineering role, a tricky problem, or a team that cares about doing good work. I'm open to a conversation."
        onClose={onClose}
      />
      <div className="lp-contact-card">
        <div className="lp-contact-orb"><Mail size={22} /></div>
        <span className="lp-contact-overline">THE DIRECT LINE</span>
        <h3>Let's start with a conversation.</h3>
        <a className="lp-contact-email" href="mailto:awesomeakokayo@gmail.com">awesomeakokayo@gmail.com<ArrowUpRight size={16} /></a>
      </div>
      <div className="lp-contact-options">
        <a href="https://www.linkedin.com/in/awesomeakokayo/" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /><span><strong>LinkedIn</strong><small>Professional updates and connection</small></span><ArrowUpRight size={15} /></a>
        <a href="https://github.com/awesomeakokayo" target="_blank" rel="noopener noreferrer"><Github size={18} /><span><strong>GitHub</strong><small>Projects, code and experiments</small></span><ArrowUpRight size={15} /></a>
        <a href="https://wa.me/2349020372640?text=Hi%20Awesome%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noopener noreferrer"><Phone size={18} /><span><strong>WhatsApp</strong><small>A direct, informal hello</small></span><ArrowUpRight size={15} /></a>
      </div>
      <div className="lp-contact-bottom"><span><span className="lp-live-dot" />Based in Nigeria · Open to remote work</span><button type="button" onClick={onClose}>Back to the room <ArrowRight size={15} /></button></div>
    </div>
  );
}

function WorldPanel({ activePanel, onClose, projectIndex, setProjectIndex, onChooseProject }) {
  if (!activePanel) return null;
  return (
    <aside className="lp-world-panel" aria-label="Portfolio details">
      {activePanel === "work" && <WorkPanel projectIndex={projectIndex} setProjectIndex={setProjectIndex} onClose={onClose} />}
      {activePanel === "craft" && <BuildPanel onClose={onClose} />}
      {activePanel === "story" && <StoryPanel onClose={onClose} />}
      {activePanel === "city" && <CityPanel onClose={onClose} onChooseProject={onChooseProject} />}
      {activePanel === "contact" && <ContactPanel onClose={onClose} />}
    </aside>
  );
}

export default function LivingPortfolio() {
  const [activePanel, setActivePanel] = useState(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [visited, setVisited] = useState([]);
  const [showTourTip, setShowTourTip] = useState(false);
  const [showDiscoveryToast, setShowDiscoveryToast] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const progressKeys = ["work", "craft", "story", "contact"];
  const progressCount = progressKeys.filter((key) => visited.includes(key)).length;

  useEffect(() => {
    const timer = window.setTimeout(() => setSceneReady(true), 160);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActivePanel(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!showDiscoveryToast) return undefined;
    const timer = window.setTimeout(() => setShowDiscoveryToast(false), 3600);
    return () => window.clearTimeout(timer);
  }, [showDiscoveryToast]);

  const openPanel = (panel) => {
    setActivePanel(panel);
    setShowTourTip(false);
    if (progressKeys.includes(panel)) {
      setVisited((previous) => {
        if (previous.includes(panel)) return previous;
        const next = previous.concat(panel);
        if (next.length === progressKeys.length) setShowDiscoveryToast(true);
        return next;
      });
    }
  };

  const chooseProject = (index) => {
    setProjectIndex(index);
    openPanel("work");
  };

  const beginExplore = () => {
    setShowTourTip(true);
    const room = document.getElementById("lp-room");
    if (room) room.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className={"lp-root" + (sceneReady ? " is-ready" : "")}>
      <header className="lp-header">
        <a className="lp-brand" href="#top" aria-label="Awesome Akokayo home">
          <span className="lp-brand-mark">A<span>.</span></span>
          <span className="lp-brand-copy"><strong>AWESOME AKOKAYO</strong><small>FULL-STACK ENGINEER · PRODUCT BUILDER</small></span>
        </a>
        <div className="lp-header-status"><span className="lp-live-dot" />A SMALL WORLD OF WORKING IDEAS</div>
        <nav className="lp-header-links" aria-label="Quick navigation">
          <button type="button" onClick={() => openPanel("work")}>Work</button>
          <button type="button" onClick={() => openPanel("craft")}>How I build</button>
          <button type="button" onClick={() => openPanel("story")}>About</button>
        </nav>
        <button className="lp-hire-button" type="button" onClick={() => openPanel("contact")}>Let's talk <ArrowUpRight size={15} /></button>
      </header>

      <main id="top">
        <section className="lp-stage" aria-label="An interactive home workspace">
          <div className="lp-intro">
            <div className="lp-intro-eyebrow"><span className="lp-intro-pulse" /> STEP INTO MY WORKSPACE <span className="lp-intro-index">NO. 001</span></div>
            <h1>A little world where <span>ideas become real.</span></h1>
            <p>Come in, look around. The things on this desk tell a story about the problems I like solving and the products I build.</p>
            <div className="lp-intro-actions">
              <button type="button" className="lp-button-primary" onClick={beginExplore}>Explore the room <ArrowRight size={16} /></button>
              <button type="button" className="lp-button-text" onClick={() => openPanel("work")}>Show me the work <ArrowUpRight size={15} /></button>
            </div>
            <button type="button" className="lp-hire-shortcut" onClick={() => openPanel("contact")}>Here to hire? Go straight to contact <ArrowRight size={14} /></button>
          </div>

          <div className="lp-room-scene" id="lp-room">
            <RoomIllustration />
            <div className="lp-room-light" aria-hidden="true" />
            <div className="lp-room-sign"><span>THE WORKROOM</span><i /> <span>OPEN</span></div>
            {discoveries.map((discovery) => (
              <ObjectHotspot
                key={discovery.id}
                {...discovery}
                visited={visited.includes(discovery.id === "city" ? "work" : discovery.id)}
                onClick={() => {
                  if (discovery.id === "city") openPanel("city");
                  else openPanel(discovery.id);
                }}
              />
            ))}
            {showTourTip && (
              <div className="lp-tour-tip" role="status">
                <button type="button" aria-label="Dismiss exploration tip" onClick={() => setShowTourTip(false)}><X size={14} /></button>
                <span className="lp-tour-tip-icon"><Sparkles size={17} /></span>
                <div><strong>Try the objects around the room.</strong><small>The laptop opens projects. The window leads out into the world. The phone is always here when you're ready to talk.</small></div>
              </div>
            )}
            <div className="lp-room-caption"><span>ROOM 001</span><i /> <span>HOME BASE</span></div>
            <div className="lp-discovery-progress" aria-label={progressCount + " of 4 key areas explored"}>
              <div className="lp-progress-label"><span>THE WHOLE PICTURE</span><strong>{progressCount}<small>/ 4</small></strong></div>
              <div className="lp-progress-dots">{progressKeys.map((key) => <span key={key} className={visited.includes(key) ? "is-found" : ""} />)}</div>
            </div>
          </div>
        </section>

        <section className="lp-mobile-explore" aria-label="Explore the workspace">
          <div className="lp-mobile-explore-heading"><span>LOOK AROUND</span><small>Choose an object to explore</small></div>
          <div className="lp-mobile-object-list">
            {discoveries.map((discovery) => {
              const Icon = discovery.icon;
              return <button type="button" key={discovery.id} onClick={() => discovery.id === "city" ? openPanel("city") : openPanel(discovery.id)}><span className="lp-mobile-object-icon">{visited.includes(discovery.id) ? <Check size={17} /> : <Icon size={17} />}</span><span><strong>{discovery.label}</strong><small>{discovery.hint}</small></span><ChevronRight size={16} /></button>;
            })}
          </div>
        </section>

        <footer className="lp-footer">
          <div className="lp-footer-brand"><span className="lp-brand-mark">A<span>.</span></span><span><strong>AWESOME AKOKAYO</strong><small>IDEAS / SYSTEMS / WORKING SOFTWARE</small></span></div>
          <span className="lp-footer-note">Made with curiosity. Built with intent.</span>
          <button type="button" onClick={() => openPanel("contact")}>Have something in mind? <ArrowUpRight size={15} /></button>
        </footer>
      </main>

      {activePanel && <div className="lp-backdrop" onClick={() => setActivePanel(null)} aria-hidden="true" />}
      <WorldPanel activePanel={activePanel} onClose={() => setActivePanel(null)} projectIndex={projectIndex} setProjectIndex={setProjectIndex} onChooseProject={chooseProject} />

      {showDiscoveryToast && (
        <div className="lp-discovery-toast" role="status"><span><Check size={15} /></span><div><strong>You found the whole picture.</strong><small>Work, process, story and contact. Thanks for exploring.</small></div><button type="button" onClick={() => setShowDiscoveryToast(false)} aria-label="Dismiss discovery message"><X size={14} /></button></div>
      )}

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
