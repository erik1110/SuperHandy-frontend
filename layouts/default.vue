<template>
  <v-layout class="sp-min-h-screen">
    <Navbar />
    <div class="sp-mt-[48px] sp-w-full">
      <Breadcrumbs />
      <slot />
    </div>
  </v-layout>
  <Footer />
</template>

<script setup></script>

<style scoped></style>
