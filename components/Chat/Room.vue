<template>
  <div class="room">
    <div class="room_head">
      <v-btn
        icon="mdi-arrow-left"
        @click="roomSmCard = false"
        variant="plain"
        size="x-small"
        class="mr-2 md:sp-hidden"
      ></v-btn>
      <div>
        <div
          class="sp-text-body-sm md:sp-text-caption sp-font-bold sp-flex sp-items-center sp-mb-1"
        >
          <v-chip
            class="mr-1"
            size="x-small"
            :color="
              _storeChatBox.nowRoom.role == '幫手'
                ? 'v-purple'
                : 'secondary-darken'
            "
          >
            <span class="sp-text-body-sm md:sp-text-caption">
              {{ _storeChatBox.nowRoom.role }}
            </span>
          </v-chip>
          <span
            class="sp-whitespace-nowrap sp-border-r sp-border-slate-400 sp-pr-2 sp-mr-2"
          >
            {{ _storeChatBox.nowRoom.name }}
          </span>
          <span class="room_task">
            {{ _storeChatBox.nowRoom.title }}
          </span>
        </div>
        <div
          class="roomCard_task sp-text-body-sm md:sp-text-caption sp-text-slate-400 sp-px-1"
        >
          任務編號：{{ _storeChatBox.nowRoom.no }}
        </div>
      </div>
    </div>
    <div class="room_content sp-flex-auto">
      <div class="room_bar room_bar_other">Hello</div>
      <div class="room_bar room_bar_me">
        Hello Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
        eveniet nisi quis minima! Velit officia voluptates reprehenderit, id
        quaerat aliquid.
      </div>
    </div>
    <div class="room_input sp-p-4 sp-flex-center">
      <input
        type="text"
        class="sp-bg-gray-bg sp-rounded-md sp-w-full sp-h-[40px] sp-mr-4 sp-px-2 sp-text-body-sm active:sp-outline-none focus:sp-outline-none"
      />
      <div class="sp-rounded-full sp-bg-primary-lighten sp-p-2">
        <PaperAirplaneIcon class="sp-icon-xs sp-text-purple -sp-rotate-45" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";
import { storeChatBox } from "~/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const roomSmCard = useState("roomSmCard");
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.room {
  @apply sp-flex sp-flex-col sp-justify-between sp-border-l sp-border-slate-100;
  @media (max-width: 768px) {
    height: calc(100% - 36px);
  }
  &_head {
    @apply sp-px-5 sp-py-3 sp-border-b sp-border-slate-100 sp-flex sp-items-center;
  }
  &_task {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    max-width: 220px;
  }
  &_content {
    @apply sp-min-h-[100px] sp-bg-slate-100 sp-flex sp-flex-col;
  }
  &_bar {
    @apply sp-w-fit sp-px-4 sp-py-2 sp-mx-4 sp-my-2 sp-text-slate-900 sp-whitespace-pre-line;
    font-size: 14px;
    &_other {
      @apply sp-bg-white sp-self-start;
      border-radius: 20px 20px 20px 1px;
    }
    &_me {
      @apply sp-bg-primary-lighten sp-self-end;
      border-radius: 20px 20px 1px 20px;
    }
  }
}
</style>
