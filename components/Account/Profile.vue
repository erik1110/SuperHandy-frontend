<template>
    <v-card :loading="isUpdating" color="transparent" class="mx-auto pa-5" elevation="0" border rounded="0">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="green-lighten-3" height="4" indeterminate></v-progress-linear>
        </template>

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
                            <VTextField :rules="rules.firstName" v-model="user.firstName" id="firstName" name="firstName"
                                type="text" disabled counter="5" hint="最多輸入5個字元" required validate-on="blur" />
                        </div>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="lastName">名</label>
                            <VTextField :rules="rules.lastName" v-model="user.lastName" id="lastName" name="lastName"
                                type="text" disabled counter="10" hint="最多輸入10個字元" required />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="nickName">暱稱</label>
                            <VTextField :rules="rules.nickName" v-model="user.nickName" id="nickName" name="nickName"
                                type="text" :disabled="isDisabled" counter="10" hint="最多輸入10個字元" required />
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
                            <VTextField :rules="rules.address" v-model="user.address" id="address" name="address"
                                type="text" :disabled="isDisabled" counter="100" hint="最多輸入100個字元" required />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="posterIntro">案主簡介</label>
                            <VTextarea :rules="rules.posterIntro" v-model="user.posterIntro" id="posterIntro"
                                name="posterIntro" type="textarea" :disabled="isDisabled" counter="200" hint="最多輸入200個字元" />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="helperIntro">幫手簡介</label>
                            <VTextarea :rules="rules.helperIntro" v-model="user.helperIntro" id="helperIntro"
                                name="helperIntro" type="textarea" :disabled="isDisabled" counter="200" hint="最多輸入200個字元" />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <label class="label text-grey-darken-2 d-flex align-center" for="helperSkills">幫手專長
                            <v-chip class="ma-1" color="red" text-color="white" size="x-small">
                                最多可以選三項
                            </v-chip>
                        </label>
                        <v-autocomplete :rules="rules.helperSkills" :disabled="isDisabled" :items="taskItems" chips
                            clearable color="blue-grey-lighten-2" item-title="name" item-value="name" multiple
                            v-model="helperSkills" id="helperSkills" name="helperSkills">
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


import { getAccountInfo, updateAccountInfo } from '@/services/apis'
const { spGet, spPatch } = useHttp()

//任務類別清單
const taskItems = [
    { name: 'AAA' },
    { name: 'BBB' },
    { name: 'CCC' },
    { name: 'DDD' }
]

//宣告
const { user } = reactive({
    user: {
        email: '',
        address: '',
        avatarPath: '',
        firstName: '',
        helperIntro: '',
        lastName: '',
        nickName: '',
        phone: '',
        posterIntro: '',
        helperSkills: ''
    }
})


//表單檢查規則
const { ruleRequired, ruleAddress, validateFormResult } = useFormUtil()
const rules = {
    firstName: [
        ruleRequired,
        (v) => (!!v && v.length <= 10) || "長度不可以超過10個字元"
    ],
    lastName: [
        ruleRequired,
        (v) => (!!v && v.length <= 10) || "長度不可以超過10個字元"
    ],
    nickName: [
        ruleRequired,
        (v) => (!!v && v.length <= 50) || "長度不可以超過50個字元"
    ],
    address: [
        ruleRequired,
        (v) => (!!v && v.length <= 100) || "長度不可以超過100個字元",
        ruleAddress,
    ],
    posterIntro: [
        (v) => (v.length <= 200) || "長度不可以超過200個字元"
    ],
    helperIntro: [
        (v) => (v.length <= 200) || "長度不可以超過200個字元"
    ],
    helperSkills: [
        (v) => (!helperSkillError) || "最多輸入三項"
    ]
}
const helperSkills = ref([])
let helperSkillError = false
watch(
    helperSkills,
    (val) => {
        if (val.length > 3) {
            val.pop()
            helperSkillError = true
        } else {
            helperSkillError = false
        }
    },
    {
        immediate: true,
    }
);


//是否開起編輯欄位
const isDisabled = ref(true);
function cancel () {
    console.log(isDisabled.value, 'cancel')
    isDisabled.value = !isDisabled.value
    //重刷頁面
    getAccountData()
}



//取得會員資料
onMounted(() => {
    getAccountData()
});
function getAccountData () {
    spGet(getAccountInfo).then((response) => {
        if (!response || !response?.userInfoForm || !response?.userInfoForm?.status) {
            alert('取得會員資料失敗')
            return
        }

        Object.keys(user).forEach((key) => {
            const value = response.userInfoForm[key]
            if (value) {
                user[key] = value
            }
        })

    }).catch((error) => {
        console.log(error)
        alert('取得會員資料失敗')
    });
}




//更新會員資料
const profileForm = ref(null);
const isUpdating = ref(false);
const submit = async () => {

    const result = await validateFormResult(profileForm)
    //console.log(result, 'result')
    if (!result) {
        //表單檢查不通過，不顯示loading
        isUpdating.value = false
        return false;
    }

    isUpdating.value = true
    //組裝資料
    const data = {
        nickName: user.nickName,
        phone: user.phone,
        address: user.address,
        posterIntro: user.posterIntro,
        helperIntro: user.helperIntro
    }

    //patch到後端
    spPatch(updateAccountInfo, data).then((response) => {
        //console.log(response, 'response')
        if (!response) {
            alert('更新會員資料失敗')
            return
        }
        alert('更新會員資料成功')
        getAccountData()
        isUpdating.value = false

    }).catch((error) => {
        console.log(error)
        alert('取得會員資料失敗')
    });



};


</script>
<style scoped></style>