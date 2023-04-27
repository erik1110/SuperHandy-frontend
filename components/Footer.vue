<template>
  <v-footer class="bg-grey-lighten-3 footer">
    <v-row justify="center" no-gutters>
      <v-btn v-for="link in links" :key="link" variant="text" class="mx-2 text-blue-grey-darken-1" rounded="xl">
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4 text-blue-grey-darken-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>HexSchool 北三組 專題使用</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
const links = ref([
  '關於我們',
  '使用者條款',
  '隱私權政策',
  '常見問題',
])
</script>

<style lang="scss" scoped>
.footer {
  max-height: 180px;
  transform: translateY(100%);
}
</style>