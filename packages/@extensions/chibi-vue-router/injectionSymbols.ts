import { InjectionKey } from "chibi-vue";
import { Router } from "./router";
import { RouteLocationNormalizedLoaded } from "./types";

export const routerKey = Symbol() as InjectionKey<Router>;

export const routeLocationKey =
  Symbol() as InjectionKey<RouteLocationNormalizedLoaded>;
