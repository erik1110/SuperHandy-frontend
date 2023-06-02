<template>
  <div class="sp-text-center">
    <div class="sp-w-full">
      {{ status == "cancel" ? "付款已取消" : "付款已成功" }}
    </div>
    <VBtn color="primary" class="sp-mt-4" @click="gotoAccountPointPage()"
      >確定</VBtn
    >
  </div>
</template>
<script setup>
  const route = useRoute();
  const { status } = route.query;
  const gotoAccountPointPage = function () {
    navigateTo("/account/points");
  };
</script>
