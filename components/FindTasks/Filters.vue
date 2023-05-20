<template>
  <div class="filter sm:sp-mr-6 sp-min-w-[250px] sm:sp-max-w-[300px]">
    <div class="wrap sp-items-center sp-border-b sp-border-slate-300">
      <FunnelIcon class="sp-icon-sm sp-text-purple sp-mr-1" />
      <p class="sp-font-bold">任務條件</p>
    </div>
    <!-- 排序 -->
    <div class="wrap sp-border-b sp-border-slate-200">
      <p class="sp-min-w-[40px] sp-text-gray-placeholder sp-font-bold">排序</p>
      <v-radio-group
        v-model="sort"
        color="v-purple"
        inline
        hide-details
        density="compact"
      >
        <template #prepend> </template>
        <v-radio label="最新刊登" value="latest"></v-radio>
        <v-radio label="最高薪水" value="salary"></v-radio>
        <v-radio label="最多詢問" value="query"></v-radio>
      </v-radio-group>
    </div>
    <!-- 進階 -->
    <div class="wrap sp-border-b sp-border-slate-200">
      <p class="sp-min-w-[40px] sp-text-gray-placeholder sp-font-bold">進階</p>
      <div class="sp-flex-auto">
        <div class="d-flex pb-3">
          <v-select
            v-model="county"
            :items="countyItems"
            item-title="city"
            item-value="city"
            label="縣市"
            density="comfortable"
            single-line
            class="px-2"
            hide-details
          ></v-select>
          <v-select
            :items="townItems"
            label="地區"
            density="comfortable"
            single-line
            item-title="dist"
            item-value="dist"
            class="px-2"
            hide-details
          ></v-select>
        </div>
        <v-select
          label="服務類型"
          density="comfortable"
          single-line
          hide-details
          class="px-2"
        ></v-select>
      </div>
    </div>
    <!-- 急件 -->
    <div class="wrap sp-items-center sp-border-b sp-border-slate-200">
      <p class="sp-min-w-[40px] sp-text-gray-placeholder sp-font-bold">急件</p>
      <v-checkbox
        v-model="urgent"
        label="全部"
        hide-details
        density="comfortable"
      ></v-checkbox>
    </div>
    <!-- actions -->
    <div class="wrap">
      <v-btn class="ml-auto" variant="plain">全部重設</v-btn>
      <v-btn color="v-purple" rounded="lg">套用</v-btn>
    </div>
  </div>
</template>

<script setup>
import { FunnelIcon } from "@heroicons/vue/24/outline";
import countyData from "@/static/tw_county.json";
import townData from "@/static/tw_town.json";
const countyItems = computed(() => countyData);
const townItems = computed(() => townData);

const sort = ref("latest");
const county = ref(null);
const urgent = ref(false);
</script>

<style lang="postcss" scoped>
.filter {
  @apply sp-bg-white sp-rounded-2xl;
}
.wrap {
  @apply sp-flex sp-px-4 sp-py-3;
}
</style>
