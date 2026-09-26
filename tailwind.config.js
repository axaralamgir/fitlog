/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ccff00",
        base: {
          950: "#0a0a0a",
          900: "#0d0d0d",
          850: "#111111",
          800: "#161616",
          700: "#1e1e1e",
          600: "#2a2a2a",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
