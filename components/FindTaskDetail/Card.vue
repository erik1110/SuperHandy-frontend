<template>
    <div class="sp-card-wrapper sp-bg-white sp-p-6 sp-relative">
        <div v-if="taskData.isUrgent" class="fireIcon sp-flex-center sp-flex-col sp-absolute sp-right-6">
            <FireIcon class="sp-icon-md sp-text-white" />
            <p class="sp-text-caption sp-text-white">急件</p>
        </div>
        <div class="sp-mb-4 md:sp-flex md:sp-space-x-6">
            <p class="title sp-mb-1">任務類型</p>
            <div class="sp-whitespace-pre-line sp-text-gray-placeholder">
                {{ taskData.category }}
            </div>
        </div>
        <div class="sp-mb-4 md:sp-flex md:sp-space-x-6">
            <p class="title sp-mb-1">任務薪水</p>
            <div class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder" v-if="taskData.salary">
                {{ taskData.salary }} 點 超人幣
            </div>
        </div>
        <div class="sp-mb-4 md:sp-flex md:sp-space-x-6">
            <p class="title sp-mb-1">任務地點</p>
            <div class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder">
                {{ taskData.address }}
            </div>
        </div>
        <div class="sp-mb-4 md:sp-flex md:sp-space-x-6">
            <p class="title sp-mb-1">任務說明</p>
            <div class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder">
                {{ taskData.description }}
            </div>
        </div>
        <div class="sp-mb-6">
            <p class="title sp-mb-2">任務照片</p>
            <v-container class="sp-flex">
                <!-- <div v-for="(i, idx) in 5" :key="idx"
                    class="sp-me-2 sp-rounded-lg sp-overflow-hidden sp-w-[90px] sp-h-[90px]">
                    <v-img cover
                        src="https://images.unsplash.com/photo-1683656017639-bc622715c153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
                </div> -->
            </v-container>
        </div>
        <div class="md:sp-flex md:sp-items-center text-center">
            <p class="sp-ml-auto sp-mr-3 sp-text-caption sp-text-slate-500 sp-mb-3 md:sp-mb-0">
                <span class="sp-pr-2 sp-mr-1 sp-border-r sp-border-slate-400">刊登時間{{ fromNow(taskData.publishedAt) }}</span>
                {{ taskData.viewerCount }}人詢問
            </p>
            <v-btn color="v-purple" class="px-4" @click="$emit('aApply')" :loading="loading">
                <v-icon class="mr-1">mdi-cursor-pointer</v-icon>我要接案
            </v-btn>
        </div>
    </div>
</template>

<script setup>
import { FireIcon } from "@heroicons/vue/24/solid";

const { taskData, loading } = defineProps(["taskData", 'loading']);
const { fromNow } = useMoment();
</script>

<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.fireIcon {
    @apply sp-bg-warning sp-rounded-md sp-w-10 sp-h-10;
}

.title {
    @apply sp-text-gray-placeholder sp-font-bold
}
</style>
