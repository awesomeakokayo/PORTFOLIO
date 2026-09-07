# Portfolio — Awesome Akokayo

Personal portfolio site for Awesome Akokayo, an AI-native full-stack developer and product builder from Nigeria.

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icons

## Architecture

The portfolio is a React/Vite site with the main page composition in `src/PortfolioSiteClean.jsx` and the selected-project experience in `src/ProjectShowcase.jsx`.

```text
src/
├── main.jsx
├── App.jsx
├── PortfolioSiteClean.jsx   # Main portfolio sections and content
├── ProjectShowcase.jsx      # Selected projects
├── FramerMotionLayer.jsx
├── index.css
└── lib/
    ├── brandIcons.jsx
    └── lucide-react.js
```

## Sections

| # | Section | Description |
|---|---------|-------------|
| 00 | Hero | AI-native positioning, core stack, CTA and headline |
| 01 | Selected Work | OpenBooks NG, NaviPro, Tech Skills Hub, Southwest Flood Monitor, EmoHabit and other builds |
| 02 | Engineering Experience | Full-stack engineering roles, ownership and delivery highlights |
| 03 | How I Help | Web/mobile, AI-native products and idea-to-production capabilities |
| 04 | Process | Understand → Shape → Build → Validate → Ship |
| 05 | Technical Toolkit | Languages, frontend, backend/data, AI, cloud and integrations |
| 06 | About | Engineering philosophy, education, certifications and leadership |
| 07 | Contact | Direct project and collaboration CTA |

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Brand Tokens

Defined in `PortfolioSiteClean.jsx` and the site's CSS:

| Token | Value | Usage |
|-------|-------|-------|
| ink | `#080808` | Page background |
| paper | `#f4f3ef` | Primary text |
| brand | `#ff5c00` | Accent orange |
| signal | `#4ade80` | Live/active status |
| muted | `#9c9b94` | Secondary text |

Fonts: Ojuju (display), Space Mono (mono/tags), Inter (body).
