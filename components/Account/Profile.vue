<template>
    <v-card color="transparent" class="mx-auto pa-5" elevation="0" border rounded="0">
        <!-- <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="green-lighten-3" height="4" indeterminate></v-progress-linear>
        </template> -->

        <v-form @submit.prevent="submit" ref="profileForm">

            <v-card-actions class="d-flex justify-end">
                <v-btn type="submit" v-if="!isDisabled" class="text-white px-5" color="red-darken-4" rounded="0"
                    variant="flat" :loading="isUpdating" prepend-icon="mdi-update">
                    更新
                </v-btn>
                <v-btn v-if="!isDisabled" class="text-white px-5" color="grey-lighten-1" rounded="0" variant="flat"
                    prepend-icon="mdi-close" @click="cancel">
                    取消
                </v-btn>
                <v-btn v-else class="text-white px-5" color="blue-darken-4" rounded="0" variant="flat"
                    prepend-icon="mdi-pencil" @click="isDisabled = !isDisabled">
                    編輯
                </v-btn>
            </v-card-actions>

            <v-container>
                <v-row dense>
                    <v-col cols="12" sm="6">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="firstName">姓</label>
                            <VTextField :rules="formRules.name.rule" v-model="user.firstName" id="firstName"
                                name="firstName" type="text" :disabled="isDisabled" :counter="formRules.name.counter"
                                :hint="formRules.name.hint" required />
                        </div>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="lastName">名</label>
                            <VTextField :rules="formRules.name.rule" v-model="user.lastName" id="lastName" name="lastName"
                                type="text" :disabled="isDisabled" :counter="formRules.name.counter"
                                :hint="formRules.name.hint" required />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="nickName">暱稱</label>
                            <VTextField :rules="formRules.nickName.rule" v-model="user.nickName" id="nickName"
                                name="nickName" type="text" :disabled="isDisabled" :counter="formRules.nickName.counter"
                                :hint="formRules.nickName.hint" required />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2 d-flex align-center" for="phone">手機號碼
                                <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                                    不可修改
                                </v-chip>
                            </label>
                            <VTextField v-model="user.phone" id="phone" name="phone" type="phone" disabled required />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2 d-flex align-center" for="email">電子信箱
                                <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                                    不可修改
                                </v-chip>
                            </label>
                            <VTextField v-model="user.email" id="email" name="email" type="email" disabled required />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="address">地址</label>
                            <VTextField :rules="formRules.address.rule" v-model="user.address" id="address" name="address"
                                type="text" :disabled="isDisabled" :counter="formRules.address.counter"
                                :hint="formRules.address.hint" required />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="posterIntro">案主簡介</label>
                            <VTextarea :rules="formRules.intro.rule" v-model="user.posterIntro" id="posterIntro"
                                name="posterIntro" type="textarea" :disabled="isDisabled" :counter="formRules.intro.counter"
                                :hint="formRules.intro.hint" />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="helperIntro">幫手簡介</label>
                            <VTextarea :rules="formRules.intro.rule" v-model="user.helperIntro" id="helperIntro"
                                name="helperIntro" type="textarea" :disabled="isDisabled" :counter="formRules.intro.counter"
                                :hint="formRules.intro.hint" />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <label class="label text-grey-darken-2 d-flex align-center" for="helperSpecialities">幫手專長
                            <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                                最多可以選三項
                            </v-chip>
                        </label>
                        <v-autocomplete :rules="formRules.helperSpecialities.rule" :disabled="isDisabled"
                            :items="taskCategories" chips clearable color="blue-grey-lighten-2" item-title="name"
                            item-value="name" multiple v-model="helperSpecialities" id="helperSpecialities"
                            name="helperSpecialities">
                            <template v-slot:chip="{ props, item }">
                                <v-chip v-bind="props" :text="item.name"></v-chip>
                            </template>
                        </v-autocomplete>
                    </v-col>

                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>
<script setup>

