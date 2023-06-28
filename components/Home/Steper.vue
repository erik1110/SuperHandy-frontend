<template>
  <div class="sp-flex sp-items-center">
    <div class="circle sp-flex-center">
      <Component :is="icons[icon]" class="sp-icon-lg sp-text-primary" />
    </div>
    <div class="sp-whitespace-nowrap">
      <p class="sp-text-title">{{ subtitle }}</p>
      <h3 class="sp-text-h3 sp-mb-2">
        {{ title }}
      </h3>
    </div>
  </div>
</template>

<script setup>
import {
  NewspaperIcon,
  UserGroupIcon,
  HandThumbUpIcon,
} from "@heroicons/vue/24/solid";
const props = defineProps({
  stepData: Object,
});
const { icon, title, subtitle } = props.stepData;
// Icons
const icons = reactive({
  NewspaperIcon,
  UserGroupIcon,
  HandThumbUpIcon,
});
</script>

<style lang="postcss" scoped>
.circle {
  @apply sp-min-w-[100px] sp-min-h-[100px] sp-bg-primary-lighten sp-rounded-full sp-mr-8;
}
</style>
