<template>
  <div class="sp-flex sp-items-center">
    <div class="circle"></div>
    <div class="sp-whitespace-nowrap">
      <h3 class="sp-text-h3">
        {{ title }}
      </h3>
      <p class="sp-text-title">{{ subtitle }}</p>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  stepData: Object
});
const { icon, title, subtitle } = props.stepData
</script>

<style lang="postcss" scoped>
.circle {
  @apply sp-min-w-[100px] sp-min-h-[100px] sp-bg-primary-lighten sp-rounded-full sp-mr-4
}
</style>