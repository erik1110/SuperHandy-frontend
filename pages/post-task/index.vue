<template>
    <v-overlay v-model="loading"></v-overlay>
    <v-container>
        <VRow justify='center'>
            <VCol cols='12' lg='10'>
                <v-form @submit.prevent=submit ref='postTaskForm'>
                    <div class=''>
                        <label class='label text-grey-darken-2' for='title'>任務標題</label>
                        <v-text-field variant='outlined' :rules='postTaskFormRules.taskTitle.rule' v-model='title'
                            :counter='postTaskFormRules.taskTitle.counter' :hint='postTaskFormRules.taskTitle.hint'
                            required />
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='category'>服務類別</label>
                        <v-select variant='outlined' :rules='[ruleRequired]' :items='taskCategories' clearable
                            item-title='name' item-value='name' v-model='category'>
                        </v-select>
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='description'>任務說明</label>
                        <v-textarea variant='outlined' :rules='postTaskFormRules.taskDescription.rule' v-model='description'
                            :counter='postTaskFormRules.taskDescription.counter'
                            :hint='postTaskFormRules.taskDescription.hint' required />
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='salary'>任務薪水</label>
                        <v-text-field variant='outlined' :rules='[ruleSuperCoint]' v-model='salary' type='number' prefix=$
                            suffix=超人幣 required />
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='exposurePlan'>曝光方案</label>
                        <div class='d-md-flex'>
                            <v-radio-group v-for='(item, index) in exposurePlans' :key='index' v-model='exposurePlan'
                                :rules='postTaskFormRules.exposurePlan.rule' required>
                                <v-radio :label='`${item.title} ${item.price}點`' :value='item.title'></v-radio>
                            </v-radio-group>
                        </div>
                    </div>

                    <div class=mt-16>
                        <label class='label text-grey-darken-2' for='exposurePlan'>任務說明照片
                            <v-chip class=ma-1 color=red size=x-small>
                                非必填
                            </v-chip>
                        </label>
                        <UploadImage></UploadImage>
                    </div>

                    <div class=mt-16>
                        <label class='label text-grey-darken-2' for='exposurePlan'>任務聯絡人資訊</label>
                        <v-sheet border=lg opacity-12 class=text-body-2 mx-auto pa-3>
                            <v-container fluid>
                                <v-row>
                                    <v-col>
                                        <v-text-field label=姓名 v-model='contactInfoName'
                                            :rules='postTaskFormRules.name.rule' :counter='postTaskFormRules.name.counter'
                                            :hint='postTaskFormRules.name.hint' required />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field label=聯絡電話 :rules='[rulePhone]' v-model='contactInfoPhone' required />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field label=EMAIL :rules='[ruleEmail]' v-model='contactInfoEmail'
                                            required />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-autocomplete label=請選擇縣市 :rules='[ruleRequired]' :items='citys' clearable
                                            item-title='city' item-value='city' v-model='locationCity' required>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-autocomplete label=請選擇區域 :rules='[ruleRequired]' :items='discs' clearable
                                            v-model='locationDist' :hint=hintLocationDisc :readonly=readonlyLocationDisc
                                            required>
                                        </v-autocomplete>
                                    </v-col>

                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field label=地址 :rules='postTaskFormRules.address.rule'
                                            v-model='locationAddress' :counter='postTaskFormRules.address.counter'
                                            :hint='postTaskFormRules.address.hint' required />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-sheet>
                    </div>

                    <div class='btns text-center mt-16'>
                        <v-btn type='submit' class='mt-2' id='draft' :disabled="loading"
                            :loading="draftBtnloading">儲存為草稿</v-btn>
                        <v-btn type='submit' class='mt-2' id='post' :disabled="loading"
                            :loading="postBtnloading">立即刊登</v-btn>
                    </div>

                </v-form>
            </VCol>
        </VRow>
    </v-container>
</template>

<script setup>
import { getCategories, getExposurePlan } from '@/services/apis/general';
const { basicBox, confirmBox, deleteConfirmBox } = useAlert()
const _status = {
    draft: 'draft',
    post: 'post'
}
const _message = {
    draft: '儲存草稿成功',
    post: '立即刊登成功'
}

