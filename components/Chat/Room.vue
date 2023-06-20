<template>
  <!-- Modal Right - Individual Room -->
  <div v-if="Object.keys(nowRoom).length != 0 && !roomLoading" class="room">
    <div class="room_head">
      <v-btn
        icon="mdi-arrow-left"
        @click="roomMobileView = false"
        variant="plain"
        size="x-small"
        class="mr-2 md:sp-hidden"
      ></v-btn>
      <div>
        <div
          class="sp-text-body-sm md:sp-text-caption sp-font-bold md:sp-font-bold sp-flex sp-items-center sp-mb-1"
        >
          <v-chip
            class="mr-1"
            size="x-small"
            :color="nowRoom.role == 'helper' ? 'v-purple' : 'secondary-darken'"
          >
            <span class="sp-text-body-sm md:sp-text-caption">
              {{ roleToDisplayRole(nowRoom.role) }}
            </span>
          </v-chip>
          <span
            class="sp-whitespace-nowrap sp-border-r sp-border-slate-400 sp-pr-2 sp-mr-2"
          >
            {{ nowRoom.nickname || `${nowRoom.lastName}${nowRoom.firstName}` }}
          </span>
          <span class="room_task">
            {{ nowRoom.title }}
          </span>
        </div>
        <div
          class="roomCard_task sp-text-body-sm md:sp-text-caption sp-text-slate-400 sp-px-1"
        >
          任務編號：{{ nowRoom.taskId }}
        </div>
      </div>
    </div>
    <div ref="roomContent" class="room_content sp-flex-auto">
      <ChatMsgBar
        v-for="chat in nowRoomChatList"
        :key="chat._id"
        :chat="chat"
      />
    </div>
    <div class="room_input sp-p-4 sp-flex-center">
      <input
        v-model="msgText"
        type="text"
        class="sp-bg-gray-bg sp-rounded-md sp-w-full sp-h-[40px] sp-mr-4 sp-px-2 sp-text-body-sm active:sp-outline-none focus:sp-outline-none"
        @keypress.enter="sendMsg"
      />
      <div
        class="sp-rounded-full sp-cursor-pointer sp-bg-primary-lighten sp-p-2"
      >
        <PaperAirplaneIcon
          @click="sendMsg"
          class="sp-icon-xs sp-text-purple -sp-rotate-45"
        />
      </div>
    </div>
  </div>
  <div v-else-if="roomLoading" class="emptyRoom sp-flex-center">
    <v-progress-circular
      color="secondary-darken"
      indeterminate
    ></v-progress-circular>
  </div>
  <div v-else class="emptyRoom sp-flex-center">
    <ChatBubbleLeftRightIcon class="sp-icon-lg sp-text-slate-300" />
  </div>
</template>

<script setup>
import {
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/vue/24/solid";
import { storeChatBox } from "~/stores/storeChatBox";
import { useHelper } from "~/composables/useHelper";
import { storeToRefs } from "pinia";

const { roleToDisplayRole } = useHelper();

const _storeChatBox = storeChatBox();
const { roomLoading, nowRoomChatList, nowRoom } = storeToRefs(_storeChatBox);
const roomMobileView = useState("roomMobileView");

const roomContent = ref(null);
const msgText = ref(null);

// 滾動到最新訊息
watch([nowRoom, roomContent], ([room, content]) => {
  if (!!(room.taskId && content)) {
    _storeChatBox.scrollToBottom(content);
  }
});

// 傳送訊息
const sendMsg = () => {
  if (msgText.value) {
    _storeChatBox.sendWsMsg(nowRoom.value.taskId, msgText.value);
  }
  msgText.value = "";
};
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.room {
  @apply sp-flex sp-flex-col sp-justify-between sp-border-l sp-border-slate-100;

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
    overflow-x: auto;
  }
}
.emptyRoom {
  @apply sp-bg-slate-50;
}
.room,
.emptyRoom {
  @media (max-width: 768px) {
    height: calc(100% - 36px);
  }
}
</style>
