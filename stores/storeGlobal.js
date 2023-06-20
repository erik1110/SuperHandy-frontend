// stores/counter.js
import { defineStore } from "pinia";

export const storeGlobal = defineStore("global", () => {
  const confirmDialog = ref({
    open: false,
    title: "",
    content: "",
    closeHandle: null,
  });
  const confirmHandler = (val) => {
    confirmDialog.value = val;
  };
  const closeConfirm = () => {
    if (typeof confirmDialog.value.closeHandle == "function") {
      confirmDialog.value.closeHandle();
    }
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
