import { defineConfig } from "vite";

console.log(`${process.cwd()}/../../example`);

export default defineConfig({
  root: `${process.cwd()}/../../example/render`,
  resolve: {
    alias: {
      "~": process.cwd(),
      "chibi-vue": `${process.cwd()}/../../packages`,
    },
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
