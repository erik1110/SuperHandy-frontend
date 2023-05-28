import { defineStore } from "pinia";
import { siteConfig } from '@/services/siteConfig';

export const storePostTask = defineStore("storePostTask", () => {


    const userCoin = ref({
        superCoin: 0,
        helperCoin: 0
    })


    const btnDisabled = ref(false);
    const draftAddBtnloading = ref(false);//儲存為草稿
    const draftUpdateBtnloading = ref(false);//更新草稿
    const draftDeleteBtnloading = ref(false);//刪除草稿
    const publishBtnloading = ref(false);//立即刊登

    function openBtnLoading ({
        draftAdd,
        draftUpdate,
        draftDelete,
        publishBtn
    }) {
        draftAddBtnloading.value = draftAdd ?? false;
        draftUpdateBtnloading.value = draftUpdate ?? false;
        draftDeleteBtnloading.value = draftDelete ?? false;
        publishBtnloading.value = publishBtn ?? false;
    }
    function closeBtnLoading () {
        draftDeleteBtnloading.value = false
        draftAddBtnloading.value = false
        draftUpdateBtnloading.value = false
        publishBtnloading.value = false
    }


    const postTaskModal = ref(false);
    const modalOption = ref({
        type: '',
        message: '',
        isShowGoTaskBtn: false,
        isShowConfirmBtn: false
    })
    function openModal (option) {
        const _option = {
            type: option.type ?? '',
            message: option.message ?? '',
            isShowGoTaskBtn: option.isShowGoTaskBtn ?? false,
            isShowConfirmBtn: option.isShowConfirmBtn ?? false,
        }

        modalOption.value.type = _option.type
        modalOption.value.message = _option.message
        modalOption.value.isShowGoTaskBtn = _option.isShowGoTaskBtn
        modalOption.value.isShowConfirmBtn = _option.isShowConfirmBtn
        postTaskModal.value = true

    }
    function closeModal () {
        postTaskModal.value = false
        if (!modalOption.value.isShowConfirmBtn) {
            navigateTo(siteConfig.linkPaths.postTask.to)
        }
    }

    return {
        userCoin,
        btnDisabled,
        draftAddBtnloading,
        draftUpdateBtnloading,
        draftDeleteBtnloading,
        publishBtnloading,

        openBtnLoading,
        closeBtnLoading,

        openModal,
        closeModal
    }
});