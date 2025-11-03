<template>
  <div class="wrapper">
    <NavBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from '@/layout/NavBar.vue'

export default {
  components: {
    NavBar,
  },
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #1c1917;
  color: #f0f0f0;
}

#app {
  height: 100vh;
}

.wrapper {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  gap: 20px;
  padding: 20px;
}
</style>
