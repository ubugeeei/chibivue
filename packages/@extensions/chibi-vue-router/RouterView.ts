import { inject, computed, h } from "chibi-vue";
import { ComponentOptions } from "../../runtime-core";
import { routerViewLocationKey } from "./injectionSymbols";
import { RouteLocationNormalizedLoaded } from "./types";

export const RouterViewImpl: ComponentOptions = {
  name: "RouterView",
  setup() {
    const injectedRoute = inject(routerViewLocationKey)!;
    const routeToDisplay = computed<RouteLocationNormalizedLoaded>(
      () => injectedRoute.value
    );
    return () => {
      return h(routeToDisplay.value.component);
    };
  },
};
