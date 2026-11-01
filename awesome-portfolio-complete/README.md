# Awesome Akokayo — Portfolio

Mobile-first portfolio for Awesome Akokayo, built with Next.js App Router, Tailwind, Motion for React and Lenis.

## Project media

The work section renders flat logo cards. Logos live in `public/logos/` and are drawn with `object-fit: contain`, so they never crop or distort.

| File | Project |
|---|---|
| `public/logos/openbooks.png` | OpenBooks |
| `public/logos/tech-skills.png` | Tech Skills Hub |
| `public/logos/elroi-hub.png` | Elroi Hub |
| `public/logos/flood-report.png` | Flood Report |
| `public/logos/blancquake.png` | Blancquake Foundation |
| `public/logos/navipro.png` | NaviPro |

Projects with a live site open it in a new tab. Flood Report and NaviPro have no public URL yet.

## About photo

`public/about/awesome.jpg` is the portrait used on the home About section and the `/about` page.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verify

```bash
npm run typecheck
npm run build
```

## Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
  about/page.tsx
  opengraph-image.tsx
components/
  about-photo.tsx
  about-section.tsx
  contact-section.tsx
  custom-cursor.tsx
  hero-section.tsx
  numbers-section.tsx
  process-section.tsx
  selected-work.tsx
  services-section.tsx
  site-footer.tsx
  site-nav.tsx
  smooth-scroll.tsx
lib/
  content.ts
public/
  about/
  logos/
```

All site copy, project metadata and links live in `lib/content.ts`.

Motion for React is the maintained successor to Framer Motion and uses the same motion-component model. Import paths use `motion/react`.
