<template>
  <AuthSheetWrapper spMaxWidth="600">
    <h1 class="text-center sp-mb-8">重設密碼</h1>
    <div class="sp-text-title sp-mb-4">Hi {{ nickname }}</div>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field v-model="sginInData.password" density="compact" label="密碼" type="password"
        :rules="[ruleRequired, rulePassLen]" />
      <v-text-field v-model="sginInData.confirmPassword" density="compact" label="確認密碼" type="password"
        :rules="[ruleRequired, ruleConfirmPassword(confirmPassword, password)]" />
      <v-alert v-if="errMsg" class="mt-4" type="error" :icon="false" :text="errMsg" variant="tonal"></v-alert>
      <br />
      <v-btn :disabled="!form" block color="primary text-white" size="large" type="submit" variant="elevated">
        送出
      </v-btn>
    </v-form>
    <div class="my-4">{{ message }}</div>
  </AuthSheetWrapper>
</template>
<script setup>
import { patchResetPassword } from "@/services/apis/auth";
import { storeGlobal } from '~/stores/storeGlobal';
const _storeGlobal = storeGlobal()

const route = useRoute();
const token = ref("");
const nickname = ref("");
nickname.value = route.query.nickname;
token.value = route.query.token;

const errMsg = ref("");

const { ruleRequired, rulePassLen, ruleConfirmPassword } = useFormUtil();
const loading = ref(false);
const form = ref(false);
const sginInData = ref({
  password: null,
  confirmPassword: null,
});
const onSubmit = async () => {
  if (!form.value) return;
  loading.value = true;
  let data = {
    password: sginInData.value.password,
    confirmPassword: sginInData.value.confirmPassword,
  };
  let res = await patchResetPassword(data, token.value);
  loading.value = false;
  if (!res.error) {
    _storeGlobal.confirmHandler({
      open: true,
      content: "重設成功，請使用新密碼登入"
    })
    navigateTo('/auth/login')
    // message.value = "重設成功，請使用新密碼登入";
  } else {
    errMsg.value = res.message;
  }
};
</script>
