<template>
    <PostTaskOverlay />
    <v-sheet class="sp-p-5 sm:sp-p-10 sp-h-full" color="primary-lighten">
        <v-sheet max-width="1000" color="transparent" class="sp-mx-auto">
            <h1 class="mb-4 sp-text-2xl sp-font-bold sm:sp-flex sm:sp-items-center">
                <p class="sp-me-2">刊登任務</p>
                <p v-if="currentTaskStatusIsDraft" class="chip-red sp-py-1 sp-px-3 sp-mt-2 sm:sp-mt-0">
                    <span class="mdi mdi-alert-circle me-1"></span>草稿編輯
                </p>
                <p v-if="currentTaskStatusIsUnpublish" class="chip-red sp-py-1 sp-px-3 sp-mt-2 sm:sp-mt-0">
                    <span class="mdi mdi-alert-circle me-1"></span>
                    下架編輯 : 只能修改 任務說明 、 任務說明照片 與 任務聯絡人
                </p>
            </h1>
            <v-card class="mb-4 py-4 px-6" rounded="lg" elevation="0">
                <SecTitle :text="'任務內容'"></SecTitle>

                <PostTaskForm />

            </v-card>
        </v-sheet>
    </v-sheet>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { storePostTask } from '@/stores/storePostTask'
const _storePostTask = storePostTask()
const { currentTaskStatusIsDraft, currentTaskStatusIsUnpublish } = storeToRefs(_storePostTask)
</script>
<style scoped>
.chip-red {
    background-color: rgba(244, 67, 54, 0.12);
    color: rgb(244, 67, 54);
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 400;
    display: inline-block;
    line-height: 1.5;
}
</style>