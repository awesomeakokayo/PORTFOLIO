/**
 * content.js — every panel's copy, sourced from verified data.
 *
 * Heritage copy follows the research brief: only documented facts, object
 * data from The Metropolitan Museum of Art's public record (object 316393),
 * and clear acknowledgement. The 3D vitrine shows an interpretive stand-in,
 * never a replica of the artefact or its reproduction.
 */

export const HERITAGE = {
  viewer: {
    meta: "EXHIBIT CASE / CENTRE VITRINE",
    interpretive:
      "The object in this case is an exhibition stand-in made from museum-style materials. It is not the artefact and is not offered as a reproduction. The authorised photography lives on the Met's own record, linked below.",
  },
  exhibit: {
    title: "Plaque with Warrior and Attendants",
    culture: "Edo peoples",
    period: "ca. 1540–70",
    medium: "Brass",
    dimensions: "Overall: 43.2 × 38.1 × 8.9 cm (12.7 kg)",
    artist: "Ìgùn Ẹ́rọ̀nwwọ̀n (brass-casting guild) artists",
    department: "The Michael C. Rockefeller Wing",
    accession: "Accession 1990.332",
    credit: "Gift of Mr. and Mrs. Klaus G. Perls, 1990",
    rights: "Public domain (Met Open Access)",
    record: "https://www.metmuseum.org/art/collection/search/316393",
    recordImage:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DT1231.jpg",
    summary:
      "Brass plaques of this kind were cast by the brass-casting guild for the royal palace at Benin City and recorded the court, its warriors and its attendants. The plaque shown here is held at The Metropolitan Museum of Art, which documents it as the work of Ìgùn Ẹ́rọ̀nwwọ̀n (brass-casting guild) artists of the Edo peoples, dated ca. 1540–70.",
  },
  context: {
    title: "The court at Benin City",
    body:
      "The Kingdom of Benin (Edo peoples, present-day Nigeria) maintained guild-run court arts in cast brass, ivory and wood. Documentary research and object records for these traditions are published by museums and by Digital Benin, which links records from institutions worldwide.",
    note: "Do not conflate the kingdom with the modern Republic of Benin.",
  },
  sources: {
    title: "Where this record comes from",
    note:
      "No artefact photographs are republished here. The case shows an interpretive stand-in; authorised imagery and full data are one link away.",
    items: [
      {
        label: "The Metropolitan Museum of Art",
        detail: "Object record: Plaque with Warrior and Attendants (316393)",
        url: "https://www.metmuseum.org/art/collection/search/316393",
      },
      {
        label: "Digital Benin",
        detail: "Research platform linking Benin objects held worldwide",
        url: "https://digitalbenin.org",
      },
      {
        label: "The Met, Benin chronology",
        detail: "Timeline essay for the kingdom's court art",
        url: "https://www.metmuseum.org/essays/benin-chronology",
      },
      {
        label: "National Museums Scotland",
        detail: "The court arts and history of the Kingdom of Benin",
        url: "https://www.nms.ac.uk/discover-catalogue/the-court-arts-and-history-of-the-kingdom-of-benin",
      },
      {
        label: "Smithsonian NMAA",
        detail: "National Museum of African Art collection research",
        url: "https://africa.si.edu",
      },
    ],
  },
};

export const WORKSHOP = {
  intro:
    "Full-stack engineer building web, mobile and AI products from architecture to launch. Based in Nigeria — working remotely.",
  experience: [
    {
      role: "Lead Full-Stack Engineer",
      company: "NaviPro",
      meta: "AI career platform · 2025 — Present",
      detail:
        "Led a five-person cross-functional team and architected FastAPI services for personalised roadmaps, mentorship and resource discovery.",
      stack: "FastAPI · React · LLM APIs · YouTube Data API",
    },
    {
      role: "Founder & Full-Stack Engineer",
      company: "TechSkillHub",
      meta: "EdTech product · 2025 — Present",
      detail:
        "Built a learning platform with structured tracks, authentication, saved progress, content delivery and guided learning flows.",
      stack: "Next.js · Prisma · PostgreSQL · Auth.js",
    },
    {
      role: "Mobile Application Engineer",
      company: "Independent product development",
      meta: "Mobile + civic technology · 2025 — Present",
      detail:
        "Built a flood-reporting experience that combines community reports with AI-assisted image analysis and a structured backend.",
      stack: "React Native · FastAPI · PostgreSQL · Gemini",
    },
    {
      role: "Full-Stack Developer",
      company: "Academic journal platform",
      meta: "Academic project · 2025",
      detail:
        "Delivered manuscript submission, editorial review and publication workflows, from data model and API to responsive interface.",
      stack: "FastAPI · PostgreSQL · JavaScript",
    },
  ],
  toolkit: [
    {
      label: "Languages & frontend",
      items: "TypeScript, JavaScript, Python, React, Next.js, React Native, Expo, Tailwind CSS",
    },
    {
      label: "Backend & data",
      items: "FastAPI, Node.js, REST APIs, PostgreSQL, Prisma, Redis, Firebase",
    },
    {
      label: "AI & integrations",
      items: "LLM APIs, structured generation, retrieval workflows, Paystack, OAuth, YouTube Data API",
    },
    {
      label: "Cloud & delivery",
      items: "Git, GitHub, Docker, CI/CD, Vercel, Render, Netlify",
    },
  ],
};

export const STUDIO = {
  heading: "Contact Studio",
  intro: "Tell me what you're working on. I'll get back to you by email.",
  email: "awesomeakokayo@gmail.com",
  whatsappNumber: "+234 902 037 2640",
  whatsappLink:
    "https://wa.me/2349020372640?text=Hello%20Awesome%2C%20I%20saw%20your%203D%20museum%20portfolio.",
  formNote:
    "The project form lives on the classic site's contact studio — this desk links straight to you by email or WhatsApp.",
  location: "Based in Nigeria · Working remotely",
};
