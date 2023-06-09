<template>
  <div class="sp-bg-gray-bg sp-min-h-[calc(100vh-104px)]">
    <PostTaskOverlay />
    <div class="sp-bg-white">
      <!-- 任務標題 -->
      <v-container class="bg-white sp-min-h-[112px]">
        <v-row justify="center">
          <v-col cols="12" xl="10">
            <h1 class="sp-text-h4 md:sp-text-h2 sp-border-l-[12px] sp-border-secondary sp-pl-4 sp-my-4">
              {{ taskData.title }}
            </h1>
            <p class="sp-text-end sp-text-caption sp-text-slate-500 sp-me-4">
              <span class="sp-pr-2 sp-mr-1 sp-border-r sp-border-slate-400">刊登時間&nbsp;{{ fromNow(taskData.publishedAt)
              }}</span>&nbsp;目前有&nbsp;{{ taskData.helperCount }}&nbsp;人應徵
            </p>
          </v-col>
        </v-row>
      </v-container>
      <!-- 提示訊息 -->
      <v-alert v-if="alertMessage" :color="alertMessageColor" variant="tonal" class="text-center">
        <v-icon v-if="isApplyTaskSuccess">mdi-check-circle</v-icon>
        <v-icon v-else>mdi-alert-circle</v-icon>
        {{ alertMessage }}
      </v-alert>
    </div>
    <!-- 任務內容 start -->
    <v-container>
      <v-row justify="center">
        <v-col cols="12" xl="10">
          <div class="lg:sp-flex">
            <div class="sp-mb-3">

              <!-- 左邊案主資訊 -->
              <FindTaskDetailPosterInfo :posterInfoData="posterInfoData"></FindTaskDetailPosterInfo>

            </div>
            <div class="sp-flex-auto">

              <!-- 右邊任務資訊 -->
              <FindTaskDetailCard :taskData="taskData" :btnSubmitLoading="btnSubmitLoading"
                :btnSubmitDisabled="btnSubmitDisabled" @aApply="apply">
              </FindTaskDetailCard>

            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- 任務內容 end -->
  </div>
</template>

<script setup>
import { storeFullOverlay } from '@/stores/storeFullOverlay'
import { getTasksDetail, getTasksDetailByAuth, postApplyTask } from '@/services/apis/findTasks'
import { siteConfig } from '@/services/siteConfig'

const { checkRespStatus, checkTaskId, checkIsLogin, getTaskId } = useSpUtility()
const { logDebug, logError } = useLog();
const { fromNow } = useMoment();
const taskData = ref({
  imgUrls: []
});
const posterInfoData = ref({});
const _storeFullOverlay = storeFullOverlay()
const isApplyTaskSuccess = ref(false)
const btnSubmitLoading = ref(false);
const btnSubmitDisabled = ref(false);
const _work = '任務詳情'
let taskId = ''
const alertColors = {
  success: 'deep-purple-accent-4',
  fail: 'error',
  warn: 'amber-darken-4'
}
const alertMessage = ref('');
const alertMessageColor = ref('')


// - 我要接案 -
const apply = async () => {
  if (!checkIsLogin()) {
    navigateTo(siteConfig.linkPaths.login.to)
  }
  try {
    logDebug(_work, 'apply.taskId', taskId)
    if (!checkTaskId(taskId)) {
      alertMessage.value = "任務編號不正確"
      alertMessageColor.value = alertColors.fail
      return;
    }

    _storeFullOverlay.open()
    btnSubmitLoading.value = true
    btnSubmitDisabled.value = true

    const response = await postApplyTask(taskId);
    if (response && !checkRespStatus(response)) {
      alertMessage.value = response.message
      alertMessageColor.value = alertColors.fail
      return;
    }
    isApplyTaskSuccess.value = true
    alertMessage.value = `接案申請已成功送出，${response.message}`
    alertMessageColor.value = alertColors.success

  } catch (error) {
    logError(_work, { error })
    alertMessage.value = "接收任務失敗"
    alertMessageColor.value = alertColors.fail
  } finally {
    _storeFullOverlay.close()
    btnSubmitLoading.value = false
    btnSubmitDisabled.value = isApplyTaskSuccess.value
  }

}


// - 取得初始化資料 -
const init = async () => {
  try {
    taskId = getTaskId()
    logDebug(_work, 'init.taskId', taskId)
    if (!checkTaskId(taskId)) {
      alertMessage.value = "任務編號不正確"
      alertMessageColor.value = alertColors.fail
      return;
    }

    _storeFullOverlay.open()
    btnSubmitDisabled.value = true

    let response = null;
    if (checkIsLogin) {
      response = await getTasksDetailByAuth(taskId);
    } else {
      response = await getTasksDetail(taskId);
    }

    if (response && !checkRespStatus(response)) {
      response = await getTasksDetail(taskId);
      return;
    }

    taskData.value = response.data;
    posterInfoData.value = response.data.posterInfo;
    if (response.data.relation !== null) {
      btnSubmitDisabled.value = true
      alertMessageColor.value = alertColors.warn
      if (response.data.relation === 'poster') {
        alertMessage.value = '無法應徵自己的任務'
      }
      if (response.data.relation === 'helper') {
        alertMessage.value = '已經應徵過此任務'
      }
      return;
    }

    isApplyTaskSuccess.value = false
    btnSubmitDisabled.value = false

  } catch (error) {
    logError(_work, { error })
    alertMessage.value = "取得任務內容失敗"
    alertMessageColor.value = alertColors.fail
  } finally {
    _storeFullOverlay.close()
  }

};
init();

</script>
<style lang="postcss" scoped></style>
