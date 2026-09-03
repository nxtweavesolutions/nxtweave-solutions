/** @type {import('tailwindcss').Config} */

import animate from "tailwindcss-animate"

export default {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Shadcn-compat colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        // NxtWeave Premium Enterprise Tokens
        "primary-navy": "#0B1F3A",
        "dark-navy": "#06152B",
        "royal-blue": "#1D4ED8",
        "premium-blue": "#2563EB",
        "accent-cyan": "#06B6D4",
        "brand-success": "#16A34A",
        "brand-warning": "#F59E0B",
        "brand-danger": "#DC2626",
        "bg-slate-primary": "#FFFFFF",
        "bg-slate-secondary": "#F8FAFC",
        "bg-slate-alternate": "#F1F5F9",
        "bg-slate-highlight": "#EFF6FF",
        "text-slate-primary": "#0F172A",
        "text-slate-secondary": "#1E293B",
        "text-slate-paragraph": "#334155",
        "text-slate-light": "#475569",
      },

      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        dm: ["'DM Sans'", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [animate],
}