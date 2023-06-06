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
            <div v-if="!taskData.imgUrls" class="sp-text-body-sm sp-whitespace-pre-line sp-text-gray-placeholder">
                無提供照片
            </div>
            <FindTaskDetailImages v-else :imgUrls="taskData.imgUrls"></FindTaskDetailImages>
        </div>
        <div class="sp-mt-8 sp-space-y-4 sm:sp-flex sm:sp-space-x-4 sm:sp-space-y-0 sm:sp-justify-between">
            <NuxtLink :to="siteConfig.linkPaths.findTasksList.to">
                <v-btn class="px-4 sp-w-full" color="v-gray-placeholder">回到任務列表</v-btn>
            </NuxtLink>
            <div>
                <v-btn color="v-purple" class="px-4 sp-w-full" @click="$emit('aApply')" :loading="btnSubmitLoading"
                    :disabled="btnSubmitDisabled">
                    <v-icon class="mr-1">mdi-cursor-pointer</v-icon>我要接案
                </v-btn>
            </div>

        </div>
    </div>
</template>

<script setup>
import { siteConfig } from "@/services/siteConfig";
import { FireIcon } from "@heroicons/vue/24/solid";
// const isApplyTaskSuccess = useState('isApplyTaskSuccess')
const { taskData, btnSubmitLoading, btnSubmitDisabled } = defineProps(["taskData", 'btnSubmitLoading', 'btnSubmitDisabled']);
</script>

<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.fireIcon {
    @apply sp-bg-warning sp-rounded-md sp-w-10 sp-h-10;
}

.title {
    @apply sp-text-gray-placeholder sp-font-bold sp-whitespace-nowrap
}
</style>
