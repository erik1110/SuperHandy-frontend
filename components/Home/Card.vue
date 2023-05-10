<template>
  <v-card max-width="400" min-width="300" elevation="0">
    <v-card-item>
      <v-card-title class="font-weight-bold d-flex align-center">
        <!-- <IconSmile /> -->
        <component :is="icons[cardData.icon]" class="sp-mr-1"></component>
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
import IconSmile from "@/assets/images/icons/smile.svg"
import IconRocket from "@/assets/images/icons/rocket.svg"
import IconSafe from "@/assets/images/icons/safe.svg"
const { cardData } = defineProps({
  cardData: Object,
})
const icons = ref({
  IconSmile,
  IconRocket,
  IconSafe
})
</script>

<style lang="scss" scoped></style>