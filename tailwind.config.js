/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: '#F7F2EA',
        offblack: '#211712',
        blue: '#236DF6',
        darkBlue: '#253156',
        red: '#FF6642',
        yellow: '#FDD131'
      }
    }
  },
  plugins: [],
}