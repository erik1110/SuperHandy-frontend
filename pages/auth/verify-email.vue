<template>
  <AuthSheetWrapper spMaxWidth="600">
    <h1 class="text-center sp-mb-8">驗證確認</h1>
    <div class="sp-text-title sp-mb-4">Hi {{ nickName }}</div>
    <div class="" v-if="status == '200'">
      <div class="sp-text-body">{{ message }}</div>
      <v-btn class="sp-mx-auto sp-mt-4" color="primary">
        <NuxtLink to="/auth/login">登入</NuxtLink>
      </v-btn>
    </div>
    <div class="" v-else-if="status != '-1'">
      <div class="sp-text-body">{{ message }}</div>
      <template v-if="status != '40002'">
        <v-btn class="sp-mt-4" color="primary" @click="resendEamil"
          >重寄驗證信</v-btn
        >
      </template>
      <template v-else>
        <v-btn class="sp-mx-auto sp-mt-4" color="primary">
          <NuxtLink to="/auth/login">登入</NuxtLink>
        </v-btn>
      </template>
    </div>
  </AuthSheetWrapper>
</template>
<script setup>
  import {
    getVerifyEmail,
    postResendVerification,
  } from "@/services/apis/verifyEmail";
  const route = useRoute();
  const token = ref("");
  const nickName = ref("");
  const status = ref("-1");
  const message = ref("恭喜您註冊成功");
  const email = ref("");
  nickName.value = route.query.nickName;
  token.value = route.query.token;
  onMounted(async () => {
    let res = await getVerifyEmail(token.value);
    console.log(res);
    if (!res.error) {
      status.value = "200";
      message.value = "恭喜您註冊成功";
    } else {
      status.value = res.error.name;
      message.value = res.message;
    }
  });

  email.value = route.query.email;
  const resendEamil = async function () {
    let data = {
      email: email.value,
    };
    let res = await postResendVerification(data);
    if (!res.error) {
      status.value = "600";
      message.value = "信件已重新寄出，請去信箱查看";
    } else {
      status.value = res.error.name;
      message.value = res.message;
    }
  };
</script>
