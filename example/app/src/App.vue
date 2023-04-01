<script setup>
import { useRouter } from "chibi-vue-router";
const router = useRouter();
</script>

<template>
  <div>
    <nav>
      <a @click="router.push('/')">Top</a>
      <span>|</span>
      <a @click="router.push('/state')">state</a>
      <span>|</span>
      <a @click="router.push('/directive')">directive</a>
      <span>|</span>
      <a @click="router.push('/props-emits')">props/emit</a>
      <span>|</span>
      <a @click="router.push('/store-counter')">store</a>
      <span>|</span>
      <a @click="router.push('/todo-app')">todo app</a>
    </nav>
    <RouterView />
  </div>
</template>
