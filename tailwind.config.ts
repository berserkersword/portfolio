import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: { extend: {
          keyframes: {
              marquee: {
                "100%": { transform: "translateX(-50%)" },
                "0%": { transform: "translateX(0)" },
              }
          },
          animation: {
            marquee: "marquee 25s linear infinite",
          },
      } 
    },
  plugins: [],
};

export default config;
