---
outline: deep
---
# Revue du travail d'Alexis

## Semaine 1

* ### il a commencé les components
* ### il a commencé les vues
* ### il a commencé a faire les interfaces
* ### il a trouvé un logo pour le site

## Semaine 2

* ### il a fait les service d'accès à la BD pour les vaisseaux et les Personnages
* ### il a fait le fonctionnement d'envoie de l'information a la battaille mais il avait utiliser des params au lieu de query

  #### Avec Params


  ```ts
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
  ```

  #### Avec Query

  ```ts
  const startGame = () => {
    console.log(
      "Starting game with name:",
      name.value,
      "and ship:",
      selectedShip.value
    );
    router.push({
      name: "Bataille",
      query: { name: name.value, selectedShip: selectedShip.value },
    });
  };
  ```
* ### il a fini le formulaire de création d'un joueur
* ### il a ajouté des scores dans la base de données

---

## Semaine 3

* ### il a fait le confirm modal

  ```ts
  <script setup lang="ts">
  import { ref, onMounted, watch } from "vue";
  import { Modal } from "bootstrap";

  const props = defineProps({
    trigger: Number,
    title: String,
    body: String,
    cancelButton: String,
    confirmButton: String,
  });

  // Définir les événements émis par ce composant
  const emit = defineEmits(["onModalConfirmed"]);

  // Utiliser ref pour créer une référence réactive à null qui sera utilisée pour stocker l'instance de la modal
  const modal = ref<Modal | null>(null);

  // Le cycle de vie onMounted remplace mounted de l'API Options.
  // Il est exécuté après que le composant soit monté dans le DOM.
  onMounted(() => {
    // Assure-toi que l'élément #confirm-modal existe dans le template
    if (document.querySelector("#confirm-modal")) {
      modal.value = new Modal("#confirm-modal");
    }
  });

  // Utiliser watch pour observer les changements de la prop 'trigger' et afficher la modal en conséquence
  watch(
    () => props.trigger,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        modal.value?.show();
      }
    }
  );

  // Méthode pour gérer la confirmation, appelée par un événement click dans le template par exemple
  const confirm = () => {
    emit("onModalConfirmed");
  };
  </script>
  <template>
    <div
      class="modal fade"
      id="confirm-modal"
      tabindex="-1"
      aria-labelledby="confirm-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {{ body }}
          </div>
          <div class="modal-footer">
            <button
              name="confirmer"
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-primary"
              @click="confirm"
            >
              {{ confirmButton }}
            </button>
            <button
              name="annuler"
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-secondary"
            >
              {{ cancelButton }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <style scoped></style>

  ```
* ### il a fait les tests:

  * ##### ConfirmModal.test.ts
  * ##### NavigationBar.test.ts
  * ##### NotifyModal.test.ts
  * ##### AccueilViews.test.ts

---
