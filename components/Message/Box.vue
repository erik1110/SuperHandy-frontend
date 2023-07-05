<template>
  <div class="sp-fixed sp-top-[64px] sp-left-[10px] sp-flex sp-flex-col">
    <VCard
      class="sp-mb-4 sp-max-w-[200px] sp-z-10"
      v-for="(item, index) in notificationMessage"
      :key="index"
    >
      <VCardTitle>您有新的通知</VCardTitle>
      <VCardText>{{ item }}</VCardText>
    </VCard>
  </div>
</template>
<script setup>
  import { storeToRefs } from "pinia";
  import { storeChatBox } from "@/stores/storeChatBox";
  const _storeChatBox = storeChatBox();
  const { notificationMessage } = storeToRefs(_storeChatBox);
</script>
