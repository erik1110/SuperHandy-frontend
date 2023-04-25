<template>
  <!-- <nav style="background-color: lightblue;">Logo</nav> -->
  <v-app-bar :elevation="2" class="sp-mb-4" density="compact" color="primary">
    <template v-slot:prepend>
      <v-icon>mdi-star-face</v-icon>
      <h1 class="sp-italic sp-text-3xl">SuperHandy</h1>
    </template>
    <template v-slot:append>
      <NuxtLink to="/find-tasks/list">
        <v-btn>找任務</v-btn>
      </NuxtLink>
      <NuxtLink to="/post-task/-1">
        <v-btn>刊登任務</v-btn>
      </NuxtLink>
      <!-- <NuxtLink to="/account"> -->
      <v-btn icon><v-icon>mdi-account-circle</v-icon>
        <v-menu activator="parent">
          <v-list>
            <NuxtLink v-for="(item, index) in items" :key="index" :value="index" :to="item.to">
              <v-list-item>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </NuxtLink>
          </v-list>
        </v-menu>
      </v-btn>
      <!-- </NuxtLink> -->
    </template>
  </v-app-bar>
</template>
<script setup>
const items = useState(() => [
  { title: '登入', to: '/login' },
  { title: '我的帳號', to: '/account' },
  { title: '任務管理', to: '/account/tasks' },
  { title: '評價查看', to: '/account/comments' },
  { title: '點數管理', to: '/account/points' },
])
</script>
