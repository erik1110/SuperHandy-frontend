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
                    <v-btn color="v-orange" type='button' class='button' :disabled="btnDisabled"
                        @click="resetForm">全部清除</v-btn>
                </div>
                <div class="md:sp-flex md:sp-justify-end md:sp-space-x-2">
                    <div v-if="checkTaskId(taskId)" class="md:sp-space-x-2">
                        <v-btn type='button' id='draftDelete' color="v-gray-placeholder" class='button md:sp-w-auto'
                            :disabled="btnDisabled" :loading="btnLoading.draftDelete" @click="openConfirmModal">刪除草稿</v-btn>

                        <v-btn type='submit' id='draftUpdate' color="v-gray-placeholder" class='button md:sp-w-auto'
                            :disabled="btnDisabled" :loading="btnLoading.draftUpdate">更新草稿</v-btn>
                    </div>
                    <div v-else>
                        <v-btn type='submit' id='draftAdd' color="v-gray-placeholder" class='button md:sp-w-auto'
                            :disabled="btnDisabled" :loading="btnLoading.draftAdd">儲存為草稿</v-btn>
                    </div>
                    <v-btn type='button' color="v-purple" class='button md:sp-w-auto' :disabled="btnDisabled"
                        @click="openFeeModal">計算刊登費用</v-btn>
                </div>
            </div>
        </div>
        <div>
            <v-btn color="primary" class="button md:sp-w-auto" @click="fakeData">填入假資料</v-btn>
        </div>
    </v-form>

    <PostTaskFeeModal :loading="btnLoading.published" @aClose="postTaskFeeModal = false" @aSubmit="submit">
    </PostTaskFeeModal>
    <PostTaskModal @close="closeModal" @aDeleteDraft="deleteDraft"></PostTaskModal>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { storeFullOverlay } from "@/stores/storeFullOverlay";
import { storePostTask } from "@/stores/storePostTask";


import { postTaskConfig } from '@/services/postTaskConfig';

import { getAccountPoints } from '@/services/apis/point';
import { executeFetchData } from '@/services/apis/postTask'

const { excuteAsyncFunc, checkTaskId, checkRespStatus } = useSpUtility()
const { validateFormResult } = useFormUtil();
const _storeFullOverlay = storeFullOverlay();
const _storePostTask = storePostTask();
const { logInfo, logError } = useLog()
const { openModal, closeModal, openBtnLoading, closeBtnLoading, openSFeeModal } = storePostTask();
const { userCoin, btnDisabled, btnLoading, postTaskModal, postTaskFeeModal } = storeToRefs(_storePostTask);
const currentRules = ref(postTaskConfig.rules.draft)
const formData = ref({
    salary: 10,
    contactInfo: {},
    location: {}
})
const postTaskForm = ref(null)
const _work = '刊登任務'
let taskId = ''



provide('basic', formData.value)
provide('contactInfo', formData.value.contactInfo)
provide('location', formData.value.location)
provide('hintMsgs', postTaskConfig.hintMsgs)
provide('currentRules', currentRules)



// - loading -
function openLoading (option) {
    _storeFullOverlay.open()
    btnDisabled.value = true
    openBtnLoading(option)
}
function closeLoading () {
    _storeFullOverlay.close()
    btnDisabled.value = false
    closeBtnLoading()
}




// - 刊登費用計算視窗 -
const openFeeModal = async () => {

    //設定現在要使用的表單驗證規則(暫時一律用刊登規則)
    setCurrentRules(postTaskConfig.taskSubmitter.published)
    //進行表單驗證
    const result = await validatePostTaskForm()
    //驗證失敗
    if (!result) return;
    //驗證成功
    const exPlan = exposurePlans.value.find(item => item.title === formData.value.exposurePlan)
    openSFeeModal({
        exposurePlanPoint: exPlan.price,
        salary: formData.value.salary,
        isFromDraft: checkTaskId(taskId)
    })
    logInfo(_work, 'openFeeDialog', feeModalOption)
}