import { storeToRefs } from 'pinia'
import { storeAccount } from '@/stores/storeAccount'
import { getCategories } from "@/services/apis/general";
import { useAlert } from '~/composables/useAlert';
const profileForm = ref(null);
const { basicBox, confirmBox } = useAlert()



// - 取得會員資料 -
const _storeAccount = storeAccount()
const { getAccount, updateAccount } = _storeAccount
const { user } = storeToRefs(_storeAccount)


// - 取得任務類別 -
const taskCategories = ref([])
onMounted(async () => {
    try {
        let { data } = await getCategories();
        //console.log(data);
        taskCategories.value = data;
    } catch (err) {
        console.log({ err });
    }
})





// - 表單驗證 -
const { ruleRequired, ruleAddress, validateFormResult } = useFormUtil()
const _formRules = () => {
    const _counter = [10, 50, 100, 200]
    const _hint = '最多輸入{_counter}個字元'
    const _error = '只能輸入{_counter}個字元喔!'
    function _replace(text, counter) {
        const result = text.replace('{_counter}', counter)
        return result
    }
    return {
        name: {
            counter: _counter[0],
            hint: _replace(_hint, _counter[0]),
            rule: [
                ruleRequired,
                (v) => (!!v && v.length <= 10) || _replace(_error, _counter[0])
            ]
        },
        nickName: {
            counter: _counter[1],
            hint: _replace(_hint, _counter[1]),
            rule: [
                ruleRequired,
                (v) => (!!v && v.length <= _counter[1]) || _replace(_error, _counter[1])
            ]
        },
        address: {
            counter: _counter[2],
            hint: _replace(_hint, _counter[2]),
            rule: [
                ruleRequired,
                (v) => (!!v && v.length <= _counter[2]) || _replace(_error, _counter[2]),
                ruleAddress
            ]
        },
        intro: {
            counter: _counter[3],
            hint: _replace(_hint, _counter[3]),
            rule: [
                (v) => (!!v && v.length <= _counter[3]) || _replace(_error, _counter[3])
            ]
        },
        helperSpecialities: {
            rule: [
                (v) => (!helperSpecialitiesError) || "最多輸入三項"
            ]
        }
    }
}
const formRules = formRules || _formRules()
const helperSpecialities = ref(user.value.helperSpecialities)
let helperSpecialitiesError = false
watch(
    helperSpecialities,
    (val) => {
        //console.log(val.length, 'helperSpecialities')
        if (val.length > 3) {
            // val.pop()
            helperSpecialitiesError = true
        } else {
            helperSpecialitiesError = false
        }
    },
    {
        immediate: true,
    }
);


// - 是否開起編輯欄位 -
const isDisabled = ref(true);
function cancel() {
    //console.log(isDisabled.value, 'cancel')
    isDisabled.value = !isDisabled.value
    //重刷頁面
    profileForm.value.reset()
    getAccount()
}


// - 更新會員資料 -
const isUpdating = ref(false);
const submit = async () => {

    //1. 表單檢查
    const result = await validateFormResult(profileForm)
    //console.log(result, 'result')
    if (!result) {
        basicBox('表單驗證還沒有成功喔!')
        isUpdating.value = false
        return false;
    }

    //2. 開啟loading
    isUpdating.value = true

    //3. 組裝資料
    const data = {
        nickName: user.value.nickName,
        address: user.value.address,
        posterIntro: user.value.posterIntro,
        helperIntro: user.value.helperIntro,
        helperSpecialities: helperSpecialities.value
    }
    //console.log(data, 'data')

    //4. 更新資料
    updateAccount(data, () => {
        profileForm.value.reset()
        getAccount()
        basicBox('更新會員資料成功')
        isDisabled.value = true
        isUpdating.value = false
    }, () => {
        profileForm.value.reset()
        getAccount()
        basicBox("取得會員資料失敗");
        isDisabled.value = true
        isUpdating.value = false
    })

};


</script>
<style scoped></style>