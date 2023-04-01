<script>
import { ref } from "chibi-vue";
import SimpleBtn from "../components/SimpleBtn.vue";

export default {
  components: { SimpleBtn },
  setup() {
    const message = ref("default");
    const handleClick = (...args) => {
      message.value = [...args].join(" ");
    };
    return { handleClick };
  },
};
</script>

<template>
  <div>
    <h1>emit-test</h1>
    <p>Message: {{ message }}</p>
    <SimpleBtn text="Click me" @click:simple-btn="handleClick" />
  </div>
</template>
