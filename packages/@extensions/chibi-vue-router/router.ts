import { App, reactive, ref } from "chibi-vue";
import {
  routeLocationKey,
  routerKey,
  routerViewLocationKey,
} from "./injectionSymbols";
import { RouterHistory } from "./history";
import { RouteLocationNormalizedLoaded } from "./types";
import { computed } from "../../reactivity";
import { RouterViewImpl } from "./RouterView";

export interface RouteRecord {
  path: string;
  component: any;
}

export interface RouterOptions {
  routes: Readonly<RouteRecord[]>;
  history: RouterHistory;
}

export interface Router {
  install(app: App): void;

  push(to: string): void;
  replace(to: string): void;
  go(delta: number): void;
  back(): ReturnType<Router["go"]>;
  forward(): ReturnType<Router["go"]>;
}

export function createRouter(options: RouterOptions): Router {
  const currentRoute = ref<RouteLocationNormalizedLoaded>({
    fullPath: "/",
    component: null,
  });
  const routerHistory = options.history;

  function push(to: string) {
    routerHistory.push(to);
  }

  function replace(to: string) {
    routerHistory.replace(to);
  }

  const go = (delta: number) => routerHistory.go(delta);

  const router: Router = {
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    install(app: App) {
      const router = this;
      app.component("RouterView", RouterViewImpl);

      const reactiveRoute = computed(() => currentRoute.value);
      app.provide(routerKey, router);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
    },
  };

  return router;
}
