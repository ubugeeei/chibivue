<script setup>
import { useRouter } from "chibi-vue-router";
const router = useRouter();
</script>

<template>
  <div>
    <nav>
      <a @click="router.push('/')">Top</a>
      <span>|</span>
      <a @click="router.push('/counter')">Counter</a>
      <span>|</span>
      <a @click="router.push('/todo-list')">Todo</a>
    </nav>
    <RouterView />
  </div>
</template>
