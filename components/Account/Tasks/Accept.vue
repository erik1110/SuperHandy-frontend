<template>
  <VCard v-if="detail.status == '進行中'">
    <VCardText>
      <div class="sp-sec-title sp-mb-4">任務歷程</div>
      <VExpansionPanels class="sp-mb-2" multiple v-model="expendValue">
        <VExpansionPanel
          v-for="(item, index) in detail.submittedInfo"
          :key="index"
          :value="item._id"
        >
          <VExpansionPanelTitle>
            <template v-if="item.role == '幫手'">
              第
              {{ parseInt(index / 2) + 1 }} 次幫手成果上傳
            </template>
            <template v-else>
              第
              {{ parseInt(index / 2) + 1 }} 次案主退回原因
            </template>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <div class="sp-text-body sp-flex sp-flex-warp">
              <span class="sp-mr-4">告知事項</span>
              <VTextarea readonly v-model="item.comment"></VTextarea>
            </div>
            <div class="sp-text-body sp-flex sp-flex-warp">
              <span class="sp-mr-4">任務照片</span>
              <div class="sp-flex sp-mb-4">
                <div
                  class="sp-inline-block sp-w-[96px] sp-h-[96px] sp-mr-6 sp-mb-4"
                  v-for="(imgItem, imgIndex) in item.imgUrls"
                  :key="imgIndex"
                >
                  <LightBox
                    class="sp-w-full sp-h-full sp-inline-block"
                    :image="imgItem"
                    :bigImage="imgItem"
                  ></LightBox>
                </div>
              </div>
            </div>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
      <template
        v-if="detail.submittedInfo.length % 2 == 0 && detail.role == '幫手'"
      >
        <div class="sp-text-h4 sp-mb-2">
          第 {{ parseInt(detail.submittedInfo.length / 2) + 1 }} 次幫手成果上傳
        </div>

        <div class="sp-text-body">告知事項 (非必填)</div>
        <v-textarea
          v-model="acceptComment"
          placeholder="請輸入事項說明"
        ></v-textarea>
        <div class="sp-text-body sp-mb-4">說明圖片 (非必填)</div>
        <div class="sp-flex sp-mb-4">
          <div
            class="sp-inline-block sp-w-[96px] sp-h-[96px] sp-relative sp-mr-6 sp-mb-4"
            v-for="(item, index) in acceptImages"
            :key="index"
          >
            <LightBox
              class="sp-w-full sp-h-full sp-left-0 sp-bottom-0 sp-inline-block"
              :image="item.viewData"
              :bigImage="item.viewData"
            ></LightBox>
            <XCircleIcon
              class="sp-absolute sp-top-[-12px] sp-right-[-12px] sp-cursor-pointer sp-inline-block sp-w-[24px] sp-h-[24px] sp-text-red-600"
              @click="removeImage(index)"
            ></XCircleIcon>
          </div>

          <div
            class="sp-w-[96px] sp-h-[96px] sp-inline-block sp-border-2 sp-border-blue-400 sp-border-dotted sp-p-4 sp-relative"
          >
            <PlusIcon
              class="sp-text-blue-400 sp-mx-auto sp-w-[24px] sp-h-[24px]"
            ></PlusIcon>
            <div class="sp-text-blue-400">上傳圖片</div>
            <input
              type="file"
              class="sp-absolute sp-left-0 sp-top-0 sp-w-full sp-h-full sp-cursor-pointer sp-opacity-0"
              accept="image/png, image/jpeg, image/svg"
              @change="uploadFile"
            />
          </div>
        </div>
        <VBtn color="primary" @click="prepareSubmit()">提交審核</VBtn>
      </template>
      <template
        v-else-if="
          detail.submittedInfo.length % 2 == 1 && detail.role == '案主'
        "
      >
        <div class="sp-text-h4 sp-mb-2">案主審核</div>
        <VBtn class="sp-mr-2" color="secondary" @click="openRefuseArea"
          >退回驗收</VBtn
        >
        <VBtn color="primary" @click="posterAccept">確認驗收</VBtn>
        <template v-if="isRefuseAreaOpen">
          <div class="sp-mt-2 sp-text-body">告知事項 (非必填)</div>
          <v-textarea
            v-model="acceptComment"
            placeholder="請輸入事項說明"
          ></v-textarea>
          <div class="sp-text-body sp-mb-4">說明圖片 (非必填)</div>
          <div class="sp-flex sp-mb-4">
            <div
              class="sp-inline-block sp-w-[96px] sp-h-[96px] sp-relative sp-mr-6 sp-mb-4"
              v-for="(item, index) in acceptImages"
              :key="index"
            >
              <LightBox
                class="sp-w-full sp-h-full sp-left-0 sp-bottom-0 sp-inline-block"
                :image="item.viewData"
                :bigImage="item.viewData"
              ></LightBox>
              <XCircleIcon
                class="sp-absolute sp-top-[-12px] sp-right-[-12px] sp-cursor-pointer sp-inline-block sp-w-[24px] sp-h-[24px] sp-text-red-600"
                @click="removeImage(index)"
              ></XCircleIcon>
            </div>

            <div
              class="sp-w-[96px] sp-h-[96px] sp-inline-block sp-border-2 sp-border-blue-400 sp-border-dotted sp-p-4 sp-relative"
            >
              <PlusIcon
                class="sp-text-blue-400 sp-mx-auto sp-w-[24px] sp-h-[24px]"
              ></PlusIcon>
              <div class="sp-text-blue-400">上傳圖片</div>
              <input
                type="file"
                class="sp-absolute sp-left-0 sp-top-0 sp-w-full sp-h-full sp-cursor-pointer sp-opacity-0"
                accept="image/png, image/jpeg, image/svg"
                @change="uploadFile"
              />
            </div>
          </div>
          <VBtn class="sp-mr-2" color="secondary" @click="cancelRefuse()"
            >取消退回</VBtn
          >
          <VBtn color="primary" @click="prepareSubmit()">送出退回</VBtn>
        </template>
      </template>
      <template
        v-else-if="
          detail.submittedInfo.length % 2 == 0 && detail.role == '案主'
        "
      >
        <div class="sp-text-h5 sp-text-center sp-mt-2">幫手任務進行中...</div>
      </template>
    </VCardText>
  </VCard>
