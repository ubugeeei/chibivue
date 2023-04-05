import { InjectionKey, Ref } from "chibivue";
import { Router } from "./router";
import { RouteLocationNormalizedLoaded } from "./types";

export const routerKey = Symbol() as InjectionKey<Router>;

export const routeLocationKey =
  Symbol() as InjectionKey<RouteLocationNormalizedLoaded>;

export const routerViewLocationKey = Symbol() as InjectionKey<
  Ref<RouteLocationNormalizedLoaded>
>;
