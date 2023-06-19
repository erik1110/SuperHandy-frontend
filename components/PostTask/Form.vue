<template>
    <v-form @submit.prevent="submit" ref="postTaskForm" validate-on="blur">
        <!-- 基本欄位 -->
        <PostTaskBasic />

        <div class='mt-4'>
            <label class='label'>任務說明照片(非必填)</label>
            <!-- 上傳任務照片 -->
            <PostTaskUploadImage />
        </div>

        <v-divider class="border-opacity-100 my-8"></v-divider>
        <SecTitle :text="'任務聯絡人'"></SecTitle>
        <!-- 任務聯絡人 -->
        <PostTaskContactInfo />

        <div class='mt-4'>
            <!-- 任務地點 -->
            <label class='label'>地址</label>
            <AccountLocation />
        </div>

        <div class='my-8'>
            <!-- 下架任務編輯按鈕區 -->
            <div v-if="currentTaskStatusIsUnpublish">
                <div class="sp-mt-8 sm:sp-flex sm:sp-space-x-4 sm:sp-space-y-0 sm:sp-justify-between">
                    <NuxtLink :to="`${siteConfig.linkPaths.tasks.to}/${taskId}`">
                        <v-btn color="v-orange" class='button'>回到任務詳情</v-btn>
                    </NuxtLink>
                    <v-btn type='submit' id='unpublished' color="v-gray-placeholder" class='button md:sp-w-auto'
                        :disabled="btnDisabled" :loading="btnLoading.unpublished">儲存任務</v-btn>
                </div>
            </div>
            <!-- 草稿任務按鈕區 -->
            <div v-else class="md:sp-flex md:sp-justify-between">
                <div v-if="currentTaskStatusIsDraft">
                    <NuxtLink :to="siteConfig.linkPaths.tasks.to">
                        <v-btn color="v-orange" class='button'>回到任務管理</v-btn>
                    </NuxtLink>
                </div>
                <div v-else>
                    <v-btn color="v-orange" type='button' class='button' :disabled="btnDisabled"
                        @click="resetForm">全部清除</v-btn>
                </div>
                <div class="md:sp-flex md:sp-justify-end md:sp-space-x-2">
                    <div v-if="currentTaskStatusIsDraft" class="md:sp-space-x-2">
                        <v-btn type='button' id='draftDelete' color="v-gray-placeholder" class='button md:sp-w-auto'
                            :disabled="btnDisabled" :loading="btnLoading.draftDelete"
                            @click="confirmDeleteDraft">刪除草稿</v-btn>

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
            <v-btn v-if="!currentTaskStatusIsDraft && !currentTaskStatusIsUnpublish && dev" color="primary"
                class="button md:sp-w-auto" @click="fakeData">填入假資料</v-btn>
        </div>
    </v-form>

    <!-- 刊登任務費用視窗 -->
    <PostTaskFeeModal :loading="btnLoading.published" @aClose="postTaskFeeModal = false" @aSubmit="submit">
    </PostTaskFeeModal>

    <!-- 提示訊息視窗(區分成功與錯誤訊息) -->
    <PostTaskModal @close="closeModal" @aConfirmCallback="execConfirmCallback" @aCloseCallback="execCloseCallback">
    </PostTaskModal>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { storeFullOverlay } from "@/stores/storeFullOverlay";
import { storePostTask } from "@/stores/storePostTask";
import { storeLocation } from "@/stores/storeLocation";

import { postTaskConfig } from '@/services/postTaskConfig';
import { getDraftById, getTasksById, deleteDraftById, executeFetchData } from '@/services/apis/postTask'
import { getCategories, getExposurePlan } from '@/services/apis/general';
import { getAccountPoints } from '@/services/apis/point';
import { getAccountInfo } from '@/services/apis/account';
import { siteConfig } from '@/services/siteConfig';

const { excuteAsyncFunc, promiseAllSettledHanlder, checkTaskId, checkRespStatus } = useSpUtility()
const { validateFormResult } = useFormUtil();
const _storeFullOverlay = storeFullOverlay();
const _storePostTask = storePostTask();
const _storeLocation = storeLocation();
const { logDebug, logError } = useLog()

