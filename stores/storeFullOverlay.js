import { defineStore } from "pinia";

export const storeFullOverlay = defineStore("fullOverlay", () => {
  const _isOpen = ref(false);
  const isOpen = computed(() => _isOpen.value);
  const open = () => {
    _isOpen.value = true;
  };
  const close = () => {
    setTimeout(function () {
      _isOpen.value = false;
    }, 300);
  };

  return {
    isOpen,
    open,
    close,
  };
});
