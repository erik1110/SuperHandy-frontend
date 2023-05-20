<template>
  <div>
    <v-tabs v-model="groupTab" color="secondary">
      <v-tab value="all">全部 [{{ postList.all.length }}]</v-tab>
      <v-tab value="draft">草稿區 [{{ postList.draft.length }}]</v-tab>
      <v-tab value="published">媒合中 [{{ postList.published.length }}]</v-tab>
      <v-tab value="inProgressed"
        >進行中 [{{ postList.inProgressed.length }}]</v-tab
      >
      <v-tab value="confirmed">已完成 [{{ postList.confirmed.length }}]</v-tab>
      <v-tab value="unpublished"
        >已下架 [{{ postList.unpublished.length }}]</v-tab
      >
      <v-tab value="other">未成立 [{{ postList.other.length }}]</v-tab>
    </v-tabs>
    <v-card class="sp-mb-4" v-for="(item, index) in postList[groupTab]">
      <v-card-text>
        <h4 class="sp-text-h4 sp-inline-block sp-mb-2">{{ item.title }}</h4>
        <div
          class="sp-w-[94.25px] sp--translate-y-2 sp-px-4 sp-py-2 sp-text-center sp-border-2 sp-border-black sp-border-solid sp-float-right"
        >
          {{ item.status }}
        </div>
        <div class="sp-text-body">地點：{{ item.address }}</div>
        <div class="sp-text-body">薪水：${{ item.salary }}</div>
        <span class="sp-text-body">
          刊登：{{ new Date(item.publishedAt).toLocaleString() }}
          <span class="sp-color-red-0 sp-text-red-800"
            >(${{ new Date(item.expiredAt).toLocaleString() }}
            過期)
          </span>
        </span>
        <v-btn
          color="primary"
          outlined
          class="sp--translate-y-2 sp-px-4 sp-py-2 sp-text-center sp-border-2 sp-border-black sp-border-solid sp-float-right"
        >
          {{ item.status == "草稿" ? "編輯草稿" : "查看詳情" }}
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
  import { getTasksPosterManagement } from "@/services/apis/tasks";
  const groupTab = useState("all");
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
    let res = await getTasksPosterManagement();
    if (!res.error) {
      let resArray = res.data;
      postList.value = listModel;
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
            postList.value.other.puth(item);
            break;
          }
        }
      });
    }
  };
  onMounted(() => {
    FuncGetTasksPosterManagement();
  });
</script>
<style></style>
