// @ts-nocheck
import { createRouter, createWebHistory } from "chibi-vue-router";
import PagesTop from "./views/index.vue";
import PagesCounter from "./views/counter.vue";
import PagesTodoList from "./views/todo-list.vue";
import PagesPropsTest from "./views/props-test.vue";
import PagesEmitTest from "./views/emit-test.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: PagesTop },
    { path: "/counter", component: PagesCounter },
    { path: "/todo-list", component: PagesTodoList },
    { path: "/props-test", component: PagesPropsTest },
    { path: "/emit-test", component: PagesEmitTest },
  ],
});
