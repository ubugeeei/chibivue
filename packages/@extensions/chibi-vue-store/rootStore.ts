import { InjectionKey, Ref } from "~/packages";
import { App } from "~/packages/runtime-core/apiCreateApp";

export let activeStore: Store | undefined;
export const setActiveStore = (store: Store | undefined) =>
  (activeStore = store);

export type StateTree = Record<string | number | symbol, any>;

export interface Store {
  install: (app: App) => void;

  /**
   * root state
   */
  state: Ref<Record<string, StateTree>>;
}

export const storeSymbol: InjectionKey<Store> = Symbol();
