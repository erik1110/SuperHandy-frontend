<template></template>
<script setup>
  import { getGoogleAccount } from "@/services/apis/auth";
  onMounted(() => {
    getGoogleAccount();
  });
  definePageMeta({
    layout: "none",
  });
</script>
