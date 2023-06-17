<template>
  <div class="sp-card-wrapper sp-bg-white sp-p-4">
    <AccountPointsTabs />
  </div>
  <div class="sp-card-wrapper sp-bg-white sp-p-6">
    <SecTitle :text="'超人幣兌換新台幣'"></SecTitle>
    <v-container fluid class="px-0">
      <v-form @submit.prevent="submit" ref="exchangeForm">
        <v-row class="my-5">
          <v-col cols="12" lg="6" class="sp-space-y-5">
            <!-- 銀行代碼 -->
            <VSelect v-model="bankNo" :items="bankList" item-value="code" item-title="name" label="銀行代碼"
              :rules="[ruleRequired]" hint="請輸入您的銀行代碼" clearable></VSelect>

            <!-- 銀行帳號 -->
            <VTextField v-model="bankAcct" label="銀行帳號" hint="請輸入您的銀行帳號共14碼數字" :rules="[ruleRequired, ruleBankAcctLen]"
              hiint="請輸入您的銀行帳號" type="number" counter="14" clearable>
            </VTextField>

            <!-- 超人幣點數 -->
            <VTextField v-model="point" label="超人幣" hint="請輸入您要兌換的超人幣點數" type="number" prefix="$" suffix="超人幣"
              :rules="[ruleRequired, rulePointExchange]">
            </VTextField>

            <!-- 兌換規定 -->
            <ul class="sp-text-sm sp-list-disc sp-pl-5 sp-space-y-2">
              <li class="sp-text-red-500 sp-text-xs">
                您目前擁有 {{ userPoint.superCoin }} 點超人幣。
              </li>
              <li class="sp-text-gray-placeholder sp-text-xs">
                每 100 點超人幣可兌換 100 元新台幣。
              </li>
              <li class="sp-text-gray-placeholder sp-text-xs">
                單次提領以 100 點為單位，最少需要提領 300 點。
              </li>
              <li class="sp-text-gray-placeholder sp-text-xs">
                取出點數需要 5~7
                個工作天，待完成後系統將會發送通知訊息，還請耐心等待，謝謝您。
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-row v-if="chkSuperCoin">
              <v-col>
                <v-alert variant="tonal" type="error" text="超人幣點數不足。"></v-alert>
              </v-col>
            </v-row>
            <v-row class="sp-flex sp-items-center">
              <v-col cols="8">
                <v-checkbox v-model="chkRule" label="我已了解以上規定" color="v-purple" hide-details></v-checkbox>
              </v-col>
              <v-col cols="4" class="text-end">
                <VBtn color="v-purple" type="submit" :disabled="submitDisabled" :loading="isLoading">兌換</VBtn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script setup>
import data from "@/static/bank.json";
import {
  postAccountPointsCashback,
  getAccountPoints,
} from "@/services/apis/point";
import { storeGlobal } from "@/stores/storeGlobal";
const _storeGlobal = storeGlobal();
const { ruleRequired, ruleBankAcctLen, rulePointExchange, validateFormResult } =
  useFormUtil();

// const form = ref(false);
const exchangeForm = ref(null);
const bankList = ref(data);
const bankNo = ref(null);
const bankAcct = ref(null);
const point = ref(300);
const userPoint = ref({});
const isLoading = ref(false);
const submitDisabled = ref(true);
const chkRule = ref(false);
const chkSuperCoin = ref(false);
const FuncGetAccountPoints = async function () {
  let res = await getAccountPoints();
  if (!res.error) {
    userPoint.value = res.data;
  }
};
FuncGetAccountPoints();
const submit = async () => {
  const validate = await validateFormResult(exchangeForm);
  if (!validate) return;
  isLoading.value = true;
  submitDisabled.value = true;

  let chooseBankName = bankList.value
    .find((item) => item.code == bankNo.value)
    .name.slice(4);
  let data = {
    point: point.value,
    bank: chooseBankName,
    bankNo: bankNo.value,
    bankAcct: bankAcct.value,
  };
  // console.log(data);
  let res = await postAccountPointsCashback(data);
  if (!res.error) {
    exchangeForm.value.reset();

    _storeGlobal.confirmHandler({
      open: true,
      title: "點數兌換成功",
      content: "已成功將點數兌換成現金，請去帳戶內確認金額，謝謝。",
    });
    FuncGetAccountPoints();
  } else {
    _storeGlobal.confirmHandler({
      open: true,
      title: "點數兌換失敗",
      content: res.message,
    });
    // console.log(res);
  }
  chkRule.value = false;
  isLoading.value = false;
};

const checkSuperCoin = () => userPoint.value?.superCoin >= 300 ? true : false;
watch(chkRule, (val) => {
  if (val && checkSuperCoin()) {
    submitDisabled.value = !val;
  }
});
watch(userPoint, (val) => {
  if (!checkSuperCoin()) {
    chkSuperCoin.value = true;
  } else {
    chkSuperCoin.value = false;
  }
});
</script>
<style scoped lang="scss">
.v-field__outline__notch {
  border: none;
}
</style>
