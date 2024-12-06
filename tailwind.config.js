/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22BEEF",
        secondary: "#006CB5",
        background: "#fbfbfb",
        content: "#939393",//400
        lightGray: "#F9FAFB",//50
        semiGray: "#F3F4F6",//100
        white: "#FFFFFF",
        black: "#000000",
      },
      screens: {
        "lg-md": "996px",
      },
    },
  },
  plugins: [],
};
