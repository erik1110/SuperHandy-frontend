<template>
  <div>
    <div class="sp-mb-4 sp-card-wrapper sp-bg-white">
      <VCardText>
        <V-tabs
          class="sp-inline-block"
          v-model="identityTabs"
          color="v-purple"
          bg-color="primary-lighten"
        >
          <v-tab
            value="account-tasks-index-poster"
            @click="FuncPageRouter('/account/tasks/poster')"
            >發案紀錄
          </v-tab>
          <v-tab
            value="account-tasks-index-helper"
            @click="FuncPageRouter('/account/tasks/helper')"
            >接案紀錄
          </v-tab>
        </V-tabs>
      </VCardText>
    </div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
  import { storeFullOverlay } from "~/stores/storeFullOverlay";
  const _storeFullOverlay = storeFullOverlay();
  _storeFullOverlay.open();
  const route = useRoute();
  const identityTabs = useState("identityTabs", () => ref(""));
  if (route.path == "/account/tasks") {
    navigateTo("/account/tasks/poster");
    identityTabs.value = "account-tasks-index-poster";
  }
  onMounted(() => {
    if (route.path != "/account/tasks") {
      identityTabs.value = route.name;
    } else {
    }
  });
  const FuncPageRouter = function (route) {
    navigateTo(route);
  };
</script>

<style lang="scss" scoped></style>
