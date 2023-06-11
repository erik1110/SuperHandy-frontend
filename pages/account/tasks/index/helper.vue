<template>
  <div>
    <VCard class="sp-my-4">
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
    </VCard>

    <v-card class="sp-mb-4" v-for="(item, index) in postList[groupTab]">
      <v-card-text class="sp-relative">
        <h4
          class="sp-text-h4 sp-flex sp-flex-row-reverse sm:sp-flex-row sp-items-center sp-justify-end sm:sp-justify-between sp-mb-2"
        >
          <span>{{ item.title }}</span>
          <div
            class="sp-text-body sp-flex-shrink-0 sp-mr-4 sm:sp-w-[94.5px] sm:sp-mr-0 sp-px-2 sp-py-1 sp-text-center"
            :class="colorControl(item.status)"
          >
            {{ item.status }}
          </div>
        </h4>
        <div class="d-flex sp-mb-[40px] sm:sp-mb-0 sp-flex-wrap">
          <div class="sp-mr-4 sp-shrink-0 sp-mb-2 sm:sp-mb-0">
            <img
              class="sp-shrink-0 sp-grow-0 sp-inline-block sp-w-[90px] sp-h-[90px]"
              :src="
                item.imgUrls.length > 0
                  ? item.imgUrls[0]
                  : 'https://picsum.photos/120'
              "
            />
          </div>
          <div class="sm:sp-flex-1 sp-w-full sm:sp-w-auto">
            <div class="sp-text-body">地點：{{ item.address }}</div>
            <div class="sp-text-body">薪水：${{ item.salary }}</div>
            <div
              class="sp-text-body"
              :class="{ 'sp-invisible': !item.publishedAt }"
            >
              刊登：{{ new Date(item.publishedAt).toLocaleString() }}
            </div>
            <span
              class="sp-text-body"
              :class="{
                'sp-invisible': !(
                  item.status == '媒合中' || item.status == '已下架'
                ),
              }"
            >
              過期：
              <span class="sp-color-red-0 sp-text-red-800"
                >${{ new Date(item.expiredAt).toLocaleString() }}
              </span>
            </span>
            <div
              class="sm:sp--translate-y-2 sp-px-[1rem] sm:sp-px-0 sp-absolute sp-bottom-[15px] sp-left-0 sm:sp-relative sp-w-full sm:sp-w-auto sm:sp-float-right"
            >
              <v-btn
                color="primary"
                outlined
                class="sp-px-4 sp-py-2 sp-w-full sp-text-center sp-border-2 sp-border-black sp-border-solid"
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
    </v-card>
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
      return "sp-tag-dark-lg-amber";
    } else if (status == "媒合中" || status == "進行中") {
      return "sp-tag-dark-lg-blue";
    } else if (status == "已完成" || status == "未成立") {
      return "sp-tag-dark-lg-slate";
    } else {
      return "sp-tag-dark-lg-slate";
    }
  };
  onMounted(() => {
    FuncGetTasksHelperManagement();
  });
  const toDetailPage = function (taskId) {
    navigateTo(`/account/tasks/${taskId}`);
  };
</script>
<style></style>
