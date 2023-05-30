<template>
  <div>
    <VCard
      ><VCardText>
        <V-tabs v-model="pointTabs" color="secondary">
          <v-tab value="account-points" @click="gotoTabs('/account/points/')">
            點數詳情
          </v-tab>
          <v-tab
            value="account-points-history"
            @click="gotoTabs('/account/points/history')"
          >
            點數歷史
          </v-tab>
          <v-tab
            value="account-points-exchange"
            @click="gotoTabs('/account/points/exchange')"
          >
            點數兌換
          </v-tab>
        </V-tabs>
      </VCardText>
    </VCard>
    <VCard class="sp-mt-4">
      <VCardText>
        <NuxtPage />
      </VCardText>
    </VCard>
  </div>
</template>

<script setup>
  const route = useRoute();
  const pointTabs = ref(route.name);
  const gotoTabs = function (route) {
    navigateTo(route);
  };
</script>
