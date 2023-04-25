<template>
  <div>
    <h1>首頁2</h1>
    <div>Current Count: {{ counter.count }}</div>
    <button @click="counter.increment()">+1</button>
  </div>
</template>

<script setup>
  import { useCounterStore } from "@/stores/counter";
  const counter = useCounterStore();
</script>

<style scoped></style>
