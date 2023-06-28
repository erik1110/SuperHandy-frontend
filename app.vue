<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
      <DialogConfirm />
      <ChatBox v-if="checkIsLogin()" />
      <MessageBox v-if="checkIsLogin()" />
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
  import { storeToRefs } from "pinia";
  import { storeChatBox } from "@/stores/storeChatBox";
  const { checkIsLogin } = useSpUtility();
  const isSnackbarOpen = useState("isSnackbarOpen", () => ref(false));
  const snackbarMessage = useState("snackbarMessage", () => ref(""));

  const route = useRoute();
  // 路由更換自動關閉聊天室
  const _storeChatBox = storeChatBox();
  const { showChat } = storeToRefs(_storeChatBox);
  watch(
    () => route.path,
    (val) => {
      if (showChat.value) {
        _storeChatBox.showChat = false;
      }
    }
  );
</script>
<style>
  body::-webkit-scrollbar {
    display: none;
  }
  body {
    scrollbar-width: none;
  }
</style>