</template>
<script setup>
  import { PlusIcon, XCircleIcon } from "@heroicons/vue/24/solid";
  import { postUploadImage } from "@/services/apis/general";
  import {
    getTasksManagementDetail,
    postTasksManagementHelperAccept,
    postTasksManagementPosterAccpet,
    postTasksManagementPosterRefuse,
  } from "@/services/apis/tasks";
  const detail = useState("taskDetail");
  const acceptComment = ref("");
  const acceptImages = ref([]);
  const tempFile = ref(null);
  const expendValue = ref([]);
  const isRefuseAreaOpen = ref(false);
  let FuncAcceptControll = function (val) {
    if (val.taskId && val.submittedInfo.length > 0) {
      expendValue.value.push(
        val.submittedInfo[val.submittedInfo.length - 1]._id
      );
    }
  };
  FuncAcceptControll(detail.value);
  watch(
    () => detail.value,
    (val) => {
      FuncAcceptControll(val);
    }
  );
  const tasksReload = async function () {
    let res = await getTasksManagementDetail(detail.value.taskId);
    if (!res.error) {
      detail.value = res.data;
    }
  };
  const openRefuseArea = function () {
    acceptComment.value = "";
    acceptImages.value = [];
    tempFile.value = null;
    isRefuseAreaOpen.value = true;
  };
  const cancelRefuse = function () {
    isRefuseAreaOpen.value = false;
  };
  const submitRefuse = async function (data) {
    let res = await postTasksManagementPosterRefuse(detail.value.taskId, data);
    if (!res.error) {
      tasksReload();
    }
  };
  const uploadFile = function (e) {
    const file = e.target.files.item(0);
    tempFile.value = e.target.files[0];
    console.log(tempFile.value);
    if (file.size > 5000000) {
      alert("please check file size no over 5 MB.");
      return false;
    }
    const reader = new FileReader();
    reader.addEventListener("load", imageLoaded);
    reader.readAsDataURL(file);
  };
  const imageLoaded = function (e) {
    let data = {
      formData: tempFile.value,
      viewData: e.target.result,
    };
    acceptImages.value.push(data);
  };
  const removeImage = function (index) {
    acceptImages.value.splice(index, 1);
  };
  const prepareSubmit = async function () {
    let imageUrls = [];
    let data = {};
    if (acceptImages.value.length == 0) {
      data = {
        imgUrls: [],
        Comment: acceptComment.value,
      };
      if (detail.value.role == "幫手") {
        submitHelperAccept(data);
      } else if (detail.value.role == "案主") {
        submitRefuse(data);
      }
    } else {
      acceptImages.value.forEach(async function (item, index) {
        if (item.formData) {
          let formData = new FormData();
          let blob = new Blob([item.formData], {
            type: item.formData.type,
          });
          blob.name = item.formData.name;
          formData.append("file", blob, item.formData.name);
          let imgRes = await postUploadImage(formData);
          if (!imgRes.error) {
            imageUrls.push(imgRes.data.imgUrl);
          }
        } else {
          imageUrls.push(item.viewData);
        }
        if (acceptImages.value.length == index + 1) {
          data = {
            submittedInfo: {
              imgUrls: imageUrls,
              comment: acceptComment.value,
            },
          };
        }
        if (detail.value.role == "幫手") {
          submitHelperAccept(data);
        } else if (detail.value.role == "案主") {
          submitRefuse(data);
        }
      });
    }
  };
  const submitHelperAccept = async function (data) {
    let res = await postTasksManagementHelperAccept(detail.value.taskId, data);
    if (!res.error) {
      tasksReload();
    }
  };
  const getDetail = async function () {
    let res = await getTasksManagementDetail(detail.value.taskId);
    if (!res.error) {
      detail.value = res.data;
    }
  };
  const posterAccept = async function () {
    let res = await postTasksManagementPosterAccpet(detail.value.taskId);
    if (!res.error) {
      getDetail();
    }
  };
</script>
