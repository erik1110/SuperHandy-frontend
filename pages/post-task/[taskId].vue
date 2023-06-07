<template>
    <PostTaskOverlay />
    <v-sheet class="sp-p-5 sm:sp-p-10 sp-h-full" color="primary-lighten">
        <v-sheet max-width="1000" color="transparent" class="sp-mx-auto">
            <h1 class="mb-4 sp-text-2xl sp-font-bold">刊登任務
                <span v-if="currentTaskStatusIsDraft">
                    <v-chip class="ma-1" color="red" text-color="white" size="x-small">草稿編輯</v-chip>
                </span>
                <span v-if="currentTaskStatusIsUnpublish">
                    <v-chip class="ma-1" color="red" text-color="white" size="x-small">下架編輯 : 只能修改 任務說明 、 任務說明照片 與 任務聯絡人
                    </v-chip>
                </span>
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