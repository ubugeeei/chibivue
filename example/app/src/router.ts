// @ts-nocheck
import { createRouter, createWebHistory } from "chibi-vue-router";
import PagesTop from "./views/index.vue";
import PagesCounter from "./views/counter.vue";
import PagesTodoList from "./views/todo-list.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: PagesTop },
    {
      path: "/counter",
      component: PagesCounter,
    },
    {
      path: "/todo-list",
      component: PagesTodoList,
    },
  ],
});
