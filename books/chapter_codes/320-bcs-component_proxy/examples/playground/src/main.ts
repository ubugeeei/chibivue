import {
  PropType,
  createApp,
  defineComponent,
  h,
  reactive,
  ref,
} from "chibivue";

const Child = defineComponent({
  props: {
    parentCount: {
      type: Number as PropType<number>,
    },
  },
  setup() {
    const count = ref(0);
    return { count };
  },
  render(ctx) {
    return h("div", {}, [
      h("p", {}, [`child count: ${ctx.count.value}`]),
      h("button", { onClick: () => ctx.count.value++ }, [`increment(child)`]),

      h("p", {}, [`parent count: ${ctx.parentCount}`]),
    ]);
  },
});

const app = createApp({
  setup() {
    const state = reactive({ count: 0 });

    return () =>
      h("div", {}, [
        h("p", {}, [
          h(Child, { parentCount: state.count }, []),
          h("button", { onClick: () => state.count++ }, [`increment (parent)`]),
        ]),
      ]);
  },
});

app.mount("#app");
