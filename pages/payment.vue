<template>
  <div class="sp-text-center">
    <div class="sp-w-full">付款成功!</div>
    <VBtn color="primary" class="sp-mt-4" @click="closeLinePayPaymentModal"
      >確定</VBtn
    >
  </div>
</template>
<script setup>
  definePageMeta({
    layout: "account",
  });
  const closeLinePayPaymentModal = function () {
    window.top.postMessage("closeLinePayModal");
  };
</script>
