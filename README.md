# Portfolio — Awesome Akokayo

Personal portfolio site for Awesome Akokayo, a software engineer and AI builder from Nigeria.

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icons (with brand icon shim for Github, LinkedIn, YouTube, Twitter)

## Architecture

The entire site renders from a single component file:

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Renders PortfolioBrandSystem
├── index.css             # Tailwind + CSS variables + component classes
├── lib/
│   ├── brandIcons.jsx    # SVG brand icons (Github, LinkedIn, YouTube, Twitter)
│   └── lucide-react.js   # Vite alias shim — re-exports lucide-react + brand icons
PortfolioBrandSystem.jsx  # Single-file site (all sections, tokens, content)
```

### Why the shim?

`lucide-react@1.7.0` removed brand icons (Github, Linkedin, Youtube, Twitter). The `src/lib/lucide-react.js` shim re-exports everything from the real package and adds the 4 brand icons from `brandIcons.jsx`. A Vite alias in `vite.config.js` routes all `lucide-react` imports through the shim.

## Sections

| # | Section | Description |
|---|---------|-------------|
| 00 | Hero | Name, tagline, CTA buttons, tech stack chips, stats |
| 01 | About | Bio, credentials |
| 02 | What I Build | Capabilities (Web/Mobile, AI, Zero-to-One) |
| 03 | Ventures | Project cards with status indicators |
| 04 | Why Now | Market context, what I bring, what I'm building toward |
| 05 | Recognition | Springer, NACOS, products shipped |
| 06 | Let's Build | Contact CTA |

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

Defined in `PortfolioBrandSystem.jsx` as `C` (colors) and `F` (fonts):

| Token | Value | Usage |
|-------|-------|-------|
| ink | `#080808` | Page background |
| paper | `#f4f3ef` | Primary text |
| brand | `#ff5c00` | Accent orange |
| signal | `#4ade80` | Live/active status |
| muted | `#9c9b94` | Secondary text |

Fonts: Ojuju (display), Space Mono (mono/tags), Inter (body).
