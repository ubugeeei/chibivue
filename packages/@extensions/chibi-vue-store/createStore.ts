import { EffectScope, Ref, ref } from "~/packages";
import { StateTree, Store, setActiveStore, storeSymbol } from "./rootStore";

export function createStore(): Store {
  const scope = new EffectScope();

  const state = scope.run<Ref<Record<string, StateTree>>>(() =>
    ref<Record<string, StateTree>>({})
  )!;

  const store: Store = {
    install(app) {
      setActiveStore(store);
      app.provide(storeSymbol, store);
    },
    state,
  };

  return store;
}
