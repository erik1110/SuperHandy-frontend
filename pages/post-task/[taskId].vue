<template>
  <v-overlay v-model="loading" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <v-sheet class="pa-10 h-100" color="primary-lighten">
    <v-sheet max-width="1200" color="transparent" class="mx-auto">
      <h1 class="mb-4 sp-text-2xl sp-font-bold">刊登任務</h1>
      <v-card class="mb-4 py-4 px-6" rounded="lg" elevation="0">
        <h2 class="po-title"><span>任務內容</span></h2>
        <v-form @submit.prevent='submit' ref='postTaskForm' validate-on="blur">
          <div class='mt-4'>
            <label class='text-v-gray-text pb-2 d-block' for='title'>任務標題</label>
            <v-text-field v-model='title' :rules='postTaskFormRules.taskTitle.rule'
              :counter='postTaskFormRules.taskTitle.counter' :hint='postTaskFormRules.taskTitle.hint'
              placeholder="請輸入任務標題" id="title" @keypress.enter.prevent />
          </div>
          <div class='mt-4'>
            <label class='text-v-gray-text pb-2 d-block' for='category'>服務類別</label>
            <v-select v-model='category' :rules='rules.category' :items='taskCategories' item-title='name'
              item-value='name' placeholder="請選擇服務類別" id="category" clearable>
            </v-select>
          </div>
          <div class='mt-4'>
            <label class='text-v-gray-text pb-2 d-block' for='description'>任務說明</label>
            <v-textarea v-model='description' :rules='rules.description'
              :counter='postTaskFormRules.taskDescription.counter' :hint='postTaskFormRules.taskDescription.hint'
              placeholder="請輸入任務說明" id="description" />
          </div>
          <div class='mt-4 md:sp-w-1/2 lg:sp-w-1/3'>
            <label class='text-v-gray-text pb-2 d-block' for='salary'>任務薪水</label>
            <v-text-field v-model='salary' :rules='rules.salary' type='number' prefix=$ suffix=超人幣 id="salary"
              @keypress.enter.prevent />
          </div>
          <div class='mt-4'>
            <label class='text-v-gray-text pb-2 d-block'>曝光方案</label>
            <div class='d-md-flex'>
              <v-radio-group v-for='(item, index) in exposurePlans' :key='index' v-model='exposurePlan'
                :rules='rules.exposurePlan'>
                <v-radio :label='`${item.title} ${item.price}點`' :value='item.title' @keypress.enter.prevent></v-radio>
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
              :counter='postTaskFormRules.name.counter' :hint='postTaskFormRules.name.hint' id="contactInfoName"
              @keypress.enter.prevent />
          </div>
          <div class='mt-4 md:sp-w-1/2'>
            <label class='text-v-gray-text pb-2 d-block' for="contactInfoPhone">電話</label>
            <v-text-field v-model='contactInfoPhone' :rules='rules.contactInfoPhone' id="contactInfoPhone"
              @keypress.enter.prevent />
          </div>
          <div class='mt-4 md:sp-w-1/2'>
            <label class='text-v-gray-text pb-2 d-block' for="contactInfoEmail">Email</label>
            <v-text-field v-model='contactInfoEmail' :rules='rules.contactInfoEmail' id="contactInfoEmail"
              @keypress.enter.prevent />
          </div>
          <div class='mt-4'>
            <label class='text-v-gray-text pb-2 d-block'>地址</label>
            <div class=" lg:sp-flex lg:sp-space-x-2">
              <div class=" lg:sp-w-1/2 lg:sp-flex lg:sp-space-x-2">
                <v-select v-model='locationCity' :rules='rules.locationCity' :items='countyList' item-title='city'
                  item-value='city' @click:clear="clearDist" label="縣市" clearable>
                </v-select>
                <v-select v-model='locationDist' :rules='rules.locationDist' :items='townList' item-title='dist'
                  item-value='dist' :hint='hintLocationDist' :readonly='readonlyLocationDist' label="區域" clearable>
                </v-select>
              </div>
              <v-text-field :rules='rules.locationAddress' v-model='locationAddress'
                :counter='postTaskFormRules.address.counter' :hint='postTaskFormRules.address.hint'
                @keypress.enter.prevent />
            </div>
          </div>
          <div class='my-8'>
            <div class="md:sp-flex md:sp-justify-between">
              <div>
                <v-btn color="v-orange" type='button' class='sp-mb-4 sp-w-full md:sp-mb-0' @click="resetForm">全部清除</v-btn>
              </div>
              <div class="md:sp-flex md:sp-justify-end md:sp-space-x-2">
                <div v-if="checkTaskId(taskId)" class="md:sp-space-x-2">
                  <v-btn type='button' id='deleteDraft' color="v-gray-placeholder"
                    class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto' :disabled="loading" :loading="draftDeleteBtnloading"
                    @click="openConfirmModal">刪除草稿</v-btn>
                  <v-btn type='submit' id='updateDraft' color="v-gray-placeholder"
                    class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto' :disabled="loading"
                    :loading="draftUpdateBtnloading">更新草稿</v-btn>
                </div>
                <div v-else>
                  <v-btn type='submit' id='addDraft' color="v-gray-placeholder"
                    class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto' :disabled="loading"
                    :loading="draftAddBtnloading">儲存為草稿</v-btn>
                </div>
                <v-btn type='button' color="v-purple" class='sp-mb-4 sp-w-full md:sp-mb-0 md:sp-w-auto'
                  :disabled="loading" @click="openFeeModal">計算刊登費用</v-btn>
              </div>
            </div>
          </div>
          <div>
            <v-btn color="primary" @click="fakeData">填入假資料</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-sheet>
  </v-sheet>
  <PostTaskFeeModal :dialog="postTaskFeeModal" :option="feeModalOption" :loading="publishBtnloading"
    @aClose="postTaskFeeModal = false" @aSubmit="submit">
  </PostTaskFeeModal>
  <PostTaskModal :option="modalOption" @close="closeModal" @aDeleteDraft="deleteDraft"></PostTaskModal>
