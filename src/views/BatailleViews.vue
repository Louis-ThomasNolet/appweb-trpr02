<script setup lang="ts">
import { ref, onMounted} from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import ShipService from "../scripts/shipService";
import Ship from "../scripts/ship";
import CharacterService from "../scripts/characterService";
import Character from "../scripts/characters";
import ConfirmModal from "../components/ConfirmModal.vue";
import NotifyModal from "../components/NotifyModal.vue";

const triggerModal = ref(0);
const gameEnd = ref(0);

const router = useRouter();
const route = router.currentRoute.value;
const shipService = new ShipService();
const taskNumber = ref(1);//numero de la mission en cours qu'on va incrementer a chaque mission reussi. Pour l'instant on est a la mission 1/5
const characterService = new CharacterService();
let defeatedEnemies = ref<number[]>([0]);//les ennemis vaincu par le joueur
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
  getRandomEnemy();
});

//set up du joueur
const player = ref<Player>({
  name: route.query.name as string,
  level: 4,//tout les joueurs sont "Maitre" 
  credits: 0,//nombre de credit galactique du joueur qui est a 0 au debut
  selectedShip: playerShip.value,//vaisseau selectionné par le joueur
});

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


async function getRandomEnemy() {
  let enemy = await characterService.getRandomCharacter();
  if (defeatedEnemies.value.includes(enemy.id)) {
    getRandomEnemy();
  }
  currentEnemy.value.name = enemy.name;
  currentEnemy.value.experience = enemy.experience;
  currentEnemy.value.credit = enemy.credit;
  currentEnemy.value.ship = enemy.ship;
};

//fonction qui permet d'attaquer 
function attack() {
  //debug
  taskNumber.value = 5;
  gameEnd.value++;

  if (currentEnemy.value.ship.vitality > 0 && player.value.selectedShip.vitality > 0) {
    //player attaque l'ennemi
    let attackChance = getAttackChance(player.value.level) as number;
    let attackSuccess = Math.random() * 101 < attackChance as boolean;

    if (attackSuccess) {
      currentEnemy.value.ship.vitality -= Math.floor(Math.random() * 4) + 3; // entre 0 et 3 puis on fait plus 3 pour avoir un chiffre entre 3 et 6
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
  if (currentEnemy.value.ship.vitality <= 0) {
    while (player.value.credits > 0 && player.value.credits >= 2) {
      player.value.selectedShip.vitality += 1;
      player.value.credits -= 2;// jai mit 2 pour reparer 1 point de vie car 5 credits pour reparer 1 point de vie c'est trop cher
    }
    endMission();
  }

};

function endMission() {
  if (currentEnemy.value.ship.vitality <= 0) {
    if (taskNumber.value < 5) {
      taskNumber.value++;
      getRandomEnemy();
    } else {
      gameEnd.value++;
    }
  }

};
let redirectPage = "";
let leave = false as boolean;

function cancelConfirmed() {
  leave = true;
  router.push({ name: redirectPage });
};


onBeforeRouteLeave((to, from, next) =>{
  if (!leave) {
    triggerModal.value ++;
  }else{
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
  console.log("game ended");
  if (player.value.selectedShip.vitality <= 0) {
    router.push({ name: "Accueil" });
    
  } else {
    router.push({ name: "Score" });
  }
  leave = true;
};
</script>
<template>
        <ConfirmModal               
          @onModalConfirmed="cancelConfirmed"
          :trigger="triggerModal"
          title="Attention"
          body="Vos changements seront perdus. Voulez-vous vraiment quitter cette page ? "
          cancelButton="Non"
          confirmButton="Oui, quitter sans sauvegarder"/>
        <NotifyModal               
          @onModalConfirmed="gameEnded"
          :trigger="gameEnd"
          :title="getGameEndMessage()"
          :body="getGameEndBody()"
          :confirmButton="getButtonMessage()"/>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-7">
          <div class="card border-0">
            <div class="card-header text-white bg-primary">Actions</div>
            <div class="card-body text-white bg-dark">
              <div class="row">
                <div class="col-4">
                  <button class="btn btn-primary" @click="attack()">Attaquer</button>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary" @click="endMission()">Terminer la mission</button>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary" @click="repairShip()">Terminer la mission et Réparer le vaisseau</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="card border-0">
            <div class="card-header text-white bg-primary">
              Mission en cours
            </div>
            <div class="card-body text-white bg-dark">
              <div>Mission actuelle : {{ taskNumber }}/5</div>
              <div>
                Objectif: Vous dever éliminer 5 vaisseau afin de remporter des
                crédits galactiques
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card border-0">
            <div class="card-header text-white bg-primary">{{ player.name }}</div>
            <div class="card-body text-white bg-dark">
              <p>Niveau du joueur : {{ getRank(player.level) }}</p>
              <p>Crédits galactiques : {{ player.credits }}</p>
              <p>Vaisseau : {{ player.selectedShip.ship?.name }}</p>
              <p>Vie du vaisseau :
              <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{ width: `${player.selectedShip.vitality}%` }"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          < class="col">
            <div class="card border-0">
              <div class="card-header text-white bg-primary">{{ currentEnemy?.name }}</div>
              <div class="card-body text-white bg-dark">
                <p>Niveaux de l'ennemi : {{ getRank(currentEnemy.experience) }}</p>
                <p>Crédits galactiques : {{ currentEnemy.credit }}</p>
                <p>Vaisseau : {{ currentEnemy.ship.name }}</p>
                <p>Vie du vaisseau :
                <div class="progress">
                  <div class="progress-bar" role="progressbar" :style="{ width: `${currentEnemy.ship.vitality}%` }"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>
<style>
div.card {
  opacity: 0.9;
}
</style>
