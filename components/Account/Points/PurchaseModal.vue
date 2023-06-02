<template>
  <DialogModal :dialog="purchaseModal" min-width="300" width="400">
    <h2 class="text-center sp-mb-4">儲值點數</h2>
    <p class="sp-text-body sp-text-gray-500 sp-mb-4">
      您將使用 NT$ {{ money }} 儲值 {{ money }} 點進入帳戶，是否儲值
    </p>
    <template #actions>
      <VBtn
        v-if="!message"
        :loading="loading"
        color="v-purple text-white"
        class="sp-mb-2"
        @click="createLinePayPayment()"
      >
        LinePay 儲值
      </VBtn>
      <v-btn
        v-if="!message"
        :loading="loading"
        @click="onSubmit"
        block
        color="primary text-white"
        size="large"
        type="submit"
        variant="elevated"
      >
        儲值
      </v-btn>
    </template>
    <v-alert
      v-if="message"
      type="success"
      :text="message"
      color="v-purple"
    ></v-alert>
  </DialogModal>
  <AccountPointsLinePayModal
    :id="linePayOrderId"
    :url="linePayUrl"
  ></AccountPointsLinePayModal>
</template>

<script setup>
  import { postAccountPointspurchase } from "@/services/apis/point";
  import { postLinePayPayment } from "@/services/apis/linepay";
  const props = defineProps({
    money: Number,
  });
  const purchaseModal = useState("purchaseModal");
  const message = ref("");
  const loading = ref(false);
  const isLinePayModalOpen = useState("linePayModalController", () => {
    ref(false);
  });
  const linePayOrderId = ref("");
  const linePayUrl = ref("");
  // Submit
  const onSubmit = async () => {
    loading.value = true;
    let data = {
      money: props.money,
    };
    let res = await postAccountPointspurchase(data);
    loading.value = false;
    if (!res.error) {
      message.value = "儲值成功!";
      setTimeout(() => {
        purchaseModal.value = false;
      }, 1500);
    } else {
      message.value = res.message;
    }
  };
  //create linepay payment
  const createLinePayPayment = async () => {
    let data = {
      money: props.money,
    };
    let res = await postLinePayPayment(data);
    if (!res.error) {
      linePayOrderId.value = res.data.orderId;
      linePayUrl.value = res.data.redirectURL;
      isLinePayModalOpen.value = true;
      purchaseModal.value = false;
    }
  };
  // Reset
  watch(
    () => purchaseModal.value,
    (val) => {
      if (!val) {
        message.value = "";
      }
    }
  );
</script>

<style lang="scss" scoped></style>
