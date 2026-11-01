import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "awesome-appearance-level";

const LIGHT = {
  canvas: [246, 245, 240],
  surface: [251, 250, 246],
  surface2: [238, 236, 228],
  ink: [10, 12, 10],
  inkSoft: [59, 62, 56],
  muted: [111, 116, 107],
  faint: [154, 158, 149],
  line: [222, 221, 212],
  lineStrong: [200, 199, 188],
  accent: [31, 74, 61],
  accentDeep: [21, 56, 45],
  accentFill: [31, 74, 61],
  pineSoft: [230, 237, 231],
  sage: [207, 220, 209],
  clay: [189, 116, 81],
  contact: [233, 238, 232],
  footer: [31, 74, 61],
  toneClayA: [244, 232, 224],
  toneClayB: [221, 198, 181],
  tonePineA: [238, 243, 238],
  tonePineB: [194, 212, 197],
  toneMistA: [240, 243, 242],
  toneMistB: [210, 220, 218],
  toneSandA: [244, 239, 228],
  toneSandB: [220, 208, 186],
  fallback1: [244, 241, 232],
  fallback2: [215, 227, 216],
  fallback3: [43, 90, 74],
  heroGlow1: [207, 220, 209],
  heroGlow2: [238, 234, 223],
};

const DARK = {
  canvas: [8, 11, 9],
  surface: [14, 18, 15],
  surface2: [20, 25, 22],
  ink: [250, 249, 242],
  inkSoft: [198, 201, 192],
  muted: [150, 156, 146],
  faint: [108, 115, 106],
  line: [34, 41, 36],
  lineStrong: [52, 61, 55],
  accent: [158, 230, 176],
  accentDeep: [120, 210, 146],
  accentFill: [151, 227, 171],
  pineSoft: [22, 48, 35],
  sage: [40, 70, 54],
  clay: [224, 151, 115],
  contact: [13, 22, 17],
  footer: [9, 20, 15],
  toneClayA: [48, 33, 27],
  toneClayB: [34, 24, 20],
  tonePineA: [24, 42, 31],
  tonePineB: [16, 30, 22],
  toneMistA: [28, 38, 34],
  toneMistB: [18, 26, 23],
  toneSandA: [46, 39, 27],
  toneSandB: [31, 27, 19],
  fallback1: [58, 57, 51],
  fallback2: [51, 74, 60],
  fallback3: [43, 90, 74],
  heroGlow1: [52, 96, 73],
  heroGlow2: [80, 70, 52],
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const mix = (a, b, t) => a.map((value, index) => Math.round(value + (b[index] - value) * t));
const rgb = (arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
const hex = (arr) =>
  "#" + arr.map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0")).join("");
const rgba = (arr, alpha) => `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${alpha.toFixed(3)})`;

const luminance = (arr) => {
  const [r, g, b] = arr.map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const smoothstep = (edge0, edge1, value) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

export function readStoredLevel() {
  if (typeof window === "undefined") return 0;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) return 0;
    const value = Number(stored);
    return Number.isFinite(value) ? clamp(value, 0, 100) : 0;
  } catch {
    return 0;
  }
}

export function getThemeName(level) {
  if (level <= 6) return "Light";
  if (level >= 94) return "Dark";
  if (level < 50) return `Dusk ${Math.round(level)}%`;
  if (level < 68) return `Dusk ${Math.round(level)}%`;
  return `Dark ${Math.round(level)}%`;
}

export function getThemeMode(level) {
  return level >= 68 ? "dark" : "light";
}

export function applyTheme(level) {
  if (typeof document === "undefined") return;

  const t = clamp(level, 0, 100) / 100;
  const surfaceMix = t <= 0.5 ? t * 0.6 : 0.3 + (t - 0.5) * 1.4;
  const dark = t >= 0.68;
  const dusk = smoothstep(0.1, 0.55, t);

  const canvas = mix(LIGHT.canvas, DARK.canvas, surfaceMix);
  const surface = mix(LIGHT.surface, DARK.surface, surfaceMix);
  const surface2 = mix(LIGHT.surface2, DARK.surface2, surfaceMix);
  const line = mix(LIGHT.line, DARK.line, surfaceMix);
  const lineStrong = mix(LIGHT.lineStrong, DARK.lineStrong, surfaceMix);

  const palette = dark ? DARK : LIGHT;
  const ink = palette.ink;
  const inkSoft = dark ? DARK.inkSoft : mix(LIGHT.inkSoft, LIGHT.ink, dusk * 0.9);
  const muted = dark ? DARK.muted : mix(LIGHT.muted, LIGHT.ink, dusk * 0.98);
  const faint = dark ? DARK.faint : mix(LIGHT.faint, LIGHT.ink, dusk * 0.94);

  const accent = dark ? DARK.accent : mix(LIGHT.accent, LIGHT.ink, dusk * 0.55);
  const accentDeep = dark ? DARK.accentDeep : mix(LIGHT.accentDeep, LIGHT.ink, dusk * 0.5);
  const accentFill = dark ? DARK.accentFill : mix(LIGHT.accentFill, LIGHT.ink, dusk * 0.42);
  const onAccent = luminance(accentFill) > 0.42 ? rgb(mix(DARK.canvas, [0, 0, 0], 0.4)) : "#f7f4e9";

  const glassAlpha = 0.6 - surfaceMix * 0.49;
  const glassBorderAlpha = 0.72 - surfaceMix * 0.55;
  const glassHighlightAlpha = 0.78 - surfaceMix * 0.58;

  const toneClayA = mix(LIGHT.toneClayA, DARK.toneClayA, surfaceMix);
  const toneClayB = mix(LIGHT.toneClayB, DARK.toneClayB, surfaceMix);
  const tonePineA = mix(LIGHT.tonePineA, DARK.tonePineA, surfaceMix);
  const tonePineB = mix(LIGHT.tonePineB, DARK.tonePineB, surfaceMix);
  const toneMistA = mix(LIGHT.toneMistA, DARK.toneMistA, surfaceMix);
  const toneMistB = mix(LIGHT.toneMistB, DARK.toneMistB, surfaceMix);
  const toneSandA = mix(LIGHT.toneSandA, DARK.toneSandA, surfaceMix);
  const toneSandB = mix(LIGHT.toneSandB, DARK.toneSandB, surfaceMix);

  const contact = mix(LIGHT.contact, DARK.contact, surfaceMix);
  const footer = mix(LIGHT.footer, DARK.footer, surfaceMix);
  const glow1 = mix(LIGHT.heroGlow1, DARK.heroGlow1, surfaceMix);
  const glow2 = mix(LIGHT.heroGlow2, DARK.heroGlow2, surfaceMix);
  const fallback1 = mix(LIGHT.fallback1, DARK.fallback1, surfaceMix);
  const fallback2 = mix(LIGHT.fallback2, DARK.fallback2, surfaceMix);

  const vars = {
    "--rb-canvas": rgb(canvas),
    "--rb-surface": rgb(surface),
    "--rb-surface-2": rgb(surface2),
    "--rb-ink": rgb(ink),
    "--rb-ink-soft": rgb(inkSoft),
    "--rb-muted": rgb(muted),
    "--rb-faint": rgb(faint),
    "--rb-line": rgb(line),
    "--rb-line-strong": rgb(lineStrong),
    "--rb-pine": rgb(accent),
    "--rb-pine-deep": rgb(accentDeep),
    "--rb-pine-fill": rgb(accentFill),
    "--rb-on-pine": onAccent,
    "--rb-pine-soft": rgb(mix(LIGHT.pineSoft, DARK.pineSoft, surfaceMix)),
    "--rb-sage": rgb(mix(LIGHT.sage, DARK.sage, surfaceMix)),
    "--rb-clay": rgb(mix(LIGHT.clay, DARK.clay, surfaceMix)),
    "--rb-glass": rgba([255, 255, 255], glassAlpha),
    "--rb-glass-strong": rgba([255, 255, 255], Math.min(0.92, glassAlpha + 0.16)),
    "--rb-glass-border": rgba([255, 255, 255], glassBorderAlpha),
    "--rb-glass-highlight": rgba([255, 255, 255], glassHighlightAlpha),
    "--rb-header-bg": rgba(canvas, 0.82),
    "--rb-header-bg-strong": rgba(canvas, 0.94),
    "--rb-shadow-color": rgba([0, 0, 0], 0.18 + surfaceMix * 0.2),
    "--rb-shadow-soft": rgba([0, 0, 0], 0.08 + surfaceMix * 0.12),
    "--rb-tone-clay-a": rgb(toneClayA),
    "--rb-tone-clay-b": rgb(toneClayB),
    "--rb-tone-pine-a": rgb(tonePineA),
    "--rb-tone-pine-b": rgb(tonePineB),
    "--rb-tone-mist-a": rgb(toneMistA),
    "--rb-tone-mist-b": rgb(toneMistB),
    "--rb-tone-sand-a": rgb(toneSandA),
    "--rb-tone-sand-b": rgb(toneSandB),
    "--rb-fallback-1": rgb(fallback1),
    "--rb-fallback-2": rgb(fallback2),
    "--rb-fallback-3": rgb(mix(LIGHT.fallback3, DARK.fallback3, surfaceMix)),
    "--rb-contact-bg": rgb(contact),
    "--rb-footer-bg": rgb(footer),
    "--rb-hero-glow-1": rgba(glow1, 0.6 - surfaceMix * 0.38),
    "--rb-hero-glow-2": rgba(glow2, 0.7 - surfaceMix * 0.46),
    "--rb-row-hover": rgba(surface, 0.7 - surfaceMix * 0.55),
    "--rb-project-glow": rgba([255, 255, 255], 0.55 - surfaceMix * 0.45),
    "--rb-project-index": rgba(accent, 0.13 + surfaceMix * 0.03),
    "--rb-phone-ring": rgba([255, 255, 255], 0.16 - surfaceMix * 0.08),
    "--rb-focus-ring": rgba(accentFill, dark ? 0.24 : 0.12),
    "--rb-error": dark ? "#ffb08f" : "#a24e33",
    "--rb-level": String(t),
    "--rb-darkness": String(surfaceMix),
  };

  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value));
  root.dataset.rbTheme = dark ? "dark" : "light";
  root.style.colorScheme = dark ? "dark" : "light";

  document.getElementById("rb-prepaint")?.remove();

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", hex(canvas));
}

export function useThemeLevel() {
  const [level, setLevel] = useState(readStoredLevel);

  useLayoutEffect(() => {
    applyTheme(level);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(level));
    } catch {
      /* Private browsing can block storage; the theme still works. */
    }
  }, [level]);

  return [level, setLevel];
}
