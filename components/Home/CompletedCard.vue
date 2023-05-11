<template>
  <div class="caseCard">
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

            <p class="sp-inline-flex sp-whitespace-nowrap">
              <ClockIcon class="sp-w-6 sp-h-6 sp-text-purple" />{{ timeFormat(completedAt) }}
            </p>

            <p class="sp-inline-flex sp-whitespace-nowrap sp-ml-4 hover:sp-text-purple hover:sp-cursor-pointer">
              <MapPinIcon class="sp-w-6 sp-h-6 sp-text-purple" /> {{ location.landmark }}
            </p>
          </div>
        </div>
        <div class="right">
          <span class="sp-text-h3 sp-whitespace-nowrap">
            ${{ salary }} <span class="sp-text-body"> /次</span>
          </span>
        </div>
      </div>

    </v-card>
  </div>
</template>

<script setup>
import IconTime from "@/assets/images/icons/time.svg"
import IconLocation from "@/assets/images/icons/location.svg"
import { ClockIcon, MapPinIcon } from '@heroicons/vue/24/solid'
const { cardData } = defineProps({
  cardData: Object,
})
const { location, title, salary, completedAt } = cardData
// Moment
const { timeFormat } = useMoment()
</script>

<style lang="postcss" scoped>
.caseCard {
  @apply sp-mx-auto sp-w-[90%] sp-p-6 sp-max-w-lg sp-min-w-[420px] sp-mb-4 sp-rounded-2xl sp-shadow-lg
}

.successTag {
  @apply sp-inline-flex sp-items-center sp-rounded-md sp-bg-gray-100 sp-px-4 sp-py-2 sp-text-xs sp-font-medium sp-ml-2
}
</style>