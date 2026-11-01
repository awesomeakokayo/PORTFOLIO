export type ProjectTheme = "pink" | "yellow" | "paper" | "dark";
export type ProjectKind = "openbooks" | "techskills" | "flood" | "blancquake" | "emohabit";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  name: string;
  category: string;
  description: string;
  tags: string[];
  theme: ProjectTheme;
  kind: ProjectKind;
  href: string;
  image?: ProjectImage;
}

export const siteContent = {
  metadata: {
    title: "Awesome Akokayo — Product Engineer & AI Builder",
    description:
      "Independent product engineer building useful digital products for Africa.",
    url: "https://awesomeakokayo.cv",
    applicationName: "Awesome Akokayo",
  },
  nav: {
    brand: "AA.",
    brandName: "AWESOME AKOKAYO",
    links: [
      { label: "Work", href: "/#work" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/#services" },
      { label: "Process", href: "/#process" },
    ],
    talk: "Let's talk",
    menu: "Menu",
    close: "Close",
    menuLabel: "Open navigation menu",
    closeLabel: "Close navigation menu",
    dialogLabel: "Site navigation",
    skipToContent: "Skip to content",
    cursorHome: "HOME",
    cursorGo: "GO",
    cursorTalk: "TALK",
    cursorExplore: "EXPLORE",
    cursorSend: "SEND",
    cursorTop: "TOP",
    cursorDefault: "OPEN",
  },
  hero: {
    kicker: "PRODUCT ENGINEER  /  AI BUILDER  /  NIGERIA",
    lineOne: "Build",
    accentWord: "useful",
    lineTwo: "things for",
    serifWord: "Africa.",
    description: "Digital products for real needs, built with intent.",
    availability: "OPEN TO FULL-TIME ROLES",
    location: "INDEPENDENT BUILDER · BASED IN NIGERIA",
    scroll: "Scroll to explore",
    visualAlt: "Abstract three-dimensional wireframe form",
  },
  marquee: {
    label: "Areas of practice",
    items: ["FINTECH", "EDTECH", "CIVIC TECH", "AI", "MOBILE"],
  },
  work: {
    eyebrow: "01 / SELECTED WORK",
    title: "Made to matter.",
    intro: "A selection of products, systems, and experiments.",
    viewLabel: "VIEW",
    tagsLabel: "Project technology tags",
    sideNote: "Five selected builds",
    fallbackLink: "#contact",
  },
  projects: [
    {
      name: "OpenBooks",
      category: "Business finance tools",
      description: "Nigeria-first open-source cashbook for small businesses.",
      tags: ["Open source", "Fintech"],
      theme: "yellow",
      kind: "openbooks",
      href: "#contact",
      image: {
        src: "/projects/openbooks.png",
        alt: "OpenBooks landing page with the headline “Run your business with clarity.”",
      },
    },
    {
      name: "Tech Skills Hub",
      category: "Guided learning platform",
      description: "Free, curated roadmaps. 32 tracks, one clear order.",
      tags: ["Next.js", "Prisma", "Neon", "Paystack"],
      theme: "dark",
      kind: "techskills",
      href: "https://techskillhub.cv",
      image: {
        src: "/projects/techskills.png",
        alt: "TechSkillHub landing page with a curated roadmap preview.",
      },
    },
    {
      name: "Flood Report",
      category: "Civic safety app",
      description: "Flood reporting for Southwest Nigeria, powered by AI.",
      tags: ["React Native", "FastAPI", "Gemini AI"],
      theme: "paper",
      kind: "flood",
      href: "#contact",
      image: {
        src: "/projects/flood.png",
        alt: "Flood Report app showing live flood incidents on an Ibadan map.",
      },
    },
    {
      name: "Blancquake Foundation",
      category: "Nonprofit",
      description: "Built for Blancquake Foundation.",
      tags: [],
      theme: "pink",
      kind: "blancquake",
      href: "#contact",
      image: {
        src: "/projects/blancquake.png",
        alt: "Blancquake Foundation poster reading “Making the difference.”",
      },
    },
    {
      name: "EmoHabit",
      category: "Wellness app",
      description: "AI-powered habit tracker.",
      tags: ["React Native", "FastAPI", "Groq", "Firebase"],
      theme: "yellow",
      kind: "emohabit",
      href: "#contact",
      image: {
        src: "/projects/emohabit.png",
        alt: "EmoHabit poster with an AI habit-tracking ring.",
      },
    },
  ] satisfies Project[],
  about: {
    eyebrow: "02 / ABOUT",
    lineOne: "I build from",
    serifWord: "real",
    lineTwo: "problems.",
    text: "Product-focused software engineer. I spot a user problem, then build the fix.",
    rows: [
      { label: "PRODUCT FIRST", sentence: "Every build starts with a user problem." },
      { label: "CLIENT WORK", sentence: "My favorite kind of project." },
      { label: "COMMUNICATION", sentence: "The thing I value most." },
      { label: "ALWAYS TRYING", sentence: "Too comfortable? Time for something new." },
    ],
    button: "More about me",
    href: "/about",
    cursor: "MORE",
    photo: "/about/awesome.jpg",
    photoAlt: "Awesome Akokayo smiling and waving at the camera",
  },
  aboutPage: {
    meta: {
      title: "About — Awesome Akokayo",
      description: "Product-focused software engineer from Nigeria, building useful things for Africa.",
    },
    hero: {
      lineOne: "Hi, I'm",
      serifWord: "Awesome.",
      subline: "Product-focused software engineer from Nigeria.",
    },
    photo: "/about/awesome.jpg",
    photoAlt: "Awesome Akokayo smiling and waving at the camera",
    story: {
      label: "STORY",
      paragraphs: [
        "I'm a computer science graduate who started building before I had the degree.",
        "Along the way I became a product-focused engineer: I see a user problem, then I build from it. That's how most of my projects started.",
        "Client work is some of my favorite, because real people with real needs keep you honest.",
      ],
    },
    drives: {
      label: "WHAT DRIVES ME",
      items: [
        { word: "Build", line: "I love making cool things from scratch.", theme: "pink" },
        { word: "Design", line: "I care how it looks and how it feels.", theme: "yellow" },
        { word: "Communicate", line: "Clear talk makes better products.", theme: "paper" },
        { word: "Evolve", line: "Comfort is my cue to try something harder.", theme: "dark" },
      ],
    },
    thinking: {
      label: "HOW I THINK",
      text: "There's always more to do in tech, and change is how we move forward. When I get too comfortable, I get an itch to try something new and make things better.",
    },
    looking: {
      label: "WHAT I'M LOOKING FOR",
      text: "A team of creative people building cool stuff. If that's you, let's talk.",
      button: "Let's talk",
      href: "/#contact",
    },
  },
  services: {
    eyebrow: "03 / WHAT I DO",
    title: "Built around outcomes.",
    intro: "From first sketch to production systems.",
    items: [
      {
        number: "01",
        name: "Web Apps",
        description: "Production-ready web products, from first screen to launch.",
        icon: "window",
      },
      {
        number: "02",
        name: "Mobile Apps",
        description: "Mobile-first product experiences built for everyday use.",
        icon: "phone",
      },
      {
        number: "03",
        name: "AI Products",
        description: "Useful AI workflows that solve a real job.",
        icon: "orbit",
      },
      {
        number: "04",
        name: "Fintech Systems",
        description: "Trusted payment and ledger systems built to scale.",
        icon: "layers",
      },
    ],
  },
  numbers: {
    eyebrow: "04 / BY THE NUMBERS",
    title: "A little perspective.",
    stats: [
      { value: 32, suffix: "", label: "Learning tracks live", detail: "Across Tech Skills Hub" },
      { value: 5, suffix: "", label: "Featured builds", detail: "Selected work" },
      { value: 2, suffix: "", label: "Free products for Africa", detail: "Open source and free to use" },
    ],
  },
  process: {
    eyebrow: "05 / THE PROCESS",
    title: "From problem to product.",
    hint: "Scroll to move through the process",
    mobileTitle: "A clear way forward.",
    steps: [
      {
        number: "01",
        word: "Discover",
        sentence: "Understand people, context, and constraints.",
      },
      {
        number: "02",
        word: "Shape",
        sentence: "Turn the problem into a clear plan.",
      },
      {
        number: "03",
        word: "Build",
        sentence: "Make the product real, fast, and carefully.",
      },
      {
        number: "04",
        word: "Validate",
        sentence: "Test, refine, and prepare for launch.",
      },
    ],
  },
  contact: {
    eyebrow: "06 / HAVE A GOOD PROBLEM?",
    lineOne: "Let's build",
    lineTwo: "something.",
    button: "Start a conversation",
    emailSubject: "Let's build something",
    emailNote: "For products, partnerships, and good problems.",
    email: "awesomeakokayo@gmail.com",
    links: [
      { label: "EMAIL", href: "mailto:awesomeakokayo@gmail.com" },
      { label: "GITHUB", href: "https://github.com/awesomeakokayo" },
      { label: "LINKEDIN", href: "https://www.linkedin.com/in/awesome-stephens/" },
    ],
  },
  footer: {
    location: "BASED IN NIGERIA · BUILDING FOR AFRICA",
    copyright: "© 2026 AWESOME AKOKAYO",
    backToTop: "BACK TO TOP",
  },
};
