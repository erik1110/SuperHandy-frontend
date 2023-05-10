<template>
  <v-app-bar class="sp-mb-4" density="compact" color="white">
    <template v-slot:prepend>
      <NuxtLink class="sp-inline-flex" to="/">
        <div class="logo"></div>
      </NuxtLink>
    </template>
    <template v-slot:append>
      <NuxtLink to="/find-tasks/list">
        <v-btn>找任務</v-btn>
      </NuxtLink>
      <NuxtLink to="/post-task">
        <v-btn>刊登任務</v-btn>
      </NuxtLink>
      <v-btn v-if="_storeAuth.loginToken" icon size="small"><v-icon>mdi-bell</v-icon>
        <!-- <v-menu activator="parent">
          <v-list>
            <NuxtLink v-for="(item, index) in items" :key="index" :value="index" :to="item.to">
              <v-list-item>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </NuxtLink>
          </v-list>
        </v-menu> -->
      </v-btn>
      <v-btn v-if="_storeAuth.loginToken" icon><v-icon>mdi-account-circle</v-icon>
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
      <NuxtLink v-else to="/auth/login">
        <v-btn>登入</v-btn>
      </NuxtLink>
    </template>
  </v-app-bar>
</template>
<script setup>
// Account Menu Data
const items = [
  { title: "我的帳號", to: "/account" },
  { title: "任務管理", to: "/account/tasks" },
  { title: "評價查看", to: "/account/comments" },
  { title: "點數管理", to: "/account/points" },
  // { title: "登出", to: "/auth/login" },
];
// Auth
import { storeAuth } from "@/stores/storeAuth";
const _storeAuth = storeAuth();

const logout = () => {
  _storeAuth.setLoginToken("")
  navigateTo('/auth/login')
}

</script>
<style scoped>
.logo,
.logo::after {
  position: relative;
  width: 120px;
  min-height: 48px;
  top: 0;
  left: 0;
}

.logo::after {
  content: '';
  position: absolute;
  background-image: url('@/assets/images/logo.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>