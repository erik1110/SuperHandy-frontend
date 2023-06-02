<template>
  <div class="sp-text-center">
    <div class="sp-w-full">付款成功!</div>
    <VBtn color="primary" class="sp-mt-4" @click="gotoAccountPointPage()"
      >確定</VBtn
    >
  </div>
</template>
<script setup>
  const gotoAccountPointPage = function () {
    navigateTo("/account/points");
  };
</script>
