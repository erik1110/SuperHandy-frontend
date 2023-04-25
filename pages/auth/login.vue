<template>
  <div class="h-screen sp-bg-yellow-50">
    <v-sheet class="pa-12" color="transparent">
      <v-card class="mx-auto px-8 py-8" max-width="344" rounded="xl" elevation="0">
        <h1 class="text-center font-weight-bold  sp-mb-8 text-2xl">登入</h1>
        <v-btn block>
          <v-icon>mdi-google</v-icon>
          Log in with google
        </v-btn>
        <div class="sp-text-center sp-text-xs sp-my-8">
          - 或使用 SuperHandy 帳號密碼登入 -
        </div>
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field v-model="sginInData.email" :readonly="loading" :rules="[required]" class="mb-2" clearable
            label="Email" density="compact"></v-text-field>

          <v-text-field v-model="sginInData.password" :readonly="loading" :rules="[required]" clearable label="Password"
            placeholder="Enter your password" density="compact">
            <template #details>
              <p class="sp-text-blue-600 sp-text-right sp-font-bold sp-text-xs sp-cursor-pointer">忘記密碼
              </p>
            </template>
          </v-text-field>
          <br>
          <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
            Sign In
          </v-btn>
        </v-form>
        <div class="sp-text-xs sp-mt-8 sp-text-center">
          <span>還沒有帳號？</span>
          <NuxtLink to="/auth/signup">
            <span class="sp-font-bold ">註冊</span>
          </NuxtLink>
        </div>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup>
const loading = ref(false)

// Form
const form = ref(false)
const sginInData = ref({
  email: null,
  password: null,
})
const onSubmit = () => {
  if (!form.value) return
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}
const required = (v) => {
  return !!v || 'Field is required'
}

</script>

<style lang="scss" scoped></style>
