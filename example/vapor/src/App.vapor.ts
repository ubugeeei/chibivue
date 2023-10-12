import { effect, ref } from "chibivue";
import { template, setText, on } from "chibivue/vapor";

const t0 = () => template("<div><button>");

export default () => {
  const count = ref(0);

  const div = t0();
  const button = div.firstChild as Element;
  let _button_text: any;

  effect(() => {
    setText(button, _button_text, count.value);
  });

  on(button, "click", () => count.value++);

  return div;
};
