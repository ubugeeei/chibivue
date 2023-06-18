import { createApp, h, reactive, ref, watch } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({ count: 0 });
    watch(
      () => state.count,
      (crr, prev) => alert(`state.count was changed! ${prev} -> ${crr}`)
    );

    const count = ref(0);
    watch(count, (crr, prev) =>
      alert(`count.value was changed! ${prev} -> ${crr}`)
    );

    return () =>
      h("div", {}, [
        h("p", {}, [`state.count: ${state.count}`]),
        h("button", { onClick: () => state.count++ }, ["update state"]),

        h("p", {}, [`count: ${count.value}`]),
        h("button", { onClick: () => count.value++ }, ["update count"]),
      ]);
  },
});

app.mount("#app");
