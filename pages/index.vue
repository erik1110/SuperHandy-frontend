<template>
  <div>
    <h1>首頁2</h1>
    <div>Current Count: {{ count }}</div>
    <button @click="increment()">+1</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const counter = useCounterStore();
const { count } = storeToRefs(counter)
const { increment } = counter

</script>

<style scoped></style>
