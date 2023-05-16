<template>
    <v-overlay v-model="loading"></v-overlay>
    <v-sheet class="pa-10 h-100" color="primary-lighten">
        <v-sheet max-width="1200" color="transparent" class="mx-auto">
            <h1 class="mb-4 sp-text-2xl sp-font-bold">發布任務</h1>
            <v-card class="mb-4 py-4 px-6" rounded="lg" elevation="0">
                <h2 class="po-title"><span>任務內容</span></h2>
                <v-form @submit.prevent='submit' ref='postTaskForm' validate-on="blur">
                    <div class='mt-4'>
                        <label class='text-v-gray-text pb-2 d-block' for='title'>任務標題</label>
                        <v-text-field v-model='title' :rules='postTaskFormRules.taskTitle.rule'
                            :counter='postTaskFormRules.taskTitle.counter' :hint='postTaskFormRules.taskTitle.hint'
                            placeholder="請輸入任務標題" id="title" />
                    </div>
                    <div class='mt-4'>
                        <label class='text-v-gray-text pb-2 d-block' for='category'>服務類別</label>
                        <v-select v-model='category' :rules='rules.category' :items='taskCategories' item-title='name'
                            item-value='name' @update:modelValue="changeCategory" placeholder="請選擇服務類別" id="category"
                            clearable>
                        </v-select>
                    </div>
                    <div class='mt-4'>
                        <label class='text-v-gray-text pb-2 d-block' for='description'>任務說明</label>
                        <v-textarea v-model='description' :rules='rules.description'
                            :counter='postTaskFormRules.taskDescription.counter'
                            :hint='postTaskFormRules.taskDescription.hint' placeholder="請輸入任務說明" id="description" />
                    </div>
                    <div class='mt-4 md:sp-w-1/2 lg:sp-w-1/3'>
                        <label class='text-v-gray-text pb-2 d-block' for='salary'>任務薪水</label>
                        <v-text-field v-model='salary' :rules='rules.salary' type='number' prefix=$ suffix=超人幣
                            id="salary" />
                    </div>
                    <div class='mt-4'>
                        <label class='text-v-gray-text pb-2 d-block'>曝光方案</label>
                        <div class='d-md-flex'>
                            <v-radio-group v-for='(item, index) in exposurePlans' :key='index' v-model='exposurePlan'
                                :rules='rules.exposurePlan'>
                                <v-radio :label='`${item.title} ${item.price}點`' :value='item.title'></v-radio>
                            </v-radio-group>
                        </div>
                    </div>
                    <div class='mt-4'>
                        <label class='text-v-gray-text pb-2 d-block'>任務說明照片(非必填)</label>
                        <UploadImage></UploadImage>
                    </div>
                    <v-divider class="border-opacity-100 my-8"></v-divider>
                    <h2 class="po-title"><span>任務聯絡人</span></h2>
                    <div class='mt-4 md:sp-w-1/2'>
                        <label class='text-v-gray-text pb-2 d-block' for="contactInfoName">姓名</label>
                        <v-text-field v-model='contactInfoName' :rules='rules.contactInfoName'
                            :counter='postTaskFormRules.name.counter' :hint='postTaskFormRules.name.hint'
                            id="contactInfoName" />
                    </div>
                    <div class='mt-4 md:sp-w-1/2'>
                        <label class='text-v-gray-text pb-2 d-block' for="contactInfoPhone">電話</label>
                        <v-text-field v-model='contactInfoPhone' :rules='rules.contactInfoPhone' id="contactInfoPhone" />
                    </div>
                    <div class='mt-4 md:sp-w-1/2'>
                        <label class='text-v-gray-text pb-2 d-block' for="contactInfoEmail">Email</label>
                        <v-text-field lv-model='contactInfoEmail' :rules='rules.contactInfoEmail' id="contactInfoEmail" />
                    </div>
                    <div class='mt-4'>
                        <label class='text-v-gray-text pb-2 d-block'>地址</label>
                        <div class="lg:sp-flex lg:sp-space-x-2">
                            <div class="lg:sp-w-1/2 lg:sp-flex lg:sp-space-x-2">
                                <v-select v-model='locationCity' :rules='rules.locationCity' :items='countyList'
                                    item-title='city' item-value='city' @click:clear="clearDisc" label="縣市" clearable>
                                </v-select>
                                <v-select v-model='locationDist' :rules='rules.locationDist' :items='townList'
                                    item-title='disc' item-value='disc' :hint='hintLocationDisc'
                                    :readonly='readonlyLocationDisc' label="區域" clearable>
                                </v-select>
                            </div>
                            <v-text-field :rules='rules.locationAddress' v-model='locationAddress'
                                :counter='postTaskFormRules.address.counter' :hint='postTaskFormRules.address.hint' />
                        </div>
                    </div>
                    <div class='my-8'>
                        <div class="md:sp-flex md:sp-justify-between">
                            <div>
                                <button type="button"
                                    class="sp-po-btn-lg sp-po-btn-orange sp-w-full sp-mb-4 md:sp-mb-0">刪除任務</button>
                            </div>
                            <div class="md:sp-flex md:sp-justify-end md:sp-space-x-2">
                                <button type="button"
                                    class="sp-po-btn-lg sp-po-btn-gray sp-w-full sp-mb-4 md:sp-mb-0 md:sp-w-auto">儲存為草稿</button>
                                <button type="button"
                                    class="sp-po-btn-lg sp-po-btn-purple sp-w-full sp-mb-4 md:sp-mb-0 md:sp-w-auto">計算刊登費用</button>
                            </div>
                        </div>
                    </div>
                </v-form>
            </v-card>
        </v-sheet>

    </v-sheet>
    <v-dialog v-model="dialogIsOpen" width="auto">
        <v-card>
            <v-toolbar :color="dialogType" title="系統訊息"></v-toolbar>
            <v-card-text>
                {{ dialogMessage }}
            </v-card-text>
            <v-card-actions v-if="dialogIsShowSuccessBtn" class="mt-2 justify-center">
                <v-btn color="primary me-2" @click="dialogIsOpen = false">繼續刊登</v-btn>
                <NuxtLink :to="siteConfig.linkPaths.tasks.to">
                    <v-btn color="primary">前往任務管理</v-btn>
                </NuxtLink>
            </v-card-actions>
            <v-card-actions v-else class="mt-2">
                <v-btn color="primary me-2 " @click="dialogIsOpen = false" block>關閉</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="feeDialogIsOpen" width="auto" class="fee-dialog">
        <v-card rounded="lg" elevation="0" min-width="300px" max-width="600px">
            <v-toolbar color="white" title="刊登費用支付" class="text-center border-b-sm">
                <v-btn icon dark @click="feeDialogIsOpen = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text class="pa-4">
                <table class="w-100 sp-align-middle">
                    <tbody>
                        <tr class="sp-border-b sp-h-12">
                            <td class="sp-text-v-gray-dark sp-font-bold">目前持有超人幣</td>
                            <td class="sp-text-end">10點</td>
                        </tr>
                        <tr class="sp-border-b sp-h-12">
                            <td class="sp-text-v-gray-dark sp-font-bold">可折抵幫手幣</td>
                            <td>
                                <div class="d-flex align-center justify-end">
                                    <span>40點</span>
                                    <v-checkbox-btn class="" inline></v-checkbox-btn>
                                </div>
                            </td>
                        </tr>
                        <tr class="sp-h-12">
                            <td class="sp-text-v-gray-dark sp-font-bold">付款明細</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="pl-4">
                                <table class="w-100 sp-align-middle">
                                    <tbody>
                                        <tr class="sp-h-10">
                                            <td class="sp-text-v-gray-dark">曝光方案</td>
                                            <td class="sp-text-end">50點</td>
                                        </tr>
                                        <tr class="sp-h-10">
                                            <td class="sp-text-v-gray-dark">預扣薪水</td>
                                            <td class="sp-text-end">50點</td>
                                        </tr>
                                        <tr class="sp-h-10">
                                            <td class="sp-text-v-gray-dark">折抵幫手幣</td>
                                            <td class="sp-text-end">50點</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr class="sp-bg-v-gray-light sp-h-12">
                            <td class="sp-font-bold pl-2">總金額</td>
                            <td class="sp-font-bold sp-text-v-orange sp-text-end sp-text-xl pe-2">110點</td>
                        </tr>
                        <tr class="sp-border-b sp-h-20">
                            <td class="sp-text-v-orange">
                                <v-icon class="mx-2">mdi-alert-circle</v-icon>超人幣餘額不足，請儲值
                            </td>
                            <td class="sp-text-end">
                                <NuxtLink to="">
                                    <button class="sp-po-btn-pill sp-po-btn-orange-dark">立即儲值</button>
                                </NuxtLink>
                            </td>
                        </tr>
                        <tr class="sp-border-b sp-h-20">
                            <td>
                                <v-checkbox-btn label="我已詳閱點數付款須知" class="" inline></v-checkbox-btn>
                            </td>
                            <td class="sp-text-end">
                                <NuxtLink to="">
                                    <button class="sp-po-btn sp-po-btn-purple-dark">確認刊登</button>
                                </NuxtLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="my-2">
                    <h6 class="mb-2">點數付款須知</h6>
                    <ul class="sp-list-disc pl-5">
                        <li>案主可使用幫手幣來代替超人幣刊登任務，兌換比例為1:1，幫手幣可透過每月任務回饋以及儲值取得。</li>
                        <li>案主設定的任務薪水將於任務刊登時由系統自動從案主的點數帳戶預先扣除，待任務驗收完成後，系統會自動將任務薪水支付給幫手。</li>
                        <li>如果任務超過刊登日無人接案或案主提前終止任務刊登，系統會自動將任務薪水退還到案主的點數帳戶，但案主刊登任務時所支付的曝光方案點數將不予退還。</li>
                        <li>如付款時使用幫手幣折抵，退還點數幣別順序為幫手幣>超人幣，幫手幣退還完畢，才會退還超人幣。</li>
                    </ul>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import tw_county from '@/static/tw_county.json'
