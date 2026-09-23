/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS-variable driven so the dark/light toggle re-themes the whole app.
        // Vars are defined in src/index.css (:root = dark, html.light = light).
        ink: "rgb(var(--ink) / <alpha-value>)",
        coal: "rgb(var(--coal) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        line: "rgba(var(--line))",
        // legacy alias used across old code (bg-primary-color, text-primary-color...)
        // mapped to luxury gold so historic classes resolve to the new theme
        "primary-color": "rgb(var(--gold) / <alpha-value>)",
        gold: {
          DEFAULT: "rgb(var(--gold) / <alpha-value>)",
          soft: "rgb(var(--gold-soft) / <alpha-value>)",
          deep: "rgb(var(--gold-deep) / <alpha-value>)",
        },
        cream: "rgb(var(--cream) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 60px -20px rgba(212,175,55,0.25)",
        card: "0 10px 40px -12px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
}