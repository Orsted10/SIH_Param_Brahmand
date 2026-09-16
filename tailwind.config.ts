import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          0: "#03050A",
          1: "#060B12",
          2: "#0A111B",
        },
        panel: {
          DEFAULT: "rgba(11, 18, 28, 0.72)",
          strong: "rgba(8, 14, 23, 0.92)",
          border: "rgba(115, 230, 255, 0.14)",
          hairline: "rgba(244, 247, 250, 0.08)",
        },
        space: {
          white: "#F4F7FA",
          muted: "rgba(244, 247, 250, 0.62)",
          faint: "rgba(244, 247, 250, 0.34)",
          dim: "rgba(244, 247, 250, 0.12)",
        },
        cyan: {
          accent: "#73E6FF",
          soft: "rgba(115, 230, 255, 0.15)",
          glow: "rgba(115, 230, 255, 0.3)",
        },
        status: {
          green: "#77E6A5",
          "green-soft": "rgba(119, 230, 165, 0.15)",
          amber: "#FFD166",
          "amber-soft": "rgba(255, 209, 102, 0.15)",
          red: "#FF6B6B",
          "red-soft": "rgba(255, 107, 107, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-sweep": "radarSweep 6s linear infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
