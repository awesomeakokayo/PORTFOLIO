# Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. Features scroll-triggered animations, interactive project cards, and a full project archive with filtering.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Scroll-Triggered Animations**: Projects reveal with smooth animations as you scroll
- **Interactive Project Cards**: Hover to reveal tech stack and quick actions
- **Project Archive**: Full project listing with search and filter by technology
- **Project Detail Modal**: Detailed view of each project with screenshots and links
- **Contact Modal**: "Let's Work" CTA with contact form
- **Accessibility**: Keyboard navigation, ARIA labels, and skip-to-content link
- **Performance Optimized**: Lazy loading images, optimized animations

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectModal.jsx
│   ├── TechStack.jsx
│   ├── WhatICanDo.jsx
│   ├── UpcomingProjects.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── SkipToContent.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   └── Archive.jsx
├── data/               # Data files
│   └── projects.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Adding/Updating Projects

To add or update projects, edit `src/data/projects.js`:

```javascript
{
  id: 1,
  title: "Project Name",
  role: "Your Role",
  summary: "Short description",
  description: "Full description",
  tech: ["React", "Node.js"],
  links: {
    live: "https://example.com",
    backend: "https://github.com/...",
    frontend: "https://github.com/..."
  },
  highlights: [
    "Key achievement 1",
    "Key achievement 2"
  ],
  impact: "Impact statement",
  images: [
    "assets/image1.png",
    "assets/image2.png"
  ],
  status: "complete",
  featured: true
}
```

## Customization

### Colors

Edit `tailwind.config.js` to change the primary color:

```javascript
colors: {
  primary: {
    DEFAULT: '#00f5ff',  // Your primary color
    dark: '#00d4e6',      // Darker variant
  },
}
```

### Fonts

Fonts are loaded from Google Fonts in `index.html`. To change fonts, update the font link and `tailwind.config.js`.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite and deploy

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Render

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm run preview` (or use a static file server)

## Performance Tips

- Images are lazy-loaded by default
- Use WebP/AVIF formats for better performance
- Optimize images before adding to `assets/` folder
- Consider using a CDN for static assets

## Accessibility

The site includes:
- Keyboard navigation support
- ARIA labels on interactive elements
- Skip-to-content link
- High contrast colors
- Focus indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Awesome Akokayo. All rights reserved.
