import { createApp, h, reactive } from "chibivue";

const app = createApp({
  setup() {
    const list = reactive<Set<number>>(new Set());
    const setNewItem = () => {
      list.add(Math.random());
    };

    return () =>
      h("div", {}, [
        h("button", { onClick: setNewItem }, ["setNewItem"]),
        h("p", {}, [`${list.size}`]),
      ]);
  },
});

app.mount("#app");
