# Awesome Akokayo — Portfolio

Mobile-first portfolio for Awesome Akokayo, built with Next.js App Router, Tailwind, Motion for React, Lenis and React Three Fiber.

The Next.js app lives at the repository root, so hosting platforms detect it as a Next.js project automatically. The previous Vite site is archived in `resources/` and is excluded from deployments.

## Run locally

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

## Structure

```text
app/                    App Router pages and global styles
components/             Page sections, cursor, scroll, cards
lib/content.ts          All copy, projects and links
public/                 Logos, portrait and static assets
resources/              Archived previous site (not deployed)
HANDOFF.md              Implementation and editing guide
```

## Deploy

Import this repository into Vercel (or any Next.js host) with the default root directory. The root `package.json` is the Next.js app, so the framework is detected as Next.js — no override or subfolder setting is needed. `resources/` is excluded via `.vercelignore`.
