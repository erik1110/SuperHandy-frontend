<template>
  <v-footer class="bg-grey-lighten-3 footer">
    <v-row justify="center" no-gutters>
      <NuxtLink v-for="link in links" :key="link" :to="link.to">
        <v-btn variant="text" class="mx-2 text-blue-grey-darken-1" rounded="xl">
          {{ link.title }}
        </v-btn>
      </NuxtLink>
      <v-col class="text-center mt-4 text-blue-grey-darken-4" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>HexSchool 北三組 專題使用</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
  const links = ref([
    { title: "關於我們", to: "/about" },
    { title: "使用者條款", to: "/terms" },
    { title: "隱私權政策", to: "/privacy" },
    { title: "常見問題", to: "/faq" },
  ]);
</script>

<style lang="scss" scoped>
  .footer {
    max-height: 180px;
  }
</style>
