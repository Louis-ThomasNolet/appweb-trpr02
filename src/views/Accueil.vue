<script setup lang="ts">
import { ref} from "vue";
import { useRouter} from "vue-router";
//import { dbService } from "../scripts/dbService";

const router = useRouter();
const name = ref("");  
const selectedShip = ref("");


const startGame = () => {
  router.push({ name: "bataille", params: { name: name.value, selectedShip: selectedShip.value } });
};

</script>
<template>
  <body>
    <main>
      <div class="container">
        <div>
          <h3>Votre Objectif:</h3>
          <p class="lead">
            Vous devez survivre à 5 missions en obtenant le plus de crédits
            galactiques
          </p>
        </div>
        <form @submit.prevent="startGame">
          <div class="form">
            <div>
              <label for="name">Nom du joueur</label>
              <input
                v-model="name"
                type="text"
                id="name"
                name="name"
                class="form-control"
                required
              />
            </div>
            <div>
              <label for="ship">Nom du vaisseau</label>
              <select
              v-model="selectedShip"
                name="ships"
                id="ship-select"
                class="form-control"
                required
              ></select>
            </div>
            <br>
              <div>
                <button type="submit" class="btn btn-dark">Commencer</button>
              </div>
            </br>
          </div>
        </form>
      </div>
    </main>
  </body>
</template>
<style></style>
