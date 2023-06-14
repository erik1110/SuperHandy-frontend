<template>
  <AuthSheetWrapper spMaxWidth="600">
    <h1 class="text-center sp-mb-8">最後一步了，請填寫基本資料</h1>
    <v-form v-model="fields" @submit.prevent="submitForm">
      <div class="md:sp-flex md:sp-gap-4">
        <v-text-field
          v-model="lastName"
          density="compact"
          label="姓"
          :rules="[ruleRequired]"
        />
        <v-text-field
          v-model="firstName"
          density="compact"
          label="名"
          :rules="[ruleRequired]"
        />
      </div>
      <v-text-field
        v-model="phone"
        density="compact"
        label="電話"
        :rules="[ruleRequired, rulePhone]"
      />
      <v-alert
        v-if="errMsg"
        type="error"
        :icon="false"
        :text="errMsg"
        variant="tonal"
      ></v-alert>
      <br />

      <v-btn type="submit" block :disabled="!fields" color="v-purple text-white"
        >註冊</v-btn
      >
    </v-form>
  </AuthSheetWrapper>
</template>
<script setup>
  // Rules
  import { postGoogleSignUp } from "~/services/apis/auth";
  import { storeGlobal } from "~/stores/storeGlobal";
  const _storeGlobal = storeGlobal();

  const fields = ref(null);
  const firstName = ref("");
  const lastName = ref("");
  const phone = ref("");
  const errMsg = ref("");
  /*
  params
  userId: String,
  queryString: String
*/
  const googleSignData = useState("googleSignData");
  // Rules
  const { ruleRequired, rulePhone } = useFormUtil();

  // Sign up submit
  const submitForm = async () => {
    //submit
    let payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
    };
    // console.log({ payload });
    try {
      let res = await postGoogleSignUp(googleSignData.value.userId, payload);
      // console.log({ res });
      if (res.error) {
        errMsg.value = res.message;
        return;
      } else {
        navigateTo("/auth/login");
        _storeGlobal.confirmHandler({
          open: true,
          content: "註冊成功！請查收您的電子郵件並完成帳戶驗證。",
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
</script>
