import { createApp } from "chibi-vue";
import { createStore } from "chibi-vue-store";

// @ts-ignore
import App from "./App.vue";

const app = createApp(App);

const store = createStore();
app.use(store);

app.mount("#app");
