<template>
  <v-layout class="sp-min-h-screen">
    <Navbar />
    <div class="sp-mt-[48px] sp-w-full sp-flex">
      <div class="sp-flex sp-flex-col sp-p-4 sp-border-r-2 sp-border-balck">
        <NuxtLink class="sp-pb-2" to="/account">我的帳號</NuxtLink>
        <NuxtLink class="sp-pb-2" to="/account/tasks">任務管理</NuxtLink>
        <NuxtLink class="sp-pb-2" to="/account/comments">評價查看</NuxtLink>
        <NuxtLink to="/account/points">點數管理</NuxtLink>
      </div>
      <div class="sp-flex-1">
        <Breadcrumbs />
        <slot />
      </div>
    </div>
  </v-layout>
  <Footer />
</template>

<script setup></script>

<style scoped lang="scss">
  .router-link-exact-active {
    color: #b7eeee;
  }
</style>
