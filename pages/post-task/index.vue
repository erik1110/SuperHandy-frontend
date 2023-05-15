<template>
    <v-overlay v-model="loading"></v-overlay>
    <v-container>
        <VRow justify='center'>
            <VCol cols='12' lg='10'>
                <v-form @submit.prevent='submit' ref='postTaskForm' validate-on="blur">

                    <div class=''>
                        <label class='label text-grey-darken-2' for='title'>任務標題</label>
                        <v-text-field variant='outlined' :rules='postTaskFormRules.taskTitle.rule' v-model='title'
                            :counter='postTaskFormRules.taskTitle.counter' :hint='postTaskFormRules.taskTitle.hint'
                            required />
                    </div>


                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='category'>服務類別</label>
                        <v-select variant='outlined' :rules='rules.category' :items='taskCategories' clearable
                            item-title='name' item-value='name' v-model='category' @update:modelValue="changeCategory">
                        </v-select>
                    </div>



                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='description'>任務說明</label>
                        <v-textarea variant='outlined' :rules='rules.description' v-model='description'
                            :counter='postTaskFormRules.taskDescription.counter'
                            :hint='postTaskFormRules.taskDescription.hint' required />
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='salary'>任務薪水</label>
                        <v-text-field variant='outlined' :rules='rules.salary' v-model='salary' type='number' prefix=$
                            suffix=超人幣 required />
                    </div>

                    <div class='mt-16'>
                        <label class='label text-grey-darken-2' for='exposurePlan'>曝光方案</label>
                        <div class='d-md-flex'>
                            <v-radio-group v-for='(item, index) in exposurePlans' :key='index' v-model='exposurePlan'
                                :rules='rules.exposurePlan' required>
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
                                        <v-text-field label=姓名 v-model='contactInfoName' :rules='rules.contactInfoName'
                                            :counter='postTaskFormRules.name.counter' :hint='postTaskFormRules.name.hint'
                                            required />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field label=聯絡電話 :rules='rules.contactInfoPhone' v-model='contactInfoPhone'
                                            required />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field label=EMAIL :rules='rules.contactInfoEmail' v-model='contactInfoEmail'
                                            required />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select label=請選擇縣市 :rules='rules.locationCity' :items='countyList' clearable
                                            item-title='city' item-value='city' v-model='locationCity' required
                                            @click:clear="clearDisc">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select label=請選擇區域 :rules='rules.locationDist' :items='townList' clearable
                                            item-title='disc' item-value='disc' v-model='locationDist'
                                            :hint='hintLocationDisc' :readonly='readonlyLocationDisc' persistent-hint
                                            required>
                                        </v-select>
                                    </v-col>

                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field label=地址 :rules='rules.locationAddress' v-model='locationAddress'
                                            :counter='postTaskFormRules.address.counter'
                                            :hint='postTaskFormRules.address.hint' required />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-sheet>
                    </div>

                    <div class='text-center mt-16'>
                        <v-btn color="primary" type='button' class='mt-2 me-2' id='draft' @click="resetForm">全部清除</v-btn>
                        <v-btn color="primary" type='submit' class='mt-2 me-2' id='draft' :disabled="loading"
                            :loading="draftBtnloading">儲存為草稿</v-btn>
                        <v-btn color="primary" type='submit' class='mt-2' id='publish' :disabled="loading"
                            :loading="publishBtnloading">立即刊登費用計算</v-btn>
                    </div>

                </v-form>
            </VCol>
        </VRow>
    </v-container>
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

// - 彈出視窗 -
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

<style scoped></style>