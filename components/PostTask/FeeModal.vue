<template>
    <v-dialog v-model="postTaskFeeModal" width="auto" class="fee-dialog">
        <v-card rounded="lg" elevation="0" max-width="600px">
            <v-toolbar color="white" title="刊登費用支付" class="text-center border-b-sm">
                <v-btn icon dark @click="$emit('aClose')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text class="pa-4">
                <table class="w-100 sp-align-middle">
                    <tbody>
                        <tr class="sp-border-b sp-h-12">
                            <td class="sp-text-v-gray-dark sp-font-bold">目前持有超人幣</td>
                            <td class="sp-text-end">{{ userCoin.superCoin }}點</td>
                        </tr>
                        <tr class="sp-border-b sp-h-12">
                            <td class="sp-text-v-gray-dark sp-font-bold">可折抵幫手幣</td>
                            <td>
                                <div class="d-flex align-center justify-end">
                                    <span>{{ helperCoinEstimate }}點</span>
                                    <v-checkbox-btn @update:modelValue="calculateHelperCoin"></v-checkbox-btn>
                                </div>
                            </td>
                        </tr>
                        <tr class="sp-h-12">
                            <td class="sp-text-v-gray-dark sp-font-bold">付款明細</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="pl-4">
                                <table class="w-100 sp-align-middle">
                                    <tbody>
                                        <tr class="sp-h-10">
                                            <td class="sp-text-v-gray-dark">曝光方案</td>
                                            <td class="sp-text-end">{{ exposurePlanPoint }}點</td>
                                        </tr>
                                        <tr class="sp-h-10">
                                            <td class="sp-text-v-gray-dark">預扣薪水</td>
                                            <td class="sp-text-end">{{ feeModalOption.salary }}點</td>
                                        </tr>
                                        <tr class="sp-h-10">
                                            <td class="sp-text-v-gray-dark">折抵幫手幣</td>
                                            <td class="sp-text-end"> - {{ helperCoinConfirm }}點</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr class="bg-v-gray-bg sp-h-12">
                            <td class="sp-font-bold pl-2">總金額</td>
                            <td class="sp-font-bold text-v-orange sp-text-end sp-text-xl pe-2">{{ total }}點</td>
                        </tr>
                        <tr v-if="total === 0" class="sp-border-b sp-h-20">
                            <td class="text-v-orange">
                                <v-icon class="mx-2">mdi-alert-circle</v-icon>超人幣餘額不足，請儲值
                            </td>
                            <td class="sp-text-end">
                                <NuxtLink :to="siteConfig.linkPaths.points.to" target="_blank">
                                    <v-btn color="v-orange" class="rounded-pill">立即儲值</v-btn>
                                </NuxtLink>
                            </td>
                        </tr>
                        <tr v-else class="sp-border-b sp-h-20">
                            <td>
                                <v-checkbox-btn label="我已詳閱點數付款須知"
                                    @update:modelValue="btnDisabled = !$event"></v-checkbox-btn>
                            </td>
                            <td class="sp-text-end">
                                <div v-if="feeModalOption.isFromDraft">
                                    <v-form
                                        @submit.prevent="$emit('aSubmit', $event, { superCoin: total, helperCoin: helperCoinConfirm })">
                                        <v-btn color="v-purple" id="publishFromDraft" type="submit" :loading="loading"
                                            :disabled="btnDisabled">確認刊登</v-btn>
                                    </v-form>
                                </div>
                                <div v-else>
                                    <v-form
                                        @submit.prevent="$emit('aSubmit', $event, { superCoin: total, helperCoin: helperCoinConfirm })">
                                        <v-btn color="v-purple" id="published" type="submit" :loading="loading"
                                            :disabled="btnDisabled">確認刊登</v-btn>
                                    </v-form>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="my-2">
                    <h6 class="mb-2">點數付款須知</h6>
                    <ul class="sp-list-disc pl-5">
                        <li>案主可使用幫手幣來代替超人幣刊登任務，兌換比例為1:1，幫手幣可透過每月任務回饋以及儲值取得。</li>
                        <li>案主設定的任務薪水將於任務刊登時由系統自動從案主的點數帳戶預先扣除，待任務驗收完成後，系統會自動將任務薪水支付給幫手。</li>
                        <li>如果任務超過刊登日無人接案或案主提前終止任務刊登，系統會自動將任務薪水退還到案主的點數帳戶，但案主刊登任務時所支付的曝光方案點數將不予退還。</li>
                        <li>如付款時使用幫手幣折抵，退還點數幣別順序為幫手幣>超人幣，幫手幣退還完畢，才會退還超人幣。</li>
                    </ul>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { siteConfig } from '@/services/siteConfig'
import { storeToRefs } from "pinia";
import { storePostTask } from "~/stores/storePostTask";
const _storePostTask = storePostTask();
const { userCoin, feeModalOption, postTaskFeeModal, exposurePlanPoint } = storeToRefs(_storePostTask);
const { loading } = defineProps(['loading']);
const { isNumber } = useSpUtility()
const btnDisabled = ref(true)


// 計算可折抵的幫手幣金額
const helperCoinEstimate = computed(() => {
    const helperCoin = userCoin.value.helperCoin
    const planPoint = exposurePlanPoint.value
    if (helperCoin && planPoint) {
        return helperCoin >= planPoint ? planPoint : helperCoin
    }
    return 0
})

// 確認要折抵的幫手幣金額
const helperCoinConfirm = ref(0)
function calculateHelperCoin(event) {
    //console.log(event, 'calculateHelperCoin')
    if (event) {
        helperCoinConfirm.value = helperCoinEstimate.value
    } else {
        helperCoinConfirm.value = 0
    }
}

// 計算本次花費總金額
const total = computed(() => {
    //  本次花費的超人幣總金額 = 曝光費用+任務薪水-折抵幫手幣
    const value = Number(exposurePlanPoint.value) + Number(feeModalOption.value.salary) - helperCoinConfirm.value
    return isNumber(value) ? value : 0
})


// Reset
watch(
    () => postTaskFeeModal.value,
    (nV, oV) => {
        if (!nV) {
            btnDisabled.value = true
        }
    }
);
</script>