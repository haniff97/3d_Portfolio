/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        'dark-grey': '#2D2D2D',
        primary: "#050816",
        secondary: "#f3f3f3",
        tertiary: "#151030",
        white:"#fff",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      spacing: {
        '46': '11.5rem', // Adding custom spacing value
      },
      screens: {
        xs: "450px",
      },
      backgroundColor: {
        "hero-pattern": "#000000", // Plain black color
      },
    },
  },
  plugins: [],
};
