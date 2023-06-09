<template>
  <v-app-bar class="sp-mb-4" density="comfortable" color="white">
    <template v-slot:prepend>
      <NuxtLink class="sp-inline-flex" to="/">
        <div class="logo"></div>
      </NuxtLink>
    </template>

    <template v-slot:append>
      <div class="sp-hidden md:sp-flex sp-w-[220px] sp-py-2 sp-mr-1">
        <v-text-field v-model="_storeFindTasks.keyword" label="搜尋任務" append-inner-icon="mdi-magnify" density="compact"
          hide-details single-line clearable @keyup.enter="searchSubmit"
          @click:append-inner="searchSubmit"></v-text-field>
      </div>

      <NuxtLink class="sp-hidden md:sp-inline-grid" to="/find-tasks/list">
        <v-btn>找任務</v-btn>
      </NuxtLink>
      <NuxtLink class="sp-hidden md:sp-inline-grid" to="/post-task/-1">
        <v-btn>刊登任務</v-btn>
      </NuxtLink>
      <v-btn v-if="_storeAuth.loginToken" icon size="small">
        <v-badge :model-value="isHasUnRead" color="error" dot>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
        <v-menu :close-on-content-click="false" activator="parent" width="300" max-height="400"
          @update:modelValue="noticeMenuUpdate">
          <Notifications />
        </v-menu>
      </v-btn>
      <v-btn v-if="_storeAuth.loginToken" icon>
        <AccountIcon></AccountIcon>
        <v-menu activator="parent">
          <v-list>
            <NuxtLink v-for="(item, index) in items" :key="index" :value="index" :to="item.to">
              <v-list-item>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </NuxtLink>
            <v-list-item @click="logout">
              <v-list-item-title>登出</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
      <div v-if="_storeAuth.loginToken" class="sp-inline-grid md:sp-hidden">
        <v-btn icon>
          <v-icon>mdi-menu</v-icon>
          <v-menu activator="parent">
            <v-list>
              <NuxtLink v-for="(item, index) in humburgerItems" :key="index" :value="index" :to="item.to">
                <v-list-item>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </NuxtLink>
            </v-list>
          </v-menu>
        </v-btn>
      </div>

      <NuxtLink v-else to="/auth/login">
        <v-btn>登入</v-btn>
      </NuxtLink>
    </template>
  </v-app-bar>
</template>
<script setup>
  import { storeToRefs } from "pinia";
  import { siteConfig } from "@/services/siteConfig";
  import { storeNotification } from "@/stores/storeNotification";
  import { storeAuth } from "@/stores/storeAuth";
  import { storeFindTasks } from "@/stores/storeFindTasks";
  const _storeFindTasks = storeFindTasks();

  const route = useRoute();
  // Search
  const searchSubmit = async () => {
    if (!route.path.includes("find-tasks")) {
      await navigateTo("/find-tasks/list");
    }
    if (route.path.includes("list")) {
      await _storeFindTasks.fetchListViewTasks();
    } else if (route.path.includes("map")) {
      await _storeFindTasks.fetchMapViewTasks();
    }
  };
  // Account Menu Data
  const items = [
    { title: "我的帳號", to: "/account" },
    { title: "任務管理", to: "/account/tasks/poster" },
    { title: "評價查看", to: "/account/comments/poster" },
    { title: "點數管理", to: "/account/points" },
    // { title: "登出", to: "/auth/login" },
  ];
  const humburgerItems = [
    { title: "尋找任務", to: "/find-tasks/list" },
    { title: "刊登任務", to: "/post-task/-1" },
  ];
  // Auth
  const _storeAuth = storeAuth();

  const logout = () => {
    _storeAuth.setLoginToken("");
    navigateTo("/auth/login");
  };

  const noticeMenuUpdate = (event) => {
    _storeNotification.noticeIsOpen = event;
    if (event) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  };

  // 系統通知
  const _storeNotification = storeNotification();
  const { isHasUnRead } = storeToRefs(_storeNotification);
  const { logInfo } = useLog();
  const { hasUnRead } = storeNotification();
  const { checkIsLogin } = useSpUtility();
  let aNotiIntervalFun = null;
  onMounted(() => {
    if (checkIsLogin()) {
      hasUnRead();
      if (siteConfig.notification.isOpen) {
        logInfo(
          "notification intervalFun start...",
          siteConfig.notification.intervalTime
        );
        aNotiIntervalFun = setInterval(
          hasUnRead,
          siteConfig.notification.intervalTime
        );
      }
    }
  });

  onUnmounted(() => {
    if (aNotiIntervalFun) {
      clearInterval(aNotiIntervalFun);
      logInfo("notification intervalFun cancel");
    }
  });
</script>

<style scoped></style>
