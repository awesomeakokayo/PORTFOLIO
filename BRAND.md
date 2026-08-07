# Brand System — Awesome Akokayo

Visual identity system for all digital presence: portfolio, socials, decks, and products.

---

## Colors

### Core Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Ink | `#080808` | 8, 8, 8 | Page background |
| Surface | `#0e0e0d` | 14, 14, 13 | Card backgrounds, sections |
| Surface Hover | `#121210` | 18, 18, 16 | Hovered/focused cards |
| Paper | `#f4f3ef` | 244, 243, 239 | Primary text |
| Paper Dim | `#b8b7b1` | 184, 183, 177 | Body copy |
| Muted | `#9c9b94` | 156, 155, 148 | Secondary text |
| Faint | `#67665f` | 103, 102, 95 | Tertiary, metadata, labels |

### Accent

| Name | Hex | Usage |
|------|-----|-------|
| Brand | `#ff5c00` | Primary accent — orange |
| Brand Hover | `#ff7324` | Hover state for brand elements |
| Brand Dim | `rgba(255, 92, 0, 0.10)` | Subtle orange backgrounds |
| Brand Glow | `rgba(255, 92, 0, 0.22)` | Glow effects |
| Brand Border | `rgba(255, 92, 0, 0.35)` | Orange borders |

### Status

| Name | Hex | Usage |
|------|-----|-------|
| Signal | `#4ade80` | Live/active status green |
| Success | `#22C55E` | Success state |

### Borders

| Name | Value | Usage |
|------|-------|-------|
| Hair | `rgba(244, 243, 239, 0.1)` | Subtle dividers, card borders |
| Border | `#1C1C1C` | Default border |
| Border Lit | `rgba(244, 243, 239, 0.1)` | Light border |

### Glass

| Name | Value | Usage |
|------|-------|-------|
| Glass | `rgba(8, 8, 8, 0.85)` | Nav background with backdrop blur |

---

## Typography

Three font families. Each has a specific role.

### Display — Ojuju

**Role:** Headlines, hero H1, section H2s, big statements.

- **Weights used:** 400, 500, 600, 700, 800
- **Stack:** `'Ojuju', sans-serif`
- **CSS variable:** `--font-display`
- **Load via:** Google Fonts

```css
font-family: 'Ojuju', sans-serif;
```

### Mono — Space Mono

**Role:** Eyebrows (section labels), badges, tags, tech stack chips, nav links, buttons.

- **Weights used:** 400, 700
- **Stack:** `'Space Mono', monospace`
- **CSS variable:** `--font-mono`
- **Load via:** Google Fonts

```css
font-family: 'Space Mono', monospace;
```

### Body — Inter

**Role:** Paragraphs, bios, descriptions, everything else.

- **Weights used:** 400, 500, 600, 700, 800
- **Stack:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **CSS variable:** `--font-body`
- **Load via:** Google Fonts

```css
font-family: 'Inter', sans-serif;
```

### Google Fonts Import

```
https://fonts.googleapis.com/css2?family=Ojuju:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap
```

---

## Icons

### Library

Lucide React (`lucide-react@1.7.0`) — MIT licensed.

### Brand Icons

Brand icons were removed from lucide-react. Provided via custom SVG shim at `src/lib/brandIcons.jsx`:

| Icon | SVG | Fill |
|------|-----|------|
| Github | GitHub octocat logo | `currentColor` |
| Linkedin | LinkedIn "in" logo | `currentColor` |
| Youtube | YouTube play button | `currentColor` |
| Twitter | X/Twitter bird logo | `currentColor` |

All brand icons use `fill="currentColor"` and inherit color from parent.

### Icons Used in Site

| Icon | Source | Used In |
|------|--------|---------|
| ArrowRight | lucide | CTA buttons |
| ArrowUpRight | lucide | Project links |
| Smartphone | lucide | Capabilities — Web & Mobile |
| Brain | lucide | Capabilities — AI Products |
| Rocket | lucide | Capabilities — Zero-to-One |
| Mail | lucide | Contact CTA |
| Menu | lucide | Mobile nav toggle |
| X | lucide | Mobile nav close |
| ChevronDown | lucide | Hero scroll indicator |
| Github | brand shim | Footer, SystemGuide |
| Linkedin | brand shim | Footer, FinalCTA |
| Youtube | brand shim | Footer |
| Twitter | brand shim | Footer |

---

## Spacing & Layout

### Container

- Max width: `1280px` (`max-w-7xl`)
- Padding mobile: `24px` (`px-6`)
- Padding tablet: `40px` (`md:px-10`)
- Padding desktop: `64px` (`lg:px-16`)

### Section Vertical Rhythm

- Mobile: `80px` top/bottom (`py-20`)
- Tablet+: `112px` top/bottom (`md:py-28`)

### Grid

- Gap: `56px` (`gap-14`)
- About section: 2-column grid (`lg:grid-cols-2`)
- Capabilities: 3-column grid (`md:grid-cols-3`)
- Work: 2-column grid (`md:grid-cols-2`)
- Stats: 4-column grid (`md:grid-cols-4`)

---

## Components

### Chip / Badge

```css
background: rgba(244, 243, 239, 0.04);
border: 1px solid rgba(244, 243, 239, 0.1);
color: #9c9b94;
border-radius: 9999px;
padding: 6px 14px;
font-size: 0.75rem;
```

### Button Primary

```css
background: #ff5c00;
color: #080808;
border-radius: 9999px;
padding: 14px 28px;
font-weight: 600;
```

Hover: `background: #ff7324`

### Button Outline

```css
border: 1px solid rgba(244, 243, 239, 0.25);
color: #f4f3ef;
background: transparent;
border-radius: 9999px;
padding: 14px 28px;
font-weight: 600;
```

Hover: `border-color: #f4f3ef; background: rgba(244, 243, 239, 0.06)`

### Surface (Card)

```css
background: #0e0e0d;
border: 1px solid rgba(244, 243, 239, 0.1);
border-radius: 16px;
```

Hover: `border-color: rgba(255, 92, 0, 0.4); background: #121210`

### Hairline Divider

```css
border-top: 1px solid rgba(244, 243, 239, 0.1);
/* or */
border-bottom: 1px solid rgba(244, 243, 239, 0.1);
```

### Icon Link

```css
color: #9c9b94;
border: 1px solid rgba(244, 243, 239, 0.12);
border-radius: 9999px;
padding: 10px 16px;
```

Hover: `color: #080808; background: #f4f3ef; border-color: #f4f3ef`

### Nav Link

```css
color: #9c9b94;
```

Hover: `color: #f4f3ef`

---

## Animations

### Fade Up

Entrance animation for sections.

```css
animation: fadeUp 0.9s cubic-bezier(.16, .84, .44, 1) both;

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
```

Delays: `.delay-1` (80ms), `.delay-2` (160ms), `.delay-3` (240ms), `.delay-4` (360ms), `.delay-5` (480ms)

### Bounce Slow

Scroll indicator animation.

```css
animation: bounceSlow 2.2s ease-in-out infinite;

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); opacity: .5; }
  50% { transform: translateY(6px); opacity: 1; }
}
```

### Reduced Motion

All animations disabled when `prefers-reduced-motion: reduce`.

---

## Voice

- Confident, not loud.
- Specific, not generic.
- Built, not promised.
- Nigerian-first, globally minded.

---

## Social Links

| Platform | URL |
|----------|-----|
| GitHub | https://github.com/awesomeakokayo |
| X / Twitter | `#` |
| YouTube | `#` |
| LinkedIn | `#` |
