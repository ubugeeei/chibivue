<script>
import { useRouter } from "chibi-vue-router";

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
};
</script>

<template>
  <div>
    <nav>
      <a @click="router.push('/')">top</a>
      <a @click="router.push('/counter')">counter</a>
    </nav>
    <RouterView />
  </div>
</template>
