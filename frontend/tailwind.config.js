/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#12203a',
        accent: '#a8823a',
        'accent-light': '#8d6b2c',
        secondary: '#5b6478',
        cream: '#faf8f3',
        'cream-dark': '#f4f2ec',
        surface: '#ffffff',
        muted: '#f4f5f8',
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
