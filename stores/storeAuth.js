// stores/counter.js
import { defineStore, skipHydrate } from "pinia";
import { useStorage } from "@vueuse/core";

export const storeAuth = defineStore("auth", () => {
  const isLogin = ref(false);
  // const loginToken = ref("");
  const loginToken = useCookie("spToken");
  const setLoginToken = (val) => (loginToken.value = val);
  

  return {
    isLogin,
    loginToken,
    setLoginToken,
  };
});
