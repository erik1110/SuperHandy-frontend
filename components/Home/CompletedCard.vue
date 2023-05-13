<template>
  <div class="sp-card-wrapper caseCard">
    <v-card min-width="300" elevation="0">
      <div class="sp-flex sp-justify-between sp-items-center">
        <div class="left sp-basis-2/3">
          <!-- title -->
          <div class="sp-flex sp-items-center sp-mb-2">
            <p class="sp-text-h5">
              {{ title }}
            </p>
            <div class="successTag">已完成</div>
          </div>
          <!-- time & location -->
          <div class="sp-flex">
            <p class="cardItem">
              <ClockIcon class="sp-icon-sm sp-mr-1 sp-text-purple" />{{
                timeFormat(completedAt)
              }}
            </p>

            <p class="cardItem sp-ml-4 hover:sp-text-purple hover:sp-cursor-pointer">
              <MapPinIcon class="sp-icon-sm sp-mr-1 sp-text-purple" />
              {{ location.landmark }}
            </p>
          </div>
        </div>
        <div class="right">
          <span class="sp-text-h4 lg:sp-text-h3 sp-whitespace-nowrap">
            ${{ salary }} <span class="sp-text-body"> /次</span>
          </span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ClockIcon, MapPinIcon } from "@heroicons/vue/24/solid";
const { cardData } = defineProps({
  cardData: Object,
});
const { location, title, salary, completedAt } = cardData;
// Moment
const { timeFormat } = useMoment();
</script>

<style lang="postcss" scoped>
.caseCard {
  @apply sp-w-[90%] sp-max-w-lg sp-min-w-[420px] sp-px-6 sp-py-5 sp-mb-4;
}

.successTag {
  @apply sp-inline-flex sp-items-center sp-rounded-md sp-bg-gray-100 sp-px-4 sp-py-2 sp-text-xs sp-font-medium sp-ml-2;
}

.cardItem {
  @apply sp-inline-flex sp-items-center sp-whitespace-nowrap;
}
</style>
