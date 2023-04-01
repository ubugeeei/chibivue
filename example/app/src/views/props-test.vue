<script>
import { reactive } from "chibi-vue";
import SimpleCard from "../components/SimpleCard.vue";

export default {
  components: { SimpleCard },

  setup() {
    const card = reactive({
      title: "Hello World",
      content: "This is a simple card",
    });

    const changeTitle = () => {
      card.title = "Changed Title";
    };

    return { card, changeTitle };
  },
};
</script>

<template>
  <div>
    <h1>Props Test</h1>
    <button @click="changeTitle">Change Title</button>
    <SimpleCard :card="card" />
  </div>
</template>
