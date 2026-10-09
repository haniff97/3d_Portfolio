/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        'dark-grey': '#FFFFFF', // All white background
        'light-grey': '#F9F6F0',
        primary: '#FFFFFF',
        secondary: '#6C7456', // Sage green for secondary text
        tertiary: '#FFFFFF',
        white: '#FFFFFF',     // Restore white to actual white!
        'black-100': '#FFFFFF',
        'black-200': '#F9F6F0',
        'white-100': '#4A533D',
        accent: '#4A533D',    // Deep olive green for accents
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
