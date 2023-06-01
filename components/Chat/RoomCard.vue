<template>
  <div
    @click="_storeChatBox.nowRoom = room"
    class="roomCard active:sp-bg-slate-200"
    :class="
      isOpen &&
      'sp-bg-white sp-shadow-sm sp-border-l-8 sp-border-l-primary-lighten '
    "
  >
    <v-avatar class="mr-2" size="32">
      <v-img :src="room.imgUrl" alt="John"></v-img>
    </v-avatar>
    <div class="sp-flex-auto mr-2">
      <div class="sp-text-caption sp-font-bold sp-flex sp-items-center sp-mb-1">
        <v-chip
          class="mr-1"
          size="x-small"
          :color="room.role == '幫手' ? 'v-purple' : 'secondary-darken'"
        >
          <span style="font-size: 10px">
            {{ room.role }}
          </span>
        </v-chip>
        {{ room.name }}
      </div>
      <div class="roomCard_task sp-text-caption sp-text-slate-600 sp-px-1">
        {{ room.title }}
      </div>
    </div>
    <div
      class="sp-flex sp-flex-col sp-min-h-[48px] sp-max-h-[54px] sp-justify-between sp-items-center"
    >
      <div class="sp-text-caption sp-text-slate-400 sp-whitespace-nowrap">
        8:00 pm
      </div>
      <div>
        <v-badge color="v-purple" inline>
          <template #badge>
            <span class="sp-text-caption"> 7 </span>
          </template>
        </v-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeChatBox } from "~/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const props = defineProps({
  room: Object,
});
const isOpen = computed(() => {
  if (_storeChatBox.nowRoom?.id == props.room.id) return true;
  else return false;
});
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.roomCard {
  @apply sp-border-b sp-border-slate-200 sp-px-2 sp-py-3 sp-flex sp-justify-between sp-transition-all sp-cursor-pointer;
  &_task {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
