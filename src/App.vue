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
html,
body {
  background-image: url("./src/assets/background.jpg");
  width: 100%;
  height: 100vh;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
nav {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
</style>
