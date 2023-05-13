<template>
  <div>
    <VContainer fluid>
      <VRow>
        <VCol>
          <VForm
            v-model="form"
            @submit.prevent="submit"
            class="sp-max-w-[400px]"
          >
            <VRow>
              <VCol>
                <VAutocomplete
                  class="sp-mb-2"
                  v-model="bankNo"
                  :items="bankList"
                  item-value="code"
                  item-title="name"
                  label="銀行代碼"
                  :rules="[ruleRequired]"
                  clearable
                ></VAutocomplete>
                <VTextField
                  class="sp-mb-2"
                  label="銀行帳號"
                  v-model="bankAcct"
                  :rules="[ruleRequired, ruleBankAcctLen]"
                ></VTextField>
                <div class="sp-ml-4" v-if="userPoint">
                  <VTextField
                    class="sp-mb-2"
                    label="兌換金額"
                    v-model="point"
                    :rules="[ruleRequired, rulePointExchange]"
                  ></VTextField>
                  <div>
                    目前擁有
                    {{ userPoint.superCoin }} 點超人幣，單次提領最少需要提領 300
                    點，以 100 點為單位
                  </div>
                  <div class="sp-mb-4">每 100 點超人幣可兌換 100 元新台幣</div>
                </div>
                <VBtn color="primary" type="submit">兌換</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
<script setup>
  import data from "@/static/bank.json";
  import {
    postAccountPointsCashback,
    getAccountPoints,
  } from "@/services/apis/point";
  const { ruleRequired, ruleBankAcctLen, rulePointExchange } = useFormUtil();
  const form = ref(false);
  const bankList = ref(data);
  const bankNo = ref(null);
  const bankAcct = ref(null);
  const point = ref(0);
  const isRead = ref(false);
  const userPoint = ref(null);
  const FuncGetAccountPoints = async function () {
    let res = await getAccountPoints();
    if (!res.error) {
      userPoint.value = res.data;
    }
  };
  FuncGetAccountPoints();
  const submit = async () => {
    if (!form.value) return;
    let chooseBankName = bankList.value
      .find((item) => item.code == bankNo.value)
      .name.slice(4);
    let data = {
      point: point.value,
      bank: chooseBankName,
      bankNo: bankNo.value,
      bankAcct: bankAcct.value,
    };
    console.log(data);
    let res = await postAccountPointsCashback(data);
    if (!res.error) {
    } else {
      console.log(res);
    }
  };
</script>
<style scoped lang="scss">
  .v-field__outline__notch {
    border: none;
  }
</style>
