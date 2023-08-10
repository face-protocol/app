/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{ts,tsx,html}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        buttonGradient:
          "linear-gradient(180deg, rgba(52, 211, 153, 0.48) 0%, rgba(52, 211, 153, 0.40) 100%)",
      },
      boxShadow: {
        buttonShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.10)",
      },
      colors: {
        attention: "#34D399",
      },
    },
  },
  plugins: [],
};
