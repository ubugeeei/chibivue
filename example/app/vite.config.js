import { defineConfig } from "vite";
import chibiVue from "../../packages/@extensions/vite-plugin-chibi-vue";

console.log(`${process.cwd()}/../../example`);

export default defineConfig({
  root: `${process.cwd()}/../../example/app`,
  resolve: {
    alias: {
      "~": process.cwd(),
      "chibi-vue": `${process.cwd()}/../../packages`,
      "chibi-vue-router": `${process.cwd()}/../../packages/@extensions/chibi-vue-router`,
      "chibi-vue-store": `${process.cwd()}/../../packages/@extensions/chibi-vue-store`,
    },
  },
  define: {
    "import.meta.vitest": "undefined",
  },
  plugins: [chibiVue()],
});
