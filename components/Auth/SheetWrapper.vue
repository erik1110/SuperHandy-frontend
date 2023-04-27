<template>
  <v-sheet class="pa-10 h-screen" color="primary-lighten">
    <v-card class="mx-auto px-8 py-8" :max-width="$attrs['spMaxWidth'] ? $attrs['spMaxWidth'] : 350" rounded="xl"
      elevation="0">
      <slot />
    </v-card>
  </v-sheet>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>