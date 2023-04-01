<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    reset() {
      this.count = 0;
    },
  },
  computed: {
    double() {
      return this.count * 2;
    },
  },
};
</script>

<template>
  <div>
    <h1>options api</h1>
    <p>count: {{ count }}</p>
    <p>double: {{ double }}</p>
    <button @click="increment">increment</button>
    <button @click="reset">reset</button>
  </div>
</template>
