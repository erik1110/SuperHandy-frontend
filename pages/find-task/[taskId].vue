<template>
  <div>
    <v-container class="bg-white sp-min-h-[112px]">
      <h1 class="sp-text-h4 md:sp-text-h2 sp-border-l-[12px] sp-border-secondary sp-pl-4 sp-my-4">
        任務標題
      </h1>
    </v-container>
    <div class="sp-bg-gray-bg sp-pt-4 sp-min-h-[calc(100vh-214px)]">
      <v-container class="sp-flex sp-flex-wrap sm:sp-flex-nowrap sp-content-start">
        <!-- Filter -->
        <div class="sp-mb-3 sp-flex-auto sm:sp-flex-initial">
          <FindTaskDetailPosterInfo />
        </div>
        <!-- Main Content -->
        <div class="sp-flex-auto">
          <FindTaskDetailCard />
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>


</script>
<style lang="postcss" scoped></style>
