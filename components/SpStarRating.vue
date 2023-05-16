<template>
  <StarRating :star-size="$attrs.size || 14" :rating="star" :read-only="true" :rounded-corners="true" :padding="1"
    :active-color="['#5658FB']" :active-border-color="['#fff']" :increment="0.1" :fixed-points="1"></StarRating>
</template>

<script setup>
const { star } = defineProps({
  star: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped></style>