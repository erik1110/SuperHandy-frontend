// stores/counter.js
import { defineStore } from "pinia";

export const storeChatBox = defineStore("chatBox", () => {
  const showChat = ref(true)
  return {
    showChat
  };
});
