<template>
  <div>
    <h1>首頁2</h1>
    <div>Current Count: {{ counter.count }}</div>
    <button @click="counter.increment()">+1</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { getCompletedCases } from '@/services/apis/home'
const counter = useCounterStore();
const testData = ref({})

onMounted(async () => {
  try {
    let { data } = await getCompletedCases()
    console.log(data);
    testData.value = data
  } catch (err) {
    console.log({ err });
  }

})

</script>

<style scoped></style>
