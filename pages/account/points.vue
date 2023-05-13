<template>
  <div>
    <VContainer fluid
      ><VRow>
        <VCol>
          <V-tabs v-model="pointTabs" color="secondary">
            <v-tab value="account-points">
              <NuxtLink class="point" to="/account/points/">點數詳情</NuxtLink>
            </v-tab>
            <v-tab value="account-points-history">
              <NuxtLink to="/account/points/history">點數歷史</NuxtLink>
            </v-tab>
            <v-tab value="account-points-exchange">
              <NuxtLink to="/account/points/exchange">點數兌換</NuxtLink>
            </v-tab>
          </V-tabs>
        </VCol>
      </VRow>
    </VContainer>
    <NuxtPage />
  </div>
</template>

<script setup>
  const route = useRoute();
  const pointTabs = ref(route.name);
</script>

<style lang="scss" scoped>
  .router-link-active:not(.point) {
    color: #b7eeee;
  }
</style>
