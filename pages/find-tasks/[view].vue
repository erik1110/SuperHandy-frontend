<template>
  <div>
    <h1>找任務</h1>
    <v-tabs color="secondary" class="my-5" v-model="view">
      <NuxtLink to="/find-tasks/list"
        ><v-tab value="list">列表模式</v-tab></NuxtLink
      >
      <NuxtLink to="/find-tasks/map"
        ><v-tab value="map">地圖模式</v-tab></NuxtLink
      >
    </v-tabs>
    <h2 v-if="view === 'list'">列表模式</h2>
    <h2 v-if="view === 'map'">
      地圖模式
      <!-- <div id="map" class="sp-h-[60vh]"></div> -->
      <ClientOnly>
        <div class="sp-h-[60vh]">
          <LMap ref="map" id="map" :zoom="zoomLevel" :center="mapCenter">
            <LMarker
              v-for="(t, idx) in tasks"
              :key="idx"
              :lat-lng="[t.location.latitude, t.location.longitude]"
            >
              <LIcon
                :icon-url="pinImg"
                :icon-size="[32, 44]"
                :icon-anchor="[16, 43]"
                :popup-anchor="[0, -40]"
              />
              <LPopup>
                <h3 class="sp-text-h5">{{ t.title }}</h3>
                <div class="sp-flex sp-items-end sp-my-2">
                  <MapPinIcon class="sp-icon-sm sp-mr-1 sp-text-purple" />
                  {{ t.location.city }}{{ t.location.dist }}
                </div>

                <p>服務類型 # {{ t.category }}</p>
                <p>案主 {{ t.poster }} **</p>
                <p>聯絡電話 09-26XXX-XXX</p>
                <p>
                  案件預算
                  <span class="sp-text-purple sp-font-semibold sp-text-body-sm"
                    >{{ t.salary }} 超人幣</span
                  >
                </p>
                <p class="sp-text-caption sp-text-slate-500">
                  刊登時間 10 分鐘前 {{ t.inquiriesCount }} 人詢問
                </p>
                <v-btn color="v-purple">查看詳情</v-btn>
              </LPopup>
            </LMarker>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></LTileLayer>
          </LMap>
        </div>
      </ClientOnly>
    </h2>
  </div>
</template>

<script setup>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import { MapPinIcon } from "@heroicons/vue/24/solid";
import pinImg from "@/assets/images/pin.png";
import pinUrgentImg from "@/assets/images/pin_urgent.png";

const { $L } = useNuxtApp();
const route = useRoute();
const view = route.params.view;
const tasks = ref([
  {
    category: "生活服務",
    imageUrl: "https://example.com/task_image.jpg",
    title: "幫我打掃房間",
    description: "需要清潔房間，包括掃地、拖地、擦窗戶",
    poster: "王",
    salary: 5000,
    publishedAt: "2023-04-10T10:00:00Z",
    inquiriesCount: 3,
    isUrgent: false,
    location: {
      city: "台中市",
      dist: "西屯區",
      landmark: "",
      longitude: 121.56613406328003,
      latitude: 25.034638032224173,
    },
  },
  {
    category: "水電裝修",
    imageUrl: "https://example.com/task_image.jpg",
    title: "換馬桶跟洗臉台",
    description: "需要拆除現有馬桶和洗臉台，並且安裝新的馬桶和洗臉台",
    poster: "張",
    salary: 8000,
    publishedAt: "2023-04-09T09:00:00Z",
    inquiriesCount: 1,
    isUrgent: true,
    location: {
      city: "台北市",
      dist: "大安區",
      landmark: "大安森林公園",
      longitude: 121.56407163196346,
      latitude: 25.034436016196786,
    },
  },
]);
onMounted(() => {
  if (view !== "list" && view !== "map") {
    navigateTo("/find-tasks/list");
  }
});
/*
  Map
*/
const zoomLevel = ref(13);
const mapCenter = ref([25.034436016196786, 121.56407163196346]);
</script>

<style lang="scss" scoped></style>
