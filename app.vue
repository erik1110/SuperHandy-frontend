<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
      <DialogConfirm />
      <ChatBox v-if="checkIsLogin()" />
    </NuxtLayout>
  </v-app>
</template>
<script setup>
  import { useSpUtility } from "./composables/useSpUtility";
  const { checkIsLogin } = useSpUtility();
  onMounted(() => {});
</script>
<style>
  body::-webkit-scrollbar {
    display: none;
  }
  body {
    scrollbar-width: none;
  }
</style>
