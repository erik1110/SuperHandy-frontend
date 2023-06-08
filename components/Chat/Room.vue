<template>
  <!-- Modal Right - Individual Room -->
  <div v-if="Object.keys(_storeChatBox.nowRoom).length != 0" class="room">
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
            :color="
              _storeChatBox.nowRoom.role == 'helper'
                ? 'v-purple'
                : 'secondary-darken'
            "
          >
            <span class="sp-text-body-sm md:sp-text-caption">
              {{ roleToDisplayRole(_storeChatBox.nowRoom.role) }}
            </span>
          </v-chip>
          <span
            class="sp-whitespace-nowrap sp-border-r sp-border-slate-400 sp-pr-2 sp-mr-2"
          >
            {{
              _storeChatBox.nowRoom.nickname ||
              `${_storeChatBox.nowRoom.lastName}${_storeChatBox.nowRoom.firstName}`
            }}
          </span>
          <span class="room_task">
            {{ _storeChatBox.nowRoom.title }}
          </span>
        </div>
        <div
          class="roomCard_task sp-text-body-sm md:sp-text-caption sp-text-slate-400 sp-px-1"
        >
          任務編號：{{ _storeChatBox.nowRoom.taskId }}
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
const { nowRoomChatList } = storeToRefs(_storeChatBox);
const roomMobileView = useState("roomMobileView");

const roomContent = ref(null);
const msgText = ref(null);

// 滾動到最新訊息
watch([() => _storeChatBox.nowRoom, roomContent], ([room, content]) => {
  if (!!(room.taskId && content)) {
    // console.log(content.clientHeight);
    // console.log(content.scrollHeight);
    if (content.clientHeight < content.scrollHeight) {
      content.scrollTop = content.scrollHeight;
    }
  }
});
// Todo: 新增訊息時要滑到最下面
const scollToBottom = (content) => {};

// 傳送訊息
const sendMsg = () => {
  if (msgText.value) {
    _storeChatBox.sendWsMsg(_storeChatBox.nowRoom.taskId, msgText.value);
  }
  msgText.value = "";
};
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
    overflow-x: auto;
  }
}
.emptyRoom {
  @apply sp-bg-slate-50;
}
</style>
