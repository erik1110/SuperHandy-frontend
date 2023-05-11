<template>
  <v-footer class="bg-v-gray-text footer">
    <v-row justify="center" class="w-100" no-gutters>
      <div class="d-flex w-100 sp-max-w-[800px] align-center">
        <div>
          <NuxtLink v-for="link in links" :key="link" :to="link.to">
            <v-btn variant="text" class="mx-2 text-v-gray-bg" rounded="xl">
              {{ link.title }}
            </v-btn>
          </NuxtLink>
        </div>
        <NuxtLink class="ml-auto" to="/">
          <div class="logo"></div>
        </NuxtLink>
      </div>


      <v-col class="text-center mt-4" cols="12">

        <strong class="sp-text-body-sm sp-text-[#fff4]">HexSchool 北三組 專題使用</strong>
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
