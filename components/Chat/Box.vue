<template>
  <div class="box">
    <ChatModal @click="_storeChatBox.showChat = false" />
    <ChatBoxBtn @click="_storeChatBox.showChat = true" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { storeChatBox } from "@/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const { showChat } = storeToRefs(_storeChatBox);
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  right: 3%;
  bottom: 3%;
  z-index: 10;
}
</style>
