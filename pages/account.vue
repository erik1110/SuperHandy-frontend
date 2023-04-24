<template>
  <div>
    <h1>會員</h1>
    <div class="sp-flex sp-gap-4 sp-my-4">
      <NuxtLink to="/account"><v-btn color="primary">我的帳號</v-btn></NuxtLink>
      <NuxtLink to="/account/tasks"><v-btn color="primary">任務管理</v-btn></NuxtLink>
      <NuxtLink to="/account/comments"><v-btn color="primary">評價查看</v-btn></NuxtLink>
      <NuxtLink to="/account/points"><v-btn color="primary">點數管理</v-btn></NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>