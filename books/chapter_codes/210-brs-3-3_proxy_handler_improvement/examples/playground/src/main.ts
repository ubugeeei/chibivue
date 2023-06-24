import { createApp, h, reactive } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({ count: 0, nested: { count: 0 }, list: ["item"] });

    return () =>
      h("div", {}, [
        h("p", {}, [`state.count: ${state.count}`]),
        h("button", { onClick: () => state.count++ }, ["update state"]),
        h("p", {}, [`state.nested.count: ${state.nested.count}`]),
        h("button", { onClick: () => state.nested.count++ }, [
          "update state.nested",
        ]),
        h("p", {}, [`state2.list: ${state.list}`]),
        h("button", { onClick: () => state.list.push("item") }, [
          "update state2.list",
        ]),
      ]);
  },
});

app.mount("#app");
