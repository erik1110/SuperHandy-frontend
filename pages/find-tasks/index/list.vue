<template>
  <div>
    <FindTasksCard :taskData="el" v-for="(el, idx) in tasks" :key="idx" />
  </div>
</template>

<script setup>
import { getListViewTasks } from "@/services/apis/findTasks";
import { storeFindTasks } from "~/stores/storeFindTasks";
const _storeFindTasks = storeFindTasks();
const tasks = ref([]);
const fetchListViewTasks = async () => {
  let { data } = await getListViewTasks();
  console.log({ data });
  tasks.value = data.tasks;
  _storeFindTasks.totalTasks = data.total_tasks;
};
onMounted(() => {
  fetchListViewTasks();
});
</script>

<style lang="scss" scoped></style>
