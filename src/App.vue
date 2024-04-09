<script setup lang="ts">
import Bataille from "./components/Bataille.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <a>Star Battle</a>
      |
      <a>Accueil</a>
      |
      <a>LeaderBoard</a>
    </nav>
  </header>
  <body>
    <main>
      <Bataille />
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
