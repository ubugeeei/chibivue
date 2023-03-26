<script>
export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    const reset = () => (count.value = 0);
    return { count, increment, reset };
  },
};
</script>

<template>
  <div>
    <h1>Counter Page</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">increment</button>
    <button @click="reset">reset</button>
  </div>
</template>
