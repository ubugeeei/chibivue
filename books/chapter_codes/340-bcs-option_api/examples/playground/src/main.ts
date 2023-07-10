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

  methods: {
    hello() {
      this.count2++;
    },
  },

  watch: {
    count2() {
      alert(`count2 changed: ${this.count2}`);
    },
  },

  render(ctx) {
    return h("div", {}, [
      h("button", { onClick: ctx.hello }, ["hello"]),
      `${ctx.count2}\n`,
      `${ctx.count}\n`,
    ]);
  },
});

const app = createApp(App);

app.mount("#app");
