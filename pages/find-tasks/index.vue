<template>
  <div>
    <div
      class="sp-max-w-[1680px] sp-mx-auto sp-flex sp-flex-wrap sp-items-center sp-justify-center sm:sp-justify-start lg:sp-justify-around lg:sp-flex-nowrap sp-px-5 sp-pb-4"
    >
      <FindTasksHighlight />
    </div>
    <div class="sp-border-t sp-border-slate-100 sp-shadow-md sp-mb-1">
      <v-container class="pt-2">
        <v-text-field
          v-model="_storeFindTasks.keyword"
          class="searchBar"
          prepend-inner-icon="mdi-magnify"
          variant="plain"
          label="尋找任務"
          hide-details
          single-line
          clearable
          @keyup.enter="search"
        ></v-text-field>
      </v-container>
    </div>
    <div class="sp-bg-gray-bg sp-h-full sp-pt-4">
      <v-container
        class="sp-flex sp-flex-wrap md:sp-flex-nowrap sp-content-start"
      >
        <!-- Filter -->
        <div
          class="sp-w-full md:sp-w-auto sp-mb-3 sp-flex-auto sm:sp-flex-initial"
        >
          <FindTasksFilters />
        </div>
        <!-- Main Content -->
        <div class="sp-w-full md:sp-w-auto sp-flex-auto">
          <FindTasksTabs />
          <NuxtPage :keepalive="{}" />
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
  import { storeFindTasks } from "~/stores/storeFindTasks";
  const _storeFindTasks = storeFindTasks();
  onBeforeMount(() => {
    _storeFindTasks.resetFilter();
  });

  const route = useRoute();
  const search = () => {
    if (route.fullPath.includes("list")) {
      _storeFindTasks.fetchListViewTasks();
    } else {
      _storeFindTasks.fetchMapViewTasks();
    }
  };
</script>
<style lang="postcss" scoped>
  .searchBar:deep(input) {
    padding-top: 8px;
  }
</style>
