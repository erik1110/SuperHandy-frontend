<template>
  <AuthSheetWrapper spMaxWidth="600">
    <h1 class="text-center sp-mb-8">註冊</h1>
    <v-form v-model="fields" @submit.prevent="submitForm">
      <div class="md:sp-flex md:sp-gap-4 ">
        <v-text-field v-model="lastName" density="compact" label="姓" :rules="[ruleRequired]" />
        <v-text-field v-model="firstName" density="compact" label="名" :rules="[ruleRequired]" />
      </div>
      <v-text-field v-model="email" density="compact" label="信箱" :rules="[ruleRequired, ruleEmail]" />
      <v-text-field v-model="phone" density="compact" label="電話" :rules="[ruleRequired, rulePhone]" />
      <v-text-field v-model="password" density="compact" label="密碼" type="password"
        :rules="[ruleRequired, rulePassLen]" />
      <v-text-field v-model="confirmPassword" density="compact" label="確認密碼" type="password"
        :rules="[ruleRequired, ruleConfirmPassword(confirmPassword, password)]" />
      <v-alert v-if="errMsg" type="error" :icon="false" :text="errMsg" variant="tonal"></v-alert>
      <br />

      <v-btn type="submit" block :disabled="!fields" color="v-purple text-white">註冊</v-btn>
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
import { postSignup } from '~/services/apis/auth';
import { storeGlobal } from '~/stores/storeGlobal';
const _storeGlobal = storeGlobal()

const fields = ref(null)
const firstName = ref("");
const lastName = ref("");
const nickname = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errMsg = ref("")


// Rules
const {
  ruleRequired,
  ruleEmail,
  rulePhone,
  rulePassLen,
  ruleConfirmPassword,
} = useFormUtil()

// Sign up submit
const submitForm = async () => {
  //submit
  console.log('submit');
  let payload = {
    fields: fields.value,
    firstName: firstName.value,
    lastName: lastName.value,
    nickname: lastName.value,
    phone: phone.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  }
  console.log({ payload });
  try {
    let res = await postSignup(payload)
    console.log({ res });
    if (res.error) {
      errMsg.value = res.message
      return
    } else {
      navigateTo('/auth/login')
      _storeGlobal.confirmHandler({
        open: true,
        content: '註冊成功！請查收您的電子郵件並完成帳戶驗證。'
      })
    }
  } catch (err) {
    console.log(err.response.data);
  }
}


// for test
const { query } = useRoute()
onMounted(() => {
  const randomNum = Math.floor(Math.random() * 100)
  if (query.dev == 1) {
    lastName.value = 'yang'
    firstName.value = 'rrr'
    nickname.value = `Rere${randomNum}`
    phone.value = `09999999${randomNum}`
    email.value = 'simola5631@syinxun.com'
    password.value = '11111111'
    confirmPassword.value = '11111111'
  }
})

</script>

<style lang="scss" scoped></style>
