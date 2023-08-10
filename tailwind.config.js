/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{ts,tsx,html}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: "#34D399",
      },
    },
  },
  plugins: [],
};
