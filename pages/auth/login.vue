<template>
  <AuthSheetWrapper>
    <h1 class="text-center sp-mb-8">登入</h1>
    <v-btn block color="v-purple" @click="FuncGoogleLogin()">
      <v-icon class="mr-5">mdi-google</v-icon>
      Log in with google
    </v-btn>
    <div class="sp-text-center sp-text-xs sp-my-8">
      - 或使用 SuperHandy 帳號密碼登入 -
    </div>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="account"
        :readonly="loading"
        :rules="[ruleRequired]"
        class="mb-2"
        clearable
        label="信箱/手機"
        density="compact"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :readonly="loading"
        :rules="[ruleRequired]"
        clearable
        label="密碼"
        type="password"
        density="compact"
      >
        <template #details>
          <p
            @click="sendResetDialog = true"
            class="sp-text-blue-600 sp-text-right sp-font-bold sp-text-xs sp-cursor-pointer"
          >
            忘記密碼
          </p>
        </template>
      </v-text-field>
      <v-alert
        v-if="errMsg"
        class="mt-4"
        type="error"
        :icon="false"
        :text="errMsg"
        variant="tonal"
      ></v-alert>
      <br />
      <v-btn
        v-if="showResendBtn"
        @click="resendEmail"
        :loading="resendLoading"
        class="mb-4"
        block
        color="primary text-white"
        size="large"
        variant="elevated"
      >
        重寄驗證信
      </v-btn>
      <v-btn
        :disabled="!form"
        :loading="loading"
        block
        color="v-purple text-white"
        size="large"
        type="submit"
        variant="elevated"
      >
        登入
      </v-btn>
    </v-form>
    <div class="sp-text-xs sp-mt-8 sp-text-center">
      <span>還沒有帳號？</span>
      <NuxtLink to="/auth/signup">
        <span class="sp-font-bold">註冊</span>
      </NuxtLink>
    </div>
    <AuthSendResetModal
      :dialog="sendResetDialog"
      @close="sendResetDialog = false"
    />
  </AuthSheetWrapper>
</template>

<script setup>
  import { postLogin } from "@/services/apis/auth";
  import {
    postResendVerification,
    getGoogleAccount,
  } from "@/services/apis/auth";
  import { storeAuth } from "@/stores/storeAuth";
  import { storeGlobal } from "@/stores/storeGlobal";
  import { storeChatBox } from "@/stores/storeChatBox";
  const _storeGlobal = storeGlobal();
  const _storeAuth = storeAuth();
  const _storeChatBox = storeChatBox();

  const loading = ref(false);
  const resendLoading = ref(false);
  const sendResetDialog = ref(false);
  const errMsg = ref("");
  const showResendBtn = ref(false);

  // Rules
  const { ruleRequired } = useFormUtil();
  // Form
  const form = ref(false);

  const account = ref(null);
  const password = ref(null);
  const onSubmit = async () => {
    if (!form.value) return;
    loading.value = true;
    try {
      let payload = {
        account: account.value,
        password: password.value,
      };
      let res = await postLogin(payload);
      console.log({ res });
      if (res.error) {
        errMsg.value = res.message;
        loading.value = false;
        if (res.error.name == "40202") {
          showResendBtn.value = true;
        } else {
          showResendBtn.value = false;
        }
        return;
      } else {
        // _storeAuth.setLoginToken(res.data.token)
        _storeAuth.loginToken = res.data.token;
        _storeChatBox.reConnectWebSocket();
        _storeChatBox.fetchChatList();
        navigateTo("/");
      }
    } catch (err) {
      console.log({ err });
    }
    loading.value = false;
  };
  // Resend Email
  const resendEmail = async function () {
    resendLoading.value = true;
    let payload = {
      email: account.value,
    };
    let res = await postResendVerification(payload);
    if (!res.error) {
      _storeGlobal.confirmHandler({
        open: true,
        content: "驗證信已重新寄出，請至信箱收取信件",
      });
    } else {
      errMsg.value = res.message;
    }
    resendLoading.value = false;
  };

  // for test
  const { query } = useRoute();
  onMounted(() => {
    if (query.dev == 1) {
      account.value = "user1@example.com";
      password.value = "12345678";
    }
  });
  const pageRoot = ref("");
  const FuncGoogleLogin = () => {
    window.open(`http://localhost:3010/auth/google`, "_top", "");
  };
  //for google login
  let messagePort;
  const { port1, port2 } = new MessageChannel();
  messagePort = port1;
  const messageEvent = (event) => {};
  onMounted(() => {
    pageRoot.value = window.location.origin;
  });
</script>

<style lang="scss" scoped></style>