// - Modal相關方法 -
const { openConfirmModal, openErrorModal, openModal, closeModal, execConfirmCallback, execCloseCallback } = storePostTask();
// - loading相關方法 -
const { openBtnLoading, closeBtnLoading, openSFeeModal } = storePostTask();
// - 下拉選單資料 -
const { exposurePlans, taskCategories, descriptionTemplateList } = storeToRefs(_storePostTask);
// - 任務來源狀態 -
const { currentTaskStatus, currentTaskStatusIsDraft, currentTaskStatusIsUnpublish } = storeToRefs(_storePostTask);
// - 任務共用物件 -
const { userCoin, formData, imgUrls, contactInfoData } = storeToRefs(_storePostTask);
const { btnDisabled, btnLoading, postTaskModal, postTaskFeeModal } = storeToRefs(_storePostTask);

// - 地址共用物件 -
const { locationData } = storeToRefs(_storeLocation);

const currentRules = ref(postTaskConfig.rules.draft)
const currentFieldDisabled = ref(postTaskConfig.fieldDisadled.init)
const postTaskForm = ref(null)
const _work = '刊登任務'
let taskId = ''

// - 提供給子元件的資料 -
provide('hintMsgs', postTaskConfig.hintMsgs)
provide('currentRules', currentRules) //會重新set
provide('currentFieldDisabled', currentFieldDisabled) //會重新set

const dev = process.dev


// - loading -
function openLoading(option) {
    _storeFullOverlay.open()
    btnDisabled.value = true
    openBtnLoading(option)
}
function closeLoading() {
    _storeFullOverlay.close()
    btnDisabled.value = false
    closeBtnLoading()
}



// - 打開刊登費用計算視窗 -
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
    })
}

// - 設定表單檢查規則 -
const setCurrentRules = (submitter) => {
    switch (submitter) {
        case postTaskConfig.taskSubmitter.draftAdd:
        case postTaskConfig.taskSubmitter.draftUpdate:
            currentRules.value = postTaskConfig.rules.draft;
            break;
        case postTaskConfig.taskSubmitter.published:
        case postTaskConfig.taskSubmitter.publishFromDraft:
            currentRules.value = postTaskConfig.rules.publish;
            break;
        case postTaskConfig.taskSubmitter.unpublished:
            currentRules.value = postTaskConfig.rules.unpublish;
            break;
        default:
            currentRules.value = postTaskConfig.rules.publish;
            break;
    }
}

