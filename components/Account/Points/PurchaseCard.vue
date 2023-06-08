<template>
    <div
        class="sp-px-8 sp-py-12 sp-border-primary-lighten sp-border-2 sp-bg-white sp-rounded-lg sp-text-primary sp-text-center sp-h-full">
        <div class="">
            <div class="sp-flex sp-items-center sp-justify-center sp-pb-4">
                <span class="">儲值</span>
                <span class="sp-text-5xl sp-font-bold">&nbsp;{{ data.superCoin }}&nbsp;</span>
                <span class="">/&nbsp;超人幣</span>
            </div>
            <div v-if="data.bonus"
                class="sp-bg-red-50 sp-py-2 sp-text-red-600 sp-inline-block sp-px-10 lg:sp-block lg:sp-px-0">
                <span class="mdi mdi-gift-outline me-2"></span>
                贈送&nbsp;{{ data.bonus }}&nbsp;超人幣
            </div>
            <div v-else class="sp-h-10"></div>
            <div class="sp-py-8">NT$ {{ data.price }}</div>
        </div>
        <div class="">
            <v-btn color="primary" outline @click="$emit('openPurchaseModal', data.price)">立刻儲值去</v-btn>
        </div>
    </div>
</template>
<script setup>
const { data } = defineProps(['data'])
</script>