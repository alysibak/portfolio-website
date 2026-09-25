/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      // Channels live in CSS variables (src/styles/global.css) so dark mode can
      // swap them; <alpha-value> keeps modifiers like bg-ink/30 working.
      colors: Object.fromEntries(
        ["paper", "ink", "muted", "subtle", "border", "accent", "good", "bad", "teal", "amber", "plum"].map(
          (name) => [name, `rgb(var(--${name}) / <alpha-value>)`]
        )
      ),
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
