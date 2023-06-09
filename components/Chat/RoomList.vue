<template>
  <!-- Modal Left - All Rooms -->
  <div class="roomList">
    <ChatRoomCard v-for="r in roomList" :key="r.id" :room="r" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { storeChatBox } from "~/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const { roomList } = storeToRefs(_storeChatBox);
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.roomList {
  //   @apply sp-bg-slate-100;
  overflow-x: auto;
}
</style>
