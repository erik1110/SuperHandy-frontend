<template>
  <v-dialog v-model="_dialog" width="auto" v-bind="$attrs">
    <v-card class="pt-4 px-8 pb-8">
      <div class="d-flex">
        <v-icon @click="$emit('close')" class="ml-auto">mdi-close</v-icon>
      </div>
      <v-card-text class="py-2 px-0">
        <slot />
      </v-card-text>
      <slot name="actions"></slot>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  dialog: Boolean,
})
const _dialog = computed(() => {
  return props.dialog
})
</script>

<style lang="scss" scoped></style>