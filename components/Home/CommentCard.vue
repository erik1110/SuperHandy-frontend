<template>
  <div class="sp-card-wrapper sp-pt-8 sp-px-6 sp-pb-4">
    <v-card flat max-width="300" width="250" min-height="200">
      <div class="sp-flex sp-items-center">
        <v-avatar class="mr-2">
          <v-img :src="avatar" cover></v-img>
        </v-avatar>
        <div class="sp-text-h4 sp-text-slate-800">{{ name }}**</div>
      </div>
      <div class="py-5 sp-text-slate-400">”{{ comment }}“</div>
    </v-card>
  </div>
</template>

<script setup>
const { name, comment, avatar } = defineProps({
  name: String,
  comment: String,
  avatar: String,
});
</script>

<style lang="scss" scoped></style>
