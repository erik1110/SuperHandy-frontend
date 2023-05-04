<template>
  <AuthSheetWrapper>
    <h1 class="text-center sp-mb-8">登入</h1>
    <v-btn block>
      <v-icon>mdi-google</v-icon>
      Log in with google
    </v-btn>
    <div class="sp-text-center sp-text-xs sp-my-8">
      - 或使用 SuperHandy 帳號密碼登入 -
    </div>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field v-model="sginInData.account" :readonly="loading" :rules="[ruleRequired]" class="mb-2" clearable
        label="信箱/手機" density="compact"></v-text-field>

      <v-text-field v-model="sginInData.password" :readonly="loading" :rules="[ruleRequired]" clearable label="密碼"
        type="password" density="compact">
        <template #details>
          <NuxtLink to="/auth/send-reset-email"
            class="sp-text-blue-600 sp-text-right sp-font-bold sp-text-xs sp-cursor-pointer">忘記密碼
          </NuxtLink>
        </template>
      </v-text-field>
      <br />
      <v-btn :disabled="!form" :loading="loading" block color="secondary text-white" size="large" type="submit"
        variant="elevated">
        Sign In
      </v-btn>
    </v-form>
    <div class="sp-text-xs sp-mt-8 sp-text-center">
      <span>還沒有帳號？</span>
      <NuxtLink to="/auth/signup">
        <span class="sp-font-bold">註冊</span>
      </NuxtLink>
    </div>
  </AuthSheetWrapper>
</template>

<script setup>
import { postLogin } from '~/services/apis/auth'
const loading = ref(false)
// Rules
const {
  ruleRequired,
} = useFormUtil()
// Form
const form = ref(false)
const sginInData = ref({
  account: null,
  password: null,
})
const onSubmit = async () => {
  if (!form.value) return
  loading.value = true
  try {
    let { data } = await postLogin(sginInData)
    console.log({ data });
  } catch (err) {
    console.log({ err });
  }
  loading.value = false
}


</script>

<style lang="scss" scoped></style>
