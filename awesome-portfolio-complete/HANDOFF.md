# HANDOFF — Awesome Akokayo Portfolio

This file is the continuation brief for a new chat or developer. It describes the implementation as delivered, not an aspirational design spec.

## 1. Project identity

A mobile-first, editorial portfolio for Awesome Akokayo: product-focused software engineer, full-stack developer, AI builder and founder. The experience should feel like a considered independent creative studio, not a default developer template.

**Stack:** Next.js App Router 16.4.3, React 19.3.1, TypeScript 5.9.3, Tailwind CSS 3.4.17, Motion for React 14.9.0 (`motion/react`), Lenis 1.3.27, React Three Fiber 9.8.2 and Three.js 0.187.0. React Three Fiber v9 is paired with React 19. `@types/node` is pinned to 22.20.5; React and Three type packages are pinned in `package.json`.

**Run locally:**

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## 2. Design system

### Flat color tokens

All colors are CSS variables in `app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#0A0A0A` | Main page background |
| `--color-foreground` | `#F5F5F0` | Main text / paper card |
| `--color-muted` | `#8A8A85` | Supporting text and rules |
| `--color-accent` | `#FF5A1F` | Small accents, labels, buttons, links and cursor |
| `--color-card-pink` | `#FF9ECF` | Pink work cards |
| `--color-card-yellow` | `#FFD93D` | Yellow work/service cards |
| `--color-card-paper` | `#F5F5F0` | Paper work / numbers section |
| `--color-card-dark` | `#151515` | Dark work cards and mockup details |

Keep the design flat. Do not introduce gradients, blur, glow, tinted overlays or new color families. Text on pink, yellow, paper and orange surfaces should remain dark enough for contrast. The nav deliberately uses `mix-blend-mode: difference` to remain legible over the cards.

### Typography

- Display: Bricolage Grotesque, weight 600–700.
- Body: Inter, weight 400–700.
- Labels: JetBrains Mono, uppercase, minimum 12px.
- Editorial contrast: Instrument Serif italic.
- Fonts load through `next/font/google` in `app/layout.tsx`; they expose `--font-display`, `--font-body`, `--font-mono` and `--font-serif`, with local/system fallback families in the stylesheet.

### Spacing and layout

- Main gutter: `--site-gutter: clamp(20px, 4.5vw, 72px)`.
- Max content width: `--site-width: 1600px`.
- Display sizes use fluid `clamp()` values, tight line heights and negative tracking.
- Mobile breakpoints: 900px, 640px and 380px.
- Tap targets are at least 44px for navigation, buttons and contact links.
- `overflow-x: clip` is set on `html` and `body` so sticky sections remain usable.

## 3. File map

```text
app/
  globals.css                 Tokens, layout and responsive styling
  layout.tsx                  Font loading, SEO metadata, global shell
  opengraph-image.tsx         Static 1200×630 social card
  page.tsx                    Ordered section composition
  about/page.tsx              Full about page with its own metadata
  icon.svg                    AA. favicon
components/
  site-nav.tsx                 Fixed desktop nav + accessible mobile overlay
  custom-cursor.tsx            Fine-pointer custom cursor and cursor labels
  smooth-scroll.tsx            Lenis smooth scroll, anchor support
  hero-section.tsx             Three-line headline and initial reveal
  hero-visual.tsx               Lazy canvas, device capability checks, error boundary
  hero-canvas.tsx               Single interactive wireframe object
  hero-visual-fallback.tsx      Static SVG fallback
  marquee-section.tsx           Infinite outlined ticker
  selected-work.tsx              Sticky project stack, logo cards, tilt, live links
  about-section.tsx              Home about section with photo and mono rows
  about-photo.tsx                 Shared rotated portrait treatment for both pages
  services-section.tsx           Four flip service tiles
  numbers-section.tsx             Three in-view count-up stats
  process-section.tsx              Pinned desktop horizontal process / mobile stack
  contact-section.tsx              Giant CTA and magnetic WhatsApp button
  reveal.tsx                        Shared once-only section reveal
  site-footer.tsx                   Small mono footer and back-to-top
lib/
  content.ts                        Central copy, project and link data
public/logos/                       Project logos used by the work cards
public/about/                       Portrait used by the about section and page
HANDOFF.md                           This guide
README.md                            Setup and editing notes
```

## 4. Section implementation status

