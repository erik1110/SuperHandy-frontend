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
  <div
    class="sp-flex-initial sp-max-w-full md:sp-max-w-2xl lg:sp-max-w-3xl xl:sp-max-w-5xl 2xl:sp-max-w-6xl sp-items-center sp-flex"
  >
    <v-btn
      class="slidePrev-btn mr-5 d-none d-sm-block"
      color="#fff"
      density="comfortable"
      icon="mdi-arrow-left"
    ></v-btn>
    <Swiper
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :modules="[SwiperNavigation]"
      :navigation="{ prevEl: '.slidePrev-btn', nextEl: '.slideNext-btn' }"
      :breakpoints="{
        '640': {
          slidesPerView: 2,
        },
        '1280': {
          slidesPerView: 3,
        },
        '2580': {
          slidesPreView: 4,
        },
      }"
    >
      <SwiperSlide
        v-for="h in highlightTasks"
        :key="h.taskId"
        class="sp-max-w-[220px]"
      >
        <FindTasksHighlightCard v-bind="h" />
      </SwiperSlide>
    </Swiper>

    <v-btn
      class="slideNext-btn ml-5 d-none d-sm-block"
      color="#fff"
      density="comfortable"
      icon="mdi-arrow-right"
    ></v-btn>
  </div>
</template>

<script setup>
import { getTasksHighlight } from "@/services/apis/findTasks";
const highlightTasks = ref([]);
const fetchTasksHighlight = async () => {
  let { data } = await getTasksHighlight();
  console.log(data);
  highlightTasks.value = data.tasks;
};
onMounted(() => {
  fetchTasksHighlight();
});
</script>

<style lang="scss" scoped></style>
