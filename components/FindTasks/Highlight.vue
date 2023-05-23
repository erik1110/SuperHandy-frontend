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
  <!-- sp-max-w-full md:sp-max-w-2xl lg:sp-max-w-3xl xl:sp-max-w-5xl 2xl:sp-max-w-6xl -->
  <!-- <FindTasksSwiper /> -->
  <Swiper
    :slides-per-view="4"
    :loop="true"
    :space-between="30"
    :modules="[SwiperNavigation, SwiperAutoplay, SwiperEffectCreative]"
    :navigation="{ prevEl: '.slidePrev-btn', nextEl: '.slideNext-btn' }"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: true,
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
      '1280': {
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
const highlightTasks = ref([
  {
    taskId: "646c8aa6f48df43c2b5a2e2f",
    title: "幫忙打王國之淚的Boss0",
    imgUrls: "https://example.com/switch.jpg",
    category: "人力派遣",
  },
  {
    taskId: "646c8aa6f48df43c2b5a2e23",
    title: "幫忙打王國之淚的Boss1",
    imgUrls: "https://example.com/switch.jpg",
    category: "人力派遣",
  },
  {
    taskId: "646c8aa6f48df43c2b5ade23",
    title: "幫忙打王國之淚的Boss2",
    imgUrls: "https://example.com/switch.jpg",
    category: "人力派遣",
  },
  {
    taskId: "646c8aa6f48df43c2ssa2e23",
    title: "幫忙打王國之淚的Boss3",
    imgUrls: "https://example.com/switch.jpg",
    category: "人力派遣",
  },
  {
    taskId: "646c8aa6f48df43c2esa2e23",
    title: "幫忙打王國之淚的Boss4",
    imgUrls: "https://example.com/switch.jpg",
    category: "人力派遣",
  },
  {
    taskId: "646c8aa6f48df43c2esa2e23",
    title: "幫忙打王國之淚的Boss5",
    imgUrls: "https://example.com/switch.jpg",
    category: "人力派遣",
  },
]);
const fetchTasksHighlight = async () => {
  let { data } = await getTasksHighlight();
  console.log(data);
  highlightTasks.value = data.tasks;
};
onMounted(() => {
  // fetchTasksHighlight();
});

const showPrevBtn = ref(false);
const showNextBtn = ref(true);
const reachEndEvent = () => {
  console.log("reachEndEvent");
};
</script>

<style lang="scss" scoped></style>
