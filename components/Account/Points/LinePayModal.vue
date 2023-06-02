<template>
  <VOverlay close-on-content-click v-model="isLinePayModalOpen">
    <iframe
      class="sp-mx-[2vw] sp-my-[2vh] sp-w-[96vw] sp-h-[96vh]"
      :src="props.url"
    ></iframe>
  </VOverlay>
</template>
<script setup>
  const props = defineProps({
    id: String,
    url: String,
  });
  let isLinePayModalOpen = useState("linePayModalController");
  onMounted(() => {
    window.addEventListener("message", function (event) {
      if (event.data == "closeLinePayModal") {
        isLinePayModalOpen.value = false;
      }
    });
  });
</script>
