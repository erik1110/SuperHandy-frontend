<template>
  <Transition name="fade">
    <div
      v-if="!showChat"
      class="boxBtn sp-bg-purple sp-rounded-full sp-shadow-xl sp-cursor-pointer"
    >
      <v-badge :model-value="showBadge" class="dot" dot color="v-pink">
        <ChatBubbleOvalLeftEllipsisIcon
          class="sp-w-9 sp-h-9 sp-text-white sp-shadow-sm"
        />
      </v-badge>
    </div>
  </Transition>
</template>

<script setup>
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { storeChatBox } from "@/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const { showChat, showBadge } = storeToRefs(_storeChatBox);
</script>

<style lang="scss" scoped>
.boxBtn {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.1);
  }

  .dot {
    &:deep(.v-badge__badge) {
      position: absolute;
      top: 4px;
      left: 0px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s 0.3s ease-in-out;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
