<template>
  <v-layout class="sp-min-h-screen">
    <Navbar />
    <div class="sp-mt-[48px] sp-w-full sp-flex sp-bg-[#F3F3F3]">
      <div class="sp-hidden md:sp-flex sp-shrink-0 sp-ml-4 sp-my-4">
        <div class="sp-card-wrapper sp-bg-white sp-min-w-[200px]">
          <VCardText class="sp-flex sp-flex-col sp-p-4 sp-h-[100%]">
            <NuxtLink
              class="account sp-mb-4 sp-py-2 sp-px-4 sp-flex sp-items-center sp-z-0"
              :class="{ active: activeRouter == 'account' }"
              to="/account"
            >
              <UserCircleIcon class="sp-icon-sm sidebar_icon" />
              <span class="sidebar_text">我的帳號</span>
            </NuxtLink>
            <NuxtLink
              class="sp-mb-4 sp-py-2 sp-px-4 sp-flex sp-items-center sp-z-0"
              :class="{ active: activeRouter == 'task' }"
              to="/account/tasks/poster"
            >
              <DocumentDuplicateIcon class="sp-icon-sm sidebar_icon" />
              <span class="sidebar_text">任務管理</span>
            </NuxtLink>
            <NuxtLink
              class="sp-mb-4 sp-py-2 sp-px-4 sp-flex sp-items-center sp-z-0"
              :class="{ active: activeRouter == 'comment' }"
              to="/account/comments/poster"
            >
              <StarIcon class="sp-icon-sm sidebar_icon" />
              <span class="sidebar_text">評價查看</span>
            </NuxtLink>
            <NuxtLink
              class="sp-flex sp-py-2 sp-px-4 sp-items-center sp-z-0"
              :class="{ active: activeRouter == 'point' }"
              to="/account/points"
            >
              <CurrencyDollarIcon class="sp-icon-sm sidebar_icon" />
              <span class="sidebar_text">點數管理</span>
            </NuxtLink>
          </VCardText>
        </div>
      </div>
      <div class="sp-flex-1 sm:sp-mx-4 sp-mt-4 sp-overflow-hidden">
        <div class="sp-h-[100%]">
          <PostTaskOverlay />
          <div :class="{ 'sp-hidden': isOpen }">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </v-layout>
  <Footer />
</template>

<script setup>
import {
  UserCircleIcon,
  DocumentDuplicateIcon,
  StarIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/solid";
const route = useRoute();
const activeRouter = ref("account");
import { storeToRefs } from "pinia";
import { storeFullOverlay } from "~/stores/storeFullOverlay";
const _storeFullOverlay = storeFullOverlay();
const { isOpen } = storeToRefs(_storeFullOverlay);
const FuncCheckTabs = function (val) {
  if (val == "/account") {
    activeRouter.value = "account";
  } else if (val.startsWith("/account/tasks")) {
    activeRouter.value = "task";
  } else if (val.startsWith("/account/comments")) {
    activeRouter.value = "comment";
  } else if (val.startsWith("/account/messages")) {
    activeRouter.value = "message";
  } else if (val.startsWith("/account/points")) {
    activeRouter.value = "point";
  }
};
watch(
  () => route.path,
  (val) => {
    FuncCheckTabs(val);
  }
);
FuncCheckTabs(route.path);
</script>

<style scoped lang="scss">
.sidebar-icon {
  display: inline-block;
  margin-right: 10px;
  width: 20px;
  height: 20px;
}
</style>
<style scoped lang="postcss">
@import url("@/assets/css/tailwind.css");
.active {
  position: relative;
  &:before {
    content: "";
    @apply sp-absolute sp-w-full sp-h-full sp-left-0 sp-bg-secondary sp-rounded-lg sp-opacity-20;
  }
  .sidebar_text {
    @apply sp-z-10 sp-text-secondary-darken;
  }
  .sidebar_icon {
    @apply sp-z-10 sp-text-secondary-darken;
  }
}
.sidebar {
  &_text {
    @apply sp-text-slate-700 sp-font-bold;
  }
  &_icon {
    @apply sp-text-slate-700 sp-mr-2;
  }
}
</style>
