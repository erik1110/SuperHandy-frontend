<template>
  <DialogModal :dialog="dialog" min-width="300" width="400">
    <h2 class="text-center sp-mb-4">忘記密碼</h2>
    <p class="sp-text-body sp-text-gray-500 sp-mb-4">請輸入您註冊的信箱，我們將寄送重設密碼信件給您</p>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field v-model="email" :readonly="loading" :rules="[ruleRequired, ruleEmail]" clearable label="請輸入信箱"
        density="compact"></v-text-field>
      <br />
    </v-form>
    <template #actions>
      <v-btn v-if="!message" :loading="loading" @click="onSubmit" :disabled="!form" block color="primary text-white"
        size="large" type="submit" variant="elevated">
        寄送
      </v-btn>
    </template>
    <v-alert v-if="message" type="success" :text="message" color="v-purple"></v-alert>
  </DialogModal>
</template>

<script setup>
import { postResetPassword } from "@/services/apis/auth";
const props = defineProps({
  dialog: Boolean,
})
const { ruleRequired, ruleEmail } = useFormUtil();
const message = ref("");
const loading = ref(false);
const form = ref(false);
const email = ref(null)
// Submit
const onSubmit = async () => {
  if (!form.value) return;
  loading.value = true;
  let data = {
    email: email.value,
  };
  let res = await postResetPassword(data);
  loading.value = false;
  if (!res.error) {
    message.value = "信件已寄出，請至信箱查看";
  } else {
    message.value = res.message;
  }
};
// Reset
watch(() => props.dialog, (val) => {
  if (!val) {
    message.value = ""
    email.value = ""
  }
})
</script>

<style lang="scss" scoped></style>