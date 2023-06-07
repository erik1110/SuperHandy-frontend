import { defineStore } from "pinia";
import { postTaskConfig } from '@/services/postTaskConfig';
import { siteConfig } from '@/services/siteConfig';
const _useSpUtility = useSpUtility()
const _useLog = useLog()

export const storePostTask = defineStore("storePostTask", () => {

    //紀錄任務來源狀態
    const currentTaskStatus = ref('')
    const currentTaskStatusIsDraft = computed(()=>{
        return currentTaskStatus && currentTaskStatus.value.toLowerCase() === postTaskConfig.currentTaskStatus.draft
    })
    const currentTaskStatusIsUnpublish =  computed(()=>{
        return currentTaskStatus && currentTaskStatus.value.toLowerCase() === postTaskConfig.currentTaskStatus.unpublished
    })

    //formData
    const formData = ref({
        salary: 10,
    })
    const imgUrls = ref([])
    // const locationData = ref({})
    const contactInfoData = ref({})


    //紀錄曝光方案清單，任務清單，任務說明樣本
    const exposurePlans = ref([])
    const taskCategories = ref([])
    const descriptionTemplateList = ref([])

    //紀錄超人幣和幫手幣
    const userCoin = ref({
        superCoin: 0,
        helperCoin: 0
    })


    //紀錄曝光方案點數
    const exposurePlanPoint = ref(0)


    //按鈕的loading和disabled
    const btnDisabled = ref(true);
    const btnLoading = ref({
        draftAdd: false, //儲存為草稿
        draftUpdate: false, //更新草稿
        draftDelete: false, //刪除草稿
        publishFromDraft: false, //從草稿刊登任務(因為分成兩支API)
        published: false, //直接刊登任務(因為分成兩支API)
        unpublished: false, //下架任務編輯儲存
    })

    function openBtnLoading (option) {
        btnLoading.value.draftAdd = option.draftAdd ?? false;
        btnLoading.value.draftUpdate = option.draftUpdate ?? false;
        btnLoading.value.draftDelete = option.draftDelete ?? false;
        btnLoading.value.publishFromDraft = option.publishFromDraft ?? false;
        btnLoading.value.published = option.published ?? false;
        btnLoading.value.unpublished = option.unpublished ?? false;
    }
    function closeBtnLoading () {
        btnLoading.value.draftAdd = false
        btnLoading.value.draftUpdate = false
        btnLoading.value.draftDelete = false
        btnLoading.value.publishFromDraft = false
        btnLoading.value.published = false
        btnLoading.value.unpublished = false
    }


    //顯示訊息視窗
    const postTaskModal = ref(false);
    const modalOption = ref({
        type: '',
        message: '',
        isShowGoTaskBtn: false,
        isShowConfirmBtn: false,
        confirmCallback: null,
        closeCallback: null
    })
    const openConfirmModal = (text,callback) => {
        if(_useSpUtility.checkIsFunc(callback)){
            openModal({isShowConfirmBtn:true, message:text, confirmCallback:callback})
        }else{
            openModal({isShowConfirmBtn:true, message:text})
        }
    }
    const openInfoModal = (text) => {
        openModal({type:postTaskConfig.dialogType.info, message:text})
    }
    const openErrorModal = (text) => {
        openModal({type:postTaskConfig.dialogType.error, message:text})
    }
    function openModal (option) {
        modalOption.value.type = option.type ?? '';
        modalOption.value.message = option.message ?? '';
        modalOption.value.isShowGoTaskBtn = option.isShowGoTaskBtn ?? false;
        modalOption.value.isShowConfirmBtn = option.isShowConfirmBtn ?? false;
        modalOption.value.confirmCallback = option.confirmCallback ?? null;
        modalOption.value.closeCallback = option.closeCallback ?? null;
        postTaskModal.value = true
    }
    function closeModal () {
        postTaskModal.value = false
        if(_useSpUtility.checkIsFunc(modalOption.value.closeCallback)){
            _useLog.logInfo('execCloseCallback')
            modalOption.value.closeCallback()
        }
    }
    function execConfirmCallback(){
        postTaskModal.value = false
        _useLog.logInfo('execConfirmCallback', modalOption.value.confirmCallback.name)
        if(_useSpUtility.checkIsFunc(modalOption.value.confirmCallback)){
            modalOption.value.confirmCallback()
        }
    }
    function execCloseCallback(){
        postTaskModal.value = false
        _useLog.logInfo('execCloseCallback')
        if(_useSpUtility.checkIsFunc(modalOption.value.closeCallback)){
            modalOption.value.closeCallback()
        }
    }



    //顯示刊登費用計算視窗
    const postTaskFeeModal = ref(false);
    const feeModalOption = ref({
        exposurePlanPoint: 0,
        salary: 0,
        isFromDraft: false
    })
    function openSFeeModal (option) {
        feeModalOption.value.salary = option.salary ?? 0;
        //feeModalOption.value.isFromDraft = option.isFromDraft ?? false;
        postTaskFeeModal.value = true
    }


    return {
        currentTaskStatus,
        currentTaskStatusIsDraft,
        currentTaskStatusIsUnpublish,

        exposurePlans,
        taskCategories,
        descriptionTemplateList,

        formData,
        imgUrls,
        // locationData,
        contactInfoData,

        userCoin,
        exposurePlanPoint,
        btnDisabled,

        btnLoading,
        openBtnLoading,
        closeBtnLoading,

        postTaskModal,
        modalOption,
        openConfirmModal,
        openInfoModal,
        openErrorModal,
        openModal,
        closeModal,
        execConfirmCallback,
        execCloseCallback,

        postTaskFeeModal,
        feeModalOption,
        openSFeeModal
    }
});