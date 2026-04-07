/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        60: "60px",
        80: "80px",
        120: "120px",
      },
    },
  },
  plugins: [],
  corePlugins: {},
};
