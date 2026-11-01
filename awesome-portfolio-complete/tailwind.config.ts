import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        card: {
          pink: "var(--color-card-pink)",
          yellow: "var(--color-card-yellow)",
          paper: "var(--color-card-paper)",
          dark: "var(--color-card-dark)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-serif)", "serif"],
      },
      letterSpacing: {
        tighter: "-0.065em",
      },
      maxWidth: {
        site: "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
