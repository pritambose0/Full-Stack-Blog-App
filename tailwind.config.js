/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#141A2A",
        primary: "#1649FF",
        primaryDark: "#2D21B2",
        secondary: "#1D263B",
        textColor: "#ffff",
        neutral: "#515B72",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
