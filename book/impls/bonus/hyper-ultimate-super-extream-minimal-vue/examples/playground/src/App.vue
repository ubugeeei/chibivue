<script>
import { reactive } from "chibivue";

export default {
  setup() {
    const state = reactive({ count: 0 });
    const increment = () => state.count++;
    return { state, increment };
  },
};
</script>

<template>
  <button @click="increment">state: {{ state.count }}</button>
</template>
