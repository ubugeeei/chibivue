import { createApp, h, reactive } from "chibivue";

const Nest = {
  setup() {
    const state = reactive({ count: 0, nested: { count: 0 }, list: ["item"] });

    return () =>
      h("div", {}, [
        h("h1", {}, [`Nest`]),
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
};

const DefineProps = {
  setup() {
    const state = reactive<{ nested?: { count: 0 } }>({});
    const update = () => {
      if (!state.nested) {
        state.nested = { count: 0 };
      } else {
        state.nested.count++;
      }
    };

    return () =>
      h("div", {}, [
        h("h1", {}, [`DefineProps`]),
        h("p", {}, [`state.count: ${state.nested?.count}`]),
        h("button", { onClick: update }, ["update state"]),
      ]);
  },
};

const app = createApp({
  setup: () => () => h("div", {}, [h(Nest, {}, []), h(DefineProps, {}, [])]),
});

app.mount("#app");
