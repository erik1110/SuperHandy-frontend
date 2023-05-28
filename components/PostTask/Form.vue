<template>
    <v-form @submit.prevent="submit" ref="postTaskForm" validate-on="blur">
        <PostTaskBasic />

        <div class='mt-4'>
            <label class='label'>任務說明照片(非必填)</label>
            <UploadImage></UploadImage>
        </div>

        <v-divider class="border-opacity-100 my-8"></v-divider>
        <SecTitle :text="'任務聯絡人'"></SecTitle>

        <PostTaskContactInfo />

        <div class='mt-4'>
            <PostTaskLocation />
        </div>

        <div class='my-8'>
            <div :class="!checkTaskId(taskId) ? 'md:sp-flex md:sp-justify-between' : 'md:sp-flex md:sp-justify-end'">
                <div v-if="!checkTaskId(taskId)">
                    <v-btn color="v-orange" type='button' class='sp-mb-4 sp-w-full md:sp-mb-0' :disabled="btnDisabled"
                        @click="resetForm">全部清除</v-btn>
                </div>
                <div class="md:sp-flex md:sp-justify-end md:sp-space-x-2">
                    <div v-if="checkTaskId(taskId)" class="md:sp-space-x-2">
                        <v-btn type='button' id='deleteDraft' color="v-gray-placeholder"
                            class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto' :disabled="btnDisabled"
                            :loading="draftDeleteBtnloading" @click="openConfirmModal">刪除草稿</v-btn>

                        <v-btn type='submit' id='updateDraft' color="v-gray-placeholder"
                            class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto' :disabled="btnDisabled"
                            :loading="draftUpdateBtnloading">更新草稿</v-btn>
                    </div>
                    <div v-else>
                        <v-btn type='submit' id='addDraft' color="v-gray-placeholder"
                            class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto' :disabled="btnDisabled"
                            :loading="draftAddBtnloading">儲存為草稿</v-btn>
                    </div>
                    <v-btn type='button' color="v-purple" class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto'
                        :disabled="btnDisabled" @click="openFeeModal">計算刊登費用</v-btn>
                </div>
            </div>
        </div>
        <div>
            <v-btn color="primary" @click="fakeData">填入假資料</v-btn>
        </div>
    </v-form>

    <PostTaskFeeModal :option="feeModalOption" :loading="publishBtnloading" @aClose="postTaskFeeModal = false"
        @aSubmit="submit">
    </PostTaskFeeModal>
    <PostTaskModal :option="modalOption" @close="closeModal" @aDeleteDraft="deleteDraft">
    </PostTaskModal>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { storeFullOverlay } from "@/stores/storeFullOverlay";
import { storePostTask } from "@/stores/storePostTask";


import { postTaskConfig } from '@/services/postTaskConfig';

import { getAccountPoints } from '@/services/apis/point';
import { executeFetchData } from '@/services/apis/postTask'

const { excuteAsyncFunc, checkTaskId, checkRespStatus } = useSpUtility()
const _storeFullOverlay = storeFullOverlay();
const _storePostTask = storePostTask();
const { logInfo, logError } = useLog()
const { userCoin, btnDisabled, draftAddBtnloading, draftUpdateBtnloading, draftDeleteBtnloading, publishBtnloading } = storeToRefs(_storePostTask);
const currentRules = ref(postTaskConfig.rules.draft)
const formData = ref({
    contactInfo: {},
    location: {}
})
const _work = '刊登任務'
let taskId = ''



provide('basic', formData.value)
provide('contactInfo', formData.value.contactInfo)
provide('location', formData.value.location)
provide('hintMsgs', postTaskConfig.hintMsgs)
provide('currentRules', currentRules)



// - loading -
function openLoading ({
    draftAdd,
    draftUpdate,
    draftDelete,
    publishBtn
}) {
    _storeFullOverlay.open()
    btnDisabled.value = true
    _storePostTask.openBtnLoading()
}
function closeLoading () {
    _storeFullOverlay.close()
    btnDisabled.value = false
    _storePostTask.closeBtnLoading()
}




// - 刊登費用計算視窗 -
const postTaskFeeModal = useState("postTaskFeeModal", () => ref(false));
const feeModalOption = ref({
    exposurePlanPoint: 0,
    salary: 0,
    isDraft: false
})
const openFeeModal = async () => {
    const result = await validatePostTaskForm(postTaskConfig.taskStatus.published)
    if (!result) return;
    // const exPlan = exposurePlans.value.find(item => item.title === exposurePlan.value)
    // feeModalOption.value.exposurePlanPoint = exPlan.price
    feeModalOption.value.salary = formData.value.salary
    feeModalOption.value.isDraft = checkTaskId(taskId)
    postTaskFeeModal.value = true
    logInfo(_work, 'openFeeDialog', feeModalOption)
}

