import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: {
      ink: "#090C11",
      panel: "#111722",
      navy: "#102F56",
      accent: "#3B82C4",
      muted: "#8995A6"
    },
    fontFamily: { sans: ["Arial", "sans-serif"] },
    boxShadow: { glow: "0 0 60px rgba(59,130,196,.14)" }
  }},
  plugins: []
};
export default config;
