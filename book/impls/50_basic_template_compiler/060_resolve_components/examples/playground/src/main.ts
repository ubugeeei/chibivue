import { createApp } from "chibivue";

// @ts-ignore
import Counter from "./components/Counter.vue";

// @ts-ignore
import App from "./App.vue";

const app = createApp(App);

app.component("GlobalCounter", Counter);

app.mount("#app");
