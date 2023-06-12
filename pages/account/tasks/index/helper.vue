<template>
  <div>
    <div class="sp-my-4 sp-card-wrapper sp-bg-white">
      <VCardText>
        <v-tabs v-model="groupTab" color="purple">
          <v-tab value="all">全部 [{{ postList.all.length }}]</v-tab>
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
          <!-- <div
            class="sp-text-body sp-flex-shrink-0 sp-mr-4 sm:sp-w-[94.5px] sm:sp-mr-0 sp-px-2 sp-py-1 sp-text-center"
            :class="colorControl(item.status)"
          >
            {{ item.status }}
          </div> -->
          <v-chip class="mr-1" size="small" :color="colorControl(item.status)">
            {{ item.status }}
          </v-chip>
        </h5>
        <div class="d-flex sm:sp-mb-0 sp-flex-wrap">
          <!-- <div class="sp-mr-4 sp-shrink-0 sp-mb-2 sm:sp-mb-0">
            <img
              class="sp-shrink-0 sp-grow-0 sp-inline-block sp-w-[90px] sp-h-[90px]"
              :src="
                item.imgUrls.length > 0
                  ? item.imgUrls[0]
                  : 'https://picsum.photos/120'
              "
            />
          </div> -->
          <div
            class="sp-mr-4 sp-rounded-lg sp-overflow-hidden sp-w-[90px] sp-h-[90px] sp-mb-2 sm:sp-mb-0"
          >
            <v-img
              placeholder="blur"
              cover
              :src="
                item.imgUrls.length > 0
                  ? item.imgUrls[0]
                  : 'https://picsum.photos/120'
              "
              height="100%"
            />
          </div>
          <!-- <div class="sm:sp-flex-1 sp-w-full sm:sp-w-auto"> -->
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
                <span>過期</span>
                <span class="expired"
                  >{{ new Date(item.expiredAt).toLocaleString() }}
                </span>
              </div>
            </div>

            <!-- <div
              class="sm:sp--translate-y-2 sp-px-[1rem] sm:sp-px-0 sp-absolute sp-bottom-[15px] sp-left-0 sm:sp-relative sp-w-full sm:sp-w-auto sm:sp-float-right"
            > -->
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
                :disabled="item.status == '未媒合'"
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
import { getTasksHelperManagement } from "@/services/apis/tasks";
const groupTab = useState("all");
const postList = ref({
  all: [],
  published: [],
  inProgressed: [],
  confirmed: [],
  unpublished: [],
  other: [],
});
const listModel = {
  all: [],
  published: [],
  inProgressed: [],
  confirmed: [],
  unpublished: [],
  other: [],
};
let FuncGetTasksHelperManagement = async () => {
  let res = await getTasksHelperManagement();
  if (!res.error) {
    let resArray = res.data;
    postList.value = listModel;
    resArray.forEach(function (item) {
      postList.value.all.push(item);
      if (item.helperStatus == "媒合失敗") {
        item.status = "未媒合";
        postList.value.other.push(item);
      } else {
        switch (item.status) {
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
      }
    });
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
  FuncGetTasksHelperManagement();
});
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
