<template>
  <v-card max-width="320" min-width="320" elevation="0">
    <v-card-item>
      <v-card-title class="font-weight-bold d-flex align-center">
        <!-- <IconSmile /> -->
        <component
          :is="icons[cardData.icon]"
          class="sp-icon-sm sp-mr-2 sp-text-primary"
        ></component>
        <div>
          {{ cardData.title }}
        </div>
      </v-card-title>
    </v-card-item>

    <v-card-text>
      {{ cardData.desc }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/vue/24/solid";
const { cardData } = defineProps({
  cardData: Object,
});
const icons = shallowRef({
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
});
</script>

<style lang="scss" scoped></style>