</template>

<script setup>
import tw_county from '@/static/tw_county.json'
import tw_town from '@/static/tw_town.json'
import { siteConfig } from '@/services/siteConfig'
import { getCategories, getExposurePlan } from '@/services/apis/general';
import { postDraft, postPublish, putDraftById, postPublishFromDraft, getDraftById, deleteDraftById } from '@/services/apis/postTask';
import { getAccountPoints } from '@/services/apis/point';
const { formRules, rulePhone, ruleEmail, ruleAddress, ruleRequired, validateFormResult } = useFormUtil()
const postTaskFormRules = formRules()
const { checkRespStatus } = useHttp();
const { logInfo, logError } = useLog();
const _work = '刊登任務'
let descriptionTemplateList = []
// let userSuperCoinTotal = 0
let taskId = ''


// - 表單宣告 -
const postTaskForm = ref(null)
const title = ref('');
const category = ref('');
const description = ref('');
const salary = ref(10)
const exposurePlan = ref('')
const imagesUrl = ref([])
const contactInfoName = ref('')
const contactInfoPhone = ref('')
const contactInfoEmail = ref('')
const locationCity = ref('')
const locationDist = ref('')
const locationAddress = ref('')
const userCoin = ref({
  superCoin: 0,
  helperCoin: 0
})
const exposurePlans = ref([])
const taskCategories = ref([])
const checkTaskId = () => taskId && taskId.length == 24 ? true : false


// - loading -
const loading = ref(false);
const draftAddBtnloading = ref(false);//儲存為草稿
const draftUpdateBtnloading = ref(false);//更新草稿
const draftDeleteBtnloading = ref(false);//刪除草稿
const publishBtnloading = ref(false);
function openLoading({
  overlay,
  draftAdd,
  draftUpdate,
  draftDelete,
  publishBtn
}) {
  loading.value = overlay ?? true;
  draftAddBtnloading.value = draftAdd ?? false;
  draftUpdateBtnloading.value = draftUpdate ?? false;
  draftDeleteBtnloading.value = draftDelete ?? false;
  publishBtnloading.value = publishBtn ?? false;
}
function closeLoading() {
  loading.value = false
  draftAddBtnloading.value = false
  draftUpdateBtnloading.value = false
  draftDeleteBtnloading.value = false
  publishBtnloading.value = false
}



