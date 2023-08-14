import { createApp, defineComponent } from "chibivue";

const App = defineComponent({
  setup() {
    const bind = { id: "bind", class: "bind", style: "color: red" };
    return { count: 1, bind };
  },

  template: `
    <div>
      <p v-bind:id="count"> hello </p>
      <p :id="count * 2"> hello </p>
      
      <p v-bind:["style"]="bind.style"> hello </p>
      <p :["style"]="bind.style"> hello </p>

      <p v-bind="bind"> hello </p>
    </div>
  `,
});

const app = createApp(App);

app.mount("#app");
