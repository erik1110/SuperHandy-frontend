<template>
  <!-- Modal Left - All Rooms -->
  <div class="roomList">
    <ChatRoomCard v-for="r in roomList" :key="r.id" :room="r" />
    <v-overlay
      v-model="isShowLoading"
      contained
      class="align-center justify-center"
    >
      <v-progress-circular
        color="secondary-darken"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { storeChatBox } from "~/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const { roomList, roomListLoading, roomLoading } = storeToRefs(_storeChatBox);
onMounted(() => {});
const isShowLoading = computed(() => {
  const { name } = useDisplay();
  if (name.value == "xs" || name.value == "sm") {
    return roomListLoading.value || roomLoading.value;
  } else {
    return roomListLoading.value;
  }
});
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.roomList {
  //   @apply sp-bg-slate-100;
  overflow-x: auto;
}
</style>