// - 訊息彈出視窗 -
const postTaskModal = useState("postTaskModal", () => ref(false));
const modalOption = ref({
  type: '',
  message: '',
  isShowSuccessBtn: false,
  isShowGoIndexBtn: false,
  isShowConfirmBtn: false
})
const openModal = (option) => {
  const _option = {
    type: option.type ?? '',
    message: option.message ?? '',
    isShowSuccessBtn: option.isShowSuccessBtn ?? false,
    isShowGoIndexBtn: option.isShowGoIndexBtn ?? false,
    isShowConfirmBtn: option.isShowConfirmBtn ?? false,
  }

  modalOption.value.type = _option.type
  modalOption.value.message = _option.message
  modalOption.value.isShowSuccessBtn = _option.isShowSuccessBtn
  modalOption.value.isShowGoIndexBtn = _option.isShowGoIndexBtn
  modalOption.value.isShowConfirmBtn = _option.isShowConfirmBtn
  if (process.client) {
    postTaskModal.value = true
  }
}
const closeModal = () => {
  if (process.client) {
    postTaskModal.value = false
    // 關閉訊息後一律導向
    navigateTo(siteConfig.linkPaths.postTask.to)
    //更新時路由切換但元件無法刷新
    // const route = useRoute()
    // if (route.path.indexOf(taskId) >= 0) {
    //   Init()
    //   return;
    // }
    // if (modalOption.value.isShowSuccessBtn && checkTaskId(taskId)) {
    //   navigateTo({ path: `/post-task/${taskId}` })
    // } else {
    //   navigateTo(`/post-task/-1`)
    // }
  }
}

// 監看router變化
// watch: {
//   $route(to, from) {
//     console.log(to) // 目的地
//     console.log(from) // 原地
//   }
// }
// const route = useRoute()
// console.log(route, 'route')
// watch(() => route.path, (to, from) => {
//   console.log(to, 'to') // 目的地
//   console.log(from, 'from') // 原地
// })
// onBeforeRouteUpdate(to => {
//   console.log(to.params, to.query, 'anna')
// })



// - 刊登費用計算視窗 -
const postTaskFeeModal = useState("postTaskFeeModal", () => ref(false));
const feeModalOption = ref({
  superCoin: 0,
  helperCoin: 0,
  exposurePlanPoint: 0,
  salary: 0,
  isDraft: false
})
const openFeeModal = async () => {
  const result = await validatePostTaskForm(siteConfig.taskStatus.published)
  if (!result) return;
  const exPlan = exposurePlans.value.find(item => item.title === exposurePlan.value)
  feeModalOption.value.exposurePlanPoint = exPlan.price
  feeModalOption.value.salary = salary.value
  feeModalOption.value.superCoin = userCoin.value.superCoin
  feeModalOption.value.helperCoin = userCoin.value.helperCoin
  feeModalOption.value.isDraft = checkTaskId(taskId)
  if (process.client) {
    postTaskFeeModal.value = true
  }
  logInfo(_work, 'openFeeDialog', feeModalOption)
}



// - 表單驗證 -
const _draftRule = {
  category: [],
  description: postTaskFormRules.taskDescription.rule,
  salary: postTaskFormRules.taskSalary.rule,
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
  salary: postTaskFormRules.taskSalary.rule,
  exposurePlan: [(v) => (!!v && v.length > 1) || "必填欄位"],
  contactInfoName: [ruleRequired, postTaskFormRules.name.rule[0]],
  contactInfoPhone: [ruleRequired, rulePhone],
  contactInfoEmail: [ruleRequired, ruleEmail],
  locationCity: [ruleRequired],
  locationDist: [ruleRequired],
  locationAddress: [ruleAddress]
}
const rules = ref(_draftRule)
//增加任務薪水檢查規則
const checkUserSuperCoinTotal = (v) => v > userCoin.value.superCoin ? false : true
const validatePostTaskForm = async (status) => {

  switch (status) {
    case siteConfig.taskStatus.addDraft:
    case siteConfig.taskStatus.updateDraft:
      // case siteConfig.taskStatus.deleteDraft:
      rules.value = _draftRule
      break;
    case siteConfig.taskStatus.published:
    case siteConfig.taskStatus.publishFromDraft:
      rules.value = _publishRule
      break;
    default:
      rules.value = _publishRule
      break;
  }

  const validate = await validateFormResult(postTaskForm)
  logInfo(_work, 'validatePostTaskForm', validate)
  if (validate) {
    return true;
  }
  openModal({
    type: siteConfig.dialogType.error,
    message: '表單驗證還沒有完成',
  })
  return false;
}


