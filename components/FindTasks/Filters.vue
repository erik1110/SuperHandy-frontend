<template>
  <div class="filter sm:sp-mr-6 sp-min-w-[250px] sm:sp-max-w-[300px]">
    <div class="sp-flex sp-items-center sp-border-b sp-px-6 sp-py-2">
      <FunnelIcon class="sp-icon-sm sp-text-purple sp-mr-1" />
      <p>任務條件</p>
    </div>
  </div>
</template>

<script setup>
import { FunnelIcon } from "@heroicons/vue/24/outline";
</script>

<style lang="postcss" scoped>
.filter {
  @apply sp-h-[350px] sp-bg-white sp-rounded-2xl;
}
</style>
