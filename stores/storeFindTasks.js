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
    console.log({ data });
    listViewTasks.value = data.tasks;
    taskMeta.value ={
      totalTasks: data.total_tasks,
      totalPages: data.total_pages
    }
  };

  // map
  const loading = ref(false)
  const mapViewTasks = ref([]);
  const mapCenter = ref([25.034436016196786, 121.56407163196346]);
  const mapCenterBackup =ref([25.034436016196786, 121.56407163196346])
  const mapFetchData =reactive({
    longitude: 121.56407163196346,
    latitude: 25.034436016196786,
    radius: 6,
  });
  const fetchMapViewTasks = async ()=>{
    loading.value = true
    console.log({filterData});
    if(!filterData.dist && !filterData.city){
      mapFetchData.latitude = mapCenterBackup.value[0]
      mapFetchData.longitude = mapCenterBackup.value[1]
    }else{
      delete mapFetchData.latitude 
      delete mapFetchData.longitude 
    }
    let payload = {...mapFetchData,...filterData}
    cleanNull(payload)
    console.log({payload});

    let { data } = await getMapViewTasks(payload)
    console.log({data});
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
      isUrgent: false,
    });
    // fetchListViewTasks();
  };

  // 共用
  const cleanNull = (payload)=>{
    Object.keys(payload).forEach(el=>{
      if(!payload[el]) delete payload[el]
    })
    delete payload.selectedCates
  }



  return {
    keyword,
    page,
    mapCenter,
    mapCenterBackup,
    mapFetchData,
    listViewTasks,
    mapViewTasks,
    taskMeta,
    filterData,
    resetFilter,
    fetchListViewTasks,
    fetchMapViewTasks
  };
});
