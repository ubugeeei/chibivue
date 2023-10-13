<script setup>
import { ref } from "chibivue";
const count = ref(0);
</script>

<template>
  <div>
    <button @click="count++">Counter.vue (in MyComponent.vapor) {{ count }}</button>
  </div>
</template>
