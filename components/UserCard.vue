<template>
  <div class="card sp-border-gary-border">
    <div class="sp-flex">
      <div class="left sp-text-center sp-mr-4">
        <div
          class="sp-w-full sp-min-w-[150px] sp-min-h-[150px] sp-rounded-lg sp-overflow-hidden"
        >
          <!-- Formal -->
          <!-- <v-img :src="props.avatar" class="sp-w-full"></v-img> -->
          <!-- -----Test------ -->
          <v-img
            src="https://source.unsplash.com/random/600x600/?person"
            class="sp-w-full"
          ></v-img>
        </div>
        <div class="sp-text-h5 sp-text-slate-800 sp-my-2 sp-ml-1">
          {{ props.lastName }}**
        </div>
        <div class="sp-flex sp-justify-around sp-w-full">
          <div>
            <p class="sp-text-body-sm">已完成</p>
            <p class="num">{{ props.completedTasks }}</p>
          </div>
          <div>
            <p class="sp-text-body-sm">完成率</p>
            <p class="num">{{ props.completionRate }}%</p>
          </div>
        </div>
      </div>
      <div class="right sp-flex-auto sp-w-[170px] sp-relative">
        <div class="sp-flex sp-items-center sp-justify-between sp-pb-2">
          <p class="num">
            {{ props.rating.overall ? props.rating.overall.toFixed(1) : 0 }}/5
          </p>
          <v-chip size="small" color="v-purple">{{ role }}評價</v-chip>
        </div>
        <div
          v-for="cate in props.rating.categories"
          :key="cate.name"
          class="sp-my-2"
        >
          <p class="sp-text-body-sm">{{ cate.name }}</p>
          <div
            class="sp-flex sp-flex-wrap sp-items-center sp-text-caption sp-text-slate-600"
          >
            <v-rating
              v-model="cate.star"
              class="mb-1 mr-2 sm:sp-flex-initial sp-flex-auto"
              density="compact"
              size="small"
              color="v-purple"
              half-increments
              disabled
            ></v-rating>
            {{ cate.star }}
            ({{ cate.totalReviews }})
          </div>
        </div>
        <div class="sp-my-2" v-if="props.rating.categories.length == 0">
          尚無評價
        </div>
        <div
          class="sp-absolute sp-bottom-0 sp-left-0 sp-w-full sp-text-right"
          v-if="props.taskId"
        >
          <VBtn color="secondary" small class="sp-mr-2">聯絡</VBtn>
          <VBtn color="primary" @click="tasksChooseHelper()">選擇</VBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  postTasksManagementHelper,
  getTasksManagementDetail,
} from "@/services/apis/tasks";
// import {storeAuth} from "@/stores/storeAuth"
import { storeChatBox } from "@/stores/storeChatBox";
// const _storeAuth = storeAuth()
const _storeChatBox = storeChatBox();

// const role = ref("幫手");
const props = defineProps({
  avatar: String,
  completedTasks: Number,
  completionRate: Number,
  lastName: String,
  rating: Object,
  role: String,
  taskId: String,
  helperId: String,
});
const tasksChooseHelper = async function () {
  let res = await postTasksManagementHelper(props.taskId, props.helperId);
  if (!res.error) {
    tasksReload();
  }
};
const tasksReload = async function () {
  let res = await getTasksManagementDetail(props.taskId);
  if (!res.error) {
    const taskDetail = useState("taskDetail");
    taskDetail.value = res.data;
  }
};
</script>

<style lang="postcss" scoped>
@import url("@/assets/css/tailwind.css");
.card {
  @apply sp-p-4 sp-bg-white sp-max-w-[400px] sp-min-w-[320px] sp-rounded-2xl sp-border;
}

.num {
  @apply sp-text-h4 sp-text-primary;
}
</style>
