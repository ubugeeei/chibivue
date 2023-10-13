import { effect, h, ref } from "chibivue";
import { template, setText, on, createComponent } from "chibivue/vapor";

// @ts-ignore
import Counter from "./Counter.vue";

const t0 = () => template("<div><button>");

export default () => {
  const count = ref(0);

  const div = t0();

  const button = div.firstChild as Element;

  const _button_text = "MyComponent.vapor (in App.vue) {}";

  effect(() => {
    setText(button, _button_text, count.value);
  });

  on(button, "click", () => count.value++);

  createComponent(h(Counter, null, []), div);

  return div;
};
