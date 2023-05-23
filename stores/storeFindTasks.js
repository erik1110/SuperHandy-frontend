// stores/counter.js
import { defineStore } from "pinia";
import { getListViewTasks } from "@/services/apis/findTasks";

export const storeFindTasks = defineStore("findTasks", () => {
  const keyword = ref("");
  const page = ref(1)
  const listViewTasks = ref([]);
  const taskMeta = ref({
    totalTasks: 0,
    totalPages: 1,
  })

  const filterData = reactive({
    sortBy: "newest",
    city: null,
    dist: null,
    services: [],
    isUrgent: false,
  })
  const resetFilter = () => {
    Object.assign(filterData, {
      sortBy: "newest",
      city: null,
      dist: null,
      services: [],
      isUrgent: false,
    });
    fetchListViewTasks();

  };
  watch(page, () => {
    fetchListViewTasks();
  });

  const fetchListViewTasks = async (filters) => {
    let payload = {
      keyword: keyword.value,
      page: page.value,
      limit: 3,
    };
    payload = {...payload,...filters}
    let { data } = await getListViewTasks(payload);
    console.log({ data });
    listViewTasks.value = data.tasks;
    taskMeta.value ={
      totalTasks: data.total_tasks,
      totalPages: data.total_pages
    }
  };
  return {
    keyword,
    page,
    listViewTasks,
    taskMeta,
    filterData,
    resetFilter,
    fetchListViewTasks,
  };
});
