<script>
import { ref, reactive, computed } from "chibi-vue";
</script>

<script setup>
const count = ref(0);
const increment = () => {
  count.value++;
};

const count2 = reactive({ value: 0 });
const increment2 = () => {
  count2.value++;
};

const double = computed(() => count.value * 2);
</script>

<template>
  <div>
    <h1>state</h1>
    <p>count: {{ count }} (ref)</p>
    <p>double: {{ double }} (ref)</p>
    <p>count: {{ count2.value }} (reactive)</p>
    <button @click="increment">increment (ref)</button>
    <button @click="increment2">increment (reactive)</button>
  </div>
</template>
