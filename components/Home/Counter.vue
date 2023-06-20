<template>
  <div class="sp-w-full sp-flex-center sp-flex-col">
    <Component :is="icons[props.icon]" class="sp-mb-2 sp-icon-md sp-mr-2 sp-text-white" />
    <p class="sp-flex sp-justify-center count-num sp-relative">
      <span class="sp-text-7xl sp-font-black  sp-text-secondary">{{ count }}</span>
    </p>
    <p class="sp-text-white sp-font-bold sp-mt-4">{{ props.title }}</p>
  </div>
</template>

<script setup>
import { DocumentDuplicateIcon, TrophyIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  count: Number,
  icon: String,
  title: String,
})
const icons = shallowRef({
  DocumentDuplicateIcon,
  TrophyIcon
})
</script>

<style lang="scss" scoped>
.count-num::after {
  content: "+";
  position: absolute;
  top: 0;
  right: 0;
  color: #B7EEEE;
  font-weight: bold;
  font-size: 40px;
  line-height: 80px;
  transform: translateX(120%);
}
</style>