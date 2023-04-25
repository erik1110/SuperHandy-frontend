<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>會員註冊</h1>
            <p class="text-medium-emphasis">請輸入您的個人資料</p>
            <VForm @submit.prevent="submit" class="mt-7">
              <div>
                <label class="label text-grey-darken-2" for="name">姓名</label>
                <VTextField :rules="[ruleRequired]" v-model="name" prepend-inner-icon="fluent:person-24-regular" id="name"
                  name="name" />
              </div>
              <div>
                <label class="label text-grey-darken-2" for="nickname">暱稱</label>
                <VTextField :rules="[ruleRequired]" v-model="nickname" prepend-inner-icon="fluent:person-24-regular"
                  id="nickname" name="nickname" />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email">手機號碼</label>
                <VTextField :rules="[ruleRequired]" v-model="phone" type="text"
                  prepend-inner-icon="fluent:phone-24-regular" id="phone" name="phone" />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email">Email</label>
                <VTextField :rules="[ruleRequired, ruleEmail]" v-model="email" type="email"
                  prepend-inner-icon="fluent:mail-24-regular" id="email" name="email" />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password">密碼</label>
                <VTextField :rules="[ruleRequired, rulePassLen]" type="password" v-model="password"
                  prepend-inner-icon="fluent:password-20-regular" id="password" name="password" />
              </div>
              <div class="mt-5">
                <VBtn type="submit" block min-height="45" class="gradient primary">註冊</VBtn>
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <span>已經是會員?
                <NuxtLink to="/login" class="font-weight-bold text-primary">點此登入</NuxtLink>
              </span>
            </p>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
const name = ref("");
const nickname = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");

const { formRules } = spUtility();
const { ruleRequired, ruleEmail, rulePassLen } = formRules;

const submit = async () => { };
</script>

<style lang="scss" scoped></style>