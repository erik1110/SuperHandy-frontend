<template>
  <div
    class="sp-mr-8 sp-hidden sm:sp-block sp-border-l-[12px] sp-border-secondary sp-text-primary sp-pl-4 sp-min-w-[205px]"
  >
    <h1 class="sp-text-h2">找任務</h1>
    <p>各項任務由你大展身手！</p>
    <p>超人幫手限時推薦👏</p>
  </div>
  <div class="sp-text-center sp-text-primary sm:sp-hidden">
    <h1 class="sp-text-h2">找任務</h1>
    <p>各項任務由你大展身手！超人幫手限時推薦👏</p>
  </div>
  <Swiper
    :slides-per-view="3"
    :loop="true"
    :space-between="30"
    :modules="[SwiperNavigation, SwiperAutoplay, SwiperEffectCreative]"
    :navigation="{ prevEl: '.slidePrev-btn', nextEl: '.slideNext-btn' }"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
    :breakpoints="{
      '0': {
        slidesPerView: 1,
      },
      '640': {
        slidesPerView: 2,
      },
      '768': {
        slidesPerView: 3,
      },
      '2560': {
        slidesPreView: 4,
      },
    }"
  >
    <SwiperSlide v-for="h in highlightTasks" :key="h.taskId">
      <FindTasksHighlightCard v-bind="h" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { getTasksHighlight } from "@/services/apis/findTasks";
const highlightTasks = ref();

const fetchTasksHighlight = async () => {
  let { data } = await getTasksHighlight();
  highlightTasks.value = [...data.tasks];
};
onMounted(() => {
  fetchTasksHighlight();
});
</script>

<style lang="scss" scoped></style>
