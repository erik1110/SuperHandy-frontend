<template>
  <div>
    <VCard
      ><VCardText>
        <V-tabs
          class="sp-inline-block"
          v-model="identityTabs"
          color="v-purple"
          bg-color="primary-lighten"
        >
          <v-tab
            value="account-tasks-index-poster"
            @click="FuncPageRouter('/account/tasks/poster')"
            >案主任務
          </v-tab>
          <v-tab
            value="account-tasks-index-helper"
            @click="FuncPageRouter('/account/tasks/helper')"
            >幫手任務
          </v-tab>
        </V-tabs>
      </VCardText></VCard
    >
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
  const route = useRoute();
  const identityTabs = ref("");
  if (route.path == "/account/tasks") {
    navigateTo("/account/tasks/poster");
    identityTabs.value = "account-tasks-index-poster";
  }
  onMounted(() => {
    if (route.path != "/account/tasks") {
      identityTabs.value = route.name;
    }
  });
  const FuncPageRouter = function (route) {
    navigateTo(route);
  };
</script>

<style lang="scss" scoped></style>
