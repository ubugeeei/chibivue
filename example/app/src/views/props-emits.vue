<script>
import { defineComponent, reactive } from "chibi-vue";
import SimpleCard from "../components/SimpleCard.vue";
import SimpleBtn from "../components/SimpleBtn.vue";

export default defineComponent({
  components: { SimpleCard, SimpleBtn },
  setup() {
    const card = reactive({
      title: "Hello World",
      content: "This is a simple card",
    });

    const changeTitle = () => {
      card.title =
        card.title === "Hello World!!!!!!!!!!!"
          ? "Hello World??????????"
          : "Hello World!!!!!!!!!!!";
    };

    return { card, changeTitle };
  },
});
</script>

<template>
  <div>
    <h1>props/emits</h1>
    <SimpleCard :card="card" />
    <SimpleBtn text="Change Title" @click:simple-btn="changeTitle" />
  </div>
</template>
