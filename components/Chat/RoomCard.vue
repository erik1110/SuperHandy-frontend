<template>
  <!-- Modal Left - room card component -->
  <div
    @click="openRoom"
    class="roomCard active:sp-bg-slate-200"
    :class="
      isOpen &&
      'sp-bg-white sp-shadow-sm md:sp-border-l-8 sp-border-l-primary-lighten '
    "
  >
    <v-avatar class="mr-4" size="32">
      <v-img :src="room.avatarPath" cover></v-img>
    </v-avatar>
    <div class="sp-flex-initial mr-2">
      <div
        class="sp-text-body-sm md:sp-text-caption md:sp-font-bold sp-font-bold sp-flex sp-items-center sp-mb-1"
      >
        <v-chip
          class="mr-1"
          size="x-small"
          :color="room.role == 'helper' ? 'v-purple' : 'secondary-darken'"
        >
          <span style="font-size: 10px">
            {{ roleToDisplayRole(room.role) }}
          </span>
        </v-chip>
        <p>{{ room.nickname || `${room.lastName}${room.firstName}` }}</p>
      </div>
      <span
        class="sp-text-body-sm sp-font-bold md:sp-text-caption md:sp-font-bold roomCard_title"
      >
        {{ room.title }}
      </span>
      <div
        class="roomCard_task sp-text-body-sm md:sp-text-caption sp-text-slate-600"
      >
        {{ room.lastMessage }}
      </div>
    </div>
    <div
      class="sp-flex sp-flex-col sp-min-h-[48px] sp-max-h-[54px] sp-justify-between sp-items-center sp-ml-auto"
    >
      <div
        class="sp-text-body-sm md:sp-text-caption sp-text-slate-400 sp-whitespace-nowrap"
      >
        {{ lasMsgTime }}
      </div>
      <div v-if="room.unreadCount != 0">
        <v-badge color="v-purple" inline>
          <template #badge>
            <span class="sp-text-caption"> {{ room.unreadCount }} </span>
          </template>
        </v-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeChatBox } from "~/stores/storeChatBox";
import { useMoment } from "~/composables/useMoment";
import { useHelper } from "~/composables/useHelper";

const _storeChatBox = storeChatBox();
const { timeFormat, timeDuration } = useMoment();
const { roleToDisplayRole } = useHelper();
const props = defineProps({
  room: Object,
});

const roomMobileView = useState("roomMobileView");
const displayRole = computed(() => {
  if (props.room.role == "helper") return "幫手";
  else if (props.room.role == "poster") return "案主";
});
const lasMsgTime = computed(() => {
  if (!props.room.updatedAt) return;
  let duration = timeDuration(props.room.updatedAt);
  if (duration.asHours() < 24) {
    return timeFormat(props.room.updatedAt, "A hh:mm");
  } else {
    return timeFormat(props.room.updatedAt, "MM/DD");
  }
});
// 判斷聊天室房間是否開啟
const isOpen = computed(() => {
  if (_storeChatBox.nowRoom?.taskId == props.room.taskId) return true;
  else return false;
});
// 開啟聊天室房間
const openRoom = async () => {
  console.log("openRoom");
  // 獲得個別聊天歷史訊息
  await _storeChatBox.fetchRoomHistory(props.room.taskId);
  // 選擇要顯示的房間
  _storeChatBox.nowRoom = props.room;
  roomMobileView.value = true;
  // 開啟後，所有訊息設為已讀
  let lastMsg =
    _storeChatBox.nowRoomChatList[_storeChatBox.nowRoomChatList.length - 1];
  if (!lastMsg) return;
  _storeChatBox.setRoomRead(lastMsg.taskId, lastMsg._id);
  let presentRoom = _storeChatBox.roomList.find(
    (room) => room.taskId == lastMsg.taskId
  );
  presentRoom.unreadCount = 0;
};
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.roomCard {
  @apply sp-border-b sp-border-slate-200 sp-px-2 sp-py-3 sp-flex  sp-transition-all sp-cursor-pointer;
  &_task {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  &_title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
