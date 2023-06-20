<template>
  <div class="sp-mx-auto sp-px-2 sp-min-w-[220px] sp-max-w-[250px]">
    <div
      @click="goDetail"
      class="sp-card-wrapper sp-p-3 sp-mt-3 sp-mb-2 sm:sp-mb-3 sp-bg-white sp-transition-all sp-cursor-pointer hover:sp-bg-gray-bg"
    >
      <div class="sp-rounded-lg sp-overflow-hidden">
        <!-- Formal -->
        <v-img :src="imgUrls" cover :height="150"></v-img>
      </div>
      <div
        class="sp-text-body sp-font-medium sp-text-slate-800 sp-my-2 sp-ml-1"
      >
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script setup>
const { taskId, title, imgUrls } = defineProps({
  taskId: String,
  title: String,
  imgUrls: String,
});
const goDetail = () => {
  navigateTo(`/find-task/${taskId}`);
};
</script>

<style lang="scss" scoped></style>
