<template>
  <div
    class="sp-card-wrapper sp-p-3 sp-my-4 sp-bg-white sp-transition-all sp-cursor-pointer sp-w-full sm:sp-w-[150px] hover:sp-shadow-lg hover:-sp-translate-y-1"
  >
    <div class="sp-w-full sp-min-h-[150px] sp-rounded-lg sp-overflow-hidden">
      <!-- Formal -->
      <v-img
        :src="avatar"
        cover
        class="sp-w-full sp-h-full"
        aspect-ratio="1"
      ></v-img>
    </div>
    <div class="sp-text-h5 sp-text-slate-800 sp-my-2 sp-ml-1">
      {{ lastName }}**
    </div>
    <div class="sp-w-full sp-flex sp-items-center">
      <v-rating
        v-model="rating.overall"
        class="ma-2"
        density="compact"
        size="small"
        color="v-purple"
        half-increments
      ></v-rating>
      {{ rating.overall }}
    </div>
  </div>
</template>

<script setup>
const { avatar, lastName, completedTasks, completionRate, rating } =
  defineProps({
    lastName: String,
    avatar: String,
    completedTasks: Number,
    completionRate: Number,
    rating: Object,
  });
</script>

<style lang="scss" scoped></style>
