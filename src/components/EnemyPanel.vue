<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import CharacterService from "../scripts/characterService";
import Character from "../scripts/characters";



const characterService = new CharacterService();
// set up de l'ennemi a null par default
const currentEnemy = ref<Character>({
  id: 0,
  name: "Aucun ennemi en vue",
  experience: 0,
  credit: 0,
  ship: {
    id: 0,
    name: "",
    vitality: 0,
  }
});

const props = defineProps({
  defeatedEnemies: {
    type: Array<number>,
    required: true,
  },
  needNewEnemy: {
    type: Boolean,
    required: true,
  },
});
const defeatedEnemies = props.defeatedEnemies;//les ennemis vaincu par le joueur
let needNewEnemy = props.needNewEnemy;

onMounted(() => {
    getRandomEnemy();
});


async function getRandomEnemy() {
  let enemy = await characterService.getRandomCharacter();
  if (defeatedEnemies.includes(enemy.id)) {
    getRandomEnemy();
  }
  currentEnemy.value.name = enemy.name;
  currentEnemy.value.experience = enemy.experience;
  currentEnemy.value.credit = enemy.credit;
  currentEnemy.value.ship = enemy.ship;
  emit('updateCurrentEnemy', currentEnemy.value);
};
//fonction qui permet de recuperer le rang du joueur en fonction de son niveau
function getRank(number: number) {
  if (number == 1) {
    return "Débutant";
  } else if (number == 2) {
    return "Confirmé";
  } else if (number == 3) {
    return "Expert";
  } else if (number == 4) {
    return "Maitre";
  }
};

const emit = defineEmits(['updateCurrentEnemy']);

watch(() => props.needNewEnemy, (newNeedNewEnemy: boolean) => {
  needNewEnemy = newNeedNewEnemy;
  if(needNewEnemy)
    getRandomEnemy(); 
  needNewEnemy = false;
});

</script>
<template>
    <div class="col">
            <div class="card border-0">
                <div class="card-header text-white bg-primary">
                    {{ currentEnemy?.name }}
                </div>
                <div class="card-body text-white bg-dark">
                    <p>Niveaux de l'ennemi : {{ getRank(currentEnemy.experience) }}</p>
                    <p>Crédits galactiques : {{ currentEnemy.credit }}</p>
                    <p>Vaisseau : {{ currentEnemy.ship.name }}</p>
                    <p>Vie du vaisseau :
                    <div class="progress">
                        <div class="progress-bar" role="progressbar"
                            :style="{ width: `${currentEnemy.ship.vitality}%` }" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                    </p>
                </div>
            </div>
    </div>
</template>