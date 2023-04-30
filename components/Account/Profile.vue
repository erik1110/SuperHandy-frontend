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
                            <label class="label text-grey-darken-2" for="firstname">姓</label>
                            <VTextField :rules="rules.firstname" v-model="user.firstname" id="firstname" name="firstname"
                                type="text" :disabled="isDisabled" counter="5" hint="最多輸入5個字元" required
                                validate-on="blur" />
                        </div>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="lastname">名</label>
                            <VTextField :rules="rules.lastname" v-model="user.lastname" id="lastname" name="lastname"
                                type="text" :disabled="isDisabled" counter="10" hint="最多輸入10個字元" required />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="nickname">暱稱</label>
                            <VTextField :rules="rules.nickname" v-model="user.nickname" id="nickname" name="nickname"
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
                            <label class="label text-grey-darken-2" for="hostResume">案主簡介</label>
                            <VTextarea :rules="rules.hostResume" v-model="user.hostResume" id="hostResume" name="hostResume"
                                type="textarea" :disabled="isDisabled" counter="200" hint="最多輸入200個字元" />
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <div class="mt-1">
                            <label class="label text-grey-darken-2" for="helperResume">幫手簡介</label>
                            <VTextarea :rules="rules.helperResume" v-model="user.helperResume" id="helperResume"
                                name="helperResume" type="textarea" :disabled="isDisabled" counter="200"
                                hint="最多輸入200個字元" />
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
        firstname: '',
        lastname: '',
        nickname: '',
        phone: '',
        email: '',
        address: '',
        hostResume: '',
        helperResume: '',
    }
})

//表單檢查規則
const { ruleRequired, ruleAddress, validateFormResult } = useFormUtil()
const rules = {
    firstname: [
        ruleRequired,
        (v) => (!!v && v.length <= 10) || "長度不可以超過10個字元"
    ],
    lastname: [
        ruleRequired,
        (v) => (!!v && v.length <= 10) || "長度不可以超過10個字元"
    ],
    nickname: [
        ruleRequired,
        (v) => (!!v && v.length <= 10) || "長度不可以超過10個字元"
    ],
    address: [
        ruleRequired,
        (v) => (!!v && v.length <= 100) || "長度不可以超過100個字元",
        ruleAddress,
    ],
    hostResume: [
        (v) => (v.length <= 200) || "長度不可以超過200個字元"
    ],
    helperResume: [
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
}


//更新資料
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

    //put到後端
    setTimeout(() => {
        //顯示更新成功
        //重刷頁面
        isUpdating.value = false
        alert('更新成功')
    }, 5000)



};


</script>
<style scoped>
.theme-error {
    color: rgb(239, 68, 68)
}
</style>