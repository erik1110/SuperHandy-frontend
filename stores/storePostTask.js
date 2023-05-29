import { defineStore } from "pinia";
import { siteConfig } from '@/services/siteConfig';

export const storePostTask = defineStore("storePostTask", () => {


    //紀錄超人幣和幫手幣
    const userCoin = ref({
        superCoin: 0,
        helperCoin: 0
    })


    //按鈕的loading和disabled
    const btnDisabled = ref(false);
    const btnLoading = ref({
        draftAdd: false,//儲存為草稿
        draftUpdate: false,//更新草稿
        draftDelete: false,//刪除草稿
        published: false//立即刊登
    })

    function openBtnLoading (option) {
        btnLoading.value.draftAdd = option.draftAdd ?? false;
        btnLoading.value.draftUpdate = option.draftUpdate ?? false;
        btnLoading.value.draftDelete = option.draftDelete ?? false;
        btnLoading.value.published = option.published ?? false;
    }
    function closeBtnLoading () {
        btnLoading.value.draftAdd = false
        btnLoading.value.draftUpdate = false
        btnLoading.value.draftDelete = false
        btnLoading.value.published = false
    }


    //顯示訊息視窗
    const postTaskModal = ref(false);
    const modalOption = ref({
        type: '',
        message: '',
        isShowGoTaskBtn: false,
        isShowConfirmBtn: false
    })
    function openModal (option) {
        modalOption.value.type = option.type ?? '';
        modalOption.value.message = option.message ?? '';
        modalOption.value.isShowGoTaskBtn = option.isShowGoTaskBtn ?? false;
        modalOption.value.isShowConfirmBtn = option.isShowConfirmBtn ?? false;
        postTaskModal.value = true
    }
    function closeModal () {
        postTaskModal.value = false
        // if (!modalOption.value.isShowConfirmBtn) {
        //     navigateTo(siteConfig.linkPaths.postTask.to)
        // }
    }


    //顯示刊登費用計算視窗
    const postTaskFeeModal = ref(false);
    const feeModalOption = ref({
        exposurePlanPoint: 0,
        salary: 0,
        isFromDraft: false
    })
    function openSFeeModal (option) {
        feeModalOption.value.exposurePlanPoint = option.exposurePlanPoint ?? 0;
        feeModalOption.value.salary = option.salary ?? 0;
        feeModalOption.value.isFromDraft = option.isFromDraft ?? false;
        postTaskFeeModal.value = true
    }


    return {
        userCoin,

        btnDisabled,

        btnLoading,
        openBtnLoading,
        closeBtnLoading,

        postTaskModal,
        modalOption,
        openModal,
        closeModal,

        postTaskFeeModal,
        feeModalOption,
        openSFeeModal
    }
});