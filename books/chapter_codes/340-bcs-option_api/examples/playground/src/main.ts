import { createApp, defineComponent, h, ref } from "chibivue";

const App = defineComponent({
  setup() {
    const count = ref(0);
    return { count };
  },

  data() {
    return { count2: 0 };
  },

  computed: {
    double() {
      return this.count2 * 2;
    },
  },

  render(ctx) {
    console.log(ctx.count2);
    return h("div", {}, [`${ctx.count}`]);
  },
});

const app = createApp(App);

app.mount("#app");
