<template>
  <Transition name="expand">
    <div v-if="showChat" class="sp-card-wrapper chatModal">
      <div class="roomList"></div>
      <div class="room">
        <div class="head">
          <v-avatar class="mr-2">
            <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
        </div>
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
  @apply sp-bg-white sp-absolute sp-right-0 sp-bottom-0 sp-z-20 sp-flex sp-w-[500px] sp-h-[300px] sp-overflow-hidden;
  .roomList {
    @apply sp-bg-pink-200 sp-flex-auto;
  }
  .room {
    @apply sp-flex-auto;
    .head {
      @apply sp-px-5 sp-py-3 sp-border-b sp-border-slate-200;
    }
  }
}
.expand-enter-active,
.expand-leave-active {
  transition: width 0.5s ease-in-out, height 0.5s ease-in-out,
    opacity 0.3s ease-in-out;
  width: 500px;
  height: 300px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
