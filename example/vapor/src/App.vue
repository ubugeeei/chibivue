<script>
import { defineComponent, ref } from "chibivue";
import MyVaporButton from "./MyButton.vapor";

export default defineComponent({
  components: { MyVaporButton },
  setup() {
    const count = ref(0);
    return { count };
  },
});
</script>

<template>
  <div>
    <h1>My App</h1>

    <p>vapor component</p>
    <MyVaporButton />

    <p>native component</p>
    <button @click="count++">{{ count }}</button>
  </div>
</template>
