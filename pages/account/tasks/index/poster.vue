<template>
  <div>
    <div class="sp-mb-4 sp-card-wrapper sp-bg-white">
      <VCardText class="sp-overflow-x-auto">
        <VTextField
          class="sp-mb-2"
          v-model="searchText"
          placeholder="請輸入關鍵字"
          append-inner-icon="mdi-magnify"
          @click:append-inner="FuncGetTasksPosterManagement"
          @keyup.enter="FuncGetTasksPosterManagement"
        ></VTextField>
        <v-tabs show-arrows v-model="groupTab" color="purple">
          <v-tab value="all">全部 [{{ postList.all.length }}]</v-tab>
          <v-tab value="draft">草稿區 [{{ postList.draft.length }}]</v-tab>
          <v-tab value="published"
            >媒合中 [{{ postList.published.length }}]</v-tab
          >
          <v-tab value="inProgressed"
            >進行中 [{{ postList.inProgressed.length }}]</v-tab
          >
          <v-tab value="confirmed"
            >已完成 [{{ postList.confirmed.length }}]</v-tab
          >
          <v-tab value="unpublished"
            >已下架 [{{ postList.unpublished.length }}]</v-tab
          >
          <v-tab value="other">未成立 [{{ postList.other.length }}]</v-tab>
        </v-tabs>
      </VCardText>
    </div>

    <div
      class="sp-mb-4 sp-mx-4 sm:sp-mx-0 sp-rounded-2xl sp-shadow-md sp-bg-white"
      v-for="(item, index) in postList[groupTab]"
      :key="index"
    >
      <v-card-text class="sp-relative">
        <h5
          class="sp-text-h5 sp-text-slate-800 sp-flex sp-flex-row-reverse sm:sp-flex-row sp-items-center sp-justify-end sm:sp-justify-between sp-mb-4"
        >
          <span>{{ item.title }}</span>
          <v-chip class="mr-1" size="small" :color="colorControl(item.status)">
            {{ item.status }}
          </v-chip>
        </h5>
        <div class="d-flex sm:sp-mb-0 sp-flex-wrap">
          <div
            class="sp-mr-4 sp-rounded-lg sp-overflow-hidden sp-w-[90px] sp-h-[90px] sp-mb-2 sm:sp-mb-0"
          >
            <v-img
              placeholder="blur"
              cover
              :src="
                item.imgUrls.length > 0
                  ? item.imgUrls[0]
                  : '/images/sp_icon.png'
              "
              height="100%"
            />
          </div>
          <div
            class="sp-flex sp-flex-col sm:sp-flex-row sm:sp-justify-between sm:sp-items-end sm:sp-flex-1 sp-w-full sm:sp-w-auto"
          >
            <div class="sp-mb-4 sm:sp-mb-0">
              <div class="tile"><span>地點</span>{{ item.address }}</div>
              <div class="tile"><span>薪水</span>${{ item.salary }}</div>
              <div class="tile" :class="{ 'sp-invisible': !item.publishedAt }">
                <span>刊登</span
                >{{ new Date(item.publishedAt).toLocaleString() }}
              </div>
              <div
                class="tile"
                :class="{
                  'sp-invisible': !(
                    item.status == '媒合中' || item.status == '已下架'
                  ),
                }"
              >
                <span>到期</span>
                <span class="expired"
                  >{{ new Date(item.expiredAt).toLocaleString() }}
                </span>
              </div>
            </div>
            <div class="sp-w-full sm:sp-w-auto">
              <v-btn
                color="v-purple"
                outlined
                class="sp-px-4 sp-py-2 sp-w-full sp-text-center"
                @click="
                  item.status == '草稿'
                    ? toDraftPage(item.taskId)
                    : toDetailPage(item.taskId)
                "
              >
                {{ item.status == "草稿" ? "編輯草稿" : "查看詳情" }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
    </div>
  </div>
</template>
<script setup>
  import { getTasksPosterManagement } from "@/services/apis/tasks";
  import { storeFullOverlay } from "~/stores/storeFullOverlay";
  const _storeFullOverlay = storeFullOverlay();
  const identityTabs = useState("identityTabs");
  const groupTab = useState("all");
  const searchText = ref("");
  const postList = ref({
    all: [],
    draft: [],
    published: [],
    inProgressed: [],
    confirmed: [],
    unpublished: [],
    other: [],
  });
  const listModel = {
    all: [],
    draft: [],
    published: [],
    inProgressed: [],
    confirmed: [],
    unpublished: [],
    other: [],
  };
  let FuncGetTasksPosterManagement = async () => {
    identityTabs.value = "account-tasks-index-poster";
    _storeFullOverlay.open();
    let queryString = "?limit=100";
    if (searchText.value.length != 0) {
      queryString += `&keyword=${searchText.value}`;
    }
    let res = await getTasksPosterManagement(queryString);
    if (!res.error) {
      let resArray = res.data.tasks;
      postList.value = JSON.parse(JSON.stringify(listModel));
      resArray.forEach(function (item) {
        postList.value.all.push(item);
        switch (item.status) {
          case "草稿": {
            postList.value.draft.push(item);
            break;
          }
          case "媒合中": {
            postList.value.published.push(item);
            break;
          }
          case "進行中": {
            postList.value.inProgressed.push(item);
            break;
          }
          case "已完成": {
            postList.value.confirmed.push(item);
            break;
          }
          case "已下架": {
            postList.value.unpublished.push(item);
            break;
          }
          default: {
            postList.value.other.push(item);
            break;
          }
        }
      });
      _storeFullOverlay.close();
    }
  };
  let colorControl = (status) => {
    if (status == "草稿" || status == "已下架") {
      return "v-orange";
    } else if (status == "媒合中" || status == "進行中") {
      return "v-purple";
    } else if (status == "已完成") {
      return "secondary-darken";
    } else {
      return "v-gray-text";
    }
  };
  onMounted(() => {
    FuncGetTasksPosterManagement();
  });
  const toDraftPage = function (taskId) {
    navigateTo(`/post-task/${taskId}`);
  };
  const toDetailPage = function (taskId) {
    navigateTo(`/account/tasks/${taskId}`);
  };
</script>
<style lang="postcss" scoped>
  @import url("@/assets/css/tailwind.css");

  .tile {
    @apply sp-text-body-sm sp-font-medium sp-text-slate-800  sp-mr-1 sp-mb-3 sp-whitespace-nowrap;
    span {
      @apply sp-w-10 sp-text-slate-500 sp-inline-block;
      &.expired {
        @apply sp-text-red-800;
      }
    }
  }
</style>
