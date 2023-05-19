<template>
  <div class="sp-h-full">
    <div class="sp-flex sp-px-5 sp-pb-12">
      <div
        class="sp-border-l-[12px] sp-border-secondary sp-text-primary sp-pl-4"
      >
        <h1 class="sp-text-h2">找任務</h1>
        <p>各項任務由你大展身手！</p>
        <p>超人幫手限時推薦👏</p>
      </div>
    </div>
    <div class="sp-bg-gray-bg sp-h-full sp-pt-4 sp-flex">
      <div>
        <div class="filter">Filter</div>
      </div>
      <div class="sp-flex-auto sp-ml-2 sp-mr-4">
        <div class="tabBar">
          <p class="sp-gray-placeholder sp-text-body-sm">共 456 則結果</p>
          <v-tabs
            color="v-purple"
            bg-color="v-gray-border"
            class="my-5 tabs"
            v-model="viewTab"
            hide-slider
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
        <NuxtPage />
      </div>
    </div>
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
  console.log({ val });
  if (val == "map") {
    tabs.classList.add("slide");
  } else {
    tabs.classList.remove("slide");
  }
});
</script>
<style lang="postcss" scoped>
.filter {
  @apply sp-w-[300px] sp-h-[350px] sp-ml-4 sp-mr-2 sp-px-6 sp-bg-white sp-rounded-2xl;
}
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
    transition: all 250ms ease-in-out;
    border-radius: $tab-border-radius;
  }
  &.slide::before {
    left: 75%;
  }
}
.tabBar {
  @apply sp-mb-4 sp-px-6 sp-bg-white sp-rounded-2xl sp-flex sp-items-center;
}
</style>
