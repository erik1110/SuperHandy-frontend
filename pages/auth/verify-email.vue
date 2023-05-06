<template>
  <AuthSheetWrapper spMaxWidth="400">
    <h1 class="text-center sp-mb-8">驗證確認</h1>
    <div class="sp-text-title sp-mb-4">Hi {{ nickname }}</div>
    <div v-if="status == '200'">
      <div class="sp-text-body">{{ message }}</div>
      <NuxtLink to="/auth/login">
        <v-btn block class="sp-mx-auto sp-mt-4 text-white" color="primary">
          登入
        </v-btn>
      </NuxtLink>
    </div>
    <div class="sp-w-full" v-else-if="status != '-1'">
      <div class="sp-text-body">{{ message }}</div>
      <v-btn
        v-if="status != '40002'"
        block
        class="sp-mt-4"
        color="primary"
        @click="resendEmail"
        >重寄驗證信</v-btn
      >
      <NuxtLink v-else to="/auth/login">
        <v-btn block class="sp-mx-auto sp-mt-4 text-white" color="primary">
          登入
        </v-btn>
      </NuxtLink>
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
  const nickname = ref("");
  const status = ref("-1");
  const message = ref("恭喜您註冊成功");
  const email = ref("");
  nickname.value = route.query.nickname;
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
  const resendEmail = async function () {
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
