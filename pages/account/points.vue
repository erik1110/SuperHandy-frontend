<template>
  <div class="sp-space-y-6">
    <!-- <div class="sp-card-wrapper sp-bg-white sp-p-4">
      <v-tabs v-model="pointTabs" color="purple" :direction="direction">
        <v-tab value="account-points" @click="gotoTabs('/account/points/')">
          點數詳情
        </v-tab>
        <v-tab value="account-points-history" @click="gotoTabs('/account/points/history')">
          點數歷史
        </v-tab>
        <v-tab value="account-points-exchange" @click="gotoTabs('/account/points/exchange')">
          點數兌換
        </v-tab>
      </v-tabs>
    </div> -->
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
// import { useDisplay } from 'vuetify'
// const pointTabs = ref('');
// const gotoTabs = function (route) {
//   navigateTo(route);
// };

// const { smAndUp } = useDisplay();
// const direction = ref('');
// watch(smAndUp, (val) => {
//   direction.value = val ? 'horizontal' : 'vertical';
// }, { immediate: true });

// onMounted(() => {
//   const route = useRoute()
//   pointTabs.value = route.name
// })
</script>
