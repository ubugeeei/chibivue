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

  created() {
    console.log("created");
  },

  beforeMount() {
    console.log("beforeMount");
  },

  mounted() {
    console.log("mounted");
  },

  beforeUpdate() {
    console.log("beforeUpdate");
  },

  updated() {
    console.log("updated");
  },

  beforeUnmount() {
    console.log("beforeUnmount");
  },

  unmounted() {
    console.log("unmounted");
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
