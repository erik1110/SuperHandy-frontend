<template>
  <DialogModal :dialog="postTaskModal" max-width="500">
    <h2 class="text-center sp-mb-8 text-red" :class="modalOption.type === 'error' ? '' : 'd-none'">錯誤訊息</h2>
    <p class="sp-text-body sp-text-gray-500 sp-mb-4 text-center">
      {{ modalOption.message }}
    </p>
    <template #actions>

      <div class="text-center sp-mt-8" :class="modalOption.isShowGoTaskBtn ? '' : 'd-none'">
        <NuxtLink :to="siteConfig.linkPaths.tasks.to">
          <v-btn color="primary" @click="postTaskModal = false">前往任務管理</v-btn>
        </NuxtLink>
      </div>

      <div class="text-center sp-mt-8" :class="modalOption.isShowConfirmBtn ? '' : 'd-none'">
        <v-btn color="primary me-4" @click="$emit('aDeleteDraft')">確認</v-btn>
        <v-btn color="v-gray-placeholder" @click="postTaskModal = false">取消</v-btn>
      </div>

    </template>
  </DialogModal>
</template>
<script setup>
import { siteConfig } from "@/services/siteConfig";
import { storeToRefs } from "pinia";
import { storePostTask } from "@/stores/storePostTask";
const _storePostTask = storePostTask();
const { modalOption, postTaskModal } = storeToRefs(_storePostTask);
</script>