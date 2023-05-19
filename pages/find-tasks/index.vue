<template>
  <div class="sp-h-full">
    <v-container class="sp-flex sp-px-5 sp-pb-12">
      <div
        class="sp-border-l-[12px] sp-border-secondary sp-text-primary sp-pl-4"
      >
        <h1 class="sp-text-h2">找任務</h1>
        <p>各項任務由你大展身手！</p>
        <p>超人幫手限時推薦👏</p>
      </div>
    </v-container>
    <div class="sp-bg-gray-bg sp-h-full sp-pt-4">
      <v-container
        class="sp-flex sp-flex-wrap sm:sp-flex-nowrap sp-content-start"
      >
        <!-- Filter -->
        <div class="sp-mb-3 sp-flex-auto sm:sp-flex-initial">
          <FindTasksFilters />
        </div>
        <!-- Main Content -->
        <div class="sp-flex-auto">
          <FindTasksTabs />
          <NuxtPage />
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup></script>
<style lang="postcss" scoped></style>