const validatePostTaskForm = async (status) => {

    switch (status) {
        case postTaskConfig.taskStatus.addDraft:
        case postTaskConfig.taskStatus.updateDraft:
            // case postTaskConfig.taskStatus.deleteDraft:
            currentRules.value = postTaskConfig.rules.draft
            break;
        case postTaskConfig.taskStatus.published:
        case postTaskConfig.taskStatus.publishFromDraft:
            currentRules.value = postTaskConfig.rules.publish
            break;
        default:
            currentRules.value = postTaskConfig.rules.publish
            break;
    }

    const validate = await validateFormResult(postTaskForm)
    logInfo(_work, 'validatePostTaskForm', validate)
    if (validate) {
        return true;
    }
    _storePostTask.op({
        type: postTaskConfig.dialogType.error,
        message: '表單驗證還沒有完成',
    })
    return false;
}
const submit = async (event, taskTrans) => {

    let _message = ''
    let _dialogType = postTaskConfig.dialogType.info
    let _isShowGoTaskBtn = false

    //1. 開啟loading & disable btns
    const _submitter = event.submitter.id
    openLoading({
        draftAdd: _submitter === postTaskConfig.taskStatus.addDraft,
        draftUpdate: _submitter === postTaskConfig.taskStatus.updateDraft,
        publishBtn: _submitter === postTaskConfig.taskStatus.published,
    })
    logInfo(_work, 'submit', event, taskTrans)


    // 2.表單檢查
    const result = await validatePostTaskForm(_submitter)
    if (!result) {
        closeLoading()
        return;
    }

    //3. 更新資料
    //4. 關閉loading & reset form
    try {
        const data = {
            ...fromData
        }
        if (taskTrans) {
            data.taskTrans = {
                superCoin: taskTrans.superCoin,
                helperCoin: taskTrans.helperCoin
            }
        }

        const response = await executeFetchData(_submitter, data, taskId)
        logInfo(_work, 'submit.response', response);
        if (response && checkRespStatus(response)) {
            _isShowGoTaskBtn = true
        } else {
            _dialogType = postTaskConfig.dialogType.error
        }
        _message = response.message

    } catch (error) {

        _message = '刊登任務失敗'
        _dialogType = postTaskConfig.dialogType.error
        logError(_work, 'submit', { error });

    } finally {

        resetForm()
        closeLoading()
        excuteAsyncFunc(_work, getAccountPoints, null, (response) => userCoin.value = response.data)
        if (_message) {
            _storePostTask.op({
                type: _dialogType,
                message: _message,
                isShowGoTaskBtn: _isShowGoTaskBtn
            })
        }

    }
}






const resetForm = () => {
    postTaskForm.value?.reset() //防止postTaskForm null
    //.salary?.value = 10
    postTaskFeeModal.value = false
    postTaskModal.value = false
}




// - 刪除草稿 -
const openConfirmModal = () => {
    _storePostTask.op({
        message: '確認要刪除這筆任務草稿?',
        isShowConfirmBtn: true
    })

}
const deleteDraft = () => {
    openLoading({
        overlay: true,
        draftDelete: true
    })
    // console.log('deleteDraft')
    excuteAsyncFunc(deleteDraftById, taskId, (response) => {
        resetForm()
        closeLoading()
        _storePostTask.op({
            message: response.message,
            isShowGoTaskBtn: true
        })
    })
}




// Init
const Init = () => {
    // - 取得草稿資料 -
    const route = useRoute();
    taskId = route.params.taskId
    //logInfo(taskId, 'taskId')
    logInfo(_work, checkTaskId(taskId), 'check.taskId')
    if (checkTaskId(taskId)) {
        excuteAsyncFunc(_work, getDraftById, taskId, (response) => formDtata.value = response.data)
    }
}
Init();




// - 假資料 -
function fakeData () {
    data.title = '測試任務'
    data.category = '到府驅蟲'
    data.description = 'test'
    data.salary = 100
    data.exposurePlan = '一般曝光'
    data.contactInfo.name = 'test'
    data.contactInfo.phone = '0910123456'
    data.contactInfo.email = 'test@gmail.com'
    data.location.city = '台北市'
    data.location.dist = '信義區'
    data.location.address = '信義路一段12號'
}
</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.label {
    @apply sp-text-gray-placeholder sp-font-bold sp-mb-2 sp-inline-block
}
</style>