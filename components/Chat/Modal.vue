<template>
  <Transition name="expand">
    <div v-if="showChat" class="sp-card-wrapper chatModal">
      <div class="head">
        <v-icon
          @click="_storeChatBox.showChat = false"
          class="ml-auto sp-cursor-pointer"
          color="#fff"
          >mdi-minus</v-icon
        >
      </div>
      <div class="sp-flex content">
        <ChatRoomList class="sp-basis-2/5" />
        <ChatRoom class="sp-basis-3/5" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { storeChatBox } from "@/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const { showChat } = storeToRefs(_storeChatBox);
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.chatModal {
  @apply sp-bg-white sp-absolute sp-right-0 sp-bottom-0 sp-z-20 sp-w-[600px] sp-h-[500px] sp-overflow-hidden;
  .head {
    @apply sp-bg-purple sp-w-full sp-h-[30px] sp-flex sp-px-4 sp-items-center;
  }
  .content {
    height: calc(100% - 30px);
  }
}
.expand-enter-active,
.expand-leave-active {
  transition: width 0.5s ease-in-out, height 0.5s ease-in-out,
    opacity 0.3s ease-in-out;
  //   width: 500px;
  //   height: 360px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
