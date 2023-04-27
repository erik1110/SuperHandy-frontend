<template>
  <v-layout>
    <Navbar />
    <div class="sp-mt-[48px] sp-p-[16px] sp-w-full">
      <v-container>
        <Breadcrumbs />
        <slot />
      </v-container>
    </div>
  </v-layout>
  <Footer />
</template>

<script setup></script>

<style scoped></style>
