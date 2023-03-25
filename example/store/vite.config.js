import { defineConfig } from "vite";
import chibiVue from "../../packages/@extensions/vite-plugin-chibi-vue";

console.log(`${process.cwd()}/../../example`);

export default defineConfig({
  root: `${process.cwd()}/../../example/chibi-vue_store`,
  resolve: {
    alias: {
      "~": process.cwd(),
      "chibi-vue": `${process.cwd()}/../../packages`,
      "chibi-vue-store": `${process.cwd()}/../../packages/@extensions/store`,
    },
  },
  define: {
    "import.meta.vitest": "undefined",
  },
  plugins: [chibiVue()],
});