const setCurrentRules = (submitter) => {
    switch (submitter) {
        case postTaskConfig.taskSubmitter.draftAdd:
        case postTaskConfig.taskSubmitter.draftUpdate:
            currentRules.value = postTaskConfig.rules.draft
            break;
        case postTaskConfig.taskSubmitter.published:
        case postTaskConfig.taskSubmitter.publishFromDraft:
            currentRules.value = postTaskConfig.rules.publish
            break;
        default:
            currentRules.value = postTaskConfig.rules.publish
            break;
    }
}
const validatePostTaskForm = async () => {

    //進行表單驗證
    const validate = await validateFormResult(postTaskForm)
    logInfo(_work, 'validatePostTaskForm.Result', validate)
    //驗證成功
    if (validate) {
        return true;
    }
    //驗證失敗
    openModal({
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
        draftAdd: _submitter === postTaskConfig.taskSubmitter.addDraft,
        draftUpdate: _submitter === postTaskConfig.taskSubmitter.updateDraft,
        published: _submitter === postTaskConfig.taskSubmitter.published,
    })
    logInfo(_work, 'submit', event, taskTrans)

    //2.1設定現在要使用的表單驗證規則
    setCurrentRules(_submitter)

    //2.2.表單檢查
    const result = await validatePostTaskForm()
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

        // const response = await executeFetchData(_submitter, data, taskId)
        // logInfo(_work, 'submit.response', response);
        // if (response && checkRespStatus(response)) {
        //     _isShowGoTaskBtn = true
        // } else {
        //     _dialogType = postTaskConfig.dialogType.error
        // }
        // _message = response.message

    } catch (error) {

        _message = '刊登任務失敗'
        _dialogType = postTaskConfig.dialogType.error
        logError(_work, 'submit', { error });

    } finally {

        resetForm()
        closeLoading()
        //excuteAsyncFunc(_work, getAccountPoints, null, (response) => userCoin.value = response.data)
        if (_message) {
            openModal({
                type: _dialogType,
                message: _message,
                isShowGoTaskBtn: _isShowGoTaskBtn
            })
        }

    }
}






const resetForm = () => {
    postTaskForm.value?.reset() //防止postTaskForm null
    formData.value.salary = 10
    // postTaskFeeModal.value = false
    postTaskModal.value = false
}




// - 刪除草稿 -
const openConfirmModal = () => {
    openModal({
        message: '確認要刪除這筆任務草稿?',
        isShowConfirmBtn: true
    })

}
const deleteDraft = async () => {
    openLoading({
        overlay: true,
        draftDelete: true
    })
    // console.log('deleteDraft')
    excuteAsyncFunc(_work, deleteDraftById, taskId, (response) => {
        resetForm()
        closeLoading()
        openModal({
            message: response.message,
            isShowGoTaskBtn: true
        })
    })
    // excuteAsyncFunc(deleteDraftById, taskId, (response) => {
    //     resetForm()
    //     closeLoading()
    //     openModal({
    //         message: response.message,
    //         isShowGoTaskBtn: true
    //     })
    // })
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
    formData.value.title = '測試任務'
    formData.value.category = '到府驅蟲'
    formData.value.description = 'test'
    formData.value.salary = 100
    formData.value.exposurePlan = '一般曝光'
    formData.value.contactInfo.name = 'test'
    formData.value.contactInfo.phone = '0910123456'
    formData.value.contactInfo.email = 'test@gmail.com'
    formData.value.location.city = '台北市'
    formData.value.location.dist = '信義區'
    formData.value.location.address = '信義路一段12號'
}
</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.label {
    @apply sp-text-gray-placeholder sp-font-bold sp-mb-2 sp-inline-block
}

.button {
    @apply sp-px-4 sp-mb-4 sp-w-full md:sp-mb-0
}
</style>