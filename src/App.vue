<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <body>
    <div id="app">
      <header>
        <NavigationBar />
      </header>
      <main>
        <RouterView />
      </main>
    </div>
  </body>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
</style>
