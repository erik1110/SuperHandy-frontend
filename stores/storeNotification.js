import { defineStore } from "pinia";

export const storeNotification = defineStore("storeNotification", () => {
  const notiLength = ref(3);
  const addNotiLength = () => {
    notiLength.value = (notiLength.value * 2 )
  }


  return {
    notiLength,
    addNotiLength,
  };
});