<template>
  <div
    class="sp-card-wrapper sp-p-3 sp-my-4 sp-bg-white sp-transition-all sp-cursor-pointer sp-w-full sm:sp-w-[150px] hover:sp-shadow-lg hover:-sp-translate-y-1">
    <div class="sp-w-full sp-rounded-lg sp-overflow-hidden">
      <!-- Formal -->
      <!-- <v-img :src="avatar" class="sp-w-full"></v-img> -->
      <!-- -----Test------ -->
      <v-img src="https://source.unsplash.com/random/600x600/?person" class="sp-w-full"></v-img>
    </div>
    <div class="sp-text-h5 sp-text-slate-800 sp-my-2 sp-ml-1">{{ name }}**</div>
    <div class="sp-w-full">
      <StarRating :star-size="20" :rating="rating.overall" :read-only="true" :rounded-corners="true" :padding="2"
        :active-color="['#5658FB']" :active-border-color="['#fff']" :increment="0.1" :fixed-points="1" :animate="true" />
    </div>
  </div>
</template>

<script setup>
const { avatar, name, completedTasks, completionRate, rating } = defineProps({
  name: String,
  avatar: String,
  completedTasks: Number,
  completionRate: Number,
  rating: Object
})
</script>

<style lang="scss" scoped></style>