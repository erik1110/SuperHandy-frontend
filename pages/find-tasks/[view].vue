<template>
  <div>
    <h1>找任務</h1>
    <v-tabs color="secondary" class="my-5" v-model="view">
      <NuxtLink to="/find-tasks/list"
        ><v-tab value="list">列表模式</v-tab></NuxtLink
      >
      <NuxtLink to="/find-tasks/map"
        ><v-tab value="map">地圖模式</v-tab></NuxtLink
      >
    </v-tabs>
    <h2 v-if="view === 'list'">列表模式</h2>
    <h2 v-if="view === 'map'">地圖模式</h2>
  </div>
</template>

<script setup>
  const route = useRoute();
  const view = route.params.view;
  onMounted(() => {
    if (view !== "list" && view !== "map") {
      navigateTo("/find-tasks/list");
    }
  });
</script>

<style lang="scss" scoped></style>
