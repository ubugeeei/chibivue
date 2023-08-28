import { defineConfig } from "vitepress";
import { sharedConfig } from "./shared.js";
import { jaConfig } from "./ja";
import { enConfig } from "./en.js";

export default defineConfig({
  ...sharedConfig,
  locales: {
    root: { label: "Japanese", lang: "ja", link: "/", ...jaConfig },
    en: { label: "English", lang: "en", link: "/en/", ...enConfig },
  },
});
