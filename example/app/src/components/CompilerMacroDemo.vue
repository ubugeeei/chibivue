<script setup>
const props = defineProps({
  message: { type: String, default: "Hello World" },
});

console.log("props.message: ", props);
</script>

<template>
  <div>
    <p>{{ message }} (children)</p>
  </div>
</template>
