<script setup lang="ts">
import { ref } from "vue";
import Ship from "../scripts/ship";

interface Player {
  name: string,
  level: number,
  credits: number,
  selectedShip: PlayerShip,
}

interface PlayerShip {
  ship: Ship | undefined,
  vitality: number,
}

// Define props
const props = defineProps({
  player: {
    type: Object as () => Player,
    required: true,
  },
});
const player = ref<Player>(props.player);

</script>
<template>
    <div class="col">
        <div class="card border-0">
            <div class="card-header text-white bg-primary">
                {{ player.name }}
            </div>
            <div class="card-body text-white bg-dark">
                <p>Niveau du joueur : Maitre</p>
                <p>Crédits galactiques : {{ player.credits }}</p>
                <p>Vaisseau : {{ player.selectedShip.ship?.name }}</p>
                <p>Vie du vaisseau :
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{ width: `${player.selectedShip.vitality}%` }"
                        aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
                </p>
            </div>
        </div>
    </div>
</template>