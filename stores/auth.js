// stores/counter.js
import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
  state: () => {
    return {
      isLogin: false,
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    toggleLogin() {
      this.isLogin = !this.isLogin;
    },
  },
});
