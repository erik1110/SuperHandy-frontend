<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
      <DialogConfirm />
      <ChatBox v-if="checkIsLogin()" />
      <VSnackbar
        color="success"
        location="top"
        :timeout="2000"
        v-model="isSnackbarOpen"
        >{{ snackbarMessage }}</VSnackbar
      >
    </NuxtLayout>
  </v-app>
</template>
<script setup>
  import { useSpUtility } from "./composables/useSpUtility";
  const { checkIsLogin } = useSpUtility();
  const isSnackbarOpen = useState("isSnackbarOpen", () => ref(false));
  const snackbarMessage = useState("snackbarMessage", () => ref(""));
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
