import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "brink-pink": {
          100: "#FFBDC5",
          200: "#FF8B99",
          300: "#FF7A8A",
          400: "#FF6A7C",
          500: "#FF596D",
          600: "#E65062",
          700: "#CC4757",
          800: "#B33E4C",
          900: "#993541",
        },
      },
    },
  },
  plugins: [],
};
export default config;
