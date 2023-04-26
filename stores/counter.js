// stores/counter.js
import { defineStore } from "pinia";

// export const useCounterStore = defineStore("counter", {
//   state: () => {
//     return { count: 0 };
//   },
//   // could also be defined as
//   // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
// });
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
