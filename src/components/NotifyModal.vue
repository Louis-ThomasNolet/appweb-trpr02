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
  if (document.querySelector("#game-end-modal")) {
    modal.value = new Modal("#game-end-modal");
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
      id="game-end-modal"
      tabindex="-1"
      aria-labelledby="game-end-modal"
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
          </div>
        </div>
      </div>
    </div>
  </template>
  <style scoped></style>