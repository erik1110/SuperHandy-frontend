<template>
  <AuthSheetWrapper spMaxWidth="600">
    <h1 class="text-center sp-mb-8">忘記密碼</h1>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="sginInData.email"
        :readonly="loading"
        :rules="[ruleRequired, ruleEmail]"
        clearable
        label="Email"
        density="compact"
      ></v-text-field>
      <br />
      <v-btn
        :disabled="!form"
        block
        color="primary text-white"
        size="large"
        type="submit"
        variant="elevated"
      >
        寄出
      </v-btn>
    </v-form>
    <div class="my-4">{{ message }}</div>
  </AuthSheetWrapper>
</template>
<script setup>
  const message = ref("");
  const { formRules } = spUtility();
  const { ruleRequired, ruleEmail } = formRules;
  const loading = ref(false);
  const form = ref(false);
  const sginInData = ref({
    email: null,
  });
  const onSubmit = async () => {
    if (!form.value) return;
    loading.value = true;
    let res = await useHttp_v2().req("POST", "/forgot-password", {
      email: sginInData.value.email,
    });
    loading.value = false;
    if (!res.error) {
      message.value = "信件已寄出，請去信箱查看";
    } else {
      message.value = res.message;
    }
  };
</script>
