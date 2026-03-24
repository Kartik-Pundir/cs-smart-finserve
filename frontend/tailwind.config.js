/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f5f5f5',
        accent: '#c0392b',
        'accent-light': '#e74c3c',
        secondary: '#1a1a1a',
        cream: '#111111',
        'cream-dark': '#1a1a1a',
        surface: '#1e1e1e',
        muted: '#2a2a2a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0,0,0,0.06)',
        'card': '0 4px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
