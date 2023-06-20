<template>
  <div>
    <VContainer fluid>
      <VRow>
        <VCol v-if="detail">
          <AccountTasksProgress></AccountTasksProgress>
          <AccountTasksInfo class="sp-my-4"></AccountTasksInfo>
          <AccountTasksMatch class="sp-my-4"></AccountTasksMatch>
          <AccountTasksAccept class="sp-my-4"></AccountTasksAccept>
          <AccountTasksComment class="sp-my-4"></AccountTasksComment>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
  import { getTasksManagementDetail } from "@/services/apis/tasks";
  import { storeFullOverlay } from "~/stores/storeFullOverlay";
  const _storeFullOverlay = storeFullOverlay();
  _storeFullOverlay.open();
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
  detail.value = null;
  onMounted(() => {
    FuncGetTasksManagementDetail();
  });
  watch(
    () => detail.value,
    (val) => {
      if (val) {
        _storeFullOverlay.close();
      }
    }
  );
</script>

<style lang="scss" scoped></style>
