import { createRouter, createWebHistory } from "chibi-vue-router";

// @ts-ignore
import Index from "./views/index.vue";
// @ts-ignore
import Counter from "./views/counter.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Index },
    {
      path: "/counter",
      component: Counter,
    },
  ],
});
