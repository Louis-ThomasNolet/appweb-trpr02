<script setup lang="ts">
import Bataille from "./components/Bataille.vue";
import NavigationBar from "./components/NavigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <NavigationBar />
  </header>
  <body>
    <main>
      <Bataille />
      <RouterView />
    </main>
  </body>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
</style>
