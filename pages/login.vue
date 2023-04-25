<template>
  <div class="h-screen sp-bg-yellow-50">
    <v-sheet class="pa-12" color="transparent">
      <v-card class="mx-auto px-6 py-8" max-width="344" rounded="xl" elevation="0">
        <v-card-title class="text-center font-weight-bold">Login</v-card-title>
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field v-model="sginInData.email" :readonly="loading" :rules="[required]" class="mb-2" clearable
            label="Email" density="compact"></v-text-field>

          <v-text-field v-model="sginInData.password" :readonly="loading" :rules="[required]" clearable label="Password"
            placeholder="Enter your password" density="compact"></v-text-field>

          <br>

          <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})
const form = ref(false)
const loading = ref(false)
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

// export default {
//     data: () => ({
//       form: false,
//       email: null,
//       password: null,
//       loading: false,
//     }),

//     methods: {
//       onSubmit () {
//         if (!this.form) return

//         this.loading = true

//         setTimeout(() => (this.loading = false), 2000)
//       },
//       required (v) {
//         return !!v || 'Field is required'
//       },
//     },
//   }