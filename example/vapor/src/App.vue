<script>
import { defineComponent, ref } from "chibivue";
import MyVaporComponent from "./MyComponent.vapor";

export default defineComponent({
  components: { MyVaporComponent },
  setup() {
    const count = ref(0);
    return { count };
  },
});
</script>

<template>
  <div>
    <button @click="count++">App.vue {{ count }}</button>
    <MyVaporComponent />
  </div>
</template>
