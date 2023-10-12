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
    <MyVaporComponent />
    <button @click="count++">{{ count }}</button>
  </div>
</template>
