<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";
import { defineProps } from 'vue';
import Ship from "../scripts/ship";
import Character from "../scripts/characters";
import RankingService from "../scripts/rankingService";
interface PlayerShip {
  ship: Ship | undefined,
  vitality: number,
}

interface Player {
  name: string,
  level: number,
  credits: number,
  selectedShip: PlayerShip,
}




const props = defineProps({
  player: {
    type: Object as () => Player,
    required: true,
  },
  currentEnemy: {
    type: Object as () => Character,
    required: true,
  },
  taskNumber: {
    type: Number,
    required: true,
  },
  gameEnd: {
    type: Number,
    required: true,
  },
});

const rankingService = new RankingService();
const player = ref<Player>(props.player);
let currentEnemy = ref<Character>(props.currentEnemy);
const taskNumber = ref<number>(props.taskNumber);
const gameEnd = ref<number>(props.gameEnd);
const needNewEnemy = ref<boolean>(false);
const defeatedEnemies = ref<number[]>([0]);
const emit = defineEmits(['defeatedEnemies', 'updateTaskNumber', 'updateGameEnd', 'updateNeedNewEnemy']);

watch(defeatedEnemies, (newDefeatedEnemies: number[]) => {
  emit('defeatedEnemies', newDefeatedEnemies);
});

watch(taskNumber, (newTaskNumber: number) => {
  emit('updateTaskNumber', newTaskNumber);
});

watch(() => gameEnd.value, (newGameEnd: number) => {
  needNewEnemy.value = false;//stop from generating new enemy
  rankingService.addRanking(player.value.name, player.value.credits);
  emit('updateGameEnd', newGameEnd);
});

watch(needNewEnemy, (newNeedNewEnemy: boolean) => {
  emit('updateNeedNewEnemy', newNeedNewEnemy);
});

watch(() => currentEnemy.value?.ship.vitality, () => {
  if (currentEnemy.value.ship.vitality > 0) {
      needNewEnemy.value = false;
  }
  else if(taskNumber.value >= 5) {
    gameEnd.value++;//end the game if the player has completed 5 missions
  }
});

//fonction qui permet d'attaquer 
function attack() {
if (currentEnemy.value.ship.vitality > 0 && player.value.selectedShip.vitality > 0) {
  //player attaque l'ennemi
  let attackChance = getAttackChance(player.value.level) as number;
  let attackSuccess = Math.random() * 101 < attackChance as boolean;

  if (attackSuccess) {
    currentEnemy.value.ship.vitality -= Math.floor(Math.random() * 4) + 3; // entre 0 et 3 puis on fait plus 3 pour avoir un chiffre entre 3 et 6
    
    currentEnemy.value.ship.vitality = 0;
    if (currentEnemy.value.ship.vitality <= 0) {
      currentEnemy.value.ship.vitality = 0;
      player.value.credits += currentEnemy.value.credit;
      defeatedEnemies.value.push(currentEnemy.value.id);
    }
  }
  //ennemi attaque le joueur
  attackChance = getAttackChance(currentEnemy.value.experience) as number;
  attackSuccess = Math.random() * 101 < attackChance as boolean;

  if (attackSuccess) {
    player.value.selectedShip.vitality -= Math.floor(Math.random() * 4) + 3;
    if (player.value.selectedShip.vitality <= 0) {
      player.value.selectedShip.vitality = 0;
      gameEnd.value++;
    }
  }
}
};
//fonction qui permet de recuperer la pourcentage de toucher lors d'une attaque
function getAttackChance(rank: number) {
if (rank == 1) {
  return 20;
} else if (rank == 2) {
  return 35;
} else if (rank == 3) {
  return 50;
} else if (rank == 4) {
  return 70;
}
};
//fonction qui permet de reparer le vaisseau
function repairShip() {
if (player.value?.selectedShip.vitality < 100 && player.value.selectedShip.vitality > 0 && currentEnemy.value.ship.vitality <= 0) {
  while (player.value.credits > 0 && player.value.credits >= 2 && player.value.selectedShip.vitality < 100) {
    player.value.selectedShip.vitality += 1;
    player.value.credits -= 2;// jai mit 2 pour reparer 1 point de vie car 5 credits pour reparer 1 point de vie c'est trop cher
  }
  endMission();
}

};
function endMission() {
if (currentEnemy.value && currentEnemy.value.ship.vitality <= 0) {
  if (taskNumber.value < 5) {
    taskNumber.value++;
    needNewEnemy.value = true;
  } else {
    gameEnd.value++;
  }
}

};
</script>
<template>
        <div class="col-7">
          <div class="card border-0">
            <div class="card-header text-white bg-primary">
              Actions
            </div>
            <div class="card-body text-white bg-dark">
              <div class="row">
                <div class="col-4">
                  <button class="btn btn-primary" @click="attack()" id="Attack">Attaquer</button>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary" @click="endMission()">Terminer la mission</button>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary" @click="repairShip()">Terminer la mission et Réparer le
                    vaisseau</button>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>
<style scoped></style>