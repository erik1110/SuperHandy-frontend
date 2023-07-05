// stores/counter.js
import { defineStore, storeToRefs } from "pinia";
import { useIO } from "#imports";
import { storeAuth } from "@/stores/storeAuth";
import { storeNotification } from "@/stores/storeNotification";
import { getChatList, getChatRoomHistory } from "@/services/apis/chat";
export const storeChatBox = defineStore("chatBox", () => {
  const _storeNotification = storeNotification();
  const { isHasUnRead } = storeToRefs(_storeNotification);
  const _storeAuth = storeAuth();
  const roomLoading = ref(false);
  const roomListLoading = ref(true);
  const showChat = ref(false);
  const nowRoom = ref({});
  const nowRoomChatList = ref([]);
  const showBadge = ref(false);
  const notificationMessage = ref([]);
  const route = useRoute();
  /*
    Fetch Data
  */
  // 取得聊天室列表
  const roomList = ref([]);
  const fetchChatList = async () => {
    roomListLoading.value = true;
    let res = await getChatList();
    if (res.status == "false") return;
    let data = res.data;
    roomList.value = data.reduce((acc, cur) => {
      let newObj = {
        ...cur[cur.partnerRole],
        taskId: cur.taskId,
        updatedAt: cur.updatedAt,
        title: cur.title,
        unreadCount: cur.unreadCount,
        role: cur.partnerRole,
        lastMessage: cur.lastMessage,
      };
      acc.push(newObj);
      return acc;
    }, []);

    updateBadge();
    roomListLoading.value = false;
  };
  onMounted(() => {
    if (_storeAuth.loginToken) {
      fetchChatList();
    }
  });
  watch(showChat, (val) => {
    if (val) {
      fetchChatList();
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  });
  // 取得個別聊天室對話
  const fetchRoomHistory = async (taskId) => {
    roomLoading.value = true;
    let res = await getChatRoomHistory({ taskId });
    nowRoomChatList.value = res.data;
    roomLoading.value = false;
  };

  /* 
    WebSocket 設定
  */
  const io = useIO();
  const URL = import.meta.env.VITE_BACKEND_ROOT_DEV;
  let socket = reactive({});
  const messages = reactive({});
  // WebSocket 連線
  const socketConnect = () => {
    socket = io(URL, {
      transports: ["websocket"],
      auth: {
        Authorization: _storeAuth.loginToken
          ? `Bearer ${_storeAuth.loginToken}`
          : ``,
      },
    });
  };

  /* 
    監聽事件 
  */
  const setUpEventHandlers = () => {
    //監聽message事件(接收websocket訊息)
    socket.on("message", (msg) => {
      // 更新 ChatList
      updateMsg(msg);
    });
    //監聽read事件(接收websocket訊息)
    socket.on("read", (data) => {
      updateBadge();
    });
    //監聽是否有通知新內容(接收 websocket 訊息)
    socket.on("notification", (msg) => {
      isHasUnRead.value = true;
      notificationMessage.value.push(msg);
      setTimeout(function () {
        notificationMessage.value.shift();
      }, 3000);
    });
    //監聽connectStatus事件(接收websocket訊息)
    socket.on("connectStatus", (data) => {});
    //監聽errorMsg事件(接收websocket訊息)
    socket.on("errorMsg", (err) => {});
  };

  /* 
    WebSocket Emit 
  */
  // 傳送訊息
  const sendWsMsg = (taskId, message) => {
    socket.emit("message", { taskId, message });
  };
  // 聊天室全部已讀
  const setRoomRead = (taskId, chatId) => {
    socket.emit("read", { taskId, chatId });
  };
  // WebSocket重新連線
  const reConnectWebSocket = () => {
    //關閉舊的連線
    socket.close();
    //建立新的連線
    socketConnect();
    setUpEventHandlers();
  };

  /* 
    聊天室操作
  */
  // 更新聊天室訊息
  const updateMsg = (msg) => {
    // 更新左側聊天室列表
    let newMsgRoom = roomList.value.find((r) => r.taskId == msg.taskId);
    newMsgRoom.lastMessage = msg.message;
    newMsgRoom.updatedAt = msg.createdAt;
    // 如果正在聊天室內，更新房間訊息
    if (nowRoom.value.taskId == msg.taskId) {
      let randomNum = Math.round(Math.random()) * 1000;
      nowRoomChatList.value.push({
        _id: randomNum,
        ...msg,
      });
      let roomContent = document.querySelector(".room_content");
      if (roomContent) {
        scrollToBottom(roomContent);
      }
      // ws 已讀傳送
      setRoomRead(msg.taskId, msg.chatId);
    } else {
      newMsgRoom.unreadCount++;
    }
    // 更新聊天列表順序
    updateChatList(msg.taskId);
  };
  // 滾動到最新訊息
  const scrollToBottom = (content) => {
    setTimeout(() => {
      content.scrollTop = content.scrollHeight;
    }, 100);
  };
  // 更新聊天列表順序
  const updateChatList = (msgIdx) => {
    let renewIdx = roomList.value.findIndex((el) => el.taskId == msgIdx);
    if (renewIdx != 0) {
      let removed = roomList.value.splice(renewIdx, 1);
      roomList.value.unshift(removed[0]);
    }
  };
  // 更新Chat btn Badge
  const updateBadge = () => {
    let hasUnreadCount = roomList.value.find((el) => el.unreadCount != 0);
    showBadge.value = !!hasUnreadCount;
  };
  // // 路由更換自動關閉聊天室
  // watch(()=>route.path,(val)=>{
  //   console.log({val});
  //   if(showChat.value) showChat.value = false
  // })

  onMounted(async () => {
    socketConnect();
    setUpEventHandlers();
  });

  return {
    roomLoading,
    roomListLoading,
    showChat,
    nowRoom,
    nowRoomChatList,
    showBadge,
    roomList,
    fetchChatList,
    fetchRoomHistory,
    scrollToBottom,
    sendWsMsg,
    setRoomRead,
    messages,
    reConnectWebSocket,
    notificationMessage,
  };
});
