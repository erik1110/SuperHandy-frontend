<template>
  <div>
    <div class="sp-space-y-4 lg:sp-flex lg:sp-space-x-2 lg:sp-space-y-0">
      <div class=" lg:sp-w-1/2 lg:sp-flex lg:sp-space-x-2">
        <v-select v-model="locationData.city" :rules='currentRules.locationCity' :disabled="currentDisabled.locationCity"
          :items='countyList' item-title='city' item-value='city' label="縣市" clearable>
        </v-select>
        <v-select v-model='locationData.dist' :rules='currentRules.locationDist' :disabled="currentDisabled.locationDist"
          :items='townList' item-title='dist' item-value='dist' :hint='hintLocationDist' :readonly='readonlyLocationDist'
          label="區域" clearable persistent-hint>
        </v-select>
      </div>
      <v-text-field v-model='locationData.address' :rules='currentRules.locationAddress'
        :disabled="currentDisabled.locationAddress" :counter='hintMsgs.counter.locationAddress'
        :hint='hintMsgs.hint.locationAddress' @keypress.enter.prevent clearable />
    </div>
  </div>
</template>
<script setup>
import tw_county from '@/static/tw_county.json'
import tw_town from '@/static/tw_town.json'
import { storeToRefs } from 'pinia'

// - 從pinia取得共用物件 -
import { storeLocation } from "@/stores/storeLocation";
const _storeLocation = storeLocation();
const { locationData } = storeToRefs(_storeLocation);


// - 從父元件接收資料 -
const currentRules = inject('currentRules')
const currentDisabled = inject('currentFieldDisabled')
const hintMsgs = inject('hintMsgs')


// - 縣市處理 -
const hintLocationDist = ref('請先選擇縣市')
const readonlyLocationDist = ref(true)
const countyList = ref(tw_county)
const townList = computed(() => {
  if (!locationData.value.city) {
    hintLocationDist.value = '請先選擇縣市'
    readonlyLocationDist.value = true
  } else {
    hintLocationDist.value = ''
    readonlyLocationDist.value = false
    try {
      const result = tw_town.filter(item => item.city === locationData.value.city)
      return Object.values(result).map(item => item.dist)
    } catch (error) {
      logError(_work, "取得區域選單", { error })
      return []
    }
  }
})

// - 當縣市清空時，同時清空區域 -
watch(() => locationData.value.city, (nV, oV) => {
  if (!oV) return
  if (nV !== oV) {
    clearDist()
  }
})
function clearDist() {
  locationData.value.dist = ''
}


// const townList = ref([])
// 當縣市變更，區域也要清空
// watch(() => data.city, (nV, oV) => {
//     if (nV) {
//         if (nV != oV) {
//             clearDist()
//         }
//         readonlyLocationDist.value = false
//         hintLocationDist.value = ''
//         const result = tw_town.filter(item => item.city === nV)
//         townList.value = Object.values(result).map(item => item.dist)
//     } else {
//         readonlyLocationDist.value = true
//         hintLocationDist.value = '請先選擇縣市'
//         clearDist()
//     }
// })

</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.label {
  @apply sp-text-gray-placeholder sp-font-bold sp-mb-2 sp-inline-block
}
</style>