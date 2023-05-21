<template>
  <div>
    <VContainer fluid>
      <VRow>
        <VCol>
          <AccountTasksProgress></AccountTasksProgress>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
  import { getTasksManagementDetail } from "@/services/apis/tasks";
  const route = useRoute();
  const taskId = route.params.taskId;
  const detail = useState("taskDetail", () => ref());
  const FuncGetTasksManagementDetail = async () => {
    let res = await getTasksManagementDetail(taskId);
    if (!res.error) {
      detail.value = res.data;
    } else {
    }
  };
  onMounted(() => {
    FuncGetTasksManagementDetail();
  });
</script>

<style lang="scss" scoped></style>
