<template>
    <!-- 遮罩 -->
    <PostTaskOverlay/>
    <div class="sp-space-y-6">
        <div class="sp-card-wrapper sp-bg-white sp-p-6">
            <div class="sm:sp-flex sm:sp-items-center sm:sp-space-x-4 sp-mb-6">
                <!-- 頭像 -->
                <AccountAvatar></AccountAvatar>
                <div class="sp-mt-2 sm:sp-mt-0">
                    <p class="sp-font-bold">{{ userData.lastName }}{{ userData.firstName }}</p>
                    <p class="sp-text-gray-placeholder" v-show="userData.email">帳號 {{ userData.email }}</p>
                </div>
            </div>
            <div class="sp-mb-4">
                <!-- 六個數字 -->
                <AccountPerformance :performanceData="performanceData"></AccountPerformance>
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
                         :items="taskCategories" color="blue-grey-lighten-2" item-title="name"
                        item-value="name" multiple chips clearable>
                        <template v-slot:chip="{ props, item }">
                            <v-chip v-bind="props" :text="item.name"></v-chip>
                        </template>
                    </v-select>
                </div>
                <div class="mt-8">
                    <v-btn type='submit' color="v-purple" class='sp-px-4 sp-w-full md:sp-mb-0 md:sp-w-auto'
                        :disabled="isOpenFullOverlay" :loading="btnSubmitLoading">更新檔案</v-btn>
                </div>
            </v-form>
        </div>
    </div>
    <!-- 訊息彈出視窗 -->
    <AccountModel :message="message" :is-error="isError" @click="accountMessageModal = false"></AccountModel>
</template>
<script setup>
import { storeGlobal } from "~/stores/storeGlobal";
import { getCategories } from "@/services/apis/general";
import { getAccountInfo, patchAccountInfo, getProfileStatus } from "@/services/apis/account";
const { logInfo, logError } = useLog()
const { excuteAsyncFunc,errorHanlder } = useSpUtility()
const { formRules, validateFormResult } = useFormUtil()
let accountFormRules = formRules()
const _work = '我的帳號'
const isOpenFullOverlay = useState('fullOverlay',() => ref(false));
// const _storeGlobal = storeGlobal();
const btnSubmitLoading = ref(false);
const accountForm = ref(null)
const taskCategories = ref([])
const userData = ref({})
const performanceData = ref({})


// 訊息視窗
const accountMessageModal = useState('accountMessageModal',() => ref(false));
const message = ref('')
const isError = ref(false)
const openModal = function(text) {
    accountMessageModal.value = true
    message.value = text
    isError.value = true
}

const init = () => {
    //console.time();
    isOpenFullOverlay.value = true
    const promises = [
        excuteAsyncFunc(_work, getProfileStatus, null, (response) => performanceData.value = response.data),
        excuteAsyncFunc(_work, getCategories, null, (response) => taskCategories.value = response.data),
        excuteAsyncFunc(_work, getAccountInfo, null, (response) => userData.value = response.data)
    ];
    Promise.allSettled(promises).then(results => {
        logInfo(_work, 'results', results)
        const _message = errorHanlder(results)
        logInfo(_work, 'results.message', message)
        if(_message && _message.length  > 0) {
            //alert(_message)
            openModal(_message)

            // 用_storeGlobal會顯示三次, 原因待查
            // _storeGlobal.confirmHandler({
            //     open: true,
            //     title: "",
            //     content: message,
            //     closeHandle: null,
            // });
        };
        isOpenFullOverlay.value = false
        //console.timeEnd();
    });
}
init();

// - 更新會員資料 -
const submit = async () => {

    isOpenFullOverlay.value = true
    btnSubmitLoading.value = true;

    //表單檢查
    const result = await validateFormResult(accountForm)
    //console.log(result, 'result')
    if (!result) {
        isOpenFullOverlay.value = false
        btnSubmitLoading.value = false;
        // _storeGlobal.confirmHandler({
        //     open: true,
        //     content: '表單驗證還沒完成'
        // });
        return false;
    }

    //後端更新
    const data = { ...userData }
    excuteAsyncFunc(patchAccountInfo, data, (response) => {
        // _storeGlobal.confirmHandler({
        //     open: true,
        //     content: response.message
        // });
        userData.value = response.data
        isOpenFullOverlay.value = false
        btnSubmitLoading.value = false
    })
};


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
