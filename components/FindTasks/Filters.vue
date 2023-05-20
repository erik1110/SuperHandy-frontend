<template>
  <div class="filter sm:sp-mr-6 sp-min-w-[250px] sm:sp-max-w-[300px]">
    <div class="wrap sp-items-center sp-border-b sp-border-slate-300">
      <FunnelIcon class="sp-icon-sm sp-text-purple sp-mr-1" />
      <p class="sp-font-bold">任務條件</p>
    </div>
    <!-- 排序 -->
    <div class="wrap sp-border-b sp-border-slate-200">
      <p
        class="sp-min-w-[36px] sp-text-body-sm sp-text-gray-placeholder sp-font-bold"
      >
        排序
      </p>
      <v-radio-group
        v-model="filterData.sort"
        color="v-purple"
        inline
        hide-details
        density="compact"
      >
        <v-radio value="latest" class="mr-1">
          <template #label>
            <span class="sp-text-body-sm">最新刊登 </span>
          </template>
        </v-radio>
        <v-radio value="salary" class="mr-1">
          <template #label>
            <span class="sp-text-body-sm">最高薪水 </span>
          </template>
        </v-radio>
        <v-radio value="query" class="mr-1">
          <template #label>
            <span class="sp-text-body-sm">最多詢問 </span>
          </template>
        </v-radio>
      </v-radio-group>
    </div>
    <!-- 進階 -->
    <div class="wrap sp-border-b sp-border-slate-200">
      <p
        class="sp-min-w-[36px] sp-text-body-sm sp-text-gray-placeholder sp-font-bold"
      >
        進階
      </p>
      <div class="sp-flex-auto">
        <div class="d-flex pb-3">
          <v-autocomplete
            v-model="filterData.county"
            :items="countyItems"
            item-title="city"
            item-value="city"
            label="縣市"
            density="compact"
            single-line
            class="px-1"
            hide-details
          >
            <template #label>
              <span class="sp-text-body-sm"> 縣市 </span>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-model="filterData.town"
            :items="townItems"
            label="地區"
            density="compact"
            single-line
            class="px-1"
            hide-details
            :disabled="!filterData.county"
          >
            <template #label>
              <span class="sp-text-body-sm"> 地區 </span>
            </template>
          </v-autocomplete>
        </div>
        <v-autocomplete
          v-model="filterData.cate"
          :items="cateItems"
          label="服務類型"
          density="compact"
          single-line
          hide-details
          class="px-1"
        >
          <template #label>
            <span class="sp-text-body-sm"> 服務類型 </span>
          </template>
        </v-autocomplete>
      </div>
    </div>
    <!-- 急件 -->
    <div class="wrap sp-items-center sp-border-b sp-border-slate-200">
      <p
        class="sp-min-w-[36px] sp-text-body-sm sp-text-gray-placeholder sp-font-bold"
      >
        急件
      </p>
      <v-checkbox
        v-model="filterData.urgent"
        hide-details
        density="comfortable"
      >
        <template #label>
          <span class="sp-text-body-sm"> 全部 </span>
        </template>
      </v-checkbox>
    </div>
    <!-- actions -->
    <div class="wrap">
      <v-btn @click="resetFilter" class="ml-auto" variant="plain"
        >全部重設</v-btn
      >
      <v-btn color="v-purple" rounded="lg">套用</v-btn>
    </div>
  </div>
</template>

<script setup>
  import { FunnelIcon } from "@heroicons/vue/24/outline";
  import countyData from "@/static/tw_county.json";
  import townData from "@/static/tw_town.json";
  import { getCategories } from "@/services/apis/general";

  // 進階篩選資料
  const countyItems = computed(() => countyData);
  const townItems = ref([]);
  const cateItems = ref([]);
  const filterData = reactive({
    sort: "latest",
    county: null,
    town: null,
    cate: null,
    urgent: false,
  });
  watch(
    () => filterData.county,
    (val) => {
      filterData.town = null;
      townItems.value = townData.reduce((acc, cur) => {
        if (cur.city == val) {
          acc.push(cur.dist);
        }
        return acc;
      }, []);
    }
  );
  const fetchCategories = async () => {
    let res = await getCategories();
    console.log({ res });
    cateItems.value = res.data.reduce((acc, cur) => {
      acc.push(cur.name);
      return acc;
    }, []);
  };
  onMounted(() => {
    fetchCategories();
  });
  // reset
  const resetFilter = () => {
    Object.assign(filterData, {
      sort: "latest",
      county: null,
      town: null,
      cate: null,
      urgent: false,
    });
  };
</script>

<style lang="postcss" scoped>
  @import url("@/assets/css/tailwind.css");
  .filter {
    @apply sp-bg-white sp-rounded-2xl;
  }
  .wrap {
    @apply sp-flex sp-p-3;
  }
  .v-autocomplete {
    &:deep(.v-autocomplete__selection) {
      @apply sp-text-body-sm sp-leading-6;
    }
    &:deep(input) {
      @apply sp-text-body-sm sp-leading-6;
    }
  }
</style>
