<template>
  <div class="sp-break-all">{{ token }}</div>
</template>
<script setup>
  const route = useRoute();
  let token = ref("");
  onMounted(() => {
    token.value = route.query.token;
  });
</script>
