/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          600: "#1e3a8a", // deep blue used in your UI
          700: "#1b3177"
        }
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  darkMode: "class",
  plugins: []
};
