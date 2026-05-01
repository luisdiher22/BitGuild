import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface:    "var(--surface)",
        border:     "var(--border)",
        primary:    "var(--primary)",
        secondary:  "var(--secondary)",
        danger:     "var(--danger)",
        success:    "var(--success)",
        "text-primary":   "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
      },
      fontFamily: {
        sans:  ["var(--font-geist-sans)", ...fontFamily.sans],
        mono:  ["var(--font-geist-mono)", ...fontFamily.mono],
        pixel: ['"Press Start 2P"', "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