import tw_town from '@/static/tw_town.json'
import { siteConfig } from '@/services/siteConfig'
import { getCategories, getExposurePlan } from '@/services/apis/general';
import { postDraft, postPublish } from '@/services/apis/postTask';
const { checkRespStatus } = useHttp();
const { logInfo, logError } = useLog();
const { confirmBox } = useAlert()
const _work = '刊登任務'
// const { vueApp } = useNuxtApp()

// - loading -
const loading = ref(false);
const draftBtnloading = ref(false);
const publishBtnloading = ref(false);
function setLoading({
    overlay,
    draftBtn,
    publishBtn
}) {
    loading.value = overlay;
    draftBtnloading.value = draftBtn;
    publishBtnloading.value = publishBtn
}

// - 訊息彈出視窗 -
const dialogHeaderColor = {
    info: 'primary',
    error: 'error'
}
const dialogType = ref('')
const dialogIsOpen = ref(false)
const dialogMessage = ref('')
const dialogIsShowSuccessBtn = ref(false)
function setPostTaskDialog({
    isOpen,
    message,
    isShowSuccessBtn,
    HeaderColor,
}) {
    dialogIsOpen.value = isOpen
    dialogMessage.value = message
    dialogIsShowSuccessBtn.value = isShowSuccessBtn
    dialogType.value = !HeaderColor ? dialogHeaderColor.info : HeaderColor
}


