<template>
  <div>
    <v-overlay v-model="loading" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!message" class="bg-white sp-min-h-[112px]">
      <h1 class="sp-text-h4 md:sp-text-h2 sp-border-l-[12px] sp-border-secondary sp-pl-4 sp-my-4">
        {{ taskData.title }}
      </h1>
    </v-container>
    <v-alert v-else :color="isSuccess ? 'deep-purple-accent-4' : 'error'" variant="tonal" class="text-center" closable>
      <v-icon v-if="isSuccess">mdi-check-circle</v-icon>
      <v-icon v-else>mdi-alert-circle</v-icon>
      {{ message }}
    </v-alert>
    <div class="sp-bg-gray-bg sp-pt-4 sp-min-h-[calc(100vh-162px)]">
      <v-container class="lg:sp-flex">
        <div class="sp-mb-3">
          <FindTaskDetailPosterInfo :posterInfoData="posterInfoData"></FindTaskDetailPosterInfo>
        </div>
        <div class="sp-flex-auto">
          <FindTaskDetailCard :taskData="taskData" :loading="loading" @aApply="apply">
          </FindTaskDetailCard>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { getTasksDetail, postApplyTask } from '@/services/apis/findTasks'
import { siteConfig } from '@/services/siteConfig'
const { checkRespStatus, checkTaskId, checkIsLogin } = useSpUtility()
const { logInfo, logError } = useLog();
const taskData = ref({});
const posterInfoData = ref({});
const message = ref('');
const isSuccess = ref(false);
const loading = ref(false);
const _work = '任務詳情'
let taskId = ''


const apply = async () => {
  if (!checkIsLogin()) {
    message.value = '請先登入'
    navigateTo(siteConfig.linkPaths.login.to)
  }
  try {
    if (!checkTaskId(taskId)) {
      message.value = "任務編號不正確"
      return;
    }
    loading.value = true
    const response = await postApplyTask(taskId);
    if (response && !checkRespStatus(response)) {
      message.value = response.message
      return;
    }
    isSuccess.value = true
    message.value = `接案申請已成功送出，${response.message}`
  } catch (error) {
    logError(_work, { error })
    message.value = "接收任務失敗"
  } finally {
    loading.value = false
  }

}

const init = async () => {
  try {
    const route = useRoute();
    taskId = route.params.taskId
    logInfo(_work, 'taskId', taskId)
    if (!checkTaskId(taskId)) {
      message.value = "任務編號不正確"
      return;
    }
    loading.value = true
    const response = await getTasksDetail(taskId);
    if (response && !checkRespStatus(response)) {
      message.value = response.message
      return;
    }
    taskData.value = response.data;
    posterInfoData.value = response.data.posterInfo;

  } catch (error) {
    logError(_work, { error })
    message.value = "取得任務內容失敗"
  } finally {
    loading.value = false
  }

};
init();

</script>
<style lang="postcss" scoped></style>
