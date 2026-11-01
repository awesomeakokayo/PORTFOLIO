# Awesome Akokayo — Portfolio rebuild

Stage 01 shell for the Next.js App Router rebuild.

## Project media

Project cards read screenshots from `public/projects/` and fall back to the CSS device mockups when no image is set.

| File | Project |
|---|---|
| `public/projects/openbooks.png` | OpenBooks |
| `public/projects/techskills.png` | Tech Skills Hub |
| `public/projects/flood.png` | Flood Report |
| `public/projects/blancquake.png` | Blancquake Foundation |
| `public/projects/emohabit.png` | EmoHabit |

Replace a file in place to update a card. Keep the same filename and a landscape crop; cards render images with `object-fit: cover`.

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

## Stage 01 files

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  custom-cursor.tsx
  site-nav.tsx
  smooth-scroll.tsx
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
tailwind.config.ts
tsconfig.json
```

The main page is intentionally an empty stage shell. The hero is Stage 02; no temporary hero content has been added here.

Motion for React is the maintained successor to Framer Motion and uses the same motion-component model. Import paths use `motion/react`.
