<template>
    <v-dialog v-model="loading">
        <v-container fullscreen full-width>
            <div class="d-flex justify-center">
                <v-progress-circular indeterminate color="indigo"></v-progress-circular>
            </div>
        </v-container>
    </v-dialog>
    <v-container>
        <VRow justify='center'>
            <VCol cols='12' lg='10'>
                <v-form @submit.prevent="submit" ref='postTaskForm'>
                    <div class=''>
                        <label class='label text-grey-darken-2' for='title'>任務標題</label>
                        <VTextField variant='outlined' :rules='postTaskFormRules.taskTitle.rule' v-model='title'
                            :counter='postTaskFormRules.taskTitle.counter' :hint='postTaskFormRules.taskTitle.hint'
                            required />
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='category'>服務類別</label>
                        <v-autocomplete variant='outlined' :rules='[ruleRequired]' :items='taskCategories' clearable
                            item-title='name' item-value='name' v-model='category'>
                        </v-autocomplete>
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='description'>任務說明</label>
                        <v-textarea variant='outlined' :rules='postTaskFormRules.taskDescription.rule' v-model='description'
                            :counter='postTaskFormRules.taskDescription.counter'
                            :hint='postTaskFormRules.taskDescription.hint' required />
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='salary'>任務薪水</label>
                        <VTextField variant='outlined' :rules='[ruleSuperCoint]' v-model='salary' type='number' prefix="$"
                            suffix="超人幣" required />
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

                    <div class="mt-16">
                        <label class='label text-grey-darken-2' for='exposurePlan'>任務說明照片
                            <v-chip class="ma-1" color="red" size="x-small">
                                非必填
                            </v-chip>
                        </label>
                        <UploadImage></UploadImage>
                    </div>

                    <div class="mt-16">
                        <label class='label text-grey-darken-2' for='exposurePlan'>任務聯絡人資訊</label>
                        <v-sheet border="lg opacity-12" class="text-body-2 mx-auto pa-3">
                            <v-container fluid>
                                <v-row>
                                    <v-col>
                                        <VTextField label="姓名" v-model='contactInfoName'
                                            :rules='postTaskFormRules.name.rule' :counter='postTaskFormRules.name.counter'
                                            :hint='postTaskFormRules.name.hint' required />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <VTextField label="聯絡電話" :rules='[rulePhone]' v-model='contactInfoPhone' required />
                                    </v-col>
                                    <v-col>
                                        <VTextField label="EMAIL" :rules='[ruleEmail]' v-model='contactInfoEmail'
                                            required />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-autocomplete label="請選擇縣市" :rules='[ruleRequired]' :items='citys' clearable
                                            item-title='name' item-value='name' v-model='locationCity' required>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete label="請選擇區域" :rules='[ruleRequired]' :items='discs' clearable
                                            item-title='name' item-value='name' v-model='locationDist'
                                            :disabled="disableDiscs" required>
                                        </v-autocomplete>
                                    </v-col>

                                </v-row>
                                <v-row>
                                    <v-col>
                                        <VTextField label="地址" :rules='postTaskFormRules.address.rule'
                                            v-model='locationAddress' :counter='postTaskFormRules.address.counter'
                                            :hint='postTaskFormRules.address.hint' required />
                                    </v-col>
                                </v-row>
                                <v-row class="text-center">
                                    <v-col>

                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-sheet>
                    </div>

                    <div class='btns text-center mt-16'>
                        <v-btn type='submit' class='mt-2' id='draft' :disabled="loading">儲存為草稿</v-btn>
                        <v-btn type='submit' class='mt-2' id='post' :disabled="loading">立即刊登</v-btn>
                    </div>

                </v-form>
            </VCol>
        </VRow>
    </v-container>
</template>

<script setup>
import { getCategories, getExposurePlan } from '@/services/apis/general';
const { basicBox, confirmBox, deleteConfirmBox } = useAlert()


// - 表單初始宣告 -
const loading = ref(false);
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


// - 取得任務類別 & 曝光方案  -
const exposurePlans = ref([])
const taskCategories = ref([])
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
const citys = ref([])
citys.value = [
    { name: '台北市' },
    { name: '新北市' },
    { name: '高雄市' },
]
// onMounted(async () => {
//     try {
//         let { data } = await getCategories();
//         //console.log(data);
//         citys.value = data;
//     } catch (err) {
//         console.log({ err });
//     }
// })


// - 取得地區 -
const discs = ref([])
discs.value = [
    { name: '大同區' },
    { name: '中正區' },
    { name: '信義區' },
]
// onMounted(async () => {
//     try {
//         let { data } = await getCategories();
//         //console.log(data);
//         discs.value = data;
//     } catch (err) {
//         console.log({ err });
//     }
// })


// - 送出表單 -
const postTaskForm = ref(null)
const submit = async (event) => {

    //console.log(event.submitter.id, 'submitter')

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

    //3. 組裝資料


    //4. 更新資料
    setTimeout(() => {
        loading.value = false
    }, 5000)

    //5. 關閉loading

};


// - 選擇服務類別帶出任務說明 -
function _getTaskCategoriesTemplate(category) {
    const result = taskCategories.value.filter((item) => item.name === category)
    return result[0].template
}
watch(
    category,
    (val) => {
        //console.log(val, 'category')
        description.value = _getTaskCategoriesTemplate(val)
    },
);
// - 選擇縣市帶出地區 -
const disableDiscs = ref(true)
watch(
    locationCity,
    (val) => {
        console.log(val, 'locationCity')
        if (val && val.length > 0) {
            //打開區域選單
            disableDiscs.value = false
        } else {
            //關閉區域選單
            disableDiscs.value = true
        }
    },
);


// - 開啟


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