// - 表單初始宣告 -
const loading = ref(false);
const draftBtnloading = ref(false);
const postBtnloading = ref(false);
const title = ref('');
const category = ref('');
const description = ref('');
const salary = ref('')
const exposurePlan = ref('')
const imagesUrl = ref([])
const contactInfoName = ref('')
const contactInfoPhone = ref('')
const contactInfoEmail = ref('')
const locationCity = ref('')
const locationDist = ref('')
const locationAddress = ref('')
const locationLandmark = ref('')
const locationLongitude = ref('')//經度
const locationLatitude = ref('')//緯度

// - 表單驗證 -
const { formRules, ruleSuperCoint, rulePhone, ruleEmail, ruleRequired, validateFormResult } = useFormUtil()
const postTaskFormRules = formRules()
postTaskFormRules.exposurePlan = {
    rule: [
        (v) =>
            (!!v && v.length > 1) || "必填欄位",
    ],
}


// - 取得任務類別 & 曝光方案 & 取得縣市與地區 -
const exposurePlans = ref([])
const taskCategories = ref([])
const fakedataCitys = [
    { city: '台北市' },
    { city: '新北市' },
    { city: '高雄市' },
]
const fakedataDiscs = [
    { city: '台北市', disc: '大同區' },
    { city: '新北市', disc: '中正區' },
    { city: '高雄市', disc: '信義區' },
]
function getAllData() {
    Promise.all([
        getExposurePlan(),
        getCategories()
    ]).then(result => {
        //console.log(result[0].data, 'result')
        exposurePlans.value = result[0].data
        taskCategories.value = result[1].data
    }).catch(error => {
        console.log(error);
        basicBox('取得選單資料發生異常')
    })
}
onMounted(() => getAllData())


// - 取得縣市 -
const citys = computed(() => {
    return fakedataCitys;
})


// - 跟據縣市顯示地區選單 -
const hintLocationDisc = ref('')
const readonlyLocationDisc = ref(false)
const discs = computed(() => {
    if (!locationCity.value) {
        hintLocationDisc.value = '請先選擇縣市'
        readonlyLocationDisc.value = true
    } else {
        hintLocationDisc.value = ''
        readonlyLocationDisc.value = false
        const result = fakedataDiscs.filter(item => item.city === locationCity.value)
        return Object.values(result).map(item => item.disc)
    }
})



// - 送出表單 -
const postTaskForm = ref(null)
const submit = async (event) => {
    const _submitter = event.submitter.id
    console.log(_submitter, 'submitter')

    //1. 表單檢查
    // const result = await validateFormResult(postTaskForm)
    // //console.log(result, 'result')
    // if (!result) {
    //     basicBox('表單驗證還沒有成功喔!')
    //     isUpdating.value = false
    //     return false;
    // }

    //2. 開啟loading & disable btns
    loading.value = true
    switch (_submitter) {
        case _status.draft:
            draftBtnloading.value = true
            break;
        case _status.post:
            postBtnloading.value = true
            break;
        default:
            break;
    }

    //3. 組裝資料
    const data = {
        title: title.value,
        status: _submitter,
        category: category.value,
        description: description.value,
        salary: salary.value,
        exposurePlan: exposurePlan.value,
        imagesUrl: [],
        contactInfo: {
            name: contactInfoName,
            phone: contactInfoPhone,
            email: contactInfoEmail
        },
        location: {
            city: locationCity.value,
            dist: locationDist.value,
            address: locationAddress.value,
            landmark: locationLandmark.value,
            lng: locationLongitude.value,
            lat: locationLatitude.value
        }
    }
    console.log(data, 'data')


    //4. 更新資料
    //5. 關閉loading
    setTimeout(() => {
        loading.value = false
        draftBtnloading.value = false
        postBtnloading.value = false
        postTaskForm.value.reset()
    }, 5000)



};


// - 選擇服務類別帶出任務說明 -
watch(
    category,
    (val) => {
        if (val && taskCategories) {
            const result = taskCategories.value.filter((item) => item.name === val)
            description.value = result[0].template
        }
    },
);


</script>

<style scoped>
.btns button {
    width: 100%;
}

/* xs 以上 */
@media(min-width: 600px) {
    .btns button {
        width: auto;
        margin: 0 0.25rem;
    }
}
</style>