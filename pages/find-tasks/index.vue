<template>
  <div>
    <div
      class="sp-max-w-[1680px] sp-mx-auto sp-flex sp-flex-wrap sp-items-center sp-justify-center sm:sp-justify-start lg:sp-justify-around lg:sp-flex-nowrap sp-px-5 sp-pb-12"
    >
      <FindTasksHighlight />
    </div>
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
