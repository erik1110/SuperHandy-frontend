// stores/counter.js
import { defineStore } from "pinia";
import { useIO } from "#imports";

export const storeChatBox = defineStore("chatBox", () => {
  const showChat = ref(false)
  const nowRoom = reactive({})

  const io = useIO();
  const URL = import.meta.env.VITE_BACKEND_ROOT_DEV
  let socket = reactive(null)
  const messages = reactive({})

  const socketConnect = (authorization)=>{
    
    socket = io(URL, {
      transports: ['websocket'],
      auth: { Authorization: `Bearer ${authorization}` }
    })
    console.log('socket in store',{socket});
  }
  const setUpEventHandlers = () => {
    //監聽message事件(接收websocket訊息)
    socket.on('message', (data) => {
      console.log('check point 收到甚麼message訊息:', data)
      const { message, taskId, role, createAt } = data
      // if (!messagePanes[taskId]) return // 若messagePanes[taskId]不存在，則返回
      // messagePanes[taskId].push(data)
      // updateMessagePane(taskId)
    })

    //監聽connectStatus事件(接收websocket訊息)
    socket.on('connectStatus', (data) => {
      console.log('socket connected:', data.message)
    })
    //監聽errorMsg事件(接收websocket訊息)
    socket.on('errorMsg', (err) => {
      console.log('socket err:',{err})
    })
  }

  const reConnectWebSocket =(authorization)=> {
    //關閉舊的連線
    socket.close()
    //建立新的連線
    socketConnect(authorization)
    setUpEventHandlers()
  }
  onMounted(async()=>{
    socketConnect()
    setUpEventHandlers()
  })


  return {
    showChat,
    nowRoom,
    messages
  };
});
