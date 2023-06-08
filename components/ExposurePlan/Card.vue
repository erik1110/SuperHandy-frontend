<template>
    <div
        class="sp-py-8 sp-px-3 sp-border-gray-300 sp-border sp-bg-white sp-rounded-lg hover:sp-shadow-lg hover:-sp-translate-y-1 hover:sp-bg-gray-50">
        <div class="sp-text-center sp-border-b-2 sp-pb-3">
            <p class="sp-text-lg sp-font-bold sp-mb-3">{{ data.title }}</p>
            <p v-if="data.price" class="sp-text-purple sp-flex sp-items-center sp-justify-center">
                <span class="sp-text-5xl sp-font-bold">{{ data.price }}</span>
                <span>&nbsp;/超人幣</span>
            </p>
        </div>
        <div class="sp-flex sp-justify-center sp-py-3">
            <div class="sp-inline-block sp-text-gray-placeholder">
                <p v-for="(item, index) in data.items" :key="index" class="sp-pb-1">
                    <span class="mdi mdi-check-circle-outline sp-text-orange-500 sp-me-2 sp-text-lg"></span>
                    <span class="">{{ item }}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
const { data } = defineProps(['data'])
</script>