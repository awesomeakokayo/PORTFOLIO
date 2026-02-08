export const projects = [
  {
    id: 1,
    title: "NaviPro",
    role: "Lead / Full-Stack Developer",
    summary: "AI-powered learning assistant: roadmap & daily-task generation, conversational mentor, and video recommendations.",
    description: "NaviPro is an AI-powered learning platform that helps users create personalized learning roadmaps, get daily task recommendations, and interact with an AI mentor. The platform integrates with YouTube to provide relevant video content based on learning goals.",
    tech: ["FastAPI", "React", "React Native", "PostgreSQL", "Redis", "Docker", "Render", "Netlify", "OpenAI", "Groq"],
    links: {
      live: "https://getnavipro.com",
      backend: "https://github.com/awesomeakokayo/navipro-backend",
      frontend: "https://github.com/awesomeakokayo/navipro-frontend"
    },
    highlights: [
      "Built FastAPI backend powering roadmap, chat, and recommendation features; managed API keys & rate limits.",
      "Integrated LLMs (OpenAI/Groq) and YouTube Data API for personalized video suggestions.",
      "Deployed containerized services to Render; frontend on Netlify."
    ],
    impact: "Production-ready LLM orchestration supporting roadmap and mentor flows for early users.",
    images: [
      "/assets/naviprotop.png",
      "/assets/naviproaboutus.png"
    ],
    status: "complete",
    featured: true
  },
  {
    id: 2,
    title: "Alex Ekwueme Federal University — Journal Platform",
    role: "Full-Stack Developer",
    summary: "Submission & editorial platform with admin review workflows and secure submission handling.",
    description: "A comprehensive journal submission and editorial management system for the university. The platform enables researchers to submit papers, track their status, and allows administrators to review, approve, or request revisions.",
    tech: ["FastAPI", "PostgreSQL", "Neon", "HTML", "CSS", "JavaScript", "Render"],
    links: {
      backend: "https://github.com/awesomeakokayo/journal-platform-backend",
      frontend: "https://github.com/awesomeakokayo/journal-platform-frontend"
    },
    highlights: [
      "Designed RESTful API for submissions, authentication, admin actions, and editorial metadata.",
      "Implemented responsive frontend with modular UI for submission and review flows.",
      "Deployed services to Render; configured domain & routing for production access."
    ],
    impact: "Delivered a production-ready submission & review system for the university with modular UI and secure backend endpoints.",
    images: [
      "/assets/aefunaijournalarchives.png",
      "/assets/aefunai journaldetails.png"
    ],
    status: "complete",
    featured: true
  },
  {
    id: 3,
    title: "Ambition Smiler — Artist Music Catalog",
    role: "Full-Stack Developer",
    summary: "Admin content management for music uploads, streaming links, and catalog management.",
    description: "A content management system for artists to manage their music catalog, upload tracks, manage streaming links, and organize their discography. Features an admin dashboard for easy content management.",
    tech: ["PostgreSQL", "Render", "Netlify", "Node.js", "FastAPI"],
    links: {
      live: "https://ambitionsmiler.com",
      repo: "https://github.com/awesomeakokayo/ambition-smiler"
    },
    highlights: [
      "Built admin login and content management backend; integrated deployment pipelines to Render and Netlify.",
      "Worked with UI/UX designer to deliver the admin interface and upload flows."
    ],
    impact: "Enabled artists to manage catalogs and push uploads to streaming platforms; simplified admin workflows for content management.",
    images: [
      "/assets/ambitionsmilercover.png",
      "/assets/ambitionsmiler trackdetails.png"
    ],
    status: "complete",
    featured: true
  },
  {
    id: 5,
    title: "Real-time flood reporting app",
    role: "Full-Stack Developer",
    summary: "Real-time flood reporting app for tracking and reporting floods in south-west nigeria",
    description: "Real-time flood reporting app for tracking and reporting floods in south-west nigeria",
    tech: ["React Native", "TypeScript", "FastAPI", "WebSockets", "PostgreSQL", "Gemini-flash", "Render", "Expo"],
    links: {
      backend: "https://github.com/awesomeakokayo/Flood-Report-App/tree/main/app",
      frontend: "https://github.com/awesomeakokayo/Flood-Report-App/tree/main/src"
    },
    highlights: [
      "Designed RESTful API for submissions, authentication, AI verification of flood reports, and flood reporting.",
      "Implemented responsive frontend with modular UI for Flood reporting and review flows from AI.",
      "Deployed services to Render."
    ],
    impact: "Enabled users to report floods in real-time and verify reports with AI; simplified admin workflows for content management.",
    images: [
      "/assets/floodreport1.jpg",
      "/assets/floodreport2.jpg",
      "/assets/floodreport3.jpg",
      "/assets/floodreport4.jpg",
      "/assets/floodreport5.jpg"
    ],
    status: "complete",
    featured: true
  },
];

export const upcomingProjects = [
  {
    id: 5,
    title: "Routine Management App",
    summary: "Time management app for tracking and organizing daily routines",
    status: "in-progress",
    tech: ["React Native", "FastAPI", "WebSockets"]
  },

];
