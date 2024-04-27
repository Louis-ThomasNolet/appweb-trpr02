<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import ShipService from "../scripts/shipService";
import Ship from "../scripts/ship";
import Character from "../scripts/characters";
import ConfirmModal from "../components/ConfirmModal.vue";
import NotifyModal from "../components/NotifyModal.vue";
import ControlPanel from "../components/ControlPanel.vue";
import MissionPanel from "../components/MissionPanel.vue";
import PlayerPanel from "../components/PlayerPanel.vue";
import EnemyPanel from "../components/EnemyPanel.vue";
const triggerModal = ref(0);


const router = useRouter();
const route = router.currentRoute.value;
const shipService = new ShipService();

const taskNumber = ref(1);//numero de la mission en cours qui vient de MissionPanel.vue

const updateTaskNumber = (newTaskNumber: number) => {
  taskNumber.value = newTaskNumber;
};

// set up de l'ennemi a null par default
const currentEnemy = ref<Character>();

const updateCurrentEnemy = (newCurrentEnemy: Character) => {
  currentEnemy.value = newCurrentEnemy;
};

const defeatedEnemies = ref<number[]>([0]);//les ennemis vaincu par le joueur

const updateDefeatedEnemies = (newDefeatedEnemies: number[]) => {
  defeatedEnemies.value = newDefeatedEnemies;
};

const needNewEnemy = ref(false);

const updateNeedNewEnemy = (newNeedNewEnemy: boolean) => {
  needNewEnemy.value = newNeedNewEnemy;
};

const gameEnd = ref(0);

const updateGameEnd = (newGameEnd: number) => {
  gameEnd.value = newGameEnd;
};

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

//set up du vaisseau du joueur
const playerShip = ref<PlayerShip>({
  ship: undefined,//vaisseau du joueur quon doit recuperer avec getShip(shipId recu en query de Accueil.vue) de ShipService
  vitality: 100,//niveau de vie du joueur qui est a 100 au debut
});

onMounted(async () => {
  const shipId = route.query.selectedShip as string;
  const ship = await shipService.getShip(Number(shipId));
  playerShip.value.ship = ship;
});

//set up du joueur qui sera envoyé a playerPanel.vue
const player = ref<Player>({
  name: route.query.name as string,
  level: 4,//tout les joueurs sont "Maitre" 
  credits: 0,//nombre de credit galactique du joueur qui est a 0 au debut
  selectedShip: playerShip.value,//vaisseau selectionné par le joueur
});



let redirectPage = "";
let leave = false as boolean;
function cancelConfirmed() {
  leave = true;
  router.push({ name: redirectPage });
};
onBeforeRouteLeave((to, _from, next) => {// _from so we dont have an error that we are not using it
  if (!leave) {
    triggerModal.value++;
  } else {
    next();

  }
  redirectPage = to.name as string;
});
function getGameEndMessage() {
  if (player.value.selectedShip.vitality <= 0) {
    return "Game Over";
  } else {
    return "You Win!";
  }
};
function getGameEndBody() {
  if (player.value.selectedShip.vitality <= 0) {
    return "Votre vaisseau a été détruit. Cliquer sur 'Retour au menu' pour quitter la partie";
  } else {
    return "Vous avez gagné la partie avec " + player.value.credits + " crédits galactique";
  }
};
function getButtonMessage() {
  if (player.value.selectedShip.vitality <= 0) {
    return "Retour au menu";
  } else {
    return "Voir le classement";
  }
};
function gameEnded() {
  if (player.value.selectedShip.vitality <= 0) {
    router.push({ name: "Accueil" });

  } else {
    router.push({ name: "Score" });
  }
  leave = true;
};


</script>
<template>
  <ConfirmModal @onModalConfirmed="cancelConfirmed" :trigger="triggerModal" title="Attention"
    body="Vos changements seront perdus. Voulez-vous vraiment quitter cette page ? " cancelButton="Non"
    confirmButton="Oui, quitter sans sauvegarder" />
  <NotifyModal @onModalConfirmed="gameEnded" :trigger="gameEnd" :title="getGameEndMessage()" :body="getGameEndBody()"
    :confirmButton="getButtonMessage()" />
  <div>
    <div class="container">
      <div v-if="currentEnemy">
        <div class="row">
          <ControlPanel @updateDefeatedEnemies="updateDefeatedEnemies" :player="player" :currentEnemy="currentEnemy"
            :taskNumber="taskNumber" :gameEnd="gameEnd" @updateTaskNumber="updateTaskNumber" @updateNeedNewEnemy="updateNeedNewEnemy" @updateGameEnd="updateGameEnd"></ControlPanel>
          <MissionPanel @updateTaskNumber="updateTaskNumber" :taskNumber="taskNumber"></MissionPanel>
        </div>
      </div>
      <div class="row">
        <PlayerPanel :player="player"></PlayerPanel>
        <EnemyPanel :enemy="currentEnemy" @updateCurrentEnemy="updateCurrentEnemy" :defeatedEnemies="defeatedEnemies" :needNewEnemy="needNewEnemy">
        </EnemyPanel>
      </div>
    </div>
  </div>
</template>
<style>
div.card {
  opacity: 0.9;
}
</style>
