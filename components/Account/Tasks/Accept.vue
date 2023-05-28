<template>
  <VCard v-if="detail.status == '進行中'">
    <VCardText>
      <template v-if="detail.role == '幫手'">
        <div class="sp-sec-title sp-mb-4">驗收內容</div>
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
        <VBtn color="primary" @click="prepareHelperSubmit()">送出</VBtn>
      </template>
      <template v-else-if="detail.role == '案主'">
        <div class="sp-sec-title sp-mb-4">幫手回饋</div>
        <VCard>
          <VCardText>
            <div class="sp-text-body sp-flex sp-flex-warp">
              <span class="sp-mr-4">告知事項</span>
              <VTextarea
                readonly
                v-model="detail.submittedInfo.comment"
              ></VTextarea>
            </div>
            <div class="sp-text-body sp-flex sp-flex-warp">
              <span class="sp-mr-4">任務照片</span>
              <div class="sp-flex sp-mb-4">
                <div
                  class="sp-inline-block sp-w-[96px] sp-h-[96px] sp-mr-6 sp-mb-4"
                  v-for="(item, index) in detail.submittedInfo.imgUrls"
                  :key="index"
                >
                  <LightBox
                    class="sp-w-full sp-h-full sp-inline-block"
                    :image="item"
                    :bigImage="item"
                  ></LightBox>
                </div>
              </div>
            </div>
            <VBtn color="primary" @click="posterAccept">確認驗收</VBtn>
          </VCardText>
        </VCard>
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
  } from "@/services/apis/tasks";
  const detail = useState("taskDetail");
  const acceptComment = ref("");
  const acceptImages = ref([]);
  const tempFile = ref(null);
  watch(
    () => detail.value,
    (val) => {
      if (val.submittedInfo.comment) {
        acceptComment.value = val.submittedInfo.comment;
      }
      val.submittedInfo.imgUrls.forEach(function (item) {
        acceptImages.value.push({
          formData: null,
          viewData: item,
        });
      });
    }
  );
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
  const prepareHelperSubmit = async function () {
    let imageUrls = [];
    if (acceptImages.value.length == 0) {
      let data = {
        Comment: acceptComment.value,
      };
      submitHelperAccept(data);
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
          let data = {
            submittedInfo: {
              imgUrls: imageUrls,
              comment: acceptComment.value,
            },
          };
          submitHelperAccept(data);
        }
      });
    }
  };
  const submitHelperAccept = async function (data) {
    let res = await postTasksManagementHelperAccept(detail.value.taskId, data);
    if (!res.error) {
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
