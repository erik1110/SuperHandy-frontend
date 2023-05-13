<template>
  <div>
    <VContainer fluid v-if="!isLoading">
      <VRow>
        <VCol cols="12" class="sp-flex">
          <div
            class="sp-border-2 sp-border-black sp-text-center sp-border-solid sp-border-r-0"
          >
            <div class="sp-text-h2">超人幣</div>
            <div class="bg-svg superCoin"></div>
            <div class="">{{ point.superCoin }}</div>
          </div>
          <div
            class="sp-border-2 sp-border-black sp-text-center sp-border-solid sp-mr-4"
          >
            <div class="sp-text-h2">幫手幣</div>
            <div class="bg-svg helperCoin"></div>
            <div class="">{{ point.helperCoin }}</div>
          </div>
        </VCol>
        <VCol cols="12"> * 幫手幣僅用於案主曝光方案折抵使用 </VCol>
        <VCol cols="12" class="sp-text-center sp-text-title"> 儲值點數 </VCol>
        <VCol cols="12" class="sp-flex">
          <div
            class="sp-border-2 sp-border-black sp-text-center sp-border-solid sp-border-r-0"
          >
            <div class="sp-text-h3 sp-mb-[18px]">100 超人幣</div>
            <div>NT$ 100</div>
            <v-btn color="primary" outline @click="openPurchaseModal(100)"
              >儲值去</v-btn
            >
          </div>
          <div
            class="sp-border-2 sp-border-black sp-text-center sp-border-solid sp-border-r-0"
          >
            <div class="sp-text-h3">500 超人幣</div>
            <div class="sp-text-caption">贈送 50 幫手幣</div>
            <div>NT$ 500</div>
            <v-btn color="primary" outline @click="openPurchaseModal(500)"
              >儲值去</v-btn
            >
          </div>
          <div
            class="sp-border-2 sp-border-black sp-text-center sp-border-solid"
          >
            <div class="sp-text-h3">1000 超人幣</div>
            <div class="sp-text-caption">贈送 200 幫手幣</div>
            <div>NT$ 1000</div>
            <v-btn color="primary" outline @click="openPurchaseModal(1000)"
              >儲值去</v-btn
            >
          </div>
        </VCol>
      </VRow>
    </VContainer>
    <AccountPointsPurchaseModal
      :money="purchaseMoney"
      @close="purchaseModal = false"
    ></AccountPointsPurchaseModal>
  </div>
</template>
<script setup>
  import { getAccountPoints } from "@/services/apis/point";
  const isLoading = ref(true);
  const point = ref({});
  const purchaseMoney = ref(0);
  const purchaseModal = useState("purchaseModal", () => ref(false));
  const FuncGetAccountPoints = async function () {
    let res = await getAccountPoints();
    if (!res.error) {
      point.value = res.data;
    } else {
    }
    isLoading.value = false;
  };
  onMounted(() => {
    FuncGetAccountPoints();
  });
  const openPurchaseModal = function (money) {
    purchaseMoney.value = money;
    purchaseModal.value = true;
  };
  watch(
    () => purchaseModal.value,
    (val) => {
      if (val == false) {
        FuncGetAccountPoints();
      }
    }
  );
</script>
<style scoped lang="scss">
  .bg-svg {
    width: 48px;
    height: 48px;
    margin: 0 auto;
    &.superCoin {
      background: url("@/assets/images/svg/superCoin.svg") center center /
        contain no-repeat;
    }
    &.helperCoin {
      background: url("@/assets/images/svg/helperCoin.svg") center center /
        contain no-repeat;
    }
  }
</style>
