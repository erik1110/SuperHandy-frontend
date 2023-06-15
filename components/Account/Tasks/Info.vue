<template>
  <div v-if="detail">
    <VCard>
      <VCardText>
        <div class="sp-sec-title sp-mb-4">任務資訊</div>
        <!-- 任務狀態 -->
        <div
          class="sp-p-4 sp-mb-4 sp-border-solid sp-border-[#DDDDDD] sp-border-2 sp-rounded-md"
        >
          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
          >
            <span class="sp-mr-4 sp-font-bold">任務編號</span>
            <span class="">#{{ detail.taskId }}</span>
          </div>
          <div
            class="sp-float-right sp-py-1 sp-px-4 sp-bg-[#B7EEEE] sp-rounded-2xl sp--translate-y-[50px] md:sp--translate-y-[26px]"
          >
            {{ detail.status }}
          </div>
          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
          >
            <span class="sp-mr-4 sp-font-bold">發布時間</span>
            <span class="">{{
              new Date(detail.publishedAt).toLocaleString()
            }}</span>
          </div>
          <template v-if="detail.role == '幫手'">
            <div
              class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
            >
              <span class="sp-mr-4 sp-font-bold">我的案主</span>
              <span class="sp-text-orange-600">{{ detail.poster }}</span>
            </div>
          </template>
          <template v-else>
            <div
              class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
            >
              <span class="sp-mr-4 sp-font-bold">我的幫手</span>
              <span class="sp-text-orange-600">{{
                detail.helper ? detail.helper : "待媒合"
              }}</span>
            </div>
          </template>

          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
          >
            <span class="sp-mr-4 sp-font-bold">我的角色</span>
            <span class="">{{ detail.role }}</span>
          </div>
        </div>
        <!-- 任務敘述 -->
        <div
          class="sp-p-4 sp-mb-2 sp-border-solid sp-border-[#DDDDDD] sp-border-2 sp-rounded-md"
        >
          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
          >
            <span class="sp-mr-4 sp-font-bold">任務名稱</span>
            <span class="">{{ detail.title }}</span>
          </div>
          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
          >
            <span class="sp-mr-4 sp-font-bold">任務薪水</span>
            <span>{{ detail.salary }}</span>
          </div>
          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
          >
            <span class="sp-mr-4 sp-font-bold">任務地點</span>
            <span>{{
              detail.location.city +
              detail.location.dist +
              detail.location.address
            }}</span>
          </div>
          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
          >
            <span class="sm:sp-mr-4 sp-font-bold">任務類型</span>
            <span>{{ detail.category }}</span>
          </div>
          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row"
          >
            <span class="sp-mr-4 sp-font-bold sp-flex-shrink-0">任務內容</span>
            <VTextarea readonly v-model="detail.description"></VTextarea>
          </div>
          <div
            class="sp-text-body sp-flex sp-flex-warp sp-flex-col md:sp-flex-row sp-mb-4"
          >
            <span class="sp-mr-4 sp-font-bold">任務照片</span>
            <span>
              <LightBox
                v-for="(item, index) in detail.imgUrls"
                class="sp-mr-2 sp-inline-block sp-cursor-pointer sp-w-[90px] sp-h-[90px]"
                :key="index"
                :image="item"
                :bigImage="item"
              />
            </span>
          </div>
          <div
            class="sp-text-body sp-text-center md:sp-text-right"
            v-if="
              !detail.progressBar.inProgressAt &&
              detail.role == '案主' &&
              detail.status != '未成立'
            "
          >
            <VBtn
              color="secondary"
              class="sp-mr-2"
              size="small"
              @click="FuncEditTask()"
              :loading="eventLoading"
              >編輯任務</VBtn
            >
            <VBtn
              color="v-gray-bg"
              class="sp-mr-2"
              size="small"
              :loading="eventLoading"
              v-if="detail.status != '已下架'"
              @click="FuncUnpublishTask()"
              >下架任務</VBtn
            >
            <VBtn
              color="v-gray-bg"
              class="sp-mr-2"
              size="small"
              :loading="eventLoading"
              v-if="detail.status == '已下架'"
              @click="FuncPublishTask()"
              >上架任務</VBtn
            >
            <VBtn
              color="v-gray-bg-secondary"
              size="small"
              :loading="eventLoading"
              @click="FuncCheckDeleteTask()"
              >刪除任務</VBtn
            >
          </div>
        </div>
      </VCardText>
    </VCard>
    <VDialog v-model="isDeleteTaskDialogOpen" width="auto" max-width="600">
      <VCard>
        <VCardTitle>刪除任務</VCardTitle>
        <VCardText> 是否確定要刪除 {{ detail.title }} 此任務? </VCardText>
        <div class="sp-flex sp-justify-evenly sp-pt-6 sp-pb-4">
          <VBtn color="v-gray-bg" @click="FuncCloseDeleteTask">取消</VBtn>
          <VBtn color="primary" @click="FuncDeleteTask">確認</VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>
<script setup>
  import { postTaskUnpublish, postTaskPublish } from "@/services/apis/postTask";
  import {
    getTasksManagementDetail,
    deleteTasksManagement,
  } from "@/services/apis/tasks";
  const eventLoading = ref(false);
  const detail = useState("taskDetail");
  const isSnackbarOpen = useState("isSnackbarOpen");
  const snackbarMessage = useState("snackbarMessage");
  const isDeleteTaskDialogOpen = ref(false);
  const tasksReload = async function () {
    let res = await getTasksManagementDetail(detail.value.taskId);
    if (!res.error) {
      detail.value = res.data;
    }
  };
  const FuncUnpublishTask = async function () {
    eventLoading.value = true;
    let res = await postTaskUnpublish(detail.value.taskId);
    if (!res.error) {
      eventLoading.value = false;
      isSnackbarOpen.value = true;
      snackbarMessage.value = "下架成功!";
      tasksReload();
    }
  };
  const FuncPublishTask = async function () {
    eventLoading.value = true;
    let res = await postTaskPublish(detail.value.taskId);
    if (!res.error) {
      eventLoading.value = false;
      isSnackbarOpen.value = true;
      snackbarMessage.value = "上架成功!";
      tasksReload();
    }
  };
  const FuncEditTask = function () {
    if (detail.value.status != "已下架") {
      isSnackbarOpen.value = true;
      snackbarMessage.value = "需要下架才能編輯!";
      tasksReload();
    } else {
      navigateTo(`/post-task/${detail.value.taskId}?status=unpublished`);
    }
  };
  const FuncCheckDeleteTask = function () {
    isDeleteTaskDialogOpen.value = true;
  };
  const FuncCloseDeleteTask = function () {
    isDeleteTaskDialogOpen.value = false;
  };
  const FuncDeleteTask = async function () {
    eventLoading.value = true;
    isDeleteTaskDialogOpen.value = false;
    let res = await deleteTasksManagement(detail.value.taskId);
    if (!res.error) {
      isSnackbarOpen.value = true;
      snackbarMessage.value = "刪除成功!";
      setTimeout(function () {
        eventLoading.value = false;
        navigateTo("/account/tasks/poster");
      }, 1000);
    }
  };
</script>