// - 費用彈出視窗 -
const feeDialogIsOpen = ref(true)

// - 表單宣告 -
const postTaskForm = ref(null)
const title = ref('');
const category = ref('');
const description = ref('');
const salary = ref(0)
const exposurePlan = ref('')
const imagesUrl = ref([])
const contactInfoName = ref('')
const contactInfoPhone = ref('')
const contactInfoEmail = ref('')
const locationCity = ref('')
const locationDist = ref('')
const locationAddress = ref('')
const superCoin = ref(0)
const helperCoin = ref(0)


// - 表單驗證 -
const { formRules, ruleSuperCoin, rulePhone, ruleEmail, ruleAddress, ruleRequired, validateFormResult } = useFormUtil()
const postTaskFormRules = formRules()
const _draftRule = {
    category: [],
    description: postTaskFormRules.taskDescription.rule,
    salary: [ruleSuperCoin],
    exposurePlan: [],
    contactInfoName: [],
    contactInfoPhone: [rulePhone],
    contactInfoEmail: [ruleEmail],
    locationCity: [],
    locationDist: [],
    locationAddress: []
}
const _publishRule = {
    category: [ruleRequired],
    description: [ruleRequired, postTaskFormRules.taskDescription.rule[0]],
    salary: [ruleSuperCoin],
    exposurePlan: [(v) => (!!v && v.length > 1) || "必填欄位"],
    contactInfoName: [ruleRequired, postTaskFormRules.name.rule[0]],
    contactInfoPhone: [ruleRequired, rulePhone],
    contactInfoEmail: [ruleRequired, ruleEmail],
    locationCity: [ruleRequired],
    locationDist: [ruleRequired],
    locationAddress: [ruleAddress]
}
const rules = ref(_draftRule)
function setFormRule(rules, status) {
    switch (status) {
        case siteConfig.taskStatus.draft:
            rules.value = _draftRule
            break;
        case siteConfig.taskStatus.publish:
            rules.value = _publishRule
            break;
        default:
            break;
    }
}


