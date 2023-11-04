<script>
import Counter from "./components/Counter.vue";

import { defineComponent } from "chibivue";

export default defineComponent({
  components: { Counter },
});
</script>

<template>
  <Counter />
  <Counter />
  <GlobalCounter />
</template>
