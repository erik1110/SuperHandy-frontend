// stores/counter.js
import { defineStore } from "pinia";

export const storeAuth = defineStore("auth", () => {
  const isLogin = ref(false);
  const loginToken = ref("");
  const setLoginToken = (val) => (loginToken.value = val);

  return {
    isLogin,
    loginToken,
    setLoginToken,
  };
});
