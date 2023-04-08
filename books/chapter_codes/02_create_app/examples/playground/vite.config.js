import { defineConfig } from "vite";

console.log("🚀 ~ file: vite.config.js:8 ~ process.cwd():", process.cwd());
export default defineConfig({
  resolve: {
    alias: {
      chibivue: `${process.cwd()}/../../packages`,
    },
  },
});
