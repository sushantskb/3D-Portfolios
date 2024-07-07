/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1"
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235"
        },
        blue: {
          500: "#2b77e7"
        },
        'space-primary': '#0F2027', // Dark Space Blue
        'space-secondary': '#203A43', // Medium Space Blue
        'space-accent': '#2C5364', // Light Space Blue
        'space-highlight': '#CCDBEA', // Star-like Highlight
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"]
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
      },
    },
  },
  plugins: [],
}
