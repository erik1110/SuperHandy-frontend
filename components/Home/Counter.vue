<template>
  <div class="sp-w-full flexCenter sp-flex-col">
    <Component :is="icons[props.icon]" class="sp-mb-2" />
    <p class="sp-flex sp-justify-center count-num sp-relative">
      <span class="sp-text-7xl sp-font-black  sp-text-secondary">{{ counter }}</span>
    </p>
    <p class="sp-text-white sp-font-bold sp-mt-4">{{ props.title }}</p>
  </div>
</template>

<script setup>
import IconTasks from "@/assets/images/icons/tasks.svg"
import IconTrophy from "@/assets/images/icons/trophy.svg"

const props = defineProps({
  count: Number,
  icon: String,
  title: String,
})

const counter = ref(0);
const icons = ref({
  IconTasks,
  IconTrophy
})
setInterval(() => {
  if (counter.value < props.count) {
    counter.value += 2;
  }
}, 1);
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