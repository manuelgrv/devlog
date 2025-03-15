import type { Config } from "tailwindcss";
import gruvboxColors from "./gruvbox-colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gruvbox: gruvboxColors,
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/line-clamp")],
} satisfies Config;
