<template>
  <div class="tabBar">
    <p class="sp-gray-placeholder sp-text-body-sm">共 456 則結果</p>
    <v-tabs
      color="v-purple"
      bg-color="v-gray-border"
      class="my-5 tabs"
      v-model="viewTab"
      hide-slider
      density="compact"
      selected-class="active_tab"
    >
      <NuxtLink to="/find-tasks/list">
        <v-tab value="list">列表模式</v-tab>
      </NuxtLink>
      <NuxtLink to="/find-tasks/map">
        <v-tab value="map">地圖模式</v-tab>
      </NuxtLink>
    </v-tabs>
  </div>
</template>

<script setup>
const viewTab = ref("");
const route = useRoute();
onMounted(() => {
  initView();
});
const initView = () => {
  if (route.path.includes("map")) {
    viewTab.value = "map";
  }
};
watch(viewTab, (val) => {
  const tabs = document.querySelector(".tabs");
  //   console.log({ val });
  if (val == "map") {
    tabs.classList.add("slide");
  } else {
    tabs.classList.remove("slide");
  }
});
</script>

<style lang="postcss" scoped>
.tabs {
  position: relative;
  max-width: 190px;
  border-radius: 24px;
  transition: all 250ms ease-in-out;
  margin-left: auto;
  &::before {
    content: "";
    width: 45%;
    background: #fff;
    height: 80%;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    transition: all 350ms ease-in-out;
    border-radius: $tab-border-radius;
  }
  &.slide::before {
    left: 75%;
  }
  &:deep(.v-tab) {
    color: #717171;
    .v-btn__overlay {
      background: none;
    }
    .v-ripple__container .v-ripple__animation {
      background: none;
    }
  }
}

.tabBar {
  @apply sp-mb-4 sm:sp-px-6 sp-px-3 sp-bg-white sp-rounded-2xl sp-flex sp-items-center;
}
</style>
