/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base:      'var(--bg-base)',
        surface:   'var(--bg-surface)',
        elevated:  'var(--bg-elevated)',
        accent:    'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted':     'var(--text-muted)',
        border:    'var(--border)',
        'border-lit': 'var(--border-lit)',
      },
      fontFamily: {
        display: ['Ojuju', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
