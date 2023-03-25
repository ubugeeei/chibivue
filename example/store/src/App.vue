<script>
import { useCounterStore } from "./store/count.store";

export default {
  setup() {
    const counterStore = useCounterStore();
    const counterStore2 = useCounterStore(); // point same store
    return { counterStore, counterStore2 };
  },
};
</script>

<template>
  <div>
    <h1>Counter Store</h1>
    <p>Count: {{ counterStore2.count }}</p>
    <button @click="counterStore.increment">Increment</button>
    <button @click="counterStore.reset">reset</button>
  </div>
</template>
