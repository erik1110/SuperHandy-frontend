// stores/counter.js
import { defineStore } from "pinia";
import { getListViewTasks,getMapViewTasks } from "@/services/apis/findTasks";

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
    selectedCates: [],
    isUrgent: false,
  })
  watch(()=>filterData.selectedCates, (val) => {
    Object.assign(filterData, {
      ...filterData,
      services: val.join()
    });
  });
  const resetFilter = () => {
    Object.assign(filterData, {
      sortBy: "newest",
      city: null,
      dist: null,
      selectedCates: [],
      isUrgent: false,
    });
    // fetchListViewTasks();

  };
  watch(page, () => {
    fetchListViewTasks();
  });

  const fetchListViewTasks = async () => {
    let payload = {
      keyword: keyword.value,
      page: page.value,
      limit: 3,
    };
    payload = {...payload,...filterData}
    Object.keys(payload).forEach(el=>{
      if(!payload[el]) delete payload[el]
    })
    delete payload.selectedCates
    let { data } = await getListViewTasks(payload);
    console.log({ data });
    listViewTasks.value = data.tasks;
    taskMeta.value ={
      totalTasks: data.total_tasks,
      totalPages: data.total_pages
    }
  };
  const fetchMapViewTasks = async ()=>{
    let { data } = await getMapViewTasks()
    console.log({data});
  }
  return {
    keyword,
    page,
    listViewTasks,
    taskMeta,
    filterData,
    resetFilter,
    fetchListViewTasks,
    fetchMapViewTasks
  };
});
