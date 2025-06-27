/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        'dark-grey': '#23272F',
        'light-grey': '#F3F4F6',
        primary: '#23272F',
        secondary: '#CBC7C6',
        tertiary: '#3A3F47',
        white: '#FFFFFF',
        'black-100': '#181A1B',
        'black-200': '#101214',
        'white-100': '#F3F4F6',
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
