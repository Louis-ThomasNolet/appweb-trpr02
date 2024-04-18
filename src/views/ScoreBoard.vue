<script setup lang="ts">
import { onMounted, ref } from "vue";
import Ranking from "../scripts/ranking.ts";
import RankingService from "../scripts/rankingService";

const service = new RankingService();

const ranking = ref<Ranking[]>([]);
onMounted(async () => {
  try {
    console.log("Fetching data...");
    const fetchedRanking = await service.getRanking();
    console.log(fetchedRanking);
    ranking.value = fetchedRanking as Ranking[];

    return ranking;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>
<template>
  <ul>
    <li v-for="rank in ranking" :key="rank.id">
      {{ rank.name }} - {{ rank.score }}
    </li>
  </ul>
</template>
<style></style>
