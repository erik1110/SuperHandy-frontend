<template>
  <AuthSheetWrapper spMaxWidth="600">
    <h1 class="text-center sp-mb-8">重設密碼</h1>
    <div class="sp-text-title sp-mb-4">Hi {{ nickName }}</div>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="sginInData.password"
        density="compact"
        label="*密碼"
        type="password"
        :rules="[ruleRequired, rulePassLen]"
      />
      <v-text-field
        v-model="sginInData.confirmPassword"
        density="compact"
        label="*確認密碼"
        type="password"
        :rules="[ruleRequired, ruleConfirmPassword(confirmPassword, password)]"
      />
      <br />
      <v-btn
        :disabled="!form"
        block
        color="primary text-white"
        size="large"
        type="submit"
        variant="elevated"
      >
        重設
      </v-btn>
    </v-form>
    <div class="my-4">{{ message }}</div>
  </AuthSheetWrapper>
</template>
<script setup>
  const route = useRoute();
  const token = ref("");
  const nickName = ref("");
  nickName.value = route.query.nickName;
  token.value = route.query.token;

  const message = ref("");

  const { formRules } = spUtility();
  const { ruleRequired, rulePassLen, ruleConfirmPassword } = formRules;
  const loading = ref(false);
  const form = ref(false);
  const sginInData = ref({
    password: null,
    confirmPassword: null,
  });
  const onSubmit = async () => {
    if (!form.value) return;
    loading.value = true;
    let res = await useHttp_v2().req(
      "PATCH",
      "/forgot-reset-password",
      {
        password: sginInData.value.password,
        confirmPassword: sginInData.value.confirmPassword,
      },
      {
        token: token.value,
      }
    );
    loading.value = false;
    if (!res.error) {
      message.value = "重設成功，請使用新密碼登入";
    } else {
      message.value = res.message;
    }
  };
</script>
