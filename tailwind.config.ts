import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Suporte a modo escuro usando a classe 'dark'
  theme: {
    extend: {
      colors: {
        background: "var(--background, #f3f4f6)", // Fallback para cinza claro
        foreground: "var(--foreground, #1f2937)", // Fallback para cinza escuro
      },
    },
  },
  plugins: [],
};

export default config;