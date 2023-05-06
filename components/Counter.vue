<template>
  <div class="sp-w-full sp-flex sp-flex-col sp-justify-center sp-h-screen">
    <p class="sp-flex sp-justify-center">
      <span class="sp-text-9xl">{{ counter }}</span>
    </p>
  </div>
</template>

<script setup>
const counter = ref(0);

setInterval(() => {
  if (counter.value < 100) {
    counter.value++;
  }
}, 10);
</script>

<style lang="scss" scoped></style>