<template>
  <div class="filter sm:sp-mr-6 sp-min-w-[280px] sm:sp-max-w-[300px]">
    <div class="wrap sp-items-center sp-border-b sp-border-slate-300">
      <FunnelIcon class="sp-icon-sm sp-text-purple sp-mr-1" />
      <p class="sp-font-bold">任務條件</p>
    </div>
    <!-- 排序 -->
    <div
      v-if="route.path.includes('list')"
      class="wrap sp-border-b sp-border-slate-200"
    >
      <p
        class="sp-min-w-[36px] sp-text-body-sm sp-text-gray-placeholder sp-font-bold"
      >
        排序
      </p>
      <v-radio-group
        v-model="_storeFindTasks.filterData.sortBy"
        color="v-purple"
        inline
        hide-details
        density="compact"
      >
        <v-radio value="newest" class="mr-1">
          <template #label>
            <span class="sp-text-body-sm">最新刊登 </span>
          </template>
        </v-radio>
        <v-radio value="highestSalary" class="mr-1">
          <template #label>
            <span class="sp-text-body-sm">最高薪水 </span>
          </template>
        </v-radio>
        <v-radio value="mostEnquiries" class="mr-1">
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
            v-model="_storeFindTasks.filterData.city"
            :items="cityItems"
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
            v-model="_storeFindTasks.filterData.dist"
            :items="distItems"
            label="地區"
            density="compact"
            single-line
            class="px-1"
            hide-details
            :disabled="!_storeFindTasks.filterData.city"
          >
            <template #label>
              <span class="sp-text-body-sm"> 地區 </span>
            </template>
          </v-autocomplete>
        </div>
        <v-autocomplete
          v-model="_storeFindTasks.filterData.selectedCates"
          :items="servicesItems"
          density="compact"
          single-line
          hide-details
          class="px-1 mb-2"
          multiple
        >
          <template #label>
            <span
              v-if="_storeFindTasks.filterData.selectedCates.length === 0"
              class="sp-text-body-sm"
            >
              服務類型
            </span>
          </template>
          <template #selection="{ index }">
            <span
              v-if="
                index === 0 &&
                _storeFindTasks.filterData.selectedCates.length > 0
              "
              class="sp-text-body-sm"
            >
              服務類型
            </span>
          </template>
        </v-autocomplete>
        <v-chip
          color="secondary"
          class="my-1 mr-1"
          closable
          size="small"
          @click:close="deleteService(c)"
          style="color: #60c4c4 !important"
          v-for="c in _storeFindTasks.filterData.selectedCates"
          :key="c"
          >{{ c }}</v-chip
        >
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
        v-model="_storeFindTasks.filterData.isUrgent"
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
      <v-btn @click="reset" class="ml-auto mr-2" variant="plain"
        >全部重設</v-btn
      >
      <v-btn @click="submitFilters" color="v-purple" rounded="lg">套用</v-btn>
    </div>
    <!-- {{ _storeFindTasks.filterData }} -->
  </div>
</template>

<script setup>
import { FunnelIcon } from "@heroicons/vue/24/outline";
import cityData from "@/static/tw_county.json";
import distData from "@/static/tw_town.json";
import { getCategories } from "@/services/apis/general";
import { storeFindTasks } from "~/stores/storeFindTasks";
const _storeFindTasks = storeFindTasks();
// 進階篩選資料
const cityItems = computed(() => cityData);
const distItems = ref([]);
const servicesItems = ref([]);
const route = useRoute();

watch(
  () => _storeFindTasks.filterData.city,
  async (val) => {
    _storeFindTasks.filterData.dist = null;
    distItems.value = distData.reduce((acc, cur) => {
      if (cur.city == val) {
        acc.push(cur.dist);
      }
      return acc;
    }, []);
    _storeFindTasks.filterData.dist = distItems.value[0];
  }
);
const fetchServices = async () => {
  let res = await getCategories();
  // console.log({ res });
  servicesItems.value = res.data.reduce((acc, cur) => {
    acc.push(cur.name);
    return acc;
  }, []);
};
onMounted(() => {
  fetchServices();
});

const deleteService = (item) => {
  _storeFindTasks.filterData.selectedCates =
    _storeFindTasks.filterData.selectedCates.filter((el) => el != item);
};

const submitFilters = () => {
  if (route.path.includes("list")) {
    _storeFindTasks.page = 1;
    _storeFindTasks.fetchListViewTasks();
  } else {
    _storeFindTasks.fetchMapViewTasks("filter");
  }
};
//reset
const reset = () => {
  _storeFindTasks.resetFilter();
  submitFilters();
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
