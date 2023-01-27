/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    fontWeight: {
      'black': 900,
      'heavy': 800,
      'bold': 700,
      'normal': 500,
      'light': 300,
    },
    extend: {
      colors:{
        'aqua': '#16ABF8',
        'pink': '#ED4C5C',
        'yellow': "#F8A541",
        'green' : '#00A790',
        'blue' : '#428BC1',
        'purple':'#8942C1',
      }
    },
    fontFamily:{
      avanir: ["montserrat", "sans-serif"],
      poppins: ["poppins", "sans-serif"]
    }
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'active', 'aqua '],
  },
  plugins: [],
}
