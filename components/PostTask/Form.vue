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
            <div v-if="currentTaskStatusIsUnpublish">
                <v-btn type='submit' id='unpublished' color="v-gray-placeholder" class='button md:sp-w-auto'
                    :disabled="btnDisabled" :loading="btnLoading.unpublished">儲存任務</v-btn>
            </div>
            <div v-else
                :class="!currentTaskStatusIsDraft ? 'md:sp-flex md:sp-justify-between' : 'md:sp-flex md:sp-justify-end'">
                <div v-if="!currentTaskStatusIsDraft">
                    <v-btn color="v-orange" type='button' class='button' :disabled="btnDisabled"
                        @click="resetForm">全部清除</v-btn>
                </div>
                <div class="md:sp-flex md:sp-justify-end md:sp-space-x-2">
                    <div v-if="currentTaskStatusIsDraft" class="md:sp-space-x-2">
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
            <v-btn v-if="!currentTaskStatusIsDraft && !currentTaskStatusIsUnpublish" color="primary"
                class="button md:sp-w-auto" @click="fakeData">填入假資料</v-btn>
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
import { getDraftById, getTasksById, deleteDraftById, executeFetchData } from '@/services/apis/postTask'
import { getCategories, getExposurePlan } from '@/services/apis/general';
import { getAccountPoints } from '@/services/apis/point';

const { excuteAsyncFunc, promiseAllSettledHanlder, checkTaskId, checkRespStatus } = useSpUtility()
const { validateFormResult } = useFormUtil();
const _storeFullOverlay = storeFullOverlay();
const _storePostTask = storePostTask();
const { logInfo, logError } = useLog()

const { openModal, closeModal, openBtnLoading, closeBtnLoading, openSFeeModal } = storePostTask();
const { exposurePlans, taskCategories, descriptionTemplateList } = storeToRefs(_storePostTask);
const { currentTaskStatus, currentTaskStatusIsDraft, currentTaskStatusIsUnpublish } = storeToRefs(_storePostTask);
const { userCoin, formData, contactInfoData, locationData } = storeToRefs(_storePostTask);
const { btnDisabled, btnLoading, postTaskModal, postTaskFeeModal } = storeToRefs(_storePostTask);

const currentRules = ref(postTaskConfig.rules.draft)
const currentFieldEnabled = ref(postTaskConfig.fieldEnabled.init)
const postTaskForm = ref(null)
const _work = '刊登任務'
let taskId = ''

provide('hintMsgs', postTaskConfig.hintMsgs)
provide('currentRules', currentRules)
provide('currentFieldEnabled', currentFieldEnabled)


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
    openSFeeModal({
        salary: formData.value.salary,
        isFromDraft: checkTaskId(taskId)
    })
}


const setCurrentRules = (submitter) => {
    switch (submitter) {
        case postTaskConfig.taskSubmitter.draftAdd:
        case postTaskConfig.taskSubmitter.draftUpdate:
            currentRules.value = postTaskConfig.rules.draft
            break;
        case postTaskConfig.taskSubmitter.published:
        case postTaskConfig.taskSubmitter.publishFromDraft:
        case postTaskConfig.taskSubmitter.unpublished:
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
        draftAdd: _submitter === postTaskConfig.taskSubmitter.draftAdd,
        draftUpdate: _submitter === postTaskConfig.taskSubmitter.draftUpdate,
        publishFromDraft: _submitter === postTaskConfig.taskSubmitter.publishFromDraft,
        published: _submitter === postTaskConfig.taskSubmitter.published,
        unpublished: _submitter === postTaskConfig.taskSubmitter.unpublished,
    })
    logInfo(_work, 'submit', _submitter, taskTrans)

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
        const data = { ...formData.value }
        data.imagesUrl = ["https://example.com/image1.jpg", "https://example.com/mage2.jpg"]
        data.contactInfo = { ...contactInfoData.value }
        data.location = { ...locationData.value }

        if (taskTrans) {
            data.taskTrans = {
                superCoin: taskTrans.superCoin,
                helperCoin: taskTrans.helperCoin
            }
        }
        logInfo(_work, 'formData', data)

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
        //暫時先導頁回-1
        resetForm()
        closeLoading()
        excuteAsyncFunc(_work, getAccountPoints, null, (response) => userCoin.value = response.data)
        if (_message) {
            openModal({
                type: _dialogType,
                message: _message,
                isShowGoTaskBtn: _isShowGoTaskBtn
            })
        }
        // if (_isShowGoTaskBtn) {
        //     resetForm()
        // }
    }
}






