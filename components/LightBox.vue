<template>
  <img
    class="sp-cursor-pointer"
    :class="lightBoxControll.class"
    :src="lightBoxControll.image"
    @click="open = true"
  />
  <v-overlay v-model="open" @click="open = false">
    <div
      class="sp-flex sp-w-[100vw] sp-h-[100vh] sp-items-center sp-justify-center"
    >
      <img :src="lightBoxControll.bigImage" />
    </div>
  </v-overlay>
</template>
<script setup>
  const lightBoxControll = defineProps({
    image: String,
    bigImage: String,
    class: String,
  });
  const open = ref(false);
</script>
