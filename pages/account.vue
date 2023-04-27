<template>
  <div>
    <h1>會員</h1>
    <div class="sp-flex sp-gap-4 sp-my-4">
      <NuxtLink to="/account"><v-btn>我的帳號</v-btn></NuxtLink>
      <NuxtLink to="/account/tasks"><v-btn>任務管理</v-btn></NuxtLink>
      <NuxtLink to="/account/comments"><v-btn>評價查看</v-btn></NuxtLink>
      <NuxtLink to="/account/points"><v-btn>點數管理</v-btn></NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>