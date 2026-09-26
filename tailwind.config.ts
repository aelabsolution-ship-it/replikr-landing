import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Jetons shadcn, lus depuis les variables --rk-* (thème sombre de la landing).
        border: "rgb(var(--rk-border) / <alpha-value>)",
        muted: { DEFAULT: "rgb(var(--rk-muted) / <alpha-value>)", foreground: "rgb(var(--rk-muted-foreground) / <alpha-value>)" },
        foreground: "rgb(var(--rk-foreground) / <alpha-value>)",
        secondary: "rgb(var(--rk-secondary) / <alpha-value>)",
        card: { DEFAULT: "rgb(var(--rk-card) / <alpha-value>)", foreground: "rgb(var(--rk-foreground) / <alpha-value>)" },
        background: "rgb(var(--rk-background) / <alpha-value>)",
        primary: { DEFAULT: "rgb(var(--rk-primary) / <alpha-value>)", foreground: "rgb(var(--rk-primary-foreground) / <alpha-value>)" },
        ring: "rgb(var(--rk-ring) / <alpha-value>)",
        cream: "#F4EFE6",
        ink: "#1A1612",
        graphite: "#5C5249",
        violet: {
          DEFAULT: "#6B4FE8",
          deep: "#5638D6",
        },
        line: "#E5E1D8",
        surface: "#FFFCF7",
      },
      fontFamily: {
        serif: ['"Newsreader"', "Tiempos", "Georgia", "serif"],
        sans: ['"Inter"', "Geist", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "Menlo", "monospace"],
      },
      fontSize: {
        // Display sizes pour titres serif italiques
        "display-sm": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["7rem", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-xl": ["10rem", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      maxWidth: {
        prose: "62ch",
        page: "1200px",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(calc(-100% - var(--gap)))" } },
        "marquee-vertical": { from: { transform: "translateY(0)" }, to: { transform: "translateY(calc(-100% - var(--gap)))" } },
      },
      animation: {
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
