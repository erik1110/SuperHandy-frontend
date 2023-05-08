<template>
  <v-card width="400" elevation="0">
    <v-card-item>
      <v-card-title class="font-weight-bold">
        <!-- <IconSmile /> -->
        <component :is="cardData.icon"></component>
        {{ cardData.title }}
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
const { cardData } = defineProps({
  cardData: Object,
})
const icon = computed(() => cardData.icon)
</script>

<style lang="scss" scoped></style>