// - 表單送出 -
const resetForm = () => {
  postTaskForm.value?.reset() //防止postTaskForm null
  salary.value = 10
  postTaskFeeModal.value = false
  postTaskModal.value = false
}
const postFormData = async (status, data) => {
  switch (status) {
    case siteConfig.taskStatus.addDraft:
      logInfo(_work, 'add draft data', data)
      return await postDraft(data);

    case siteConfig.taskStatus.updateDraft:
      logInfo(_work, 'update draft data', data)
      return await putDraftById(taskId, data);

    case siteConfig.taskStatus.published:
      logInfo(_work, 'published data', data)
      return await postPublish(data);

    case siteConfig.taskStatus.publishFromDraft:
      logInfo(_work, 'published from draft data ', data)
      return await postPublishFromDraft(taskId, data);

    default:
      break;
  }
}
const submit = async (event, taskTrans) => {

  let _message = ''
  let _dialogType = siteConfig.dialogType.info
  let _isShowSuccessBtn = false

  //1. 開啟loading & disable btns
  const _submitter = event.submitter.id
  openLoading({
    overlay: true,
    draftAdd: _submitter === siteConfig.taskStatus.addDraft,
    draftUpdate: _submitter === siteConfig.taskStatus.updateDraft,
    publishBtn: _submitter === siteConfig.taskStatus.published,
  })
  logInfo(_work, 'submit', event, taskTrans)


  // 2.表單檢查
  const result = await validatePostTaskForm(_submitter)
  if (!result) {
    closeLoading()
    return;
  }

  //3. 更新資料
  //4. 關閉loading & reset form
  try {
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
    if (taskTrans) {
      data.taskTrans = {
        superCoin: taskTrans.superCoin,
        helperCoin: taskTrans.helperCoin
      }
    }

    const response = await postFormData(_submitter, data)
    logInfo(_work, 'submit.response', response);
    if (response && checkRespStatus(response)) {
      _isShowSuccessBtn = true
      //更新taskId
      // taskId = checkTaskId(taskId) ? taskId : response.data.taskId
      // console.log(taskId, 'taskId')
    } else {
      _dialogType = siteConfig.dialogType.error
    }
    _message = response.message

  } catch (error) {

    _message = '刊登任務失敗'
    _dialogType = siteConfig.dialogType.error
    logError(_work, 'submit', { error });

  } finally {

    resetForm()
    closeLoading()
    excuteAsyncFunc(getAccountPoints, setUserSuperCoinTotal)
    if (_message) {
      openModal({
        type: _dialogType,
        message: _message,
        isShowSuccessBtn: _isShowSuccessBtn
      })
    }

  }
}


// 設定會員的超人幣和幫手幣
const setUserSuperCoinTotal = (response) => {
  userCoin.value = response.data
  //增加任務薪水檢查規則
  const index = postTaskFormRules.taskSalary.rule.findIndex((item) => item == 'checkUserCoin')
  if (index >= 0) {
    postTaskFormRules.taskSalary.rule[index] = ((v) => checkUserSuperCoinTotal(v) || `不可超過目前帳戶儲值餘額 ${userCoin.value.superCoin} 點超人幣`)
  }
  //logInfo(_work, 'setUserSuperCoinTotal', userCoin.value, postTaskFormRules.taskSalary.rule)
}
// 設定曝光方案
const setExposurePlan = (response) => {
  // logInfo(_work, 'setExposurePlan', response);
  exposurePlans.value = response.data
  descriptionTemplateList = response.data.map(item => item.template)
}
// 有錯誤訊息才顯示
const excuteAsyncFunc = async (excuteFunc, params, successFunc) => {

  if (!excuteFunc || typeof excuteFunc !== 'function') {
    return;
  }

  let _message = ''
  openLoading({ overlay: true })
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
    closeLoading()
    if (_message) {
      openModal({
        type: siteConfig.dialogType.error,
        message: _message,
      })
    }
  }
}



