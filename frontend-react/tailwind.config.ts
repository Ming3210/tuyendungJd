import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./admin.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
} satisfies Config
