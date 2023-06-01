<template>
  <div class="roomList">
    <ChatRoomCard v-for="r in rooms" :key="r.id" :room="r" />
  </div>
</template>

<script setup>
import { storeChatBox } from "~/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const rooms = ref([
  {
    id: 1,
    no: "1001",
    title: "幫我買拖鞋",
    name: "王小華",
    imgUrl: "https://source.unsplash.com/random/100x100/?person",
    role: "案主",
    updatedAt: new Date(),
  },
  {
    id: 2,
    no: "1002",
    title: "籃球助教",
    name: "葛先生",
    imgUrl: "https://source.unsplash.com/random/200x200/?person",
    role: "幫手",
    updatedAt: new Date(),
  },
  {
    id: 3,
    no: "1003",
    title: "幫忙整理肉品，製作寵物鮮食",
    name: "胡小姐",
    imgUrl: "https://source.unsplash.com/random/150x150/?person",
    role: "案主",
    updatedAt: new Date(),
  },
  {
    id: 4,
    no: "1004",
    title: "微積分解題",
    name: "羅先生",
    imgUrl: "https://source.unsplash.com/random/120x120/?person",
    role: "案主",
    updatedAt: new Date(),
  },
]);
onMounted(() => {
  _storeChatBox.nowRoom = rooms.value[0];
});
</script>

<style lang="scss" scoped>
@import url("@/assets/css/tailwind.css");
.roomList {
  //   @apply sp-bg-slate-100;
  overflow-x: auto;
}
</style>