// - 選擇服務類別帶出任務說明 -
watch(category, (nV, oV) => {
  // 動作是清空就離開
  if (!nV) return;

  // 如果任務說明是空的，就直接帶入樣板
  const newObj = taskCategories.value?.find(item => item.name === nV)
  if (newObj && newObj.template && !description.value) {
    description.value = newObj.template
    return;
  }
  // 只要任務說明是樣板，就可以被替換
  const index = descriptionTemplateList.findIndex(item => item === description.value)
  if (index >= 0) {
    description.value = newObj.template
    return;
  }
})


// - 跟據縣市顯示地區選單 -
const hintLocationDist = ref('')
const readonlyLocationDist = ref(true)
const countyList = ref(tw_county)
// const townList = ref(tw_town)
const townList = computed(() => {
  if (!locationCity.value) {
    hintLocationDist.value = '請先選擇縣市'
    readonlyLocationDist.value = true
  } else {
    hintLocationDist.value = ''
    readonlyLocationDist.value = false
    try {
      const result = tw_town.filter(item => item.city === locationCity.value)
      return Object.values(result).map(item => item.dist)
    } catch (error) {
      logError(_work, "取得區域選單", { error })
      return []
    }
  }
})
// 當縣市變更，區域也要清空
watch(locationCity, (nV, oV) => {
  if (!oV) return
  if (nV !== oV) {
    clearDist()
  }
})
function clearDist() {
  locationDist.value = ''
}


// Init
const Init = () => {
  excuteAsyncFunc(getExposurePlan, null, setExposurePlan)
  excuteAsyncFunc(getCategories, null, (response) => taskCategories.value = response.data)
  excuteAsyncFunc(getAccountPoints, null, setUserSuperCoinTotal)
  // - 取得草稿資料 -
  const route = useRoute();
  taskId = route.params.taskId
  //logInfo(taskId, 'taskId')
  logInfo(_work, checkTaskId(taskId), 'check.taskId')
  if (checkTaskId(taskId)) {
    excuteAsyncFunc(getDraftById, taskId, (response) => {
      const data = response.data
      title.value = data.title;
      category.value = data.category;
      description.value = data.description;
      salary.value = data.salary;
      exposurePlan.value = data.exposurePlan;
      contactInfoName.value = data.contactInfo.name;
      contactInfoPhone.value = data.contactInfo.phone;
      contactInfoEmail.value = data.contactInfo.email;
      locationCity.value = data.location.city;
      locationDist.value = data.location.dist;
      locationAddress.value = data.location.address;
    })
  }
}
Init();




// - 刪除草稿 -
const openConfirmModal = () => {
  openModal({
    message: '確認要刪除這筆任務草稿?',
    isShowConfirmBtn: true
  })

}
const deleteDraft = () => {
  openLoading({
    overlay: true,
    draftDelete: true
  })
  // console.log('deleteDraft')
  excuteAsyncFunc(deleteDraftById, taskId, (response) => {
    resetForm()
    closeLoading()
    openModal({
      message: response.message,
    })
  })
}


// - 假資料 -
function fakeData() {
  title.value = '測試任務'
  category.value = '到府驅蟲'
  description.value = 'test'
  salary.value = 100
  exposurePlan.value = '一般曝光'
  contactInfoName.value = 'test'
  contactInfoPhone.value = '0910123456'
  locationCity.value = '台北市'
  locationDist.value = '信義區'
  locationAddress.value = '信義路一段12號'
  contactInfoEmail.value = 'test@gmail.com'
}

</script>

<style scoped>
.po-title {
  @apply sp-border-l-8 sp-border-secondary sp-pl-4 sp-font-bold sp-text-lg sp-text-primary
}
</style>



