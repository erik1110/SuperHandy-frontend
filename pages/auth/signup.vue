<template>
  <AuthSheetWrapper spMaxWidth="600">
    <h1 class="text-center sp-mb-8">註冊</h1>
    <v-form v-model="fields" @submit.prevent="submitForm">
      <div class="md:sp-flex md:sp-gap-4 ">
        <v-text-field v-model="firstName" density="compact" label="*姓" :rules="[ruleRequired]" />
        <v-text-field v-model="lastName" density="compact" label="*名" :rules="[ruleRequired]" />
      </div>
      <v-text-field v-model="nickname" density="compact" label="暱稱" />
      <v-text-field v-model="email" density="compact" label="*信箱" :rules="[ruleRequired, ruleEmail]" />
      <v-text-field v-model="phone" density="compact" label="*電話" :rules="[ruleRequired, rulePhone]" />
      <v-text-field v-model="password" density="compact" label="*密碼" type="password"
        :rules="[ruleRequired, rulePassLen]" />
      <v-text-field v-model="confirmPassword" density="compact" label="*確認密碼" type="password"
        :rules="[ruleRequired, ruleConfirmPassword(confirmPassword, password)]" />
      <br>
      <v-btn type="submit" block :disabled="!fields" color="secondary text-white">註冊</v-btn>
    </v-form>
    <div class="sp-text-xs sp-mt-8 sp-text-center">
      <span>已經有帳號？</span>
      <NuxtLink to="/auth/login">
        <span class="sp-font-bold ">登入</span>
      </NuxtLink>
    </div>
  </AuthSheetWrapper>
</template>

<script setup>
const fields = ref(null)
const firstName = ref("");
const lastName = ref("");
const nickname = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Rules
const { formRules } = spUtility();
const {
  ruleRequired,
  ruleEmail,
  rulePhone,
  rulePassLen,
  ruleConfirmPassword,
} = formRules

const submitForm = () => {
  //submit
  console.log('submit');
}

// for test
const { query } = useRoute()
onMounted(() => {
  if (query.dev == 1) {
    firstName.value = 'a'
    lastName.value = 'aaa'
    nickname.value = 'a'
    phone.value = '0999999999'
    email.value = 'abc@gmail.com'
    password.value = '11111111'
    confirmPassword.value = '11111111'
  }
})

</script>

<style lang="scss" scoped></style>
