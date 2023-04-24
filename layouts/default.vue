<template>
  <v-layout>
    <Navbar />
    <v-main>
      <v-container>
        <h6 class="sp-text-gray-600">{{ $route.fullPath }}</h6>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
</script>

<style scoped></style>