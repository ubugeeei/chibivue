<script>
import { defineComponent, ref } from "chibi-vue";
import CompilerMacroDemo from "../components/CompilerMacroDemo.vue";

export default defineComponent({
  components: { CompilerMacroDemo },

  setup() {
    const message = ref("hello world");
    const handleClick = (...args) => {
      message.value = args.join(" ");
    };
    return { message, handleClick };
  },
});
</script>

<template>
  <div>
    <h1>compiler macro</h1>
    <CompilerMacroDemo :message="message" @click:compiler-macro="handleClick" />
  </div>
</template>
