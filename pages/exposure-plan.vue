<template>
  <PostTaskOverlay />
  <v-sheet class="sp-p-5 sm:sp-p-10 sp-h-full" color="primary-lighten">
    <v-container>
      <h1 class="mb-4 sp-text-2xl sp-font-bold">曝光方案</h1>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <!-- 一般曝光 -->
          <ExposurePlanCard :data="planA"></ExposurePlanCard>
        </v-col>
        <v-col cols="12" sm="6" md="3">
           <!-- 限時曝光 -->
          <ExposurePlanCard :data="planB"></ExposurePlanCard>
        </v-col>
        <v-col cols="12" sm="6" md="3">
           <!-- 黃金曝光 -->
          <ExposurePlanCard :data="planC"></ExposurePlanCard>
        </v-col>
        <v-col cols="12" sm="6" md="3">
           <!-- 限時黃金曝光 -->
          <ExposurePlanCard :data="planD"></ExposurePlanCard>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { storeFullOverlay } from "@/stores/storeFullOverlay";
import { getExposurePlan } from '@/services/apis/general';
const { excuteAsyncFunc, promiseAllSettledHanlder} = useSpUtility()
const { logInfo, logError } = useLog()
const _storeFullOverlay = storeFullOverlay();
const _work = '曝光方案'
const planA = ref({ items: [] }) //一般曝光
const planB = ref({ items: [] }) //限時曝光
const planC = ref({ items: [] }) //黃金曝光
const planD = ref({ items: [] }) //限時黃金曝光

const init = () => {

  _storeFullOverlay.open()
  promiseAllSettledHanlder(
    [
      excuteAsyncFunc(_work, getExposurePlan, null, (response) => {
        planA.value = response.data[0]
        planB.value = response.data[1]
        planC.value = response.data[2]
        planD.value = response.data[3]
      })
    ]
    //成功
    , null
    //失敗
    , (error) => {
      logError(_work, { error })
    }
    //finally
    , () => {
      _storeFullOverlay.close()
      logInfo(_work, 'init done')
    }
  )
}
init()

</script>

<style lang="scss" scoped></style>