const resetForm = () => {
    postTaskForm.value?.reset() //防止postTaskForm null
    formData.value.salary = 10
    postTaskFeeModal.value = false
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
    openLoading({ draftDelete: true })
    promiseAllSettledHanlder(
        [excuteAsyncFunc(_work, deleteDraftById, taskId, (response) => {
            openModal({
                message: response.message
            })
            resetForm()
        })]
        //成功
        , null
        //失敗
        , (error) => {
            openModal({
                type: postTaskConfig.dialogType.error,
                message: error
            })
        }
        //finally
        , () => closeLoading()
    )
}




// Init
const Init = () => {
    _storeFullOverlay.open()
    btnDisabled.value = true

    const route = useRoute();
    const status = route.query.status?.toLowerCase()
    taskId = route.params.taskId

    let promiseArr = [
        excuteAsyncFunc(_work, getExposurePlan, null, (response) => exposurePlans.value = response.data),
        excuteAsyncFunc(_work, getCategories, null, (response) => {
            taskCategories.value = response.data
            descriptionTemplateList.value = response.data.map(item => item.template)
        }),
        excuteAsyncFunc(_work, getAccountPoints, null, (response) => {
            userCoin.value = response.data
            //增加任務薪水檢查規則
            const index = currentRules.value.salary.findIndex((item) => item == 'checkUserCoin')
            if (index >= 0) {
                currentRules.value.salary[index] = (v) => v <= userCoin.value.superCoin || `不可超過目前帳戶儲值餘額 ${userCoin.value.superCoin} 點超人幣`
            }
            // console.log(userCoin.value)
        })
    ]

    if (checkTaskId(taskId) && status && status === postTaskConfig.currentTaskStatus.unpublished) {
        //任務來源:已下架任務
        currentTaskStatus.value = postTaskConfig.currentTaskStatus.unpublished
        currentFieldEnabled.value = postTaskConfig.fieldEnabled.unpublishedEdit
        promiseArr.push(excuteAsyncFunc(_work, getTasksById, taskId, (response) => {
            formData.value.title = response.data.title
            formData.value.category = response.data.category
            formData.value.description = response.data.description
            formData.value.salary = response.data.salary
            formData.value.exposurePlan = '一般曝光'
            contactInfoData.value = response.data.contactInfo
            locationData.value = {
                city: '台北市',
                dist: '信義區',
                address: '信義路一段12號'
            }
        }))

    } else if (checkTaskId(taskId)) {
        //任務來源:草稿
        currentTaskStatus.value = postTaskConfig.currentTaskStatus.draft
        promiseArr.push(excuteAsyncFunc(_work, getDraftById, taskId, (response) => {
            formData.value.title = response.data.title
            formData.value.category = response.data.category
            formData.value.description = response.data.description
            formData.value.salary = response.data.salary
            formData.value.exposurePlan = response.data.exposurePlan
            //formData.value.imgUrls = data.imgUrls
            contactInfoData.value = response.data.contactInfo
            locationData.value = response.data.location
        }))

    } else {
        //任務來源:新增任務
        currentTaskStatus.value = postTaskConfig.currentTaskStatus.create
    }
    logInfo(_work, currentTaskStatus.value, 'check.currentTaskStatus')


    promiseAllSettledHanlder(
        promiseArr
        //成功
        , () => btnDisabled.value = false
        //失敗
        , (error) => {
            openModal({
                type: postTaskConfig.dialogType.error,
                message: error
            })
            btnDisabled.value = true
        }
        //finally
        , () => {
            _storeFullOverlay.close()
            logInfo(_work, 'init success')
        }
    )
}
Init();




// - 假資料 -
function fakeData () {
    formData.value.title = '測試任務'
    formData.value.category = '到府驅蟲'
    formData.value.description = 'test'
    formData.value.salary = 100
    formData.value.exposurePlan = '一般曝光'
    contactInfoData.value.name = 'test'
    contactInfoData.value.phone = '0910123456'
    contactInfoData.value.email = 'test@gmail.com'
    locationData.value.city = '台北市'
    locationData.value.dist = '信義區'
    locationData.value.address = '信義路一段12號'
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