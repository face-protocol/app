/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{ts,tsx,html}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'buttonGradient': 'linear-gradient(180deg, rgba(52, 211, 153, 0.48) 0%, rgba(52, 211, 153, 0.40) 100%)'
      },
      colors: {
        attention: "#34D399",
      },
    },
  },
  plugins: [],
};
