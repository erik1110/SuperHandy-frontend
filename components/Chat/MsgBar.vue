<template>
  <div
    class="sp-flex sp-items-end sp-px-3"
    :class="chatRole == 'me' ? 'sp-ml-auto' : ''"
  >
    <p
      v-if="chatRole == 'me'"
      class="sp-text-caption sp-pb-2 sp-text-slate-400 sp-whitespace-nowrap"
    >
      {{ msgTime }}
    </p>
    <div
      class="room_bar"
      :class="chatRole == 'other' ? 'room_bar_other' : 'room_bar_me'"
    >
      {{ chat.message }}
    </div>
    <p
      v-if="chatRole == 'other'"
      class="sp-text-caption sp-pb-2 sp-text-slate-400 sp-whitespace-nowrap"
    >
      {{ msgTime }}
    </p>
  </div>
</template>

<script setup>
import { storeChatBox } from "~/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const { timeFormat, timeDuration } = useMoment();
const props = defineProps({
  chat: Object,
});
const chatRole = computed(() => {
  if (props.chat.role == _storeChatBox.nowRoom.role) return "other";
  else return "me";
});
const msgTime = computed(() => {
  let t = props.chat.createdAt;
  if (!t) return;
  let duration = timeDuration(t);
  if (duration.asHours() < 24) {
    return timeFormat(t, "A hh:mm");
  } else {
    return timeFormat(t, "MM/DD A hh:mm");
  }
});
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");

.room {
  &_bar {
    @apply sp-w-fit sp-px-4 sp-py-2 sp-mx-1 sp-my-2 sp-text-slate-900 sp-whitespace-pre-line;
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