// - 進行表單驗證 -
const validatePostTaskForm = async () => {

    const validate = await validateFormResult(postTaskForm)
    logDebug(_work, 'validatePostTaskForm.Result', validate)
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

// - 表單送出 -
const submit = async (event, taskTrans) => {

    //1. 開啟loading & disable btns
    const _submitter = event.submitter.id
    openLoading({
        draftAdd: _submitter === postTaskConfig.taskSubmitter.draftAdd,
        draftUpdate: _submitter === postTaskConfig.taskSubmitter.draftUpdate,
        publishFromDraft: _submitter === postTaskConfig.taskSubmitter.publishFromDraft,
        published: _submitter === postTaskConfig.taskSubmitter.published,
        unpublished: _submitter === postTaskConfig.taskSubmitter.unpublished,
    })
    logDebug(_work, 'submit', _submitter, taskTrans)

    //2.1設定現在要使用的表單驗證規則
    setCurrentRules(_submitter)

    //2.2.表單檢查
    const result = await validatePostTaskForm()
    if (!result) {
        closeLoading()
        return;
    }

    //3. 組裝資料
    //4. 關閉loading & reset form
    try {
        const data = { ...formData.value }
        data.imgUrls = [...imgUrls.value]
        data.contactInfo = { ...contactInfoData.value }
        data.location = { ...locationData.value }
        data.salary = Number(data.salary)

        if (taskTrans) {
            data.taskTrans = {
                superCoin: taskTrans.superCoin,
                helperCoin: taskTrans.helperCoin
            }
        }
        logDebug(_work, 'formData', data)

        const response = await executeFetchData(_submitter, data, taskId)
        logDebug(_work, 'submit.response', response);

        if (response && !checkRespStatus(response)) {
            openErrorModal(response.message)
            return;
        }

        //因為是彈跳視窗，所以必須處理關閉視窗的原本頁面的處理
        resetForm()
        switch (_submitter) {
            case postTaskConfig.taskSubmitter.draftAdd:
                openModal({
                    isShowGoTaskBtn: true,
                    message: response.message,
                    closeCallback: () => {
                        navigateTo(`/post-task/${response.data.taskId}`)
                    }
                })
                break;
            case postTaskConfig.taskSubmitter.draftUpdate:
                excuteAsyncFunc(_work, getDraftById, taskId, setResponseDate)
                openModal({ isShowGoTaskBtn: true, message: response.message })
                break;
            case postTaskConfig.taskSubmitter.published:
            case postTaskConfig.taskSubmitter.publishFromDraft:
                openModal({
                    isShowGoTaskBtn: true,
                    message: response.message,
                    closeCallback: () => {
                        navigateTo(siteConfig.linkPaths.postTask.to)
                    }
                })
                break;
            case postTaskConfig.taskSubmitter.unpublished:
                excuteAsyncFunc(_work, getTasksById, taskId, setResponseDate)
                // 2023-06-07 改成導向任務詳情頁面
                //openModal({ isShowGoTaskBtn: true, message: response.message })
                const message = `${response.message}，是否前往任務詳情頁執行任務上架 ?`
                openConfirmModal(message, () => {
                    navigateTo(`${siteConfig.linkPaths.tasks.to}/${taskId}`)
                })
                break;
            default:
                break;
        }

    } catch (error) {
        logError(_work, 'submit', { error });
        openErrorModal('刊登任務失敗')
    } finally {
        closeLoading()
        //更新會員超人幣點數
        excuteAsyncFunc(_work, getAccountPoints, null, (response) => userCoin.value = response.data)
    }
}

// - 表單重設 -
const resetForm = () => {
    postTaskForm.value?.reset() //防止postTaskForm null
    formData.value.salary = 10
    postTaskFeeModal.value = false
    postTaskModal.value = false
    imgUrls.value = []
    logDebug(_work, 'reset form done')
}

// - 刪除草稿 -
const confirmDeleteDraft = () => {
    openConfirmModal('確認要刪除這筆任務草稿?', deleteDraft)
}
const deleteDraft = async () => {
    postTaskModal.value = false
    openLoading({ draftDelete: true })
    let _message = ''
    promiseAllSettledHanlder(
        [
            excuteAsyncFunc(_work, deleteDraftById, taskId, (response) => {
                _message = response.message
            })
        ]
        //成功
        , () => {
            resetForm()
            openModal({
                isShowGoTaskBtn: true,
                message: _message,
                closeCallback: () => {
                    navigateTo(siteConfig.linkPaths.postTask.to)
                }
            })
        }
        //失敗
        , (error) => {
            openModal({
                type: postTaskConfig.dialogType.error,
                message: error
            })
        }
        //finally
        , () => {
            closeLoading()
        }
    )
}


// Init
const setResponseDate = (response) => {
    formData.value.title = response.data.title
    formData.value.category = response.data.category
    formData.value.description = response.data.description
    formData.value.salary = response.data.salary
    formData.value.exposurePlan = response.data.exposurePlan
    imgUrls.value = response.data.imgUrls
    contactInfoData.value = response.data.contactInfo
    locationData.value = response.data.location
}
const Init = () => {

    _storeFullOverlay.open()
    btnDisabled.value = true

    const route = useRoute();
    const status = route.query.status?.toLowerCase()
    taskId = route.params.taskId

    let promiseArr = [
        excuteAsyncFunc(_work, getAccountInfo, null, (response) => {
            if(response && checkRespStatus(response)){
                const data = response.data;
                locationData.value = data.location;
                contactInfoData.value = {
                    name: `${data.lastName}${data.firstName}`,
                    phone: data.phone,
                    email: data.email
                }
            }
        }),
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
        currentFieldDisabled.value = postTaskConfig.fieldDisadled.unpublishedEdit
        promiseArr.push(excuteAsyncFunc(_work, getTasksById, taskId, setResponseDate))

    } else if (checkTaskId(taskId)) {
        //任務來源:草稿
        currentTaskStatus.value = postTaskConfig.currentTaskStatus.draft
        promiseArr.push(excuteAsyncFunc(_work, getDraftById, taskId, setResponseDate))

    } else {
        //任務來源:新增任務
        currentTaskStatus.value = postTaskConfig.currentTaskStatus.create
    }
    logDebug(_work, currentTaskStatus.value, 'check.currentTaskStatus')


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
            logDebug(_work, 'init done')
        }
    )
}

onMounted(() => {
    resetForm()
    Init();
})

// - 假資料 -
function fakeData() {
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