// @ts-nocheck
import { createRouter, createWebHistory } from "chibi-vue-router";
import PagesTop from "./views/index.vue";
import PagesState from "./views/state.vue";
import PagesDirective from "./views/directive.vue";
import PagesPropsEmits from "./views/props-emits.vue";

import PagesStoreCounter from "./views/store-counter.vue";
import PagesTodoApp from "./views/todo-list.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: PagesTop },
    { path: "/state", component: PagesState },
    { path: "/directive", component: PagesDirective },
    { path: "/props-emits", component: PagesPropsEmits },

    { path: "/store-counter", component: PagesStoreCounter },
    { path: "/todo-app", component: PagesTodoApp },
  ],
});
