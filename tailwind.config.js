/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fourBlue: "#0E3349",
        fourYellow: '#B59F3B',
        fourGreen: '#538D4E',
        fourWhite: '#F2F2F2',
      }
    },
  },
  plugins: [],
}