1. **Navigation:** fixed, blend-mode-difference, rolling desktop links, mobile full-screen dialog, Escape close, focus trap, scroll lock and focus restoration.
2. **Hero:** three-line reveal; orange keyword; Instrument Serif italic “everyone.”; brief subcopy; small wireframe R3F object. Canvas is dynamically loaded only after device checks. Low-memory / low-core devices, reduced motion, WebGL absence or canvas render failure use a static SVG.
3. **Marquee:** infinite outline ticker; pauses on hover for fine pointers and stops under reduced motion.
4. **Selected work:** six sticky logo cards for OpenBooks, Tech Skills Hub, Elroi Hub, Flood Report, Blancquake Foundation and NaviPro. Each card uses a flat brand palette, a contained logo, the project name, a one-line note, a year pill and a discipline pill. Live projects link out in a new tab with an orange `OPEN` hover circle; Flood Report and NaviPro do not link. Small tilt only.
5. **Services:** four tiles; desktop hover/focus flip to yellow; touch devices use tap state; one-line descriptions and tiny inline SVG glyphs.
6. **Numbers:** three count-up stats, animated once on entry; static values for reduced motion.
7. **Process:** four pinned horizontal panels on desktop; vertical sequence on small screens and for reduced-motion visitors.
8. **CTA:** oversized copy, spring-magnetic WhatsApp button with a prefilled message, contact and social links.
9. **Footer:** mono metadata and back-to-top.

## 5. Animation conventions

- Import motion APIs from `motion/react`, not `framer-motion`.
- Shared reveal convention: `opacity: 0`, `y: 40` → visible, once-only `whileInView`, duration 0.8s, easing `[0.22, 1, 0.36, 1]`.
- Hero line reveal is a masked vertical slide with 0.08s stagger.
- Prefer transform and opacity for motion; avoid animating layout dimensions.
- `useReducedMotion()` / `prefers-reduced-motion` disables or simplifies non-essential motion.
- Lenis uses `autoRaf: true` and `anchors: true`; it is not initialized for reduced-motion visitors.
- Custom cursor is enabled only for `(hover: hover) and (pointer: fine)` and is disabled for reduced motion. The `<html>` class `has-custom-cursor` applies native `cursor: none` only while the custom cursor is active.
- Touch does not depend on hover: work details are visible and service tiles reveal through tap state.

## 6. Where to edit content

**Edit `lib/content.ts` first.** It is the single content source for:

- metadata, title and description;
- nav labels and routes;
- hero kicker, headline and supporting copy;
- marquee items;
- work section labels and all six projects (`name`, `category`, `description`, `theme`, `year`, `discipline`, `href`, `logo`);
- services and descriptions;
- stats and labels;
- process steps;
- contact email, WhatsApp number and message, GitHub and LinkedIn;
- footer details.

Do not hard-code replacement project or service copy in components. `Project.logo` points at a local file in `public/logos/`; cards draw it with `object-fit: contain`, so keep transparent PNGs and do not pre-crop them. `href: null` renders a static card with no outbound link.

## 7. Known limitations / not yet done

- OpenBooks, Tech Skills Hub, Elroi Hub and Blancquake Foundation link to live sites. Flood Report and NaviPro are intentionally static until public URLs exist.
- The Tech Skills Hub logo is the current green step mark; swap `public/logos/tech-skills.png` when the new wordmark is supplied.
- The Flood Report and NaviPro marks were designed as flat placeholders in the site palette.
- No deployment was performed and no Vercel project/domain configuration was changed.
- Actual browser QA at 360px, 768px and 1440px, keyboard audit, screen-reader audit and Lighthouse performance/accessibility checks remain to be run after dependencies install.
- `npm run build` and `npx tsc --noEmit` pass in this environment; the social card is generated statically from `app/opengraph-image.tsx`.

## 8. Safe continuation instructions

1. Install dependencies and run the typecheck and production build.
2. Fix any genuine compile/build/runtime issues without changing the visual direction.
3. Confirm live URLs and replace placeholder logos only after fact-checking them.
4. Keep logo files transparent and uncropped; cards use `object-fit: contain`.
5. Run device/browser checks at 360px, 768px and 1440px; verify reduced motion, keyboard navigation, the project stack, mobile menu, and fallback when WebGL is unavailable.
6. Deploy only after the user approves the deployment target and production impact.
