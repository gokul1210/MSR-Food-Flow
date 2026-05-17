/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1c23',
        card: 'rgba(30, 33, 40, 0.7)',
        primary: '#fb923c',
        secondary: '#60a5fa',
        accent: '#4ade80',
        purple: '#c084fc'
      }
    },
  },
  plugins: [],
}
