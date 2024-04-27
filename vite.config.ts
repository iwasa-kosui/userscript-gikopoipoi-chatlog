import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://gikopoipoi.net/characters/naito/front-standing.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://gikopoipoi.net/*"],
        author: "iwasa-kosui",
      },
    }),
  ],
});
