<script>
import { ref } from "chibi-vue";
</script>

<script setup>
// for v-on
const handleClick = () => {
  alert("clicked");
};

// for v-bind
const style = { color: "red", fontSize: "20px" };

// for v-for
const list = [
  { id: 1, text: "foo" },
  { id: 2, text: "bar" },
  { id: 3, text: "baz" },
];

// for v-model
const input = ref("");
</script>

<template>
  <div>
    <h1>directives</h1>

    <h3>v-on</h3>
    <button @click="handleClick">click me</button>
    <hr />

    <h3>v-bind</h3>
    <div :style="style">hello</div>
    <hr />

    <h3>v-for</h3>
    <ul>
      <li v-for="(item, i) in list" :key="item.id">
        <p>text: {{ item.text }}, index: {{ i }}</p>
      </li>
    </ul>
    <hr />

    <h3>v-model</h3>
    <input v-model="input" />
    <p>value: {{ input }}</p>
  </div>
</template>
