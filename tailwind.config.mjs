/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "#fafaf8",
        ink: "#16161a",
        muted: "#55555f",
        subtle: "#707079",
        border: "#e4e4e0",
        accent: "#1e3a5f",
        good: "#2f6b3a",
        bad: "#9b2c2c",
        teal: "#276b62",
        amber: "#8a5209",
        plum: "#7a4a8c",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