// - 表單送出 -
const resetForm = () => {
    postTaskForm.value.reset()
    salary.value = 0
}
const postFormData = async (status, data) => {
    switch (status) {
        case siteConfig.taskStatus.draft:
            logInfo(_work, 'draft data', data)
            return await postDraft(data);
        case siteConfig.taskStatus.publish:
            data.taskTrans = {
                superCoin: superCoin.value,
                helperCoin: helperCoin.value
            }
            logInfo(_work, 'publish data', data)
            return await postPublish(data);
        default:
            break;
    }
}
const submit = async (event) => {
    let _message = ''
    let _dialogType = ''
    let _isShowSuccessBtn = false
    try {
        // 1. 開啟loading & disable btns
        const _submitter = event.submitter.id
        setLoading({
            overlay: true,
            draftBtn: _submitter === siteConfig.taskStatus.draft,
            publishBtn: _submitter === siteConfig.taskStatus.publish,
        })
        logInfo(_work, 'submitter', _submitter)


        // 2.表單檢查
        setFormRule(rules, _submitter)
        const validate = await validateFormResult(postTaskForm)
        logInfo(_work, 'validateFormResult', validate)
        if (!validate) {
            // if (process.client) {
            //     //console.log(vueApp._instance.ctx.$vuetify, 'postTaskForm.value')
            //     const arr = postTaskForm.value.items.filter(item => item.isValid === false)
            //     const id = arr[0].id
            //     const heigh = document.getElementById(id).scrollHeight
            //     console.log(heigh, 'scrollHeight')
            //     window.scrollTo({
            //         top: 0,
            //         behavior: 'smooth'
            //     })
            // }
            _message = '表單驗證還沒有完成喔!';
            return;
        }

        //3. 更新資料
        //4. 關閉loading & reset form
        const data = {
            title: title.value,
            category: category.value,
            description: description.value,
            salary: parseInt(salary.value),
            exposurePlan: exposurePlan.value,
            imagesUrl: [],
            contactInfo: {
                name: contactInfoName.value,
                phone: contactInfoPhone.value,
                email: contactInfoEmail.value
            },
            location: {
                city: locationCity.value,
                dist: locationDist.value,
                address: locationAddress.value,
            }
        }
        const response = await postFormData(_submitter, data)
        logInfo(_work, 'response', response);
        if (response && checkRespStatus(response)) {
            resetForm()
            _isShowSuccessBtn = true
        } else {
            _dialogType = dialogHeaderColor.error
        }
        _message = response.message

    } catch (error) {

        _message = '刊登任務失敗'
        _dialogType = dialogHeaderColor.error
        logError(_work, { error });

    } finally {

        setLoading({
            overlay: false,
            draftBtn: false,
            publishBtn: false,
        })
        setPostTaskDialog({
            isOpen: true,
            message: _message,
            isShowSuccessBtn: _isShowSuccessBtn,
            HeaderColor: _dialogType
        })

    }
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
        logError('取得選單資料', error);
        setPostTaskDialog({
            isOpen: true,
            message: '取得選單資料發生異常',
            isShowSuccessBtn: true,
            HeaderColor: dialogHeaderColor.error
        })
    })
}
getAllData()



// - 選擇服務類別帶出任務說明 -
const changeCategory = (value) => {
    //console.log(value, 'category.value')
    const _setDescription = () => {
        const result = taskCategories.value?.filter((item) => item.name === value)
        description.value = result.length > 0 ? result[0].template : ''
    }
    // 1. 如果任務說明是空的，就直接帶入樣板
    // 2. 如果任務說明已有資料的，就詢問是否要清空
    if (description.value) {
        confirmBox('是否要清空目前的任務說明?', _setDescription)
    } else {
        _setDescription()
    }
}


// - 跟據縣市顯示地區選單 -
const hintLocationDisc = ref('')
const readonlyLocationDisc = ref(true)
const countyList = ref(tw_county)
const townList = computed(() => {
    if (!locationCity.value) {
        hintLocationDisc.value = '請先選擇縣市'
        readonlyLocationDisc.value = true
    } else {
        hintLocationDisc.value = ''
        readonlyLocationDisc.value = false
        try {
            const result = tw_town.filter(item => item.city === locationCity.value)
            return Object.values(result).map(item => item.disc)
        } catch (error) {
            logError(_work, "取得區域選單", { error })
            return []
        }
    }
})
// 當縣市變更，區域也要清空
watch(locationCity, (nV, oV) => {
    if (nV !== oV) {
        clearDisc()
    }
})
function clearDisc() {
    locationDist.value = ''
}




</script>

<style scoped>
/* po:postTask */
.po-title {
    @apply sp-border-l-8 sp-border-secondary sp-pl-4 sp-font-bold sp-text-lg sp-text-primary
}
</style>