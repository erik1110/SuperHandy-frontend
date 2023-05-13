<template>
  <DialogModal :dialog="purchaseModal" min-width="300" width="400">
    <h2 class="text-center sp-mb-4">儲值點數</h2>
    <p class="sp-text-body sp-text-gray-500 sp-mb-4">
      您將使用 NT$ {{ money }} 儲值 {{ money }} 點進入帳戶，是否儲值
    </p>
    <template #actions>
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
</template>

<script setup>
  import { postAccountPointspurchase } from "@/services/apis/point";
  const props = defineProps({
    money: Number,
  });
  const purchaseModal = useState("purchaseModal");
  const message = ref("");
  const loading = ref(false);
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
