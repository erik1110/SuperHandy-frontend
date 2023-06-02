<template>
  <v-row v-if="showChat" class="md:sp-hidden" justify="center">
    <v-dialog
      class="md:sp-hidden"
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card>
        <div class="chatModal_head">
          <v-icon
            @click="_storeChatBox.showChat = false"
            class="ml-auto sp-cursor-pointer"
            color="#fff"
            >mdi-minus</v-icon
          >
        </div>
        <Transition name="fade">
          <v-list v-if="!roomSmCard" lines="two" subheader>
            <ChatRoomList />
          </v-list>
        </Transition>

        <Transition name="slideLeft">
          <!-- <v-list v-if="roomSmCard" lines="two" subheader> -->
          <ChatRoom v-if="roomSmCard" />
          <!-- </v-list> -->
        </Transition>
      </v-card>
    </v-dialog>
  </v-row>
  <Transition name="expand">
    <div
      v-if="showChat"
      class="sp-hidden md:sp-block sp-card-wrapper chatModal sp-w-[100vw] sp-h-[100vh] md:sp-w-[600px] md:sp-h-[500px]"
    >
      <div class="chatModal_head">
        <v-icon
          @click="_storeChatBox.showChat = false"
          class="ml-auto sp-cursor-pointer"
          color="#fff"
          >mdi-minus</v-icon
        >
      </div>
      <div class="sp-flex chatModal_content">
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
const dialog = true;
const roomSmCard = useState("roomSmCard", () => ref(false));
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.chatModal {
  @apply sp-bg-white sp-absolute sp-right-0 sp-bottom-0 sp-z-20  sp-overflow-hidden;
  &_head {
    @apply sp-bg-purple sp-w-full sp-h-[36px] sp-flex sp-px-4 sp-items-center;
  }
  &_content {
    height: calc(100% - 36px);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: transform 0.3s 0.1s ease-in-out;
  transform: translateX(0);

  opacity: 1;
}
.slideLeft-enter-from,
.slideLeft-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
