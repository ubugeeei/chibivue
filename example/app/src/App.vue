<script setup>
import { useRouter } from "chibi-vue-router";
const router = useRouter();
const buttonStyle =
  "border: none; padding: 8px; width: 120px; background: #92b5a9; color: #fff; font-weight: bold; border-radius: 4px;";
</script>

<template>
  <div id="pages-app">
    <header>
      <nav
        style="
          background: #1c273e;
          height: 55px;
          padding-top: 25px;
          padding-left: 30px;
        "
      >
        <button :style="buttonStyle" @click="router.push('/')">Top</button>
        <button :style="buttonStyle" @click="router.push('/state')">
          state
        </button>
        <button :style="buttonStyle" @click="router.push('/directive')">
          directive
        </button>
        <button :style="buttonStyle" @click="router.push('/props-emits')">
          props/emit
        </button>
        <button :style="buttonStyle" @click="router.push('/compiler-macro')">
          compiler macro
        </button>
        <button :style="buttonStyle" @click="router.push('/options-api')">
          options api
        </button>
        <button :style="buttonStyle" @click="router.push('/inline')">
          inline
        </button>
        <button :style="buttonStyle" @click="router.push('/store-counter')">
          store
        </button>
        <button :style="buttonStyle" @click="router.push('/todo-app')">
          todo app
        </button>
      </nav>
    </header>

    <div style="background: #efeeea; padding: 20px;  height: 85vh;">
      <RouterView />
    </div>
  </div>
</template>

<style>
#pages-app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
