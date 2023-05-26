<template>
    <v-overlay v-model="isOpen" class="align-center justify-center">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>
<script setup>
// 1. 用store實現
import { storeToRefs } from "pinia";
import { storeFullOverlay } from "~/stores/storeFullOverlay";
const _storeFullOverlay = storeFullOverlay();
const { isOpen } = storeToRefs(_storeFullOverlay);

// 2. 用useState實現
// const isOpen = useState('fullOverlay');

</script>
<style></style>