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
          <v-tab value="poster" @click="FuncPageRouter('/account/tasks/poster')"
            >案主任務
          </v-tab>
          <v-tab value="helper" @click="FuncPageRouter('/account/tasks/helper')"
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
  const identityTabs = useState("poster");
  if (route.path == "/account/tasks") {
    navigateTo("/account/tasks/poster");
  }
  const FuncPageRouter = function (route) {
    navigateTo(route);
  };
</script>

<style lang="scss" scoped></style>
