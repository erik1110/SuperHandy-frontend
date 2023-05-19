<template>
  <DialogModal :dialog="postTaskModal" min-width="300" width="400">
    <h2 class="text-center sp-mb-8 text-red" :class="isErrorMessage ? '' : 'd-none'">錯誤訊息</h2>
    <p class="sp-text-body sp-text-gray-500 sp-mb-4 text-center">
      {{ option?.message }}
    </p>
    <template #actions>

      <div class="text-center sp-mt-8" :class="!option?.isShowSuccessBtn ? 'd-none' : ''">
        <!-- <NuxtLink :to="siteConfig.linkPaths.postTask.to">
          <v-btn color="primary me-4">刊登新的任務</v-btn>
        </NuxtLink> -->
        <!-- <v-btn color="primary me-4" @click="postTaskModal = false">繼續刊登任務</v-btn> -->
        <NuxtLink :to="siteConfig.linkPaths.tasks.to">
          <v-btn color="primary">前往任務管理</v-btn>
        </NuxtLink>
      </div>

      <div class="sp-mt-8" :class="!option?.isShowGoIndexBtn ? 'd-none' : ''">
        <v-btn color="primary" @click="navigateTo(siteConfig.linkPaths.home.to)" block>前往首頁</v-btn>
      </div>

      <div class="text-center sp-mt-8" :class="!option?.isShowConfirmBtn ? 'd-none' : ''">
        <v-btn color="primary me-4" @click="$emit('aDeleteDraft')">確認</v-btn>
        <v-btn color="v-gray-placeholder" @click="postTaskModal = false">取消</v-btn>
      </div>
    </template>
  </DialogModal>
</template>
<script setup>
import { siteConfig } from '@/services/siteConfig'
const postTaskModal = useState("postTaskModal");
const props = defineProps(['option']);
const isErrorMessage = computed(() => {
  return props.option.type === siteConfig.dialogType.error ? true : false
})
</script>