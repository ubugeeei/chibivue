import { createApp } from "chibi-vue";
import { createStore } from "chibi-vue-store";
import { createRouter, createWebHistory } from "chibi-vue-router";

// router
// @ts-ignore
import Index from "./views/index.vue";
// @ts-ignore
import Counter from "./views/counter.vue";
// @ts-ignore
import TodoList from "./views/todo-list.vue";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Index },
    {
      path: "/counter",
      component: Counter,
    },
    {
      path: "/todo-list",
      component: TodoList,
    },
  ],
});

// @ts-ignore
import App from "./App.vue";
const app = createApp(App);

// plugins
const store = createStore();
app.use(store);
app.use(router);

app.mount("#app");
