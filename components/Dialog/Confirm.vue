<template>
  <v-dialog
    v-model="confirmDialog.open"
    width="auto"
    max-width="600"
    :persistent="confirmDialog.closeHandle"
  >
    <v-card>
      <v-card-title v-if="confirmDialog.title">
        {{ confirmDialog.title }}
      </v-card-title>
      <v-card-text>
        {{ confirmDialog.content }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="_storeGlobal.closeConfirm"
          >好</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { storeToRefs } from "pinia";
  import { storeGlobal } from "~/stores/storeGlobal";
  const _storeGlobal = storeGlobal();
  const { confirmDialog } = storeToRefs(_storeGlobal);
</script>

<style lang="scss" scoped></style>
