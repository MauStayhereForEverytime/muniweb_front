/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maynas: {
          navy: "#23355B",
          navyDark: "#1A3E6C",
          navyMid: "#344B7D",
          red: "#AB0A0A",
          ink: "#1E1E1E",
          paper: "#F8F9FA",
          neutral: "#D9D9D9",
        },
      },
      fontFamily: {
        display: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Public Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
