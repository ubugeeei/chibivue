<script setup>
const props = defineProps({
  msg: { type: String, default: "Hello World" },
});

console.log("props.msg: ", props);
</script>

<template>
  <div>
    <p>{{ msg }} (children)</p>
  </div>
</template>
