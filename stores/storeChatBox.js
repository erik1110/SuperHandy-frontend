// stores/counter.js
import { defineStore } from "pinia";
import { useIO } from "#imports";
import { storeAuth } from "@/stores/storeAuth";
import { getChatList, getChatRoomHistory } from "@/services/apis/chat";

export const storeChatBox = defineStore("chatBox", () => {
  const showChat = ref(false);
  const nowRoom = reactive({});
  const nowRoomChatList = ref([]);

  // 聊天室列表
  const roomList = ref([]);
  const fetchChatList = async () => {
    let res = await getChatList();
    console.log({ res });
    let data = res.data
    roomList.value = data.reduce((acc,cur)=>{
      let newObj = {
        ...cur[cur.partnerRole],
        taskId: cur.taskId,
        time: cur.time,
        title: cur.title,
        unreadCount: cur.unreadCount,
        role: cur.partnerRole
      }
      acc.push(newObj)
      return acc
    },[])
    console.log('roomlist',roomList.value);
  };
  onMounted(() => {
    console.log("fetchChatList on mounted");
    fetchChatList();
  });
  // 個別聊天室對話
  const fetchRoomHistory = async (taskId) => {
    let res = await getChatRoomHistory({ taskId });
    console.log({ res });
    // nowRoomChatList.value = res.data
    nowRoomChatList.value =  [
      {
          "_id": "64813eb00b9e2d99b4bf968c",
          "taskId": "64813eb00b9e2d99b4bf960a",
          "role": "helper",
          "message": "一塊小蛋糕",
          "read": false,
          "createdAt": "2023-06-08T02:36:32.249Z"
      },
      {
          "_id": "64813eb00b9e2d99b4bf968b",
          "taskId": "64813eb00b9e2d99b4bf960a",
          "role": "poster",
          "message": "你好，我的專題是做一個類似找打工的網站，請問你會寫網站嗎？",
          "read": false,
          "createdAt": "2023-06-08T02:36:32.249Z"
      },
      {
          "_id": "64813eb00b9e2d99b4bf968a",
          "taskId": "64813eb00b9e2d99b4bf960a",
          "role": "helper",
          "message": "你好，我可以幫你做畢業專題，請問你的專題是什麼呢？",
          "read": false,
          "createdAt": "2023-06-08T02:36:32.249Z"
      },
      {
        "_id": "64813eb00b9e2d99b4bf9682",
        "taskId": "64813eb00b9e2d99b4bf960a",
        "role": "helper",
        "message": "一塊小蛋糕",
        "read": false,
        "createdAt": "2023-06-08T02:36:32.249Z"
    },
    {
        "_id": "64813eb00b9e2d99b4bf968d",
        "taskId": "64813eb00b9e2d99b4bf960a",
        "role": "poster",
        "message": "你好，我的專題是做一個類似找打工的網站，請問你會寫網站嗎？",
        "read": false,
        "createdAt": "2023-06-08T02:36:32.249Z"
    },
    {
        "_id": "64813eb00b9e2d99b4bf9623",
        "taskId": "64813eb00b9e2d99b4bf960a",
        "role": "helper",
        "message": "你好，我可以幫你做畢業專題，請問你的專題是什麼呢？",
        "read": false,
        "createdAt": "2023-06-08T02:36:32.249Z"
    },
    {
      "_id": "64813eb00b9e2d99b4bf9611",
      "taskId": "64813eb00b9e2d99b4bf960a",
      "role": "helper",
      "message": "一塊小蛋糕",
      "read": false,
      "createdAt": "2023-06-08T02:36:32.249Z"
  },
  {
      "_id": "64813eb00b9e2d99b4bf9612",
      "taskId": "64813eb00b9e2d99b4bf960a",
      "role": "poster",
      "message": "你好，我的專題是做一個類似找打工的網站，請問你會寫網站嗎？",
      "read": false,
      "createdAt": "2023-06-08T02:36:32.249Z"
  },
  {
      "_id": "64813eb00b9e2d99b4bf9613",
      "taskId": "64813eb00b9e2d99b4bf960a",
      "role": "helper",
      "message": "你好，我可以幫你做畢業專題，請問你的專題是什麼呢？",
      "read": false,
      "createdAt": "2023-06-08T02:36:32.249Z"
  }
    ]
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
    nowRoomChatList,
    roomList,
    fetchRoomHistory,
    messages,
    reConnectWebSocket,
  };
});
