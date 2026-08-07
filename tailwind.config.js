/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './PortfolioBrandSystem.jsx', './src/**/*.{js,ts,jsx,tsx}'],
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
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
      fontSize: {
        'display-3xl': ['clamp(2.75rem, 8vw, 7rem)',    { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-2xl': ['clamp(2.25rem, 5vw, 4.5rem)',   { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-xl':  ['clamp(1.75rem, 3.5vw, 2.75rem)',{ lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-sm':  ['clamp(1.125rem, 2vw, 1.5rem)',  { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
}
