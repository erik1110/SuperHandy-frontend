<template>
  <div class="sp-text-center sp-text-body">
    <template v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
      <div class="sp-text-h4 sp-mr-4">訂單確認中，請勿離開此頁面!</div>
    </template>
    <template v-else-if="!isLoading && !showOrderId">
      <div class="sp-w-full">
        {{ status == "cancel" ? "付款已取消" : "付款已成功" }}
      </div>
      <VBtn color="primary" class="sp-mt-4" @click="gotoAccountPointPage()"
        >返回點數頁</VBtn
      >
    </template>
    <template v-else>
      <div class="sp-mb-2">
        很抱歉，發生未知錯誤，請紀錄以下兩組序號並且寄信給我們，讓我們為您服務
      </div>
      <div class="sp-mb-2 sp-w-[300px] sp-text-left sp-mx-auto">
        交易序號：{{ transactionId }}
      </div>
      <div class="sp-mb-2 sp-w-[300px] sp-text-left sp-mx-auto">
        訂單序號：{{ orderId }}
      </div>
      <div class="sp-mb-2">超人幫手：supersuperhandy@gmail.com</div>
      <VBtn color="primary" class="sp-mt-2" @click="gotoAccountPointPage()"
        >返回點數頁</VBtn
      >
    </template>
  </div>
</template>
<script setup>
  import { getLinePayConfirm } from "@/services/apis/linepay";
  const route = useRoute();
  const isLoading = ref(true);
  const showOrderId = ref(false);
  const { status, transactionId, orderId } = route.query;
  onMounted(async () => {
    let res = await getLinePayConfirm(transactionId, orderId);
    if (!res.error) {
      isLoading.value = false;
    } else {
      isLoading.value = false;
      showOrderId.value = true;
    }
  });
  const gotoAccountPointPage = function () {
    navigateTo("/account/points");
  };
</script>
