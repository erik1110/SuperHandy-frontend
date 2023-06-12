<template>
  <div>
    <div v-if="listViewTasks.length != 0">
      <FindTasksCard
        :taskData="el"
        v-for="(el, idx) in listViewTasks"
        :key="idx"
      />
      <v-pagination
        v-model="page"
        :length="taskMeta.totalPages"
        :total-visible="5"
      ></v-pagination>
    </div>
    <div
      v-else
      class="sp-text-center sp-card-wrapper sp-p-4 sp-bg-white sp-text-gray-placeholder"
    >
      <p>沒有符合條件的任務，請重新搜尋</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { storeFindTasks } from "~/stores/storeFindTasks";
const _storeFindTasks = storeFindTasks();
const { listViewTasks, taskMeta, page } = storeToRefs(_storeFindTasks);

watch(page, () => {
  // console.log("page changed");
  if (window.innerWidth <= 768) {
    window.scrollTo({ top: 895, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 300, behavior: "smooth" });
  }
});

onMounted(async () => {
  // _storeFindTasks.filterData.page = 1;
  await _storeFindTasks.fetchListViewTasks();
});
</script>

<style lang="scss" scoped></style>
