<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";

const taskNumber = ref(1);//numero de la mission en cours qu'on va incrementer a chaque mission reussi. Pour l'instant on est a la mission 1/5

const emit = defineEmits(['updateTaskNumber']);

watch(taskNumber, (newTaskNumber) => {
  emit('updateTaskNumber', newTaskNumber);
});

defineProps({
  taskNumber: Number,
});

</script>
<template>
<div class="col-5">
    <div class="card border-0">
        <div class="card-header text-white bg-primary">
            Mission en cours
        </div>
        <div class="card-body text-white bg-dark">
            <div>
                Mission actuelle : {{ $props.taskNumber }}/5
            </div>
            <div>
                Objectif: Vous dever éliminer 5 vaisseau afin de remporter des crédits galactiques
            </div>
        </div>
    </div>
</div>
</template>