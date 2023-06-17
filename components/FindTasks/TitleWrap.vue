<template>
  <div class="sp-flex sp-justify-between sp-items-center sp-mb-3">
    <h3 class="sp-text-h5 sp-mr-2">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup>
const { title } = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped></style>
