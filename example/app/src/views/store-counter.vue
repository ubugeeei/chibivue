<script setup>
import { useCounterStore } from "../store/count.store";
const { count: todoMaxLength, increment, reset } = useCounterStore();
</script>

<template>
  <div>
    <h1>store</h1>
    <p>todo max length: {{ todoMaxLength }} (global counter)</p>
    <button @click="increment">increment</button>
    <button @click="reset">reset</button>
  </div>
</template>
