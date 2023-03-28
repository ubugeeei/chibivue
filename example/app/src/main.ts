// @ts-nocheck
import { createApp } from "chibi-vue";
import { createStore } from "chibi-vue-store";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);
app.use(router);
app.use(createStore());
app.mount("#app");
