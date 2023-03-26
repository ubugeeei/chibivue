import { createApp } from "chibi-vue";
import { router } from "./router";

// @ts-ignore
import App from "./App.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");
