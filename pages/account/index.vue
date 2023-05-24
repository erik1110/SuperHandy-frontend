<template>
    <v-overlay v-model="loading" class="align-center justify-center">
        <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="sp-space-y-6">
        <div class="sp-card-wrapper sp-bg-white sp-p-6">
            <div class="sm:sp-flex sm:sp-items-center sm:sp-space-x-4 sp-mb-6">
                <AccountAvatar></AccountAvatar>
                <div class="sp-mt-2 sm:sp-mt-0">
                    <p class="sp-font-bold">{{ userData.lastName }}{{ userData.firstName }}</p>
                    <p class="sp-text-gray-placeholder" v-show="userData.email">帳號 {{ userData.email }}</p>
                </div>
            </div>
            <div class="sp-mb-4">
                <AccountPerformance :performanceData="performanceData"></AccountPerformance>
            </div>
        </div>
        <div class="sp-card-wrapper sp-bg-white sp-p-6">
            <SecTitle :text="'個人資料'"></SecTitle>
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
                <div class='mt-4 md:sp-w-1/2'>
                    <label class='label'>地址</label>
                    <!-- <div class=" lg:sp-flex lg:sp-space-x-2">
                        <div class=" lg:sp-w-1/2 lg:sp-flex lg:sp-space-x-2">
                            <v-select v-model='locationCity' rules='[required]' :items='countyList' item-title='city'
                                item-value='city' @click:clear="clearDist" label="縣市" clearable>
                            </v-select>
                            <v-select v-model='locationDist' :rules='rules.locationDist' :items='townList' item-title='dist'
                                item-value='dist' :hint='hintLocationDist' :readonly='readonlyLocationDist' label="區域"
                                clearable>
                            </v-select>
                        </div>
                        <v-text-field :rules='accountFormRules.address' v-model='address'
                            :counter='postTaskFormRules.address.counter' :hint='postTaskFormRules.address.hint'
                            @keypress.enter.prevent />
                    </div> -->
                </div>
                <div class='mt-4'>
                    <label class='label' for='nickname'>案主介紹</label>
                    <v-textarea v-model="userData.posterIntro" :rules="accountFormRules.intro.rule" :disabled="isDisabled"
                        :counter="accountFormRules.intro.counter" :hint="accountFormRules.intro.hint" />
                </div>
                <div class='mt-4'>
                    <label class='label' for='nickname'>幫手介紹</label>
                    <v-textarea v-model="userData.helperIntro" :rules="accountFormRules.intro.rule" :disabled="isDisabled"
                        :counter="accountFormRules.intro.counter" :hint="accountFormRules.intro.hint" />
                </div>
                <div class='mt-4'>
                    <label class="label text-grey-darken-2 d-flex align-center" for="helperSkills">幫手專長
                        <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                            最多可以選三項
                        </v-chip>
                    </label>
                    <v-select v-model="userData.helperSkills" :rules="accountFormRules.helperSkills.rule"
                        :disabled="isDisabled" :items="taskCategories" color="blue-grey-lighten-2" item-title="name"
                        item-value="name" multiple chips clearable>
                        <template v-slot:chip="{ props, item }">
                            <v-chip v-bind="props" :text="item.name"></v-chip>
                        </template>
                    </v-select>
                </div>
                <div class="mt-8">
                    <v-btn type='submit' color="v-purple" class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto'
                        :disabled="loading" :loading="loading">更新檔案</v-btn>
                </div>
            </v-form>
        </div>
    </div>
</template>
<script setup>
import { getCategories } from "@/services/apis/general";
import { getAccountInfo, patchAccountInfo, getProfileStatus } from "@/services/apis/account";
const { checkRespStatus } = useSpUtility()
const { logInfo, logError } = useLog()
const { formRules, validateFormResult } = useFormUtil()
let accountFormRules = formRules()
const _work = '我的帳號'

const excuteAsyncFunc = async (excuteFunc, params, successFunc) => {

    if (!excuteFunc || typeof excuteFunc !== 'function') {
        return;
    }

    let _message = ''
    loading.value = true
    try {

        let response = null
        if (params) {
            response = await excuteFunc(params)
        } else {
            response = await excuteFunc()
        }

        //logInfo(_work, 'excuteAsyncFunc', response);

        if (response && !checkRespStatus(response)) {
            _message = response.message
        } else {
            if (successFunc && typeof successFunc === 'function') {
                successFunc(response)
            }
        }
        logInfo(_work, 'excuteAsyncFunc', 'success');
    } catch (error) {
        _message = '執行失敗'
        logError(_work, 'asyncFunc', { error });
    } finally {
        loading.value = false
    }
}

const loading = ref(false);
const isDisabled = ref(false);
const accountForm = ref(null)
const taskCategories = ref([])
const userData = ref({})
const performanceData = ref({})

const init = () => {
    excuteAsyncFunc(getCategories, null, (response) => taskCategories.value = response.data)
    excuteAsyncFunc(getAccountInfo, null, (response) => userData.value = response.data)
    excuteAsyncFunc(getProfileStatus, null, (response) => performanceData.value = response.data)
}
init();

// - 更新會員資料 -
const submit = async () => {

    //1. 表單檢查
    const result = await validateFormResult(accountForm)
    //console.log(result, 'result')
    if (!result) {
        return false;
    }

    //2. 開啟loading
    loading.value = true

    //3. 後端更新
    const data = { ...userData }
    excuteAsyncFunc(patchAccountInfo, data, (response) => {
        alert(response.message)
    })
};


// - 取消編輯-
function cancel() {
    isDisabled.value = true
    //重刷頁面
    profileForm.value.reset()
    getAccount()
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
<style>
.label {
    @apply sp-pb-2 sp-block sp-font-bold
}
</style>
