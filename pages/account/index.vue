<template>
    <!-- 遮罩 -->
    <PostTaskOverlay />
    <div class="sp-space-y-6">
        <div class="sp-card-wrapper sp-bg-white sp-p-6">
            <div class="sm:sp-flex sm:sp-items-center sm:sp-space-x-4 sp-mb-6">
                <!-- 頭像 -->
                <AccountAvatar :avatarPath="avatarPath" :circularLoading="circularLoading" @aUploadAvatar="uploadAvatar">
                </AccountAvatar>
                <div class="sp-mt-2 sm:sp-mt-0">
                    <p class="sp-font-bold">{{ userData.lastName }}{{ userData.firstName }}</p>
                    <p class="sp-text-gray-placeholder" v-show="userData.email">帳號 {{ userData.email }}</p>
                </div>
            </div>
            <div class="sp-mb-4">
                <!-- 六個數字 -->
                <AccountPerformance :hosterData="performanceHosterData" :helperData="performanceHelperData"></AccountPerformance>
            </div>
        </div>
        <div class="sp-card-wrapper sp-bg-white sp-p-6">
            <SecTitle :text="'個人資料'"></SecTitle>
            <!-- 會員資料表單 -->
            <v-form @submit.prevent='submit' ref='accountForm' validate-on="input">
                <div class='mt-4 md:sp-w-1/2'>
                    <label class='label' for='nickname'>暱稱</label>
                    <v-text-field v-model='userData.nickname' :rules='accountFormRules.nickname.rule' id="nickname"
                        @keypress.enter.prevent />
                </div>
                <div class='mt-4 md:sp-w-1/2'>
                    <label class="label" for="phone">手機號碼
                        <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                            不可修改
                        </v-chip>
                    </label>
                    <v-text-field v-model="userData.phone" disabled required />
                </div>
                <div class='mt-4 md:sp-w-1/2'>
                    <label class="label" for="email">電子信箱
                        <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                            不可修改
                        </v-chip>
                    </label>
                    <v-text-field v-model="userData.email" disabled required />
                </div>
                <div class='mt-4'>
                    <label class='label'>地址</label>
                    <AccountLocation />
                </div>
                <div class='mt-4'>
                    <label class='label' for='nickname'>案主介紹</label>
                    <v-textarea v-model="userData.posterIntro" :rules="accountFormRules.intro.rule"
                        :counter="accountFormRules.intro.counter" :hint="accountFormRules.intro.hint" />
                </div>
                <div class='mt-4'>
                    <label class='label' for='nickname'>幫手介紹</label>
                    <v-textarea v-model="userData.helperIntro" :rules="accountFormRules.intro.rule"
                        :counter="accountFormRules.intro.counter" :hint="accountFormRules.intro.hint" />
                </div>
                <div class='mt-4'>
                    <label class="label text-grey-darken-2 d-flex align-center" for="helperSkills">幫手專長
                        <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                            最多可以選三項
                        </v-chip>
                    </label>
                    <v-select v-model="userData.helperSkills" :rules="accountFormRules.helperSkills.rule"
                        :items="taskCategories" color="blue-grey-lighten-2" item-title="name" item-value="name" multiple
                        chips clearable>
                        <template v-slot:chip="{ props, item }">
                            <v-chip v-bind="props" :text="item.name"></v-chip>
                        </template>
                    </v-select>
                </div>
                <div class="mt-8">
                    <v-btn type='submit' color="v-purple" class='sp-px-4 sp-w-full md:sp-mb-0 md:sp-w-auto'
                        :disabled="btnSubmitDisabled" :loading="btnSubmitLoading">更新檔案</v-btn>
                </div>
            </v-form>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { siteConfig } from "@/services/siteConfig";
import { storeGlobal } from "@/stores/storeGlobal";
import { storeLocation } from "@/stores/storeLocation";
import { storeFullOverlay } from "@/stores/storeFullOverlay";
import { getCategories, postUploadImage } from "@/services/apis/general";
import { getAccountInfo, patchAccountInfo, getProfileStatus } from "@/services/apis/account";

const { logInfo, logError } = useLog()
const { excuteAsyncFunc, promiseAllSettledHanlder, checkRespStatus, checkUploadImage } = useSpUtility()
const { formRules, validateFormResult, ruleAddress, ruleRequired } = useFormUtil()

let accountFormRules = formRules()
const _storeFullOverlay = storeFullOverlay();
const _work = '我的帳號'
const btnSubmitLoading = ref(false);
const btnSubmitDisabled = ref(true);
const accountForm = ref(null)
const taskCategories = ref([])
const userData = ref({})
const performanceHosterData = ref({})
const performanceHelperData = ref({})


// - 地址 -
const _storeLocation = storeLocation();
const { locationData } = storeToRefs(_storeLocation);
provide('hintMsgs', { counter: { locationCity: '', locationDist: '', locationAddress: accountFormRules.address.counter }, hint: { locationCity: '', locationDist: '', locationAddress: accountFormRules.address.hint } })
provide('currentRules', { locationCity: [ruleRequired], locationDist: [ruleRequired], locationAddress: [ruleRequired, ruleAddress] })
provide('currentFieldDisabled', { locationCity: false, locationDist: false, locationAddress: false })


