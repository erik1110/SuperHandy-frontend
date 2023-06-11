<template>
  <VCard v-if="detail.taskId && detail.progressBar.confirmedAt">
    <VCardText class="sp-text-center">
      <template v-if="detail.progressBar.completedAt">
        <div class="sp-text-h4 sp-text-center">雙方已完成評價</div>
      </template>
      <template v-else>
        <div class="sp-text-h4 sp-text-center">雙方尚未完成評價</div>
        <VBtn class="sp-mx-auto sp-mt-4" color="primary">
          <NuxtLink to="/account/comments">查看評價</NuxtLink>
        </VBtn>
      </template>
    </VCardText>
  </VCard>
</template>
<script setup>
  const detail = useState("taskDetail");
</script>
