<template>
  <div class="sp-card-wrapper caseCard sm:sp-px-6 sm:sp-py-5">
    <v-card min-width="300" elevation="0">
      <div
        class="sp-flex sp-flex-col sm:sp-justify-between sm:sp-items-center sm:sp-flex-row"
      >
        <div class="left sp-basis-2/3">
          <!-- title -->
          <div class="sp-flex sp-items-center sp-mb-2">
            <p class="sp-text-h6 sp-font-bold sm:sp-text-h5">
              {{ title }}
            </p>
            <div class="successTag sp-whitespace-nowrap">已完成</div>
          </div>
          <!-- time & location -->
          <div class="sp-flex sp-flex-col sm:sp-flex-row sp-mb-2 sm:sp-mb-0">
            <p class="cardItem sp-text-body-sm sp-mb-1 sm:sp-mb-0">
              <ClockIcon class="sp-icon-sm sp-mr-1 sp-text-purple" />{{
                completedAt && timeFormat(completedAt)
              }}
            </p>

            <p class="cardItem sp-text-body-sm sm:sp-ml-4">
              <MapPinIcon class="sp-icon-sm sp-mr-1 sp-text-purple" />
              {{ location.address }}
            </p>
          </div>
        </div>
        <div class="right sp-self-end">
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
  @apply sp-w-[90%] sp-max-w-lg sp-min-w-[350px] sp-p-4 sp-mb-4;
}

.successTag {
  @apply sp-inline-flex sp-items-center sp-rounded-md sp-bg-gray-100 sp-px-4 sp-py-2 sp-text-xs sp-font-medium sp-ml-2;
}

.cardItem {
  @apply sp-inline-flex sp-items-center sp-whitespace-nowrap;
}
</style>
