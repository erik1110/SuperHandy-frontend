<template>
  <PostTaskOverlay />
  <div class="sp-card-wrapper sp-bg-white sp-p-4">
    <AccountPointsTabs />
  </div>
  <div class="sp-card-wrapper sp-bg-white sp-p-6">
    <SecTitle :text="'目前帳戶點數'"></SecTitle>
    <v-container fluid class="px-0" v-if="!isLoading">
      <v-row class="">
        <v-col cols="12" md="6">

          <!-- 超人幣 -->
          <AccountPointsCard :data="pointSuper"></AccountPointsCard>

        </v-col>
        <v-col cols="12" md="6">

          <!-- 幫手幣 -->
          <AccountPointsCard :data="pointHelper"></AccountPointsCard>

        </v-col>
      </v-row>
    </v-container>
  </div>
  <div class="sp-card-wrapper sp-bg-white sp-p-6">
    <SecTitle :text="'儲值超人幣'"></SecTitle>
    <v-container fluid class="px-0" v-if="!isLoading">
      <v-row class="">
        <v-col cols="12" lg="4">

          <!-- 儲值100 -->
          <AccountPointsPurchaseCard :data="purchaseData.basic" @openPurchaseModal="openPurchaseModal">
          </AccountPointsPurchaseCard>

        </v-col>
        <v-col cols="12" lg="4">

          <!-- 儲值500 -->
          <AccountPointsPurchaseCard :data="purchaseData.medium" @openPurchaseModal="openPurchaseModal">
          </AccountPointsPurchaseCard>

        </v-col>
        <v-col cols="12" lg="4">

          <!-- 儲值1000 -->
          <AccountPointsPurchaseCard :data="purchaseData.advanced" @openPurchaseModal="openPurchaseModal">
          </AccountPointsPurchaseCard>

        </v-col>
      </v-row>
    </v-container>
  </div>
  <AccountPointsPurchaseModal :money="purchaseMoney" @close="purchaseModal = false"></AccountPointsPurchaseModal>
</template>
<script setup>
import { storeFullOverlay } from "@/stores/storeFullOverlay";
import { getAccountPoints } from "@/services/apis/point";
const _storeFullOverlay = storeFullOverlay();
const isLoading = ref(true);
const pointSuper = ref({
  title: '超人幣',
  image: 'superCoin',
  coin: 0,
})
const pointHelper = ref({
  title: '幫手幣',
  image: 'helperCoin',
  coin: 0,
  comments: '幫手幣僅限於折抵曝光方案時使用'
})
const purchaseData = ref({
  basic: {
    superCoin: 100,
    price: 100,
  },
  medium: {
    superCoin: 500,
    price: 500,
    bonus: 50
  },
  advanced: {
    superCoin: 1000,
    price: 1000,
    bonus: 200
  }
})


const purchaseMoney = ref(0);
const purchaseModal = useState("purchaseModal", () => ref(false));
const FuncGetAccountPoints = async function () {
  _storeFullOverlay.open()
  try{
    let res = await getAccountPoints();
    if (!res.error) {
      pointSuper.value.coin = res.data.superCoin;
      pointHelper.value.coin = res.data.helperCoin;
    }
  } catch {} finally{
    _storeFullOverlay.close()
    isLoading.value = false;
  }
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
<style scoped lang="scss"></style>
