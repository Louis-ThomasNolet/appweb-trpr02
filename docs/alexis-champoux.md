outline: deep

# Revue de code semaine #1

Louis-Thomas a fait tout le setup de notre TP afin que nous soyons prêt à commencer celui-ci comme du monde, mais il a installé pinia, car il croyait que nous allions l'utiliser dans le TP.
Mais Louis-Thomas ne sait pas lire donc il l'a installé pareil. (entre les parenthèses)

Il a aussi fait notre lancement sur la Github Pages afin que notre revue de code soit en ligne dès le début du TP et qu'on n'aille pas besoin de le faire vers la fin et de connaitre plein de bug qui pourrait faire crasher notre appli et mener à notre échec

```md

{
  "name": "appweb-trpr02",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "dependencies": {
    "bootstrap": "^5.3.3",
    "bootstrap-vue": "^2.23.1",
    ((((((("pinia": "^2.1.7",)))))))
    "vue": "^3.4.21",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "vitepress": "^1.0.2"
  }
}
```

## Revue de code semaine #2

Louis-Thomas a fait une bonne partie de la page battaille, car il ne manque qu'a faire la redirection et l'ajout du score dans la bd afin qu'il s'affiche dans le classement

Bataille.vue

```ts
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ShipService from "../scripts/shipService";
import Ship from "../scripts/ship";
import CharacterService from "../scripts/characterService";
import Character from "../scripts/characters";

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
        alert("Vous avez perdu");
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
      alert("Vous avez gagné la partie avec " + player.value.credits + " crédits galactique");
    }
  }

};

/*
pourrait etre une bonne idee?

function getRepairCost() : number {
  return (100 - player.value.selectedShip.vitality) * 5 ?? 0;
};
*/
</script>
<template>
  <main>
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
          <div class="col">
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
  </main>
</template>
<style>
div.card {
  opacity: 0.9;
}
</style>

```

De plus, il a aussi modifier le fichier ts de CharacterService.ts afin de rajouter une fonction pour sélectionné un personnage random dans la liste de la bd

```ts
    async getRandomCharacter(): Promise<Character> {
        const characterList: any[] = await this.getCharacterList();
        const randomIndex: number = Math.floor(Math.random() * characterList.length);
        return characterList[randomIndex];
    }
```

Aussi, il a fait les routes de notre application

### Revue de Code Semaine 3 (FIN)

Louis-Thomas a fait, cette semaine, il a divisé la vue Bataille.vue en différent Components tels que ControlPanel.vue,EnemyPanel.vue, PlayerPanel.vue, MissionPanel.vue

```ts
 //ControlPanel.vue
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
let player = ref<Player>(props.player);
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
  else if (taskNumber.value >= 5) {
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
  } else if (rank == 5) {//GOD NEVER MISSES et c'est utile pour les tests
    return 100;
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
            <button class="btn btn-primary" @click="endMission()" id="EndMission">Terminer la mission</button>
          </div>
          <div class="col-4">
            <button class="btn btn-primary" @click="repairShip()" id="Repair">Terminer la mission et Réparer le
              vaisseau</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>

```

Il a aussi fais tous les tests des Services

```ts
//ShipService.test.ts
import { describe, expect, it } from 'vitest'
import ShipService from '../shipService'

const shipService = new ShipService()

describe('ShipService', () => {
    it('should get ships', async () => {
        const ships = await shipService.getShipList()

        expect(ships).toBeInstanceOf(Array)
        expect(ships.length).toBeGreaterThan(0)
    });

    it('should get a specific ship', async () => {
        const ships = await shipService.getShip(5307)

        expect(ships.name).toBe('Jedi Interceptor')
    });

});

```
Et il a aussi fait le notifyModal et les tests de ControlPanel.test.ts
