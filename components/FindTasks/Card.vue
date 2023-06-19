<template>
  <div class="sp-card-wrapper sp-bg-white sp-p-4 lg:sp-p-6 sp-mb-4">
    <FindTasksTitleWrap :title="taskData.title">
      <div v-if="taskData.isUrgent" class="fireIcon sp-flex-center sp-flex-col">
        <FireIcon class="sp-icon-md sp-text-white" />
        <p class="sp-text-caption sp-text-white">急件</p>
      </div>
    </FindTasksTitleWrap>
    <div
      class="sp-flex sp-items-center sp-my-2 sp-gray-placeholder sp-text-body-sm"
    >
      <MapPinIcon class="sp-icon-xs sp-mr-1 sp-text-purple" />
      <!-- {{ t.location.city }}{{ t.location.dist }} -->
      {{ taskData.address }}
    </div>
    <div
      class="sp-bg-gray-border sp-rounded-lg sp-flex sp-flex-wrap md:sp-flex-nowrap sp-py-4 sp-px-2 sp-mb-4"
    >
      <div class="item sp-w-full md:sp-w-auto">
        <p class="tile">服務類型</p>
        <p>#{{ taskData.category }}</p>
      </div>
      <div class="item sp-w-full md:sp-w-auto">
        <p class="tile">案主</p>
        <p>{{ taskData.posterName }}</p>
      </div>
      <!-- <div class="item">
        <p class="tile">聯絡電話</p>
        <p>09-26XXX-XXX</p>
      </div> -->
      <div class="item sp-w-full md:sp-w-auto">
        <p class="tile">案件預算</p>
        <p class="sp-text-purple sp-font-semibold sp-text-body-sm">
          {{ taskData.salary }} 超人幣
        </p>
      </div>
    </div>
    <div class="sp-mb-4">
      <p class="sp-text-body-sm sp-mb-1">任務說明</p>
      <div
        class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder"
      >
        {{ taskData.description }}
      </div>
    </div>
    <div class="sp-mb-6">
      <p class="sp-text-body-sm sp-mb-1">任務照片</p>
      <div class="sp-flex">
        <div
          v-for="(i, idx) in taskData.imgUrls"
          :key="idx"
          class="sp-mx-2 sp-rounded-lg sp-overflow-hidden sp-w-[90px] sp-h-[90px]"
        >
          <v-img placeholder="blur" cover :src="i" height="100%" />
        </div>
      </div>
    </div>
    <div
      class="sp-flex sp-items-center sp-justify-center md:sp-justify-start sp-flex-wrap md:sp-flex-nowrap"
    >
      <p class="md:sp-ml-auto sp-mr-3 sp-text-caption sp-text-slate-500">
        <span class="sp-pr-2 sp-mr-1 sp-border-r sp-border-slate-400"
          >刊登時間 {{ fromNow(taskData.publishedAt) }}</span
        >
        {{ taskData.viewerCount }} 人看過
      </p>
      <NuxtLink
        class="sp-w-full md:sp-w-auto sp-mt-2 md:sp-mt-0"
        :to="`/find-task/${taskData.taskId}`"
      >
        <v-btn color="v-purple" class="px-4 sp-w-full">
          <v-icon class="mr-1">mdi-cursor-pointer</v-icon>
          查看詳情</v-btn
        >
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import { MapPinIcon, FireIcon } from "@heroicons/vue/24/solid";

  const { taskData } = defineProps(["taskData"]);
  const { fromNow } = useMoment();
</script>

<style lang="postcss" scoped>
  @import url("@/assets/css/tailwind.css");
  .fireIcon {
    @apply sp-bg-warning sp-rounded-md sp-w-10 sp-h-10;
  }
  .item {
    @apply md:sp-basis-40 sp-px-4 sp-pb-2 md:sp-py-0;
  }
  .tile {
    @apply sp-text-body-sm sp-font-medium sp-text-slate-500 sp-w-16 sp-inline-block sp-mr-1;
  }
</style>
