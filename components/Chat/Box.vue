<template>
  <!-- Modal + Open Btn -->
  <div class="box">
    <ChatModal />
    <ChatBoxBtn @click="_storeChatBox.showChat = true" />
    {{ connected }}
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { storeChatBox } from "@/stores/storeChatBox";
const _storeChatBox = storeChatBox();
const { showChat } = storeToRefs(_storeChatBox);
// const { $_socket } = useNuxtApp();

const connected = ref(false);
onMounted(() => {
  // await socketConnect();
  // $_socket.on("connectStatus", (data) => {
  //   console.log("Socket connected", { data });
  //   // connected.value = socket.connected;
  // });
  // $_socket.on("disconnect", () => {
  //   console.log("Socket disconnected");
  //   // connected.value = socket.connected;
  // });
});

// const socketConnect = async () => {
//   const io = useIO();
//   // console.log(io());
//   // const socket = io("http://localhost:3000");
// const URL = "http://localhost:3000";
// //   const URL = 'https://superhandy-frontend-fork.herokuapp.com'
// socket = io(URL, {
//   transports: ["websocket"],
//   auth: { Authorization: `` },
// });
// console.log({ socket });

//   // socket.on("connect", () => {
//   //   connected.value = socket.connected;
//   // });
//   // socket.on("disconnect", () => {
//   //   connected.value = socket.connected;
//   // });
// };
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  right: 3%;
  bottom: 3%;
  z-index: 10;
}
</style>