// - 訊息視窗 -
const _storeGlobal = storeGlobal();
const openModal = (text) => {
    if (!process.client) return;
    _storeGlobal.confirmHandler({
        open: true,
        content: text
    });
}

// - 初始化會員資料 -
const init = () => {
    _storeFullOverlay.open()
    const promiseArr = [
        excuteAsyncFunc(_work, getProfileStatus, null, (response) => {

            performanceHosterData.value.cnRole = '關於案主';
            performanceHosterData.value.cnCoin = '超人幣';
            performanceHosterData.value.cnNumTasks = '發案數';
            performanceHosterData.value.coin = response.data.superCoin;
            performanceHosterData.value.numTasks = response.data.numOfPostTasks;
            performanceHosterData.value.rating = response.data.ratingPoster;

            performanceHelperData.value.cnRole = '關於幫手';
            performanceHelperData.value.cnCoin = '幫手幣';
            performanceHelperData.value.cnNumTasks = '接案數';
            performanceHelperData.value.coin = response.data.helperCoin;
            performanceHelperData.value.numTasks = response.data.numOfCompletedTasks;
            performanceHelperData.value.rating = response.data.ratingHelper;
        }),
        excuteAsyncFunc(_work, getCategories, null, (response) => taskCategories.value = response.data),
        excuteAsyncFunc(_work, getAccountInfo, null, (response) => {
            userData.value = response.data;
            avatarPath.value = response.data.avatarPath;
            locationData.value = response.data.location;
        })
    ];
    promiseAllSettledHanlder(
        promiseArr
        //成功
        , () => btnSubmitDisabled.value = false
        //失敗
        , (error) => {
            openModal(error)
            btnSubmitDisabled.value = true
        }
        //finally
        , () => {
            _storeFullOverlay.close()
            logInfo(_work, 'init done')
        }
    )
}
init();

// - 更新會員資料 -
const circularLoading = ref(false)
const avatarPath = ref('')
const submit = async () => {

    _storeFullOverlay.open()
    btnSubmitLoading.value = true;
    btnSubmitDisabled.value = true

    try {
        //表單檢查
        const result = await validateFormResult(accountForm)
        //console.log(result, 'result')
        if (!result) {
            openModal('表單驗證還沒完成')
            return;
        }

        //後端更新
        const data = { ...userData.value }
        data.location = { ...locationData.value }
        data.avatarPath = avatarPath.value
        console.log(data, 'account.update.data')

        const response = await patchAccountInfo(data)
        if (response && !checkRespStatus(response)) {
            openModal(response.message)
        } else {
            openModal('會員資料更新成功')
            userData.value = response.data
        }

    } catch (error) {
        logError(_work, 'submit', { error })
        openModal('會員資料更新失敗')
    } finally {
        _storeFullOverlay.close()
        btnSubmitLoading.value = false
        btnSubmitDisabled.value = false
    }

};


// - 更新頭像 -
const uploadAvatar = async (event) => {

    const _file = event.target.files[0]
    circularLoading.value = true
    try {
        //檢查圖片大小不可超過2MB
        logInfo(_work, 'file.size', _file.size)
        if (!checkUploadImage(_file.size, siteConfig.Image.upload.maxSize)) {
            logError(_work, 'file.size', _file.size)
            openModal(`圖片大小不可超過${siteConfig.Image.upload.maxSizeCn}`)
            circularLoading.value = false
            return;
        }

        let formData = new FormData();
        formData.append("file", _file)
        const res1 = await postUploadImage(formData)
        if (res1 && checkRespStatus(res1)) {
            logInfo(_work, 'upload avatar success')
            const _avatarPath = res1.data.imgUrl
            //更新會員資料
            const res2 = await patchAccountInfo({ avatarPath: _avatarPath })
            if (res2 && !checkRespStatus(res2)) {
                openModal(res2.message)
            } else {
                logInfo(_work, 'update info-form success')
                avatarPath.value = _avatarPath
                openModal('會員照片更新成功')
            }

        }
        //防止不能上傳同一張圖片
        event.target.value = ''

    } catch (error) {
        logError(_work, { error })
        openModal(`會員照片更新失敗`)
    } finally {
        circularLoading.value = false
    }

}


// - 幫手專長驗證規則 -
let _helperSkillsError = false
accountFormRules.helperSkills = {
    rule: [() => !_helperSkillsError || "最多輸入三項"],
}
watch(() => userData.value.helperSkills, (newVal) => {
    if (newVal) {
        if (newVal && newVal.length > 3) {
            _helperSkillsError = true
        } else {
            _helperSkillsError = false
        }
    }
})

</script>
<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");

.label {
    @apply sp-pb-2 sp-block sp-font-bold
}
</style>
