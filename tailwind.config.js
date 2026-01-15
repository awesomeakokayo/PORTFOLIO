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
        primary: {
          DEFAULT: "#ffffff",
          dark: "#cccccc",
        },
      },
    },
  },
  plugins: [],
};

