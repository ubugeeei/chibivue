<script>
import { defineComponent, ref } from "chibi-vue";
import CompilerMacroDemo from "../components/CompilerMacroDemo.vue";

export default defineComponent({
  components: { CompilerMacroDemo },

  setup() {
    const message = ref("hello world");
    const changeMessage = () => {
      message.value = "message changed";
    };
    return { message, changeMessage };
  },
});
</script>

<template>
  <div>
    <h1>compiler macro</h1>
    <CompilerMacroDemo :message="message" />
    <button @click="changeMessage">change message</button>
  </div>
</template>
