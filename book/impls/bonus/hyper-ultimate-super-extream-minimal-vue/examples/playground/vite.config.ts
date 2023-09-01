import { VitePluginChibivue } from "../../packages";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      chibivue: `${process.cwd()}/../../packages`,
    },
  },
  plugins: [VitePluginChibivue()],
});
