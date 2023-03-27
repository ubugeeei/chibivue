<script>
import { useCounterStore } from "../store/count.store";

export default {
  setup() {
    const { count: todoMaxLength, increment, reset } = useCounterStore();
    return { todoMaxLength, increment, reset };
  },
};
</script>

<template>
  <div>
    <h1>Counter Page</h1>
    <p>todo max length: {{ todoMaxLength }}</p>
    <button @click="increment">increment</button>
    <button @click="reset">reset</button>
  </div>
</template>
