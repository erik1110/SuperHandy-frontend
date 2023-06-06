import { defineStore } from "pinia";

export const storeLocation = defineStore("storeLocation", () => {
  const locationData = ref({});


  return {
    locationData,
  };
});