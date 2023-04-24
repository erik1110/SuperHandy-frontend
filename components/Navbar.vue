<template>
  <!-- <nav style="background-color: lightblue;">Logo</nav> -->
  <v-app-bar :elevation="2" class="sp-mb-4" density="compact" color="primary">
    <template v-slot:prepend>
      <v-icon>mdi-star-face</v-icon>
      <h1 class="sp-italic sp-text-3xl">SuperHandy</h1>
    </template>
    <template v-slot:append>
      <NuxtLink to="/find-tasks/list">
        <v-btn>找任務</v-btn>
      </NuxtLink>
      <NuxtLink to="/post-task/-1">
        <v-btn>刊登任務</v-btn>
      </NuxtLink>
      <NuxtLink to="/account">
        <v-btn icon><v-icon>mdi-account-circle</v-icon></v-btn>
      </NuxtLink>
    </template>
  </v-app-bar>
</template>
