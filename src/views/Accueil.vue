<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ShipService from "../scripts/shipService";
import Ship from "../scripts/ship";

const shipService = new ShipService();
const ships = ref<Ship[]>([]);
const router = useRouter();
const name = ref("");
const selectedShip = ref("");

onMounted(async () => {
  try {
    const response = await shipService.getShipList();
    ships.value = response as Ship[];
  } catch (error) {
    console.error("Error fetching ships:", error);
  }
});

//Fonction qui permet d'envoyer les informations du joueur et du vaisseau selectionné à la page de bataille
const startGame = () => {
  console.log(
    "Starting game with name:",
    name.value,
    "and ship:",
    selectedShip.value
  );
  router.push({
    name: "Bataille",
    params: { name: name.value, selectedShip: selectedShip.value },
  });
};
</script>
<template>
  <body>
    <main>
      <div class="container">
        <div class="transbox text-white bg-dark">
          <div class="text-white bg-primary style">
            <h3>Votre Objectif:</h3>
            <p class="lead">
              Vous devez survivre à 5 missions en obtenant le plus de crédits
              galactiques
            </p>
          </div>
          <form @submit.prevent="startGame">
            <div class="form style">
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
                >
                  <option value="" disabled selected>
                    Sélectionnez un vaisseau
                  </option>
                  <option
                    v-for="ship in ships"
                    :key="ship.id"
                    :value="ship.name"
                  >
                    {{ ship.name }}
                  </option>
                </select>
              </div>
              <br />
              <div>
                <button type="submit" class="btn btn-primary">Commencer</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </body>
</template>
<style>
div.transbox {
  margin: 30px;
  opacity: 0.9;
}
div.style {
  padding: 10px;
}
</style>
