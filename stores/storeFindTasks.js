// stores/counter.js
import { defineStore } from "pinia";
import { getListViewTasks,getMapViewTasks } from "@/services/apis/findTasks";

export const storeFindTasks = defineStore("findTasks", () => {
  // list
  const keyword = ref("");
  const page = ref(1)
  const listViewTasks = ref([]);
  const taskMeta = ref({
    totalTasks: 0,
    totalPages: 1,
  })
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
    cleanNull(payload)

    let { data } = await getListViewTasks(payload);
    listViewTasks.value = data.tasks;
    taskMeta.value ={
      totalTasks: data.total_tasks,
      totalPages: data.total_pages
    }
  };

  // map
  const loading = ref(false)
const zoomLevel = ref(13);
const mapViewTasks = ref([]);
  const mapCenter = ref([25.034436016196786, 121.56407163196346]);
  const mapCenterBackup =ref([25.034436016196786, 121.56407163196346])
  const radius = ref(6)
  // const mapFetchData =reactive({
  //   longitude: 121.56407163196346,
  //   latitude: 25.034436016196786,
  //   radius: 6,
  // });
  const fetchMapViewTasks = async (from)=>{
    loading.value = true
    await nextTick()
    if(from=='filter'){
      zoomLevel.value = 13
    }
    let payload = {
      keyword: keyword.value,
      radius: radius.value,
      longitude: mapCenterBackup.value[1],
      latitude: mapCenterBackup.value[0]
    };
    payload = {...payload,...filterData}
    if(from=="map"){
      delete payload.city
      delete payload.dist
    }
    cleanNull(payload)
    let { data } = await getMapViewTasks(payload)
    mapViewTasks.value = data.tasks
    taskMeta.value.totalTasks = data.total_tasks
    mapCenter.value = [data.latitude,data.longitude]
    loading.value = false
  }


  // filter
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
      services: "",
      isUrgent: false,
    });
  };

  // 共用
  const cleanNull = (payload)=>{
    Object.keys(payload).forEach(el=>{
      if(!payload[el]) delete payload[el]
    })
    delete payload.selectedCates
  }



  return {
    loading,
    zoomLevel,
    keyword,
    page,
    mapCenter,
    mapCenterBackup,
    radius,
    listViewTasks,
    mapViewTasks,
    taskMeta,
    filterData,
    resetFilter,
    fetchListViewTasks,
    fetchMapViewTasks
  };
});
