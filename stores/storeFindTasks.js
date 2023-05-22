// stores/counter.js
import { defineStore } from "pinia";

export const storeFindTasks = defineStore("findTasks", () => {
  const totalTasks = ref(0)
  return{
    totalTasks
  }
});
