/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        charcoal: "var(--charcoal)",
        steel: "var(--steel)",
        silver: "var(--silver)",
        mist: "var(--mist)",
        accent: "var(--accent)"
      },
      fontFamily: {
        display: ['"Inter Tight"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};
