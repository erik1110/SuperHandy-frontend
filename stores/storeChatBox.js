// stores/counter.js
import { defineStore } from "pinia";

export const storeChatBox = defineStore("chatBox", () => {
  const showChat = ref(false)
  const nowRoom = reactive({})
  const messages = reactive([
    {name: '王小華', msg: "Hello World!"},
    {name: '翁文方', msg: "哈哈哈"},
  ])
  return {
    showChat,
    nowRoom,
    messages
  };
});
