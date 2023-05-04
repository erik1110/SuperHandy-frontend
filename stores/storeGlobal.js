// stores/counter.js
import { defineStore } from "pinia";

export const storeGlobal = defineStore("global", () => {
  const confirmDialog = ref({
    open: false,
    title: "",
    content: "",
  });
  const confirmHandler = (val) => {
    confirmDialog.value = val;
  };
  const closeConfirm = () => {
    confirmDialog.value = {
      open: false,
    };
  };
  return {
    confirmDialog,
    confirmHandler,
    closeConfirm,
  };
});
