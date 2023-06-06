// stores/counter.js
import { defineStore } from "pinia";
import { useIO } from "#imports";
import { storeAuth } from "@/stores/storeAuth";
import { getChatList, getChatRoomHistory } from "@/services/apis/chat";

export const storeChatBox = defineStore("chatBox", () => {
  const showChat = ref(false);
  const nowRoom = reactive({});

  // 聊天室列表
  const roomList = ref([]);
  const fetchChatList = async () => {
    let res = await getChatList();
    console.log({ res });
    roomList.value = res.data;
  };
  onMounted(() => {
    console.log("fetchChatList on mounted");
    fetchChatList();
  });
  // 個別聊天室對話
  const fetchRoomHistory = async (taskId) => {
    let res = await getChatRoomHistory({ taskId });
    console.log({ res });
  };
  // WebSocket 設定
  const io = useIO();
  const URL = import.meta.env.VITE_BACKEND_ROOT_DEV;
  let socket = reactive({});
  const messages = reactive({});

  const socketConnect = (authorization) => {
    socket = io(URL, {
      transports: ["websocket"],
      auth: { Authorization: `Bearer ${authorization}` },
    });
    console.log("socket in store", { socket });
  };
  const setUpEventHandlers = () => {
    //監聽message事件(接收websocket訊息)
    socket.on("message", (data) => {
      console.log("check point 收到甚麼message訊息:", data);
      const { message, taskId, role, createAt } = data;
      // if (!messagePanes[taskId]) return // 若messagePanes[taskId]不存在，則返回
      // messagePanes[taskId].push(data)
      // updateMessagePane(taskId)
    });

    //監聽connectStatus事件(接收websocket訊息)
    socket.on("connectStatus", (data) => {
      console.log("socket connected:", data.message);
    });
    //監聽errorMsg事件(接收websocket訊息)
    socket.on("errorMsg", (err) => {
      console.log("socket err:", { err });
    });
  };

  const reConnectWebSocket = () => {
    console.log("reConnectWebSocket");
    const _storeAuth = storeAuth();

    //關閉舊的連線
    socket.close();
    //建立新的連線
    socketConnect(_storeAuth.loginToken);
    setUpEventHandlers();
  };

  onMounted(async () => {
    socketConnect();
    setUpEventHandlers();
  });

  return {
    showChat,
    nowRoom,
    roomList,
    fetchRoomHistory,
    messages,
    reConnectWebSocket,
  };
});
