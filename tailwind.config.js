/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'allura': ['Allura', 'cursive'],
        'manrope': ['Manrope', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'ojuju': ['Ojuju', 'sans-serif'],
      },
      colors: {
        // Premium dark palette
        dark: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2a2a2a',
          400: '#333333',
          300: '#444444',
        },
        // Warm gold/amber accents (preserving existing colorway)
        gold: {
          50: '#fffbf0',
          100: '#fff5d6',
          200: '#ffe9b8',
          300: '#ffd8a6',
          400: '#ffc885',
          500: '#ffb347',
          600: '#e6a03f',
          700: '#cc8c37',
          800: '#a6732e',
          900: '#8a5f26',
        },
        // Legacy primary (mapped to gold for compatibility)
        primary: {
          DEFAULT: "#ffb347",
          dark: "#e6a03f",
          light: "#ffd8a6",
        },
      },
      fontSize: {
        // Premium type scale
        'display-xl': ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'heading-xl': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading-lg': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
        'heading-md': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'wide': '0.05em',
        'wider': '0.1em',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

