<template>
    <v-overlay v-model="loading"></v-overlay>
    <v-sheet border="sm" opacity-12 class="text-body-2 mx-auto pa-3">
        <v-form @submit.prevent="submit" ref="profileForm">
            <div class='text-end'>
                <v-btn v-if="isDisabled" type='button' class='me-2' @click="isDisabled = !isDisabled">編輯</v-btn>
                <div v-else>
                    <v-btn type='submit' class='me-2' :loading="loading" color="error">更新</v-btn>
                    <v-btn type='button' class='me-2' @click="cancel" color="blue-grey-lighten-2">取消</v-btn>
                </div>
            </div>
            <v-container fluid="">
                <v-row>
                    <v-col cols="12" md="6">
                        <label class="label text-grey-darken-2" for="firstName">姓</label>
                        <v-text-field :rules="profileFormRules.name.rule" v-model="user.firstName" :disabled="isDisabled"
                            :counter="profileFormRules.name.counter" :hint="profileFormRules.name.hint" required />
                    </v-col>
                    <v-col cols="12" md="6">
                        <label class="label text-grey-darken-2" for="lastName">名</label>
                        <v-text-field :rules="profileFormRules.name.rule" v-model="user.lastName" :disabled="isDisabled"
                            :counter="profileFormRules.name.counter" :hint="profileFormRules.name.hint" required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <label class="label text-grey-darken-2" for="nickName">暱稱</label>
                        <v-text-field :rules="profileFormRules.nickName.rule" v-model="user.nickName" :disabled="isDisabled"
                            :counter="profileFormRules.nickName.counter" :hint="profileFormRules.nickName.hint" required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <label class="label text-grey-darken-2 d-flex align-center" for="phone">手機號碼
                            <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                                不可修改
                            </v-chip>
                        </label>
                        <v-text-field v-model="user.phone" disabled required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <label class="label text-grey-darken-2 d-flex align-center" for="email">電子信箱
                            <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                                不可修改
                            </v-chip>
                        </label>
                        <v-text-field v-model="user.email" disabled required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <label class="label text-grey-darken-2" for="address">地址</label>
                        <v-text-field :rules="profileFormRules.address.rule" v-model="user.address" :disabled="isDisabled"
                            :counter="profileFormRules.address.counter" :hint="profileFormRules.address.hint" required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <label class="label text-grey-darken-2" for="posterIntro">案主簡介</label>
                        <v-textarea :rules="profileFormRules.intro.rule" v-model="user.posterIntro" :disabled="isDisabled"
                            :counter="profileFormRules.intro.counter" :hint="profileFormRules.intro.hint" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <label class="label text-grey-darken-2" for="helperIntro">幫手簡介</label>
                        <v-textarea :rules="profileFormRules.intro.rule" v-model="user.helperIntro" :disabled="isDisabled"
                            :counter="profileFormRules.intro.counter" :hint="profileFormRules.intro.hint" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <label class="label text-grey-darken-2 d-flex align-center" for="helperSkills">幫手專長
                            <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                                最多可以選三項
                            </v-chip>
                        </label>
                        <v-select :rules="profileFormRules.helperSkills.rule" :disabled="isDisabled" :items="taskCategories"
                            color="blue-grey-lighten-2" item-title="name" item-value="name" multiple chips clearable
                            v-model="helperSkills">
                            <template v-slot:chip="{ props, item }">
                                <v-chip v-bind="props" :text="item.name"></v-chip>
                            </template>
                        </v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-sheet>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { storeAccount } from '@/stores/storeAccount'
import { getCategories } from "@/services/apis/general";
const { basicBox } = useAlert()


// - 初始宣告 -
const loading = ref(false);
const isDisabled = ref(true);
const profileForm = ref(null)


// - 取消編輯-
function cancel() {
    //console.log(isDisabled.value, 'cancel')
    isDisabled.value = true
    //重刷頁面
    profileForm.value.reset()
    getAccount()
}


// - 取得會員資料 -
const _storeAccount = storeAccount()
const { getAccount, updateAccount } = _storeAccount
const { user } = storeToRefs(_storeAccount)


// - 取得表單驗證規則 -
const { formRules, validateFormResult } = useFormUtil()
let profileFormRules = formRules()
let _helperSkillsError = false
const helperSkills = ref(user.value.helperSkills)
profileFormRules.helperSkills = {
    rule: [(v) => !_helperSkillsError || "最多輸入三項"],
}
watch(
    helperSkills,
    (val) => {
        //console.log(val, 'helperSkillsError')
        if (val.length > 3) {
            _helperSkillsError = true
        } else {
            _helperSkillsError = false
        }
    },
    {
        //immediate: true,
    }
);


// - 取得任務類別 -
const taskCategories = ref([])
onMounted(async () => {
    try {
        let { data } = await getCategories();
        taskCategories.value = data;
    } catch (err) {
        console.log({ err });
    }
})


// - 更新會員資料 -
const submit = async () => {

    //1. 表單檢查
    const result = await validateFormResult(profileForm)
    //console.log(result, 'result')
    if (!result) {
        basicBox('表單驗證還沒有成功喔!')
        return false;
    }

    //2. 開啟loading
    loading.value = true

    //3. 組裝資料
    const data = {
        firstName: user.value.firstName,
        lastName: user.value.lastName,
        nickName: user.value.nickName,
        address: user.value.address,
        posterIntro: user.value.posterIntro,
        helperIntro: user.value.helperIntro,
        helperSkills: helperSkills.value
    }
    //console.log(data, 'data')

    //4. 更新資料
    updateAccount(data, () => {
        profileForm.value.reset()
        loading.value = false
        isDisabled.value = true
        getAccount()
        basicBox('更新會員資料成功')
    }, () => {
        profileForm.value.reset()
        loading.value = false
        isDisabled.value = true
        getAccount()
        basicBox("取得會員資料失敗");
    })

};


</script>
<style scoped></style>