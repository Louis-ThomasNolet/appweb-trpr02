<script setup lang="ts">
import { onMounted, ref } from "vue";
import Ranking from "../scripts/ranking.ts";
import RankingService from "../scripts/rankingService";

const service = new RankingService();

const ranking = ref<Ranking[]>([]);
const sortedRanking = ref<Ranking[]>([]);
onMounted(async () => {
  try {
    const fetchedRanking = await service.getRanking();
    ranking.value = fetchedRanking as Ranking[];
    sortRanking();

    return ranking;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function sortRanking() {
  sortedRanking.value = ranking.value.sort((a, b) => b.score - a.score);
  return sortedRanking;
}
</script>
<template>
  <div class="container">
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th style="background-color: #0d6efd" scope="col">#</th>
          <th style="background-color: #0d6efd" scope="col">Nom</th>
          <th style="background-color: #0d6efd" scope="col">Score</th>
        </tr>
      </thead>
      <tbody class="table-dark">
        <tr v-for="(rank, index) in sortedRanking" :key="rank.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ rank.name }}</td>
          <td>{{ rank.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
.container {
  margin-top: 20px;
  opacity: 0.9;
}
</style>
