/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: '#f0e7d8', //'#F7F2EA',
        offblack: '#333534', //'#211712',
        blue: 'rgb(var(--color-blue) / <alpha-value>)',
        darkBlue: '#253156',
        red: 'rgb(var(--color-red) / <alpha-value>)',
        yellow: 'rgb(var(--color-yellow) / <alpha-value>)'
      },
      fontFamily: {
        Staat: ["Staatliches", "sans-serif"],
        Bungee: ["Bungee", "sans-serif"],
        Space: ["Space Grotesk", "sans-serif"],
        Baumans: ["Baumans", "system-ui"],
        Nanum: ["Nanum Gothic Coding", "monospace"]
      }
    }
  },
  plugins: [],
}