import { defineConfig } from "vite";
import chibivue from "../../packages/@extensions/vite-plugin-chibivue";

console.log(`${process.cwd()}/../../example`);

export default defineConfig({
  root: `${process.cwd()}/../../example/app`,
  resolve: {
    alias: {
      "~": process.cwd(),
      "chibivue": `${process.cwd()}/../../packages`,
      "chibivue-router": `${process.cwd()}/../../packages/@extensions/chibivue-router`,
      "chibivue-store": `${process.cwd()}/../../packages/@extensions/chibivue-store`,
    },
  },
  define: {
    "import.meta.vitest": "undefined",
  },
  plugins: [chibivue()],
});
