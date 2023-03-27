import { ref } from "chibi-vue";
import { defineStore } from "chibi-vue-store";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);

  const increment = () => {
    count.value++;
  };

  const reset = () => {
    count.value = 0;
  };

  return { count, increment, reset };
});
