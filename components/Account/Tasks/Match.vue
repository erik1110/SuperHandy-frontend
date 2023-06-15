<template>
  <VCard v-if="detail && show">
    <VCardText>
      <div class="sp-sec-title sp-mb-4">媒合人員</div>
      <div class="sp-text-center sp-text-h3">{{ showMessage }}</div>
      <div class="sp-flex sp-flex-wrap">
        <div v-for="(item, index) in showUser" :key="index">
          <UserCard
            class="sp-m-2"
            :lastName="item.lastName"
            :completedTasks="item.completedTasks"
            :completionRate="item.completionRate"
            role="幫手"
            :rating="item.rating"
            :taskId="detail.taskId"
            :helperId="item.helperId"
          ></UserCard>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
<script setup>
  const detail = useState("taskDetail");
  const show = ref(false);
  const showMessage = ref("");
  const showUser = ref(null);
  const FuncMatchDataControl = function (val) {
    if (val.taskId) {
      if (val.status == "媒合中") {
        if (val.role == "幫手") {
          showMessage.value = "等待媒合中...";
        } else if (val.role == "案主") {
          showUser.value = val.helpers.filter(
            (item) => item.status == "等待媒合中"
          );
          if (showUser.value.length == 0) {
            showMessage.value = "等待媒合中...";
          }
        }
        show.value = true;
      } else {
        show.value = false;
      }
    }
  };
  FuncMatchDataControl(detail.value);
  watch(
    () => detail.value,
    (val) => {
      FuncMatchDataControl(val);
    }
  );
</script>
