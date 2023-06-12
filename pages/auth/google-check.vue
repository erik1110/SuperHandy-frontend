<template>
  <div class="">
    <VOverlay v-model="open"></VOverlay>
  </div>
</template>
<script setup>
  import { getGoogleCallback } from "@/services/apis/auth";
  import { storeAuth } from "@/stores/storeAuth";
  import { storeChatBox } from "@/stores/storeChatBox";
  const route = useRoute();
  const queryString = route.fullPath.split("?")[1];
  const _storeAuth = storeAuth();
  const _storeChatBox = storeChatBox();
  const open = true;
  onMounted(async () => {
    let res = await getGoogleCallback(queryString);
    if (!res.error) {
      if (res.data.token) {
        _storeAuth.loginToken = res.data.token;
        _storeChatBox.reConnectWebSocket();
        _storeChatBox.fetchChatList();
        navigateTo("/");
      } else {
        navigateTo(`/auth/google-signup?${queryString}`);
      }
    } else {
    }
  });
  definePageMeta({
    layout: "none",
  });
</script>
