import { defineStore } from "pinia";

export const storeFullOverlay = defineStore("fullOverlay", () => {

  const _isOpen = ref(false)
  const isOpen = computed(() => _isOpen.value)
  const open = () => {
    _isOpen.value = true
  }
  const close = () => {
    _isOpen.value = false
  }

  return {
    isOpen,
    open,
    close
  };
});
