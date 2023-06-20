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
  const googleSignData = useState("googleSignData", () => {
    ref(null);
  });
  onMounted(async () => {
    let res = await getGoogleCallback(queryString);
    if (!res.error) {
      if (res.data.token && res.data.oauth_register) {
        _storeAuth.loginToken = res.data.token;
        _storeChatBox.reConnectWebSocket();
        _storeChatBox.fetchChatList();
        navigateTo("/");
      } else {
        googleSignData.value = {
          userId: res.data.userId,
          queryString: queryString,
        };
        navigateTo(`/auth/google-signup?${queryString}`);
      }
    } else {
    }
  });
  definePageMeta({
    layout: "none",
  });
</script>
