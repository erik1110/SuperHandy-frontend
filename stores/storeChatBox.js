// stores/counter.js
import { defineStore } from "pinia";
import { useIO } from "#imports";
import { storeAuth } from "@/stores/storeAuth";
import { getChatList, getChatRoomHistory } from "@/services/apis/chat";

export const storeChatBox = defineStore("chatBox", () => {
  const showChat = ref(false);
  const nowRoom = ref({});
  const nowRoomChatList = ref([]);
  /*
    Fetch Data
  */
  // 取得聊天室列表
  const roomList = ref([]);
  const fetchChatList = async () => {
    let res = await getChatList();
    console.log({ res });
    if(res.status=="false") return
    let data = res.data
    roomList.value = data.reduce((acc,cur)=>{
      let newObj = {
        ...cur[cur.partnerRole],
        taskId: cur.taskId,
        updatedAt: cur.updatedAt,
        title: cur.title,
        unreadCount: cur.unreadCount,
        role: cur.partnerRole,
        lastMessage: cur.lastMessage
      }
      acc.push(newObj)
      return acc
    },[])
    console.log('roomlist',roomList.value);
  };
  
  watch(showChat,(val)=>{
    if(val){
      fetchChatList()
    }
  })
  // 取得個別聊天室對話
  const fetchRoomHistory = async (taskId) => {
    let res = await getChatRoomHistory({ taskId });
    console.log({ res });
    nowRoomChatList.value = res.data 
    // === for test ===
    //   nowRoomChatList.value =  [
    //     {
    //         "_id": "64813eb00b9e2d99b4bf968c",
    //         "taskId": "64813eb00b9e2d99b4bf960a",
    //         "role": "helper",
    //         "message": "一塊小蛋糕",
    //         "read": false,
    //         "createdAt": "2023-06-08T02:36:32.249Z"
    //     },
    //     {
    //         "_id": "64813eb00b9e2d99b4bf968b",
    //         "taskId": "64813eb00b9e2d99b4bf960a",
    //         "role": "poster",
    //         "message": "你好，我的專題是做一個類似找打工的網站，請問你會寫網站嗎？",
    //         "read": false,
    //         "createdAt": "2023-06-08T02:36:32.249Z"
    //     },
    //     {
    //         "_id": "64813eb00b9e2d99b4bf968a",
    //         "taskId": "64813eb00b9e2d99b4bf960a",
    //         "role": "helper",
    //         "message": "你好，我可以幫你做畢業專題，請問你的專題是什麼呢？",
    //         "read": false,
    //         "createdAt": "2023-06-08T02:36:32.249Z"
    //     },
    //     {
    //       "_id": "64813eb00b9e2d99b4bf9682",
    //       "taskId": "64813eb00b9e2d99b4bf960a",
    //       "role": "helper",
    //       "message": "一塊小蛋糕",
    //       "read": false,
    //       "createdAt": "2023-06-08T02:36:32.249Z"
    //   },
    //   {
    //       "_id": "64813eb00b9e2d99b4bf968d",
    //       "taskId": "64813eb00b9e2d99b4bf960a",
    //       "role": "poster",
    //       "message": "你好，我的專題是做一個類似找打工的網站，請問你會寫網站嗎？",
    //       "read": false,
    //       "createdAt": "2023-06-08T02:36:32.249Z"
    //   },
    //   {
    //       "_id": "64813eb00b9e2d99b4bf9623",
    //       "taskId": "64813eb00b9e2d99b4bf960a",
    //       "role": "helper",
    //       "message": "你好，我可以幫你做畢業專題，請問你的專題是什麼呢？",
    //       "read": false,
    //       "createdAt": "2023-06-08T02:36:32.249Z"
    //   },
    //   {
    //     "_id": "64813eb00b9e2d99b4bf9611",
    //     "taskId": "64813eb00b9e2d99b4bf960a",
    //     "role": "helper",
    //     "message": "一塊小蛋糕",
    //     "read": false,
    //     "createdAt": "2023-06-08T02:36:32.249Z"
    // },
    // {
    //     "_id": "64813eb00b9e2d99b4bf9612",
    //     "taskId": "64813eb00b9e2d99b4bf960a",
    //     "role": "poster",
    //     "message": "你好，我的專題是做一個類似找打工的網站，請問你會寫網站嗎？",
    //     "read": false,
    //     "createdAt": "2023-06-08T02:36:32.249Z"
    // },
    // {
    //     "_id": "64813eb00b9e2d99b4bf9613",
    //     "taskId": "64813eb00b9e2d99b4bf960a",
    //     "role": "helper",
    //     "message": "你好，我可以幫你做畢業專題，請問你的專題是什麼呢？",
    //     "read": false,
    //     "createdAt": "2023-06-08T02:36:32.249Z"
    // }
    //   ]
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
    const _storeAuth = storeAuth();
    socket = io(URL, {
      transports: ["websocket"],
      auth: { Authorization: _storeAuth.loginToken ? `Bearer ${_storeAuth.loginToken}`: `` },
    });
    console.log("socket in store", { socket });
  };

  /* 
    監聽事件 
  */
  const setUpEventHandlers = () => {
    //監聽message事件(接收websocket訊息)
    socket.on("message", (msg) => {
      console.log("收到甚麼message訊息:", msg);
      // 更新 ChatList
      // if(nowRoom.taskId)
        updateMsg(msg)
    });
    //監聽read事件(接收websocket訊息)
    socket.on("read",(data)=>{
      console.log("socket read:", {data});
    })

    //監聽connectStatus事件(接收websocket訊息)
    socket.on("connectStatus", (data) => {
      console.log("socket connected:", data.message,{data});
    });
    //監聽errorMsg事件(接收websocket訊息)
    socket.on("errorMsg", (err) => {
      console.log("socket err:", { err });
    });
  };

  /* 
    WebSocket Emit 
  */
  // 傳送訊息
  const sendWsMsg = (taskId,message)=>{
    socket.emit('message', { taskId, message })
  }
  // 聊天室全部已讀
  const setRoomRead = (taskId,chatId)=>{
    socket.emit('read', { taskId, chatId })
  }
  // WebSocket重新連線
  const reConnectWebSocket = () => {
    console.log("reConnectWebSocket");

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
  const updateMsg = (msg)=>{
    // 更新左側聊天室列表
    let newMsgRoom = roomList.value.find(r=>r.taskId==msg.taskId)
    newMsgRoom.lastMessage = msg.message
    newMsgRoom.updatedAt = msg.createdAt
    // TODO: 釐清unreadCount邏輯
    // newMsgRoom.unreadCount = msg.unreadCount
    console.log({newMsgRoom});
    // 如果正在聊天室內，更新房間訊息
    if(nowRoom.value.taskId == msg.taskId){
      let randomNum = Math.round(Math.random())*1000
      nowRoomChatList.value.push({
        _id:randomNum,
        ...msg
      })
      let roomContent = document.querySelector('.room_content')
      if(roomContent){
        scrollToBottom(roomContent)
      }
      // TODO: ws 已讀傳送
    }else{
      newMsgRoom.unreadCount ++
    }
    
  }
  // 滾動到最新訊息
  const scrollToBottom = (content) => {
    setTimeout(()=>{
      content.scrollTop = content.scrollHeight;
    },100)
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
    fetchChatList,
    fetchRoomHistory,
    scrollToBottom,
    sendWsMsg,
    setRoomRead,
    messages,
    reConnectWebSocket,
  };
});
