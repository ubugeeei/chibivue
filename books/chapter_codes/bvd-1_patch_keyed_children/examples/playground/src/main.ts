import { createApp, h, reactive } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({ list: ["a", "b", "c", "d"] });
    const updateList = () => {
      state.list = ["e", "f", "g"];
    };

    return () =>
      h("div", { id: "app" }, [
        h(
          "ul",
          {},
          state.list.map((item) => h("li", {}, [item]))
        ),
        h("button", { onClick: updateList }, ["update"]),
      ]);
  },
});

app.mount("#app");
